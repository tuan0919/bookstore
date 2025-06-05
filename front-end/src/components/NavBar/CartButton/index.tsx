import { Badge, Stack, Typography } from "@mui/material";
import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";
import { grey } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { useCart } from "~/providers/CartProvider";
export function CartButton() {
  const naviagation = useNavigate();
  const { cart } = useCart();
   const totalItems = cart.length;
  return (
    <Stack
      component="div"
      onClick={() => naviagation("/cart")}
      direction={"column"}
      sx={{
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
    >
      {localStorage.getItem("access_token") ?(
        <Badge badgeContent={totalItems} color="error">
      <AddShoppingCartRoundedIcon
        sx={{
          fontSize: 30,
          color: {
            xs: grey[200],
            md: grey[600],
          },
        }}
      />
      </Badge>
      ) :(
         <AddShoppingCartRoundedIcon
        sx={{
          fontSize: 30,
          color: {
            xs: grey[200],
            md: grey[600],
          },
        }}
      />
      )}
      <Typography
        sx={{
          color: {
            xs: grey[200],
            md: grey[600],
          },
          fontWeight: "light",
          fontSize: "13px",
          display: {
            xs: "none",
            md: "block",
          },
        }}
      >
        Giỏ hàng
      </Typography>
    </Stack>
  );
}
