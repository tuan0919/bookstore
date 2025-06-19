package nlu.com.app.repository;

import nlu.com.app.entity.Promotion;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author VuLuu
 */
@Repository
public interface PromotionRepository extends JpaRepository<Promotion, Long> {
    Page<Promotion> findAll(Pageable pageable);
}
