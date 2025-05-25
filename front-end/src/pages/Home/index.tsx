import { Carousel } from "./Carousel";
import { Container } from "@mui/material";
import { LightNovel } from "./LightNovel";
import { Collection } from "./Collection";
import { TopWeekly } from "./TopWeekly";
import { HomeProvider } from "~/context/HomeContext";
import { Manga } from "./Manga";
export function Home() {
  return (
    <HomeProvider>
      <Container
        sx={{ marginTop: 2, display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Carousel />
        <LightNovel />
        <Manga />
        <Collection />
        <TopWeekly />
      </Container>
    </HomeProvider>
  );
}
