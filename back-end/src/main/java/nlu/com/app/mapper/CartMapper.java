package nlu.com.app.mapper;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import nlu.com.app.dto.cart.Cart;
import nlu.com.app.dto.cart.CartItem;
import nlu.com.app.dto.response.CartItemResponseDTO;
import nlu.com.app.dto.response.CartResponseDTO;
import nlu.com.app.entity.Book;
import nlu.com.app.repository.BookRepository;
import org.mapstruct.Builder;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.Named;

/**
 * @author VuLuu
 */
@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
    builder = @Builder(disableBuilder = true))
public interface CartMapper {

  @Mapping(target = "items", source = "items", qualifiedByName = "mapCartItems")
  CartResponseDTO toCartResponseDTO(Cart cart,
      @Context BookRepository bookRepository,
      @Context Map<Long, Double> discountMap);

  @Named("mapCartItems")
  default List<CartItemResponseDTO> mapCartItems(List<CartItem> items,
      @Context BookRepository bookRepository,
      @Context Map<Long, Double> discountMap) {
    if (items == null) {
      return new ArrayList<>();
    }
    return items.stream()
        .map(item -> toCartItemResponseDTO(item, bookRepository, discountMap))
        .collect(Collectors.toList());
  }

  @Mapping(target = "productId", expression = "java(parseProductId(cartItem.getProductId()))")
  @Mapping(target = "title", source = "cartItem", qualifiedByName = "mapTitle")
  @Mapping(target = "price", source = "cartItem", qualifiedByName = "mapPrice")
  @Mapping(target = "discountedPrice", source = "cartItem", qualifiedByName = "mapDiscountedPrice")
  @Mapping(target = "discountPercentage", source = "cartItem", qualifiedByName = "mapDiscountPercentage")
  @Mapping(target = "imageUrl", source = "cartItem", qualifiedByName = "mapImageUrl")
  CartItemResponseDTO toCartItemResponseDTO(CartItem cartItem,
      @Context BookRepository bookRepository,
      @Context Map<Long, Double> discountMap);

  default Long parseProductId(String productId) {
    try {
      return Long.parseLong(productId);
    } catch (NumberFormatException e) {
      return null;
    }
  }

  @Named("mapTitle")
  default String mapTitle(CartItem cartItem, @Context BookRepository bookRepository) {
    return getBook(cartItem, bookRepository).map(Book::getTitle).orElse("");
  }

  @Named("mapPrice")
  default double mapPrice(CartItem cartItem, @Context BookRepository bookRepository) {
    return getBook(cartItem, bookRepository).map(book -> book.getPrice() * 1000).orElse(0.0);
  }

  @Named("mapDiscountedPrice")
  default double mapDiscountedPrice(CartItem cartItem,
      @Context BookRepository bookRepository,
      @Context Map<Long, Double> discountMap) {
    Long productId = parseProductId(cartItem.getProductId());
    if (productId == null) {
      return 0.0;
    }

    double discountPercentage = discountMap.getOrDefault(productId, 0.0);

    return getBook(cartItem, bookRepository)
        .map(book -> book.getPrice() * (1 - discountPercentage / 100.0) * 1000)
        .orElse(0.0);
  }

  @Named("mapDiscountPercentage")
  default double mapDiscountPercentage(CartItem cartItem,
      @Context BookRepository bookRepository,
      @Context Map<Long, Double> discountMap) {
    Long productId = parseProductId(cartItem.getProductId());
    if (productId == null) {
      return 0.0;
    }

    return discountMap.getOrDefault(productId, 0.0);
  }

  @Named("mapImageUrl")
  default String mapImageUrl(CartItem cartItem, @Context BookRepository bookRepository) {
    return getBook(cartItem, bookRepository)
        .flatMap(book -> book.getImages().stream()
            .filter(img -> img.isThumbnail() && img.getImageUrl() != null)
            .map(img -> img.getImageUrl())
            .findFirst())
        .orElse("");
  }

  default Optional<Book> getBook(CartItem cartItem, BookRepository bookRepository) {
    Long productId = parseProductId(cartItem.getProductId());
    if (productId == null) {
      return Optional.empty();
    }
    return bookRepository.findById(productId);
  }
}


