package nlu.com.app.service.impl;

import lombok.RequiredArgsConstructor;
import nlu.com.app.dto.response.UserDetailsResponseDTO;
import nlu.com.app.entity.Address;
import nlu.com.app.entity.User;
import nlu.com.app.entity.UserAddress;
import nlu.com.app.entity.UserDetails;
import nlu.com.app.exception.ApplicationException;
import nlu.com.app.exception.ErrorCode;
import nlu.com.app.repository.UserAddressRepository;
import nlu.com.app.repository.UserDetailsRepository;
import nlu.com.app.repository.UserRepository;
import nlu.com.app.service.IUserDetailsService;
import nlu.com.app.util.SecurityUtils;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.time.format.DateTimeFormatter;

@Service
@RequiredArgsConstructor
public class UserDetailsService implements IUserDetailsService {
    private final UserDetailsRepository userDetailsRepository;
    private final UserRepository userRepository;
    private final UserAddressRepository userAddressRepository;

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
    public UserDetailsResponseDTO getUserDetails(Long userId) {
        // Lấy thông tin user
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ApplicationException(ErrorCode.USER_NOT_EXISTED));

        // Lấy thông tin user details
        UserDetails userDetails = userDetailsRepository.findById(userId)
                .orElse(new UserDetails()); // Trả về đối tượng rỗng nếu không có

        // Lấy địa chỉ mặc định
        String defaultAddress = userAddressRepository.findByUserAndIsDefault(user, true)
                .map(UserAddress::getAddress)
                .map(Address::toString) // Giả định Address có phương thức toString() phù hợp
                .orElse("Chưa thiết lập");

        // Định dạng ngày tạo
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        String formattedDate = user.getCreated_date().format(formatter);

        // Ánh xạ sang DTO
        return UserDetailsResponseDTO.builder()
                .userId(user.getUserId())
                .fullname(StringUtils.hasText(userDetails.getFullname()) ? userDetails.getFullname() : "Chưa thiết lập")
                .gender(StringUtils.hasText(userDetails.getGender()) ? userDetails.getGender() : "Chưa thiết lập")
                .phoneNum(StringUtils.hasText(userDetails.getPhoneNum()) ? userDetails.getPhoneNum() : "Chưa thiết lập")
                .verified(userDetails.isVerified())
                .email(StringUtils.hasText(user.getEmail()) ? user.getEmail() : "Chưa thiết lập")
                .username(user.getUsername())
                .createdDate(formattedDate)
                .defaultAddress(defaultAddress)
                .build();
    }


    @Override
    public boolean updateUserDetails(UserDetails userDetails, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ApplicationException(ErrorCode.USER_NOT_EXISTED));

        UserDetails userDetailSaved = userDetailsRepository.save(userDetails);
        return userDetailSaved != null;
    }

    @Override
    public boolean addUserDetails( UserDetails userDetails, Long userId) {
        try {
            UserDetails userDetailSaved = userDetailsRepository.save(userDetails);
            return userDetailSaved != null;
        } catch (DataIntegrityViolationException ex){
            if (ex.getMessage().contains("Duplicate entry")) {
                return updateUserDetails(userDetails, userId);
            } else {
                throw ex;
            }
        }
    }
}
