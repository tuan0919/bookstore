package nlu.com.app.mapper;

import java.util.List;

import com.paypal.sdk.models.Customer;
import nlu.com.app.constant.EOrderStatus;
import nlu.com.app.constant.EPaymentMethod;
import nlu.com.app.dto.request.AddressDto;
import nlu.com.app.dto.response.OrderDetailsResponseDTO;
import nlu.com.app.dto.response.OrderResponseDTO;
import nlu.com.app.entity.*;
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

  @Mapping(source = "paymentMethod.methodName", target = "paymentMethodName", qualifiedByName = "enumToString")
  @Mapping(source = "status", target = "status", qualifiedByName = "orderStatusToString")
  @Mapping(source = "orderItems", target = "items")
  @Mapping(target = "shippingAddress", source = "address")
  @Mapping(target = "customer", source = "order.user", qualifiedByName = "toCustomerDTO")
  @Mapping(target = "statusCode", source = "status", qualifiedByName = "orderStatusToString_2")
  OrderDetailsResponseDTO toOrderDetailsResponseDTO(Order order);

  AddressDto toAddressDTO(Address address);

  List<OrderDetailsResponseDTO.OrderItemDTO> toOrderItemDTOList_ForDetails(List<OrderItem> orderItems);
  List<OrderResponseDTO.OrderItemDTO> toOrderItemDTOList(List<OrderItem> orderItems);

  @Named("toCustomerDTO")
  @Mapping(target = "user_id", source = "user.userId")
  @Mapping(target = "username", source = "user.username")
  @Mapping(target = "email", expression = "java(user.getEmail() == null ? \"Người dùng này chưa set email \" : user.getEmail())")
  OrderDetailsResponseDTO.CustomerDTO toCustomerDTO(User user);

  @Mapping(source = "book", target = "img", qualifiedByName = "mapImage")
  @Mapping(source = "book.title", target = "bookTitle")
  @Mapping(source = "discountPercentage", target = "discount")
  OrderResponseDTO.OrderItemDTO toOrderItemDTO(OrderItem orderItem);

  @Mapping(source = "book", target = "img", qualifiedByName = "mapImage")
  @Mapping(source = "book.title", target = "bookTitle")
  @Mapping(source = "discountPercentage", target = "discount")
  OrderDetailsResponseDTO.OrderItemDTO toOrderItemDTO_ForDetails(OrderItem orderItem);

  @Named("mapImage")
  default String mapImage(Book book) {
    if (book.getImages() == null || book.getImages().isEmpty()) {
      return null;
    }
    return book.getImages().stream()
        .filter(image -> image.isThumbnail() && image.getImageUrl() != null && !image.getImageUrl().isEmpty())
        .map(BookImage::getImageUrl)
        .findFirst()
        .orElse(null);
  }

  @Named("enumToString")
  default String enumToString(EPaymentMethod method) {
    return method == null ? null
        : method.getDescription();
  }

  @Named("orderStatusToString")
  default String orderStatusToString(EOrderStatus status) {
    return status == null ? null : status.getDescription();
  }

  @Named("orderStatusToString_2")
  default String orderStatusToString_2(EOrderStatus status) {
    return status == null ? null : status.name();
  }
}
