import { Box, Button, Checkbox, Container, Divider, FormControlLabel, Stack, SxProps, Theme, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import shadows from "@mui/material/styles/shadows";

export function BottomDrawer({ sx = undefined }: { sx?: SxProps<Theme> }) {
    return (
        <Box sx={{ ...sx, backgroundColor: 'white', width: '100%', boxShadow: shadows['20'], paddingY: 2 }}>
            <Container>
                <Stack gap={0.5}>
                    <Box display={'flex'} justifyContent={'flex-end'}>
                        <Box width={400} textAlign={'right'}>
                            <Typography sx={{ fontSize: 14 }}>Thành tiền</Typography>
                        </Box>
                        <Box width={200} textAlign={'right'}>
                            <Typography sx={{ fontSize: 14 }}>{(375800).toLocaleString('vi-VN') + ' đ'}</Typography>
                        </Box>
                    </Box>
                    <Box display={'flex'} justifyContent={'flex-end'}>
                        <Box width={400} textAlign={'right'}>
                            <Typography sx={{ fontSize: 14 }}>Phí vận chuyển</Typography>
                        </Box>
                        <Box width={200} textAlign={'right'}>
                            <Typography sx={{ fontSize: 14 }}>{(32000).toLocaleString('vi-VN') + ' đ'}</Typography>
                        </Box>
                    </Box>
                    <Box display={'flex'} justifyContent={'flex-end'}>
                        <Box width={400} textAlign={'right'}>
                            <Typography sx={{ fontWeight: 700 }}>Tổng tiền</Typography>
                        </Box>
                        <Box width={200} textAlign={'right'}>
                            <Typography sx={{ fontWeight: 700, fontSize: 18, color: red['900'] }}>{(32000).toLocaleString('vi-VN') + ' đ'}</Typography>
                        </Box>
                    </Box>
                </Stack>
                <Divider sx={{ mt: 1 }} />
                <Box display={'flex'} mt={2}>
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Tôi đồng ý với điều khoản sử dụng của trang web" />
                    <Button
                        sx={{ marginLeft: 'auto' }}
                        size="small"
                        variant="contained"
                        color="error"
                        disableFocusRipple
                        disableRipple
                        disableTouchRipple
                    >
                        Xác nhận thanh toán
                    </Button>
                </Box>
            </Container>
        </Box>
    )
}