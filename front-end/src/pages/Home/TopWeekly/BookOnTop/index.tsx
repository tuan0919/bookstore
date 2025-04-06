import { Box, Stack, Typography } from "@mui/material";
import { blue, green, grey } from "@mui/material/colors";
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
export function BookOnTop() {
    return (
    <Box sx={{
        display: 'flex', 
        alignItems: 'top', 
        paddingRight: 4,
        cursor: 'pointer',
        '&:hover': {
            borderRight: '2px solid black',
        }
    }}
    >
        <Box alignItems={'center'} display={'flex'}>
            <Stack display={'flex'} alignItems={'center'} spacing={1}>
                <Typography sx={{fontWeight: 500}}>01</Typography>
                <ArrowUpwardRoundedIcon fontSize="medium" sx={{color: green['900']}}/>
            </Stack>
            <Box width={100}>
                <img 
                    width={'100%'}
                    src="https://cdn1.fahasa.com/media/catalog/product/8/9/8932000134749_1.jpg" 
                    alt="" 
                />
            </Box>
        </Box>
        <Stack>
            <Typography fontSize={'medium'}>Nếu Biết Trăm Năm Là Hữu Hạn - Ấn Bản Kỉ Niệm 10 Năm Xuất Bản (Tái Bản 2024)</Typography>
            <Typography fontSize={'small'} sx={{color: grey['600']}}>Fredik Backman</Typography>
            <Typography fontSize={'small'} sx={{color: blue['600']}}>{`${1250} điểm`}</Typography>
        </Stack>
    </Box>
    )
}