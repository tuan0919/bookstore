import React, { useState } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
  Button,
  Grid,
  Chip,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

const vouchers = [
  {
    title: 'Giảm 10%',
    description: 'Giảm tối đa 50K cho ĐH từ 100k',
    code: 'FHSVPP0525',
    expiry: '31/05/2025',
    details: `Mã giảm giá 10% - Tối đa 50k
            - Điều kiện áp dụng: áp dụng cho đơn hàng khi mua Manga/ Light Novel
            - Khách hàng có thể áp dụng cùng lúc với mã giảm phí vận chuyển`,
    },
    {
        title: 'Giảm 20K',
        description: 'Đơn hàng từ 210k',
        code: 'FHSTN20T05',
        expiry: '31/05/2025',
        details: 'Áp dụng cho đơn hàng mua từ 210k',
    },
    {
        title: 'Mã Giảm 10%',
        description: 'Giảm tối đa 30K cho ĐH từ 100k',
        code: 'FHSDC1T0525',
        expiry: '31/05/2025',
        details: 'Áp dụng cho đơn hàng mua từ 100k, giảm tối đa 30k',
    },
    {
        title: 'Mã Giảm 10K',
        description: 'Đơn hàng mua Manga/ Light Novel từ 120k',
        code: 'FHS1MANGAT05',
        expiry: '31/05/2025',
        details: 'Áp dụng cho đơn hàng từ 120k mua Manga/ Light Novel',
    },
    {
        title: 'Mã Giảm 15K',
        description: 'Đơn hàng mua Manga/ Light Novel từ 350K',
        code: 'FSMG0525',
        expiry: '31/05/2025',
        details: 'Áp dụng cho đơn hàng từ 350k mua Manga/ Light Novel',
    },
    {
        title: 'Mã Giảm 10K',
        description: 'Đơn hàng mua Manga/ Light Novel từ 200K',
        code: 'FSMGS10525',
        expiry: '31/05/2025',
        details: 'Áp dụng cho đơn hàng từ 200k mua Manga/ Light Novel',
    },
];


export default function MyVoucher() {
  const [open, setOpen] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState(null);

  const handleOpen = (voucher) => {
    setSelectedVoucher(voucher);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedVoucher(null);
  };

  return (
    <Box p={3}>
      <Typography variant="h6" mb={2}>Ví voucher</Typography>
      <Tabs value={0}>
        <Tab label="Voucher của tôi" />
      </Tabs>

      <Grid container spacing={2} mt={2}>
        {vouchers.map((voucher, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card sx={{ display: 'flex', position: 'relative', minHeight: 160 }}>
              {/* Icon */}
              <Box
                sx={{
                  width: 60,
                  bgcolor: 'green',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <LocalOfferIcon sx={{ color: 'white' }} />
              </Box>

              {/* Nội dung voucher */}
              <CardContent sx={{ flex: 1, position: 'relative', pl: 2, pr: 6 }}>
                {/* Nút Chi tiết - góc trên phải */}
                <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
                  <Button
                    size="small"
                    sx={{
                      textTransform: 'none',
                      fontWeight: 500,
                      color: '#1a73e8',
                      padding: 0,
                      minWidth: 'auto',
                    }}
                    onClick={() => handleOpen(voucher)}
                  >
                    Chi tiết
                  </Button>
                </Box>

                {/* Tiêu đề */}
                <Typography variant="subtitle1" fontWeight="bold" mb={0.5}>
                  {voucher.title}
                </Typography>

                {/* Mô tả */}
                <Typography variant="body2" color="text.secondary" mb={1}>
                  {voucher.description}
                </Typography>

                {/* Mã voucher */}
                <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                  <Chip
                    label={voucher.code}
                    size="small"
                    sx={{ bgcolor: '#eee', fontWeight: 'bold' }}
                  />
                </Stack>

                {/* HSD */}
                <Typography variant="caption" color="primary" display="block">
                  HSD: {voucher.expiry}
                </Typography>

                {/* Nút Copy mã - góc dưới phải */}
                <Box sx={{ position: 'absolute', bottom: 8, right: 8 }}>
                  <Button
                    size="small"
                    variant="contained"
                    sx={{ textTransform: 'none' }}
                    onClick={() => navigator.clipboard.writeText(voucher.code)}
                  >
                    Copy mã
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialog xem chi tiết */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>ĐIỀU KIỆN ÁP DỤNG</DialogTitle>
        <DialogContent>
          <Box bgcolor="#fff7ed" p={2} borderRadius={1}>
            <Typography variant="body2" whiteSpace="pre-line" color="text.secondary">
              {selectedVoucher?.details}
            </Typography>
          </Box>
          <Box textAlign="center" mt={3}>
            <Button variant="contained" onClick={() => {
              navigator.clipboard.writeText(selectedVoucher?.code);
              handleClose();
            }}>
              COPY MÃ
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
