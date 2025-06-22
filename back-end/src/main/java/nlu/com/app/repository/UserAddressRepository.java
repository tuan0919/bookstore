package nlu.com.app.repository;

import java.util.List;
import java.util.Optional;
import nlu.com.app.entity.User;
import nlu.com.app.entity.UserAddress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author VuLuu
 */
@Repository
public interface UserAddressRepository extends JpaRepository<UserAddress, Long> {

  List<UserAddress> findByUser(User user);

  boolean existsByUserAndIsDefaultTrue(User user);

  Optional<UserAddress> findByUserAndIsDefaultTrue(User user);

  Optional<UserAddress> findByUserAndIsDefault(User user, Boolean isDefault);
}
