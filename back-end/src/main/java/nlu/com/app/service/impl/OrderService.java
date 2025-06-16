package nlu.com.app.service.impl;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import nlu.com.app.constant.EOrderStatus;
import nlu.com.app.dto.cart.Cart;
import nlu.com.app.dto.cart.CartItem;
import nlu.com.app.dto.response.OrderDetailsResponseDTO;
import nlu.com.app.dto.response.OrderResponseDTO;
import nlu.com.app.entity.Book;
import nlu.com.app.entity.Order;
import nlu.com.app.entity.OrderItem;
import nlu.com.app.entity.PaymentMethod;
import nlu.com.app.entity.Promotion;
import nlu.com.app.entity.User;
import nlu.com.app.entity.UserAddress;
import nlu.com.app.exception.ApplicationException;
import nlu.com.app.exception.ErrorCode;
import nlu.com.app.mapper.OrderMapper;
import nlu.com.app.repository.BookRepository;
import nlu.com.app.repository.OrderItemRepository;
import nlu.com.app.repository.OrderRepository;
import nlu.com.app.repository.PaymentMethodRepository;
import nlu.com.app.repository.PromotionCategoriesRepository;
import nlu.com.app.repository.UserAddressRepository;
import nlu.com.app.repository.UserRepository;
import nlu.com.app.service.IOrderService;
import nlu.com.app.util.SecurityUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author VuLuu
 */
@Service
@RequiredArgsConstructor
@Transactional
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class OrderService implements IOrderService {

  CartService cartService;
  BookRepository bookRepository;
  PromotionCategoriesRepository promotionCategoriesRepository;
  PaymentMethodRepository paymentMethodRepository;
  OrderRepository orderRepository;
  OrderItemRepository orderItemRepository;
  UserRepository userRepository;
  OrderMapper orderMapper;
  UserAddressRepository userAddressRepository;

  @Override
  public OrderResponseDTO createOrderFromCart(List<Long> selectedProductIds, Long paymentMethodId) {
    String username = SecurityUtils.getCurrentUsername();
    if (username == null) {
      throw new ApplicationException(ErrorCode.UNAUTHENTICATED);
    }
    User user = userRepository.findByUsername(username).get();

    Cart cart = cartService.getCart(user.getUserId())
        .orElseThrow(() -> new RuntimeException("Cart is empty"));

    Optional<UserAddress> defaultAddressOpt = userAddressRepository.findByUserAndIsDefaultTrue(
        user);
    if (defaultAddressOpt.isEmpty()) {
      throw new ApplicationException(ErrorCode.NO_DEFAULT_ADDRESS);
    }

    List<CartItem> selectedItems = cart.getItems().stream()
        .filter(item -> selectedProductIds.contains(Long.parseLong(item.getProductId())))
        .collect(Collectors.toList());

    if (selectedItems.isEmpty()) {
      throw new ApplicationException(ErrorCode.UNKNOWN_EXCEPTION);
    }

    List<Long> productIds = selectedItems.stream()
        .map(item -> Long.parseLong(item.getProductId()))
        .collect(Collectors.toList());

    List<Book> books = bookRepository.findAllById(productIds);

    // Map ProductId -> Book
    Map<Long, Book> bookMap = books.stream()
        .collect(Collectors.toMap(Book::getBookId, book -> book));

    // Get promotions (if applicable)
    List<Long> categoryIds = books.stream()
        .map(book -> book.getCategory().getCategoryId())
        .distinct()
        .toList();

    List<Promotion> promotions = promotionCategoriesRepository.findActivePromotionsByCategoryIds(
        categoryIds);

    Map<Long, Double> categoryDiscountMap = promotions.stream()
        .flatMap(p -> p.getPromotionCategories().stream()
            .map(pc -> Map.entry(pc.getCategory().getCategoryId(), p.getDiscountPercentage())))
        .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue, Math::max));

    Map<Long, Double> productDiscountMap = books.stream()
        .collect(Collectors.toMap(
            Book::getBookId,
            b -> categoryDiscountMap.getOrDefault(b.getCategory().getCategoryId(), 0D)
        ));

    Order order = new Order();
    order.setUser(user);
    order.setOrderDate(LocalDate.now());
    order.setStatus(EOrderStatus.PENDING_CONFIRMATION);
    double totalAmount = 0.0;

    List<OrderItem> orderItems = new ArrayList<>();
    for (CartItem cartItem : cart.getItems()) {
      Long productId = Long.parseLong(cartItem.getProductId());
      Book book = bookMap.get(productId);
      int quantity = cartItem.getQuantity();
      double discount = productDiscountMap.getOrDefault(productId, 0.0);
      double price = book.getPrice();

      double finalPricePerItem = price * (1 - discount / 100.0);
      double totalFinalPrice = finalPricePerItem * quantity;

      OrderItem orderItem = new OrderItem();
      orderItem.setOrder(order);
      orderItem.setBook(book);
      orderItem.setQuantity(quantity);
      orderItem.setPrice(price * 1000);
      orderItem.setDiscountPercentage(discount);
      orderItem.setFinalPrice(totalFinalPrice);

      totalAmount += (totalFinalPrice * 1000);
      orderItems.add(orderItem);
    }

    order.setOrderItems(orderItems);
    order.setTotalAmount(totalAmount);
    order.setAddress(defaultAddressOpt.get().getAddress());

    // Set payment method
    PaymentMethod paymentMethod = paymentMethodRepository.findById(paymentMethodId)
        .orElseThrow(() -> new ApplicationException(ErrorCode.UNKNOWN_EXCEPTION));
    order.setPaymentMethod(paymentMethod);

    // Save order
    orderRepository.save(order);
    orderItemRepository.saveAll(orderItems);

    // Clear cart
    cartService.removeItemsFromCart(user.getUserId(), selectedProductIds);

    return orderMapper.toOrderResponseDTO(order);
  }

  public Page<OrderResponseDTO> getOrdersWithPagination(Pageable pageable) {
    String username = SecurityUtils.getCurrentUsername();
    if (username == null) {
      throw new ApplicationException(ErrorCode.UNAUTHENTICATED);
    }
    User user = userRepository.findByUsername(username).orElseThrow(() -> new ApplicationException(ErrorCode.UNAUTHENTICATED));
    Page<Order> ordersPage = orderRepository.findAllByUser(user, pageable);
    return ordersPage.map(orderMapper::toOrderResponseDTO);
  }

  public Page<OrderResponseDTO> getOrdersWithPagination_ForAdmin(Pageable pageable) {
    Page<Order> ordersPage = orderRepository.findAll(pageable);
    return ordersPage.map(orderMapper::toOrderResponseDTO);
  }

  @Override
  public OrderDetailsResponseDTO getOrderById(Long id) {
    var order = orderRepository.findById(id)
            .orElseThrow(() -> new ApplicationException(ErrorCode.ORDER_NOT_FOUND));
    return orderMapper.toOrderDetailsResponseDTO(order);
  }

  @Override
  public void cancelOrder(Long orderId) {
    Order order = orderRepository.findById(orderId)
        .orElseThrow(() -> new ApplicationException(ErrorCode.UNKNOWN_EXCEPTION));

    if (order.getStatus() != EOrderStatus.PENDING_CONFIRMATION) {
      throw new ApplicationException(ErrorCode.CANT_CANCEL_ORDER);
    }

    order.setStatus(EOrderStatus.CANCELED);
    orderRepository.save(order);
  }
}
