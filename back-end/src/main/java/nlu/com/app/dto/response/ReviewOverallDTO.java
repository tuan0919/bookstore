package nlu.com.app.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ReviewOverallDTO {
    Long bookId;
    Double avgScore;
    Long total;
    // [1 star rate, 2 star rate, ...]
    List<Double> rates;
}
