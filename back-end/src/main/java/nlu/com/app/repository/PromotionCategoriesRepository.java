package nlu.com.app.repository;

import java.util.Collection;
import java.util.List;
import nlu.com.app.entity.Category;
import nlu.com.app.entity.Promotion;
import nlu.com.app.entity.PromotionCategories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * @author VuLuu
 */
@Repository
public interface PromotionCategoriesRepository extends JpaRepository<PromotionCategories, Long> {
  List<PromotionCategories> findByCategory_CategoryIdIn(Collection<Long> categoryIds);
  List<PromotionCategories> findByCategory(Category category);

  @Query("""
      SELECT p FROM Promotion p
      JOIN PromotionCategories pc ON pc.promotion = p
      WHERE pc.category.categoryId IN :categoryIds
      AND CURRENT_DATE BETWEEN p.startDate AND p.endDate
      """)
  List<Promotion> findActivePromotionsByCategoryIds(@Param("categoryIds") List<Long> categoryIds);

}
