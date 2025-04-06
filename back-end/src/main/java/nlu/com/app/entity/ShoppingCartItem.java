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
@Table(name = "shopping_cart_items")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShoppingCartItem {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "shopping_cart_item_id")
  private Long shoppingCartItemId;
  @Column(name = "qty")
  private int qty;

  @ManyToOne
  @JoinColumn(name = "cart_id")
  private ShoppingCart shoppingCart;

  @ManyToOne
  @JoinColumn(name = "book_id")
  private Book book;
}
