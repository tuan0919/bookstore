import { Stack } from "@mui/material";
import { ReactNode } from "react";

export function Section ({children} : {children: ReactNode}) {
    return (
        <Stack direction="column">
            {children}
        </Stack>
    )    
}