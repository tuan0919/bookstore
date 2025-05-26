package nlu.com.app.service;

import java.util.List;
import java.util.Optional;
import nlu.com.app.dto.cart.Cart;
import nlu.com.app.dto.cart.CartItem;
import nlu.com.app.dto.response.CartResponseDTO;

/**
 * @author VuLuu
 */
public interface ICartService {

  void saveCart(Long userId, Cart cart);

  Optional<Cart> getCart(Long userId);

  void deleteCart(Long userId);

  CartResponseDTO getCartByUserId(Long userId);

  void deleteCartItem(Long userId, Long productId);

  void addOrUpdateCart(Long userId, CartItem newItem);

  void removeItemsFromCart(Long userId, List<Long> productIds);

}
