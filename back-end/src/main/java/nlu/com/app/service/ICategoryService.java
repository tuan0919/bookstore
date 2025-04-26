package nlu.com.app.service;

import java.util.List;
import nlu.com.app.dto.response.CategoryResponseDTO;

/**
 * @author VuLuu
 */
public interface ICategoryService {

  List<CategoryResponseDTO> getAllCategories();
}
