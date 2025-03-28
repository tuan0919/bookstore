import { Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Property } from "csstype";
import React from "react";

interface SectionHeaderProps {
    title: string,
    iconHeader?: React.ReactElement,
    iconBackground?: Property.BackgroundColor,
    bgColor?: Property.BackgroundColor,
    textColor?: Property.Color
}

export function SectionHeader({title, iconHeader = undefined, 
    iconBackground = 'white', 
    bgColor = 'white', 
    textColor = grey['900'],
} : SectionHeaderProps) {
    return (
        <Box sx={{
            flexDirection: 'row', 
            display: 'flex', 
            gap: 1, 
            borderTopLeftRadius: 10, 
            borderTopRightRadius: 10,
            alignItems: 'center'
        }} bgcolor={bgColor} padding={1}>
        {iconHeader ? <Box sx={{
                height: 30,
                width: 30,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 2,
                background: iconBackground
            }}>
            {iconHeader}
        </Box> : undefined}
        <Typography sx={{textTransform: 'uppercase'}} fontWeight={'bold'} color={textColor}>
            {title}
        </Typography>
    </Box>
    )
}