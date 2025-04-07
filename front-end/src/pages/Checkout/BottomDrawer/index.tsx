import { Box, SxProps, Theme } from "@mui/material";
import shadows from "@mui/material/styles/shadows";

export function BottomDrawer({ sx = undefined }: { sx?: SxProps<Theme> }) {
    return (
        <Box sx={{ ...sx, backgroundColor: 'white', width: '100%', height: 200, boxShadow: shadows['20'] }}>

        </Box>
    )
}