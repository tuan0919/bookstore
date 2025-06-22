package nlu.com.app.service.impl;


import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import nlu.com.app.dto.request.AddressDto;
import nlu.com.app.dto.request.UserAddressDto;
import nlu.com.app.entity.Address;
import nlu.com.app.entity.User;
import nlu.com.app.entity.UserAddress;
import nlu.com.app.exception.ApplicationException;
import nlu.com.app.exception.ErrorCode;
import nlu.com.app.mapper.AddressMapper;
import nlu.com.app.mapper.UserAddressMapper;
import nlu.com.app.repository.AddressRepository;
import nlu.com.app.repository.UserAddressRepository;
import nlu.com.app.service.IUserAddressService;
import nlu.com.app.util.SecurityUtils;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserAddressService implements IUserAddressService {

  private final UserAddressRepository userAddressRepository;
  private final AddressRepository addressRepository;
  private final UserService userService;
  private final AddressMapper addressMapper;
  private final UserAddressMapper userAddressMapper;

  @Override
  public List<UserAddressDto> getCurrentUserAddresses() {
    User user = getAuthenticatedUser();
    return userAddressRepository.findByUser(user)
        .stream()
        .map(userAddressMapper::toDto)
        .collect(Collectors.toList());
  }

  @Override
  public UserAddressDto addAddressForCurrentUser(AddressDto addressDto) {
    User user = getAuthenticatedUser();
    Address address = addressMapper.toEntity(addressDto);
    Address savedAddress = addressRepository.save(address);

    boolean hasDefault = userAddressRepository.existsByUserAndIsDefaultTrue(user);
    UserAddress ua = UserAddress.builder()
        .user(user)
        .address(savedAddress)
        .isDefault(!hasDefault)
        .build();

    return userAddressMapper.toDto(userAddressRepository.save(ua));
  }

  @Override
  public UserAddressDto updateUserAddress(Long userAddressId, AddressDto addressDto,
      Boolean makeDefault) {
    User user = getAuthenticatedUser();

    UserAddress ua = userAddressRepository.findById(userAddressId)
        .orElseThrow(() -> new ApplicationException(ErrorCode.USER_NOT_EXISTED));

    if (!ua.getUser().getUserId().equals(user.getUserId())) {
      throw new ApplicationException(ErrorCode.UNKNOWN_EXCEPTION);
    }

    Address address = ua.getAddress();
    addressMapper.updateAddressFromDto(addressDto, address);
    addressRepository.save(address);

    if (Boolean.TRUE.equals(makeDefault)) {
      userAddressRepository.findByUser(user)
          .forEach(other -> {
            if (other.isDefault()) {
              other.setDefault(false);
              userAddressRepository.save(other);
            }
          });
      ua.setDefault(true);
    }

    return userAddressMapper.toDto(userAddressRepository.save(ua));
  }

  private User getAuthenticatedUser() {
    String username = SecurityUtils.getCurrentUsername();
    if (username == null) {
      throw new ApplicationException(ErrorCode.UNAUTHENTICATED);
    }
    return userService.getUserByUserName(username);
  }
}

