package nlu.com.app.dto.request;

import java.util.List;
import lombok.Data;

/**
 * @author VuLuu
 */
@Data
public class AddBooksToCollectionRequestDTO {

  private List<Long> bookIds;
}
