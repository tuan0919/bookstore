package nlu.com.app.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

import lombok.Getter;

@Getter
public enum ErrorCode {
    RUNTIME_EXCEPTION(9998, "You're doing something wrong, this shouldn't happen", HttpStatus.INTERNAL_SERVER_ERROR),
    UNKNOWN_EXCEPTION(9999, "Something went wrong :(.", HttpStatus.INTERNAL_SERVER_ERROR),
    RESOURCE_NOT_FOUND(1001, "Resource not found, please check again!", HttpStatus.NOT_FOUND),
    UNAUTHENTICATED(1002, "You are not authenticated!", HttpStatus.UNAUTHORIZED),
    USER_NOT_EXISTED(1003, "User is not existed!", HttpStatus.NOT_FOUND),
    USER_ALREADY_EXISTED(1004, "User is already existed!", HttpStatus.BAD_REQUEST),
    ROLE_NOT_EXISTED(1005, "Role is not existed!", HttpStatus.NOT_FOUND),
    ROLE_ALREADY_EXISTED(1006, "Role is already existed!", HttpStatus.BAD_REQUEST),
    PERMISSION_NOT_EXISTED(1007, "Permission is not existed!", HttpStatus.NOT_FOUND),
    UNEXPECTED_BEHAVIOR(1008, "Something went wrong, this action shouldn't perform", HttpStatus.BAD_REQUEST),
    JWT_EXPIRED(1009, "Your session is out of date, please re-login", HttpStatus.FORBIDDEN),
    S3_KEY_OBJECT_DUPLICATED(1010, "Object with same key existed on server", HttpStatus.BAD_REQUEST),
    CATEGORY_NOT_FOUND(1011, "Category not found, please check again!", HttpStatus.NOT_FOUND),
    BOOK_NOT_FOUND(1012, "Book not found, please check again!", HttpStatus.NOT_FOUND),
    GENRE_NOT_FOUND(1013, "Genre not found", HttpStatus.NOT_FOUND),
    BOOK_COLLECTION_NOT_FOUND(1014, "BookCollection not found", HttpStatus.NOT_FOUND),
    CANT_CANCEL_ORDER(1010, "Only pending orders can be cancelled", HttpStatus.BAD_REQUEST),
    NO_DEFAULT_ADDRESS(1011, "No default address found for user.",HttpStatus.BAD_REQUEST),
    ORDER_NOT_FOUND(1012, "Order cannot be found", HttpStatus.NOT_FOUND),
    ;

    ErrorCode(int code, String message, HttpStatusCode statusCode) {
        this.code = code;
        this.message = message;
        this.statusCode = statusCode;
    }

    private final int code;
    private final String message;
    private final HttpStatusCode statusCode;
}
