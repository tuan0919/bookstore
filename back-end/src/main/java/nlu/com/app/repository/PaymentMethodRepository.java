package nlu.com.app.repository;

import nlu.com.app.entity.PaymentMethod;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author VuLuu
 */
@Repository
public interface PaymentMethodRepository extends JpaRepository<PaymentMethod, Long> {

}
