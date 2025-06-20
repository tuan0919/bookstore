package nlu.com.app.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class TimelineOrderResponseDTO {
    List<Timeline> timelines;
    @Data @Builder
    public static class Timeline {
        String name;
        String description;
        String createdAt; // response dạng: 23 th4, 2025 - 09:40 AM
    }
}
