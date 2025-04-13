package nlu.com.app.controller;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import nlu.com.app.dto.AppResponse;
import nlu.com.app.dto.request.BookSearchRequestDTO;
import nlu.com.app.dto.response.PageBookResponseDTO;
import nlu.com.app.dto.response.ShopDataInitDTO;
import nlu.com.app.service.impl.BookService;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author VuLuu
 */
@RequestMapping("/api/book")
@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BookController {

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
}
