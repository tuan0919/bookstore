package nlu.com.app.repository;

import nlu.com.app.constant.EOrderStatus;
import nlu.com.app.entity.Order;
import nlu.com.app.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author VuLuu
 */
@Repository
public interface OrderRepository extends JpaRepository<Order, Long>, JpaSpecificationExecutor<Order> {

  Page<Order> findAllByUser(User user, Pageable pageable);
  List<Order> findByStatus(EOrderStatus status);
  @Query("SELECT COUNT(o) FROM Order o WHERE MONTH(o.orderDate) = :month AND YEAR(o.orderDate) = :year")
  int countByOrderDateMonthAndYear(@Param("month") int month, @Param("year") int year);
  List<Order> findTop5ByStatusOrderByOrderDateDesc(EOrderStatus status);
  // Đếm số đơn hàng đã giao thành công
  @Query("SELECT COUNT(o) FROM Order o WHERE o.user.userId = :userId AND o.status = 'DELIVERED'")
  int countDeliveredOrdersByUserId(@Param("userId") Long userId);

  // Tổng chi tiêu các đơn đã giao thành công
  @Query("SELECT SUM(o.totalAmount) FROM Order o WHERE o.user.userId = :userId AND o.status = 'DELIVERED'")
  Double sumDeliveredTotalAmountByUserId(@Param("userId") Long userId);

  // Tần suất mua hàng theo tháng (chỉ tính đơn đã giao thành công)
  @Query("SELECT FUNCTION('DATE_FORMAT', o.orderDate, '%Y-%m') as month, SUM(o.totalAmount) " +
          "FROM Order o WHERE o.user.userId = :userId AND o.status = 'DELIVERED' " +
          "GROUP BY month ORDER BY month")
  List<Object[]> sumDeliveredAmountGroupByMonth(@Param("userId") Long userId);
}
