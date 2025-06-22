package nlu.com.app.dto.filter;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data @Builder
public class OrderFilter {
    String status;
    String username;
    Long userId;
    LocalDate startDate;
    LocalDate endDate;
    Long minAmount;
    Long maxAmount;
}
