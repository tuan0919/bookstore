import {
  Box,
  Link,
  Rating,
  Skeleton,
  Stack,
  styled,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import { blue, grey, red, yellow } from "@mui/material/colors";
import { useBookDetailsContext } from "~/context/BookDetailsContext";

const LabelText = styled(Typography)(() => ({
  fontSize: 14,
  fontWeight: "medium",
}));

const StrongText = styled(Typography)(() => ({
  fontSize: 14,
  fontWeight: "bold",
  color: grey["800"],
}));

const LinkText = styled(Link)(() => ({
  fontSize: 14,
  textDecoration: "none",
  fontWeight: 500,
  color: blue["400"],
  cursor: "pointer",
}));

const WrapText = styled(Box)(({ theme }) => ({
  alignItems: "center",
  display: "flex",
  gap: theme.spacing(1),
}));

export function BookOverview({ sx = undefined }: { sx?: SxProps<Theme> }) {
  const { bookDetails, isLoading } = useBookDetailsContext();
  return (
    <Stack sx={sx} spacing={1}>
      {isLoading ? (
        <Skeleton variant="rectangular" width={450} height={30} />
      ) : (
        <Typography fontWeight={"bold"} fontSize={25}>
          {bookDetails?.title}
        </Typography>
      )}
      <Box display={"flex"} justifyContent={"space-between"}>
        <Stack spacing={1}>
          <WrapText>
            {isLoading ? (
              <>
                <Skeleton variant="rectangular" width={130} height={20} />
                <Skeleton variant="rectangular" width={130} height={20} />
              </>
            ) : (
              <>
                <LabelText>Nhà phát hành:</LabelText>
                <StrongText>{bookDetails?.publisher}</StrongText>
              </>
            )}
          </WrapText>
          <WrapText>
            {isLoading ? (
              <>
                <Skeleton variant="rectangular" width={130} height={20} />
                <Skeleton variant="rectangular" width={130} height={20} />
              </>
            ) : (
              <>
                <LabelText>Nhà xuất bản:</LabelText>
                <StrongText>{bookDetails?.supplier}</StrongText>
              </>
            )}
          </WrapText>
        </Stack>
        <Stack spacing={1} paddingRight={10}>
          <WrapText>
            {isLoading ? (
              <>
                <Skeleton variant="rectangular" width={130} height={20} />
                <Skeleton variant="rectangular" width={130} height={20} />
              </>
            ) : (
              <>
                <LabelText>Tác giả:</LabelText>
                <LinkText href="#">{bookDetails?.author}</LinkText>
              </>
            )}
          </WrapText>
          <WrapText>
            {isLoading ? (
              <>
                <Skeleton variant="rectangular" width={130} height={20} />
                <Skeleton variant="rectangular" width={130} height={20} />
              </>
            ) : (
              <>
                <LabelText>Hình thức bìa:</LabelText>
                <StrongText>{bookDetails?.format}</StrongText>
              </>
            )}
          </WrapText>
        </Stack>
      </Box>
      <Box display={"flex"} alignItems={"center"} gap={1}>
        <Rating
          size="small"
          name="text-feedback"
          value={5}
          readOnly
          precision={0.5}
        />
        <Typography
          sx={{ color: yellow["800"], fontWeight: "medium", fontSize: 14 }}
        >
          {`(43 đánh giá)`}
        </Typography>
      </Box>
      <Box display={"flex"} alignItems={"center"} gap={2}>
        {isLoading ? (
          <Skeleton variant="rectangular" width={200} height={30} />
        ) : (
          <Typography
            sx={{ fontWeight: "medium", color: red["700"], fontSize: 30 }}
          >
            {bookDetails?.discountedPrice.toLocaleString("vi-VN")} đ
          </Typography>
        )}
        {isLoading ? (
          <Skeleton variant="rectangular" width={100} height={20} />
        ) : (
          <Typography
            fontSize={"medium"}
            sx={{ color: grey["700"], textDecoration: "line-through" }}
          >
            {bookDetails?.price.toLocaleString("vi-VN")} đ
          </Typography>
        )}
        {/* <Box
          display={"flex"}
          bgcolor={red["700"]}
          alignItems={"center"}
          justifyContent={"center"}
          paddingX={1}
          paddingY={0.1}
          borderRadius={1}
        >
          <Typography sx={{ fontWeight: "medium", color: "white" }}>
            -20%
          </Typography>
        </Box> */}
        {isLoading ? (
          <Skeleton variant="rectangular" width={50} height={20} />
        ) : (
          <Box
            display={"flex"}
            bgcolor={red["700"]}
            alignItems={"center"}
            justifyContent={"center"}
            paddingX={1}
            paddingY={0.1}
            borderRadius={1}
          >
            <Typography sx={{ fontWeight: "medium", color: "white" }}>
              -{25}%
            </Typography>
          </Box>
        )}
      </Box>
      <Box bgcolor={blue["50"]} paddingY={1} paddingX={1} borderRadius={1}>
        {isLoading ? (
          <Skeleton variant="rectangular" width={200} height={20} />
        ) : (
          <Typography sx={{ color: blue["700"], fontWeight: "medium" }}>
            Số lượng còn trong kho: {bookDetails?.qtyInStock}
          </Typography>
        )}
      </Box>
    </Stack>
  );
}
