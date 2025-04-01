import { Accordion, AccordionDetails, AccordionSummary, AccordionSummaryProps, Box, Divider, Drawer, styled, Typography, Link } from "@mui/material";
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import shadows from "@mui/material/styles/shadows";
import { grey, red } from "@mui/material/colors";

interface CategoryDrawerProps {
    open: boolean,
    setClose: () => void,
}

const CustomizeAccordion = styled(Accordion)(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    cursor: 'pointer',
    '&.Mui-expanded': {
        margin: 0,
    },
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&::before': {
        display: 'none',
    },
}));

const CustomizeLink = styled(Link)(() => ({
    color: grey['900'],
    textDecoration: 'none',
    margin: '5px 0',
    fontSize: 14,
    '&:hover': {
        color: red['900'],
        textDecoration: 'underline',
        fontWeight: 500
    }
}));

const CustomizeAccordionSummary = styled((props: AccordionSummaryProps) => {
    return (
        <AccordionSummary
            disableRipple disableTouchRipple
            slots={{
                root: Box, // Thay button bằng Box
            }}
            slotProps={{
                root: {
                    sx: {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        boxShadow: 2,
                        px: 1,
                        pl: 2,
                    },
                },
            }}
            {...props} // Tránh truyền các props lỗi vào Box
        />
    );
})({});


const CustomizeAccordionDetails = styled(AccordionDetails)(() => ({
    paddingLeft: 30,
    display: 'flex',
    flexDirection: 'column'
}));

export function CategoryDrawer({ open, setClose }: CategoryDrawerProps) {
    return (
        <Drawer
            open={open}
            sx={{
                '& .MuiPaper-root': {
                    overflowY: 'visible',
                },
            }}
        >
            <Box display={'flex'} py={2} px={3} position={'relative'}>
                <Typography fontWeight={'bold'}>Khám phá sách theo danh mục</Typography>
                <Box borderRadius={300}
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    bgcolor={'white'}
                    position={'absolute'}
                    right={-13}
                    onClick={setClose}
                    sx={{ cursor: 'pointer' }}
                    boxShadow={shadows['10']}
                >
                    <KeyboardArrowLeftRoundedIcon />
                </Box>
            </Box>
            <Divider />
            <Box sx={{
                width: 300,
                overflowY: 'auto',
                scrollbarWidth: 'none',
                '&::-webkit-scrollbar': {
                    display: 'none'
                },
                '&::-webkit-scrollbar-track': {
                    display: 'none'
                },
            }}>
                <CustomizeAccordion>
                    <CustomizeAccordionSummary
                        expandIcon={<KeyboardArrowDownRoundedIcon />}
                    >
                        <Typography component="span">Sách tiếng việt</Typography>
                    </CustomizeAccordionSummary>
                    <CustomizeAccordionDetails>
                        <CustomizeLink>Manga</CustomizeLink>
                        <CustomizeLink>Comic</CustomizeLink>
                        <CustomizeLink>Manhua</CustomizeLink>
                        <CustomizeLink>Manhwa</CustomizeLink>
                        <CustomizeLink>Light Novel</CustomizeLink>
                    </CustomizeAccordionDetails>
                </CustomizeAccordion>
                <CustomizeAccordion>
                    <CustomizeAccordionSummary
                        expandIcon={<KeyboardArrowDownRoundedIcon />}
                    >
                        <Typography component="span">Sách ngoại văn</Typography>
                    </CustomizeAccordionSummary>
                    <CustomizeAccordionDetails>
                        <CustomizeLink>Manga</CustomizeLink>
                        <CustomizeLink>Comic</CustomizeLink>
                        <CustomizeLink>Manhua</CustomizeLink>
                        <CustomizeLink>Manhwa</CustomizeLink>
                        <CustomizeLink>Light Novel</CustomizeLink>
                    </CustomizeAccordionDetails>
                </CustomizeAccordion>
                <CustomizeAccordion>
                    <CustomizeAccordionSummary
                        expandIcon={<KeyboardArrowDownRoundedIcon />}
                    >
                        <Typography component="span">Sách tiếng nhật</Typography>
                    </CustomizeAccordionSummary>
                    <CustomizeAccordionDetails>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </CustomizeAccordionDetails>
                </CustomizeAccordion>
                <CustomizeAccordion>
                    <CustomizeAccordionSummary
                        expandIcon={<KeyboardArrowDownRoundedIcon />}
                    >
                        <Typography component="span">Sản phẩm giới hạn</Typography>
                    </CustomizeAccordionSummary>
                    <CustomizeAccordionDetails>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </CustomizeAccordionDetails>
                </CustomizeAccordion>
            </Box>
        </Drawer>
    )
}