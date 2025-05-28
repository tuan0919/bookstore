import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { grey, red } from "@mui/material/colors";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LoginPopup from "~/components/Popup/login";
import RegisterPopup from "~/components/Popup/register";
import VerifyPopup from "~/components/Popup/verifyOTP"; // Import popup xác minh tài khoản
import { useState } from "react";
import { useAuthContext } from "~/context/AuthContext";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

export function ProfileButton() {
  const [isPopupLoginOpen, setPopupLoginOpen] = useState(false);
  const [isPopupRegisterOpen, setPopupRegisterOpen] = useState(false);
  const [isPopupVerifyOpen, setPopupVerifyOpen] = useState(false); // Thêm state cho popup xác minh
  const [email, setEmail] = useState(""); //
  const [password, setPassword] = useState("");
  const { jwtToken } = useAuthContext();
  // Mở popup login
  const handleOpenPopup = () => {
    setPopupLoginOpen(true);
  };

  // Đóng popup login
  const handleClosePopup = () => {
    setPopupLoginOpen(false);
  };

  // Mở popup register
  const handleOpenPopupRegister = () => {
    setPopupRegisterOpen(true);
  };

  // Đóng popup register
  const handleClosePopupRegister = () => {
    setPopupRegisterOpen(false);
  };

  // Mở popup xác minh tài khoản

  // Đóng popup xác minh tài khoản
  const handleClosePopupVerify = () => {
    setPopupVerifyOpen(false);
  };

  // Xử lý khi đăng ký thành công
  const handleRegisterSuccess = (userEmail: string, userPassword: string) => {
    setEmail(userEmail);
    setPassword(userPassword);
    setPopupRegisterOpen(false); // Đóng popup đăng ký
    setPopupVerifyOpen(true); // Mở popup xác minh
  };

  return (
    <Box sx={{ position: "relative" }}>
      <Stack
        id="profile-button"
        role="button"
        aria-haspopup="true"
        sx={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          "&:hover ~ .account-menu": {
            opacity: 1,
            visibility: "visible",
          },
        }}
      >
        <PersonOutlineOutlinedIcon
          sx={{ fontSize: 30, color: { xs: grey[200], md: grey[600] } }}
        />
        <Typography
          sx={{
            color: grey[600],
            fontWeight: "light",
            fontSize: "13px",
            display: { xs: "none", md: "block" },
          }}
        >
          Tài khoản
        </Typography>
      </Stack>

      <Paper
        className="account-menu"
        sx={{
          position: "absolute",
          top: 50,
          right: 0,
          width: 200,
          bgcolor: "white",
          borderRadius: 1,
          display: "flex",
          gap: 1,
          opacity: 0,
          flexDirection: "column",
          boxShadow: "0px 2px 8px rgba(0,0,0,0.32)",
          zIndex: 10,
          visibility: "hidden",
          "&:hover": {
            opacity: 1,
            visibility: "visible",
          },
        }}
      >
        <>
          {!jwtToken ? (
            <Box sx={{ p: 1, display: "grid", gap: 1 }}>
              <Button
                variant="contained"
                color="error"
                onClick={handleOpenPopup}
              >
                Đăng nhập
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={handleOpenPopupRegister}
              >
                Đăng ký
              </Button>
            </Box>
          ) : (
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  justifyContent: "center",
                  p: 1,
                  mt: 1,
                }}
              >
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  startIcon={<AccountCircleOutlinedIcon />}
                >
                  Xem trang cá nhân
                </Button>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  cursor: "pointer",
                  p: 1,
                  ":hover": {
                    backgroundColor: grey["100"],
                  },
                }}
              >
                <ReceiptOutlinedIcon fontSize="small" />
                <Typography fontWeight={"light"}>Đơn hàng của tôi</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  cursor: "pointer",
                  p: 1,
                  ":hover": {
                    backgroundColor: grey["100"],
                  },
                }}
              >
                <FavoriteBorderOutlinedIcon fontSize="small" />
                <Typography fontWeight={"light"}>Danh sách ưa thích</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  cursor: "pointer",
                  p: 1,
                  ":hover": {
                    backgroundColor: grey["100"],
                  },
                }}
              >
                <LogoutOutlinedIcon
                  fontSize="small"
                  sx={{ color: red["400"] }}
                />
                <Typography fontWeight={"light"} sx={{ color: red["400"] }}>
                  Đăng xuất
                </Typography>
              </Box>
            </>
          )}
        </>
      </Paper>
      <LoginPopup open={isPopupLoginOpen} onClose={handleClosePopup} />
      <RegisterPopup
        open={isPopupRegisterOpen}
        onClose={handleClosePopupRegister}
        onRegisterSuccess={handleRegisterSuccess}
      />
      <VerifyPopup
        open={isPopupVerifyOpen}
        onClose={handleClosePopupVerify}
        onBackToRegister={handleOpenPopupRegister}
        email={email}
        password={password}
      />
    </Box>
  );
}
