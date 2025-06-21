package nlu.com.app.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import nlu.com.app.dto.request.AddBooksToCollectionRequestDTO;
import nlu.com.app.dto.request.BookCollectionDetailsDTO;
import nlu.com.app.dto.request.BookInCollectionDTO;
import nlu.com.app.dto.request.CreateBookCollectionRequestDTO;
import nlu.com.app.dto.request.UpdateBookCollectionRequestDTO;
import nlu.com.app.dto.response.BookCollectionResponse;
import nlu.com.app.entity.Book;
import nlu.com.app.entity.BookCollection;
import nlu.com.app.entity.BookCollectionItem;
import nlu.com.app.entity.BookImage;
import nlu.com.app.entity.Category;
import nlu.com.app.entity.Promotion;
import nlu.com.app.entity.User;
import nlu.com.app.entity.UserReview;
import nlu.com.app.exception.ApplicationException;
import nlu.com.app.exception.ErrorCode;
import nlu.com.app.mapper.BookMapper;
import nlu.com.app.repository.BookCollectionItemRepository;
import nlu.com.app.repository.BookCollectionRepository;
import nlu.com.app.repository.BookImageRepository;
import nlu.com.app.repository.BookRepository;
import nlu.com.app.repository.CategoryRepository;
import nlu.com.app.repository.GenreRepository;
import nlu.com.app.repository.PromotionCategoriesRepository;
import nlu.com.app.repository.UserRepository;
import nlu.com.app.repository.UserReviewRepository;
import nlu.com.app.service.BookCollectionService;
import nlu.com.app.util.SecurityUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BookCollectionServiceImpl implements BookCollectionService {

  private final BookCollectionRepository collectionRepo;
  private final BookRepository bookRepo;
  private final BookCollectionItemRepository itemRepo;
  private final UserRepository userRepo;
  private final ObjectMapper objectMapper;
  private final BookMapper bookMapper;
  private final BookRepository bookRepository;
  private final CategoryRepository categoryRepository;
  private final GenreRepository genreRepository;
  private final PromotionCategoriesRepository promotionCategoriesRepository;
  private final UserReviewRepository userReviewRepository;
  private final BookImageRepository bookImageRepository;
  private final CategoryService categoryService;
  private final GenreService genreService;
  private final FileService fileService;
  private final UserReviewService userReviewService;

  @Override
  public BookCollectionResponse createCollection(CreateBookCollectionRequestDTO request) {
    User user = getCurrentUser();

    BookCollection tempCollection = BookCollection.builder()
        .name(request.getName())
        .description(request.getDescription())
        .createdDate(LocalDate.now())
        .user(user)
        .build();

    BookCollection savedCollection = collectionRepo.save(tempCollection);

    List<Book> books = bookRepo.findAllById(request.getBookIds());

    List<BookCollectionItem> items = books.stream()
        .map(book -> BookCollectionItem.builder()
            .collection(savedCollection)
            .book(book)
            .build())
        .collect(Collectors.toList());

    itemRepo.saveAll(items);

    String coverImage = extractThumbnailUrl(books);

    return BookCollectionResponse.builder()
        .id(savedCollection.getCollectionId())
        .name(savedCollection.getName())
        .description(savedCollection.getDescription())
        .coverImage(coverImage)
        .build();
  }

  @Override
  public Page<BookCollectionResponse> getCollectionsByUser(int page, int size) {
    User user = getCurrentUser();

    Page<BookCollection> collections = collectionRepo.findAllByUser(user,
        PageRequest.of(page, size));

    return collections.map(collection -> {
      List<BookCollectionItem> items = itemRepo.findAllByCollectionBookId(
          collection.getCollectionId());
      List<Book> books = items.stream()
          .map(BookCollectionItem::getBook)
          .collect(Collectors.toList());
      String coverImage = extractThumbnailUrl(books);

      return BookCollectionResponse.builder()
          .id(collection.getCollectionId())
          .name(collection.getName())
          .description(collection.getDescription())
          .coverImage(coverImage)
          .build();
    });
  }

  private User getCurrentUser() {
    String username = SecurityUtils.getCurrentUsername();
    if (username == null) {
      throw new ApplicationException(ErrorCode.UNAUTHENTICATED);
    }

    return userRepo.findByUsername(username)
        .orElseThrow(() -> new ApplicationException(ErrorCode.UNKNOWN_EXCEPTION));
  }

  private String extractThumbnailUrl(List<Book> books) {
    for (Book book : books) {
      Optional<BookImage> thumbnail = book.getImages().stream()
          .filter(BookImage::isThumbnail)
          .findFirst();
      if (thumbnail.isPresent()) {
        return thumbnail.get().getImageUrl();
      }
    }
    return null;
  }

  @Override
  public BookCollectionResponse updateCollection(Long collectionId,
      UpdateBookCollectionRequestDTO request) {
    User user = getCurrentUser();

    BookCollection collection = collectionRepo.findById(collectionId)
        .orElseThrow(() -> new ApplicationException(ErrorCode.UNKNOWN_EXCEPTION));

    if (!collection.getUser().getUserId().equals(user.getUserId())) {
      throw new ApplicationException(ErrorCode.UNKNOWN_EXCEPTION);
    }

    collection.setName(request.getName());
    collection.setDescription(request.getDescription());

    collectionRepo.save(collection);

    List<BookCollectionItem> items = itemRepo.findAllByCollectionBookId(
        collection.getCollectionId());
    List<Book> books = items.stream().map(BookCollectionItem::getBook).collect(Collectors.toList());
    String coverImage = extractThumbnailUrl(books);

    return BookCollectionResponse.builder()
        .id(collection.getCollectionId())
        .name(collection.getName())
        .description(collection.getDescription())
        .coverImage(coverImage)
        .build();
  }

  @Override
  public void addBooksToCollection(Long collectionId, AddBooksToCollectionRequestDTO request) {
    User user = getCurrentUser();

    BookCollection collection = collectionRepo.findById(collectionId)
        .orElseThrow(() -> new ApplicationException(ErrorCode.UNKNOWN_EXCEPTION));

    if (!collection.getUser().getUserId().equals(user.getUserId())) {
      throw new ApplicationException(ErrorCode.UNKNOWN_EXCEPTION);
    }

    List<Book> books = bookRepo.findAllById(request.getBookIds());

    List<BookCollectionItem> items = books.stream()
        .map(book -> BookCollectionItem.builder()
            .collection(collection)
            .book(book)
            .build())
        .collect(Collectors.toList());

    itemRepo.saveAll(items);
  }

  @Override
  public BookCollectionDetailsDTO getCollectionDetails(Long collectionId) {
    User user = getCurrentUser();

    BookCollection collection = collectionRepo.findById(collectionId)
        .orElseThrow(() -> new ApplicationException(ErrorCode.UNKNOWN_EXCEPTION));

    if (!collection.getUser().getUserId().equals(user.getUserId())) {
      throw new ApplicationException(ErrorCode.UNKNOWN_EXCEPTION);
    }

    List<BookCollectionItem> items = itemRepo.findAllByCollectionBookId(collectionId);
    List<Book> books = items.stream().map(BookCollectionItem::getBook).toList();
    List<Long> bookIds = books.stream().map(Book::getBookId).toList();

    // Get all related categories
    List<Category> categories = books.stream()
        .map(Book::getCategory)
        .distinct()
        .collect(Collectors.toList());

    List<Long> categoryIds = categories.stream().map(Category::getCategoryId).toList();

    // Get active promotions
    List<Promotion> promotions = promotionCategoriesRepository.findActivePromotionsByCategoryIds(
        categoryIds);

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

    // Map books to DTOs
    List<BookInCollectionDTO> bookDTOs = books.stream().map(book -> {
      List<Long> relatedCategoryIds = getAllRelatedCategoryIds(book.getCategory());

      double discount = relatedCategoryIds.stream()
          .map(id -> categoryDiscountMap.getOrDefault(id, 0D))
          .max(Double::compareTo)
          .orElse(0D);

      double finalPrice = book.getPrice() * (1 - discount / 100);
      double rating = ratingMap.getOrDefault(book.getBookId(), 0D);
      String thumbnail = book.getImages().stream()
          .filter(BookImage::isThumbnail)
          .map(BookImage::getImageUrl)
          .findFirst()
          .orElse(null);

      return BookInCollectionDTO.builder()
          .bookId(book.getBookId())
          .title(book.getTitle())
          .originalPrice(book.getPrice())
          .discountPercentage(discount)
          .discountedPrice(finalPrice)
          .averageRating(rating)
          .thumbnail(thumbnail)
          .build();
    }).toList();

    return BookCollectionDetailsDTO.builder()
        .id(collection.getCollectionId())
        .name(collection.getName())
        .description(collection.getDescription())
        .createdDate(collection.getCreatedDate())
        .books(bookDTOs)
        .build();
  }

  private List<Long> getAllRelatedCategoryIds(Category category) {
    List<Long> ids = new ArrayList<>();
    while (category != null) {
      ids.add(category.getCategoryId());
      category = category.getParentCategory();
    }
    return ids;
  }
}
