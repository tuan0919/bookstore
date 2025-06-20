package nlu.com.app.service;

import nlu.com.app.dto.request.BookDetailsDTO;
import nlu.com.app.dto.request.BookSearchRequestDTO;
import nlu.com.app.dto.request.CreateBookRequest;
import nlu.com.app.dto.request.UpdateBookRequest;
import nlu.com.app.dto.response.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * @author VuLuu
 */
public interface IBookService {

  Page<PageBookResponseDTO> getBooksByCategory(BookSearchRequestDTO bookSearchRequestDTO);
  Page<PageBookResponseDTO> searchBook(BookSearchRequestDTO bookSearchRequestDTO);
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

  /**
   * create new book
   * @param metadata metadata for this book
   * @param thumbnail thumbnail for book
   * @param gallery gallery images for book
   * @return new book details
   */
  CreateBookResponse createBook(CreateBookRequest metadata,
                                MultipartFile thumbnail,
                                MultipartFile[] gallery);

  /**
   * update existing book
   * @param bookId book's id
   * @param metadata metadata for this book
   * @param newThumbnail new thumbnail for book
   * @param oldThumbnail old thumbnail link for this book
   * @param newGallery new gallery for book
   * @param oldGallery old gallery for book
   * @return book details
   */
  UpdateBookResponse updateBook(Long bookId, UpdateBookRequest metadata,
                                MultipartFile newThumbnail,
                                String oldThumbnail,
                                MultipartFile[] newGallery,
                                String[] oldGallery);

  UpdateBookResponse getBookInfoForUpdate(Long bookId);

  /**
   * get book's overview information to display on admin product dashboard
   * @param pageable paging object
   * @return current page
   */
  Page<BookOverviewDTO> getBookOverviews(Pageable pageable);
}
