import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  InputBase,
  Link,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import { grey, yellow } from "@mui/material/colors";
import { BottomDrawer } from "./BottomDrawer";
import cashOnDelivery from "~/assets/ico_cashondelivery.svg";
import cashWithPaypal from "~/assets/paypal.svg";
import cashWithVNPay from "~/assets/ico_vnpay.svg";
import discountIcon from "~/assets/ico_promotion.svg";
import React from "react";
import { CartItemPropertyResponseDTO } from "~/types/cart";
import { useState, useEffect } from "react";
import { addUserAddress, getUserAddresses } from "~/api/user/userAddress";
import { AddressResponseDTO } from "~/types/user";
import { useTranslation } from "react-i18next";
import {addUserDetails, getUserDetails} from "~/api/user/userDetails";
const Section = styled(Box)(({ theme }) => ({
  backgroundColor: "white",
  padding: `0 ${theme.spacing(2)}`,
  margin: `${theme.spacing(2)} ${theme.spacing(0)}`,
}));

const UnderlineBox = styled(Box)(({ theme }) => ({
  borderBottom: `1px ${grey["A400"]} solid`,
  padding: `${theme.spacing(1)} 0`,
}));

const RadioLabel = styled(Typography)(() => ({
  fontSize: "14px",
  fontWeight: 400,
}));

const SmallRadio = styled((props) => (
  <Radio
    size="small"
    disableTouchRipple
    disableFocusRipple
    disableRipple
    {...props}
  />
))(() => ({}));

const SpecialRadio = styled((props) => (
  <Radio
    size="small"
    disableTouchRipple
    disableFocusRipple
    disableRipple
    checkedIcon={<ControlPointRoundedIcon />}
    {...props}
  />
))(() => ({}));

