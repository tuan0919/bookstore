package nlu.com.app.repository;

import java.util.List;

import nlu.com.app.constant.ReviewType;
import nlu.com.app.entity.Book;
import nlu.com.app.entity.UserReview;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * @author VuLuu
 */
@Repository
public interface UserReviewRepository extends JpaRepository<UserReview, Long> {

  List<UserReview> findByBookBookIdIn(List<Long> bookIds);

  List<UserReview> findAllByBook(Book book);

  Long countAllByBookBookId(Long bookId);

  Long countAllByBookBookIdAndReviewTypeAndRating(Long book_bookId, ReviewType reviewType, double rating);

  @Query("""
    SELECT SUM(r.rating)
    FROM UserReview r
    WHERE r.book.bookId = :bookId
  """)
  Long totalScoreByBookBookId(Long bookId);

  Page<UserReview> findByBookBookIdOrderByReviewDateDesc(Long bookBookId, Pageable pageable);
}
