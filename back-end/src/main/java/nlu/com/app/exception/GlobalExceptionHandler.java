package nlu.com.app.exception;

import lombok.extern.slf4j.Slf4j;
import nlu.com.app.dto.AppResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.resource.NoResourceFoundException;

@ControllerAdvice
@Slf4j
@ResponseBody
public class GlobalExceptionHandler {

    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<AppResponse<String>> handleNoResourceFoundException(NoResourceFoundException ex) {
        log.error("NoResourceFoundException: ", ex);
        var response = AppResponse.<String>builder()
                .message(ErrorCode.RESOURCE_NOT_FOUND.getMessage())
                .code(ErrorCode.RESOURCE_NOT_FOUND.getCode())
                .build();

        return ResponseEntity.status(ErrorCode.RUNTIME_EXCEPTION.getStatusCode()).body(response);
    }

    @ExceptionHandler(ApplicationException.class)
    public ResponseEntity<AppResponse<String>> handleApplicationException(ApplicationException ex) {
        log.error("Application exception: ", ex);
        var response = AppResponse.<String>builder()
                .message(ex.getErrorCode().getMessage())
                .code(ex.getErrorCode().getCode())
                .build();

        return ResponseEntity.status(ex.getErrorCode().getStatusCode()).body(response);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<AppResponse<String>> handleRuntimeException(RuntimeException ex) {
        log.error("Runtime exception: ", ex);
        var response = AppResponse.<String>builder()
                .message(ErrorCode.RUNTIME_EXCEPTION.getMessage())
                .code(ErrorCode.RUNTIME_EXCEPTION.getCode())
                .build();

        return ResponseEntity.status(ErrorCode.RUNTIME_EXCEPTION.getStatusCode()).body(response);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<AppResponse<String>> handleUnknownException(Exception ex) {
        log.error("Unknown exception: ", ex);
        var response = AppResponse.<String>builder()
                .message(ErrorCode.UNKNOWN_EXCEPTION.getMessage())
                .code(ErrorCode.UNKNOWN_EXCEPTION.getCode())
                .build();

        return ResponseEntity.status(ErrorCode.UNKNOWN_EXCEPTION.getStatusCode()).body(response);
    }
}
