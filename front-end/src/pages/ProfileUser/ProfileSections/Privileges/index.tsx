import React, { useState } from "react";
import {
    Card,
    Typography,
    Box,
    Tabs,
    Tab,
} from "@mui/material";

/* Ưu đãi thành viên */
export default function Privileges() {
    const [privilegeTab, setPrivilegeTab] = useState(0); // State to manage the selected tab

    const handlePrivilegeChange = (event, newValue) => {
        setPrivilegeTab(newValue); // Update the selected tab value
    };

    return (
        <Card sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
                Quyền lợi thành viên tại Fahasa.com
            </Typography>
            <Tabs value={privilegeTab} onChange={handlePrivilegeChange} sx={{ mb: 2 }}>
                <Tab label="Hạng Bạc" />
                <Tab label="Hạng Vàng" />
                <Tab label="Kim cương" />
            </Tabs>
            {privilegeTab === 0 && (
                <Box component="ul" sx={{ pl: 2 }}>
                    <li>Quà tặng sinh nhật: x</li>
                    <li>Ưu đãi freeship và mã giảm giá: x</li>
                    <li>Tỉ lệ tích lũy F-Point trên giá trị đơn hàng: 0,5%</li>
                </Box>
            )}
            {privilegeTab === 1 && (
                <Box component="ul" sx={{ pl: 2 }}>
                    <li>Quà tặng sinh nhật: ...</li>
                    <li>Ưu đãi freeship và mã giảm giá: ...</li>
                    <li>Tỉ lệ tích lũy F-Point trên giá trị đơn hàng: ...</li>
                </Box>
            )}
            {privilegeTab === 2 && (
                <Box component="ul" sx={{ pl: 2 }}>
                    <li>Quà tặng sinh nhật: ...</li>
                    <li>Ưu đãi freeship và mã giảm giá: ...</li>
                    <li>Tỉ lệ tích lũy F-Point trên giá trị đơn hàng: ...</li>
                </Box>
            )}
        </Card>
    );
};
