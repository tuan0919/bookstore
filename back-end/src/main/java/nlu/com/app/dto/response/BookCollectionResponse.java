package nlu.com.app.dto.response;

import lombok.Builder;
import lombok.Data;

/**
 * @author VuLuu
 */
@Data
@Builder
public class BookCollectionResponse {
  private Long id;
  private String name;
  private String description;
  private String coverImage;
}
