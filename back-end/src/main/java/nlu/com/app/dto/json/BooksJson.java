package nlu.com.app.dto.json;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

/**
 * @author VuLuu
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BooksJson {

  @JsonProperty("title")
  String title;
  @JsonProperty("publisher")
  String publisher;
  @JsonProperty("publishYear")
  String publishYear;
  @JsonProperty("weight")
  String weight;
  @JsonProperty("productCode")
  String productCode;
  @JsonProperty("supplier")
  String supplier;
  @JsonProperty("author")
  String author;
  @JsonProperty("language")
  String language;
  @JsonProperty("pageCount")
  String pageCount;
  @JsonProperty("translator")
  String translator;
  @JsonProperty("size")
  String size;
  @JsonProperty("countdown")
  String countdown;
  @JsonProperty("format")
  String format;
  @JsonProperty("age")
  String age;
  @JsonProperty("description")
  String description;
  @JsonProperty("qtyInStock")
  String qtyInStock;
  @JsonProperty("price")
  String price;
  @JsonProperty("images")
  String[] images;
  @JsonProperty("category")
  String category;
  @JsonProperty("genres")
  String genre;
}
