// src/components/NotificationCard.tsx
import { Box, Typography } from "@mui/material";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import DiscountIcon from "@mui/icons-material/Discount";
import RedeemIcon from "@mui/icons-material/Redeem";
type NotificationCardProps = {
  title: string;
  content: string;
  date: string;
  type: string;
};

export default function NotificationCard({
  title,
  content,
  date,
  type,
}: NotificationCardProps) {
  return (
    <Box
      sx={{
        backgroundColor: "#FFF8DC", // màu vàng nhạt
        border: "1px solid #FFCC80", // viền cam nhạt
        padding: 2,
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 2,
        borderRadius: 1,
        position: "relative",
      }}
    >
      {type === "order" ? (
        <Box sx={{ width: 32, height: 32, mt: 0.5 }}>
          <ShoppingBasketIcon sx={{ color: "orange" }} />
        </Box>
      ) : type === "voucher" ? (
        <Box sx={{ width: 32, height: 32, mt: 0.5 }}>
          <RedeemIcon sx={{ color: "orange" }} />
        </Box>
      ) : type === "discountCode" ? (
        <Box sx={{ width: 32, height: 32, mt: 0.5 }}>
          <DiscountIcon sx={{ color: "orange" }} />
        </Box>
      ) : null}

      <Box flexGrow={1}>
        <Typography variant="subtitle2" fontWeight="bold">
          {title}
        </Typography>
        <Typography variant="body2" mt={0.5}>
          {content}
        </Typography>
      </Box>

      <Typography
        variant="caption"
        sx={{
          position: "absolute",
          top: 8,
          right: 12,
          fontStyle: "italic",
          color: "gray",
        }}
      >
        {date}
      </Typography>
    </Box>
  );
}
