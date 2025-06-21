package nlu.com.app.dto.request;

import lombok.Builder;
import lombok.Data;

/**
 * @author VuLuu
 */
@Data
@Builder
public class BookInCollectionDTO {
  private Long bookId;
  private String title;
  private double originalPrice;
  private double discountPercentage;
  private double discountedPrice;
  private double averageRating;
  private String thumbnail;
}
