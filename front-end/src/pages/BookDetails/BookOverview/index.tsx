import { Box, Link, Rating, Stack, styled, SxProps, Theme, Typography } from "@mui/material";
import { blue, grey, red, yellow } from "@mui/material/colors";

const LabelText = styled(Typography)(() => ({
    fontSize: 14,
    fontWeight: 'medium',
}));

const StrongText = styled(Typography)(() => ({
    fontSize: 14,
    fontWeight: 'bold',
    color: grey['800']
}));

const LinkText = styled(Link)(() => ({
    fontSize: 14,
    textDecoration: 'none',
    fontWeight: 500,
    color: blue['400'],
    cursor: 'pointer'
}));

const WrapText = styled(Box)(({ theme }) => ({
    alignItems: 'center',
    display: 'flex',
    gap: theme.spacing(1)
}));

export function BookOverview({ sx = undefined }: { sx?: SxProps<Theme> }) {
    return (
        <Stack sx={sx} spacing={1}>
            <Typography fontWeight={'bold'} fontSize={25}>
                Nhà Giả Kim (Tái Bản 2020)
            </Typography>
            <Box display={'flex'} justifyContent={'space-between'}>
                <Stack spacing={1}>
                    <WrapText>
                        <LabelText>Nhà cung cấp:</LabelText>
                        <LinkText>Nhã Nam</LinkText>
                    </WrapText>
                    <WrapText>
                        <LabelText>Nhà xuất bản:</LabelText>
                        <StrongText>NXB Hội Nhà Văn</StrongText>
                    </WrapText>
                </Stack>
                <Stack spacing={1} paddingRight={10}>
                    <WrapText>
                        <LabelText>Tác giả:</LabelText>
                        <StrongText>Paulo Coelho</StrongText>
                    </WrapText>
                    <WrapText>
                        <LabelText>Hình thức bìa:</LabelText>
                        <StrongText>Bìa Mềm</StrongText>
                    </WrapText>
                </Stack>
            </Box>
            <Box display={'flex'} alignItems={'center'} gap={1}>
                <Rating
                    size="small"
                    name="text-feedback"
                    value={5}
                    readOnly
                    precision={0.5}
                />
                <Typography sx={{ color: yellow['800'], fontWeight: 'medium', fontSize: 14 }}>
                    {`(43 đánh giá)`}
                </Typography>
            </Box>
            <Box display={'flex'} alignItems={'center'} gap={2}>
                <Typography sx={{ fontWeight: 'medium', color: red['700'], fontSize: 30 }}>
                    63.200 đ
                </Typography>
                <Typography fontSize={'medium'} sx={{ color: grey['700'], textDecoration: 'line-through' }}>
                    79.000 đ
                </Typography>
                <Box display={'flex'}
                    bgcolor={red['700']}
                    alignItems={'center'}
                    justifyContent={'center'}
                    paddingX={1}
                    paddingY={0.1}
                    borderRadius={1}>
                    <Typography sx={{ fontWeight: 'medium', color: 'white' }}>-20%</Typography>
                </Box>
            </Box>
            <Box bgcolor={blue['50']} paddingY={1} paddingX={1} borderRadius={1}>
                <Typography sx={{ color: blue['700'], fontWeight: 'medium' }}>Số lượng còn trong kho: 107</Typography>
            </Box>
        </Stack >
    )
}