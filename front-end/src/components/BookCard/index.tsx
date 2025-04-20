import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import { grey, red } from "@mui/material/colors";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import bookImage from "~/assets/product/mockup_1.png";
import { useNavigate } from "react-router-dom";
export function BookCard() {
  const navigate = useNavigate();
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
    >
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
          src={bookImage}
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
            onClick={() => {
              navigate("/cart");
            }}
          >
            <ShoppingCartIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Tiêu đề sách */}
      <Typography
        fontFamily={"Segoe UI"}
        sx={{
          fontSize: 15,
          fontWeight: 600,
          color: grey[900],
          transition: "color 0.4s ease-in-out",
          cursor: "pointer",
          "&:hover": {
            color: red[600],
          },
        }}
      >
        Dược sư tự sự (Manga) - Tập 13
      </Typography>

      {/* Giá bán & Giá gạch */}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          fontFamily={"Segoe UI"}
          sx={{ fontSize: 15, fontWeight: 600 }}
          color={red[600]}
        >
          39,950₫
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
          47,000₫
        </Typography>
      </Box>
    </Box>
  );
}
