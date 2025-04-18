import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Box, Typography } from "@mui/material";

import { BookDetails } from "./pages/BookDetails";
import { MainLayout } from "./components/MainLayout";
import { ProfileUser } from "./pages/ProfileUser";

import CategoryPage from "./pages/Category";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/profileUser" />} />
          <Route path="/details" Component={BookDetails} />
          <Route path="/home" Component={Home} />
          <Route path="/profileUser" Component={ProfileUser} />
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
      </Routes>
    </>
  );
}

export default App;
