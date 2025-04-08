import { Box, Container, FormControlLabel, Link, Radio, RadioGroup, Stack, styled, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material"
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import { grey } from "@mui/material/colors";
import { BottomDrawer } from "./BottomDrawer";
import cashOnDelivery from '~/assets/ico_cashondelivery.svg';
import cashWithPaypal from '~/assets/paypal.svg';
import cashWithVNPay from '~/assets/ico_vnpay.svg'

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
    return (
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
            <BottomDrawer sx={{ position: 'fixed', bottom: 0 }} />
        </Box>
    )
}