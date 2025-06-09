package nlu.com.app.dto.request;

import lombok.Data;

@Data
public class UserAddressDto {

  private Long id;
  private AddressDto address;
  private boolean isDefault;
}
