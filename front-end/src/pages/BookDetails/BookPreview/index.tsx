import { Box, Typography } from "@mui/material";
import HTMLReactParser from "html-react-parser/lib/index";
import { BookDetailsMocks } from "~/mocks/BookDetailsMocks";
export function BookPreview() {
    return (
        <Box>
            <Typography sx={{ fontWeight: 'medium', marginBottom: 2 }} fontSize={'large'}>
                Mô tả sản phẩm
            </Typography>
            <Box sx={{
                '& *': { fontSize: 15 }
            }}>
                {HTMLReactParser(BookDetailsMocks.preview)}
            </Box>
        </Box>
    )
}