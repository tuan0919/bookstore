import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Box, Typography } from "@mui/material";
import { BookDetails } from "./pages/BookDetails";
import CategoryPage from "./pages/Category";
import { Checkout } from "./pages/Checkout";
import { useMemo } from "react";
import { NavBar } from "./components/NavBar";
import Footer from "./components/Footer";

function App() {
  const CheckoutLayout = useMemo(() => {
    return (
      <>
        <NavBar />
        <Box component="main">
          <Outlet />
        </Box>
      </>
    )
  }, []);

  const MainLayout = useMemo(() => {
    return (
      <>
        <NavBar />
        <Box component="main">
          <Outlet />
        </Box>
        <Footer />
      </>
    )
  }, []);
  return (
    <>
      <Routes>
        <Route element={MainLayout}>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/details" Component={BookDetails} />
          <Route path="/home" Component={Home} />
          <Route
            path="*"
            element={
              <Box>
                <Typography>Không tồn tại</Typography>
              </Box>
            }
          />
          <Route path="/category/*" element={<CategoryPage />} />
        </Route>
        <Route element={CheckoutLayout}>
          <Route path="/checkout" Component={Checkout} />
        </Route>
      </Routes >
    </>
  );
}

export default App;
