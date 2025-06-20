import { Box, Typography } from "@mui/material";
import { ContentTable } from "./ContentTable";
import { useTranslation } from "react-i18next";
export function BookInformation() {
    const {t} = useTranslation();
    return (
        <Box>
            <Typography sx={{ fontWeight: 'medium', marginBottom: 2 }} fontSize={'large'}>
                {t('page.bookDetail.bookInfo.frist')}
            </Typography>
            <ContentTable />
            <Typography fontSize={'small'} sx={{ marginTop: 2 }}>
                {t('page.bookDetail.bookInfo.third')}
            </Typography>
        </Box>
    )
}