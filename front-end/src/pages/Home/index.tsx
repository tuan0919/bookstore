import { NavBar } from "~/components/NavBar";
import { Carousel } from "./Carousel";
import { Container } from "@mui/material";
import { Event } from "./Event";
import { Collection } from "./Collection";
import { default as Footer } from "~/components/Footer";
import { TopWeekly } from "./TopWeekly";
export function Home() {
    return (
        <>
            <NavBar/>
            <Container sx={{marginTop: 2, display: 'flex', flexDirection: 'column', gap: 2}}>
                <Carousel/>
                <Event/>
                <Collection/>
                <TopWeekly/>
                <Footer/>
            </Container>
            
        </>
    )
}