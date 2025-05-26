package nlu.com.app.dto.response;

import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoryChainDTO {
  private String fullChain;
  private List<SimpleCategoryDTO> list;

  @Data
  @NoArgsConstructor
  @AllArgsConstructor
  @Builder
  public static class SimpleCategoryDTO {
    private Long id;
    private String name;
  }
}