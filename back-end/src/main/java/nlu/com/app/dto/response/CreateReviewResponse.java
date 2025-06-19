package nlu.com.app.dto.response;


import lombok.Data;

@Data
public class CreateReviewResponse {
    Long review_id;
    Double rating;
    String review_text;
    String review_type;
    Long book_id;
    Long collection_id;
    String created_at;
    User user;

    @Data
    public static class User {
        Long id;
        String username;
    }
}