export function Checkout() {
  const [open, setOpen] = React.useState(false);
  const [openDiscount, setOpenDiscount] = React.useState(false);
  const selectBooks = JSON.parse(localStorage.getItem("selectedBooks") || "[]");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [listAddress, setListAddress] = useState<AddressResponseDTO[]>([]);
  const { t } = useTranslation();
  const [userDetails, setUserDetails] = useState(() => {
  return JSON.parse(localStorage.getItem("userDetails") || "{}");
});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const totalPrice = selectBooks.reduce(
    (sum: number, book: CartItemPropertyResponseDTO) =>
      sum + book.discountedPrice * book.quantity,
    0
  );
  const fetchAddresses = async () => {
    try {
      const addresses = await getUserAddresses();
      setListAddress(addresses.result);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách địa chỉ:", error);
    }
  };
  // Lấy danh sách địa chỉ giao hàng
  useEffect(() => {
    fetchAddresses();
  }, []);



  // Xử lý thêm mới địa chỉ giao hàng
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
  try {
    console.log("Data sắp gửi lên API:", address);
    await addUserAddress(address);
    await fetchAddresses();

    await addUserDetails(
      formData.get("fullName") as string,
      formData.get("phoneNumber") as string,
      null
    );

    const userDetailsResponse = await getUserDetails();
    localStorage.setItem("userDetails", JSON.stringify(userDetailsResponse.result));
    setUserDetails(userDetailsResponse.result); // ⚡ Cập nhật lại state userDetails để re-render

    handleClose();
  } catch (error) {
    console.error("Lỗi khi thêm địa chỉ:", error);
  }
      
  };
  // Lưu id của các book được mua vào localStorage
  const selectedBooksId= selectBooks.map(
    (book: CartItemPropertyResponseDTO) => book.productId
  );
  localStorage.setItem(
    "selectedBooksId",
    JSON.stringify(selectedBooksId)
  );
  return (
    <>
      <Box sx={{ marginBottom: 30 }}>
        <Container>
          <Section>
            <UnderlineBox>
              <Typography sx={{ textTransform: "uppercase", fontWeight: 700 }}>
                {t("page.checkout.content.address.section")}
              </Typography>
            </UnderlineBox>
            <RadioGroup  name="radio-buttons-group">
              {listAddress?.length > 0
                ? listAddress?.map((address) => (
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <FormControlLabel
                        value={address.address.addressLine1}
                        sx={{
                          width: "fit-content",
                        }}
                        control={<SmallRadio />}
                        label={
                          <RadioLabel>
                            {userDetails.fullName} |{" "}
                            {address.address.addressLine1} |{" "}
                            {userDetails.phoneNum}
                          </RadioLabel>
                        }
                      />
                      <Link marginRight={5} sx={{ cursor: "pointer" }}>
                        {t("page.checkout.content.address.button")}
                      </Link>
                    </Box>
                  ))
                : null}
            </RadioGroup>
            <FormControlLabel
              onClick={handleClickOpen}
              control={<SpecialRadio />}
              checked
              label={<RadioLabel>{t('page.checkout.content.address.radioLabel')}</RadioLabel>}
            />
          </Section>
        </Container>
        <Container>
          <Section>
            <UnderlineBox>
              <Typography sx={{ textTransform: "uppercase", fontWeight: 700 }}>
               {t("page.checkout.content.payment.section")}
              </Typography>
            </UnderlineBox>
            <RadioGroup name="payment-method" sx={{ py: 1 }}>
              <FormControlLabel
                value="pay-with-paypal"
                onClick={() => setPaymentMethod("pay-with-paypal")}
                control={<SmallRadio />}
                label={
                  <Box display={"flex"} alignItems={"center"} gap={1}>
                    <Box
                      sx={{
                        backgroundImage: `url("${cashWithPaypal}")`,
                        width: 40,
                        height: 40,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center center",
                      }}
                    />
                    <RadioLabel>{t('page.checkout.content.payment.item1')}</RadioLabel>
                  </Box>
                }
              />
              <FormControlLabel
                value="pay-with-vnpay"
                onClick={() => setPaymentMethod("pay-with-vnpay")}
                control={<SmallRadio />}
                label={
                  <Box display={"flex"} alignItems={"center"} gap={1}>
                    <Box
                      sx={{
                        backgroundImage: `url("${cashWithVNPay}")`,
                        width: 40,
                        height: 40,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center center",
                      }}
                    />
                    <RadioLabel>{t('page.checkout.content.payment.item2')}</RadioLabel>
                  </Box>
                }
              />
              <FormControlLabel
                value="pay-on-delivery"
                onClick={() => setPaymentMethod("pay-on-delivery")}
                control={<SmallRadio />}
                label={
                  <Box display={"flex"} alignItems={"center"} gap={1}>
                    <Box
                      sx={{
                        backgroundImage: `url("${cashOnDelivery}")`,
                        width: 40,
                        height: 40,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center center",
                      }}
                    />
                    <RadioLabel>{t('page.checkout.content.payment.item3')}</RadioLabel>
                  </Box>
                }
              />
            </RadioGroup>
          </Section>
        </Container>
        <Container>
          <Section>
            <UnderlineBox>
              <Typography sx={{ textTransform: "uppercase", fontWeight: 700 }}>
                {t("page.checkout.content.check.section")}
              </Typography>
            </UnderlineBox>
            <TableContainer>
              <Table sx={{}} aria-label="simple table">
                <TableBody>
                  {selectBooks.length > 0
                    ? selectBooks.map((book: CartItemPropertyResponseDTO) => (
                        <TableRow
                          key={book.productId}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            <Box sx={{ width: 150 }}>
                              <img width={"100%"} src={book.imageUrl} alt="" />
                            </Box>
                          </TableCell>
                          <TableCell align="left">{book.title}</TableCell>
                          <TableCell align="left">
                            <Stack>
                              <Typography>
                                {book.discountedPrice.toLocaleString("vi-VN") +
                                  "đ"}
                              </Typography>
                              <Typography
                                sx={{
                                  textDecoration: "line-through",
                                  fontSize: 14,
                                  color: grey["500"],
                                }}
                              >
                                {book.price.toLocaleString("vi-VN") + "đ"}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{book.quantity}</TableCell>
                          <TableCell align="left">
                            <Typography fontWeight={"bold"} color="error">
                              {(
                                book.discountedPrice * book.quantity
                              ).toLocaleString("vi-Vn") + "đ"}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))
                    : null}
                </TableBody>
              </Table>
            </TableContainer>
          </Section>
        </Container>
        <Container>
          <Section
            sx={{
              paddingBottom: 3,
            }}
          >
            <UnderlineBox>
              <Typography sx={{ textTransform: "uppercase", fontWeight: 700 }}>
                {t("page.checkout.content.discount.section")}
              </Typography>
            </UnderlineBox>
            <Box display={"flex"} alignItems={"center"} gap={2} my={1}>
              <Typography>{t("page.checkout.content.discount.section")}</Typography>
              <Paper sx={{ p: "4px 8px" }} variant="outlined">
                <InputBase />
                <Button
                  sx={{ marginLeft: 1 }}
                  size="small"
                  variant="contained"
                  type="submit"
                  disableFocusRipple
                  disableTouchRipple
                  disableRipple
                >
                  {t("page.checkout.content.discount.section")}
                </Button>
              </Paper>
              <Link
                sx={{ cursor: "pointer" }}
                onClick={() => setOpenDiscount(true)}
              >
                {t("page.checkout.content.discount.item2")}
              </Link>
            </Box>
          </Section>
        </Container>
        <BottomDrawer
          sx={{ position: "fixed", bottom: 0 }}
          totalPrice={totalPrice}
          paymentMethod={paymentMethod}
          listAddress={listAddress}
        />
      </Box>

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
      <Dialog
        sx={{ maxHeight: 500 }}
        open={openDiscount}
        onClose={() => setOpenDiscount(false)}
        scroll="paper"
      >
        <DialogTitle textAlign={"center"}>Thêm mã khuyến mãi</DialogTitle>
        <DialogContent
          sx={{ gap: 2, flexDirection: "column", display: "flex" }}
        >
          <Divider />
          <Paper
            elevation={2}
            sx={{ paddingY: 1, paddingX: 2, display: "inline-flex", gap: 3 }}
          >
            <Box
              sx={{
                width: "fit-content",
                paddingRight: 2,
                borderRight: `2px dashed ${grey["400"]}`,
              }}
            >
              <Box
                sx={{
                  height: 100,
                  width: 100,
                  backgroundColor: yellow["50"],
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  borderRadius: 1,
                }}
              >
                <img src={discountIcon} />
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: 14,
                    color: grey["A700"],
                  }}
                >
                  Mã giảm
                </Typography>
              </Box>
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 600 }}>
                Mã giảm 10K - Toàn bộ sản phẩm
              </Typography>
              <Box
                sx={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  wordBreak: "break-word",
                  maxWidth: 300,
                }}
              >
                <Typography sx={{ fontSize: 14 }}>
                  Đơn hàng từ 130K - Không bao gồm giá trị của các sản phẩm sau:
                  Manga, Ngoại văn, Light Novel
                </Typography>
              </Box>
              <Typography sx={{ marginTop: 2 }} fontSize="small">
                HSD: 30/04/2025
              </Typography>
            </Box>
            <Box display="flex" alignItems="flex-end">
              <Button
                variant="contained"
                color="success"
                size="small"
                disableFocusRipple
                disableTouchRipple
                disableRipple
                sx={{ textWrap: "nowrap" }}
              >
                Áp dụng
              </Button>
            </Box>
          </Paper>

          <Paper
            elevation={2}
            sx={{ paddingY: 1, paddingX: 2, display: "inline-flex", gap: 3 }}
          >
            <Box
              sx={{
                width: "fit-content",
                paddingRight: 2,
                borderRight: `2px dashed ${grey["400"]}`,
              }}
            >
              <Box
                sx={{
                  height: 100,
                  width: 100,
                  backgroundColor: yellow["50"],
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  borderRadius: 1,
                }}
              >
                <img src={discountIcon} />
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: 14,
                    color: grey["A700"],
                  }}
                >
                  Mã giảm
                </Typography>
              </Box>
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 600 }}>
                Mã giảm 10K - Toàn bộ sản phẩm
              </Typography>
              <Box
                sx={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  wordBreak: "break-word",
                  maxWidth: 300,
                }}
              >
                <Typography sx={{ fontSize: 14 }}>
                  Đơn hàng từ 130K - Không bao gồm giá trị của các sản phẩm sau:
                  Manga, Ngoại văn, Light Novel
                </Typography>
              </Box>
              <Typography sx={{ marginTop: 2 }} fontSize="small">
                HSD: 30/04/2025
              </Typography>
            </Box>
            <Box display="flex" alignItems="flex-end">
              <Button
                variant="contained"
                color="success"
                size="small"
                disableFocusRipple
                disableTouchRipple
                disableRipple
                sx={{ textWrap: "nowrap" }}
              >
                Áp dụng
              </Button>
            </Box>
          </Paper>

          <Paper
            elevation={2}
            sx={{ paddingY: 1, paddingX: 2, display: "inline-flex", gap: 3 }}
          >
            <Box
              sx={{
                width: "fit-content",
                paddingRight: 2,
                borderRight: `2px dashed ${grey["400"]}`,
              }}
            >
              <Box
                sx={{
                  height: 100,
                  width: 100,
                  backgroundColor: yellow["50"],
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  borderRadius: 1,
                }}
              >
                <img src={discountIcon} />
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: 14,
                    color: grey["A700"],
                  }}
                >
                  Mã giảm
                </Typography>
              </Box>
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 600 }}>
                Mã giảm 10K - Toàn bộ sản phẩm
              </Typography>
              <Box
                sx={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  wordBreak: "break-word",
                  maxWidth: 300,
                }}
              >
                <Typography sx={{ fontSize: 14 }}>
                  Đơn hàng từ 130K - Không bao gồm giá trị của các sản phẩm sau:
                  Manga, Ngoại văn, Light Novel
                </Typography>
              </Box>
              <Typography sx={{ marginTop: 2 }} fontSize="small">
                HSD: 30/04/2025
              </Typography>
            </Box>
            <Box display="flex" alignItems="flex-end">
              <Button
                variant="contained"
                color="success"
                size="small"
                disableFocusRipple
                disableTouchRipple
                disableRipple
                sx={{ textWrap: "nowrap" }}
              >
                Áp dụng
              </Button>
            </Box>
          </Paper>
        </DialogContent>
      </Dialog>
    </>
  );
}