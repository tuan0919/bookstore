package nlu.com.app.dto.response;

import lombok.Data;

import java.util.List;

@Data
public class CreateBookResponse {
    private Long bookId;
    private String age;
    private String author;
    private String format;
    private String language;
    private int page_count;
    private double price;
    private int product_code;
    private String publisher;
    private int qty_in_stock;
    private int publish_year;
    private String size;
    private String supplier;
    private String title;
    private String translator;
    private double weight;
    private long category_id;
    private long genre_id;
    private String thumbnail;
    private String description;
    private List<String> gallery;
}
