package nlu.com.app.mapper;

import nlu.com.app.dto.request.RegisterUserDTO;
import nlu.com.app.dto.response.UserDetailsSummaryChartDTO;
import nlu.com.app.entity.User;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        builder = @Builder(disableBuilder = true))
public interface ChartMapper {
    @Mapping(target = "totalOrders", source = "totalOrders")
    @Mapping(target = "totalPayAmounts", source = "totalPayAmounts")
    @Mapping(target = "frequency", source = "frequency")
    UserDetailsSummaryChartDTO toDto(Integer totalOrders, Integer totalPayAmounts, List<UserDetailsSummaryChartDTO.PayInMonth> frequency);
}