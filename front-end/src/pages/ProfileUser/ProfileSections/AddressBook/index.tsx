import React from "react";
import { Typography, Box, Button, Paper } from "@mui/material";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { addUserAddress, getUserAddresses } from "~/api/user/userAddress";
import { AddressResponseDTO } from "~/types/user";
export default function AddressBook() {
  const [open, setOpen] = useState(false);
  const [listAddress, setListAddress] = useState<AddressResponseDTO[]>([]);
  const userDetails = JSON.parse(localStorage.getItem("userDetails") || "{}");
  // console.log("userDetails", userDetails);
  const fetchAddresses = async () => {
    try {
      const addresses = await getUserAddresses();
      setListAddress(addresses.result);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách địa chỉ:", error);
    }
  };
  useEffect(() => {
    fetchAddresses();
    console.log("Kích thước của listAddress:", listAddress);
  }, []);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    const address = {
      unitNumber: formData.get("unitNumber") as string,
      streetNumber: formData.get("streetNumber") as string,
      addressLine1: formData.get("addressLine1") as string,
      addressLine2: formData.get("addressLine2") as string,
      city: formData.get("city") as string,
      region: formData.get("region") as string,
      postalCode: formData.get("postalCode") as string,
    };

    console.log("Data sắp gửi lên API:", address);

    addUserAddress(address)
      .then(() => {
        return fetchAddresses();
      })
      .then(() => {
        handleClose();
      })
      .catch((error) => {
        console.error("Lỗi khi thêm địa chỉ:", error);
      });
  };

  return (
    <Box>
      <Dialog
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            component: "form",
            onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              handleSubmit(event);
              handleClose();
            },
          },
        }}
      >
        <DialogTitle
          textAlign={"center"}
          component={"button"}
          onClick={handleClickOpen}
        >
          Thêm mới địa chỉ giao hàng
        </DialogTitle>
        <DialogContent>
          <TextField
            required
            margin="dense"
            name="fullName"
            label="Họ tên người nhận"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            name="phoneNumber"
            label="Số điện thoại"
            placeholder="Ví dụ: 0979123xxx (10 ký tự số)"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="unitNumber"
            label="Số căn hộ, số phòng hoặc số tầng (nếu có)"
            placeholder="Ví dụ: A1, Tầng 2, Phòng 201"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="streetNumber"
            label="Số đường (nếu có)"
            placeholder="Ví dụ: 168A/3"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            name="addressLine1"
            label="Địa chỉ nhận hàng"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="addressLine2"
            label="Địa chỉ bổ sung (nếu có)"
            placeholder="Ví dụ: Tên tòa nhà, khu dân cư, v.v."
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            name="city"
            label="Thành phố"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            name="region"
            label="Khu vực"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="postalCode"
            label="Mã bưu điện"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="outlined"
            disableFocusRipple
            disableTouchRipple
            disableRipple
          >
            Hủy
          </Button>
          <Button
            variant="contained"
            type="submit"
            disableFocusRipple
            disableTouchRipple
            disableRipple
          >
            Lưu địa chỉ
          </Button>
        </DialogActions>
      </Dialog>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6">Sổ địa chỉ</Typography>
        <Button
          size="small"
          sx={{ textTransform: "none", color: "#1976d2" }}
          onClick={handleClickOpen}
        >
          + Thêm địa chỉ mới
        </Button>
      </Box>
      {listAddress.length > 0
        ? listAddress.map((addr, index) => (
            <Paper key={index} sx={{ p: 2, mb: 2 }}>
              <Box display="flex" justifyContent="space-between">
                {userDetails?.fullName && userDetails?.phoneNum && (
                  <Typography>
                    <strong>{userDetails.fullName}</strong> |{" "}
                    {userDetails.phoneNum}
                  </Typography>
                )}
                <Box>
                  <Button
                    size="small"
                    sx={{ textTransform: "none", color: "#1976d2" }}
                  >
                    Sửa
                  </Button>
                  {addr.default !== true && (
                    <Button size="small" sx={{ ml: 1, color: "#999" }}>
                      Xóa
                    </Button>
                  )}
                </Box>
              </Box>
              <Typography variant="body2" color="text.secondary" mb={1}>
                {addr.address.addressLine1}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  bgcolor: "#e3f2fd",
                  px: 0.5,
                  py: 0.25,
                  borderRadius: 0.5,
                }}
              >
                {addr.default ? "Địa chỉ thanh toán mặc định" : "Địa chỉ khác"}
              </Typography>
            </Paper>
          ))
        : null}
    </Box>
  );
}
