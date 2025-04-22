import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import banner_1 from "~/assets/banner/banner_1.png";
import banner_2 from "~/assets/banner/banner_2.png";
import banner_3 from "~/assets/banner/banner_3.png";
import banner_manga from "~/assets/banner/image.png";
import { Box } from "@mui/material";

export function Carousel() {
  return (
    <Box
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        height: 438,
        cursor: "pointer",
      }}
    >
      <Swiper
        loop={true}
        style={{ height: "100%" }}
        pagination={{ clickable: true }}
        modules={[Pagination]}
      >
        <SwiperSlide>
          <img src={banner_manga} width={"100%"} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={banner_1} width={"100%"} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={banner_2} width={"100%"} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={banner_3} width={"100%"} />
        </SwiperSlide>
      </Swiper>
    </Box>
  );
}
