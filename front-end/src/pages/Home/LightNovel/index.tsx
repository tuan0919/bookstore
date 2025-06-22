import { Box, Button, CircularProgress } from "@mui/material";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { green, grey, red } from "@mui/material/colors";
import { BookCard } from "~/components/BookCard";
import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { SectionHeader } from "~/components/Section/SectionHeader";
import { useMemo } from "react";
import { Section } from "~/components/Section";
import { SectionBody } from "~/components/Section/SectionBody";
import { useHomeContext } from "~/context/HomeContext";
import { useNavigate } from "react-router-dom";

export function LightNovel() {
  const { lnBooks, isLoading, error } = useHomeContext();
  const navigate = useNavigate();
  const bookCards = lnBooks.map((book, index) => (
    <SwiperSlide key={index}>
      <BookCard
        card={{
          discountPercentage: book.discountPercentage,
          bookId: book.bookId,
          title: book.title,
          discountPrice: book.discountedPrice,
          originallPrice: book.price,
          thumbnail: book.imageUrl,
        }}
      />
    </SwiperSlide>
  ));
  const headerIcon = useMemo(
    () => <LibraryBooksIcon sx={{ color: grey["100"], fontSize: 20 }} />,
    []
  );
  const bodyContent = useMemo(
    () => (
      <>
        <Swiper
          loop={true}
          style={{ height: "100%", paddingBottom: 2 }}
          slidesPerView={4}
          grabCursor
        >
          {bookCards}
        </Swiper>
        <Box justifyContent={"center"} display={"flex"} marginTop={2}>
          <Button
            variant="outlined"
            color="error"
            sx={{
              borderWidth: 2,
              paddingX: 8,
              borderColor: red["800"],
              textTransform: "capitalize",
            }}
            onClick={() => navigate(`/category?categoryId=4&page=1&size=12`)}
          >
            Xem Thêm
          </Button>
        </Box>
      </>
    ),
    [bookCards]
  );
  return (
    <Section>
      <SectionHeader
        iconHeader={headerIcon}
        iconBackground={`linear-gradient(to left top , ${green["800"]}, ${green["400"]})`}
        title="Tiểu thuyết"
        bgColor={"rgb(209, 245, 198)"}
      />
      <SectionBody
        content={
          !isLoading ? (
            bodyContent
          ) : (
            <Box
              display={"flex"}
              flex={1}
              height={"100%"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <CircularProgress />
            </Box>
          )
        }
      />
    </Section>
  );
}
