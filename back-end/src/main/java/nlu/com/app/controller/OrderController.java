package nlu.com.app.controller;

import java.util.List;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import nlu.com.app.dto.AppResponse;
import nlu.com.app.dto.request.CreateOrderRequest;
import nlu.com.app.dto.response.OrderResponseDTO;
import nlu.com.app.dto.response.PaymentMethodDTO;
import nlu.com.app.service.IOrderService;
import nlu.com.app.service.IPaymentMethodService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
}
