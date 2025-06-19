import { Box, Link, SxProps, Theme, Typography } from "@mui/material";
import { red } from "@mui/material/colors";

export function RemindBox({
  sx = undefined,
}: {
  sx?: SxProps<Theme> | undefined;
}) {
  return (
    <Box sx={sx} display={"flex"} gap={0.5} justifyContent={"center"} py={1}>
      <Typography>
        Chỉ có thành viên mới có thể viết nhận xét. Vui lòng
      </Typography>
      <Link
        sx={{
          textDecoration: "none",
          color: red["700"],
          fontWeight: "medium",
          cursor: "pointer",
        }}
      >
        đăng nhập
      </Link>
      <Typography>hoặc</Typography>
      <Link
        sx={{
          textDecoration: "none",
          color: red["700"],
          fontWeight: "medium",
          cursor: "pointer",
        }}
      >
        đăng ký
      </Link>
    </Box>
  );
}
