package nlu.com.app.mapper;

import nlu.com.app.constant.EPaymentMethod;
import nlu.com.app.constant.ReviewType;
import nlu.com.app.dto.request.CreateReviewRequest;
import nlu.com.app.dto.response.CreateReviewResponse;
import nlu.com.app.dto.response.PaymentMethodDTO;
import nlu.com.app.entity.PaymentMethod;
import nlu.com.app.entity.User;
import nlu.com.app.entity.UserReview;
import nlu.com.app.exception.ApplicationException;
import nlu.com.app.exception.ErrorCode;
import nlu.com.app.repository.BookCollectionRepository;
import nlu.com.app.repository.BookRepository;
import nlu.com.app.repository.UserRepository;
import nlu.com.app.repository.UserReviewRepository;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        builder = @Builder(disableBuilder = true))
public interface UserReviewMapper {

  UserReviewMapper INSTANCE = Mappers.getMapper(UserReviewMapper.class);

  @Mapping(target = ".", source = "request", qualifiedByName = "_fromCreateRequestToEntity")
  UserReview toEntity(CreateReviewRequest request,
                      @Context String username,
                      @Context UserRepository userRepository,
                      @Context BookCollectionRepository bookCollectionRepository,
                      @Context BookRepository bookRepository);

  @Mapping(target = "review_id", source = "review.reviewId")
  @Mapping(target = "review_text", source = "review.reviewText")
  @Mapping(target = "review_type", source = "review.reviewType")
  @Mapping(target = "book_id", expression = "java(review.getBook() != null ? review.getBook().getBookId() : null)")
  @Mapping(target = "collection_id", expression = "java(review.getCollection() != null ? review.getCollection().getCollectionId() : null)")
  @Mapping(target = "created_at", source = "review.reviewDate", qualifiedByName = "_reviewDateToString")
  @Mapping(target = "user", source = "review.user", qualifiedByName = "toUser")
  CreateReviewResponse toResponse(UserReview review);

  @Named("toUser")
  @Mapping(target = "id", source = "user.userId")
  CreateReviewResponse.User toUser(User user);

  @Named("_reviewDateToString")
  default String _reviewDateToString(LocalDate date) {
    return date.format(DateTimeFormatter.ofPattern("dd/MM/yyyy"));
  }

  @Named("_fromCreateRequestToEntity")
  default UserReview _fromCreateRequestToEntity(CreateReviewRequest request,
                                                @Context String username,
                                                @Context UserRepository userRepository,
                                                @Context BookCollectionRepository bookCollectionRepository,
                                                @Context BookRepository bookRepository) {
    var user = userRepository.findByUsername(username)
            .orElseThrow(() -> new ApplicationException(ErrorCode.USER_NOT_EXISTED));
    var review = new UserReview();
    review.setUser(user);
    review.setReviewDate(LocalDate.now());
    review.setReviewText(request.getReview_text());
    review.setReviewType(request.getReview_type());
    review.setRating(request.getRating());
    var collection = request.getReview_type() == ReviewType.COLLECTION ?
            bookCollectionRepository.findById(request.getCollection_id())
                    .orElseThrow(() -> new ApplicationException(ErrorCode.BOOK_COLLECTION_NOT_FOUND)) : null;
    var book = request.getReview_type() == ReviewType.BOOK ?
            bookRepository.findById(request.getBook_id())
                    .orElseThrow(() -> new ApplicationException(ErrorCode.BOOK_NOT_FOUND)) : null;
    review.setBook(book);
    review.setCollection(collection);
    return review;
  }
}
