package nlu.com.app.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import nlu.com.app.dto.cart.Cart;
import nlu.com.app.dto.cart.CartItem;
import nlu.com.app.dto.response.CartResponseDTO;
import nlu.com.app.entity.Book;
import nlu.com.app.entity.Promotion;
import nlu.com.app.mapper.CartMapper;
import nlu.com.app.repository.BookRepository;
import nlu.com.app.repository.PromotionCategoriesRepository;
import nlu.com.app.service.ICartService;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CartService implements ICartService {

  private final RedisTemplate<String, Object> redisTemplate;

  private final ObjectMapper objectMapper = new ObjectMapper();
  private final CartMapper cartMapper;
  private final BookRepository bookRepository;
  private final PromotionCategoriesRepository promotionCategoriesRepository;

  private String getKey(Long userId) {
    return "cart:user:" + userId;
  }

  @Override
  public void saveCart(Long userId, Cart cart) {
    try {
      String json = objectMapper.writeValueAsString(cart);
      System.out.println(json);
      redisTemplate.opsForValue().set(getKey(userId), json);
    } catch (JsonProcessingException e) {
      e.printStackTrace();
    }
  }

  @Override
  public Optional<Cart> getCart(Long userId) {
    Object jsonObj = redisTemplate.opsForValue().get(getKey(userId));
    System.out.println(jsonObj);
    if (jsonObj == null) {
      return Optional.empty();
    }

    try {
      String json = jsonObj.toString();
      Cart cart = objectMapper.readValue(json, Cart.class);
      return Optional.of(cart);
    } catch (IOException e) {
      e.printStackTrace();
      return Optional.empty();
    }
  }

  @Override
  public void deleteCart(Long userId) {
    redisTemplate.delete(getKey(userId));
  }

  @Override
  public void addOrUpdateCart(Long userId, CartItem newItem) {
    Cart cart = getCart(userId).orElse(new Cart());
    cart.setUserId(String.valueOf(userId));

    if (cart.getItems() == null) {
      cart.setItems(new ArrayList<>());
    }

    boolean updated = false;
    for (CartItem item : cart.getItems()) {
      if (item.getProductId().equals(newItem.getProductId())) {
        int updatedQuantity = item.getQuantity() + newItem.getQuantity();
        if (updatedQuantity <= 0) {
          cart.getItems().remove(item);
        } else {
          item.setQuantity(updatedQuantity);
        }
        updated = true;
        break;
      }
    }

    if (!updated && newItem.getQuantity() > 0) {
      cart.getItems().add(newItem);
    }

    saveCart(userId, cart);
  }

  @Override
  public void deleteCartItem(Long userId, Long productId) {
    Optional<Cart> cartOpt = getCart(userId);
    if (cartOpt.isPresent()) {
      Cart cart = cartOpt.get();
      cart.getItems().removeIf(item -> item.getProductId().equals(productId.toString()));
      saveCart(userId, cart);
    }
  }

  @Override
  public CartResponseDTO getCartByUserId(Long userId) {
    Cart cart = getCart(userId).orElse(new Cart());
    if (cart.getItems() == null) return new CartResponseDTO();
    List<Long> productIds = cart.getItems().stream()
        .map(item -> {
          try {
            return Long.parseLong(item.getProductId());
          } catch (Exception e) {
            return null;
          }
        })
        .filter(id -> id != null)
        .toList();

    List<Book> books = bookRepository.findAllById(productIds);
    List<Long> categoryIds = books.stream()
        .map(book -> book.getCategory().getCategoryId())
        .distinct()
        .toList();

    List<Promotion> promotions = promotionCategoriesRepository.findActivePromotionsByCategoryIds(
        categoryIds);

    Map<Long, Double> categoryDiscountMap = promotions.stream()
        .flatMap(promotion -> promotion.getPromotionCategories().stream()
            .map(pc -> Map.entry(pc.getCategory().getCategoryId(),
                promotion.getDiscountPercentage())))
        .collect(Collectors.toMap(
            Map.Entry::getKey,
            Map.Entry::getValue,
            Math::max
        ));

    Map<Long, Double> productDiscountMap = books.stream()
        .collect(Collectors.toMap(
            Book::getBookId,
            book -> categoryDiscountMap.getOrDefault(book.getCategory().getCategoryId(), 0D)
        ));

    return cartMapper.toCartResponseDTO(cart, bookRepository, productDiscountMap);
  }
  @Override
  public void removeItemsFromCart(Long userId, List<Long> productIds) {
    Optional<Cart> cartOpt = getCart(userId);
    if (cartOpt.isPresent()) {
      Cart cart = cartOpt.get();
      cart.getItems().removeIf(item -> productIds.contains(Long.parseLong(item.getProductId())));
      saveCart(userId, cart);
    }
  }
}
