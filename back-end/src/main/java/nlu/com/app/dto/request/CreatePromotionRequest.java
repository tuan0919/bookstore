package nlu.com.app.dto.request;

import lombok.Data;

import java.util.List;

@Data
public class CreatePromotionRequest {
    String promotionName;
    Float discountPercentage;
    String startDate;
    String endDate;
    List<Long> categoryIds;
}
