import { Box, Button, CircularProgress } from "@mui/material";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { grey, red } from "@mui/material/colors";
import { BookCard } from "~/components/BookCard";
import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { SectionHeader } from "~/components/Section/SectionHeader";
import { useMemo } from "react";
import { Section } from "~/components/Section";
import { SectionBody } from "~/components/Section/SectionBody";
import { useBookDetailsContext } from "~/context/BookDetailsContext";
import { useNavigate } from "react-router-dom";

export function BookRelated() {
  const { relatedBooks, isLoading, categoryChain, error } =
    useBookDetailsContext();
  const navigate = useNavigate();
  const headerIcon = useMemo(
    () => <AutoStoriesIcon sx={{ color: grey["100"], fontSize: 20 }} />,
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
          {relatedBooks ? (
            relatedBooks.map((book, index) => (
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
            ))
          ) : (
            <CircularProgress />
          )}
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
            onClick={() =>
              navigate(
                `/category?categoryId=${
                  categoryChain?.list[categoryChain.list.length - 1]?.id
                }&page=1&size=12`
              )
            }
          >
            Xem Thêm
          </Button>
        </Box>
      </>
    ),
    [relatedBooks]
  );
  return (
    <Section>
      <SectionHeader
        iconHeader={headerIcon}
        iconBackground={`linear-gradient(to left top , ${red["800"]}, ${red["400"]})`}
        title="Truyện tranh"
        bgColor={"rgb(252, 221, 239)"}
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
