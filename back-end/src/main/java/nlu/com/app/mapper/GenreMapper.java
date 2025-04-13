package nlu.com.app.mapper;

import java.util.List;
import nlu.com.app.constant.EGenre;
import nlu.com.app.dto.response.GenreResponseDTO;
import nlu.com.app.entity.Genre;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.Named;

/**
 * @author VuLuu
 */
@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
    builder = @Builder(disableBuilder = true))
public interface GenreMapper {

  @Mapping(target = "id", source = "genreId")
  @Mapping(target = "name", source = "name", qualifiedByName = "mapToString")
  GenreResponseDTO toGenreResponseDto(Genre genre);

  List<GenreResponseDTO> toGenreResponseDtoList(List<Genre> list);

  @Named("mapToString")
  default String mapToString(EGenre name) {
    return name.getDescription();
  }
}
