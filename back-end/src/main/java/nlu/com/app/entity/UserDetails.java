package nlu.com.app.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author VuLuu
 */
@Entity
@Table(name = "user_details")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDetails {

  @Id
  @Column(name = "user_id")
  private Long userId;
  @Column(name = "fullname")
  private String fullname;
  @Column(name = "dob")
  private LocalDate dob;
  @Column(name = "phone_num")
  private String phoneNum;
  @Column(name = "gender")
  private String gender;
  @Column(name = "img")
  private String img;
  @Column(name = "otp")
  private String otp;
  @Column(name = "verified")
  private boolean verified;
  @Column(name = "otp_expiry_time")
  private LocalDate otpExpiryTime;

  @OneToOne
  @MapsId
  @JoinColumn(name = "user_id")
  private User user;
}
