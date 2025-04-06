package nlu.com.app.constant;

/**
 * @author VuLuu
 */
public enum ECategory {
  ALL_CATEGORY("All category"),
  VN_BOOK("Sách Tiếng Việt"),
  F_BOOK("Sách ngoại văn"),
  LIGHT_NOVEL("Light Novel"),
  MANGA("Manga"),
  ART_ANIME_CHAR("Art, Anime Character");
  private String description;

  ECategory(String description) {
    this.description = description;
  }

  public String getDescription() {
    return description;
  }
}
