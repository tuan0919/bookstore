package nlu.com.app.service;

import nlu.com.app.dto.request.CreateReviewRequest;
import nlu.com.app.dto.response.CreateReviewResponse;
import nlu.com.app.dto.response.ReviewOverallDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IUserReviewService {
    /**
     * Create new user's review for a book
     * @param jwtToken user's login token, user need to be authenticated before adding new review.
     * @param requestDTO create request DTO
     * @return corresponding response DTO
     */
    CreateReviewResponse createReview(String jwtToken, CreateReviewRequest requestDTO);

    /**
     * get review rate overall for book
     * @param bookId book's ID
     * @return overall stat.
     */
    ReviewOverallDTO getReviewOverall(Long bookId);

    /**
     * get user's reviews for a book
     * @param bookId Book's id which need to get all reviews
     * @param pageable paging object
     * @return page of reviews
     */
    Page<CreateReviewResponse> getReviewsOfBook(Long bookId, Pageable pageable);
}
