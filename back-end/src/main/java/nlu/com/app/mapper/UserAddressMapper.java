package nlu.com.app.mapper;

import nlu.com.app.dto.request.UserAddressDto;
import nlu.com.app.entity.UserAddress;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * @author VuLuu
 */
@Mapper(componentModel = "spring", uses = AddressMapper.class)
public interface UserAddressMapper {


  @Mapping(source = "userAddressId", target = "id")
  UserAddressDto toDto(UserAddress entity);
}

