package nlu.com.app.controller;

import lombok.RequiredArgsConstructor;
import nlu.com.app.dto.AppResponse;
import nlu.com.app.dto.request.LoginUserDTO;
import nlu.com.app.dto.request.RegisterUserDTO;
import nlu.com.app.service.impl.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/v1/auth") // => /api/v1/auth/register
@RestController
@RequiredArgsConstructor
public class AuthController {
    private final UserService userService;

    @PostMapping("/register")
    public AppResponse<String> register(@RequestBody RegisterUserDTO requestDTO) {
        userService.registerUser(requestDTO);
        return AppResponse.<String>builder()
                .result("OK")
                .build();
    }

    @PostMapping("/login")
    public AppResponse<String> login(@RequestBody LoginUserDTO requestDTO) {
        var token = userService.verify(requestDTO);
        return AppResponse.<String>builder()
                .result(token)
                .build();
    }
}
