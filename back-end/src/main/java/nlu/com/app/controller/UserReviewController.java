package nlu.com.app.controller;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import nlu.com.app.dto.AppResponse;
import nlu.com.app.dto.request.CreateReviewRequest;
import nlu.com.app.dto.response.CreateReviewResponse;
import nlu.com.app.dto.response.ReviewOverallDTO;
import nlu.com.app.exception.ApplicationException;
import nlu.com.app.exception.ErrorCode;
import nlu.com.app.service.IUserReviewService;
import org.springframework.web.bind.annotation.*;

/**
 * @author Nguyen Tuan
 */
@RequestMapping("/api/review")
@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserReviewController {
    IUserReviewService userReviewService;

    @PostMapping("/create")
    public AppResponse<CreateReviewResponse> createReview(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody CreateReviewRequest request
    ) {
        // Extract JWT from "Bearer <token>"
        String jwtToken = extractToken(authHeader);

        // Call service
        CreateReviewResponse response = userReviewService.createReview(jwtToken, request);

        return AppResponse.<CreateReviewResponse>builder()
                .result(response)
                .build();
    }

    private String extractToken(String header) {
        if (header != null && header.startsWith("Bearer ")) {
            return header.substring(7);
        }
        throw new ApplicationException(ErrorCode.UNAUTHENTICATED);
    }
}

