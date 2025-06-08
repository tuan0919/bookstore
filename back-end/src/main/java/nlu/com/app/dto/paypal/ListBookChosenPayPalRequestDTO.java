package nlu.com.app.dto.paypal;

import lombok.Getter;

@Getter
public class ListBookChosenPayPalRequestDTO {
    private Long productId;
    private String title;
    private Integer quantity;
    private Integer price;
    private Integer discountedPrice;
    private String imageUrl;
    private Integer discountPercentage;

}
