import { Box, CircularProgress, Stack } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useEffect, useMemo, useState } from "react";
import { Section } from "~/components/Section";
import { SectionBody } from "~/components/Section/SectionBody";
import { SectionHeader } from "~/components/Section/SectionHeader";
import { BookOnTop } from "./BookOnTop";
import { BookOnTopDetails } from "./BookOnTopDetails";
import { useHomeContext } from "~/context/HomeContext";
import { BookDetailsDTO } from "~/types/book";

export function TopWeekly() {
  const { topWeekly, isLoading, error } = useHomeContext();
  const [selectedBook, setSelectedBook] = useState<BookDetailsDTO | null>(null);

  useEffect(() => {
    if (topWeekly.length > 0) {
      setSelectedBook(topWeekly[0]);
    }
  }, [topWeekly]);

  const handleSelectBook = (book: BookDetailsDTO) => {
    setSelectedBook(book);
  };

  const renderContent = useMemo(() => {
    if (topWeekly.length === 0) {
      return <Box padding={2}>Không có dữ liệu.</Box>;
    }

    return (
      <Box>
        <Box
          sx={{
            display: "flex",
            paddingTop: 2,
            paddingLeft: 2,
            alignItems: "start",
          }}
        >
          <Stack
            spacing={2}
            sx={{
              flex: 3,
              borderRight: `1px solid ${grey[500]}`,
              height: "100%",
            }}
          >
            {topWeekly.map((book, index) => (
              <Box onMouseOver={() => handleSelectBook(book)}>
                <BookOnTop
                  key={book.bookId}
                  book={{
                    index: index + 1,
                    author: book.author,
                    name: book.title,
                    thumbnail: book.imageUrls[0],
                  }}
                />
              </Box>
            ))}
          </Stack>

          <Box
            sx={{
              flex: 4,
              paddingLeft: 4,
              overflow: "auto",
              height: 570,
            }}
          >
            {selectedBook && (
              <BookOnTopDetails
                book={{
                  author: selectedBook.author,
                  description: selectedBook.description,
                  image: selectedBook.imageUrls[0],
                  name: selectedBook.title,
                  price: selectedBook.price,
                  rating: 4.5, // Bạn có thể lấy từ selectedBook nếu có
                }}
              />
            )}
          </Box>
        </Box>
      </Box>
    );
  }, [topWeekly, selectedBook]);

  return (
    <Section>
      <SectionHeader
        bgColor={grey[900]}
        title="Bảng xếp hạng tuần"
        textColor="white"
      />
      <SectionBody
        content={isLoading ? <CircularProgress sx={{ m: 3 }} /> : renderContent}
      />
    </Section>
  );
}
