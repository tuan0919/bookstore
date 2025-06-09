package nlu.com.app.service;



import java.util.List;
import nlu.com.app.dto.request.AddressDto;
import nlu.com.app.dto.request.AddressRequestDTO;
import nlu.com.app.dto.request.UserAddressDto;
import nlu.com.app.dto.response.AddressResponseDTO;

public interface IUserAddressService {
  public List<UserAddressDto> getCurrentUserAddresses();
  public UserAddressDto addAddressForCurrentUser(AddressDto addressDto);
  public UserAddressDto updateUserAddress(Long userAddressId, AddressDto addressDto,
      Boolean makeDefault);
}
