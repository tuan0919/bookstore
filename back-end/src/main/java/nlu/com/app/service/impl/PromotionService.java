package nlu.com.app.service.impl;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import nlu.com.app.dto.request.CreatePromotionRequest;
import nlu.com.app.dto.response.PromotionResponseDTO;
import nlu.com.app.entity.Category;
import nlu.com.app.entity.Promotion;
import nlu.com.app.entity.PromotionCategories;
import nlu.com.app.exception.ApplicationException;
import nlu.com.app.exception.ErrorCode;
import nlu.com.app.mapper.PromotionMapper;
import nlu.com.app.repository.CategoryRepository;
import nlu.com.app.repository.PromotionCategoriesRepository;
import nlu.com.app.repository.PromotionRepository;
import nlu.com.app.service.IPromotionService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class PromotionService implements IPromotionService {
    private final PromotionRepository promotionRepository;
    private final CategoryRepository categoryRepository;
    private final PromotionCategoriesRepository promotionCategoriesRepository;
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

    public Page<PromotionResponseDTO> getActivePromotions(Pageable pageable) {
        var promotions = promotionRepository.findActivePromotions(pageable, LocalDate.now());
        return promotions.map(p -> promotionMapper.mapToResponseDTO(p, categoryRepository));
    }

    @Override
    public List<PromotionResponseDTO> getPromotionsAppliedForCategory(Long categoryId) {
        Set<Long> allCategoryIds = collectAllParentCategoryIds(categoryId);

        // Lấy tất cả promotion liên quan tới những category này
        List<PromotionCategories> promotionCategories =
                promotionCategoriesRepository.findByCategory_CategoryIdIn(allCategoryIds);

        // Lọc promotion còn hiệu lực
        LocalDate today = LocalDate.now();
        return promotionCategories.stream()
                .map(PromotionCategories::getPromotion)
                .filter(p -> !p.getStartDate().isAfter(today) && !p.getEndDate().isBefore(today))
                .distinct()
                .map(p -> promotionMapper.mapToResponseDTO(p, categoryRepository))
                .toList();
    }

    private Set<Long> collectAllParentCategoryIds(Long categoryId) {
        Set<Long> ids = new HashSet<>();
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ApplicationException(ErrorCode.CATEGORY_NOT_FOUND));

        while (category != null) {
            ids.add(category.getCategoryId());
            category = category.getParentCategory();
        }

        return ids;
    }
}
