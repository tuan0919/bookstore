package nlu.com.app.service;

import nlu.com.app.dto.request.BookDetailsDTO;
import nlu.com.app.dto.request.BookSearchRequestDTO;
import nlu.com.app.dto.response.ListBookDetailsDTO;
import nlu.com.app.dto.response.PageBookResponseDTO;
import nlu.com.app.dto.response.ShopDataInitDTO;
import org.springframework.data.domain.Page;

import java.util.List;

/**
 * @author VuLuu
 */
public interface IBookService {

  Page<PageBookResponseDTO> getBooksByCategory(BookSearchRequestDTO bookSearchRequestDTO);
  ShopDataInitDTO getShopInitData();

  /**
   * Get book details by book ID.
   *
   * @param bookId the ID of the book
   * @return BookDetailsDTO containing detailed information of the book
   */
  BookDetailsDTO getBookDetails(Long bookId);

  /**
   * Get book details for top weekly books
   * @return List of BookDetailsDTO containing detailed information of the book
   */
  ListBookDetailsDTO getBookDetailsOfTopWeekly();
}
