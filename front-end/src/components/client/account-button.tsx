import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

export function ProfileButton() {
    return (
            <Box sx={{
                position: 'relative',
            }}>
                <Stack
                id={'profile-button'}
                role="button"
                aria-haspopup="true"
                sx={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    "&:hover ~ .account-menu": {
                        opacity: 1,
                        visibility: 'visible',
                    }
                }}>
                    <PersonOutlineOutlinedIcon sx={{
                    fontSize: 30,
                    color: {
                        xs: grey[200],
                        md: grey[600],
                    },
                    }}/>
                    <Typography 
                    sx={{
                        color: grey[600],
                        fontWeight: 'light',
                        fontSize: '13px',
                        display: {
                            xs: 'none',
                            md: 'block',
                        }
                    }}>
                    Tài khoản
                    </Typography>
                </Stack>
                <Paper
                className='account-menu'
                sx={{
                    position: "absolute",
                    top: 50,
                    right: 0,
                    p: 1,
                    width: 200,
                    bgcolor: "white",
                    borderRadius: 1,
                    display: "flex",
                    gap: 1,
                    opacity: 0,
                    flexDirection: 'column',
                    boxShadow: "0px 2px 8px rgba(0,0,0,0.32)",
                    zIndex: 10,
                    visibility: "hidden",
                    "&:hover": {
                        opacity: 1,
                        visibility: "visible",
                    }
                }}>
                    <Button variant='contained' color='error'>Đăng nhập</Button>
                    <Button variant='outlined' color='error'>Đăng ký</Button>
                </Paper>
            </Box>
    )
}