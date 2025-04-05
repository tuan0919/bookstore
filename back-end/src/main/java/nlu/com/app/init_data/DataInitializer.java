package nlu.com.app.init_data;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import nlu.com.app.dto.json.BooksWrapper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

/**
 * @author VuLuu
 */
@Configuration
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class DataInitializer {

  ObjectMapper objectMapper;

  @Bean
  public CommandLineRunner demo() {
    return (args) -> {
      ClassPathResource resource = new ClassPathResource("ArtAnime.json");
      List<BooksWrapper> listBookWrapper = objectMapper.readValue(resource.getInputStream(),
          new TypeReference<List<BooksWrapper>>() {
          });
      System.out.println(listBookWrapper);
    };
  }
}
