package nlu.com.app.service.impl;

import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import nlu.com.app.constant.ReviewType;
import nlu.com.app.dto.request.CreateReviewRequest;
import nlu.com.app.dto.response.CreateReviewResponse;
import nlu.com.app.dto.response.ReviewOverallDTO;
import nlu.com.app.exception.ApplicationException;
import nlu.com.app.exception.ErrorCode;
import nlu.com.app.mapper.UserReviewMapper;
import nlu.com.app.repository.BookCollectionRepository;
import nlu.com.app.repository.BookRepository;
import nlu.com.app.repository.UserRepository;
import nlu.com.app.repository.UserReviewRepository;
import nlu.com.app.service.IUserReviewService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * @author Nguyen Tuan
 */

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserReviewService implements IUserReviewService {
    JWTService jwtService;
    UserReviewRepository userReviewRepository;
    UserRepository userRepository;
    BookRepository bookRepository;
    BookCollectionRepository bookCollectionRepository;
    UserReviewMapper userReviewMapper;

    @Override
    @Transactional
    public CreateReviewResponse createReview(String jwtToken, CreateReviewRequest requestDTO) {
        // Get username from token
        String username = null;
        try {
            username = jwtService.extractUsername(jwtToken);
        } catch (Exception e) {
            e.printStackTrace();
            // any exception throws here should be considered as Authentication Exception
            throw new ApplicationException(ErrorCode.UNAUTHENTICATED);
        }
        // if user exists
        userRepository.findByUsername(username)
                .orElseThrow(() -> new ApplicationException(ErrorCode.USER_NOT_EXISTED));

        switch (requestDTO.getReview_type()) {
            case BOOK -> {
                // if book exists
                Long bookId = requestDTO.getBook_id();
                bookRepository.findById(bookId)
                        .orElseThrow(() -> new ApplicationException(ErrorCode.BOOK_NOT_FOUND));
            }
            case COLLECTION -> {
                // if collect exists
                // TODO: Add more logic to here
            }
        }

        var review = userReviewMapper._fromCreateRequestToEntity(requestDTO, username, userRepository, bookCollectionRepository, bookRepository);
        review = userReviewRepository.save(review);
        return userReviewMapper.toResponse(review);
    }

    @Override
    public ReviewOverallDTO getReviewOverall(Long bookId) {
        long totalCount = userReviewRepository.countAllByBookBookId(bookId);
        long totalScore = Optional.ofNullable(userReviewRepository.totalScoreByBookBookId(bookId)).orElse(0L);

        double avgScore = totalCount == 0 ? 0.0 : (double) totalScore / totalCount;

        List<Double> rates = new ArrayList<>();
        for (int i = 5; i >= 1; i--) {
            long count = userReviewRepository.countAllByBookBookIdAndReviewTypeAndRating(bookId, ReviewType.BOOK, i);
            double rate = totalCount == 0 ? 0.0 : (double) count / totalCount * 100;
            rates.add(rate);
        }

        return ReviewOverallDTO.builder()
                .avgScore(avgScore)
                .bookId(bookId)
                .rates(rates)
                .total(totalCount)
                .build();
    }

    @Transactional
    @Override
    public Page<CreateReviewResponse> getReviewsOfBook(Long bookId, Pageable pageable) {
        var reviews = userReviewRepository.findByBookBookIdOrderByReviewDateDesc(bookId, pageable);
        var results = reviews.stream()
                .map(userReviewMapper::toResponse)
                .toList();
        return new PageImpl<>(results, pageable, reviews.getTotalElements());
    }
}
