package nlu.com.app.controller.admin;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import nlu.com.app.dto.AppResponse;
import nlu.com.app.dto.response.OrderDetailsResponseDTO;
import nlu.com.app.dto.response.OrderResponseDTO;
import nlu.com.app.service.IOrderService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

/**
 * @author Nguyen Tuan
 */
@RequestMapping("/admin/api/order")
@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AdminOrderController {
    private final IOrderService orderService;

    @GetMapping({"", "/"})
    public AppResponse<Page<OrderDetailsResponseDTO>> getOrders(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return AppResponse.<Page<OrderDetailsResponseDTO>>builder()
                .result(orderService.getOrdersWithPagination_ForAdmin(pageable))
                .build();
    }

    @GetMapping("/{id}")
    public AppResponse<OrderDetailsResponseDTO> getOrderById(@PathVariable long id) {
        return AppResponse.<OrderDetailsResponseDTO>builder()
                .result(orderService.getOrderById(id))
                .build();
    }
}
