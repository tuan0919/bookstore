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
} from "@mui/material";
import { AccountCircle, ExpandLess, ExpandMore } from "@mui/icons-material";
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
import { useTranslation } from "react-i18next";
export default function SidebarMenu({
  selected,
  setSelected,
  openAccount,
  setOpenAccount,
  currentPath,
}) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleClick = (path: string) => {
    navigate(`/profileUser/${path}`);
  };
  const accountItems = [
    { label: `${(t('page.profileUser.profileSection.acccountItem.item1'))}`, path: "info/account" },
    { label: `${(t('page.profileUser.profileSection.acccountItem.item2'))}`, path: "info/address" },
    { label: `${(t('page.profileUser.profileSection.acccountItem.item3'))}`, path: "info/password" },
    { label: `${(t('page.profileUser.profileSection.acccountItem.item4'))}`, path: "info/invoice" },
    { label: `${(t('page.profileUser.profileSection.acccountItem.item5'))}`, path: "info/privileges" },
  ];

  const otherItems = [
    {label: `${(t('page.profileUser.profileSection.otherItem.item1'))}`,icon: <LocalShipping />, path:"orders"},
    {label: `${(t('page.profileUser.profileSection.otherItem.item2'))}`,icon: <CardGiftcard />, path:"vouchers"},
    {label: `${(t('page.profileUser.profileSection.otherItem.item3'))}`,icon: <LocalOffer />, path:"account-fpoint"},
    {label: `${(t('page.profileUser.profileSection.otherItem.item4'))}`,icon: <Notifications />, path:"notifications"},
    {label: `${(t('page.profileUser.profileSection.otherItem.item5'))}`,icon: <Favorite />, path:"wishlist"},
    {label: `${(t('page.profileUser.profileSection.otherItem.item6'))}`,icon: <MenuBook />, path:"book-series"},
    {label: `${(t('page.profileUser.profileSection.otherItem.item7'))}`,icon: <RateReview />, path:"review"},
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
            primary={t('page.profileUser.profileSection.otherItem.item0')}
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
