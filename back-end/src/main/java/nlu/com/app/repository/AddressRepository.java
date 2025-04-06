package nlu.com.app.repository;

import nlu.com.app.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author VuLuu
 */
@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {

}
