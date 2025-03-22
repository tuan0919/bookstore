import { Box, Button, Stack, Typography } from "@mui/material";
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import { grey, red } from "@mui/material/colors";
import { BookCard } from "~/components/BookCard";
import 'swiper/swiper-bundle.css'
import { Swiper, SwiperSlide } from "swiper/react";
export function Event() {
    return (
        <Stack sx={{direction: 'column'}}>
            <Box sx={{
                    flexDirection: 'row', 
                    display: 'flex', 
                    gap: 1, 
                    borderTopLeftRadius: 10, 
                    borderTopRightRadius: 10,
                    alignItems: 'center'
                }} bgcolor={'rgb(252, 221, 239)'} padding={1}>
                <Box sx={{
                        height: 40,
                        width: 40,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 2,
                        background: `linear-gradient(to left top , ${red['800']}, ${red['400']})`
                    }}>
                    <LocalActivityIcon sx={{color: grey['100']}}/>
                </Box>
                <Typography sx={{textTransform: 'uppercase'}} fontWeight={'bold'}>
                    {'< Sự kiện khuyến mãi >'}
                </Typography>
            </Box>
            <Box sx={{
                    paddingTop: 1,
                    paddingBottom: 2,
                    bgcolor: 'white',
                    borderBottomLeftRadius: 10, 
                    borderBottomRightRadius: 10,
                    minHeight: 300,
                    '& .swiper-slide': {
                        display: 'flex',
                        justifyContent: 'center',
                    }
                }}>
                <Swiper
                    loop={true}
                    style={{ height: "100%", paddingBottom: 2 }}
                    slidesPerView={4}
                    grabCursor
                >
                    <SwiperSlide><BookCard /></SwiperSlide>
                    <SwiperSlide><BookCard /></SwiperSlide>
                    <SwiperSlide><BookCard /></SwiperSlide>
                    <SwiperSlide><BookCard /></SwiperSlide>
                    <SwiperSlide><BookCard /></SwiperSlide>
                </Swiper>
                <Box justifyContent={'center'} display={'flex'} marginTop={2}>
                    <Button variant="outlined" color="error" 
                    sx={{borderWidth: 2, paddingX: 8, borderColor: red['800'], textTransform: 'capitalize'}}
                    >
                        Xem Thêm
                    </Button>
                </Box>
            </Box>
        </Stack>
    )
}