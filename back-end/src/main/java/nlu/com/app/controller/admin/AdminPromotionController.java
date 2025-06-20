package nlu.com.app.controller.admin;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import nlu.com.app.dto.AppResponse;
import nlu.com.app.dto.request.CreatePromotionRequest;
import nlu.com.app.dto.response.PromotionResponseDTO;
import nlu.com.app.service.impl.PromotionService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

/**
 * @author Nguyen Tuan
 */
@RequestMapping("/admin/api/promotion")
@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AdminPromotionController {
    PromotionService promotionService;

    @PostMapping("/create")
    public AppResponse<PromotionResponseDTO> createNewPromotion(@RequestBody CreatePromotionRequest request) {
        return AppResponse.<PromotionResponseDTO>builder()
                .result(promotionService.create(request))
                .build();
    }

    @GetMapping({"", "/"})
    public AppResponse<Page<PromotionResponseDTO>> getAllByPage(@RequestParam int page, @RequestParam int size) {
        return AppResponse.<Page<PromotionResponseDTO>>builder()
                .result(promotionService.findAllByPage(PageRequest.of(page, size)))
                .build();
    }
}
