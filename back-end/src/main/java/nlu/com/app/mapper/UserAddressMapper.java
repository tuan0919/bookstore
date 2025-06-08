package nlu.com.app.mapper;

import nlu.com.app.dto.request.UserAddressDto;
import nlu.com.app.entity.UserAddress;
import org.mapstruct.Mapper;

/**
 * @author VuLuu
 */
@Mapper(componentModel = "spring", uses = AddressMapper.class)
public interface UserAddressMapper {

  UserAddressDto toDto(UserAddress entity);
}

