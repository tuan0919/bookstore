import { Box, Typography } from "@mui/material";
import { Property } from "csstype";
import React from "react";

interface SectionHeaderProps {
    title: string,
    iconHeader: React.ReactElement,
    iconBackground: Property.BackgroundColor,
    bgColor: Property.BackgroundColor
}

export function SectionHeader({title, iconHeader, iconBackground, bgColor} : SectionHeaderProps) {
    return (
        <Box sx={{
            flexDirection: 'row', 
            display: 'flex', 
            gap: 1, 
            borderTopLeftRadius: 10, 
            borderTopRightRadius: 10,
            alignItems: 'center'
        }} bgcolor={bgColor} padding={1}>
        <Box sx={{
                height: 30,
                width: 30,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 2,
                background: iconBackground
            }}>
            {iconHeader}
        </Box>
        <Typography sx={{textTransform: 'uppercase'}} fontWeight={'bold'}>
            {title}
        </Typography>
    </Box>
    )
}