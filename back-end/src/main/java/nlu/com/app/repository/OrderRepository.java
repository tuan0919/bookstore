package nlu.com.app.repository;

import com.paypal.sdk.models.OrderStatus;
import nlu.com.app.constant.EOrderStatus;
import nlu.com.app.entity.Order;
import nlu.com.app.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author VuLuu
 */
@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

  Page<Order> findAllByUser(User user, Pageable pageable);
  List<Order> findByStatus(EOrderStatus status);
  @Query("SELECT COUNT(o) FROM Order o WHERE MONTH(o.orderDate) = :month AND YEAR(o.orderDate) = :year")
  int countByOrderDateMonthAndYear(@Param("month") int month, @Param("year") int year);
  List<Order> findTop5ByStatusOrderByOrderDateDesc(EOrderStatus status);
}
