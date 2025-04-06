package nlu.com.app.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.util.List;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import nlu.com.app.dto.json.BooksJson;
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

  String initJsonFile[] = {"ArtAnime.json", "LightNovelJP.json", "LightNovelVN.json",
      "MangaJp.json", "MangaVN.json"};
  ObjectMapper objectMapper;
  BookMapper bookMapper;
  BookRepository bookRepository;
  CategoryRepository categoryRepository;
  GenreRepository genreRepository;

  public void initData() throws IOException {

    for (String file : initJsonFile) {
      ClassPathResource resource = new ClassPathResource(file);
      List<BooksWrapper> listBookWrapper = objectMapper.readValue(resource.getInputStream(),
          new TypeReference<List<BooksWrapper>>() {
          });
      List<BooksJson> booksJsonList = listBookWrapper.stream().map(BooksWrapper::getBooks).filter(
          bookJson -> bookJson.getTitle() != null && !bookJson.getTitle().trim().isEmpty()
              && bookJson.getAuthor() != null && !bookJson.getAuthor().trim().isEmpty()
              && bookJson.getPrice() != null && !bookJson.getPrice().trim().isEmpty()
              && bookJson.getPublishYear() != null && !bookJson.getPublishYear().trim().isEmpty()
              && bookJson.getQtyInStock() != null && !bookJson.getQtyInStock().trim().isEmpty()
              && bookJson.getPageCount() != null && !bookJson.getPageCount().trim().isEmpty()
              && bookJson.getWeight() != null && !bookJson.getWeight().trim().isEmpty()).toList();

      System.out.println("Đang ở file" + file);
      List<Book> book = bookMapper.jsonToEntityList(booksJsonList, categoryRepository,
          genreRepository);
      bookRepository.saveAll(book);

      System.out.println("INIT DATA SUCCESSFUL!");
    }
  }

  public boolean checkInitData() {
    if (bookRepository.findAll().isEmpty()) {
      return true;
    }
    return false;
  }

}
