import React from "react";
import {
    Card,
    CardContent,
    Typography,
    Grid,
    TextField,
    Box,
    Button,
} from "@mui/material";

export default function ChangePassword() {
    return (
        <Card sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Đổi mật khẩu</Typography>
            <Box display="flex" flexDirection="column" gap={2}>
                <TextField label="Mật khẩu hiện tại*" placeholder="Mật khẩu hiện tại" fullWidth size="small" />
                <TextField label="Mật khẩu mới*" placeholder="Mật khẩu mới" fullWidth size="small" />
                <TextField label="Nhập lại mật khẩu mới*" placeholder="Nhập lại mật khẩu mới" fullWidth size="small" />
                <Button variant="contained" fullWidth sx={{ bgcolor: '#d70018' }}>Lưu thay đổi</Button>
            </Box>
        </Card>
    );
};

