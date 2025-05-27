package nlu.com.app.service.impl;

/**
 * @author VuLuu
 */

import java.util.List;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import nlu.com.app.dto.response.PaymentMethodDTO;
import nlu.com.app.mapper.PaymentMethodMapper;
import nlu.com.app.repository.PaymentMethodRepository;
import nlu.com.app.service.IPaymentMethodService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PaymentMethodService implements IPaymentMethodService {

  private final PaymentMethodRepository paymentMethodRepository;
  private final PaymentMethodMapper paymentMethodMapper;

  @Override
  public List<PaymentMethodDTO> getAllPaymentMethods() {
    return paymentMethodMapper.toDTOList(paymentMethodRepository.findAll());
  }
}

