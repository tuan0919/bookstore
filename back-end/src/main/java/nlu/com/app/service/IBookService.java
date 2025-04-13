package nlu.com.app.service;

import nlu.com.app.dto.request.BookSearchRequestDTO;
import nlu.com.app.dto.response.PageBookResponseDTO;
import nlu.com.app.dto.response.ShopDataInitDTO;
import org.springframework.data.domain.Page;

/**
 * @author VuLuu
 */
public interface IBookService {

  Page<PageBookResponseDTO> getBooksByCategory(BookSearchRequestDTO bookSearchRequestDTO);
  ShopDataInitDTO getShopInitData();
}
