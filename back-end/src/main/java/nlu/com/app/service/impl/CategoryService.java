package nlu.com.app.service.impl;

import java.util.List;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import nlu.com.app.constant.ECategory;
import nlu.com.app.dto.response.CategoryResponseDTO;
import nlu.com.app.entity.Category;
import nlu.com.app.mapper.CategoryMapper;
import nlu.com.app.repository.CategoryRepository;
import nlu.com.app.service.ICategoryService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author VuLuu
 */
@Service
@RequiredArgsConstructor
@Transactional
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CategoryService implements ICategoryService {

  CategoryRepository categoryRepository;
  CategoryMapper categoryMapper;

  public void initData() {
    // Root
    var allCategory = createCategory(ECategory.ALL_CATEGORY, null);

    // Level 1
    var vnBook = createCategory(ECategory.VN_BOOK, allCategory);
    var fBook = createCategory(ECategory.F_BOOK, allCategory);

    // Level 2 (shared subcategories)
    var lightNovelVN = createCategory(ECategory.LIGHT_NOVEL, vnBook);
    var mangaVN = createCategory(ECategory.MANGA, vnBook);

    var lightNovelF = createCategory(ECategory.LIGHT_NOVEL, fBook);
    var mangaF = createCategory(ECategory.MANGA, fBook);
    var artF = createCategory(ECategory.ART_ANIME_CHAR, fBook);

    // Save all at once
    categoryRepository.saveAll(
        List.of(allCategory, vnBook, fBook, lightNovelVN, mangaVN, lightNovelF, mangaF, artF));
  }

  private Category createCategory(ECategory name, Category parent) {
    return Category.builder().categoryName(name).parentCategory(parent).build();
  }

  @Override
  public List<CategoryResponseDTO> getAllCategories() {
    List<Category> rootCategories = categoryRepository.findByParentCategoryIsNull();
    return categoryMapper.toCategoryResponseDTOList(rootCategories, categoryRepository);
  }
}
