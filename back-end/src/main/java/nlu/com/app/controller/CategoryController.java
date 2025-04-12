package nlu.com.app.controller;

import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import nlu.com.app.dto.response.CategoryResponseDTO;
import nlu.com.app.service.impl.CategoryService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author VuLuu
 */
@RestController
@RequestMapping("/api/category")
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public class CategoryController {

  CategoryService categoryService;

  @GetMapping()
  public List<CategoryResponseDTO> getCategoryTree() {
    return categoryService.getAllCategories();
  }
}
