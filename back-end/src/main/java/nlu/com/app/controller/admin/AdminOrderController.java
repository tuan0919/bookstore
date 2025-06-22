package nlu.com.app.controller.admin;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import nlu.com.app.dto.AppResponse;
import nlu.com.app.dto.filter.OrderFilter;
import nlu.com.app.dto.response.OrderDetailsResponseDTO;
import nlu.com.app.dto.response.OrderResponseDTO;
import nlu.com.app.service.IOrderService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

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

    @GetMapping({"/search"})
    public AppResponse<Page<OrderDetailsResponseDTO>> getOrders(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String username,
            @RequestParam(required = false) Long userId,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            @RequestParam(required = false) Long minAmount,
            @RequestParam(required = false) Long maxAmount) {

        Pageable pageable = PageRequest.of(page, size);
        OrderFilter filter = OrderFilter.builder()
                .status(status)
                .username(username)
                .startDate(startDate)
                .endDate(endDate)
                .minAmount(minAmount)
                .maxAmount(maxAmount)
                .userId(userId)
                .build();

        return AppResponse.<Page<OrderDetailsResponseDTO>>builder()
                .result(orderService.getFilteredOrders(pageable, filter))
                .build();
    }

    @GetMapping("/{id}")
    public AppResponse<OrderDetailsResponseDTO> getOrderById(@PathVariable long id) {
        return AppResponse.<OrderDetailsResponseDTO>builder()
                .result(orderService.getOrderById(id))
                .build();
    }
}
