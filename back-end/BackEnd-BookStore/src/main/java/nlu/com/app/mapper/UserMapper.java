package nlu.com.app.mapper;

import nlu.com.app.dto.request.RegisterUserDTO;
import nlu.com.app.entity.User;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        builder = @Builder(disableBuilder = true))
public interface UserMapper {
    User toEntity(RegisterUserDTO dto);
}