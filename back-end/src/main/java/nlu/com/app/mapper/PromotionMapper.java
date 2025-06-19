package nlu.com.app.mapper;

import nlu.com.app.dto.request.AddressDto;
import nlu.com.app.dto.request.CreatePromotionRequest;
import nlu.com.app.dto.response.PromotionResponseDTO;
import nlu.com.app.entity.Address;
import nlu.com.app.entity.Category;
import nlu.com.app.entity.Promotion;
import nlu.com.app.entity.PromotionCategories;
import nlu.com.app.exception.ApplicationException;
import nlu.com.app.exception.ErrorCode;
import nlu.com.app.repository.CategoryRepository;
import nlu.com.app.repository.PromotionRepository;
import org.mapstruct.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

/**
 * @author Nguyen Tuan
 */

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        builder = @Builder(disableBuilder = true))
public interface PromotionMapper {

  @Mapping(target = "startDate", source = "request.startDate", qualifiedByName = "fromStringToDate")
  @Mapping(target = "endDate", source = "request.endDate", qualifiedByName = "fromStringToDate")
  @Mapping(target = "promotionCategories", ignore = true)
  Promotion mapToPromotion(CreatePromotionRequest request,
                                           @Context PromotionRepository promotionRepository,
                                           @Context CategoryRepository categoryRepository);

  @AfterMapping
  default void afterMapping(@MappingTarget Promotion promotion,
                              CreatePromotionRequest request,
                              @Context CategoryRepository categoryRepository) {
    List<PromotionCategories> promotionCategories = new ArrayList<>();
    for (Long id : request.getCategoryIds()) {
      Category category = categoryRepository.findById(id)
              .orElseThrow(() -> new ApplicationException(ErrorCode.CATEGORY_NOT_FOUND));
      promotionCategories.add(PromotionCategories.builder()
              .category(category)
              .promotion(promotion)
              .build());
    }
    promotion.setPromotionCategories(promotionCategories);
  }

  @Named("fromStringToDate")
  default LocalDate fromStringToDate(String date) {
    return LocalDate.parse(date);
  }

  @Mapping(target = "startDate", source = "promotion.startDate", qualifiedByName = "fromDateToString")
  @Mapping(target = "endDate", source = "promotion.endDate", qualifiedByName = "fromDateToString")
  @Mapping(target = "categories", source = "promotion.promotionCategories", qualifiedByName = "fromEntityToResponseDTO")
  @Mapping(target = "promotionName", source = "promotion.promotionName")
  @Mapping(target = "status", source = "promotion", qualifiedByName = "getPromotionStatus")
  PromotionResponseDTO mapToResponseDTO(Promotion promotion, @Context CategoryRepository categoryRepository);

  @Named("fromDateToString")
  default String fromDateToString(LocalDate date) {
    return date.format(DateTimeFormatter.ofPattern("dd-MM-yyyy"));
  }

  @Named("fromEntityToResponseDTO")
  default PromotionResponseDTO.Category fromEntityToResponseDTO(PromotionCategories proCategory) {
    return PromotionResponseDTO.Category.builder()
            .categoryId(proCategory.getCategory().getCategoryId())
            .categoryName(proCategory.getCategory().getCategoryName().toString())
            .build();
  }

  @Named("getPromotionStatus")
  default String getPromotionStatus(Promotion promotion) {
    var sDate = promotion.getStartDate();
    var eDate = promotion.getEndDate();
    var now = LocalDate.now();
    if (now.isBefore(sDate)) {
      return "Chưa bắt đầu";
    }
    else if (now.isAfter(eDate)) {
      return "Kết thúc";
    }
    else {
      return "Đang áp dụng";
    }
  }
}


