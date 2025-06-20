package nlu.com.app.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import nlu.com.app.dto.AppResponse;
import nlu.com.app.dto.request.BookDetailsDTO;
import nlu.com.app.dto.request.BookSearchRequestDTO;
import nlu.com.app.dto.request.CreateBookRequest;
import nlu.com.app.dto.request.UpdateBookRequest;
import nlu.com.app.dto.response.*;
import nlu.com.app.service.impl.BookService;
import nlu.com.app.service.impl.UserReviewService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;

/**
 * @author VuLuu
 */
@RequestMapping("/api/book")
@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BookController {
  UserReviewService userReviewService;
  BookService bookService;

  @GetMapping("")
  public AppResponse<ShopDataInitDTO> getShopInitData() {
    return AppResponse.<ShopDataInitDTO>builder().result(bookService.getShopInitData()).build();
  }

  @GetMapping("/category")
  public AppResponse<Page<PageBookResponseDTO>> getBooksByCategory(
      BookSearchRequestDTO bookSearchRequestDTO) {
    return AppResponse.<Page<PageBookResponseDTO>>builder()
        .result(bookService.getBooksByCategory(bookSearchRequestDTO)).build();
  }

  @GetMapping("/search")
  public AppResponse<Page<PageBookResponseDTO>> searchBook(
          BookSearchRequestDTO bookSearchRequestDTO) {
    return AppResponse.<Page<PageBookResponseDTO>>builder()
            .result(bookService.searchBook(bookSearchRequestDTO)).build();
  }

  @GetMapping("/{bookId}/reviews")
  public AppResponse<Page<CreateReviewResponse>> getBookReviews(
          @PathVariable long bookId,
          @RequestParam int page,
          @RequestParam int size) {
    var pageable = PageRequest.of(page, size);
    return AppResponse.<Page<CreateReviewResponse>>builder()
            .result(userReviewService.getReviewsOfBook(bookId, pageable))
            .build();
  }

  @GetMapping("/{id}")
  public AppResponse<BookDetailsDTO> getBookDetail(@PathVariable Long id) {
    return AppResponse.<BookDetailsDTO>builder().result(bookService.getBookDetails(id)).build();
  }

  @GetMapping("/top-weekly")
  public AppResponse<ListBookDetailsDTO> getTopBookDetails() {
    return AppResponse.<ListBookDetailsDTO>builder()
            .result(bookService.getBookDetailsOfTopWeekly())
            .build();
  }

  @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public AppResponse<CreateBookResponse> uploadProduct(
          @ModelAttribute CreateBookRequest metadata,
          @RequestPart("thumbnail") MultipartFile thumbnail,
          @RequestPart("gallery") MultipartFile[] gallery
  ) {
    return AppResponse.<CreateBookResponse>builder()
            .result(bookService.createBook(metadata, thumbnail, gallery))
            .build();
  }

  @GetMapping("/overview")
  public AppResponse<Page<BookOverviewDTO>> getBookOverview(@RequestParam int page, @RequestParam int size) {
    var pageable = PageRequest.of(page, size);
    return AppResponse.<Page<BookOverviewDTO>>builder()
            .result(bookService.getBookOverviews(pageable))
            .build();
  }

  @GetMapping("/{bookId}/review-overall")
  public AppResponse<ReviewOverallDTO> getReviewOverall(@PathVariable Long bookId) {
    return AppResponse.<ReviewOverallDTO>builder()
            .result(userReviewService.getReviewOverall(bookId))
            .build();
  }

  @PostMapping(value = "/{bookId}/update", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public AppResponse<UpdateBookResponse> updateProduct(
          @PathVariable("bookId") Long bookId,
          @ModelAttribute UpdateBookRequest metadata,
          @RequestParam(value = "old_thumbnail", required = false) String oldThumbnail,
          @RequestParam(value = "new_thumbnail", required = false) MultipartFile newThumbnail,
          @RequestParam(value = "old_gallery", required = false) String[] oldGallery,
          @RequestParam(value = "new_gallery", required = false) MultipartFile[] newGallery
  ) {
    return AppResponse.<UpdateBookResponse>builder()
            .result(bookService.updateBook(bookId, metadata, newThumbnail, oldThumbnail, newGallery, oldGallery))
            .build();
  }
}
