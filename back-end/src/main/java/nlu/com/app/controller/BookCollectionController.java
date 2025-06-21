package nlu.com.app.controller;

import lombok.RequiredArgsConstructor;
import nlu.com.app.dto.AppResponse;
import nlu.com.app.dto.request.AddBooksToCollectionRequestDTO;
import nlu.com.app.dto.request.BookCollectionDetailsDTO;
import nlu.com.app.dto.request.CreateBookCollectionRequestDTO;
import nlu.com.app.dto.request.UpdateBookCollectionRequestDTO;
import nlu.com.app.dto.response.BookCollectionResponse;
import nlu.com.app.service.BookCollectionService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author VuLuu
 */
@RestController
@RequestMapping("/api/collections")
@RequiredArgsConstructor
public class BookCollectionController {

  private final BookCollectionService collectionService;

  @PostMapping
  public AppResponse<BookCollectionResponse> createCollection(
      @RequestBody CreateBookCollectionRequestDTO request) {
    return AppResponse.<BookCollectionResponse>builder().result(collectionService.createCollection(request)).build();
  }

  @GetMapping
  public ResponseEntity<Page<BookCollectionResponse>> getUserCollections(
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int size) {

    Page<BookCollectionResponse> response = collectionService.getCollectionsByUser(page, size);
    return ResponseEntity.ok(response);
  }

  @PutMapping("/{collectionId}")
  public ResponseEntity<BookCollectionResponse> updateCollection(
      @PathVariable Long collectionId,
      @RequestBody UpdateBookCollectionRequestDTO request) {

    BookCollectionResponse response = collectionService.updateCollection(collectionId, request);
    return ResponseEntity.ok(response);
  }

  @PostMapping("/{collectionId}/books")
  public ResponseEntity<Void> addBooksToCollection(
      @PathVariable Long collectionId,
      @RequestBody AddBooksToCollectionRequestDTO request) {

    collectionService.addBooksToCollection(collectionId, request);
    return ResponseEntity.ok().build();
  }
  @GetMapping("/{collectionId}")
  public ResponseEntity<BookCollectionDetailsDTO> getCollectionDetails(@PathVariable Long collectionId) {
    BookCollectionDetailsDTO response = collectionService.getCollectionDetails(collectionId);
    return ResponseEntity.ok(response);
  }
}
