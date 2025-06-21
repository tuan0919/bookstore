import { Box, Pagination, SxProps, Theme, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { InputBox } from "./InputBox";
import { RemindBox } from "./RemindBox";
import { useBookComment } from "~/hooks/use-book-comment";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { ReviewList } from "./ReviewList";
import { addNewReview } from "~/api/review";
import { useTranslation } from "react-i18next";
export function BookComment({
  sx = undefined,
}: {
  sx?: SxProps<Theme> | undefined;
}) {
  const { id } = useParams();
  const { page, size, setPage, reviews, totalPages, fetchReviews } =
    useBookComment();
  useEffect(() => {
    fetchReviews(Number(id), page, size);
  }, [id, page]);
  const { t } = useTranslation();
  return (
    <Box sx={{ ...sx, display: "flex", flexDirection: "column", gap: 3 }}>
      <Typography sx={{ fontWeight: "medium" }} fontSize={"large"}>
        {t("page.bookDetail.bookComment.title")}
      </Typography>
      {localStorage.getItem("access_token") ? (
        <InputBox
          onSubmit={async ({ rating, text }) => {
            await addNewReview(text, rating, Number(id));
            if (page === 0) {
              fetchReviews(Number(id), page, size);
            } else {
              setPage(1); // will automatically fetch reviews
            }
          }}
        />
      ) : (
        <RemindBox />
      )}
      <ReviewList rv={reviews} />
      <Box justifyContent={"center"} display={"flex"}>
        <Pagination
          count={totalPages}
          shape="rounded"
          onChange={(_, pagPage) => {
            setPage(pagPage - 1);
          }}
          sx={{
            "& .Mui-selected": {
              backgroundColor: red["700"],
              color: "white",
              fontWeight: "medium",
            },
            "& .MuiPaginationItem-root:hover": {
              backgroundColor: red["50"],
            },
          }}
        />
      </Box>
    </Box>
  );
}
