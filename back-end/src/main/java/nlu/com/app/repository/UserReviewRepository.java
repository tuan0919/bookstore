package nlu.com.app.repository;

import nlu.com.app.entity.UserReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author VuLuu
 */
@Repository
public interface UserReviewRepository extends JpaRepository<UserReview, Long> {

}
