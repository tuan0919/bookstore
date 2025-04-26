package nlu.com.app.dto.response;

import java.util.List;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

/**
 * @author VuLuu
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PUBLIC)
public class ShopDataInitDTO {

  CategoryResponseDTO categoryResponseDTOs;
  List<GenreResponseDTO> genreResponseDTOs;

}
