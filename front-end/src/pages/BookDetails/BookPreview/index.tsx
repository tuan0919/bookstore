import { Box, Typography } from "@mui/material";
import HTMLReactParser from "html-react-parser/lib/index";
import { useBookDetailsContext } from "~/context/BookDetailsContext";
import { BookDetailsMocks } from "~/mocks/BookDetailsMocks";
import { useTranslation } from "react-i18next";
export function BookPreview() {
  const { bookDetails } = useBookDetailsContext();
  const { t } = useTranslation();
  return (
    <Box>
      <Typography
        sx={{ fontWeight: "medium", marginBottom: 2 }}
        fontSize={"large"}
      >
        {t("page.bookDetail.bookPreview")}
      </Typography>
      <Box
        sx={{
          "& *": { fontSize: 15 },
        }}
      >
        {bookDetails?.description ? (
          HTMLReactParser(bookDetails?.description)
        ) : (
          <Typography>Không có mô tả</Typography>
        )}
      </Box>
    </Box>
  );
}
