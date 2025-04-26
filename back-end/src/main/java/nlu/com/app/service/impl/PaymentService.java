package nlu.com.app.service.impl;

import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import nlu.com.app.constant.EPaymentMethod;
import nlu.com.app.entity.PaymentMethod;
import nlu.com.app.repository.PaymentMethodRepository;
import org.springframework.stereotype.Service;

/**
 * @author VuLuu
 */
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PaymentService {

  PaymentMethodRepository paymentMethodRepository;

  public void initData() {
    List<PaymentMethod> paymentMethods = new ArrayList<>();
    for (EPaymentMethod method : EPaymentMethod.values()) {
      PaymentMethod data = PaymentMethod
          .builder()
          .methodName(method)
          .build();
      paymentMethods.add(data);
    }
    paymentMethodRepository.saveAll(paymentMethods);
  }
}
