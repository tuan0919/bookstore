import { Box, Stack } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useMemo } from "react";
import { Section } from "~/components/Section";
import { SectionBody } from "~/components/Section/SectionBody";
import { SectionHeader } from "~/components/Section/SectionHeader";
import { BookOnTop } from "./BookOnTop";
import { BookOnTopDetails } from "./BookOnTopDetails";
import { TopWeeklyMocks } from "~/mocks/TopWeeklyMocks";

export function TopWeekly() {
    const bodyContent = useMemo(() => (
        <Box>
            <Box sx={{display: 'flex', paddingTop: 2, paddingLeft: 2, alignItems: 'start'}}>
                <Stack sx={{flex: 3, borderRight: `1px solid ${grey['500']}`, height: '100%'}} spacing={2}>
                    <BookOnTop/>
                    <BookOnTop/>
                    <BookOnTop/>
                    <BookOnTop/>
                    <BookOnTop/>
                </Stack>
                <Box sx={{flex: 4, paddingLeft: 4, overflow: 'auto', height: 570}}>
                    <BookOnTopDetails book={TopWeeklyMocks[0]}/>
                </Box>
            </Box>
        </Box>
    ), []);
    return (
        <Section>
            <SectionHeader
            bgColor={grey['900']} 
            title="Bảng xếp hạng tuần"
            textColor="white"
            />
            <SectionBody content={bodyContent}/>
        </Section>
    )
}