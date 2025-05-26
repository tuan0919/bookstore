package nlu.com.app.controller;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import nlu.com.app.dto.AppResponse;
import nlu.com.app.dto.request.BookDetailsDTO;
import nlu.com.app.dto.request.BookSearchRequestDTO;
import nlu.com.app.dto.response.CategoryChainDTO;
import nlu.com.app.dto.response.ListBookDetailsDTO;
import nlu.com.app.dto.response.PageBookResponseDTO;
import nlu.com.app.dto.response.ShopDataInitDTO;
import nlu.com.app.service.impl.BookService;
import nlu.com.app.service.impl.CategoryService;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

/**
 * @author VuLuu
 */
@RequestMapping("/api/category")
@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CategoryController {
  CategoryService categoryService;

  @GetMapping("/chain")
  public AppResponse<CategoryChainDTO> getCategoryChain(@RequestParam Long bookId) {
    return AppResponse.<CategoryChainDTO>builder()
            .result(categoryService.getBookCategoryTree(bookId))
            .build();
  }

}
