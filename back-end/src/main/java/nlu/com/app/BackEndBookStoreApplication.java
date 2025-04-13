package nlu.com.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class BackEndBookStoreApplication {

  public static void main(String[] args) {
    SpringApplication.run(BackEndBookStoreApplication.class, args);
  }

}
