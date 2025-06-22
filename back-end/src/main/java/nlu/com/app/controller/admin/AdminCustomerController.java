package nlu.com.app.controller.admin;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import nlu.com.app.dto.AppResponse;
import nlu.com.app.dto.response.BookOverviewDTO;
import nlu.com.app.dto.response.UpdateBookResponse;
import nlu.com.app.dto.response.UserDetailsResponseDTO;
import nlu.com.app.service.IBookService;
import nlu.com.app.service.IUserDetailsService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

/**
 * @author Nguyen Tuan
 */
@RequestMapping("/admin/api/user")
@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AdminCustomerController {
    IUserDetailsService userDetailsService;

    @GetMapping("/{userId}/details")
    public AppResponse<UserDetailsResponseDTO> getUserDetails(@PathVariable Long userId) {
        return AppResponse.<UserDetailsResponseDTO>builder()
                .result(userDetailsService.getUserDetails(userId))
                .build();
    }
}
