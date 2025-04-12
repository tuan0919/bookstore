package nlu.com.app.dto.response;

import java.util.List;
import lombok.Builder;
import lombok.Data;

/**
 * @author VuLuu
 */
@Data
@Builder
public class CategoryResponseDTO {

  private Long id;
  private String name;
  private List<CategoryResponseDTO> children;
}
