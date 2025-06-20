import { Box, Button, Divider, Paper, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import icoLoginSVG from '~/assets/ico_login.svg';
import {useTranslation} from 'react-i18next';
export function NotificationButton() {
    const { t } = useTranslation();
    return (
        <Box sx={{ position: 'relative', }}>
            <Stack direction={'column'} sx={{
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                display: { xs: 'none', md: 'flex', },
                "&:hover ~ .notification-feed": { opacity: 1, visibility: 'visible' } 
                }}>
                <NotificationsOutlinedIcon sx={{
                    fontSize: 30,
                    color: { xs: grey[200], md: grey[600] }
                }}/>
                <Typography sx={{ color: grey[600], fontWeight: 'light', fontSize: '13px', }}>
                    {t('navbar.notifications')}
                </Typography>
            </Stack>
            <Paper
            className='notification-feed' sx={{
                position: "absolute",
                top: 50,
                right: 0,
                p: 1,
                width: 250,
                bgcolor: "white",
                borderRadius: 1,
                display: "flex",
                gap: 1,
                opacity: 0, 
                flexDirection: 'column',
                boxShadow: "0px 2px 8px rgba(0,0,0,0.32)",
                zIndex: 10,
                visibility: "hidden",
                "&:hover": { opacity: 1, visibility: "visible", },
                padding: 1,
            }}>
                <Stack direction={'row'} alignItems={'center'} spacing={1}>
                    <NotificationsOutlinedIcon sx={{ fontSize: 25, color: { md: grey[800] } }}/>
                    <Typography fontWeight={600}>
                        Thông báo
                    </Typography>
                </Stack>
                <Divider/>
                <Stack direction={'column'} alignItems={'center'} justifyContent={'center'} spacing={3} py={1}>
                    <img src={icoLoginSVG} alt='icon-login' width={80} height={80}/>
                    <Typography textAlign={'center'}>
                    Vui lòng đăng nhập để xem thông báo
                    </Typography>
                </Stack>
                <Button variant='contained' color='error'>Đăng nhập</Button>
                <Button variant='outlined' color='error'>Đăng ký</Button>
            </Paper>
        </Box>
    )
  }