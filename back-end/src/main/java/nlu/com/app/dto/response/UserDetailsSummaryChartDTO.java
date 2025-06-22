package nlu.com.app.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class UserDetailsSummaryChartDTO {
    Integer totalOrders; // Tổng số hóa đơn
    Integer totalPayAmounts; // Tổng chi tiêu của khách hàng
    List<PayInMonth> frequency;
    // Tần suất mua hàng
    @Data
    @AllArgsConstructor
    public static class PayInMonth {
        String name; // tên tháng
        Long amount; // tổng mua trong tháng
    }
}
