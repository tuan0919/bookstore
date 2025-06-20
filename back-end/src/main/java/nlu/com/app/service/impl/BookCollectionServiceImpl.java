package nlu.com.app.service.impl;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import nlu.com.app.dto.request.CreateBookCollectionRequestDTO;
import nlu.com.app.dto.response.BookCollectionResponse;
import nlu.com.app.entity.Book;
import nlu.com.app.entity.BookCollection;
import nlu.com.app.entity.BookCollectionItem;
import nlu.com.app.entity.BookImage;
import nlu.com.app.entity.User;
import nlu.com.app.exception.ApplicationException;
import nlu.com.app.exception.ErrorCode;
import nlu.com.app.repository.BookCollectionItemRepository;
import nlu.com.app.repository.BookCollectionRepository;
import nlu.com.app.repository.BookRepository;
import nlu.com.app.repository.UserRepository;
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
}
