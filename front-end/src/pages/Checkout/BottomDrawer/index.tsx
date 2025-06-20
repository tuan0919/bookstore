import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Stack,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import shadows from "@mui/material/styles/shadows";
import PaypalButton from "~/components/Paypal";
import {createOrder} from "~/api/order";
import { useNavigate } from "react-router-dom";
import {useCart} from "~/providers/CartProvider";
import {  CartItemPropertyResponseDTO } from "~/types/cart";
import { useTranslation } from "react-i18next";
export function BottomDrawer({
  sx = undefined,
  totalPrice = 0,
  paymentMethod,
}: {
  sx?: SxProps<Theme>;
  totalPrice?: number;
  paymentMethod?: string;
}) {
  const selectedBooksId = JSON.parse(localStorage.getItem("selectedBooksId") || "[]" );
  const selectBooks = JSON.parse(localStorage.getItem("selectedBooks") || "[]");
  console.log("selectBooks", selectBooks);
  console.log("selectedBooksId", selectedBooksId);
  const navigate = useNavigate();
 const { removeItem } = useCart();
 const { t } = useTranslation();
  function handelCreateOrder() {
      createOrder({
        paymentMethodId: 1,
        selectedProductIds: selectedBooksId
      }).then(() =>{
        selectBooks.forEach((book: CartItemPropertyResponseDTO) => {
                          removeItem?.(book.productId.toString());
                        });
        localStorage.removeItem("selectedBooks");
        navigate("/profileUser/orders");
      }).catch((error) => {
        console.error("Lỗi khi tạo đơn hàng:", error);    
      });
    }
  return (
    <Box
      sx={{
        ...sx,
        backgroundColor: "white",
        width: "100%",
        boxShadow: shadows["20"],
        paddingY: 2,
      }}
    >
      <Container>
        <Stack gap={0.5}>
          <Box display={"flex"} justifyContent={"flex-end"}>
            <Box width={400} textAlign={"right"}>
              <Typography sx={{ fontSize: 14 }}>{t('page.checkout.content.bottomDrawer.item1')}</Typography>
            </Box>
            <Box width={200} textAlign={"right"}>
              <Typography sx={{ fontSize: 14 }}>
                {totalPrice.toLocaleString("vi-VN") + " đ"}
              </Typography>
            </Box>
          </Box>
          <Box display={"flex"} justifyContent={"flex-end"}>
            <Box width={400} textAlign={"right"}>
              <Typography sx={{ fontSize: 14 }}>{t('page.checkout.content.bottomDrawer.item2')}</Typography>
            </Box>
            <Box width={200} textAlign={"right"}>
              <Typography sx={{ fontSize: 14 }}>
                {(32000).toLocaleString("vi-VN") + " đ"}
              </Typography>
            </Box>
          </Box>
          <Box display={"flex"} justifyContent={"flex-end"}>
            <Box width={400} textAlign={"right"}>
              <Typography sx={{ fontWeight: 700 }}>{t('page.checkout.content.bottomDrawer.item3')}</Typography>
            </Box>
            <Box width={200} textAlign={"right"}>
              <Typography
                sx={{ fontWeight: 700, fontSize: 18, color: red["900"] }}
              >
                {(totalPrice + 32000).toLocaleString("vi-VN") + " đ"}
              </Typography>
            </Box>
          </Box>
        </Stack>
        <Divider sx={{ mt: 1 }} />
        <Box display={"flex"} mt={2}>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label={t('page.checkout.content.bottomDrawer.item4')}
          />
          {(() => {
            switch (paymentMethod) {
              case "pay-with-paypal":
                return (
                    <Box sx={{ marginLeft: "auto" }}>
                        <PaypalButton
                        />
                    </Box>
                )
              case "pay-on-delivery":
                return (
                  <Button
                    sx={{ marginLeft: "auto" }}
                    size="small"
                    variant="contained"
                    color="error"
                    disableFocusRipple
                    disableRipple
                    disableTouchRipple
                    onClick={(event: React.MouseEvent<HTMLButtonElement>)=>{
                      event.preventDefault();
                      handelCreateOrder();
                    }}
                  >
                    {t('page.checkout.content.bottomDrawer.item5')}
                  </Button>
                );
              default:
                return null; 
            }
          })()}
        </Box>
      </Container>
    </Box>
  );
}