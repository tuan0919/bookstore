package nlu.com.app.configuration.batch;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Collections;
import java.util.Iterator;
import java.util.Set;
import nlu.com.app.dto.cart.Cart;
import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.NonTransientResourceException;
import org.springframework.batch.item.ParseException;
import org.springframework.batch.item.UnexpectedInputException;
import org.springframework.data.redis.core.RedisTemplate;

/**
 * @author VuLuu
 */

public class CartRedisReader implements ItemReader<Cart> {

  private RedisTemplate<String, Object> redisTemplate;
  private Iterator<String> cartKeysIterator;

  public void setRedisTemplate(RedisTemplate<String, Object> redisTemplate) {
    this.redisTemplate = redisTemplate;
  }

  @Override
  public Cart read()
      throws Exception, UnexpectedInputException, ParseException, NonTransientResourceException {
    if (cartKeysIterator == null) {
      Set<String> keys = redisTemplate.keys("cart:*");
      cartKeysIterator = (keys != null) ? keys.iterator() : Collections.emptyIterator();
    }

    if (!cartKeysIterator.hasNext()) {
      return null;
    }

    String key = cartKeysIterator.next();
    Object jsonObj = redisTemplate.opsForValue().get(key);

    if (jsonObj == null) {
      return read(); // skip null value and move to next key
    }

    ObjectMapper mapper = new ObjectMapper();
    String json = jsonObj.toString();

    return mapper.readValue(json, Cart.class);
  }
}
