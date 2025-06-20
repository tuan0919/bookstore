import {
  Box,
  Rating,
  Stack,
  styled,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import { yellow } from "@mui/material/colors";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { useBookDetailsContext } from "~/context/BookDetailsContext";
import { useTranslation } from "react-i18next";
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 5,
  borderRadius: 5,
  flexShrink: 0,
  width: "70%",
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
    ...theme.applyStyles("dark", {
      backgroundColor: theme.palette.grey[800],
    }),
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: yellow["800"],
    ...theme.applyStyles("dark", {
      backgroundColor: yellow["800"],
    }),
  },
}));

const LabelText = styled(Typography)(() => ({
  fontSize: 13,
  textWrap: "nowrap",
}));

const RatingBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  flex: 1,
  alignItems: "center",
}));

export function BookRating({ sx = undefined }: { sx?: SxProps<Theme> }) {
  const { reviewOverall } = useBookDetailsContext();
  const { t } = useTranslation();
  return (
    <Stack sx={sx}>
      <Typography sx={{ fontWeight: "medium", fontSize: "large" }}>
        {t("page.bookDetail.rating.title")}
      </Typography>
      <Box display={"flex"} gap={3} alignItems={"center"}>
        <Stack display={"flex"} alignItems={"center"} spacing={0.5}>
          <Box display={"flex"} alignItems={"flex-end"}>
            <Typography
              fontWeight={"medium"}
              sx={{
                fontSize: 50,
                lineHeight: 1.2,
              }}
            >
              {reviewOverall?.avgScore.toFixed(1)}
            </Typography>
            <Typography sx={{ fontSize: 30 }}>/5</Typography>
          </Box>
          <Rating
            value={parseFloat(reviewOverall?.avgScore.toFixed(1) || "0")}
            readOnly
            size="small"
            precision={0.5}
          />
          <Typography
            sx={{
              color: yellow["800"],
              fontWeight: "medium",
              fontSize: 13,
              textWrap: "nowrap",
            }}
          >
            ({reviewOverall?.total} {t("page.bookDetail.rating.item1")})
          </Typography>
        </Stack>
        <Stack
          sx={{
            width: "100%",
            height: "100%",
            paddingY: 2,
            gap: 1,
            display: "flex",
            flexDirection: "column-reverse",
          }}
        >
          {[1, 2, 3, 4, 5].map((value, index) => (
            <RatingBox>
              <LabelText>{value} {t("page.bookDetail.rating.item2")}</LabelText>
              <BorderLinearProgress
                variant="determinate"
                value={
                  reviewOverall?.rates[4 - index]
                    ? parseFloat(reviewOverall.rates[4 - index].toFixed(1))
                    : 0
                }
              />
              <LabelText>
                {reviewOverall?.rates[4 - index].toFixed(1) || 0}%
              </LabelText>
            </RatingBox>
          ))}
        </Stack>
      </Box>
    </Stack>
  );
}
