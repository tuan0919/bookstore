package nlu.com.app.mapper;

import java.util.List;
import java.util.stream.Collectors;
import nlu.com.app.dto.response.CategoryResponseDTO;
import nlu.com.app.entity.Category;
import nlu.com.app.repository.CategoryRepository;
import org.mapstruct.Builder;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.Named;

/**
 * @author VuLuu
 */
@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
    builder = @Builder(disableBuilder = true))
public interface CategoryMapper {

  @Mapping(target = "id", source = "categoryId")
  @Mapping(target = "name", source = "categoryName.description")
  @Mapping(target = "children", source = ".", qualifiedByName = "mapChildren")
  CategoryResponseDTO toCategoryResponseDTO(Category category,
      @Context CategoryRepository categoryRepository);

  List<CategoryResponseDTO> toCategoryResponseDTOList(List<Category> categories,
      @Context CategoryRepository categoryRepository);

  @Named("mapChildren")
  default List<CategoryResponseDTO> mapChildren(Category category,
      @Context CategoryRepository categoryRepository) {
    return categoryRepository.findByParentCategory(category).stream()
        .map(child -> toCategoryResponseDTO(child, categoryRepository))
        .collect(Collectors.toList());
  }
}
