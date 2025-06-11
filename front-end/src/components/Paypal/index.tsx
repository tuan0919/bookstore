import { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { createPaypalOrder, capturePaypalOrder } from "../../api/paypal";
import {useCart} from "~/providers/CartProvider";
import {  CartItemPropertyResponseDTO } from "~/types/cart";
import { useNavigate } from "react-router-dom";
// Renders errors or successfull transactions on the screen.


function PaypalButton() {
  const initialOptions = {
    clientId:
      "Aa-9ggxNwr1hDP9KlMnVuCvFKjtdVbqNCQh7gFgkux5JKAQRC1q-y248PZTbbjpXi2OuZW0bJPKb8gLU",

    currency: "USD",

    components: "buttons",
    "enable-funding": "venmo",
    "disable-funding": "",
    "buyer-country": "US",
    "data-page-type": "product-details",
    "data-sdk-integration-source": "developer-studio",
  };

  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { removeItem } = useCart();
  const selectBooks = JSON.parse(localStorage.getItem("selectedBooks") || "[]");
  return (
    <div className="App">
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          fundingSource="paypal"
          style={{
            shape: "rect",
            layout: "vertical",
            color: "gold",
            label: "paypal",
          }}
          createOrder={async () => {
            try {
              const orderData = await createPaypalOrder(selectBooks);
              console.log("Order data:", orderData);
              if (orderData.id) {
                return orderData.id;
              } else {
                const errorDetail = orderData?.details?.[0];
                const errorMessage = errorDetail
                  ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                  : JSON.stringify(orderData);

                throw new Error(errorMessage);
              }
            } catch (error) {
              console.error(error);
              setMessage(`Could not initiate PayPal Checkout...${error}`);
            }
          }}
          onApprove={async (data, actions) => {
            try {
              const orderData = await capturePaypalOrder(data.orderID);
              console.log("Capture result", orderData);
              // Three cases to handle:
              //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
              //   (2) Other non-recoverable errors -> Show a failure message
              //   (3) Successful transaction -> Show confirmation or thank you message

              const errorDetail = orderData?.details?.[0];

              if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
                return actions.restart();
              } else if (errorDetail) {
                // (2) Other non-recoverable errors -> Show a failure message
                throw new Error(
                  `${errorDetail.description} (${orderData.debug_id})`
                );
              } else {
                // (3) Successful transaction -> Show confirmation or thank you message
                // Or go to another URL:  actions.redirect('thank_you.html');
               selectBooks.forEach((book: CartItemPropertyResponseDTO) => {
                  removeItem?.(book.productId.toString());
                });
                localStorage.removeItem("selectedBooks");

                navigate("/profileUser/orders")
              }
            } catch (error) {
              console.error(error);
              setMessage(
                `Sorry, your transaction could not be processed...${error}`
              );
            }
          }}
        />
      </PayPalScriptProvider>
     
    </div>
  );
}

export default PaypalButton;
