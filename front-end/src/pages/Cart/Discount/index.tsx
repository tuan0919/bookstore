import { Box, Typography, Button, LinearProgress, Chip, Stack, IconButton, Tooltip } from "@mui/material";
import DiscountIcon from '@mui/icons-material/Discount';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

function Discount() {
  return (
    <Box p={2} borderRadius={2} boxShadow={2} bgcolor="#fff">
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Box display="flex" alignItems="center">
          <DiscountIcon sx={{ fontSize: 30, color: "green", mr: 1 }} />
          <Typography variant="subtitle1" fontWeight="bold">
            KHUYẾN MÃI
          </Typography>
        </Box>
        <Button variant="text" size="small">Xem thêm</Button>
      </Box>

      {/* Nội dung mã giảm giá chính */}
      <Box mb={2}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              Mã Giảm 100K - Toàn Sàn
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Đơn hàng từ 1.1tr - Không bao gồm giá trị của các sản phẩm sau Manga, Ngoại...
            </Typography>
          </Box>
          <Tooltip title="Chi tiết điều kiện áp dụng">
            <IconButton size="small">
              <InfoOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>

        {/* HSD + Tiến độ */}
        <Typography variant="body2" mt={1} color="text.secondary">
          HSD: 30/04/2025
        </Typography>
       
        <LinearProgress variant="determinate" value={84.45} sx={{ mt: 1, borderRadius: 1 }} />
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
        <Typography variant="caption" color="text.secondary" mt={0.5}>
          Mua thêm 171.050 đ
        </Typography>

        <Button variant="contained" color="primary" size="small" sx={{ mt: 1 }}>
          Mua thêm
        </Button>
        </Box>
      </Box>

      {/* Danh sách mã áp dụng khác */}
      <Stack direction="row" alignItems="center" spacing={1}>
        <Chip label="Mã giảm 25k" color="warning" variant="outlined" onDelete={() => {}} />
        <Typography variant="caption" color="text.secondary">
          Có thể áp dụng đồng thời nhiều mã
        </Typography>
        <Tooltip title="Một số mã có thể áp dụng đồng thời nếu không bị giới hạn">
          <InfoOutlinedIcon sx={{ fontSize: 16 }} color="disabled" />
        </Tooltip>
      </Stack>
    </Box>
  );
}

export default Discount;
