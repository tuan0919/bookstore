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
import { cancelOrder } from "~/api/order";
import CustomSnackbar from "~/components/Popup/Snackbar";
import { useState } from "react";
import { useTranslation } from "react-i18next";
function onBuyAgain() {
  console.log("Buy again clicked");
}
export interface BookBought {
  bookTitle: string;
  quantity: number;
  price: number;
  discount: number;
  img?: string; // Optional property
}
export default function Order({
  orderId,
  status,
  orderDateTime,
  imgBook,
  titleBook,
  price,
  feeShip,
  nameUser,
  phoneNumber,
  address,
  paymentMethod,
  shipmentMethod,
  note,
  items,
  img,
  refreshOrders,
   goToAllTab
}: OrderDetailsProps) {
  const navigate = useNavigate();
  function handleClick() {
    const orderData = {
      orderId,
      status,
      orderDateTime,
      imgBook,
      titleBook,
      feeShip,
      price,
      nameUser,
      phoneNumber,
      address,
      paymentMethod,
      shipmentMethod,
      note,
      items,
      img
    };

    // Lưu vào localStorage
    localStorage.setItem("selectedOrder", JSON.stringify(orderData));

    // Điều hướng sang trang chi tiết
    navigate(`view/order_id/${orderId}`);
  }
  const amount = items.reduce((total, item) => total + item.quantity, 0);
  const [isOpenSnackbar, setIsOpenSnackbar] = useState(false);
  const [confirmCancel, setConfirmCancel] = useState(false);
  const { t } = useTranslation();
  // Xử lý hủy đơn
  const handleCancelOrder = async () => {
    // Ngăn chặn sự kiện click lan truyền lên Card
    try {
      const response = await cancelOrder(Number(orderId));
      if (response.code === 1000) {
        alert("Đơn hàng đã được hủy thành công.");
        setIsOpenSnackbar(true);
      } else {
        alert("Hủy đơn hàng không thành công. Vui lòng thử lại sau.");
      }
    } catch (error) {
      console.error("Lỗi khi hủy đơn hàng:", error);
      alert("Đã xảy ra lỗi khi hủy đơn hàng. Vui lòng thử lại sau.");
    }
  };
  return (
    <>
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
              overflow: "visible",
              flexShrink: 0,
              objectFit: "contain",
            }}
          >
            <img
              src={items[0]?.img}
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
                maxWidth: 300,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {items.map((item) => item.bookTitle).join(", ")}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {amount} {t('page.profileUser.profileSection.orders.orderItem.product')}
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
            {t('page.profileUser.profileSection.orders.orderItem.total')}{" "}
            <span style={{ color: "red", fontWeight: "bold", fontSize: 16 }}>
              {price.toLocaleString()} ₫
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
              {t('page.profileUser.profileSection.orders.orderItem.button')}
            </Button>
            {status === "PENDING_CONFIRMATION" && (
              <Button
                variant="outlined"
                color="error"
                onClick={(e) => {
                  e.stopPropagation(); // Ngăn chặn sự kiện click lan truyền lên Card(vào chi tiết hóa đơn)
                  e.preventDefault(); // Ngăn chặn hành động mặc định của nút
                  setConfirmCancel(true);
                  setConfirmCancel(true);
                }}
              >
                Hủy đơn
              </Button>
            )}
           
          </Stack>
        </Grid2>
      </Grid2>
    </Card>
     {confirmCancel && (
              <CustomSnackbar
                open={confirmCancel}
                onClose={() => setConfirmCancel(false)}
                severity="warning"
                message="Bạn có chắc chắn muốn hủy đơn không?"
                duration={3000}
                actionButtons={[
                  {
                    label: "Đồng ý",
                    onClick: async () => {
                      await handleCancelOrder();
                      refreshOrders(); // Load lại đơn hàng
                      goToAllTab(); 
                      setConfirmCancel(false);
                    },
                  },
                  {
                    label: "Hủy",
                    onClick: () => setConfirmCancel(false),
                  },
                ]}
              />
            )}
            </>
  );
}
