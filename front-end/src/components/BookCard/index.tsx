import { Box, Typography } from "@mui/material";
import { grey, red } from "@mui/material/colors";
import bookImage from '~/assets/product/mockup_1.png';

export function BookCard() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: 1,
                width: 200,
                borderRadius: 2,
                transition: "box-shadow 0.3s ease-in-out",
                '&:hover': {
                    boxShadow: 4
                },
                gap: '2px',
            }}>
            <Box sx={{height: 268, cursor: 'pointer'}}>
                <img src={bookImage} width={'100%'} height={'100%'} style={{ objectFit: "cover" }}/>
            </Box>
            <Typography fontFamily={'Segoe UI'} 
                sx={{
                    fontSize: 15,
                    fontWeight: 600, 
                    color: grey['900'],
                    transition: 'color 0.4s ease-in-out',
                    cursor: 'pointer',
                    '&:hover': {
                        color: red['600'],
                    }
                }}
                >
                    Dược sư tự sự (Manga) - Tập 13
            </Typography>
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Typography fontFamily={'Segoe UI'} 
                    sx={{fontSize: 15, fontWeight: 600}} fontWeight={'medium'} color={red['600']}>
                    39,950₫
                </Typography>
                <Typography fontFamily={'Segoe UI'} 
                    sx={{fontSize: 15, fontWeight: 600, textDecoration: "line-through", textDecorationThickness: 1.2}} 
                    fontWeight={'medium'} color={grey['400']}>
                    47,000₫
                </Typography>
            </Box>
        </Box>
    )
}