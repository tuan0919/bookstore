package nlu.com.app.controller;

import lombok.RequiredArgsConstructor;
import nlu.com.app.dto.AppResponse;
import nlu.com.app.dto.cart.CartItem;
import nlu.com.app.dto.response.CartResponseDTO;
import nlu.com.app.entity.User;
import nlu.com.app.exception.ApplicationException;
import nlu.com.app.exception.ErrorCode;
import nlu.com.app.service.ICartService;
import nlu.com.app.service.impl.UserService;
import nlu.com.app.util.SecurityUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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
  public AppResponse<String> addToCart(@RequestBody CartItem cart) {
    String username = SecurityUtils.getCurrentUsername();
    if (username == null) {
      throw new ApplicationException(ErrorCode.UNAUTHENTICATED);
    }
    User user = userService.getUserByUserName(username);

    cartService.addOrUpdateCart(user.getUserId(), cart);
    return AppResponse.<String>builder().result("Add success").build();
  }

  @DeleteMapping("/delete/{productId}")
  public AppResponse<String> deleteFromCart(@PathVariable Long productId) {
    String username = SecurityUtils.getCurrentUsername();
    if (username == null) {
      throw new ApplicationException(ErrorCode.UNAUTHENTICATED);
    }
    User user = userService.getUserByUserName(username);

    cartService.deleteCartItem(user.getUserId(), productId);
    return AppResponse.<String>builder().result("Delete success").build();
  }

  @GetMapping
  public AppResponse<CartResponseDTO> getCart() {
    String username = SecurityUtils.getCurrentUsername();
    if (username == null) {
      throw new ApplicationException(ErrorCode.UNAUTHENTICATED);
    }
    User user = userService.getUserByUserName(username);

    return AppResponse.<CartResponseDTO>builder()
        .result(cartService.getCartByUserId(user.getUserId()))
        .build();
  }
}
