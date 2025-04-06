import { Box, Rating, Stack, styled, SxProps, Theme, Typography } from "@mui/material";
import { yellow } from "@mui/material/colors";
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 5,
    borderRadius: 5,
    flexShrink: 0,
    width: '70%',
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[200],
        ...theme.applyStyles('dark', {
            backgroundColor: theme.palette.grey[800],
        }),
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: yellow['800'],
        ...theme.applyStyles('dark', {
            backgroundColor: yellow['800'],
        }),
    },
}));

const LabelText = styled(Typography)(() => ({
    fontSize: 13,
    textWrap: 'nowrap'
}));

const RatingBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: theme.spacing(2),
    flex: 1,
    alignItems: 'center'
}));


export function BookRating({ sx = undefined }: { sx?: SxProps<Theme> }) {
    return (
        <Stack sx={sx}>
            <Typography sx={{ fontWeight: 'medium', fontSize: 'large' }}>Đánh giá sản phẩm</Typography>
            <Box display={'flex'} gap={3} alignItems={'center'}>
                <Stack display={'flex'} alignItems={'center'} spacing={0.5}>
                    <Box display={'flex'} alignItems={'flex-end'}>
                        <Typography
                            fontWeight={'medium'}
                            sx={{
                                fontSize: 50,
                                lineHeight: 1.2
                            }}>5</Typography>
                        <Typography sx={{ fontSize: 30 }}>/5</Typography>
                    </Box>
                    <Rating value={5} readOnly size="small" />
                    <Typography sx={{
                        color: yellow['800'],
                        fontWeight: 'medium',
                        fontSize: 13,
                        textWrap: 'nowrap'
                    }}>
                        (43 lượt đánh giá)
                    </Typography>
                </Stack>
                <Stack sx={{ width: '100%', height: '100%', paddingY: 2, gap: 1 }}>
                    <RatingBox>
                        <LabelText>5 sao</LabelText>
                        <BorderLinearProgress variant="determinate" value={95} />
                        <LabelText>95%</LabelText>
                    </RatingBox>
                    <RatingBox>
                        <LabelText>4 sao</LabelText>
                        <BorderLinearProgress variant="determinate" value={2} />
                        <LabelText>2%</LabelText>
                    </RatingBox>
                    <RatingBox>
                        <LabelText>3 sao</LabelText>
                        <BorderLinearProgress variant="determinate" value={2} />
                        <LabelText>2%</LabelText>
                    </RatingBox>
                    <RatingBox>
                        <LabelText>2 sao</LabelText>
                        <BorderLinearProgress variant="determinate" value={0} />
                        <LabelText>0%</LabelText>
                    </RatingBox>
                    <RatingBox>
                        <LabelText>1 sao</LabelText>
                        <BorderLinearProgress variant="determinate" value={0} />
                        <LabelText>0%</LabelText>
                    </RatingBox>
                </Stack>
            </Box>
        </Stack>
    )
}