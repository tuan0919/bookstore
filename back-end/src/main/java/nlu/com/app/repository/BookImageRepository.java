package nlu.com.app.repository;

import nlu.com.app.entity.BookImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author VuLuu
 */
@Repository
public interface BookImageRepository extends JpaRepository<BookImage, Long> {
    long deleteAllByBook_BookId(Long bookId);
    BookImage findByBookBookIdAndIsThumbnailIsTrue(Long bookId);
}
