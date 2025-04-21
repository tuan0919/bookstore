import React from "react";
import {
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Collapse,
    Divider,
    Button,
    Box,
    Typography,
} from "@mui/material";
import {
    AccountCircle,
    ExpandLess,
    ExpandMore,
} from "@mui/icons-material";
import {
    LocalShipping,
    CardGiftcard,
    LocalOffer,
    Notifications,
    Favorite,
    MenuBook,
    RateReview,
} from "@mui/icons-material";
import { red } from "@mui/material/colors";

export default function SidebarMenu({ selected, setSelected, openAccount, setOpenAccount }) {
    const accountItems = [
        'Hồ sơ cá nhân',
        'Sổ địa chỉ',
        'Đổi mật khẩu',
        'Thông tin xuất hóa đơn GTGT',
        'Ưu đãi thành viên',
    ];

    const otherItems = [
        ['Đơn hàng của tôi', <LocalShipping />],
        ['Ví voucher', <CardGiftcard />],
        ['Tài khoản F-Point / Freeship', <LocalOffer />],
        ['Thông Báo', <Notifications />],
        ['Sản phẩm yêu thích', <Favorite />],
        ['Sách theo bộ', <MenuBook />],
        ['Nhận xét của tôi', <RateReview />],
    ];

    return (
        <Box width={280} bgcolor="#fff" p={2}>
            <Box textAlign="center" mb={2}>
                <Box component="img" src="https://cdn1.fahasa.com/skin/frontend/ma_vanese/fahasa/images/icon_rank_silver.png" alt="badge" width={60} mb={1} />
                <Typography variant="h6" fontWeight="bold">Tuấn Hoàng Minh</Typography>
                <Button variant="outlined" size="small" disableElevation sx={{ textTransform: 'none', color: '#666', borderColor: '#ccc', borderRadius: 10, mt: 0.5 }}>
                    Thành viên Bạc
                </Button>
                <Typography variant="caption" display="block" mt={1}>F-Point tích lũy 0</Typography>
                <Typography variant="caption" display="block">Thêm 30.000 để nâng hạng Vàng</Typography>
            </Box>
            <Divider />
            <List disablePadding>
                {/* Account info expand */}
                <ListItemButton onClick={() => setOpenAccount(!openAccount)} sx={{ pl: 1.5 }}>
                    <ListItemIcon><AccountCircle color="action" /></ListItemIcon>
                    <ListItemText primary="Thông tin tài khoản" primaryTypographyProps={{ fontWeight: 'medium', color: accountItems.includes(selected) ? red[700] : 'inherit' }} />
                    {openAccount ? <ExpandLess sx={{ color: '#d70018' }} /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openAccount} timeout="auto" unmountOnExit>
                    <List disablePadding sx={{ pl: 4 }}>
                        {accountItems.map(text => (
                            <ListItemButton key={text} sx={{ py: 0.5, pl: 0 }} onClick={() => setSelected(text)}>
                                <ListItemText primary={text} primaryTypographyProps={{ fontSize: 14, color: selected === text ? red[700] : 'inherit' }} />
                            </ListItemButton>
                        ))}
                    </List>
                </Collapse>
                {/* Other menu */}
                {otherItems.map(([text, icon], idx) => (
                    <ListItemButton key={idx} sx={{ pl: 1.5 }} onClick={() => setSelected(text)}>
                        <ListItemIcon>{icon}</ListItemIcon>
                        <ListItemText primary={text} primaryTypographyProps={{ color: selected === text ? red[700] : 'inherit' }} />
                    </ListItemButton>
                ))}
            </List>
        </Box>
    );
}
