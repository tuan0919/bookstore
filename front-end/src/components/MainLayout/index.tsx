import { Box } from "@mui/material";
import Footer from "../Footer";
import { NavBar } from "../NavBar";
import { Outlet } from "react-router-dom";

export function MainLayout() {
    return (
        <>
            <NavBar />
            <Box component="main">
                <Outlet />
            </Box>
            <Footer />
        </>
    )
}