package nlu.com.app.service;

import java.util.List;

import nlu.com.app.dto.filter.OrderFilter;
import nlu.com.app.dto.request.UpdateOrderStatus;
import nlu.com.app.dto.response.OrderDetailsResponseDTO;
import nlu.com.app.dto.response.OrderResponseDTO;
import nlu.com.app.dto.response.TimelineOrderResponseDTO;
import nlu.com.app.dto.response.TopSellingProductDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * @author VuLuu
 */
public interface IOrderService {

  OrderResponseDTO createOrderFromCart(List<Long> selectedProductIds, Long paymentMethodId);

  Page<OrderResponseDTO> getOrdersWithPagination(Pageable pageable);
  Page<OrderDetailsResponseDTO> getOrdersWithPagination_ForAdmin(Pageable pageable);
  OrderDetailsResponseDTO getOrderById(Long id);
  void cancelOrder(Long orderId);
  String updateOrderStatus(Long orderId, UpdateOrderStatus request);
  TimelineOrderResponseDTO getTimelineOrder(Long orderId);
  Page<OrderDetailsResponseDTO> getFilteredOrders(Pageable pageable, OrderFilter filter);
}
