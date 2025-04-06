package nlu.com.app.repository;

import nlu.com.app.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author VuLuu
 */
@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

}
