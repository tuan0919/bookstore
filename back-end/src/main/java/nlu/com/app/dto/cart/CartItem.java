package nlu.com.app.dto.cart;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author VuLuu
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartItem {
  private String productId;
  private int quantity;
}

