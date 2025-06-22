package nlu.com.app.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TopSellingProductDTO {
    private int totalElements;
    private List<Element> elements;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Element {
        private int top;
        private String showName;
        private ProductInfo product;

        @Data
        @AllArgsConstructor
        @NoArgsConstructor
        @Builder
        public static class ProductInfo {
            private Long productId;
            private String productName;
            private String thumbnail;
            private String lastSellDate;
            private Long lastOrderId;
            private Integer quantity;
        }
    }
}
