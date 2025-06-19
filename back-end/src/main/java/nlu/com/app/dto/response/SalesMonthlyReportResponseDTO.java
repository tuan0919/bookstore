package nlu.com.app.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data @Builder
public class SalesMonthlyReportResponseDTO {
    List<Sale> sales;
    @Data @Builder
    public static class Sale {
        String name;
        Double total;
    }
}
