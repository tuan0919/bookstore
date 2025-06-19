import { useNavigate } from "react-router-dom";
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
  Badge, 
} from "@mui/material";
import { AccountCircle, ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  LocalShipping,
  ConfirmationNumber,
  LocalOffer,
  Notifications,
  Favorite,
  MenuBook,
  RateReview,
} from "@mui/icons-material";
import { red } from "@mui/material/colors";

export default function SidebarMenu({
  selected,
  setSelected,
  openAccount,
  setOpenAccount,
  currentPath,
}) {
  const navigate = useNavigate();

  const handleClick = (path: string) => {
    navigate(`/profileUser/${path}`);
  };
  const accountItems = [
    { label: "Hồ sơ cá nhân", path: "info/account" },
    { label: "Sổ địa chỉ", path: "info/address" },
    { label: "Đổi mật khẩu", path: "info/password" },
    { label: "Thông tin xuất hóa đơn GTGT", path: "info/invoice" },
    { label: "Ưu đãi thành viên", path: "info/privileges" },
  ];

  const voucherCount = 6;

  const otherItems = [
    {label: "Đơn hàng của tôi",icon: <LocalShipping />, path:"orders"},
    {
      label: "Ví voucher",
      icon: (
        <Badge badgeContent={voucherCount} color="error">
          <ConfirmationNumber />
        </Badge>
      ),
      path: "vouchers",
    },    
    {label: "Tài khoản F-Point / Freeship",icon: <LocalOffer />, path:"account-fpoint"},
    {label: "Thông Báo",icon: <Notifications />, path:"notifications"},
    {label: "Sản phẩm yêu thích",icon: <Favorite />, path:"wishlist"},
    {label: "Sách theo bộ",icon: <MenuBook />, path:"book-series"},
    {label: "Nhận xét của tôi",icon: <RateReview />, path:"review"},
  ];

  return (
    <Box width={280} bgcolor="#fff" p={2}>
      <Box textAlign="center" mb={2}>
        <Box
          component="img"
          src="https://cdn1.fahasa.com/skin/frontend/ma_vanese/fahasa/images/icon_rank_silver.png"
          alt="badge"
          width={60}
          mb={1}
        />
        <Typography variant="h6" fontWeight="bold">
          Tuấn Hoàng Minh
        </Typography>
        <Button
          variant="outlined"
          size="small"
          disableElevation
          sx={{
            textTransform: "none",
            color: "#666",
            borderColor: "#ccc",
            borderRadius: 10,
            mt: 0.5,
          }}
        >
          Thành viên Bạc
        </Button>
        <Typography variant="caption" display="block" mt={1}>
          F-Point tích lũy 0
        </Typography>
        <Typography variant="caption" display="block">
          Thêm 30.000 để nâng hạng Vàng
        </Typography>
      </Box>
      <Divider />
      <List disablePadding>
        {/* Account info expand */}
        <ListItemButton
          onClick={() => setOpenAccount(!openAccount)}
          sx={{ pl: 1.5 }}
        >
          <ListItemIcon>
            <AccountCircle color="action" />
          </ListItemIcon>
          <ListItemText
            primary="Thông tin tài khoản"
            primaryTypographyProps={{
              fontWeight: "medium",
              color: accountItems.includes(selected) ? red[700] : "inherit",
            }}
          />
          {openAccount ? (
            <ExpandLess sx={{ color: "#d70018" }} />
          ) : (
            <ExpandMore />
          )}
        </ListItemButton>
        <Collapse in={openAccount} timeout="auto" unmountOnExit>
          <List disablePadding sx={{ pl: 4 }}>
            {accountItems.map((item) => (
              <ListItemButton
                key={item.path}
                sx={{ py: 0.5, pl: 0 }}
                onClick={() => {
                  setSelected(item.label);
                  handleClick(item.path);
                }}
              >
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: 14,
                    color: selected === item.label ? red[700] : "inherit",
                  }}
                />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
        {/* Other menu */}
        {otherItems.map((item, idx) => (
          <ListItemButton
            key={idx}
            sx={{ pl: 1.5 }}
            onClick={() => {
                setSelected(item.label)
                handleClick(item.path)
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{
                color: selected === item.label ? red[700] : "inherit",
              }}
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
