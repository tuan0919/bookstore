package nlu.com.app.init_data;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import nlu.com.app.service.impl.BookService;
import nlu.com.app.service.impl.CategoryService;
import nlu.com.app.service.impl.GenreService;
import nlu.com.app.service.impl.PaymentService;
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
  PaymentService paymentService;

  @Bean
  public CommandLineRunner demo() {
    return (args) -> {

      // Generate default data
      if (bookService.checkInitData()) {
        categoryService.initData();
        genreService.initData();
        paymentService.initData();
        bookService.initData();
      }
    };
  }
}
