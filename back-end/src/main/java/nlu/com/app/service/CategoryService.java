package nlu.com.app.service;

import java.util.List;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import nlu.com.app.constant.ECategory;
import nlu.com.app.entity.Category;
import nlu.com.app.repository.CategoryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author VuLuu
 */
@Service
@RequiredArgsConstructor
@Transactional
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CategoryService {

  CategoryRepository categoryRepository;

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
    categoryRepository.saveAll(List.of(
        allCategory,
        vnBook, fBook,
        lightNovelVN, mangaVN,
        lightNovelF, mangaF, artF
    ));
  }

  private Category createCategory(ECategory name, Category parent) {
    return Category.builder()
        .categoryName(name)
        .parentCategory(parent)
        .build();
  }

}
