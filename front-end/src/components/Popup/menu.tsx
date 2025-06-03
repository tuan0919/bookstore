import Tippy from "@tippyjs/react/headless"; // Dùng headless để tùy biến giao diện
import "tippy.js/dist/tippy.css";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { Receipt, Person, MenuBook, Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
export function MenuPopper({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  return (
    <Tippy
      interactive
      delay={[0, 300]}
      placement="bottom-end"
      hideOnClick={true}
      render={(attrs) => (
        <Box
          {...attrs}
          sx={{
            backgroundColor: "#fff",
            boxShadow: 3,
            borderRadius: 2,
            p: 1,
            minWidth: 250,
            overflow: "hidden",
          }}
        >
          <List disablePadding>
            <ListItemButton onClick={() => navigate("/profileUser")}>
              <ListItemIcon>
                <Person color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography fontWeight={500}>Thông tin cá nhân</Typography>
                }
              />
            </ListItemButton>

            <ListItemButton onClick={() => navigate("/profileUser/orders")}>
              <ListItemIcon>
                <Receipt color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography fontWeight={500}>Đơn hàng của t</Typography>
                }
              />
            </ListItemButton>

            <ListItemButton
              onClick={() => navigate("/profileUser/book-series")}
            >
              <ListItemIcon>
                <MenuBook color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography fontWeight={500}>Bộ sách của t</Typography>
                }
              />
            </ListItemButton>

            <ListItemButton
              onClick={() => {
                localStorage.clear();
                navigate("/");
              }}
            >
              <ListItemIcon>
                <Logout color="error" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography fontWeight={500} color="error">
                    Đăng xuất
                  </Typography>
                }
              />
            </ListItemButton>
          </List>
        </Box>
      )}
    >
      <Stack
        sx={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        {children}
      </Stack>
    </Tippy>
  );
}
