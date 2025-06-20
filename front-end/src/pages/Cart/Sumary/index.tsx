import { Box, Button, Typography } from "@mui/material";
import { CartItemPropertyResponseDTO } from "~/types/cart";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
interface SumaryProps {
  totalPrice: number;
  selectedBooks?: CartItemPropertyResponseDTO[];
}
function Sumary({ totalPrice,selectedBooks = []  }: SumaryProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <Box p={2} borderRadius={2} boxShadow={2} bgcolor="#fff">
        {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Box display="flex" alignItems="center">
          <Typography variant="subtitle1" fontWeight="bold">
            {t('page.cart.pay.title')}
          </Typography>
        </Box>
        <Typography>{totalPrice.toLocaleString()} đ</Typography>
      </Box>
      {/* Mã giảm giá nếu có */}
      <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={2}
      >
        <Box display="flex" alignItems="center">
        <Typography>
          {t('page.cart.pay.item1')}
        </Typography>
        </Box>
       <Typography>0 đ</Typography>
      </Box>
      {/* Sumary */}
      <hr />
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography>{t('page.cart.pay.item2')}</Typography>
        <Typography>{totalPrice.toLocaleString()} đ</Typography>
      </Box>
      <Button sx={{backgroundColor:'#d32f2f',color:'white', width:'100%'}}
      onClick={() => {
        if (selectedBooks.length !== 0) {
          localStorage.setItem("selectedBooks", JSON.stringify(selectedBooks));
          navigate("/checkout");
        }
        
      }}
      >{t('page.cart.pay.item3')}</Button>
    </Box>
  );
}
export default Sumary;
