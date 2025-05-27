package nlu.com.app.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author VuLuu
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentMethodDTO {

  private Long paymentMethodId;
  private String methodName;
}
