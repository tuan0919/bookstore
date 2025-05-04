import {
  Box,
  Button,
  Card,
  Chip,
  Typography,
  Link,
  Stack,
} from "@mui/material";
import { Grid2 } from "@mui/material/";
import { OrderDetailsProps } from "./OrderDetail";
import { useNavigate } from "react-router-dom";

function onBuyAgain() {
  console.log("Buy again clicked");
}

export default function Order({
  orderId,
  status,
  orderDateTime,
  imgBook,
  titleBook,
  amount,
  price,
  feeShip,
  nameUser,
    phoneNumber,
    address,
    paymentMethod,
    shipmentMethod,
    note
}: OrderDetailsProps) {
  const navigate = useNavigate();
  function handleClick() {
      const orderData = {
        orderId,
        status,
        orderDateTime,
        imgBook,
        titleBook,
        amount,
        price,
        feeShip,
        nameUser,
        phoneNumber,
          address,
          paymentMethod,
          shipmentMethod,
          note
        // thêm các thông tin khác nếu cần
      };
    
      // Lưu vào localStorage
      localStorage.setItem("selectedOrder", JSON.stringify(orderData));
    
      // Điều hướng sang trang chi tiết
      navigate(`view/order_id/${orderId}`);
    }

  return (
    <Card
      variant="outlined"
      sx={{
        p: 2,
        mb: 2,
        borderRadius: 2,
        boxShadow: 1,
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      {/* Header */}
      <Grid2
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <Grid2>
          <Link underline="hover" color="#2489F4">
            #{orderId}
          </Link>
          <Chip
            label={status}
            size="small"
            sx={{
              ml: 1,
              fontSize: 12,
              height: 22,
              fontWeight: "bold",
              px: 1,
              "& .MuiChip-label": { display: "flex", alignItems: "center" },
              bgcolor: "rgba(35, 193, 107, 0.2)",
              color: "#23C16B",
            }}
          />
        </Grid2>
        <Grid2>
          <Typography variant="body2" color="text.secondary">
            {orderDateTime}
          </Typography>
        </Grid2>
      </Grid2>
      <hr style={{ color: "white", opacity: 0.2 }}></hr>
      {/* Content: ảnh + tên + số lượng */}
      <Grid2 container spacing={2} alignItems="flex-start">
        {/* Ảnh */}
        <Grid2 sx={{ width: 64 }}>
          <Box
            sx={{
              width: 64,
              height: 80,
              borderRadius: 1,
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            <img
              src={imgBook}
              alt={titleBook}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
        </Grid2>

        {/* Phần tên và số lượng (chiếm hết chiều ngang còn lại) */}
        <Grid2>
          <Box>
            <Typography
              variant="subtitle1"
              fontWeight={500}
              sx={{
                wordBreak: "break-word",
              }}
            >
              {titleBook}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {amount} sản phẩm
            </Typography>
          </Box>
        </Grid2>
      </Grid2>

      <hr style={{ color: "white", opacity: 0.2 }}></hr>
      {/* Tổng tiền + Button */}
      <Grid2
        container
        justifyContent="space-between"
        alignItems="center"
        mt={2}
      >
        <Grid2>
          <Typography variant="body2" color="text.secondary">
            Tổng tiền:{" "}
            <span style={{ color: "red", fontWeight: "bold", fontSize: 16 }}>
              {(price * amount + feeShip).toLocaleString()} ₫
            </span>
          </Typography>
        </Grid2>
        <Grid2>
          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              color="error"
              size="small"
              sx={{ width: 150 }}
              onClick={(e) => {
                e.stopPropagation();
                onBuyAgain();
              }}
            >
              Mua lại
            </Button>
          </Stack>
        </Grid2>
      </Grid2>
    </Card>
  );
}
