package nlu.com.app.service.impl;

import lombok.RequiredArgsConstructor;
import nlu.com.app.entity.User;
import nlu.com.app.entity.UserDetails;
import nlu.com.app.exception.ApplicationException;
import nlu.com.app.exception.ErrorCode;
import nlu.com.app.repository.UserDetailsRepository;
import nlu.com.app.repository.UserRepository;
import nlu.com.app.service.IUserDetailsService;
import nlu.com.app.util.SecurityUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserDetailsService implements IUserDetailsService {
    private final UserDetailsRepository userDetailsRepository;
    private final UserRepository userRepository;

    @Transactional
    @Override
    public UserDetails getUserDetailsByUserId(Long userId) {
        try {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new ApplicationException(ErrorCode.USER_NOT_EXISTED));

            return userDetailsRepository.findById(user.getUserId())
                    .orElseThrow(() -> new ApplicationException(ErrorCode.USER_NOT_EXISTED));
        }  catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }


    @Override
    public boolean updateUserDetails(UserDetails userDetails) {
        return false;
    }

    @Override
    public boolean addUserDetails( UserDetails userDetails) {
        UserDetails userDetailSaved = userDetailsRepository.save(userDetails);
        return userDetailSaved != null;
    }
}
