package nlu.com.app.service.impl;

import lombok.RequiredArgsConstructor;
import nlu.com.app.constant.UserRole;
import nlu.com.app.dto.request.LoginUserDTO;
import nlu.com.app.dto.request.RegisterUserDTO;
import nlu.com.app.entity.User;
import nlu.com.app.entity.UserDetails;
import nlu.com.app.exception.ApplicationException;
import nlu.com.app.exception.ErrorCode;
import nlu.com.app.mapper.UserMapper;
import nlu.com.app.repository.UserDetailsRepository;
import nlu.com.app.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

  private final UserRepository userRepository;
  private final UserMapper userMapper;
  private final PasswordEncoder passwordEncoder;
  private final JWTService jwtService;
  private final AuthenticationManager authenticationManager;

  @Transactional
  public void registerUser(RegisterUserDTO requestDTO) {
    // check if user is existed
    var oUser = userRepository.findByUsername(requestDTO.getUsername());
    if (oUser.isPresent()) {
      throw new ApplicationException(ErrorCode.USER_ALREADY_EXISTED);
    }
    var user = userMapper.toEntity(requestDTO);
    user.setPassword(passwordEncoder.encode(requestDTO.getPassword()));
    user.setRole(UserRole.CUSTOMER);
    userRepository.save(user);
  }

  public String verify(LoginUserDTO requestDTO) {
    var authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(requestDTO.getUsername(),
            requestDTO.getPassword()));
    if (authentication.isAuthenticated()) {
      return jwtService.generateToken(requestDTO.getUsername());
    } else {
      throw new ApplicationException(ErrorCode.USER_NOT_EXISTED);
    }
  }

  public User getUserByUserName(String username) {
    User user = userRepository.findByUsername(username)
        .orElseThrow(() -> new ApplicationException(ErrorCode.UNAUTHENTICATED));
    return user;
  }

}
