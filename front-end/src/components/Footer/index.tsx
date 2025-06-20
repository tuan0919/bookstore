import {
  Box,
  Container,
  Grid2,
  Typography,
  Stack,
  Link,
  List,
  ListItem,
} from "@mui/material";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import CallIcon from "@mui/icons-material/Call";
import logoImage from '~/assets/logo.png';
import { useTranslation } from "react-i18next";
function Footer() {
  const {t} = useTranslation();
  const socialLinks = [
    {
      href: "",
      src: "https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/footer/Insta-on.png",
      alt: "Instagram",
    },
    {
      href: "",
      src: "https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/footer/Facebook-on.png",
      alt: "Facebook",
    },
    {
      href: "",
      src: "https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/footer/Youtube-on.png",
      alt: "YouTube",
    },
    {
      href: "",
      src: "https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/footer/tumblr-on.png",
      alt: "Tumblr",
    },
    {
      href: "",
      src: "https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/footer/twitter-on.png",
      alt: "Twitter",
    },
    {
      href: "",
      src: "https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/footer/pinterest-on.png",
      alt: "Pinterest",
    },
  ];
  const sourceDownload = [
    {
      src: "https://cdn0.fahasa.com/media/wysiwyg/Logo-NCC/android1.png",
      href: "",
    },
    {
      src: "https://cdn0.fahasa.com/media/wysiwyg/Logo-NCC/appstore1.png",
      href: "",
    },
  ];

  return (
    <Box sx={{ marginTop: 2, backgroundColor: "white" }}>
      <Container maxWidth="lg">
        <Grid2 container spacing={2} justifyContent="flex-start">
          {/* Cột 1: Thông tin website */}
          <Grid2 marginTop={3} size={{ xs: 12, sm: 6, md: 4 }}>
            <Box
              component={"img"}
              src={logoImage}
              sx={{ width: 226, height: 41 }}
            ></Box>
            <p style={{ fontSize: 13 }}>
              {t("footer.info.first")}
              <br />
              {t("footer.info.second")}
             
            </p>
            <Box
              component={"img"}
              src="https://cdn0.fahasa.com/media/wysiwyg/Logo-NCC/logo-bo-cong-thuong-da-thong-bao1.png"
              sx={{ width: 100, height: 30 }}
            ></Box>
            <List sx={{ display: "flex", gap: 2, justifyContent: "left" }}>
              {socialLinks.map((item, index) => (
                <ListItem key={index} sx={{ width: "auto", p: 0 }}>
                  <Link
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Box
                      component="img"
                      src={item.src}
                      alt={item.alt}
                      sx={{
                        width: 40,
                        height: 40,
                        transition: "0.3s",
                        "&:hover": { transform: "scale(1.1)" },
                      }}
                    />
                  </Link>
                </ListItem>
              ))}
            </List>
            <List sx={{ display: "flex", gap: 2, justifyContent: "left" }}>
              {sourceDownload.map((item, index) => (
                <ListItem key={index} sx={{ width: "auto", p: 0 }}>
                  <Link
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Box
                      component="img"
                      src={item.src}
                      sx={{
                        width: 100,
                        height: 30,
                        transition: "0.3s",
                        "&:hover": { transform: "scale(1.1)" },
                      }}
                    />
                  </Link>
                </ListItem>
              ))}
            </List>
          </Grid2>
          <Box sx={{ borderRight: "1px solid black", height: "300px", opacity: 0.2, marginTop: 3 }} />
          {/* Cột 2: Thông tin bên lề */}
          <Grid2 columns={20} size={{ xs: 12, sm: 6, md: 4 }} marginTop={2}>
            {/* Row 1 */}
            <Stack direction="row" spacing={4} alignItems="flex-start">
              {" "}
              {/* Stack ngang + khoảng cách giữa các Stack */}
              <Stack sx={{ display: "flex", minWidth: "250px" }}>
                <Container
                  sx={{ fontWeight: "bold", fontSize: 16, marginBottom: 1 }}
                >
                  {t("footer.anotherInfo.column1.title")}
                </Container>
                <div style={{ marginBottom: 10 }}>
                  <Link
                    href="#"
                    color="inherit"
                    underline="hover"
                    fontSize={13}
                  >
                   {t("footer.anotherInfo.column1.item1")}
                  </Link>
                </div>
                <div style={{ marginBottom: 10 }}>
                  <Link
                    href="#"
                    color="inherit"
                    underline="hover"
                    fontSize={13}
                  >
                    {t("footer.anotherInfo.column1.item2")}
                  </Link>
                </div>
                <div style={{ marginBottom: 10 }}>
                  <Link
                    href="#"
                    color="inherit"
                    underline="hover"
                    fontSize={13}
                  >
                   {t("footer.anotherInfo.column1.item3")}
                  </Link>
                </div>
                <div style={{ marginBottom: 10 }}>
                  <Link
                    href="#"
                    color="inherit"
                    underline="hover"
                    fontSize={13}
                  >
                  {t("footer.anotherInfo.column1.item4")}
                  </Link>
                </div>
                <div style={{ marginBottom: 10 }}>
                  <Link
                    href="#"
                    color="inherit"
                    underline="hover"
                    fontSize={13}
                  >
                   {t("footer.anotherInfo.column1.item5")}
                  </Link>
                </div>
              </Stack>
              <Stack sx={{ display: "flex", minWidth: "200px" }}>
                <Container
                  sx={{ fontWeight: "bold", fontSize: 16, marginBottom: 1 }}
                >
                  {t("footer.anotherInfo.column2.title")}
                </Container>
                <div style={{ marginBottom: 10 }}>
                  <Link
                    href="#"
                    color="inherit"
                    underline="hover"
                    fontSize={13}
                  >
                   {t("footer.anotherInfo.column2.item1")}
                  </Link>
                </div>
                <div style={{ marginBottom: 10 }}>
                  <Link
                    href="#"
                    color="inherit"
                    underline="hover"
                    fontSize={13}
                  >
                   {t("footer.anotherInfo.column2.item2")}
                  </Link>
                </div>
                <div style={{ marginBottom: 10 }}>
                  <Link
                    href="#"
                    color="inherit"
                    underline="hover"
                    fontSize={13}
                  >
                  {t("footer.anotherInfo.column2.item3")}
                  </Link>
                </div>
                <div style={{ marginBottom: 10 }}>
                  <Link
                    href="#"
                    color="inherit"
                    underline="hover"
                    fontSize={13}
                  >
                    {t("footer.anotherInfo.column2.item4")}
                  </Link>
                </div>
              </Stack>
              <Stack sx={{ display: "flex", minWidth: "220px" }}>
                <Container
                  sx={{ fontWeight: "bold", fontSize: 16, marginBottom: 1 }}
                >
                  {t("footer.anotherInfo.column3.title")}
                </Container>
                <div style={{ marginBottom: 10 }}>
                  <Link
                    href="#"
                    color="inherit"
                    underline="hover"
                    fontSize={13}
                  >
                    {t("footer.anotherInfo.column3.item1")}
                  </Link>
                </div>
                <div style={{ marginBottom: 10 }}>
                  <Link
                    href="#"
                    color="inherit"
                    underline="hover"
                    fontSize={13}
                  >
                   {t("footer.anotherInfo.column3.item2")}
                  </Link>
                </div>
                <div style={{ marginBottom: 10 }}>
                  <Link
                    href="#"
                    color="inherit"
                    underline="hover"
                    fontSize={13}
                  >
                   {t("footer.anotherInfo.column3.item3")}
                  </Link>
                </div>
                <div style={{ marginBottom: 10 }}>
                  <Link
                    href="#"
                    color="inherit"
                    underline="hover"
                    fontSize={13}
                  >
                  {t("footer.anotherInfo.column3.item4")}
                  </Link>
                </div>
              </Stack>
            </Stack>
            <Stack>
              <Container sx={{ fontWeight: "bold", fontSize: 16, marginBottom: 1 }}>
              {t("footer.anotherInfo.column4.title")}
              </Container>
              <Stack direction="row" spacing={5.7} alignItems="center" >
                <Box minWidth={220} fontSize={13} display="flex">
                  <AddLocationIcon sx={{ fontSize: 16, marginRight: 0.5 }} />
                 {t("footer.anotherInfo.column4.item1")}
                </Box>
                <Box minWidth={200} fontSize={13} display="flex">
                  <MarkunreadIcon sx={{ fontSize: 16, marginRight: 0.5 }} />
                  cskh@fahasa.com.vn
                </Box>
                <Box minWidth={200} fontSize={13} display="flex">
                  <CallIcon sx={{ fontSize: 16, marginRight: 0.5 }} />
                  1900636467
                </Box>
              </Stack>
            </Stack>
            <Stack marginTop={2}>
              <Stack marginLeft={3} direction={"row"} spacing={20} >
                <Box component={"img"} src="https://cdn0.fahasa.com/media/wysiwyg/Logo-NCC/logo_lex.jpg" width={90} height={44}></Box>
                <Box component={"img"} src="https://cdn0.fahasa.com/media/wysiwyg/Logo-NCC/Logo_ninjavan.png" width={150} height={71}></Box>
                <Box component={"img"} src="https://cdn0.fahasa.com/media/wysiwyg/Logo-NCC/vnpost1.png" width={100} height={49}></Box>
              </Stack>
              <Stack marginTop={2} marginLeft={-2} direction={"row"} spacing={13}>
                <Box component={"img"} src="https://cdn1.fahasa.com/media//wysiwyg/Logo-NCC/vnpay_logo.png" width={120} height={41}></Box>
                <Box component={"img"} src="https://cdn1.fahasa.com/media//wysiwyg/Logo-NCC/momopay.png" width={50} height={50}></Box>
                <Box component={"img"} src="https://cdn1.fahasa.com/media//wysiwyg/Logo-NCC/shopeepay_logo.png" width={95} height={44}></Box>
                <Box component={"img"} src="https://cdn1.fahasa.com/media//wysiwyg/Logo-NCC/logo_zalopay_2.png" width={176} height={40}></Box>
              </Stack>
            </Stack>
          </Grid2>
        </Grid2>

        {/* Dòng bản quyền */}
        <Box mt={3} textAlign="center">
          <Typography color="#adadad" fontSize={12} marginBottom={1} variant="body2">
            {t("footer.anotherInfo.copyrightInfo")}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
export default Footer;
