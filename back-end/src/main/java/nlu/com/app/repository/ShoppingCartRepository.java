package nlu.com.app.repository;

import java.util.Optional;
import nlu.com.app.entity.ShoppingCart;
import nlu.com.app.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author VuLuu
 */
@Repository
public interface ShoppingCartRepository extends JpaRepository<ShoppingCart, Long> {

  Optional<ShoppingCart> findByUser(User user);
}
