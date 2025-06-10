package nlu.com.app.dto.request;


import lombok.Data;
import nlu.com.app.constant.ReviewType;

@Data
public class CreateReviewRequest {
    Integer rating;
    String review_text;
    ReviewType review_type;
    Long book_id;
    Long collection_id;
}
