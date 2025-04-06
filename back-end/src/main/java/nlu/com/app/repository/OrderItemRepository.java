package nlu.com.app.repository;

import nlu.com.app.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author VuLuu
 */
@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

}
