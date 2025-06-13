import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Box, Typography } from "@mui/material";
import  BookDetailsPage  from "./pages/BookDetails/";
import { ProfileUser } from "./pages/ProfileUser";
import CategoryPage from "./pages/Category";
import { Checkout } from "./pages/Checkout";
import { useMemo } from "react";
import { NavBar } from "./components/NavBar";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";
import Search from "./pages/Search";
import OrderDetail from "./components/Order/OrderDetail";
function App() {
  const CheckoutLayout = useMemo(() => {
    return (
      <>
        <NavBar />
        <Box component="main">
          <Outlet />
        </Box>
      </>
    );
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
    );
  }, []);
  return (
    <>
      <Routes>
        <Route element={MainLayout}>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/details" element={<BookDetailsPage />} />
          <Route path="/details/:id/*" element={<BookDetailsPage />} />
          <Route path="/home" Component={Home} />
          <Route path="/profileUser/*" Component={ProfileUser} />
          <Route
            path="/profileUser/orders/view/order_id/:orderId"
            Component={OrderDetail}
          />
          <Route
            path="*"
            element={
              <Box>
                <Typography>Không tồn tại</Typography>
              </Box>
            }
          />
          <Route path="/category/*" element={<CategoryPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/search" Component={Search} />
        </Route>
        <Route element={CheckoutLayout}>
          <Route path="/checkout" Component={Checkout} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
