package nlu.com.app.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author VuLuu
 */
@Entity
@Table(name = "books")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Book {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "book_id")
  private Long bookId;
  @Column(name = "title")
  private String title;
  @Column(name = "publisher")
  private String publisher;
  @Column(name = "publish_year")
  private String publishYear;
  @Column(name = "weight")
  private double weight;
  @Column(name = "product_code")
  private String productCode;
  @Column(name = "supplier")
  private String supplier;
  @Column(name = "author")
  private String author;
  @Column(name = "language")
  private String language;
  @Column(name = "page_count")
  private int pageCount;
  @Column(name = "translator")
  private String translator;
  @Column(name = "size")
  private String size;
  @Column(name = "format")
  private String format;
  @Column(name = "age")
  private String age;
  @Column(name = "description", columnDefinition = "TEXT")
  private String description;
  @Column(name = "qty_in_stock")
  private int qtyInStock;
  @Column(name = "price")
  private double price;

  @OneToMany(mappedBy = "book", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<BookImage> images = new ArrayList<>();

  @ManyToOne
  @JoinColumn(name = "category_id")
  private Category category;

  @ManyToOne
  @JoinColumn(name = "genre_id")
  private Genre genre;
}

