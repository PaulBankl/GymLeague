package dev.paulbankl.gymleague.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice 
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiError> handleResourceNotFoundException(ResourceNotFoundException ex) {
        ApiError apiError = new ApiError(404, ex.getMessage());
        return ResponseEntity .status(HttpStatus.NOT_FOUND).body(apiError);
    }

    @ExceptionHandler (ConflictException.class)
    public ResponseEntity<ApiError> handleConflictException(ConflictException ex) {
        ApiError apiError = new ApiError(409, ex.getMessage());
        return ResponseEntity.status(HttpStatus.CONFLICT).body(apiError);
    }
    @ExceptionHandler(ForbiddenException.class)
public ResponseEntity<ApiError> handleForbiddenException(
        ForbiddenException ex) {

    ApiError apiError = new ApiError(
        403,
        ex.getMessage()
    );

    return ResponseEntity
            .status(HttpStatus.FORBIDDEN)
            .body(apiError);
}
    
}
