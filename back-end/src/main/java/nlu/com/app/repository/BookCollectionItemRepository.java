package nlu.com.app.repository;

import nlu.com.app.entity.BookCollectionItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author VuLuu
 */
@Repository
public interface BookCollectionItemRepository extends JpaRepository<BookCollectionItem, Long> {

}
