package nlu.com.app.service;

import nlu.com.app.dto.request.CreateBookCollectionRequestDTO;
import nlu.com.app.dto.response.BookCollectionResponse;
import org.springframework.data.domain.Page;

/**
 * @author VuLuu
 */
public interface BookCollectionService {

  BookCollectionResponse createCollection(CreateBookCollectionRequestDTO request);

  Page<BookCollectionResponse> getCollectionsByUser(int page, int size);
}
