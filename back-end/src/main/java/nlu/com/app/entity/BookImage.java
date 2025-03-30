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
@Table(name = "book_images")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookImage {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "book_image_id")
  private Long bookImageId;
  @Column(name = "image_url")
  private String imageUrl;
  @Column(name = "is_thumbnail")
  private boolean isThumbnail;

  @ManyToOne
  @JoinColumn(name = "book_id")
  private Book book;
}
