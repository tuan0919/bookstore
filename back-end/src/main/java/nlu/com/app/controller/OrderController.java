package nlu.com.app.controller;

import java.util.List;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import nlu.com.app.dto.AppResponse;
import nlu.com.app.dto.request.CreateOrderRequest;
import nlu.com.app.dto.request.UpdateOrderStatus;
import nlu.com.app.dto.response.OrderResponseDTO;
import nlu.com.app.dto.response.PaymentMethodDTO;
import nlu.com.app.dto.response.TimelineOrderResponseDTO;
import nlu.com.app.service.IOrderService;
import nlu.com.app.service.IPaymentMethodService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

/**
 * @author VuLuu
 */
@RequestMapping("/api/orders")
@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class OrderController {

  private final IOrderService orderService;
  private final IPaymentMethodService paymentMethodService;

  @PostMapping
  public AppResponse<OrderResponseDTO> createOrder(@RequestBody CreateOrderRequest request) {
    return AppResponse.<OrderResponseDTO>builder().result(
        orderService.createOrderFromCart(request.getSelectedProductIds(),
            request.getPaymentMethodId())).build();
  }

  @GetMapping()
  public Page<OrderResponseDTO> getOrders(
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int size) {

    Pageable pageable = PageRequest.of(page, size);
    return orderService.getOrdersWithPagination(pageable);
  }

  @GetMapping("/init")
  public AppResponse<List<PaymentMethodDTO>> getAllPaymentMethods() {
    return AppResponse.<List<PaymentMethodDTO>>builder()
        .result(paymentMethodService.getAllPaymentMethods()).build();
  }

  @DeleteMapping("/{orderId}/cancel")
  public AppResponse<String> cancelOrder(@PathVariable Long orderId) {
    orderService.cancelOrder(orderId);
    return AppResponse.<String>builder().result("Order cancelled successfully").build();
  }

  @PutMapping("/{orderId}/status")
  public AppResponse<String> updateStatus(@PathVariable Long orderId, @RequestBody UpdateOrderStatus request) {
    return AppResponse.<String>builder().result(orderService.updateOrderStatus(orderId, request)).build();
  }

  @GetMapping("/{orderId}/timeline")
  public AppResponse<TimelineOrderResponseDTO> getTimelineOrders(@PathVariable Long orderId) {
    return AppResponse.<TimelineOrderResponseDTO>builder()
            .result(orderService.getTimelineOrder(orderId))
            .build();
  }
}
