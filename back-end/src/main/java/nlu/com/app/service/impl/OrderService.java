package nlu.com.app.service.impl;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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
import nlu.com.app.dto.filter.OrderFilter;
import nlu.com.app.dto.request.UpdateOrderStatus;
import nlu.com.app.dto.response.OrderDetailsResponseDTO;
import nlu.com.app.dto.response.OrderResponseDTO;
import nlu.com.app.dto.response.TimelineOrderResponseDTO;
import nlu.com.app.dto.response.TopSellingProductDTO;
import nlu.com.app.dto.spec.OrderSpecifications;
import nlu.com.app.entity.*;
import nlu.com.app.exception.ApplicationException;
import nlu.com.app.exception.ErrorCode;
import nlu.com.app.mapper.OrderMapper;
import nlu.com.app.repository.*;
import nlu.com.app.service.IOrderService;
import nlu.com.app.util.SecurityUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
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
  OrderTimelineRepository orderTimelineRepository;
  // Định dạng ngày tháng theo mẫu: 23 th4, 2025 - 09:40 AM
  private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("d 'th'M, yyyy - hh:mm a");

  @Override
  @Transactional
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

    OrderTimeline orderTimeline = OrderTimeline.builder()
            .createdAt(LocalDateTime.now())
            .orderStatus(EOrderStatus.PENDING_CONFIRMATION)
            .name("Đơn hàng đã được tạo")
            .description("Khách hàng xác nhận đơn hàng, chờ xác nhận.")
            .order(order)
            .build();

    // Save order
    orderRepository.save(order);
    orderItemRepository.saveAll(orderItems);
    orderTimelineRepository.save(orderTimeline);

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

  public Page<OrderDetailsResponseDTO> getOrdersWithPagination_ForAdmin(Pageable pageable) {
    Page<Order> ordersPage = orderRepository.findAll(pageable);
    return ordersPage.map(orderMapper::toOrderDetailsResponseDTO);
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

  @Override
  @Transactional
  public String updateOrderStatus(Long orderId, UpdateOrderStatus request) {
    // 1. Lấy đơn hàng
    Order order = orderRepository.findById(orderId)
            .orElseThrow(() -> new ApplicationException(ErrorCode.ORDER_NOT_FOUND));

    EOrderStatus currentStatus = order.getStatus();
    EOrderStatus newStatus = EOrderStatus.valueOf(request.getStatus());

    // 2. Kiểm tra logic hủy đơn hàng
    if (newStatus == EOrderStatus.CANCELED) {
      if (!(currentStatus == EOrderStatus.PENDING_CONFIRMATION || currentStatus == EOrderStatus.CONFIRMED)) {
        throw new ApplicationException(ErrorCode.CANT_CANCEL_ORDER);
      }
    }

    // 3. Cập nhật trạng thái mới
    order.setStatus(newStatus);
    orderRepository.save(order);

    // 4. Tạo timeline phù hợp với trạng thái mới
    OrderTimeline.OrderTimelineBuilder timelineBuilder = OrderTimeline.builder()
            .createdAt(LocalDateTime.now())
            .orderStatus(newStatus)
            .order(order);

    switch (newStatus) {
      case PENDING_CONFIRMATION:
        timelineBuilder
                .name("Đơn hàng đã được tạo")
                .description("Khách hàng xác nhận đơn hàng, chờ xác nhận.");
        break;
      case CONFIRMED:
        timelineBuilder
                .name("Đơn hàng đã được xác nhận")
                .description("Đơn hàng đã được xác nhận bởi quản trị viên.");
        break;
      case SHIPPING:
        timelineBuilder
                .name("Đơn hàng đang được vận chuyển")
                .description("Đơn hàng đã được giao cho đơn vị vận chuyển.");
        break;
      case DELIVERED:
        timelineBuilder
                .name("Đơn hàng đã giao thành công")
                .description("Khách hàng đã nhận được đơn hàng.");
        break;
      case CANCELED:
        timelineBuilder
                .name("Đơn hàng đã bị hủy")
                .description("Đơn hàng đã bị hủy bởi khách hàng hoặc quản trị viên.");
        break;
    }

    orderTimelineRepository.save(timelineBuilder.build());

    return "Cập nhật trạng thái đơn hàng thành công";
  }

  @Override
  public TimelineOrderResponseDTO getTimelineOrder(Long orderId) {
    // Lấy danh sách timeline theo orderId, sắp xếp theo thời gian tăng dần
    List<OrderTimeline> timelines = orderTimelineRepository.findByOrderOrderIdOrderByCreatedAtAsc(orderId);

    // Map sang DTO và định dạng ngày tháng
    List<TimelineOrderResponseDTO.Timeline> dtoTimelines = timelines.stream()
            .map(t -> TimelineOrderResponseDTO.Timeline.builder()
                    .name(t.getName())
                    .description(t.getDescription())
                    .createdAt(t.getCreatedAt().format(FORMATTER))
                    .build())
            .collect(Collectors.toList());

    return TimelineOrderResponseDTO.builder()
            .timelines(dtoTimelines)
            .build();
  }

  @Override
  public Page<OrderDetailsResponseDTO> getFilteredOrders(Pageable pageable, OrderFilter filter) {
    Specification<Order> spec = OrderSpecifications.combineFilters(filter);
    Page<Order> ordersPage = orderRepository.findAll(spec, pageable);
    return ordersPage.map(orderMapper::toOrderDetailsResponseDTO);
  }
}
