import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Box,
  Button,
  Paper, 
} from "@mui/material";

export default function AddressBook() {
    return (
        <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Sổ địa chỉ</Typography>
          <Button size="small" sx={{ textTransform: 'none', color: '#1976d2' }}>+ Thêm địa chỉ mới</Button>
        </Box>
        {[ 
          { label: 'Địa chỉ thanh toán mặc định', name: 'Hoàng Tuấn', phone: '0987693574', detail: '168A/3 Đường ĐT 743, Khu phố 2, Phường An Phú, Huyện Thuận An, Bình Dương, VN' },
          { label: 'Địa chỉ giao hàng mặc định', name: 'Hoàng Tuấn', phone: '0987693574', detail: '168A/3 Đường ĐT 743, Khu phố 2, Phường An Phú, Huyện Thuận An, Bình Dương, VN' },
          { label: 'Địa chỉ khác', name: 'Hoàng Minh Tuấn', phone: '0987693574', detail: 'Máy nén khí Thịnh Phát, đường ĐT 743, Phường An Phú, Huyện Thuận An, Bình Dương, VN' }
        ].map((addr, i) => (
          <Paper key={i} sx={{ p: 2, mb: 2 }}>
            <Box display="flex" justifyContent="space-between">
              <Typography><strong>{addr.name}</strong> | {addr.phone}</Typography>
              <Box>
                <Button size="small" sx={{ textTransform: 'none', color: '#1976d2' }}>Sửa</Button>
                {i === 2 && <Button size="small" sx={{ ml: 1, color: '#999' }}>Xóa</Button>}
              </Box>
            </Box>
            <Typography variant="body2" color="text.secondary" mb={1}>{addr.detail}</Typography>
            <Typography variant="caption" sx={{ bgcolor: '#e3f2fd', px: 0.5, py: 0.25, borderRadius: 0.5 }}>{addr.label}</Typography>
          </Paper>
        ))}
      </Box>
    );
};
