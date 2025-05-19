package nlu.com.app.configuration.batch;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import java.util.Collections;
import java.util.Iterator;
import java.util.Set;
import nlu.com.app.dto.cart.Cart;
import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.NonTransientResourceException;
import org.springframework.batch.item.ParseException;
import org.springframework.batch.item.UnexpectedInputException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

/**
 * @author VuLuu
 */
@Component
public class CartRedisReader implements ItemReader<Cart> {

  @Autowired
  private RedisTemplate<String, String> redisTemplate;
  private Iterator<String> cartKeysIterator;

  @PostConstruct
  public void init() {
    Set<String> keys = redisTemplate.keys("cart:*");
    if (keys != null) {
      cartKeysIterator = keys.iterator();
    } else {
      cartKeysIterator = Collections.emptyIterator();
    }
  }

  @Override
  public Cart read()
      throws Exception, UnexpectedInputException, ParseException, NonTransientResourceException {
    if (cartKeysIterator == null || !cartKeysIterator.hasNext()) {
      return null;
    }

    String key = cartKeysIterator.next();
    String json = redisTemplate.opsForValue().get(key);

    if (json == null) {
      return null;
    }

    ObjectMapper mapper = new ObjectMapper();
    return mapper.readValue(json, Cart.class);
  }
}
