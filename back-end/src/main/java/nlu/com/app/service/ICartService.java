package nlu.com.app.service;

import java.util.Optional;
import nlu.com.app.dto.cart.Cart;
import nlu.com.app.dto.cart.CartItem;

/**
 * @author VuLuu
 */
public interface ICartService {

  void saveCart(Long userId, Cart cart);

  Optional<Cart> getCart(Long userId);

  void deleteCart(Long userId);

  Cart getCartByUserId(Long userId);

  void deleteCartItem(Long userId, Long productId);

  void addOrUpdateCart(Long userId, CartItem newItem);
}
