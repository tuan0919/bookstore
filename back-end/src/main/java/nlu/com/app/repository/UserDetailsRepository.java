package nlu.com.app.repository;

import nlu.com.app.entity.UserDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author VuLuu
 */
@Repository
public interface UserDetailsRepository extends JpaRepository<UserDetails, Long> {

}
