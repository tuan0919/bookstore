import { NavBar } from "~/components/NavBar";
import { Carousel } from "./Carousel";
import { Box, Container } from "@mui/material";
import { Event } from "./Event";

export function Home() {
    return (
        <>
            <NavBar/>
            <Container sx={{marginTop: 2}}>
                <Carousel/>
                <Box sx={{marginTop: 2}}>
                    <Event/>
                </Box>
            </Container>
        </>
    )
}