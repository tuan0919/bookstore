import { Box, Rating, Stack, Typography } from "@mui/material";
import Parser from "html-react-parser";
import { BookOnTopType } from "~/types/BookOnTopType";

type BookOnTopDetailsProps = {
  book: BookOnTopType;
};

export function BookOnTopDetails({ book }: BookOnTopDetailsProps) {
  return (
    <Stack sx={{ paddingRight: 4 }}>
      <Box sx={{ display: "flex" }}>
        <img src={book.image} alt="" width={250} />
        <Stack spacing={1}>
          <Typography sx={{ fontWeight: 600, fontSize: 25 }}>
            {book.name}
          </Typography>
          <Box display={"flex"} gap={1}>
            <Typography display={"inline-block"}>Tác giả:</Typography>
            <Box component="span" sx={{ fontWeight: 600 }}>
              {book.author}
            </Box>
          </Box>
          <Rating
            size="small"
            name="text-feedback"
            value={book.rating}
            readOnly
            precision={0.5}
          />
        </Stack>
      </Box>
      {Parser(book.description)}
    </Stack>
  );
}
