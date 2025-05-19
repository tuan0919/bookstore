package nlu.com.app.service.impl;

import java.util.ArrayList;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import nlu.com.app.dto.cart.Cart;
import nlu.com.app.dto.cart.CartItem;
import nlu.com.app.service.ICartService;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CartService implements ICartService {

  private final RedisTemplate<String, Object> redisTemplate;

  private String getKey(Long userId) {
    return "cart:user:" + userId;
  }

  @Override
  public void saveCart(Long userId, Cart cart) {
    redisTemplate.opsForValue().set(getKey(userId), cart);
  }

  @Override
  public Optional<Cart> getCart(Long userId) {
    Object cart = redisTemplate.opsForValue().get(getKey(userId));
    return Optional.ofNullable((Cart) cart);
  }

  @Override
  public void deleteCart(Long userId) {
    redisTemplate.delete(getKey(userId));
  }

  @Override
  public void addOrUpdateCart(Long userId, CartItem newItem) {
    Cart cart = getCart(userId).orElse(new Cart());
    //cart.setUserId(String.valueOf(userId));

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
      cart.getItems().removeIf(item -> item.getProductId().equals(productId));
      saveCart(userId, cart);
    }
  }

  @Override
  public Cart getCartByUserId(Long userId) {
    return getCart(userId).orElse(new Cart());
  }
}
