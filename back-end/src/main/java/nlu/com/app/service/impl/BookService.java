package nlu.com.app.service.impl;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import nlu.com.app.dto.json.BooksJson;
import nlu.com.app.dto.json.BooksWrapper;
import nlu.com.app.dto.request.BookSearchRequestDTO;
import nlu.com.app.dto.response.PageBookResponseDTO;
import nlu.com.app.entity.Book;
import nlu.com.app.entity.BookImage;
import nlu.com.app.entity.Category;
import nlu.com.app.entity.Promotion;
import nlu.com.app.entity.UserReview;
import nlu.com.app.exception.ApplicationException;
import nlu.com.app.exception.ErrorCode;
import nlu.com.app.mapper.BookMapper;
import nlu.com.app.repository.BookImageRepository;
import nlu.com.app.repository.BookRepository;
import nlu.com.app.repository.CategoryRepository;
import nlu.com.app.repository.GenreRepository;
import nlu.com.app.repository.PromotionCategoriesRepository;
import nlu.com.app.repository.UserReviewRepository;
import nlu.com.app.service.IBookService;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * @author VuLuu
 */
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BookService implements IBookService {

  String initJsonFile[] = {"ArtAnime.json", "LightNovelJP.json", "LightNovelVN.json",
      "MangaJp.json", "MangaVN.json"};
  ObjectMapper objectMapper;
  BookMapper bookMapper;
  BookRepository bookRepository;
  CategoryRepository categoryRepository;
  GenreRepository genreRepository;
  PromotionCategoriesRepository promotionCategoriesRepository;
  UserReviewRepository userReviewRepository;
  BookImageRepository bookImageRepository;

  public void initData() throws IOException {
    for (String file : initJsonFile) {
      ClassPathResource resource = new ClassPathResource(file);
      List<BooksWrapper> listBookWrapper = objectMapper.readValue(resource.getInputStream(),
          new TypeReference<List<BooksWrapper>>() {
          });
      List<BooksJson> booksJsonList = listBookWrapper.stream().map(BooksWrapper::getBooks).filter(
          bookJson -> bookJson.getTitle() != null && !bookJson.getTitle().trim().isEmpty()
              && bookJson.getAuthor() != null && !bookJson.getAuthor().trim().isEmpty()
              && bookJson.getPrice() != null && !bookJson.getPrice().trim().isEmpty()
              && bookJson.getPublishYear() != null && !bookJson.getPublishYear().trim().isEmpty()
              && bookJson.getQtyInStock() != null && !bookJson.getQtyInStock().trim().isEmpty()
              && bookJson.getPageCount() != null && !bookJson.getPageCount().trim().isEmpty()
              && bookJson.getWeight() != null && !bookJson.getWeight().trim().isEmpty()).toList();
      List<Book> books = bookMapper.jsonToEntityList(booksJsonList, categoryRepository,
          genreRepository);
      System.out.println(books.get(0).getImages());
      bookRepository.saveAll(books);
      for (Book book : books) {
        if (book.getImages() != null && !book.getImages().isEmpty()) {
          for (BookImage image : book.getImages()) {
            image.setBook(book);
          }
        }
      }
      bookImageRepository.saveAll(books.stream()
          .flatMap(book -> book.getImages().stream())
          .collect(Collectors.toList()));

      System.out.println("INIT DATA SUCCESSFUL!");
    }
  }

  public boolean checkInitData() {
    if (bookRepository.findAll().isEmpty()) {
      return true;
    }
    return false;
  }

  /**
   * @param bookSearchRequestDTO
   * @return
   */
  public Page<PageBookResponseDTO> getBooksByCategory(BookSearchRequestDTO bookSearchRequestDTO) {
    Pageable pageable = PageRequest.of(bookSearchRequestDTO.getPage(),
        bookSearchRequestDTO.getSize());

    Category category = categoryRepository.findById(bookSearchRequestDTO.getCategoryId())
        .orElseThrow(() -> new ApplicationException(ErrorCode.UNKNOWN_EXCEPTION));

    List<Category> subCategories = categoryRepository.findByParentCategory(category);
    subCategories.add(category);

    Page<Book> books = bookRepository.findAllByCategoryIn(subCategories, pageable);

    List<Long> bookIds = books.stream().map(Book::getBookId).toList();
    List<Long> categoryIds = subCategories.stream().map(Category::getCategoryId).toList();

    // Get active promotions for categories
    List<Promotion> promotions = promotionCategoriesRepository.findActivePromotionsByCategoryIds(
        categoryIds);

    // Get the highest promotion discount
    Map<Long, Double> categoryDiscountMap = promotions.stream()
        .flatMap(promotion -> promotion.getPromotionCategories().stream()
            .map(pc -> Map.entry(pc.getCategory().getCategoryId(),
                promotion.getDiscountPercentage())))
        .collect(Collectors.toMap(
            Map.Entry::getKey,
            Map.Entry::getValue,
            Math::max
        ));

    // Get average ratings
    List<UserReview> reviews = userReviewRepository.findByBookBookIdIn(bookIds);
    Map<Long, Double> ratingMap = reviews.stream()
        .collect(Collectors.groupingBy(
            r -> r.getBook().getBookId(),
            Collectors.averagingDouble(UserReview::getRating)
        ));

    // MapStruct with injected maps
    List<PageBookResponseDTO> result = books.stream()
        .map(book -> bookMapper.toPageDto(book,
            categoryDiscountMap.getOrDefault(book.getCategory().getCategoryId(), 0D),
            ratingMap.getOrDefault(book.getBookId(), 0D)))
        .toList();

    return new PageImpl<>(result, pageable, books.getTotalElements());
  }
}
