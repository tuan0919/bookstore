import { Box, Button } from "@mui/material";
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import { grey, red } from "@mui/material/colors";
import { BookCard } from "~/components/BookCard";
import 'swiper/swiper-bundle.css'
import { Swiper, SwiperSlide } from "swiper/react";
import { SectionHeader } from "~/components/Section/SectionHeader";
import { useMemo } from "react";
import { Section } from "~/components/Section";
import { SectionBody } from "~/components/Section/SectionBody";

export function BookRelated() {
    const bookCards = Array.from({ length: 5 }, (_, index) => (
        <SwiperSlide key={index}><BookCard /></SwiperSlide>
    ));
    const headerIcon = useMemo(() => (<LocalActivityIcon sx={{ color: grey['100'], fontSize: 20 }} />), [])
    const bodyContent = useMemo(() => (
        <>
            <Swiper
                loop={true}
                style={{ height: "100%", paddingBottom: 2 }}
                slidesPerView={4}
                grabCursor
            >
                {bookCards}
            </Swiper>
            <Box justifyContent={'center'} display={'flex'} marginTop={2}>
                <Button variant="outlined" color="error"
                    sx={{ borderWidth: 2, paddingX: 8, borderColor: red['800'], textTransform: 'capitalize' }}
                >
                    Xem Thêm
                </Button>
            </Box>
        </>
    ), [bookCards]);
    return (
        <Section>
            <SectionHeader
                iconHeader={headerIcon}
                iconBackground={`linear-gradient(to left top , ${red['800']}, ${red['400']})`}
                title="< Sách tương tự >" bgColor={'rgb(252, 221, 239)'} />
            <SectionBody content={bodyContent} />
        </Section>
    )
}