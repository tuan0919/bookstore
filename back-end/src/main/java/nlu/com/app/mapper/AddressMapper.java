package nlu.com.app.mapper;

import nlu.com.app.dto.request.AddressDto;
import nlu.com.app.entity.Address;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

/**
 * @author VuLuu
 */
@Mapper(componentModel = "spring")
public interface AddressMapper {

  Address toEntity(AddressDto dto);

  AddressDto toDto(Address entity);

  @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
  void updateAddressFromDto(AddressDto dto, @MappingTarget Address entity);
}

