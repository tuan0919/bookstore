package nlu.com.app.service;

import nlu.com.app.dto.request.CreatePromotionRequest;
import nlu.com.app.dto.response.PromotionResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * @author Nguyen Tuan
 */
public interface IPromotionService {
    PromotionResponseDTO create(CreatePromotionRequest requestDTO);
    Page<PromotionResponseDTO> findAllByPage(Pageable pageable);
}
