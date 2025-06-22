package nlu.com.app.service;

import nlu.com.app.dto.response.UserDetailsResponseDTO;
import nlu.com.app.entity.User;
import nlu.com.app.entity.UserDetails;

public interface IUserDetailsService {
    UserDetails getUserDetailsByUserId(Long userId);
    boolean updateUserDetails(UserDetails userDetails, Long userId);
    boolean addUserDetails( UserDetails userDetails, Long userId);
    UserDetailsResponseDTO getUserDetails(Long userId);
}
