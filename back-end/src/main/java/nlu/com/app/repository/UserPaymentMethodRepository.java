package nlu.com.app.repository;

import nlu.com.app.entity.UserPaymentMethod;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author VuLuu
 */
@Repository
public interface UserPaymentMethodRepository extends JpaRepository<UserPaymentMethod, Long> {

}
