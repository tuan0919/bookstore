package nlu.com.app.constant;

/**
 * @author VuLuu
 */
public enum EGenre {
  COMEDY("Comedy"),
  FANTASY("Fantasy"),
  SHOUNEN("Shounen"),
  ACTION("Action"),
  ADVENTURE("Adventure"),
  DRAMA("Drama"),
  SCI_FI("Sci Fi"),
  SUPERNATURAL("Supernatural");
  private String description;

  EGenre(String description) {
    this.description = description;
  }

  public String getDescription() {
    return description;
  }
}
