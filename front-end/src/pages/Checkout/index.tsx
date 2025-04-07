import { Box, Container, FormControlLabel, Link, Radio, RadioGroup, styled, Typography } from "@mui/material"
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import { grey } from "@mui/material/colors";
import { BottomDrawer } from "./BottomDrawer";

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
                <Section sx={{ height: 200 }}>
                    <UnderlineBox>
                        <Typography sx={{ textTransform: 'uppercase', fontWeight: 700 }}>
                            Phương thức thanh toán
                        </Typography>
                    </UnderlineBox>
                </Section>
            </Container>
            <Container>
                <Section sx={{ height: 700 }}>
                    <UnderlineBox>
                        <Typography sx={{ textTransform: 'uppercase', fontWeight: 700 }}>
                            Kiểm tra lại đơn hàng
                        </Typography>
                    </UnderlineBox>
                </Section>
            </Container>
            <BottomDrawer sx={{ position: 'fixed', bottom: 0 }} />
        </Box>
    )
}