import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import { grey, red } from "@mui/material/colors";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import bookImage from "~/assets/product/mockup_1.png";
import { useNavigate } from "react-router-dom";
import { useCart } from "~/providers/CartProvider";
import CustomSnackbar from "~/components/Popup/Snackbar";
import { useState } from "react";

export interface BookCard {
  thumbnail: string;
  title: string;
  discountPrice: number;
  discountPercentage: number;
  originallPrice: number;
  bookId: number;
}

export function BookCard({ card }: { card?: BookCard }) {
  const navigate = useNavigate();
  const { increaseItem } = useCart();
  const [initStateSnackbar, setStateSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
    duration: 800,
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: 1,
        width: 200,
        borderRadius: 2,
        transition: "box-shadow 0.3s ease-in-out",
        position: "relative",
        "&:hover": {
          boxShadow: 4,
          ".cart-icon": {
            opacity: 1,
            transform: "translateY(0)",
          },
          ".overlay": {
            opacity: 1,
          },
        },
        gap: "4px",
        backgroundColor: "#fff",
      }}
      onClick={() => {
        navigate(`/details/${card?.bookId}`);
      }}
    >
      <CustomSnackbar
        open={initStateSnackbar.open}
        onClose={() => setStateSnackbar({ ...initStateSnackbar, open: false })}
        message={initStateSnackbar.message}
        severity="success"
        duration={initStateSnackbar.duration}
      />
      {/* Ảnh sách + icon giỏ hàng overlay */}
      <Box
        sx={{
          height: 268,
          position: "relative",
          cursor: "pointer",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <Box
          component="img"
          src={card?.thumbnail || bookImage}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
        {/*  Phủ lớp đen mờ cho Thumbnail */}
        <Box
          className="overlay"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            opacity: 0,
            transition: "opacity 0.3s ease-in-out",
            zIndex: 1,
          }}
        />

        {/* Label giảm giá */}
        {card?.discountPercentage && card.discountPercentage > 0 && (
          <Box
            sx={{
              position: "absolute",
              top: 8,
              left: 8,
              backgroundColor: red[600],
              color: "#fff",
              padding: "2px 6px",
              borderRadius: 1,
              fontSize: 12,
              fontWeight: "bold",
              zIndex: 3,
              userSelect: "none",
            }}
          >
            {`-${card.discountPercentage}%`}
          </Box>
        )}

        <Tooltip title="Thêm vào giỏ">
          <IconButton
            className="cart-icon"
            size="small"
            sx={{
              position: "absolute",
              bottom: 8,
              right: 8,
              backgroundColor: red[600],
              color: "#fff",
              border: "2px solid white",
              boxShadow: 2,
              opacity: 0,
              transform: "translateY(10px)",
              transition: "all 0.3s ease-in-out",
              zIndex: 2,
              "&:hover": {
                backgroundColor: red[800],
              },
            }}
            onClick={(event) => {
              event.stopPropagation();
              increaseItem(card?.bookId.toString() || "", 1);
              setStateSnackbar({
                ...initStateSnackbar,
                open: true,
                message: "Đã thêm vào giỏ hàng",
              });
            }}
          >
            <ShoppingCartIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Tiêu đề sách */}
      <Tooltip title={card?.title || "Dược sư tự sự (Manga) - Tập 13"}>
        <Typography
          fontFamily={"Segoe UI"}
          sx={{
            fontSize: 15,
            fontWeight: 600,
            color: grey[900],
            transition: "color 0.4s ease-in-out",
            cursor: "pointer",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            "&:hover": {
              color: red[600],
            },
          }}
        >
          {card?.title || `Dược sư tự sự (Manga) - Tập 13`}
        </Typography>
      </Tooltip>

      {/* Giá bán & Giá bị gạch (giảm giá) */}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          fontFamily={"Segoe UI"}
          sx={{ fontSize: 15, fontWeight: 600 }}
          color={red[600]}
        >
          {card?.discountPrice.toLocaleString("vi") + "₫" || "39.950₫"}
        </Typography>
        <Typography
          fontFamily={"Segoe UI"}
          sx={{
            fontSize: 15,
            fontWeight: 600,
            textDecoration: "line-through",
            textDecorationThickness: 1.2,
          }}
          color={grey[400]}
        >
          {card?.originallPrice.toLocaleString("vi") + "₫" || "47.000₫"}
        </Typography>
      </Box>
    </Box>
  );
}
