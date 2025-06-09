package nlu.com.app.dto.request;

import lombok.Data;

@Data
public class AddressDto {
  private String unitNumber;
  private String streetNumber;
  private String addressLine1;
  private String addressLine2;
  private String city;
  private String region;
  private String postalCode;
}
