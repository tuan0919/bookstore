package nlu.com.app.repository;

import nlu.com.app.entity.UserAddress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author VuLuu
 */
@Repository
public interface UserAddressRepository extends JpaRepository<UserAddress, Long> {

}
