import { Avatar, Box, Divider, Rating, Tooltip, Typography } from "@mui/material";
import { deepOrange, grey, red } from "@mui/material/colors";
import collectionImage from '~/assets/collection/mockup_1.png';
import personImage from '~/assets/person/mockup_1.png';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.css';
import { useSwipe } from "~/context/CollectionContext";

export function CollectionCard() {
    const { setAllowSwipe, draggingChild, setDraggingChild } = useSwipe();
    const genres = ['Sách nhật bản', 'Shounen', 'Chiến đấu', 'Drama'];
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
                    boxShadow: 4,
                },
                gap: '2px',
                
            }}
            onMouseEnter={() => {
                setAllowSwipe(false)
            }}
            onMouseLeave={() => {
                setAllowSwipe(true)
            }}
            >
            <Box sx={{cursor: 'pointer'}}>
                <img src={collectionImage} width={'100%'} height={'100%'} style={{ objectFit: "cover" }}/>
            </Box>
            <Tooltip 
                title={"Trọn bộ các tập manga World Trigger đang được tái xuất bản hiện nay (khoảng 20 tập)"}
                arrow
            >
                <Typography fontFamily={'Segoe UI'} 
                    sx={{
                        fontSize: 15,
                        fontWeight: 600, 
                        color: grey['900'],
                        transition: 'color 0.4s ease-in-out',
                        '&:hover': {
                            color: red['600'],
                        },
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 2,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                    >
                        Trọn bộ các tập manga World Trigger đang được tái xuất bản hiện nay (khoảng 20 tập)
                </Typography>
            </Tooltip>
            <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                <Avatar 
                    sx={{ 
                        bgcolor: deepOrange[500], 
                        width: 35, 
                        height: 35, 
                        border: `solid 2px ${grey['800']}`
                    }} 
                    src={personImage}
                />
                <Box
                    sx={{height: '100%', flex: 1}}
                >
                    <Box display={'flex'} gap={1} alignItems={'center'}>
                        <Typography
                            sx={{
                                fontSize: 15,
                                fontWeight: 600, 
                                color: grey['900'],
                                display: 'flex',
                                alignItems: 'center',
                                gap: 0.4,
                            }}
                            >
                                @taileee11
                        </Typography>
                        <Typography fontSize={'small'}>đã tạo</Typography>
                    </Box>
                    <Rating
                        size="small"
                        name="text-feedback"
                        value={4.5}
                        readOnly
                        precision={0.5}
                    />
                </Box>
            </Box>
            <Box display={'flex'} justifyContent={'space-between'}>
                <Typography fontSize={'small'}>{`Số lượng: ${20}`}</Typography>
                <Typography fontSize={'small'}>1 tháng trước</Typography>
            </Box>
            <Divider/>
            <Box sx={{ overflow: 'hidden', width: '100%' }}>
                <Swiper
                    nested
                    onTouchMove={() => {
                        if (!draggingChild) {
                            setDraggingChild(true)
                            console.log('true')
                        }
                    }}
                    onTouchEnd={() => {
                        if (draggingChild) {
                            setDraggingChild(false)
                            console.log('false')
                        }
                    }}
                    grabCursor
                    freeMode
                    spaceBetween={8}
                    slidesPerView={'auto'}
                    resistanceRatio={1}
                >
                    {genres.map((v, i) => (
                        <SwiperSlide key={i} style={{ width: 'auto' }}>
                            <Typography 
                                fontSize={'small'}
                                fontWeight={'bold'} 
                                sx={{ whiteSpace: 'nowrap' }} // Ngăn xuống dòng
                            >
                                {v}{i < genres.length - 1 ? ', ' : ''} {/* Thêm dấu phẩy nếu không phải phần tử cuối */}
                            </Typography>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Box>
        </Box>
    )
}