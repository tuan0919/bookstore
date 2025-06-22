package nlu.com.app.repository;

import nlu.com.app.entity.Promotion;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

/**
 * @author VuLuu
 */
@Repository
public interface PromotionRepository extends JpaRepository<Promotion, Long> {
    Page<Promotion> findAll(Pageable pageable);
    @Query("""
        SELECT p FROM Promotion p
        WHERE p.startDate <= :today AND p.endDate >= :today
    """)
    Page<Promotion> findActivePromotions(Pageable pageable, @Param("today") LocalDate today);
}
