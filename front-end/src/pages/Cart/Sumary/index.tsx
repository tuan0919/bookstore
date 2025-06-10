import { Box, Button, Typography } from "@mui/material";
import { CartItemPropertyResponseDTO } from "~/types/cart";
import { useNavigate } from "react-router-dom";
interface SumaryProps {
  totalPrice: number;
  selectedBooks?: CartItemPropertyResponseDTO[];
}
function Sumary({ totalPrice,selectedBooks = []  }: SumaryProps) {
  const navigate = useNavigate();
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
            Thành tiền
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
          Giảm giá (Nhập mã thành công - Mã giảm giá 10K TOÀN SÀN - Đơn hàng từ
          130K)
        </Typography>
        </Box>
       <Typography>0 đ</Typography>
      </Box>
      {/* Sumary */}
      <hr />
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography>Tổng Số Tiền (gồm VAT)</Typography>
        <Typography>{totalPrice.toLocaleString()} đ</Typography>
      </Box>
      <Button sx={{backgroundColor:'#d32f2f',color:'white', width:'100%'}}
      onClick={() => {
        if (selectedBooks.length !== 0) {
          console.log("Bạn đã chọn các sản phẩm để thanh toán:", selectedBooks);
          localStorage.setItem("selectedBooks", JSON.stringify(selectedBooks));
          navigate("/checkout");
        }
        
      }}
      >Thanh toán</Button>
    </Box>
  );
}
export default Sumary;
