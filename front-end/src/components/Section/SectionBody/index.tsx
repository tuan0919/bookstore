import { Box } from "@mui/material";
import { ReactNode } from "react";

export function SectionBody ({content} : {content: ReactNode}) {
    return (
    <Box sx={{
            paddingTop: 1,
            paddingBottom: 2,
            bgcolor: 'white',
            borderBottomLeftRadius: 10, 
            borderBottomRightRadius: 10,
            minHeight: 300,
            '& .swiper-slide': {
                display: 'flex',
                justifyContent: 'center',
            }
        }}>
        {content}
    </Box>
    )    
}