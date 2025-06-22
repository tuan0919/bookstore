import React, { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    Typography,
    Grid,
    TextField,
    Button,
    Box,
    Paper,
} from "@mui/material";
import { addUserDetails, getUserDetails } from "~/api/user/userDetails";

export default function PersonalProfile() {
    const initialUserDetails = JSON.parse(localStorage.getItem("userDetails") || "{}");

    const [userDetails, setUserDetails] = useState({
        fullName: initialUserDetails.fullName || "",
        phoneNum: initialUserDetails.phoneNum || "",
        dateOfBirth: initialUserDetails.dateOfBirth || "00-00-0000",
    });

    const [formData, setFormData] = useState({
        fullName: userDetails.fullName,
        phoneNum: userDetails.phoneNum,
        day: "",
        month: "",
        year: "",
    });

    
    useEffect(() => {
        if (userDetails?.dateOfBirth) {
            const [day, month, year] = userDetails.dateOfBirth.split("-");
            setFormData(prev => ({ ...prev, day, month, year }));
        }
    }, [userDetails]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = async () => {
        const { fullName, phoneNum, day, month, year } = formData;
        const dateOfBirth = `${day}-${month}-${year}`;
        const result = await addUserDetails(fullName, phoneNum, dateOfBirth);
        const userDetails = (await getUserDetails()).result;
        if (result.code === 1000) {
            localStorage.setItem("userDetails", JSON.stringify(userDetails));
            setUserDetails(userDetails); 
            alert("Cập nhật thành công!");
        } else {
            alert("Cập nhật thất bại. Vui lòng thử lại.");
        }
    };

    return (
        <form>
            {/* Banner */}
            <Box position="relative" mb={3}>
                <Box
                    component="img"
                    src="https://cdn1.fahasa.com/skin/frontend/ma_vanese/fahasa/images/background_silver.png"
                    alt="banner"
                    sx={{ width: "100%", borderRadius: 1 }}
                />
                <Button
                    variant="outlined"
                    size="small"
                    sx={{
                        position: "absolute",
                        top: 16,
                        right: 16,
                        textTransform: "none",
                        bgcolor: "#fff",
                        borderColor: "#ccc",
                    }}
                >
                    Thành viên &gt;
                </Button>
            </Box>

            {/* Ưu đãi & Thành tích */}
            <Grid container spacing={2} mb={3}>
                <Grid item xs={12} md={6}>
                    <Card sx={{ p: 2 }}>
                        <Typography variant="subtitle1" fontWeight={500} gutterBottom>
                            Ưu đãi của bạn
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Paper elevation={0} sx={{ p: 2, bgcolor: "#fafafa", borderRadius: 1 }}>
                                    <Typography>F-Point hiện có</Typography>
                                    <Typography color="error" fontWeight="bold">
                                        0
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={6}>
                                <Paper elevation={0} sx={{ p: 2, bgcolor: "#fafafa", borderRadius: 1 }}>
                                    <Typography>Freeship hiện có</Typography>
                                    <Typography color="error" fontWeight="bold">
                                        0 lần
                                    </Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card sx={{ p: 2 }}>
                        <Typography variant="subtitle1" fontWeight={500} gutterBottom>
                            Thành tích năm 2025
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Paper elevation={0} sx={{ p: 2, bgcolor: "#fafafa", borderRadius: 1 }}>
                                    <Typography>Số đơn hàng</Typography>
                                    <Typography color="error" fontWeight="bold">
                                        0 đơn hàng
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={6}>
                                <Paper elevation={0} sx={{ p: 2, bgcolor: "#fafafa", borderRadius: 1 }}>
                                    <Typography>Đã thanh toán</Typography>
                                    <Typography color="error" fontWeight="bold">
                                        0 đ
                                    </Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            </Grid>

            {/* Hồ sơ cá nhân */}
            <Card sx={{ p: 3, maxWidth: 1200, mx: "auto" }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Hồ sơ cá nhân
                    </Typography>
                    <Grid container spacing={2} direction="column">
                        {/* Họ và tên */}
                        <Grid item>
                            <Grid container alignItems="center">
                                <Grid item xs={3}>
                                    <Typography variant="body2">
                                        Họ và tên<span style={{ color: "red" }}>*</span>
                                    </Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>

                        {/* Số điện thoại */}
                        <Grid item>
                            <Grid container alignItems="center">
                                <Grid item xs={3}>
                                    <Typography variant="body2">Số điện thoại</Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <Box position="relative">
                                        <TextField
                                            fullWidth
                                            size="small"
                                            name="phoneNum"
                                            value={formData.phoneNum}
                                            onChange={handleChange}
                                        />
                                        <Button
                                            size="small"
                                            sx={{
                                                position: "absolute",
                                                right: 8,
                                                top: "50%",
                                                transform: "translateY(-50%)",
                                            }}
                                        >
                                            Thay đổi
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>

                        {/* Birthday */}
                        <Grid item>
                            <Grid container alignItems="center">
                                <Grid item xs={3}>
                                    <Typography variant="body2">
                                        Birthday<span style={{ color: 'red', fontSize: '0.8rem', verticalAlign: 'super' }}>*</span>
                                    </Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={4}>
                                            <TextField
                                                fullWidth
                                                size="small"
                                                name="day"
                                                value={formData.day}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField
                                                fullWidth
                                                size="small"
                                                name="month"
                                                value={formData.month}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField
                                                fullWidth
                                                size="small"
                                                name="year"
                                                value={formData.year}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        {/* Nút lưu */}
                        <Grid item>
                            <Box textAlign="center" mt={2}>
                                <Button
                                    variant="contained"
                                    onClick={handleSave}
                                    sx={{
                                        bgcolor: "#d70018",
                                        textTransform: "none",
                                        px: 6,
                                        py: 1.5,
                                    }}
                                >
                                    Lưu thay đổi
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </form>
    );
}
