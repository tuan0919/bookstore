package nlu.com.app.dto.response;

import lombok.Builder;
import lombok.Data;

@Data @Builder
public class SummaryDashboardResponseDTO {
    Profit profit;
    Customer customer;
    Product mostSellInMonth;
    Order order;

    @Data @Builder
    public static class Product {
        String thumbnail;
        String title;
        Integer soldAmount; // tổng số lượng bán trong tháng
    }

    @Data @Builder
    public static class Profit {
        Long total; // tổng doanh thu cho đến hiện tại
        Long thisMonth; // tổng doanh thu tháng này
        Float diffPercent; // tỉ lệ chênh lệch giữa tháng này và tổng
    }

    @Data @Builder
    public static class Customer {
        Long total; // tổng lượng khách đang có
        Long thisMonth; // tổng lượng khách mới trong tháng này
        Float diffPercent; // tỉ lệ chênh lệch giữa tháng này và tổng
    }

    @Data @Builder
    public static class Order {
        Long total;
        Long thisMonth;
        Float diffPercent;
    }
}
