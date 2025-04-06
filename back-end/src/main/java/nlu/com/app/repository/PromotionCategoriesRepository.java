package nlu.com.app.repository;

import nlu.com.app.entity.PromotionCategories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author VuLuu
 */
@Repository
public interface PromotionCategoriesRepository extends JpaRepository<PromotionCategories, Long> {

}
