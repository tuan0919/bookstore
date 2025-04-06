package nlu.com.app.init_data;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import nlu.com.app.service.BookService;
import nlu.com.app.service.CategoryService;
import nlu.com.app.service.GenreService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @author VuLuu
 */
@Configuration
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class DataInitializer {

  CategoryService categoryService;
  BookService bookService;
  GenreService genreService;

  @Bean
  public CommandLineRunner demo() {
    return (args) -> {
      // Generate default data
      categoryService.initData();
      genreService.initData();
      bookService.initData();
    };
  }
}
