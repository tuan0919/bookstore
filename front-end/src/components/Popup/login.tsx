import { useState, useRef, useCallback } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";

interface LoginPopupProps {
  open: boolean;
  onClose: () => void;
}

const phoneRegex = /^(0|\+84)(3[2-9]|5[2689]|7[0-9]|8[1-9]|9[0-9])\d{7}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LoginPopup: React.FC<LoginPopupProps> = ({ open, onClose }) => {
  const [mode, setMode] = useState<"login" | "forgotPassword">("login");
  const [accountInfo, setAccountInfo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Dùng useRef để tham chiếu đến TextField
  const accountInputRef = useRef<HTMLInputElement | null>(null);

  const handleChangeAccount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAccountInfo(event.target.value);
    setError(""); // Reset lỗi khi nhập

    // Nếu TextField đang có lỗi, xóa trạng thái lỗi ngay khi user nhập lại
    if (accountInputRef.current) {
      accountInputRef.current.setCustomValidity("");
    }
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setError(""); // Reset lỗi khi nhập
  };

  const handleSubmit = () => {
    if (phoneRegex.test(accountInfo) || emailRegex.test(accountInfo)) {
      console.log("Dữ liệu hợp lệ:", accountInfo);
      setError("");
    } else {
      setError("Vui lòng nhập số điện thoại hoặc email hợp lệ!");

      // Nếu nhập sai, thêm lỗi vào TextField
      if (accountInputRef.current) {
        accountInputRef.current.setCustomValidity("Dữ liệu không hợp lệ");
      }
    }
  };

  const toggleMode = useCallback(() => {
    setMode((prev) => (prev === "login" ? "forgotPassword" : "login"));
  }, []);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {mode === "login" ? "Đăng Nhập" : "Quên Mật Khẩu"}
      </DialogTitle>
      <DialogContent>
        {mode === "login" ? (
          <Box>
            <TextField
              fullWidth
              label="Số điện thoại/ Email"
              placeholder="Nhập số điện thoại hoặc email"
              margin="dense"
              variant="outlined"
              inputRef={accountInputRef} // Gán ref để truy cập
              value={accountInfo}
              onChange={handleChangeAccount}
              error={!!error} // Nếu có lỗi thì bật error
              helperText={error} // Hiển thị lỗi bên dưới TextField
            />
            <TextField
              fullWidth
              label="Mật khẩu"
              type="password"
              placeholder="Nhập mật khẩu"
              margin="dense"
              value={password}
              onChange={handleChangePassword}
            />
            <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={handleSubmit}>
              Đăng nhập
            </Button>
            <Typography
              sx={{ mt: 1, cursor: "pointer", color: "blue" }}
              onClick={toggleMode}
            >
              Quên mật khẩu?
            </Typography>
          </Box>
        ) : (
          <Box sx={{ width: 400 }}>
            <TextField
              fullWidth
              label="Nhập email hoặc số điện thoại để đặt lại mật khẩu"
              margin="dense"
            />
            <Button fullWidth variant="contained" sx={{ mt: 2 }}>
              Gửi yêu cầu
            </Button>
            <Typography
              sx={{ mt: 1, cursor: "pointer", color: "blue" }}
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
