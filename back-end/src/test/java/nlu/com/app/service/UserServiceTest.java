package nlu.com.app.service;

import nlu.com.app.dto.request.RegisterUserDTO;
import nlu.com.app.entity.User;
import nlu.com.app.exception.ApplicationException;
import nlu.com.app.exception.ErrorCode;
import nlu.com.app.repository.UserRepository;
import nlu.com.app.service.impl.UserService;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
public class UserServiceTest {
    @MockitoBean
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Test
    public void registerUserTest_validRequest_success() {
        var dto = RegisterUserDTO.builder()
                .username("test_1")
                .password("123")
                .build();
        var user = User.builder()
                .username("test_1")
                .password("123")
                .build();
        when(userRepository.findByUsername(any()))
                .thenReturn(Optional.empty());
        when(userRepository.save(any(User.class)))
                .thenReturn(user);
        Assertions.assertThatNoException()
                .isThrownBy(() -> userService.registerUser(dto));
    }

    @Test
    public void registerUserTest_validRequest_failed() {
        var dto = RegisterUserDTO.builder()
                .username("user_test")
                .password("123")
                .build();

        var existingUser = User.builder()
                .username("user_test")
                .password("hashedPassword")
                .build();

        when(userRepository.findByUsername("user_test"))
                .thenReturn(Optional.of(existingUser));
        var exception = assertThrows(ApplicationException.class, () -> userService.registerUser(dto));
        assertThat(exception.getErrorCode()).isEqualTo(ErrorCode.USER_ALREADY_EXISTED);
        verify(userRepository, never()).save(any(User.class));
    }
}
