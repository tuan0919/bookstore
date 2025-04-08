import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControlLabel, InputBase, Link, Paper, Radio, RadioGroup, Stack, styled, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material"
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import { grey, yellow } from "@mui/material/colors";
import { BottomDrawer } from "./BottomDrawer";
import cashOnDelivery from '~/assets/ico_cashondelivery.svg';
import cashWithPaypal from '~/assets/paypal.svg';
import cashWithVNPay from '~/assets/ico_vnpay.svg';
import discountIcon from '~/assets/ico_promotion.svg';
import React from "react";

const Section = styled(Box)(({ theme }) => ({
    backgroundColor: 'white',
    padding: `0 ${theme.spacing(2)}`,
    margin: `${theme.spacing(2)} ${theme.spacing(0)}`,
}));

const UnderlineBox = styled(Box)(({ theme }) => ({
    borderBottom: `1px ${grey['A400']} solid`,
    padding: `${theme.spacing(1)} 0`,
}));

const RadioLabel = styled(Typography)(() => ({
    fontSize: '14px',
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
))(() => ({

}));

const SpecialRadio = styled((props) => (
    <Radio
        size="small"
        disableTouchRipple
        disableFocusRipple
        disableRipple
        checkedIcon={<ControlPointRoundedIcon />}
        {...props}
    />
))(() => ({

}));

function createData(
    thumbnail: string,
    name: string,
    discountPrice: number,
    price: number,
    quantity: number,
) {
    return { name, thumbnail, discountPrice, price, quantity };
}

const rows = [
    createData('https://cdn0.fahasa.com/media/catalog/product//8/9/8935244873306.jpg',
        'Đất Nước Gấm Hoa - Atlas Việt Nam',
        297500, 350000, 1
    ),
    createData('https://cdn0.fahasa.com/media/catalog/product//8/9/8936067605211.jpg',
        'Phương Pháp Giáo Dục Con Của Người Do Thái - Giúp Trẻ Tự Tin Bước Vào Cuộc Sống',
        297500, 350000, 1
    ),
    createData('https://cdn0.fahasa.com/media/catalog/product//6/9/6975308870959.jpg',
        'Trang Trí Điện Thoại Gấu Lotso - YL7095 (Mẫu Sản Phẩm Ngẫu Nhiên)',
        23100, 33000, 1
    ),
];

export function Checkout() {
    const [open, setOpen] = React.useState(false);
    const [openDiscount, setOpenDiscount] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <Box sx={{ marginBottom: 30 }}>
                <Container>
                    <Section>
                        <UnderlineBox>
                            <Typography sx={{ textTransform: 'uppercase', fontWeight: 700 }}>
                                Địa chỉ giao hàng
                            </Typography>
                        </UnderlineBox>
                        <RadioGroup
                            defaultValue="address_1"
                            name="radio-buttons-group"
                        >
                            <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                                <FormControlLabel value="address_1"
                                    sx={{
                                        width: 'fit-content',
                                    }}
                                    control={<SmallRadio />}
                                    label={<RadioLabel>Nguyễn Tuấn | 31/8B, Khu Phố 4, Xã Tân Bình, Tân Binh, Tây Ninh, Việt Nam | 0936565257</RadioLabel>}
                                />
                                <Link marginRight={5} sx={{ cursor: 'pointer' }}>
                                    Sửa
                                </Link>
                            </Box>
                            <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                                <FormControlLabel
                                    value="address_2"
                                    control={<SmallRadio />}
                                    label={<RadioLabel>Hùng Phạm | Chợ nhỏ Nông Lâm, Linh Trung, Thủ Đức, Hồ Chí Minh, Việt Nam | 0919169464</RadioLabel>}
                                />
                                <Link marginRight={5} sx={{ cursor: 'pointer' }}>
                                    Sửa
                                </Link>
                            </Box>
                            <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                                <FormControlLabel
                                    value="address_3"
                                    control={<SmallRadio />}
                                    label={<RadioLabel>Hoàng Khang | Tòa nhà Số 28, Mai Chí Thọ, Thủ Đức, Hồ Chí Minh, Việt Nam | 0168237814</RadioLabel>}
                                />
                                <Link marginRight={5} sx={{ cursor: 'pointer' }}>
                                    Sửa
                                </Link>
                            </Box>
                        </RadioGroup>
                        <FormControlLabel
                            onClick={handleClickOpen}
                            control={<SpecialRadio />}
                            checked
                            label={<RadioLabel>Giao hàng đến địa chỉ khác</RadioLabel>}
                        />
                    </Section>
                </Container>
                <Container>
                    <Section>
                        <UnderlineBox>
                            <Typography sx={{ textTransform: 'uppercase', fontWeight: 700 }}>
                                Phương thức thanh toán
                            </Typography>
                        </UnderlineBox>
                        <RadioGroup name="payment-method" sx={{ py: 1 }}>
                            <FormControlLabel
                                value="pay-with-paypal"
                                control={<SmallRadio />}
                                label={
                                    <Box display={'flex'} alignItems={'center'} gap={1}>
                                        <Box sx={{
                                            backgroundImage: `url("${cashWithPaypal}")`,
                                            width: 40,
                                            height: 40,
                                            backgroundSize: 'contain',
                                            backgroundRepeat: 'no-repeat',
                                            backgroundPosition: 'center center',
                                        }} />
                                        <RadioLabel>Thanh toán bằng ví Paypal.</RadioLabel>
                                    </Box>
                                }
                            />
                            <FormControlLabel
                                value="pay-with-vnpay"
                                control={<SmallRadio />}
                                label={
                                    <Box display={'flex'} alignItems={'center'} gap={1}>
                                        <Box sx={{
                                            backgroundImage: `url("${cashWithVNPay}")`,
                                            width: 40,
                                            height: 40,
                                            backgroundSize: 'contain',
                                            backgroundRepeat: 'no-repeat',
                                            backgroundPosition: 'center center',
                                        }} />
                                        <RadioLabel>Thanh toán bằng cổng VNPay.</RadioLabel>
                                    </Box>
                                }
                            />
                            <FormControlLabel
                                value="pay-on-delivery"
                                control={<SmallRadio />}
                                label={
                                    <Box display={'flex'} alignItems={'center'} gap={1}>
                                        <Box sx={{
                                            backgroundImage: `url("${cashOnDelivery}")`,
                                            width: 40,
                                            height: 40,
                                            backgroundSize: 'contain',
                                            backgroundRepeat: 'no-repeat',
                                            backgroundPosition: 'center center',
                                        }} />
                                        <RadioLabel>Thanh toán khi nhận hàng.</RadioLabel>
                                    </Box>
                                }
                            />
                        </RadioGroup>
                    </Section>
                </Container>
                <Container>
                    <Section>
                        <UnderlineBox>
                            <Typography sx={{ textTransform: 'uppercase', fontWeight: 700 }}>
                                Kiểm tra lại đơn hàng
                            </Typography>
                        </UnderlineBox>
                        <TableContainer>
                            <Table sx={{}} aria-label="simple table">
                                <TableBody>
                                    {rows.map(({ name, quantity, discountPrice, price, thumbnail }) => (
                                        <TableRow
                                            key={name}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                <Box sx={{ width: 150 }}>
                                                    <img width={'100%'} src={thumbnail} alt="" />
                                                </Box>
                                            </TableCell>
                                            <TableCell align="left">
                                                {name}
                                            </TableCell>
                                            <TableCell align="left">
                                                <Stack>
                                                    <Typography>{discountPrice.toLocaleString('vi-VN') + 'đ'}</Typography>
                                                    <Typography sx={{ textDecoration: 'line-through', fontSize: 14, color: grey['500'] }}>
                                                        {price.toLocaleString('vi-VN') + 'đ'}
                                                    </Typography>
                                                </Stack>
                                            </TableCell>
                                            <TableCell align="left">{quantity}</TableCell>
                                            <TableCell align="left">
                                                <Typography fontWeight={'bold'} color="error">
                                                    {(discountPrice * quantity).toLocaleString('vi-Vn') + 'đ'}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Section>
                </Container>
                <Container>
                    <Section sx={{
                        paddingBottom: 3
                    }}>
                        <UnderlineBox>
                            <Typography sx={{ textTransform: 'uppercase', fontWeight: 700 }}>
                                Mã khuyến mãi / mã quà tặng
                            </Typography>
                        </UnderlineBox>
                        <Box display={'flex'} alignItems={'center'} gap={2} my={1}>
                            <Typography>Mã KM / Quà tặng</Typography>
                            <Paper sx={{ p: '4px 8px' }} variant="outlined">
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
                                    Áp dụng
                                </Button>
                            </Paper>
                            <Link sx={{ cursor: 'pointer' }} onClick={() => setOpenDiscount(true)}>Chọn mã khuyến mãi</Link>
                        </Box>
                    </Section>
                </Container>
                <BottomDrawer sx={{ position: 'fixed', bottom: 0 }} />
            </Box>
            <Dialog
                open={open}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        component: 'form',
                        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                            event.preventDefault();
                            handleClose();
                        },
                    },
                }}
            >
                <DialogTitle textAlign={'center'}>Thêm mới địa chỉ giao hàng</DialogTitle>
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
                        required
                        margin="dense"
                        name="address"
                        label="Địa chỉ nhận hàng"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose} variant="outlined"
                        disableFocusRipple
                        disableTouchRipple
                        disableRipple
                    >
                        Hủy
                    </Button>
                    <Button variant="contained" type="submit"
                        disableFocusRipple
                        disableTouchRipple
                        disableRipple
                    >Lưu địa chỉ
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                sx={{ maxHeight: 500 }}
                open={openDiscount}
                onClose={() => setOpenDiscount(false)}
                scroll="paper"
            >
                <DialogTitle textAlign={'center'}>Thêm mã khuyến mãi</DialogTitle>
                <DialogContent sx={{ gap: 2, flexDirection: 'column', display: 'flex', }}>
                    <Divider />
                    <Paper elevation={2} sx={{ paddingY: 1, paddingX: 2, display: 'inline-flex', gap: 3 }}>
                        <Box sx={{
                            width: 'fit-content',
                            paddingRight: 2,
                            borderRight: `2px dashed ${grey['400']}`,
                        }}>
                            <Box sx={{
                                height: 100,
                                width: 100,
                                backgroundColor: yellow['50'],
                                alignItems: 'center',
                                justifyContent: 'center',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 1,
                                borderRadius: 1,
                            }}>
                                <img src={discountIcon} />
                                <Typography sx={{
                                    fontWeight: 600,
                                    fontSize: 14,
                                    color: grey['A700']
                                }}>Mã giảm</Typography>
                            </Box>
                        </Box>
                        <Box>
                            <Typography sx={{ fontWeight: 600 }}>Mã giảm 10K - Toàn bộ sản phẩm</Typography>
                            <Box sx={{
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                wordBreak: 'break-word',
                                maxWidth: 300,
                            }}>
                                <Typography
                                    sx={{ fontSize: 14 }}
                                >
                                    Đơn hàng từ 130K - Không bao gồm giá trị của các sản phẩm sau: Manga, Ngoại văn, Light Novel
                                </Typography>
                            </Box>
                            <Typography sx={{ marginTop: 2 }} fontSize="small">HSD: 30/04/2025</Typography>
                        </Box>
                        <Box display="flex" alignItems="flex-end">
                            <Button
                                variant="contained"
                                color="success"
                                size="small"
                                disableFocusRipple
                                disableTouchRipple
                                disableRipple
                                sx={{ textWrap: 'nowrap' }}
                            >
                                Áp dụng
                            </Button>
                        </Box>
                    </Paper>

                    <Paper elevation={2} sx={{ paddingY: 1, paddingX: 2, display: 'inline-flex', gap: 3 }}>
                        <Box sx={{
                            width: 'fit-content',
                            paddingRight: 2,
                            borderRight: `2px dashed ${grey['400']}`,
                        }}>
                            <Box sx={{
                                height: 100,
                                width: 100,
                                backgroundColor: yellow['50'],
                                alignItems: 'center',
                                justifyContent: 'center',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 1,
                                borderRadius: 1,
                            }}>
                                <img src={discountIcon} />
                                <Typography sx={{
                                    fontWeight: 600,
                                    fontSize: 14,
                                    color: grey['A700']
                                }}>Mã giảm</Typography>
                            </Box>
                        </Box>
                        <Box>
                            <Typography sx={{ fontWeight: 600 }}>Mã giảm 10K - Toàn bộ sản phẩm</Typography>
                            <Box sx={{
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                wordBreak: 'break-word',
                                maxWidth: 300,
                            }}>
                                <Typography
                                    sx={{ fontSize: 14 }}
                                >
                                    Đơn hàng từ 130K - Không bao gồm giá trị của các sản phẩm sau: Manga, Ngoại văn, Light Novel
                                </Typography>
                            </Box>
                            <Typography sx={{ marginTop: 2 }} fontSize="small">HSD: 30/04/2025</Typography>
                        </Box>
                        <Box display="flex" alignItems="flex-end">
                            <Button
                                variant="contained"
                                color="success"
                                size="small"
                                disableFocusRipple
                                disableTouchRipple
                                disableRipple
                                sx={{ textWrap: 'nowrap' }}
                            >
                                Áp dụng
                            </Button>
                        </Box>
                    </Paper>

                    <Paper elevation={2} sx={{ paddingY: 1, paddingX: 2, display: 'inline-flex', gap: 3 }}>
                        <Box sx={{
                            width: 'fit-content',
                            paddingRight: 2,
                            borderRight: `2px dashed ${grey['400']}`,
                        }}>
                            <Box sx={{
                                height: 100,
                                width: 100,
                                backgroundColor: yellow['50'],
                                alignItems: 'center',
                                justifyContent: 'center',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 1,
                                borderRadius: 1,
                            }}>
                                <img src={discountIcon} />
                                <Typography sx={{
                                    fontWeight: 600,
                                    fontSize: 14,
                                    color: grey['A700']
                                }}>Mã giảm</Typography>
                            </Box>
                        </Box>
                        <Box>
                            <Typography sx={{ fontWeight: 600 }}>Mã giảm 10K - Toàn bộ sản phẩm</Typography>
                            <Box sx={{
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                wordBreak: 'break-word',
                                maxWidth: 300,
                            }}>
                                <Typography
                                    sx={{ fontSize: 14 }}
                                >
                                    Đơn hàng từ 130K - Không bao gồm giá trị của các sản phẩm sau: Manga, Ngoại văn, Light Novel
                                </Typography>
                            </Box>
                            <Typography sx={{ marginTop: 2 }} fontSize="small">HSD: 30/04/2025</Typography>
                        </Box>
                        <Box display="flex" alignItems="flex-end">
                            <Button
                                variant="contained"
                                color="success"
                                size="small"
                                disableFocusRipple
                                disableTouchRipple
                                disableRipple
                                sx={{ textWrap: 'nowrap' }}
                            >
                                Áp dụng
                            </Button>
                        </Box>
                    </Paper>
                </DialogContent>
            </Dialog>
        </>
    )
}