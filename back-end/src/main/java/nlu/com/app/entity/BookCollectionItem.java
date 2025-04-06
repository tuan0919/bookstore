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
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author VuLuu
 */
@Entity
@Table(name = "book_collection_items")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookCollectionItem {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "collection_book_id")
  private Long collectionBookId;

  @ManyToOne
  @JoinColumn(name = "collection_id", nullable = false)
  private BookCollection collection;

  @ManyToOne
  @JoinColumn(name = "book_id", nullable = false)
  private Book book;
}
