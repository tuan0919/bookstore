package nlu.com.app.configuration.batch;

import nlu.com.app.dto.cart.Cart;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.stereotype.Component;

/**
 * @author VuLuu
 */
@Component
public class CartProcessor implements ItemProcessor<Cart, Cart> {

  @Override
  public Cart process(Cart item) throws Exception {
    // todo
    return item;
  }
}
