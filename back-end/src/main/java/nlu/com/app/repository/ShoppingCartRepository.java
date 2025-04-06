package nlu.com.app.repository;

import nlu.com.app.entity.ShoppingCart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author VuLuu
 */
@Repository
public interface ShoppingCartRepository extends JpaRepository<ShoppingCart, Long> {

}
