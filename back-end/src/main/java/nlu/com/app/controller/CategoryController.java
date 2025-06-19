package nlu.com.app.controller;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import nlu.com.app.dto.AppResponse;
import nlu.com.app.dto.request.BookDetailsDTO;
import nlu.com.app.dto.request.BookSearchRequestDTO;
import nlu.com.app.dto.response.*;
import nlu.com.app.service.impl.BookService;
import nlu.com.app.service.impl.CategoryService;
import nlu.com.app.service.impl.PromotionService;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author VuLuu
 */
@RequestMapping("/api/category")
@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CategoryController {
  CategoryService categoryService;
  PromotionService promotionService;

  @GetMapping("/chain")
  public AppResponse<CategoryChainDTO> getCategoryChain(@RequestParam Long bookId) {
    return AppResponse.<CategoryChainDTO>builder()
            .result(categoryService.getBookCategoryTree(bookId))
            .build();
  }

  @GetMapping("/{categoryId}/promotions")
  public AppResponse<List<PromotionResponseDTO>> getPromotionsForCategory(@PathVariable Long categoryId) {
    return AppResponse.<List<PromotionResponseDTO>>builder()
            .result(promotionService.getPromotionsAppliedForCategory(categoryId))
            .build();
  }

}
