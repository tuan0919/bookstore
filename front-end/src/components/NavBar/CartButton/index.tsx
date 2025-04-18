import { Stack, Typography } from "@mui/material";
import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";
import { grey } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
export function CartButton() {
  const naviagation = useNavigate();
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
      <AddShoppingCartRoundedIcon
        sx={{
          fontSize: 30,
          color: {
            xs: grey[200],
            md: grey[600],
          },
        }}
      />
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
