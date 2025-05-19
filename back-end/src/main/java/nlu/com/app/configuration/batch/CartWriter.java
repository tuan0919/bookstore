package nlu.com.app.configuration.batch;

import java.util.Optional;
import lombok.RequiredArgsConstructor;
import nlu.com.app.dto.cart.Cart;
import nlu.com.app.dto.cart.CartItem;
import nlu.com.app.entity.Book;
import nlu.com.app.entity.ShoppingCart;
import nlu.com.app.entity.ShoppingCartItem;
import nlu.com.app.entity.User;
import nlu.com.app.repository.BookRepository;
import nlu.com.app.repository.ShoppingCartItemRepository;
import nlu.com.app.repository.ShoppingCartRepository;
import nlu.com.app.repository.UserRepository;
import org.springframework.batch.item.Chunk;
import org.springframework.batch.item.ItemWriter;
import org.springframework.stereotype.Component;

/**
 * @author VuLuu
 */
@Component
@RequiredArgsConstructor
public class CartWriter implements ItemWriter<Cart> {

  private final ShoppingCartRepository shoppingCartRepository;
  private final ShoppingCartItemRepository shoppingCartItemRepository;
  private final UserRepository userRepository;
  private final BookRepository bookRepository;

  @Override
  public void write(Chunk<? extends Cart> chunk) throws Exception {
    for (Cart cart : chunk) {
      User user = userRepository.findById(Long.parseLong(cart.getUserId()))
          .orElse(null);
      if (user == null) {
        continue;
      }

      Optional<ShoppingCart> optionalCart = shoppingCartRepository.findByUser(user);

      ShoppingCart shoppingCart = optionalCart.orElseGet(() -> {
        ShoppingCart newCart = new ShoppingCart();
        newCart.setUser(user);
        return shoppingCartRepository.save(newCart);
      });

      shoppingCartItemRepository.deleteAllByShoppingCart(shoppingCart);

      for (CartItem item : cart.getItems()) {
        Book book = bookRepository.findById(Long.parseLong(item.getProductId()))
            .orElse(null);
        if (book == null) {
          continue;
        }

        ShoppingCartItem cartItem = ShoppingCartItem.builder()
            .qty(item.getQuantity())
            .shoppingCart(shoppingCart)
            .book(book)
            .build();

        shoppingCartItemRepository.save(cartItem);
      }
    }
  }
}
