package nlu.com.app.service.impl;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import nlu.com.app.dto.request.CreatePromotionRequest;
import nlu.com.app.dto.response.PromotionResponseDTO;
import nlu.com.app.mapper.PromotionMapper;
import nlu.com.app.repository.CategoryRepository;
import nlu.com.app.repository.PromotionRepository;
import nlu.com.app.service.IPromotionService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PromotionService implements IPromotionService {
    private final PromotionRepository promotionRepository;
    private final CategoryRepository categoryRepository;
    private final PromotionMapper promotionMapper;

    @Override
    @Transactional
    public PromotionResponseDTO create(CreatePromotionRequest requestDTO) {
        var promotion = promotionMapper.mapToPromotion(requestDTO, promotionRepository, categoryRepository);
        promotion = promotionRepository.save(promotion);

        return promotionMapper.mapToResponseDTO(promotion, categoryRepository);
    }

    @Override
    public Page<PromotionResponseDTO> findAllByPage(Pageable pageable) {
        var promotions = promotionRepository.findAll(pageable);
        return promotions
                .map(p -> promotionMapper.mapToResponseDTO(p, categoryRepository));
    }
}
