package nlu.com.app.controller.admin;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import nlu.com.app.dto.AppResponse;
import nlu.com.app.dto.request.BookDetailsDTO;
import nlu.com.app.dto.response.UpdateBookResponse;
import nlu.com.app.service.IBookService;
import nlu.com.app.service.impl.BookService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Nguyen Tuan
 */
@RequestMapping("/admin/api/book")
@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AdminBookController {
    IBookService bookService;
    @GetMapping("/{id}")
    public AppResponse<UpdateBookResponse> getBookDetail(@PathVariable Long id) {
        return AppResponse.<UpdateBookResponse>builder()
                .result(bookService.getBookInfoForUpdate(id))
                .build();
    }
}
