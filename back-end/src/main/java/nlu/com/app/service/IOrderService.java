package nlu.com.app.service;

import java.util.List;

import nlu.com.app.dto.response.OrderDetailsResponseDTO;
import nlu.com.app.dto.response.OrderResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * @author VuLuu
 */
public interface IOrderService {

  OrderResponseDTO createOrderFromCart(List<Long> selectedProductIds, Long paymentMethodId);

  Page<OrderResponseDTO> getOrdersWithPagination(Pageable pageable);
  Page<OrderResponseDTO> getOrdersWithPagination_ForAdmin(Pageable pageable);
  OrderDetailsResponseDTO getOrderById(Long id);
  void cancelOrder(Long orderId);
}
