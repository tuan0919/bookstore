package nlu.com.app.dto.request;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author VuLuu
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookDetailsDTO {

  private Long bookId;
  private String title;
  private String publisher;
  private String publishYear;
  private double weight;
  private String productCode;
  private String supplier;
  private String author;
  private String language;
  private int pageCount;
  private String translator;
  private String size;
  private String format;
  private String age;
  private String description;
  private int qtyInStock;
  private double price;
  private double discountedPrice;
  private List<String> imageUrls;
  private List<ReviewDTO> reviews;

  @Data
  @NoArgsConstructor
  @AllArgsConstructor
  @Builder
  public static class ReviewDTO {

    private String userName;
    private double rating;
    private String reviewText;
    private String reviewDate;
  }
}
