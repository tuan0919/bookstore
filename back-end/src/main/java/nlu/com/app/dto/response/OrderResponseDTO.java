package nlu.com.app.dto.response;

import java.time.LocalDate;
import java.util.List;
import lombok.Data;

/**
 * @author VuLuu
 */
@Data
public class OrderResponseDTO {

  private Long orderId;
  private LocalDate orderDate;
  private Double totalAmount;
  private String paymentMethodName;
  private List<OrderItemDTO> items;
  String status;

  @Data
  public static class OrderItemDTO {

    private String bookTitle;
    private Double price;
    private Integer quantity;
    private Double discount;
  }
}

