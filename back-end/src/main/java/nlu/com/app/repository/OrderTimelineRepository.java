package nlu.com.app.repository;

import nlu.com.app.entity.OrderItem;
import nlu.com.app.entity.OrderTimeline;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author Nguyen Tuan
 */
@Repository
public interface OrderTimelineRepository extends JpaRepository<OrderTimeline, Long> {
    List<OrderTimeline> findByOrderOrderIdOrderByCreatedAtAsc(Long orderId);
}
