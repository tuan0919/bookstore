package nlu.com.app.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Created by: VuLuu
 */
@Entity
@Table(name = "books")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Book {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "book_id")
  private Long bookId;
  @Column(name = "publisher")
  private String publisher;
  @Column(name = "title")
  private String title;
  @Column(name = "publish_year")
  private int publishYear;
  @Column(name = "weight")
  private double weight;
  @Column(name = "dimensions")
  private String dimensions;
  @Column(name = "page_count")
  private int page_count;
  @Column(name = "format")
  private String format;
  @Column(name = "description", columnDefinition = "TEXT")
  private String description;
  @Column(name = "qty_in_stock")
  private int qtyInStock;
  @Column(name = "price")
  private double price;

  @ManyToOne
  @JoinColumn(name = "category_id")
  private Category category;
}

