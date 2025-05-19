package nlu.com.app.controller;

import lombok.RequiredArgsConstructor;
import nlu.com.app.dto.cart.Cart;
import nlu.com.app.dto.cart.CartItem;
import nlu.com.app.entity.User;
import nlu.com.app.service.ICartService;
import nlu.com.app.service.impl.CartService;
import nlu.com.app.service.impl.UserService;
import nlu.com.app.util.SecurityUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author VuLuu
 */
@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

  private final ICartService cartService;
  private final UserService userService;

  @PostMapping("/add")
  public ResponseEntity<?> addToCart(@RequestBody CartItem cart) {
    String username = SecurityUtils.getCurrentUsername();
    if (username == null) {
      return ResponseEntity.status(401).body("Unauthorized");
    }

    User user = userService.getUserByUserName(username);

    cartService.addOrUpdateCart(user.getUserId(), cart);
    return ResponseEntity.ok("Added to cart");
  }

  @PutMapping("/update")
  public ResponseEntity<?> updateCart(@RequestBody CartItem cart) {
    String username = SecurityUtils.getCurrentUsername();
    if (username == null) {
      return ResponseEntity.status(401).body("Unauthorized");
    }
    User user = userService.getUserByUserName(username);

    cartService.addOrUpdateCart(user.getUserId(), cart);
    return ResponseEntity.ok("Cart updated");
  }

  @DeleteMapping("/delete/{productId}")
  public ResponseEntity<?> deleteFromCart(@PathVariable Long productId) {
    String username = SecurityUtils.getCurrentUsername();
    if (username == null) {
      return ResponseEntity.status(401).body("Unauthorized");
    }
    User user = userService.getUserByUserName(username);

    cartService.deleteCartItem(user.getUserId(), productId);
    return ResponseEntity.ok("Deleted from cart");
  }

  @GetMapping
  public ResponseEntity<?> getCart() {
    String username = SecurityUtils.getCurrentUsername();
    if (username == null) {
      return ResponseEntity.status(401).body("Unauthorized");
    }
    User user = userService.getUserByUserName(username);

    Cart cart = cartService.getCartByUserId(user.getUserId());
    return ResponseEntity.ok(cart);
  }
}
