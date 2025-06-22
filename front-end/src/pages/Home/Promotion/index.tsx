import { Box, Button, CircularProgress } from "@mui/material";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { green, grey, red } from "@mui/material/colors";
import { BookCard } from "~/components/BookCard";
import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { SectionHeader } from "~/components/Section/SectionHeader";
import { Section } from "~/components/Section";
import { SectionBody } from "~/components/Section/SectionBody";
import { useHomeContext } from "~/context/HomeContext";
import { useNavigate } from "react-router-dom";

export function Promotion() {
  const { activePromotions, promotionBooks, isLoading } = useHomeContext();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <Section>
        <SectionHeader
          iconHeader={
            <LibraryBooksIcon sx={{ color: grey["100"], fontSize: 20 }} />
          }
          iconBackground={`linear-gradient(to left top , ${green["800"]}, ${green["400"]})`}
          title="Khuyến mãi"
          bgColor={"rgb(209, 245, 198)"}
        />
        <SectionBody
          content={
            <Box
              display={"flex"}
              flex={1}
              height={"100%"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <CircularProgress />
            </Box>
          }
        />
      </Section>
    );
  }

  if (!activePromotions || activePromotions.length === 0) {
    return null;
  }

  return (
    <>
      {activePromotions.map((promotion, index) => {
        console.log("promotionBooks[index].content", promotionBooks);
        const books = promotionBooks[index].content;
        if (!books || books.length === 0) return null;

        const bookCards = books.map((b, index) => (
          <SwiperSlide key={index}>
            <BookCard
              card={{
                discountPercentage: b.discountPercentage,
                bookId: b.bookId,
                title: b.title,
                discountPrice: b.discountedPrice,
                originallPrice: b.price,
                thumbnail: b.imageUrl,
              }}
            />
          </SwiperSlide>
        ));

        return (
          <Section key={promotion.promotionId}>
            <SectionHeader
              iconHeader={
                <LibraryBooksIcon sx={{ color: grey["100"], fontSize: 20 }} />
              }
              iconBackground={`linear-gradient(to left top , ${green["800"]}, ${green["400"]})`}
              title={promotion.promotionName}
              bgColor={"rgb(209, 245, 198)"}
              subTitle={
                promotion.categories && promotion.categories.length > 0
                  ? `Danh mục: ${promotion.categories
                      .map((c) => c.categoryName)
                      .join(", ")}`
                  : undefined
              }
            />
            <SectionBody
              content={
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
                      onClick={() =>
                        navigate(
                          `/category?categoryId=${
                            promotion.categories?.[0]?.categoryId ?? 1
                          }&page=1&size=12`
                        )
                      }
                    >
                      Xem Thêm
                    </Button>
                  </Box>
                </>
              }
            />
          </Section>
        );
      })}
    </>
  );
}
