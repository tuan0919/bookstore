package nlu.com.app.repository;

import java.util.List;
import nlu.com.app.entity.UserReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author VuLuu
 */
@Repository
public interface UserReviewRepository extends JpaRepository<UserReview, Long> {

  List<UserReview> findByBookBookIdIn(List<Long> bookIds);
}
