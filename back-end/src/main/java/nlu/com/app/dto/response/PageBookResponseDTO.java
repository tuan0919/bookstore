package nlu.com.app.dto.response;

/**
 * @author VuLuu
 */

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PageBookResponseDTO {

  Long bookId;
  String title;
  double price;
  double discountedPrice;
  double discountPercentage;
  double averageRating;
  String imageUrl;
}
