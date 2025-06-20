package nlu.com.app.controller;

import lombok.RequiredArgsConstructor;
import nlu.com.app.dto.request.CreateBookCollectionRequestDTO;
import nlu.com.app.dto.response.BookCollectionResponse;
import nlu.com.app.service.BookCollectionService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * @author VuLuu
 */
@RestController
@RequestMapping("/api/collections")
@RequiredArgsConstructor
public class BookCollectionController {

  private final BookCollectionService collectionService;

  @PostMapping
  public ResponseEntity<BookCollectionResponse> createCollection(
      @RequestBody CreateBookCollectionRequestDTO request) {
    BookCollectionResponse response = collectionService.createCollection(request);
    return ResponseEntity.ok(response);
  }

  @GetMapping
  public ResponseEntity<Page<BookCollectionResponse>> getUserCollections(
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int size) {

    Page<BookCollectionResponse> response = collectionService.getCollectionsByUser(page, size);
    return ResponseEntity.ok(response);
  }
}
