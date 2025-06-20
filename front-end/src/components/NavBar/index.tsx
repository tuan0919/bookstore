import { Box, Container, Grid2, Stack } from "@mui/material";
import { red } from "@mui/material/colors";
import topBanner from "~/assets/top-banner.png";
import logo from "~/assets/logo2.png";
import { NotificationButton } from "./NotificationButton";
import { ProfileButton } from "./ProfileButton";
import { LanguageButton } from "./LanguageButton";
import { SearchField } from "./SearchField";
import { CategoryButton } from "./CategoryButton";
import { CartButton } from "./CartButton";
import { useNavigate } from "react-router-dom";
export function NavBar() {
  const navigate = useNavigate();
  return (
    <Stack direction="column" sx={{ backgroundColor: "white" }}>
      <Box sx={{ backgroundColor: "#C92127" }}>
        <Container>
          <Box
            component="div"
            sx={{
              position: "relative",
              width: "100%",
              display: { xs: "none", sm: "block" },
            }}
          >
            <img src={topBanner} width={"100%"} alt={""} />
          </Box>
        </Container>
      </Box>
      <Container
        sx={{
          backgroundColor: { md: "transparent", xs: red["600"] },
        }}
      >
        <Grid2
          container
          paddingY={{ xs: 1, md: 2 }}
          spacing={1}
          sx={{
            height: { md: "auto" },
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Grid2
            sx={{ justifyContent: "center", display: "flex" }}
            size={{ xs: 12, md: 3 }}
          >
            <Box
              component={"button"}
              sx={{
                backgroundColor: "transparent",
                border: "none",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: { xs: "5rem", md: "4rem" },
                width: { xs: "5rem", md: "12rem" },
              }}
              onClick={() => navigate("/home")}
            >
              <img src={logo} alt="Logo" width={"100%"} />
            </Box>
          </Grid2>
          <Grid2 size={{ xs: 7, md: 3 }}>
            <Stack direction="row" sx={{ gap: 1, justifyContent: "center" }}>
              <CategoryButton />
              <SearchField />
            </Stack>
          </Grid2>
          <Grid2 size={{ xs: 5, md: 3 }}>
            <Stack
              alignItems={"center"}
              justifyContent={"flex-end"}
              direction={"row"}
              spacing={2}
            >
              <NotificationButton />
              <CartButton />
              <ProfileButton />
              <LanguageButton />
            </Stack>
          </Grid2>
        </Grid2>
      </Container>
    </Stack>
  );
}
