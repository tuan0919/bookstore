package nlu.com.app.mapper;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import nlu.com.app.constant.ECategory;
import nlu.com.app.constant.EGenre;
import nlu.com.app.dto.json.BooksJson;
import nlu.com.app.dto.request.BookDetailsDTO;
import nlu.com.app.dto.request.BookDetailsDTO.ReviewDTO;
import nlu.com.app.dto.response.PageBookResponseDTO;
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

  List<Book> jsonToEntityList(List<BooksJson> booksJsonList,
      @Context CategoryRepository categoryRepository,
      @Context GenreRepository genreRepository);

  @Named("stringToCategory")
  default Category stringToCategory(String value, @Context CategoryRepository categoryRepository) {
    List<Category> categoryList;
    Map<ECategory, Category> categoryMap = new HashMap<>();

    switch (value) {
      case "Manga":
      case "Light Novel":
        // Tìm các Category con của VN_BOOK
        categoryList = categoryRepository.findByParentCategory(
            categoryRepository.findCategoriesByCategoryName(ECategory.VN_BOOK)
                .orElseThrow(() -> new ApplicationException(
                    ErrorCode.UNKNOWN_EXCEPTION)));
        break;
      case "MangaJP":
      case "LNJP":
      case "ArtAnime":
        // Tìm các Category con của F_BOOK
        categoryList = categoryRepository.findByParentCategory(
            categoryRepository.findCategoriesByCategoryName(ECategory.F_BOOK)
                .orElseThrow(() -> new ApplicationException(
                    ErrorCode.UNKNOWN_EXCEPTION)));
        break;
      default:
        throw new ApplicationException(ErrorCode.UNKNOWN_EXCEPTION);
    }

    // Lọc các category có tên tương ứng
    categoryMap = categoryList.stream()
        .collect(Collectors.toMap(Category::getCategoryName, category -> category));

    switch (value) {
      case "Manga":
        return categoryMap.get(ECategory.MANGA);
      case "Light Novel":
        return categoryMap.get(ECategory.LIGHT_NOVEL);
      case "ArtAnime":
        return categoryMap.get(ECategory.ART_ANIME_CHAR);
      case "MangaJP":
      case "LNJP":
        return categoryMap.get(ECategory.LIGHT_NOVEL);
      default:
        throw new ApplicationException(ErrorCode.UNKNOWN_EXCEPTION);
    }
  }

  @Named("stringToGenre")
  default Genre stringToGenre(String value, @Context GenreRepository genreRepository) {
    return genreRepository.findGenreByName(EGenre.getGenreByDescription(value)).orElse(null);
  }

  @Named("toImageList")
  default List<BookImage> toImageList(String[] images) {
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

  @Mapping(target = "imageUrl", source = "book", qualifiedByName = "mapImage")
  @Mapping(target = "discountedPrice", source = "book", qualifiedByName = "calculateDiscountedPrice")
  @Mapping(target = "averageRating", source = "averageRating")
  PageBookResponseDTO toPageDto(Book book, @Context double discountPercentage,
      double averageRating);

  @Named("mapImage")
  default String mapImage(Book book) {
    if (book.getImages() == null || book.getImages().isEmpty()) {
      return null;
    }

    return book.getImages().stream()
        .filter(image -> image.isThumbnail() && image.getImageUrl() != null && !image.getImageUrl()
            .isEmpty())
        .map(BookImage::getImageUrl)
        .findFirst()
        .orElse(null);
  }

  @Named("calculateDiscountedPrice")
  default double calculateDiscountedPrice(Book book, @Context double discountPercentage) {
    if (book.getPrice() <= 0) {
      return 0;
    }
    return book.getPrice() * (1 - discountPercentage / 100) * 1000;
  }

//  @Mapping(source = "book.bookId", target = "bookId")
//  @Mapping(source = "title", target = "title")
//  @Mapping(source = "publisher", target = "publisher")
//  @Mapping(source = "publishYear", target = "publishYear")
//  @Mapping(source = "weight", target = "weight")
//  @Mapping(source = "productCode", target = "productCode")
//  @Mapping(source = "supplier", target = "supplier")
//  @Mapping(source = "author", target = "author")
//  @Mapping(source = "language", target = "language")
//  @Mapping(source = "pageCount", target = "pageCount")
//  @Mapping(source = "translator", target = "translator")
//  @Mapping(source = "size", target = "size")
//  @Mapping(source = "format", target = "format")
//  @Mapping(source = "age", target = "age")
//  @Mapping(source = "description", target = "description")
//  @Mapping(source = "qtyInStock", target = "qtyInStock")
//  @Mapping(source = "price", target = "price")
//  @Mapping(source = "discountedPrice", target = "discountedPrice")
//  @Mapping(source = "imageUrls", target = "imageUrls")
//  @Mapping(source = "reviews", target = "reviews")
//  BookDetailsDTO toBookDetailsDTO(Book book,
//      List<String> imageUrls,
//      List<ReviewDTO> reviews,
//      Double originalPrice,
//      Double discountedPrice);
}

