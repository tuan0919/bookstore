package nlu.com.app.dto.response;

import lombok.Builder;
import lombok.Data;

@Data @Builder
public class UserDetailsResponseDTO {
    Long userId;
    String fullname; // default: "Chưa thiết lập"
    String gender; // default: "Chưa thiết lập"
    String phoneNum; // default: "Chưa thiết lập"
    Boolean verified;
    String email; // default: "Chưa thiết lập"
    String username;
    String createdDate; // dd-MM-YYYYY
    String defaultAddress; // default: "Chưa thiết lập"
}
