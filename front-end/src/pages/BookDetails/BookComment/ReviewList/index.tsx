import { Avatar, Box, Rating, Stack, Typography } from "@mui/material";
import { deepOrange, grey } from "@mui/material/colors";
import { ReviewBookResponseDTO } from "~/types/review";

export function ReviewList({ rv }: { rv: ReviewBookResponseDTO[] }) {
  return (
    <Box display={"flex"} flexDirection={"column"} gap={5}>
      {rv.map((rv) => (
        <Box display={"flex"} width={"100%"} alignItems={"flex-start"}>
          <Box
            display={"flex"}
            gap={1.5}
            alignItems={"center"}
            sx={{ width: "20%", flexShrink: 0 }}
          >
            <Avatar sx={{ bgcolor: deepOrange[500] }}>
              {rv.user.username.slice(0, 2)}
            </Avatar>
            <Stack gap={0.5}>
              <Typography
                sx={{ fontWeight: "medium", fontSize: 16, lineHeight: 1 }}
              >
                {rv.user.username}
              </Typography>
              <Typography sx={{ fontSize: 14, color: grey["A700"] }}>
                {rv.created_at}
              </Typography>
            </Stack>
          </Box>
          <Stack spacing={1}>
            <Rating value={rv.rating} size="small" readOnly />
            <Typography fontSize={"small"}>{rv.review_text}</Typography>
          </Stack>
        </Box>
      ))}
    </Box>
  );
}
