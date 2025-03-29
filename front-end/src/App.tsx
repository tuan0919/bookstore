import { Navigate, Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { Box, Typography } from "@mui/material"
import { BookDetails } from "./pages/BookDetails"
import { MainLayout } from "./components/MainLayout"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/category" element={undefined} />
          <Route path="/details" Component={BookDetails} />
          <Route path="/home" Component={Home} />
          <Route path="*" element={<Box><Typography>Không tồn tại</Typography></Box>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
