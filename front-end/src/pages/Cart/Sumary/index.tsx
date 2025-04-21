import { Box, Button, Typography } from "@mui/material";
interface SumaryProps {
  totalPrice: number;
}
function Sumary({ totalPrice }: SumaryProps) {
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
        <Typography>1.000.200 đ</Typography>
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
       <Typography>-10.000 đ</Typography>
      </Box>
      {/* Sumary */}
      <hr />
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography>Tổng Số Tiền (gồm VAT)</Typography>
        <Typography>{totalPrice.toLocaleString()} đ</Typography>
      </Box>
      <Button sx={{backgroundColor:'#d32f2f',color:'white', width:'100%'}}>Thanh toán</Button>
    </Box>
  );
}
export default Sumary;
