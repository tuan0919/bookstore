import { NavBar } from "~/components/NavBar";
import { Carousel } from "./Carousel";
import { Container } from "@mui/material";
import { Event } from "./Event";
import { Collection } from "./Collection";

export function Home() {
    return (
        <>
            <NavBar/>
            <Container sx={{marginTop: 2, display: 'flex', flexDirection: 'column', gap: 2}}>
                <Carousel/>
                <Event/>
                <Collection/>
            </Container>
        </>
    )
}