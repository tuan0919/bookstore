package nlu.com.app.dto.spec;

import nlu.com.app.constant.EOrderStatus;
import nlu.com.app.dto.filter.OrderFilter;
import nlu.com.app.entity.Order;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;

public class OrderSpecifications {
    public static Specification<Order> withStatus(String status) {
        return (root, query, cb) -> {
            if (status == null) return null;
            return cb.equal(root.get("status"), EOrderStatus.valueOf(status));
        };
    }

    public static Specification<Order> withUsername(String username) {
        return (root, query, cb) -> {
            if (username == null) return null;
            return cb.equal(root.get("user").get("username"), username);
        };
    }

    public static Specification<Order> withUserId(Long userId) {
        return (root, query, cb) -> {
            if (userId == null) return null;
            return cb.equal(root.get("user").get("userId"), userId);
        };
    }

    public static Specification<Order> betweenDates(LocalDate start, LocalDate end) {
        return (root, query, cb) -> {
            if (start == null || end == null) return null;
            return cb.between(root.get("orderDate"), start, end);
        };
    }

    public static Specification<Order> amountBetween(Long min, Long max) {
        return (root, query, cb) -> {
            if (min == null && max == null) return null;
            if (min != null && max != null)
                return cb.between(root.get("totalAmount"), min, max);
            if (min != null)
                return cb.greaterThanOrEqualTo(root.get("totalAmount"), min);
            return cb.lessThanOrEqualTo(root.get("totalAmount"), max);
        };
    }

    public static Specification<Order> combineFilters(OrderFilter filter) {
        return Specification.where(withStatus(filter.getStatus()))
                .and(withUsername(filter.getUsername()))
                .and(betweenDates(filter.getStartDate(), filter.getEndDate()))
                .and(amountBetween(filter.getMinAmount(), filter.getMaxAmount()))
                .and(withUserId(filter.getUserId()));
    }
}
