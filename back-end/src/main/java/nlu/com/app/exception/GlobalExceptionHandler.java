package nlu.com.app.exception;

import nlu.com.app.dto.AppResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import lombok.extern.slf4j.Slf4j;

@ControllerAdvice
@Slf4j
@ResponseBody
public class GlobalExceptionHandler {
    @ExceptionHandler(Exception.class)
    AppResponse<String> handleRuntimeException(RuntimeException ex) {
        log.error("exception: ", ex);
        return AppResponse.<String>builder()
                .message(ErrorCode.UNKNOWN_EXCEPTION.getMessage())
                .code(ErrorCode.UNKNOWN_EXCEPTION.getCode())
                .build();
    }

    @ExceptionHandler(ApplicationException.class)
    ResponseEntity<AppResponse<?>> handleApplicationException(ApplicationException ex) {
        var response = AppResponse.<String>builder()
                .message(ex.getErrorCode().getMessage())
                .code(ex.getErrorCode().getCode())
                .build();
        return ResponseEntity.status(ex.getErrorCode().getStatusCode())
                .body(response);
    }
}