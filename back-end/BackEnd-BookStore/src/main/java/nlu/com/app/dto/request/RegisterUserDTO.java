package nlu.com.app.dto.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RegisterUserDTO {
    private String username;
    private String password;
}
