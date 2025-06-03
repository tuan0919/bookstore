package nlu.com.app.constant;

/**
 * @author VuLuu
 */
public enum EOrderStatus {
  PENDING_CONFIRMATION("Chờ xác nhận"),
  CONFIRMED("Đã xác nhận"),
  SHIPPING("Đang vận chuyển"),
  DELIVERED("Đã chuyển đến"),
  CANCELED("Đã hủy");

  private String description;

  EOrderStatus(String description) {
    this.description = description;
  }

  public String getDescription() {
    return description;
  }

  public static EOrderStatus getStatusByDescription(String text) {
    for (EOrderStatus status : EOrderStatus.values()) {
      if (status.getDescription().equalsIgnoreCase(text)) {
        return status;
      }
    }
    return null;
  }

  public static void main(String[] args) {
    System.out.println(getStatusByDescription("Đang vận chuyển"));  // OUTPUT: SHIPPING
  }
}
