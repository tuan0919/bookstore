import { Box, Pagination, SxProps, Theme, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { InputBox } from "./InputBox";
import { RemindBox } from "./RemindBox";
import { useBookComment } from "~/hooks/use-book-comment";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { ReviewList } from "./ReviewList";

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
  return (
    <Box sx={{ ...sx, display: "flex", flexDirection: "column", gap: 3 }}>
      <Typography sx={{ fontWeight: "medium" }} fontSize={"large"}>
        Bình luận sản phẩm
      </Typography>
      {localStorage.getItem("access_token") ? <InputBox /> : <RemindBox />}
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
