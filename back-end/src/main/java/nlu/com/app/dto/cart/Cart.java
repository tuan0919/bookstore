package nlu.com.app.dto.cart;

import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author VuLuu
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cart {

  private String userId;
  private List<CartItem> items;
  private LocalDateTime lastModified;
}
