package nlu.com.app.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author VuLuu
 */
@Entity
@Table(name = "promotion_categories")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PromotionCategories {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "promotion_category_id")
  private Long promotionCategoryId;

  @ManyToOne
  @JoinColumn(name = "promotion_id")
  private Promotion promotion;

  @ManyToOne
  @JoinColumn(name = "category_id")
  private Category category;
}
