package nlu.com.app.mapper;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import nlu.com.app.constant.ECategory;
import nlu.com.app.constant.EGenre;
import nlu.com.app.dto.json.BooksJson;
import nlu.com.app.entity.Book;
import nlu.com.app.entity.BookImage;
import nlu.com.app.entity.Category;
import nlu.com.app.entity.Genre;
import nlu.com.app.exception.ApplicationException;
import nlu.com.app.exception.ErrorCode;
import nlu.com.app.repository.CategoryRepository;
import nlu.com.app.repository.GenreRepository;
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
public interface BookMapper {

  @Mapping(target = "category", source = "category", qualifiedByName = "stringToCategory")
  @Mapping(target = "genre", source = "genre", qualifiedByName = "stringToGenre")
  @Mapping(target = "images", source = "images", qualifiedByName = "toImageList")
  Book jsonToEntity(BooksJson booksJson, @Context CategoryRepository categoryRepository,
      @Context GenreRepository genreRepository);

  @Named("stringToCategory")
  default Category stringToCategory(String value, @Context CategoryRepository categoryRepository) {
    List<Category> categoryList = new ArrayList<>();
    Map<ECategory, Category> categoryMap = new HashMap<>();
    switch (value) {
      case "Manga":
      case "Light Novel":
        categoryList = categoryRepository.findByParentCategory(
            categoryRepository.findCategoriesByCategoryName(ECategory.VN_BOOK).get());

        categoryMap = categoryList.stream()
            .collect(Collectors.toMap(Category::getCategoryName, category -> category));

        if (value.equals("Manga")) {
          return categoryMap.get(ECategory.MANGA);
        } else {
          return categoryMap.get(ECategory.LIGHT_NOVEL);
        }
      case "MangaJP":
      case "LNJP":
      case "ArtAnime":
        categoryList = categoryRepository.findByParentCategory(
            categoryRepository.findCategoriesByCategoryName(ECategory.VN_BOOK).get());
        categoryMap = categoryList.stream()
            .collect(Collectors.toMap(Category::getCategoryName, category -> category));
        if (value.equals("Manga")) {
          return categoryMap.get(ECategory.MANGA);
        } else if (value.equals("ArtAnime")) {
          return categoryMap.get(ECategory.ART_ANIME_CHAR);
        } else {
          return categoryMap.get(ECategory.LIGHT_NOVEL);
        }

      default:
        throw new ApplicationException(ErrorCode.UNKNOWN_EXCEPTION);

    }
  }

  @Named("stringToGenre")
  default Genre stringToGenre(String value, @Context GenreRepository genreRepository) {
    return genreRepository.findGenreByName(EGenre.getGenreByDescription(value)).orElse(null);
  }

  @Named("toImageList")
  public static List<BookImage> toImageList(String[] images) {
    if (images == null || images.length == 0) {
      return new ArrayList<>();
    }

    List<BookImage> result = new ArrayList<>();
    for (int i = 0; i < images.length; i++) {
      result.add(BookImage.builder()
          .imageUrl(images[i])
          .isThumbnail(i == 0)
          .build());
    }

    return result;
  }

}

