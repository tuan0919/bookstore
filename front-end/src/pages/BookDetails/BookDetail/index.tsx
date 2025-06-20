import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  IconButton,
  Link,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import { BookGallery } from "../BookGallery";
import { BookGalleryMocks } from "~/mocks/BookGalleryMocks";
import { red } from "@mui/material/colors";
import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import AddCardRoundedIcon from "@mui/icons-material/AddCardRounded";
import { BookOverview } from "../BookOverview";
import { BookInformation } from "../BookInformation";
import { BookPreview } from "../BookPreview";
import { BookRating } from "../BookRating";
import { BookComment } from "../BookComment";
import { BookRelated } from "../BookRelated";
import { useState } from "react";
import { SaveBookDialog } from "../SaveBookDialog";
import { NewBookCollectionDialog } from "../SaveBookDialog/NewBookCollectionDialog";
import { useBookDetailsContext } from "~/context/BookDetailsContext";
import CustomSnackbar from "~/components/Popup/Snackbar";
import { useTranslation } from "react-i18next";
import { CATEGORY_CODE_TO_NAME } from "~/constant/category";
const CustomizeBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  backgroundColor: "white",
  borderRadius: 8,
  padding: theme.spacing(2),
  alignItems: "center",
  gap: theme.spacing(2),
  height: "fit-content",
}));

export function BookDetails() {
  const { addToCart, categoryChain } = useBookDetailsContext();
  type CategoryCode = keyof typeof CATEGORY_CODE_TO_NAME;
  const breadcrumbs = (categoryChain?.list || []).map((c) => (
    <Link key={c.id} href={`/category?categoryId=${c.id}&page=1&size=12`}>
      {CATEGORY_CODE_TO_NAME[c.name as CategoryCode]}
    </Link>
  ));
  const [open, setOpen] = useState(false);
  const [openSubDialog, setOpenSubDialog] = useState(false);
  const [initStateSnackbar, setStateSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
    duration: 800,
  });
  const { t } = useTranslation();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Container sx={{ paddingRight: "0 !important;" }}>
        <Breadcrumbs sx={{ marginY: 3 }} separator="›" aria-label="breadcrumb">
          {breadcrumbs}
        </Breadcrumbs>
        <Stack direction={"row"} display={"flex"} gap={2}>
          <CustomizeBox sx={{ position: "sticky", top: 10, bottom: 10 }}>
            <BookGallery gallery={BookGalleryMocks} />
            <Box display={"flex"} width={"100%"} gap={2}>
              <Button
                variant="outlined"
                disableTouchRipple
                color="error"
                startIcon={<AddShoppingCartRoundedIcon />}
                sx={{
                  borderWidth: 2,
                  borderColor: red["A700"],
                  textTransform: "none",
                }}
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  addToCart();
                  setStateSnackbar({
                    open: true,
                    message: "Đã thêm vào giỏ hàng",
                    severity: "success",
                    duration: 800,
                  });
                }}
              >
                <Typography fontWeight={"bold"}>
                  {t("page.bookDetail.buttonAddToCart")}
                </Typography>
              </Button>
              {/* Popup thông báo thêm sách  */}
              <CustomSnackbar
                open={initStateSnackbar.open}
                onClose={() =>
                  setStateSnackbar({ ...initStateSnackbar, open: false })
                }
                message={initStateSnackbar.message}
                severity="success"
                duration={initStateSnackbar.duration}
              />
              <Button
                variant="contained"
                disableTouchRipple
                color="error"
                startIcon={<AddCardRoundedIcon />}
                sx={{ textTransform: "none" }}
              >
                <Typography fontWeight={"bold"}>
                  {t("page.bookDetail.buttonBuyNow")}
                </Typography>
              </Button>
              <IconButton onClick={handleClickOpen}>
                <BookmarkBorderRoundedIcon />
              </IconButton>
            </Box>
            <BookRating sx={{ width: "100%" }} />
          </CustomizeBox>
          <Stack gap={2}>
            <CustomizeBox>
              <BookOverview sx={{ width: "100%" }} />
            </CustomizeBox>
            <CustomizeBox>
              <BookInformation />
            </CustomizeBox>
            <CustomizeBox>
              <BookPreview />
            </CustomizeBox>
          </Stack>
        </Stack>
        <Stack mt={2}>
          <CustomizeBox>
            <BookComment sx={{ width: "100%" }} />
          </CustomizeBox>
        </Stack>
        <Box mt={2}>
          <BookRelated />
        </Box>
      </Container>
      <SaveBookDialog
        onClose={handleClose}
        open={open}
        onClickAddBtn={() => {
          setOpen(false);
          setOpenSubDialog(true);
        }}
      />
      <NewBookCollectionDialog
        onClose={() => setOpenSubDialog(false)}
        open={openSubDialog}
      />
    </>
  );
}
