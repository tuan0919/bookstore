package nlu.com.app.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
public class PromotionResponseDTO {
    Long promotionId;
    Float discountPercentage;
    String promotionName;
    String startDate;
    String endDate;
    String status;
    List<Category> categories;

    @Data
    @Builder
    public static class Category {
        String categoryName;
        Long categoryId;
    }
}
