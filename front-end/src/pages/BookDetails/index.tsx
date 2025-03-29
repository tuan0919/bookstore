import { Box, Breadcrumbs, Button, Container, Link, Typography } from "@mui/material";
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import { BookGallery } from "./BookGallery";
import { BookGalleryMocks } from "~/mocks/BookGalleryMocks";
import { red } from "@mui/material/colors";
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
export function BookDetails() {
    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href="/">
            Foreign books
        </Link>,
        <Link
            underline="hover"
            key="2"
            color="inherit"
            href="/"
        >
            Personal Development
        </Link>,
        <Typography key="3" sx={{ color: 'text.primary' }}>
            Popular Psychology
        </Typography>,
    ];
    return (
        <Container>
            <Breadcrumbs sx={{ marginY: 3 }} separator="›" aria-label="breadcrumb">
                {breadcrumbs}
            </Breadcrumbs>
            <Box sx={{
                display: 'inline-flex',
                flexDirection: 'column',
                backgroundColor: 'white',
                borderRadius: 2,
                padding: 2,
                alignItems: 'center',
                gap: 2,
            }}>
                <BookGallery gallery={BookGalleryMocks} />
                <Box display={'flex'} width={'100%'} gap={2}>
                    <Button variant="outlined"
                        disableTouchRipple
                        color="error"
                        startIcon={<AddShoppingCartRoundedIcon />}
                        sx={{ flex: 1, borderWidth: 2, borderColor: red['A700'], textTransform: 'none' }}>
                        <Typography fontWeight={'bold'}>
                            Thêm vào giỏ hàng
                        </Typography>
                    </Button>
                    <Button variant="contained"
                        disableTouchRipple
                        color="error"
                        sx={{ flex: 1, textTransform: 'none' }}>
                        <Typography fontWeight={'bold'}>
                            Mua ngay
                        </Typography>
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}