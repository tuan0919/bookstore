package nlu.com.app.service.impl;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import nlu.com.app.constant.ECategory;
import nlu.com.app.dto.json.BooksJson;
import nlu.com.app.dto.json.BooksWrapper;
import nlu.com.app.dto.request.BookDetailsDTO;
import nlu.com.app.dto.request.BookDetailsDTO.ReviewDTO;
import nlu.com.app.dto.request.BookSearchRequestDTO;
import nlu.com.app.dto.request.CreateBookRequest;
import nlu.com.app.dto.request.UpdateBookRequest;
import nlu.com.app.dto.response.BookOverviewDTO;
import nlu.com.app.dto.response.CategoryResponseDTO;
import nlu.com.app.dto.response.CreateBookResponse;
import nlu.com.app.dto.response.GenreResponseDTO;
import nlu.com.app.dto.response.ListBookDetailsDTO;
import nlu.com.app.dto.response.PageBookResponseDTO;
import nlu.com.app.dto.response.ShopDataInitDTO;
import nlu.com.app.dto.response.UpdateBookResponse;
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
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

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
  CategoryService categoryService;
  GenreService genreService;
  FileService fileService;
  UserReviewService userReviewService;
  PromotionService promotionService;
  @Value("${app.temp-folder}")
  @NonFinal
  String tmp;

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
   * {@inheritDoc}
   */
  public Page<PageBookResponseDTO> getBooksByCategory(BookSearchRequestDTO bookSearchRequestDTO) {
    Pageable pageable = PageRequest.of(bookSearchRequestDTO.getPage(),
        bookSearchRequestDTO.getSize());

    Category category = categoryRepository.findById(bookSearchRequestDTO.getCategoryId())
        .orElseThrow(() -> new ApplicationException(ErrorCode.CATEGORY_NOT_FOUND));

    List<Category> subCategories = categoryRepository.findByParentCategory(category);
    subCategories.add(category);
    Double minPrice =
        bookSearchRequestDTO.getMinPrice() != null ? bookSearchRequestDTO.getMinPrice() / 1000
            : 0.0;
    Double maxPrice =
        bookSearchRequestDTO.getMaxPrice() != null ? bookSearchRequestDTO.getMaxPrice() / 1000
            : Double.MAX_VALUE;

    Page<Book> books = bookRepository.findAllByCategoryInAndPriceBetweenAndTitleContainingIgnoreCase(
        subCategories, minPrice, maxPrice, bookSearchRequestDTO.getContext(), pageable
    );

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
        .map(book -> {
          List<Long> relatedCategoryIds = getAllRelatedCategoryIds(book.getCategory());

          double maxDiscount = relatedCategoryIds.stream()
              .map(id -> categoryDiscountMap.getOrDefault(id, 0D))
              .max(Double::compareTo)
              .orElse(0D);

          double rating = ratingMap.getOrDefault(book.getBookId(), 0D);

          return bookMapper.toPageDto(book, maxDiscount, rating);
        })
        .toList();

    return new PageImpl<>(result, pageable, books.getTotalElements());
  }

  @Override
  public Page<PageBookResponseDTO> searchBook(BookSearchRequestDTO bookSearchRequestDTO) {
    Pageable pageable = PageRequest.of(bookSearchRequestDTO.getPage(), bookSearchRequestDTO.getSize());

    // Lấy category theo id
    Category category = categoryRepository.findById(bookSearchRequestDTO.getCategoryId())
            .orElseThrow(() -> new ApplicationException(ErrorCode.CATEGORY_NOT_FOUND));

    List<Category> searchCategories;
    if (category.getCategoryName() == ECategory.ALL_CATEGORY) {
      // Nếu là ALL_CATEGORY thì lấy toàn bộ category
      searchCategories = categoryRepository.findAll();
    } else {
      // Lấy đệ quy tất cả category con và thêm category hiện tại
      searchCategories = getAllSubCategories(category);
      searchCategories.add(category);
    }

    Double minPrice = bookSearchRequestDTO.getMinPrice() != null
            ? bookSearchRequestDTO.getMinPrice() / 1000
            : 0.0;
    Double maxPrice = bookSearchRequestDTO.getMaxPrice() != null
            ? bookSearchRequestDTO.getMaxPrice() / 1000
            : Double.MAX_VALUE;

    Page<Book> books = bookRepository.findAllByCategoryInAndPriceBetweenAndTitleContainingIgnoreCase(
            searchCategories, minPrice, maxPrice, bookSearchRequestDTO.getContext(), pageable
    );

    List<Long> bookIds = books.stream().map(Book::getBookId).toList();
    List<Long> categoryIds = searchCategories.stream().map(Category::getCategoryId).toList();

    // Get active promotions for categories
    List<Promotion> promotions = promotionCategoriesRepository.findActivePromotionsByCategoryIds(categoryIds);

    // Get the highest promotion discount
    Map<Long, Double> categoryDiscountMap = promotions.stream()
            .flatMap(promotion -> promotion.getPromotionCategories().stream()
                    .map(pc -> Map.entry(pc.getCategory().getCategoryId(), promotion.getDiscountPercentage())))
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
            .map(book -> {
              double totalDiscounts = promotionService.getPromotionsAppliedForCategory(book.getCategory().getCategoryId())
                      .stream().map(promotion -> promotion.getDiscountPercentage())
                      .reduce((prev, cur) -> prev + cur).get();
              double rating = userReviewService.getReviewOverall(book.getBookId()).getAvgScore();
              return bookMapper.toPageDto(book, totalDiscounts, rating);
            })
            .toList();

    return new PageImpl<>(result, pageable, books.getTotalElements());
  }

  // Hàm đệ quy lấy toàn bộ category con nhiều cấp
  private List<Category> getAllSubCategories(Category parent) {
    List<Category> result = new ArrayList<>();
    List<Category> directSubs = categoryRepository.findByParentCategory(parent);
    result.addAll(directSubs);
    for (Category sub : directSubs) {
      result.addAll(getAllSubCategories(sub));
    }
    return result;
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public ShopDataInitDTO getShopInitData() {
    List<CategoryResponseDTO> categoryList = categoryService.getAllCategories();
    List<GenreResponseDTO> genreResponseList = genreService.getAllGenre();
    return ShopDataInitDTO
        .builder()
        .categoryResponseDTOs(categoryList.get(0))
        .genreResponseDTOs(genreResponseList)
        .build();
  }

  @Override
  public BookDetailsDTO getBookDetails(Long bookId) {
    Book book = bookRepository.findById(bookId)
        .orElseThrow(() -> new ApplicationException(ErrorCode.UNKNOWN_EXCEPTION));

    List<String> imageUrls = book.getImages().stream()
        .map(BookImage::getImageUrl)
        .collect(Collectors.toList());

    List<ReviewDTO> reviews = userReviewRepository.findAllByBook(book).stream()
        .map(review -> ReviewDTO.builder()
            .userName(review.getUser().getUsername())
            .rating(review.getRating())
            .reviewText(review.getReviewText())
            .reviewDate(review.getReviewDate().toString())
            .build())
        .collect(Collectors.toList());

    List<Long> relatedCategoryIds = new ArrayList<>();
    Category current = book.getCategory();
    while (current != null) {
      relatedCategoryIds.add(current.getCategoryId());
      current = current.getParentCategory();
    }

    List<Promotion> promotions = promotionCategoriesRepository.findActivePromotionsByCategoryIds(
        relatedCategoryIds);

    Double discount = promotions.stream()
        .flatMap(promotion -> promotion.getPromotionCategories().stream()
            .filter(pc -> relatedCategoryIds.contains(pc.getCategory().getCategoryId()))
            .map(pc -> promotion.getDiscountPercentage()))
        .max(Double::compare)
        .orElse(0D);

    Double originalPrice = book.getPrice() * 1000;
    Double discountedPrice = originalPrice * (1 - discount / 100);

    return bookMapper.toBookDetailsDTO(book, imageUrls, reviews, originalPrice, discountedPrice);
  }


  /**
   * {{@inheritDoc}}
   */
  @Override
  public ListBookDetailsDTO getBookDetailsOfTopWeekly() {
    var topBooks = bookRepository.findTop5ByOrderByBookIdDesc();
    var list = new ArrayList<BookDetailsDTO>();
    for (var book : topBooks) {
      List<String> imageUrls = book.getImages().stream()
          .map(BookImage::getImageUrl)
          .collect(Collectors.toList());

      List<ReviewDTO> reviews = userReviewRepository.findAllByBook(book).stream()
          .map(review -> ReviewDTO.builder()
              .userName(review.getUser().getUsername())
              .rating(review.getRating())
              .reviewText(review.getReviewText())
              .reviewDate(review.getReviewDate().toString())
              .build())
          .collect(Collectors.toList());

      List<Promotion> promotions = promotionCategoriesRepository.findActivePromotionsByCategoryIds(
          List.of(book.getCategory().getCategoryId()));

      Double discount = promotions.stream()
          .flatMap(promotion -> promotion.getPromotionCategories().stream()
              .filter(
                  pc -> pc.getCategory().getCategoryId().equals(book.getCategory().getCategoryId()))
              .map(pc -> promotion.getDiscountPercentage()))
          .max(Double::compare)
          .orElse(0D);

      Double originalPrice = book.getPrice() * 1000;
      Double discountedPrice = originalPrice * (1 - discount / 100);

      var dto = bookMapper.toBookDetailsDTO(book, imageUrls, reviews, originalPrice,
          discountedPrice);
      list.add(dto);
    }
    return ListBookDetailsDTO.builder().books(list).build();
  }

  @Override
  @Transactional
  public CreateBookResponse createBook(CreateBookRequest metadata,
      MultipartFile thumbnail,
      MultipartFile[] gallery) {
    try {
      String key_thumbnail = String.format("%s/%s", metadata.getProduct_code(),
          thumbnail.getOriginalFilename());
      // write to temp folder first
      fileService.writeToTempFolder(thumbnail, tmp + "/" + metadata.getProduct_code());
      // only upload which file was sucessfully cached
      String link_thumbnail = fileService.uploadFile(new File(tmp + "/" + key_thumbnail),
          key_thumbnail);
      List<String> link_gallery = new ArrayList<>();
      for (MultipartFile image : gallery) {
        String key_image = String.format("%s/%s", metadata.getProduct_code(),
            image.getOriginalFilename());
        fileService.writeToTempFolder(image, tmp + "/" + metadata.getProduct_code());
        String link = fileService.uploadFile(new File(tmp + "/" + key_image), key_image);
        link_gallery.add(link);
      }
      // vailidate if metadata is valid
      Long categoryId = metadata.getCategory_id();
      var category = categoryRepository.findById(categoryId)
          .orElseThrow(() -> new ApplicationException(ErrorCode.CATEGORY_NOT_FOUND));
      var genre = genreRepository.findById(metadata.getGenre_id())
          .orElseThrow(() -> new ApplicationException(ErrorCode.GENRE_NOT_FOUND));
      var book = bookMapper.metadataToEntity(metadata);
      book.setGenre(genre);
      book.setCategory(category);
      // add thumbnail
      var bookImages = new ArrayList<>(List.of(BookImage.builder()
          .book(book)
          .isThumbnail(true)
          .build()
      ));
      // add gallery
      link_gallery.forEach(link -> {
        bookImages.add(BookImage.builder().book(book)
            .imageUrl(link).isThumbnail(false).build());
      });
      book.setImages(bookImages);
      // save book
      var savedBook = bookRepository.save(book);
      return bookMapper.toCreateBookResponse(savedBook, link_thumbnail, link_gallery);
    } catch (IOException e) {
      throw new ApplicationException(ErrorCode.UNKNOWN_EXCEPTION);
    }
  }

  @Transactional
  @Override
  public UpdateBookResponse updateBook(Long bookId,
      UpdateBookRequest metadata,
      MultipartFile newThumbnail,
      String oldThumbnail,
      MultipartFile[] newGallery, String[] oldGallery
  ) {
    try {
      var book = bookRepository.findById(bookId)
          .orElseThrow(() -> new ApplicationException(ErrorCode.BOOK_NOT_FOUND));

      // Cập nhật metadata
      book.setTitle(metadata.getTitle());
      book.setFormat(metadata.getFormat());
      book.setLanguage(metadata.getLanguage());
      book.setAuthor(metadata.getAuthor());
      book.setDescription(metadata.getDescription());
      book.setPrice(metadata.getPrice());
      book.setAge(metadata.getAge());
      book.setQtyInStock(metadata.getQty_in_stock());
      book.setPublishYear(metadata.getPublish_year() + "");
      book.setWeight(metadata.getWeight());
      book.setProductCode(metadata.getProduct_code());

      var category = categoryRepository.findById(metadata.getCategory_id())
          .orElseThrow(() -> new ApplicationException(ErrorCode.CATEGORY_NOT_FOUND));
      var genre = genreRepository.findById(metadata.getGenre_id())
          .orElseThrow(() -> new ApplicationException(ErrorCode.GENRE_NOT_FOUND));
      book.setCategory(category);
      book.setGenre(genre);

      // Danh sách ảnh mới sẽ ghi đè lại toàn bộ
      List<BookImage> updatedImages = new ArrayList<>();

      // Xử lý thumbnail mới
      if (newThumbnail != null && !newThumbnail.isEmpty()) {
        String keyThumbnail = String.format("%s/%s", metadata.getProduct_code(),
            newThumbnail.getOriginalFilename());
        fileService.writeToTempFolder(newThumbnail, tmp + "/" + metadata.getProduct_code());
        String uploadedThumbnail = fileService.uploadFile(new File(tmp + "/" + keyThumbnail),
            keyThumbnail);

        updatedImages.add(BookImage.builder()
            .book(book)
            .imageUrl(uploadedThumbnail)
            .isThumbnail(true)
            .build());
      } else if (oldThumbnail != null && !oldThumbnail.isBlank()) {
        updatedImages.add(BookImage.builder()
            .book(book)
            .imageUrl(oldThumbnail)
            .isThumbnail(true)
            .build());
      }

      // Xử lý gallery cũ
      if (oldGallery != null) {
        for (String oldUrl : oldGallery) {
          updatedImages.add(BookImage.builder()
              .book(book)
              .imageUrl(oldUrl)
              .isThumbnail(false)
              .build());
        }
      }

      if (newGallery != null) {
        for (MultipartFile image : newGallery) {
          if (image != null && !image.isEmpty()) {
            String key = String.format("%s/%s", metadata.getProduct_code(),
                image.getOriginalFilename());
            fileService.writeToTempFolder(image, tmp + "/" + metadata.getProduct_code());
            String link = fileService.uploadFile(new File(tmp + "/" + key), key);

            updatedImages.add(BookImage.builder()
                .book(book)
                .imageUrl(link)
                .isThumbnail(false)
                .build());
          }
        }
      }

      // Xóa tất cả image hiện tại trước khi cập nhật
      long result = bookImageRepository.deleteAllByBook_BookId(bookId);
      System.out.println("count deleted old images: " + result);

      book.getImages().clear();
      for (BookImage newImage : updatedImages) {
        newImage.setBook(book); // set lại quan hệ
        book.getImages().add(newImage);
      }
      // Lưu lại
      bookRepository.save(book);

      return bookMapper.toUpdateBookResponse(book);
    } catch (IOException e) {
      throw new ApplicationException(ErrorCode.UNKNOWN_EXCEPTION);
    }
  }

  @Override
  public UpdateBookResponse getBookInfoForUpdate(Long bookId) {
    var book = bookRepository.findById(bookId)
        .orElseThrow(() -> new ApplicationException(ErrorCode.BOOK_NOT_FOUND));
    return bookMapper.toUpdateBookResponse(book);
  }

  @Override
  public Page<BookOverviewDTO> getBookOverviews(Pageable pageable) {
    var pageResult = bookRepository.findAllBy(pageable);
    var result = pageResult
        .stream().map(b -> bookMapper.toBookOverviewDTO(b, userReviewService, bookImageRepository))
        .toList();

    return new PageImpl<>(result, pageable, pageResult.getTotalElements());
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
