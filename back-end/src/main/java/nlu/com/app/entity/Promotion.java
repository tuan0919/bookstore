package nlu.com.app.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * @author VuLuu
 */
@Entity
@Table(name = "promotions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Promotion {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "promotion_id")
  private Long promotionId;
  @Column(name = "promotion_name")
  private String promotionName;
  @Column(name = "discount_percentage")
  private double discountPercentage;
  @Column(name = "start_date")
  private LocalDate startDate;
  @Column(name = "end_date")
  private LocalDate endDate;
  @ToString.Exclude
  @OneToMany(mappedBy = "promotion", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<PromotionCategories> promotionCategories = new ArrayList<>();
}
