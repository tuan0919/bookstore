package nlu.com.app.service;

import nlu.com.app.dto.request.BookDetailsDTO;
import nlu.com.app.dto.request.BookSearchRequestDTO;
import nlu.com.app.dto.request.PutObjectDTO;
import nlu.com.app.dto.response.PageBookResponseDTO;
import nlu.com.app.dto.response.ShopDataInitDTO;
import org.springframework.data.domain.Page;

/**
 * @author NguyenTuan
 */
public interface IFileService {
  /**
   * generate signed URL to grant access that let user uploading their file to s3 bucket.
   * @param dto user's request, contains file key
   * @return signed URL
   */
  String signPutObjectRequest(PutObjectDTO dto);

}
