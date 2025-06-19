package nlu.com.app.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import nlu.com.app.constant.ReviewType;

/**
 * @author VuLuu
 */
@Entity
@Table(name = "user_reviews")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserReview {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long reviewId;

  @ManyToOne
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  @Column(name = "review_type")
  @Enumerated(EnumType.STRING)
  private ReviewType reviewType;

  @ManyToOne
  @JoinColumn(name = "book_id", nullable = true)
  private Book book; // NULL if review collection

  @ManyToOne
  @JoinColumn(name = "collection_id", nullable = true)
  private BookCollection collection; // NULL if review book

  @Column(name = "rating")
  private double rating;

  @Column(name = "review_text", columnDefinition = "TEXT")
  private String reviewText;

  @Column(name = "review_date")
  private LocalDate reviewDate;
}

