import {
  Box,
  Paper,
  Typography,
  Grid2,
  Chip,
  Divider,
  Button,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import OrderStepper from "../OrderProgress";

export interface OrderDetailsProps {
  orderId: string;
  orderDateTime: string;
  nameUser: string;
  phoneNumber: string;
  address: string;
  paymentMethod: string;
  shipmentMethod: string;
  note: string;
  price: number;
  feeShip: number;
  status: string;
  imgBook: string;
  titleBook: string;
  amount: number;
}

export default function OrderDetail() {
  const { orderId } = useParams();
  const [order, setOrder] = useState<OrderDetailsProps>({
    orderId: "",
    orderDateTime: "",
    nameUser: "",
    phoneNumber: "",
    address: "",
    paymentMethod: "",
    shipmentMethod: "",
    note: "",
    price: 0,
    feeShip: 0,
    status: "",
    imgBook: "",
    titleBook: "",
    amount: 1,
  });

  useEffect(() => {
    const stored = localStorage.getItem("selectedOrder");
    console.log("Stored order:", stored);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.orderId === orderId) {
        setOrder(parsed);
      }
    }
  }, [orderId]);

  const total = order.price * order.amount + order.feeShip;

  return (
    <Box p={2}>
      {/* Header */}
      <Paper variant="outlined" sx={{ p: 2, mb: 2, borderRadius: 2 }}>
        <Grid2 container justifyContent="space-between" alignItems="center">
          <Box mt={2} display="flex" alignItems="center" gap={1}>
            <Typography variant="h6" fontWeight="bold">
              Mã đơn hàng #{order.orderId}
            </Typography>
            <Chip
              label={order.status}
              sx={{
                marginLeft: 1,
                bgcolor: "rgba(35, 193, 107, 0.2)",
                color: "#23C16B",
                fontWeight: "bold",
              }}
            />
          </Box>

          <Typography color="text.secondary">
            Ngày mua: {order.orderDateTime}
          </Typography>
        </Grid2>
        <OrderStepper status={order.status} />
      </Paper>

      <Grid2
        container
        spacing={2}
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        {/* Thông tin người nhận */}
        <Grid2 sx={{ xs: 12, md: 4, flex: 1, minWidth: 250 }}>
          <Paper
            variant="outlined"
            sx={{ p: 2, borderRadius: 2, boxShadow: 1, height: "100%" }}
          >
            <Typography fontWeight="bold" gutterBottom>
              Thông tin người nhận
            </Typography>
            <Typography>{"Họ và tên: " + order.nameUser}</Typography>
            <Typography>{"Số điện thoại: " + order.phoneNumber}</Typography>
            <Typography>{"Địa chỉ: " + order.address}</Typography>
          </Paper>
        </Grid2>

        {/* Phương thức thanh toán */}
        <Grid2 sx={{ xs: 12, md: 4, flex: 1, minWidth: 250 }}>
          <Paper
            variant="outlined"
            sx={{ p: 2, borderRadius: 2, boxShadow: 1, height: "100%" }}
          >
            <Typography fontWeight="bold" gutterBottom>
              Phương thức thanh toán
            </Typography>
            <Typography>{order.paymentMethod}</Typography>
          </Paper>
        </Grid2>

        {/* Tổng tiền */}
        <Grid2 sx={{ xs: 12, md: 4, flex: 1, minWidth: 250 }}>
          <Paper
            variant="outlined"
            sx={{ p: 2, borderRadius: 2, boxShadow: 1, height: "100%" }}
          >
            <Typography fontWeight="bold" gutterBottom>
              Tổng tiền
            </Typography>
            <Typography>
              Tạm tính: {order.price.toLocaleString("vi-VN")} ₫
            </Typography>
            <Typography>
              Phí vận chuyển: {order.feeShip.toLocaleString("vi-VN")} ₫
            </Typography>
            <Typography color="error" fontWeight="bold" mt={1}>
              Tổng cộng: {total.toLocaleString("vi-VN")} ₫
            </Typography>
            <Button variant="contained" color="error" sx={{ mt: 1 }}>
              Mua lại
            </Button>
          </Paper>
        </Grid2>
      </Grid2>

      <Grid2
        container
        spacing={2}
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        {/* Phương thức vận chuyển */}
        <Grid2 sx={{ xs: 12, md: 6, flex: 1, minWidth: 250 }}>
          <Paper
            variant="outlined"
            sx={{ p: 2, borderRadius: 2, boxShadow: 1, height: "100%" }}
          >
            <Typography fontWeight="bold" gutterBottom>
              Phương thức vận chuyển
            </Typography>
            <Typography>{order.shipmentMethod}</Typography>
          </Paper>
        </Grid2>

        {/* Ghi chú */}
        <Grid2 sx={{ xs: 12, md: 6, flex: 1, minWidth: 250 }}>
          <Paper
            variant="outlined"
            sx={{ p: 2, borderRadius: 2, boxShadow: 1, height: "100%" }}
          >
            <Typography fontWeight="bold" gutterBottom>
              Ghi chú
            </Typography>
            <Typography color="text.secondary">
              {order.note || "(Không có)"}
            </Typography>
          </Paper>
        </Grid2>
      </Grid2>

      {/* Danh sách sản phẩm */}
      <Paper variant="outlined" sx={{ p: 2, borderRadius: 2}}>
        <Typography fontWeight="bold" gutterBottom>
          Sản phẩm ({order.amount})
        </Typography>
        <Grid2 container spacing={2} alignItems="center">
          <Grid2>
            <Box
              component="img"
              src={order.imgBook}
              alt={order.titleBook}
              sx={{
                width: 64,
                height: 80,
                borderRadius: 1,
                objectFit: "cover",
              }}
            />
          </Grid2>
          <Grid2>
            <Typography>{order.titleBook}</Typography>
            <Typography color="text.secondary">
              Giá: {order.price.toLocaleString("vi-VN")} ₫ × {order.amount}
            </Typography>
          </Grid2>
          <Grid2>
            <Typography fontWeight="bold">
              {(order.price * order.amount).toLocaleString("vi-VN")} ₫
            </Typography>
          </Grid2>
        </Grid2>
        <Divider sx={{ my: 2 }} />
        <Box display="flex" justifyContent="flex-end">
          <Typography fontWeight="bold" color="error">
            Tổng tiền: {total.toLocaleString("vi-VN")} ₫
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
