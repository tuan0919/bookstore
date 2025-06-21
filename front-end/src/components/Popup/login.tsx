import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Typography,
  Box,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuthContext } from "~/context/AuthContext";
import {getUserDetails} from "~/api/user/userDetails";
import { login } from "~/api/login";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
interface LoginPopupProps {
  open: boolean;
  onClose: () => void;
}

// const phoneRegex = /^(0|\+84)(3[2-9]|5[2689]|7[0-9]|8[1-9]|9[0-9])\d{7}$/;
// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LoginPopup: React.FC<LoginPopupProps> = ({ open, onClose }) => {
  const [mode, setMode] = useState<"login" | "forgotPassword">("login");
  const [accountInfo, setAccountInfo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isValidAccount, setIsValidAccount] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const loginButtonRef = useRef<HTMLButtonElement | null>(null);
  const forgotPasswordButtonRef = useRef<HTMLButtonElement | null>(null);
  const { setJwtToken } = useAuthContext();
  const navigate = useNavigate();
  const { t } = useTranslation();
  // Cập nhập lại data account khi người dùng nhập và reset lỗi
  const handleChangeAccount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAccountInfo(event.target.value);
    setError(""); // Reset lỗi khi nhập
  };

  //  Kiểm tra account khi người dùng rời khỏi input
  const handleBlurAccount = () => {
    if (!accountInfo) {
      setError("Trường này không được để trống!");
      setIsValidAccount(false);
      return;
    }
    setError("");
    setIsValidAccount(true);
    // if (phoneRegex.test(accountInfo) || emailRegex.test(accountInfo)) {
    //   setError("");
    //   setIsValidAccount(true);
    // } else {
    //   setError("Vui lòng nhập số điện thoại hoặc email hợp lệ!");
    //   setIsValidAccount(false);
    // }
  };
  //  Kiểm tra password khi rời khỏi input
  const handleBlurPassword = () => {
    if (!password) {
      setPasswordError("Mật khẩu không được để trống!");
      setIsValidPassword(false);
    } else {
      setPasswordError("");
      setIsValidPassword(true);
    }
  };
  // Cập nhập lại data password khi người dùng nhập và reset lỗi
  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordError("");
    setPassword(event.target.value);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  // Reset dữ liệu khi đóng popup
  useEffect(() => {
    if (!open) {
      setMode("login");
      setAccountInfo("");
      setPassword("");
      setError("");
      setPasswordError("");
      setIsValidAccount(false);
      setIsValidPassword(false);
    }
  }, [open]);
  // Bật/tắt nút login khi account và password hợp lệ
  useEffect(() => {
    if (loginButtonRef.current) {
      loginButtonRef.current.disabled = !(isValidAccount && isValidPassword);
    }
    if (forgotPasswordButtonRef.current) {
      forgotPasswordButtonRef.current.disabled = !isValidAccount;
    }
  }, [isValidAccount, isValidPassword]);

  //  Khi đổi mode, reset dữ liệu
  const toggleMode = () => {
    setMode((prev) => {
      const newMode = prev === "login" ? "forgotPassword" : "login";
      setAccountInfo("");
      setPassword("");
      setError("");
      setPasswordError("");
      setIsValidAccount(false);
      setIsValidPassword(false);
      return newMode;
    });
  };
  // Xử lý đăng nhập thành công
  const handleProccessLogin = async () => {
    try {
      const response = await login(accountInfo, password);
      
      if (response.code === 1000) {
        setError("");
         setJwtToken(response.result);
      
        const userName = jwtDecode(JSON.stringify(response.result)).sub;
        if (userName !== undefined && userName !== "") {
          localStorage.setItem("userName", userName);
          localStorage.setItem("access_token", response.result);
             const userDetails = await getUserDetails();
          localStorage.setItem("userDetails", JSON.stringify(userDetails.result));
          navigate("/");
        }
        // Lưu thông tin chi tiết người dùng vào localStorage
        const userDetails = await getUserDetails();
        localStorage.setItem("userDetails", JSON.stringify(userDetails.result));
        onClose();
      } else {
        setError(
          "Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin."
        );
      }
    } catch (error) {
      console.error("Đăng nhập thất bại:", error);
      setError("Lỗi đăng nhập.");
    }
  };
  // Xử lý lấy lại mật khẩu
  const handleProccessGetPassword = () => {};
  return (
    
    <Dialog open={open} onClose={onClose}>
      <DialogTitle
        textAlign={"center"}
        color="#c92127"
        fontFamily={"sans-serif"}
      >
        {mode === "login" ? `${t('navbar.buttonLogin.login.popup.item1')}` : `${t('navbar.buttonLogin.login.popup.item4')}`}
      </DialogTitle>
      <DialogContent>
        {mode === "login" ? (
          <Box>
            <TextField
              fullWidth
              label={t('navbar.buttonLogin.login.popup.item2')}
             
              margin="dense"
              variant="outlined"
              value={accountInfo}
              onChange={handleChangeAccount}
              onBlur={handleBlurAccount}
              error={!!error}
              helperText={error}
            />
            <TextField
              margin="dense"
              value={password}
              onChange={handleChangePassword}
              onBlur={handleBlurPassword}
              type={showPassword ? "text" : "password"}
              error={!!passwordError}
              helperText={passwordError}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showPassword ? "Ẩn mật khẩu" : "Hiển thị mật khẩu"
                        }
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              label={t('navbar.buttonLogin.login.popup.item3')}
              fullWidth
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2, backgroundColor: "#c92127", color: "#fff" }}
              onClick={handleProccessLogin}
              disabled={!isValidAccount || !isValidPassword} //  Vô hiệu hóa nếu tài khoản chưa hợp lệ
            >
              {t('navbar.buttonLogin.login.popup.item1')}
            </Button>
            <Typography
              sx={{ mt: 1, cursor: "pointer", color: "#c92127" }}
              onClick={toggleMode}
            >
              {t('navbar.buttonLogin.login.popup.item4')}
            </Typography>
          </Box>
        ) : (
          <Box sx={{ width: 400 }}>
            <TextField
              fullWidth
              label="Số điện thoại/ Email"
              placeholder="Nhập email hoặc số điện thoại để đặt lại mật khẩu"
              margin="dense"
              value={accountInfo}
              onChange={handleChangeAccount}
              onBlur={handleBlurAccount}
              error={!!error}
              helperText={error}
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2, backgroundColor: "#c92127", color: "#fff" }}
              onClick={handleProccessGetPassword}
              disabled={!isValidAccount} // Vô hiệu hóa nếu tài khoản chưa hợp lệ
            >
              Gửi yêu cầu
            </Button>
            <Typography
              sx={{ mt: 1, cursor: "pointer", color: "#c92127" }}
              onClick={toggleMode}
            >
              Quay lại đăng nhập
            </Typography>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LoginPopup;
