package nlu.com.app.dto.request;

import lombok.Data;

@Data
public class UpdateBookRequest {
    private String age;
    private String author;
    private String format;
    private String language;
    private int page_count;
    private double price;
    private String product_code;
    private String publisher;
    private int publish_year;
    private int qty_in_stock;
    private String size;
    private String description;
    private String supplier;
    private String title;
    private String translator;
    private double weight;
    private long category_id;
    private long genre_id;
}
