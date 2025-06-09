package nlu.com.app.mapper;

import java.util.List;
import nlu.com.app.constant.EOrderStatus;
import nlu.com.app.constant.EPaymentMethod;
import nlu.com.app.dto.request.AddressDto;
import nlu.com.app.dto.response.OrderResponseDTO;
import nlu.com.app.entity.Address;
import nlu.com.app.entity.Order;
import nlu.com.app.entity.OrderItem;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

/**
 * @author VuLuu
 */
@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
    builder = @Builder(disableBuilder = true))
public interface OrderMapper {

  OrderMapper INSTANCE = Mappers.getMapper(OrderMapper.class);

  @Mapping(source = "paymentMethod.methodName", target = "paymentMethodName", qualifiedByName = "enumToString")
  @Mapping(source = "status", target = "status", qualifiedByName = "orderStatusToString")
  @Mapping(source = "orderItems", target = "items")
  @Mapping(target = "shippingAddress", source = "address")
  OrderResponseDTO toOrderResponseDTO(Order order);

  AddressDto toAddressDTO(Address address);

  List<OrderResponseDTO.OrderItemDTO> toOrderItemDTOList(List<OrderItem> orderItems);

  @Mapping(source = "book.title", target = "bookTitle")
  @Mapping(source = "discountPercentage", target = "discount")
  OrderResponseDTO.OrderItemDTO toOrderItemDTO(OrderItem orderItem);


  @Named("enumToString")
  default String enumToString(EPaymentMethod method) {
    return method == null ? null
        : method.getDescription();
  }

  @Named("orderStatusToString")
  default String orderStatusToString(EOrderStatus status) {
    return status == null ? null : status.getDescription();
  }
}
