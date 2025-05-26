package nlu.com.app.repository;

import nlu.com.app.entity.Order;
import nlu.com.app.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author VuLuu
 */
@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

  Page<Order> findAllByUser(User user, Pageable pageable);
}
