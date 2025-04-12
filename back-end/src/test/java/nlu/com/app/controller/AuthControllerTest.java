package nlu.com.app.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import nlu.com.app.dto.request.RegisterUserDTO;
import nlu.com.app.exception.ApplicationException;
import nlu.com.app.exception.ErrorCode;
import nlu.com.app.service.impl.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@Slf4j
@AutoConfigureMockMvc
@SpringBootTest
public class AuthControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @MockitoBean
    private UserService userService;
    private RegisterUserDTO registerUserDTO;

    @BeforeEach
    void initData() {
        registerUserDTO = RegisterUserDTO.builder()
                .username("nqat0919")
                .password("123")
                .build();
    }

    @Test
    void login_validRequest_success() throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        String requestJSON = mapper.writeValueAsString(registerUserDTO);
        Mockito.doNothing().when(userService).registerUser(ArgumentMatchers.any());
        mockMvc.perform(MockMvcRequestBuilders
                .post("/api/v1/auth/register")
                .content(requestJSON)
                .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("code")
        .value(1000));
    }

    @Test
    void login_validRequest_failed() throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        registerUserDTO.setUsername("user_test");
        String requestJSON = mapper.writeValueAsString(registerUserDTO);
        Mockito.doThrow(new ApplicationException(ErrorCode.USER_ALREADY_EXISTED))
                .when(userService)
                .registerUser(registerUserDTO);
        mockMvc.perform(MockMvcRequestBuilders
                        .post("/api/v1/auth/register")
                        .content(requestJSON)
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(MockMvcResultMatchers.status().isBadRequest())
                .andExpect(MockMvcResultMatchers.jsonPath("message")
                        .value("User is already existed!"))
                .andExpect(MockMvcResultMatchers.jsonPath("code")
                        .value(1004));
    }
}
