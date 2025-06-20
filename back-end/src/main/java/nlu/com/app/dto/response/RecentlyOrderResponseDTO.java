package nlu.com.app.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data @Builder
public class RecentlyOrderResponseDTO {
    List<Order> recentlyOrders;
    Integer totalOrdersInMonth;
    @Builder
    @Data
    public static class Order {
        String username;
        String email;
        Long totalAmount;
    }
}
