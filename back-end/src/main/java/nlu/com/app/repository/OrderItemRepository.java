package nlu.com.app.repository;

import nlu.com.app.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author VuLuu
 */
@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    @Query("""
        SELECT oi.book.bookId, oi.book.title, 
               (SELECT bi.imageUrl FROM BookImage bi WHERE bi.book.bookId = oi.book.bookId AND bi.isThumbnail = true),
               SUM(oi.quantity),
               MAX(oi.order.orderId),
               MAX(oi.order.orderDate)
        FROM OrderItem oi
        WHERE oi.order.status = 'DELIVERED'
        GROUP BY oi.book.bookId, oi.book.title
        ORDER BY SUM(oi.quantity) DESC
        """)
    List<Object[]> findTopSellingBooks();
}
