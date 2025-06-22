package nlu.com.app.controller;

import lombok.Builder;
import lombok.RequiredArgsConstructor;
import nlu.com.app.dto.AppResponse;
import nlu.com.app.dto.request.UserDetailsDTO;
import nlu.com.app.entity.User;
import nlu.com.app.entity.UserDetails;
import nlu.com.app.exception.ApplicationException;
import nlu.com.app.exception.ErrorCode;
import nlu.com.app.service.IUserDetailsService;
import nlu.com.app.service.impl.UserService;
import nlu.com.app.util.SecurityUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user-details")
@RequiredArgsConstructor
public class UserDetailsController {
    private final IUserDetailsService userDetailsService;
    private final UserService userService;

    @PostMapping("/add")
    public AppResponse<String> add(@RequestBody UserDetailsDTO userDetails) {
        User user = getUser();

        boolean result = userDetailsService.addUserDetails(UserDetails.builder()
                .fullname(userDetails.getFullName())
                .dob(userDetails.getDateOfBirth())
                .phoneNum(userDetails.getPhoneNum())
                .user(user)
                .build());

        return AppResponse.<String>builder().result("Add success").build();

    }

    @GetMapping
    public AppResponse<UserDetailsDTO> getUserDetails() {
        User user = getUser();
        UserDetails userDetails = userDetailsService.getUserDetailsByUserId(user.getUserId());
        UserDetailsDTO userDetailsDTO = new UserDetailsDTO();
        userDetailsDTO.setFullName(userDetails.getFullname());
        userDetailsDTO.setDateOfBirth(userDetails.getDob());
        userDetailsDTO.setPhoneNum(userDetails.getPhoneNum());

        return AppResponse.<UserDetailsDTO>builder().result(userDetailsDTO).build();
    }

    private User getUser() {
        String username = SecurityUtils.getCurrentUsername();
        if (username == null) {
            throw new ApplicationException(ErrorCode.UNAUTHENTICATED);
        }
        User user = userService.getUserByUserName(username);
        return user;
    }
}
