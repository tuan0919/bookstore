package nlu.com.app.configuration.batch;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
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
    System.out.println("CartWriter is executing with size: " + chunk.size());
    for (Cart cart : chunk) {
      User user = userRepository.findById(Long.parseLong(cart.getUserId()))
          .orElse(null);
      if (user == null) {
        continue;
      }

      ShoppingCart shoppingCart = shoppingCartRepository
          .findByUser(user)
          .orElseGet(() -> {
            ShoppingCart newCart = new ShoppingCart();
            newCart.setUser(user);
            return shoppingCartRepository.save(newCart);
          });

      // Step 1: Load items in DB
      List<ShoppingCartItem> dbItems = shoppingCartItemRepository.findAllByShoppingCart(
          shoppingCart);
      Map<Long, ShoppingCartItem> dbItemMap = dbItems.stream()
          .collect(Collectors.toMap(item -> item.getBook().getBookId(), item -> item));

      // Step 2: Iterate through new items from Redis
      Set<Long> processedBookIds = new HashSet<>();

      for (CartItem item : cart.getItems()) {
        Long bookId = Long.parseLong(item.getProductId());
        Book book = bookRepository.findById(bookId).orElse(null);
        if (book == null) {
          continue;
        }

        processedBookIds.add(bookId);

        ShoppingCartItem dbItem = dbItemMap.get(bookId);
        if (dbItem != null) {
          // Update if quantity changed
          if (!(dbItem.getQty() == item.getQuantity())) {
            dbItem.setQty(item.getQuantity());
            shoppingCartItemRepository.save(dbItem);
          }
        } else {
          // New item
          ShoppingCartItem newItem = ShoppingCartItem.builder()
              .shoppingCart(shoppingCart)
              .book(book)
              .qty(item.getQuantity())
              .build();
          shoppingCartItemRepository.save(newItem);
        }
      }

      // Step 3: Delete removed items
      for (ShoppingCartItem dbItem : dbItems) {
        if (!processedBookIds.contains(dbItem.getBook().getBookId())) {
          shoppingCartItemRepository.delete(dbItem);
        }
      }
    }
  }

}
