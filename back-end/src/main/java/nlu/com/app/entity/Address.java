package nlu.com.app.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author VuLuu
 */
@Entity
@Table(name = "addresses")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Address {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "address_id")
  private Long addressId;
  @Column(name = "unit_number")
  private String unitNumber;
  @Column(name = "street_number")
  private String streetNumber;
  @Column(name = "address_line1")
  private String addressLine1;
  @Column(name = "address_line2")
  private String addressLine2;
  @Column(name = "city")
  private String city;
  @Column(name = "region")
  private String region;
  @Column(name = "postal_code")
  private String postalCode;

  @Override
  public String toString() {
    return String.format("%s, %s, %s",this.addressLine1, this.city, this.region);
  }
}
