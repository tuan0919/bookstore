package nlu.com.app.constant;

/**
 * @author VuLuu
 */
public enum EPaymentMethod {
  COD("Thanh toán khi nhận hàng"),
  CREDIT_CARD("Thẻ tín dụng/Ghi nợ"),
  BANK_TRANSFER("Chuyển khoản ngân hàng"),
  PAYPAL("Thanh toán qua PayPal"),
  MOMO("Ví MoMo"),
  ZALO_PAY("Ví ZaloPay"),
  VNPAY("VNPAY");

  private final String description;

  EPaymentMethod(String description) {
    this.description = description;
  }

  public String getDescription() {
    return description;
  }
}
