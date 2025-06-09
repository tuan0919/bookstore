package nlu.com.app.dto.response;

import lombok.Data;

@Data
public class AddressResponseDTO {
  private Long userAddressId;
  private boolean isDefault;
  private String unitNumber;
  private String streetNumber;
  private String addressLine1;
  private String addressLine2;
  private String city;
  private String region;
  private String postalCode;
}
