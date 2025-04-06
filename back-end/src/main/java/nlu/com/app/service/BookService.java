package nlu.com.app.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.util.List;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import nlu.com.app.dto.json.BooksWrapper;
import nlu.com.app.entity.Book;
import nlu.com.app.mapper.BookMapper;
import nlu.com.app.repository.BookRepository;
import nlu.com.app.repository.CategoryRepository;
import nlu.com.app.repository.GenreRepository;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

/**
 * @author VuLuu
 */
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BookService {

  ObjectMapper objectMapper;
  BookMapper bookMapper;
  BookRepository bookRepository;
  CategoryRepository categoryRepository;
  GenreRepository genreRepository;

  public void initData() throws IOException {
    ClassPathResource resource = new ClassPathResource("ArtAnime.json");
    List<BooksWrapper> listBookWrapper = objectMapper.readValue(resource.getInputStream(),
        new TypeReference<List<BooksWrapper>>() {
        });
    Book book = bookMapper.jsonToEntity(listBookWrapper.get(1).getBooks(), categoryRepository,
        genreRepository);
    bookRepository.save(book);
    System.out.println(book);
  }
}
