import { Carousel } from "./Carousel";
import { Container } from "@mui/material";
import { Event } from "./Event";
import { Collection } from "./Collection";
import { TopWeekly } from "./TopWeekly";
export function Home() {
    return (
        <Container sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Carousel />
            <Event />
            <Collection />
            <TopWeekly />
        </Container>
    )
}