import { Box, Typography } from "@mui/material";
import { ContentTable } from "./ContentTable";

export function BookInformation() {
    return (
        <Box>
            <Typography sx={{ fontWeight: 'medium', marginBottom: 2 }} fontSize={'large'}>
                Thông tin sản phẩm
            </Typography>
            <ContentTable />
            <Typography fontSize={'small'} sx={{ marginTop: 2 }}>
                Giá sản phẩm trên đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...
            </Typography>
        </Box>
    )
}