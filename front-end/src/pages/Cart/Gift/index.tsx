import { Box, Typography, IconButton, Badge } from "@mui/material";
import RedeemIcon from "@mui/icons-material/Redeem";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useTranslation } from "react-i18next";
function Gift() {
  const {t} = useTranslation();
  return (
    <Box
      p={2}
      borderRadius={2}
      sx={{
        background: "linear-gradient(90deg, #e8e8ff, #fbfbff)", // ✔ Dùng background
        boxShadow: "0 0 4px rgba(0,0,0,0.1)",
      }}
    
    >
      {/* Header */}
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
        <Box display="flex" alignItems="center" gap={1}>
          <RedeemIcon sx={{ color: "#6b4fe2" }} />
          <Typography fontWeight="bold">
            {t("page.cart.gift.item1")} <Typography component="span" color="text.secondary">(1/1)</Typography>
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={1}>
          <Typography color="primary" fontWeight="medium" sx={{ cursor: "pointer" }}>
           {t("page.cart.gift.item2")}
          </Typography>
          <Badge badgeContent={1} color="error">
            <ArrowForwardIosIcon fontSize="small" />
          </Badge>
        </Box>
      </Box>

      {/* Gift item */}
      <Box
        display="flex"
        alignItems="center"
        bgcolor="#e0f7fa"
        borderRadius={1}
        px={1.5}
        py={0.5}
        width="fit-content"
      >
        <Box
          component="img"
          src="https://upload.wikimedia.org/wikipedia/vi/thumb/e/e1/Logo_sachweb.png/240px-Logo_sachweb.png"
          alt="gift"
          sx={{ width: 24, height: 24, borderRadius: 0.5, mr: 1 }}
        />
        <Typography variant="body2" color="primary">
          {t("page.cart.gift.item3")}
        </Typography>
        <IconButton size="small">
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
}

export default Gift;
