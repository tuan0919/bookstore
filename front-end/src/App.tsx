import { Navigate, Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { Box, Typography } from "@mui/material"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/category" element={undefined} />
        <Route path="/details" element={undefined} />
        <Route path="/home" Component={Home} />
        <Route path="*" element={<Box><Typography>Không tồn tại</Typography></Box>} />
      </Routes>
    </>
  )
}

export default App
