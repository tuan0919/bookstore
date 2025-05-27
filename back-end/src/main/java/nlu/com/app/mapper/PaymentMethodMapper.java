package nlu.com.app.mapper;

import java.util.List;
import nlu.com.app.constant.EPaymentMethod;
import nlu.com.app.dto.response.PaymentMethodDTO;
import nlu.com.app.entity.PaymentMethod;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface PaymentMethodMapper {

  PaymentMethodMapper INSTANCE = Mappers.getMapper(PaymentMethodMapper.class);

  @Mapping(source = "methodName", target = "methodName", qualifiedByName = "enumToString")
  PaymentMethodDTO toDTO(PaymentMethod paymentMethod);

  List<PaymentMethodDTO> toDTOList(List<PaymentMethod> paymentMethods);

  @Named("enumToString")
  default String enumToString(EPaymentMethod method) {
    return method == null ? null : method.getDescription();
  }
}
