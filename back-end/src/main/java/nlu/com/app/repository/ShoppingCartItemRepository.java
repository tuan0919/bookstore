package nlu.com.app.repository;

import nlu.com.app.entity.ShoppingCart;
import nlu.com.app.entity.ShoppingCartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author VuLuu
 */
@Repository
public interface ShoppingCartItemRepository extends JpaRepository<ShoppingCartItem, Long> {

  void deleteAllByShoppingCart(ShoppingCart shoppingCart);
}
