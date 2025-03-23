import { Section } from "~/components/Section"
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import { blue, grey, red } from "@mui/material/colors";
import 'swiper/swiper-bundle.css'
import { useEffect, useMemo, useRef, useState } from "react";
import { SectionHeader } from "~/components/Section/SectionHeader";
import { CollectionCard } from "~/components/CollectionCard";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Box, Button } from "@mui/material";
import { SectionBody } from "~/components/Section/SectionBody";
import { CollectionContext } from "~/context/CollectionContext";

export function Collection() {
    const [allowSwipe, setAllowSwipe] = useState(true);
    const [draggingChild, setDraggingChild] = useState(true);
    const cards = Array.from({ length: 5 }, (_, index) => (
        <SwiperSlide key={index}><CollectionCard /></SwiperSlide>
    ));
    const headerIcon = useMemo(() => (
        <CollectionsBookmarkIcon sx={{color: grey['100'], fontSize: 20}}/>
    ), []);
    const swiperRef = useRef<SwiperRef | null>(null);
    useEffect(() => {
        if (swiperRef.current) {
            swiperRef.current.swiper.allowTouchMove = allowSwipe && !draggingChild
            if (allowSwipe && !draggingChild) {
                swiperRef.current.swiper.setGrabCursor();
            } else {
                swiperRef.current.swiper.unsetGrabCursor();
            }
        }
    }, [allowSwipe, draggingChild])

    useEffect(() => {
        if (!draggingChild) return;

        const timeout = setTimeout(() => {
            setDraggingChild(false);
            console.log("Drag Ended (debounced)");
        }, 500); // 300ms delay debounce

        return () => clearTimeout(timeout);
    }, [draggingChild]);
    const bodyContent = useMemo(() => (
        <CollectionContext.Provider value={{ allowSwipe, setAllowSwipe, draggingChild, setDraggingChild }}>
            <Swiper
                ref={swiperRef}
                resistanceRatio={1}
                style={{ height: "100%", paddingBottom: 2 }}
                slidesPerView={4}
            >
                {cards}
            </Swiper>
            <Box justifyContent={'center'} display={'flex'} marginTop={2}>
                <Button variant="outlined" color="error" 
                sx={{borderWidth: 2, paddingX: 8, borderColor: red['800'], textTransform: 'capitalize'}}
                >
                    Xem Thêm
                </Button>
            </Box>
        </CollectionContext.Provider>
    ), [allowSwipe, cards, draggingChild]);
    return (
        <Section>
            <SectionHeader
                iconBackground={`linear-gradient(to left top , ${blue['800']}, ${blue['400']})`}
                title="Bộ sách xu hướng"
                iconHeader={headerIcon}
                bgColor={'rgb(221, 242, 252)'}
            />
            <SectionBody content={bodyContent}/>
        </Section>
    )
}