import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LoginPopup from "~/components/Popup/login";
import RegisterPopup from "~/components/Popup/register";
import VerifyPopup from "~/components/Popup/verifyOTP"; // Import popup xác minh tài khoản
import { useState, useEffect } from "react";
import { MenuPopper } from "~/components/Popup/menu";
import { useAuthContext } from "~/context/AuthContext";
import { useTranslation } from "react-i18next";
export function ProfileButton() {
  const [isPopupLoginOpen, setPopupLoginOpen] = useState(false);
  const [isPopupRegisterOpen, setPopupRegisterOpen] = useState(false);
  const [isPopupVerifyOpen, setPopupVerifyOpen] = useState(false); // Thêm state cho popup xác minh
  const [email, setEmail] = useState(""); //
  const [password, setPassword] = useState("");
   const [userName, setUserName] = useState<string | null>(localStorage.getItem("userName"));
   const {t} = useTranslation();
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

  useEffect(() => {
    const timer = setInterval(() => {
      const currentName = localStorage.getItem("userName");
      setUserName(currentName);
    }, 100); 

    return () => clearInterval(timer);
  }, []);
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
        {localStorage.getItem("userName") !== null ? (
          <MenuPopper>
            <PersonOutlineOutlinedIcon
              sx={{
                fontSize: 30,
                color: { xs: grey[200], md: grey[600] },
              }}
            />
            <Typography
              variant="body2"
              sx={{
                color: grey[600],
                maxWidth: "50px",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                fontWeight: "light",
                fontSize: "13px",
                display: { xs: "none", md: "block" },
              }}
            >
              {userName}
            </Typography>
          </MenuPopper>
        ) : (
          <>
            <PersonOutlineOutlinedIcon
              sx={{
                fontSize: 30,
                color: { xs: grey[200], md: grey[600] },
              }}
            />
            <Typography
              variant="body2"
              sx={{
                color: grey[600],
                fontWeight: "light",
                fontSize: "13px",
                display: { xs: "none", md: "block" },
              }}
            >
              {t("navbar.buttonLogin.label")}
            </Typography>
          </>
        )}
      </Stack>
      {localStorage.getItem("userName") === null ? (
        <Paper
          className="account-menu"
          sx={{
            position: "absolute",
            top: 50,
            right: 0,
            p: 1,
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
          <Button variant="contained" color="error" onClick={handleOpenPopup}>
           {t("navbar.buttonLogin.login.label")}
          </Button>
          <LoginPopup open={isPopupLoginOpen} onClose={handleClosePopup} />

          <Button
            variant="outlined"
            color="error"
            onClick={handleOpenPopupRegister}
          >
            {t("navbar.buttonLogin.register.label")}
          </Button>
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
        </Paper>
      ) : (
        <div></div>
      )}
    </Box>
  );
}