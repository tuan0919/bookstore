import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Collapse,
  Divider,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Radio,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { red as redColor } from "@mui/material/colors";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LockIcon from "@mui/icons-material/Lock";
import ReceiptIcon from "@mui/icons-material/Receipt";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import NotificationsIcon from "@mui/icons-material/Notifications";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import RateReviewIcon from "@mui/icons-material/RateReview";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export function ProfileUser() {
  const [openAccount, setOpenAccount] = useState(true);
  const [selected, setSelected] = useState('Hồ sơ cá nhân');
  const [privilegeTab, setPrivilegeTab] = useState(0);

  const accountItems = [
    'Hồ sơ cá nhân',
    'Số địa chỉ',
    'Đổi mật khẩu',
    'Thông tin xuất hóa đơn GTGT',
    'Ưu đãi thành viên',
  ];
  const otherItems = [
    ['Đơn hàng của tôi', <LocalShippingIcon />],
    ['Ví voucher', <CardGiftcardIcon />],
    ['Tài khoản F-Point / Freeship', <LocalOfferIcon />],
    ['Thông Báo', <NotificationsIcon />],
    ['Sản phẩm yêu thích', <FavoriteIcon />],
    ['Sách theo bộ', <MenuBookIcon />],
    ['Nhận xét của tôi', <RateReviewIcon />],
  ];

  const handlePrivilegeChange = (e, newValue) => setPrivilegeTab(newValue);

  return (
    <Box display="flex" bgcolor="#f6f6f6" minHeight="100vh" sx={{ paddingLeft: '140px', paddingRight: '140px' }}>
      {/* Sidebar */}
      <Box width={280} bgcolor="#fff" p={2}>
        <Box textAlign="center" mb={2}>
          <Box component="img" src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/customer/icon_profile_bac.png" alt="badge" width={60} mb={1} />
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
            <ListItemIcon><AccountCircleIcon color="action" /></ListItemIcon>
            <ListItemText primary="Thông tin tài khoản" primaryTypographyProps={{ fontWeight: 'medium', color: accountItems.includes(selected) ? redColor[700] : 'inherit' }} />
            {openAccount ? <ExpandLessIcon sx={{ color: '#d70018' }} /> : <ExpandMoreIcon />}
          </ListItemButton>
          <Collapse in={openAccount} timeout="auto" unmountOnExit>
            <List disablePadding sx={{ pl: 4 }}>
              {accountItems.map(text => (
                <ListItemButton key={text} sx={{ py: 0.5, pl: 0 }} onClick={() => setSelected(text)}>
                  <ListItemText primary={text} primaryTypographyProps={{ fontSize: 14, color: selected === text ? redColor[700] : 'inherit' }} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
          {/* Other menu */}
          {otherItems.map(([text, icon], idx) => (
            <ListItemButton key={idx} sx={{ pl: 1.5 }} onClick={() => setSelected(text)}>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} primaryTypographyProps={{ color: selected === text ? redColor[700] : 'inherit' }} />
            </ListItemButton>
          ))}
        </List>
      </Box>

      {/* Main content */}
      <Box flex={1} p={3}>
        {/* Banner */}
        <Box position="relative" mb={3}>
          <Box component="img" src="https://cdn1.fahasa.com/skin/frontend/ma_vanese/fahasa/images/background_silver.png"
            alt="banner"
            sx={{ width: '100%', borderRadius: 1 }} />
          <Button variant="outlined"
            size="small"
            sx={{ position: 'absolute', top: 16, right: 16, textTransform: 'none', bgcolor: '#fff', borderColor: '#ccc' }}>Thành viên &gt;</Button>
        </Box>

        {/* Ưu đãi và Thành tích */}
        <Grid container spacing={2} mb={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 2 }}>
              <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                Ưu đãi của bạn
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Paper elevation={0} sx={{ p: 2, bgcolor: '#fafafa', borderRadius: 1 }}>
                    <Typography>F-Point hiện có</Typography>
                    <Typography color="error" fontWeight="bold">
                      0
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper elevation={0} sx={{ p: 2, bgcolor: '#fafafa', borderRadius: 1 }}>
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
              <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                Thành tích năm 2025
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Paper elevation={0} sx={{ p: 2, bgcolor: '#fafafa', borderRadius: 1 }}>
                    <Typography>Số đơn hàng</Typography>
                    <Typography color="error" fontWeight="bold">
                      0 đơn hàng
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper elevation={0} sx={{ p: 2, bgcolor: '#fafafa', borderRadius: 1 }}>
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
        {selected === 'Hồ sơ cá nhân' && (
          <Card sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Hồ sơ cá nhân
              </Typography>
              <Grid container spacing={2} direction="column">
                {/* Họ */}
                <Grid item>
                  <Grid container alignItems="center">
                    <Grid item xs={3}>
                      <Typography variant="body2">
                        Họ<span style={{ color: 'red', fontSize: '0.8rem', verticalAlign: 'super' }}>*</span>
                      </Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <TextField fullWidth size="small" defaultValue="Tuấn Hoàng" />
                    </Grid>
                  </Grid>
                </Grid>

                {/* Tên */}
                <Grid item>
                  <Grid container alignItems="center">
                    <Grid item xs={3}>
                      <Typography variant="body2">
                        Tên<span style={{ color: 'red', fontSize: '0.8rem', verticalAlign: 'super' }}>*</span>
                      </Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <TextField fullWidth size="small" defaultValue="Minh" />
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
                        <TextField fullWidth size="small" defaultValue="0987693574" />
                        <Button
                          size="small"
                          sx={{
                            position: 'absolute',
                            right: 8,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            textTransform: 'none'
                          }}
                        >
                          Thay đổi
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>

                {/* Email */}
                <Grid item>
                  <Grid container alignItems="center">
                    <Grid item xs={3}>
                      <Typography variant="body2">Email</Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <Box position="relative">
                        <TextField fullWidth size="small" defaultValue="tuanhoangminh11@gmail.com" />
                        <Button
                          size="small"
                          sx={{
                            position: 'absolute',
                            right: 8,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            textTransform: 'none'
                          }}
                        >
                          Thay đổi
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>

                {/* Giới tính */}
                <Grid item>
                  <Grid container alignItems="center">
                    <Grid item xs={3}>
                      <Typography variant="body2">
                        Giới tính<span style={{ color: 'red', fontSize: '0.8rem', verticalAlign: 'super' }}>*</span>
                      </Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <Box display="flex" alignItems="center" gap={2}>
                        <Box display="flex" alignItems="center" gap={0.5}>
                          <Radio checked sx={{ color: 'red' }} /> Nam
                        </Box>
                        <Box display="flex" alignItems="center" gap={0.5}>
                          <Radio /> Nữ
                        </Box>
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
                          <TextField fullWidth size="small" defaultValue="28" />
                        </Grid>
                        <Grid item xs={4}>
                          <TextField fullWidth size="small" defaultValue="12" />
                        </Grid>
                        <Grid item xs={4}>
                          <TextField fullWidth size="small" defaultValue="2003" />
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
        )}



        {selected === 'Số địa chỉ' && (
          <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">Số địa chỉ</Typography>
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
        )}
        {/* Nội dung động */}
        {selected === 'Đổi mật khẩu' && (
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Đổi mật khẩu</Typography>
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField label="Mật khẩu hiện tại*" placeholder="Mật khẩu hiện tại" fullWidth size="small" />
              <TextField label="Mật khẩu mới*" placeholder="Mật khẩu mới" fullWidth size="small" />
              <TextField label="Nhập lại mật khẩu mới*" placeholder="Nhập lại mật khẩu mới" fullWidth size="small" />
              <Button variant="contained" fullWidth sx={{ bgcolor: '#d70018' }}>Lưu thay đổi</Button>
            </Box>
          </Card>
        )}

        {selected === 'Thông tin xuất hóa đơn GTGT' && (
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Thông tin xuất hóa đơn GTGT</Typography>
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField label="Họ tên người mua hàng" placeholder="Nhập họ tên người mua hàng" fullWidth size="small" />
              <TextField label="Tên công ty" placeholder="Nhập tên công ty" fullWidth size="small" />
              <TextField label="Địa chỉ công ty" placeholder="Nhập địa chỉ công ty" fullWidth size="small" />
              <TextField label="Mã số thuế công ty" placeholder="Nhập mã số thuế" fullWidth size="small" />
              <TextField label="Email nhận hóa đơn" placeholder="Nhập email nhận hóa đơn" fullWidth size="small" />
              <Button variant="contained" fullWidth sx={{ bgcolor: '#d70018' }}>Lưu thay đổi</Button>
            </Box>
          </Card>
        )}
        {selected === 'Ưu đãi thành viên' && (
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Quyền lợi thành viên tại Fahasa.com</Typography>
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
                <li>...</li>
              </Box>
            )}
            {privilegeTab === 2 && (
              <Box component="ul" sx={{ pl: 2 }}>
                <li>Quà tặng sinh nhật: ...</li>
                <li>...</li>
              </Box>
            )}
          </Card>
        )}
      </Box>
    </Box>
  );
}
