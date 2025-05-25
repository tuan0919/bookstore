package nlu.com.app.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import nlu.com.app.dto.request.BookDetailsDTO;

import java.util.List;

/**
 * @author AnhTuan
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ListBookDetailsDTO {
  private List<BookDetailsDTO> books;
}
