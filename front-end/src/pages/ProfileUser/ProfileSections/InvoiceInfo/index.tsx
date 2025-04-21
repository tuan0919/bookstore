import React, { useState } from "react";
import {
    Card,
    Typography,
    Box,
    TextField,
    Button,
} from "@mui/material";

/* Thông tin xuất hóa đơn GTGT */
export default function InvoiceInfo() {
    const [formData, setFormData] = useState({
        name: '',
        companyName: '',
        companyAddress: '',
        taxCode: '',
        email: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = () => {
        // Handle form submission (e.g., send data to API)
        console.log('Form data:', formData);
    };

    return (
        <Card sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
                Thông tin xuất hóa đơn GTGT
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
                <TextField
                    label="Họ tên người mua hàng"
                    placeholder="Nhập họ tên người mua hàng"
                    fullWidth
                    size="small"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                />
                <TextField
                    label="Tên công ty"
                    placeholder="Nhập tên công ty"
                    fullWidth
                    size="small"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                />
                <TextField
                    label="Địa chỉ công ty"
                    placeholder="Nhập địa chỉ công ty"
                    fullWidth
                    size="small"
                    name="companyAddress"
                    value={formData.companyAddress}
                    onChange={handleInputChange}
                />
                <TextField
                    label="Mã số thuế công ty"
                    placeholder="Nhập mã số thuế"
                    fullWidth
                    size="small"
                    name="taxCode"
                    value={formData.taxCode}
                    onChange={handleInputChange}
                />
                <TextField
                    label="Email nhận hóa đơn"
                    placeholder="Nhập email nhận hóa đơn"
                    fullWidth
                    size="small"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                />
                <Button
                    variant="contained"
                    fullWidth
                    sx={{ bgcolor: '#d70018' }}
                    onClick={handleSubmit}
                >
                    Lưu thay đổi
                </Button>
            </Box>
        </Card>
    );
};
