package nlu.com.app.dto.response;

import lombok.Data;
import nlu.com.app.dto.request.AddressDto;

import java.time.LocalDate;
import java.util.List;

/**
 * @author Nguyen Tuan
 */
@Data
public class OrderDetailsResponseDTO {

  private Long orderId;
  private LocalDate orderDate;
  private Double totalAmount;
  private String paymentMethodName;
  private String statusCode;
  private List<OrderItemDTO> items;
  String status;
  private AddressDto shippingAddress;
  private CustomerDTO customer;

  @Data
  public static class CustomerDTO {
    private String user_id;
    private String username;
    private String email;
  }

  @Data
  public static class OrderItemDTO {
    private String img;
    private String bookTitle;
    private Double price;
    private Integer quantity;
    private Double discount;
  }
}

