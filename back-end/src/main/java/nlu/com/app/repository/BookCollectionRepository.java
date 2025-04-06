package nlu.com.app.repository;

import nlu.com.app.entity.BookCollection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author VuLuu
 */
@Repository
public interface BookCollectionRepository extends JpaRepository<BookCollection, Long> {

}
