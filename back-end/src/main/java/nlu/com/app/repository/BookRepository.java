package nlu.com.app.repository;

import nlu.com.app.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author VuLuu
 */
@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

}
