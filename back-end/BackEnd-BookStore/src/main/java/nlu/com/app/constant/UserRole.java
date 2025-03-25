package nlu.com.app.constant;

public enum UserRole {
    ADMIN("Người quản trị"), MANAGER("Người quản lý"), CUSTOMER("Khách hàng");
    private String description;
    UserRole(String description) {
        this.description = description;
    }
    public String getDescription() {
        return description;
    }
}
