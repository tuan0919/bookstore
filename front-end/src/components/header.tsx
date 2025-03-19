import { Box, Button, Grid2, Stack, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import * as React from 'react';
import Image from 'next/image';
import { grey, red } from '@mui/material/colors';
import { LanguageButton } from './client/language-button';

function SearchField() {
  return (
    <Box sx={{
      border: '1px solid #4d4d4d',
      paddingX: '8px',
      paddingY: '2px',
      borderRadius: 2,
      width: {
        md: '90%',
        xs: 190
      },
      backgroundColor: {
        xs: 'white',
      },
      display: 'flex',
      alignItems: 'center',
      gap: '20px'
    }}>
      <TextField
        placeholder='Tự học Toán lớp 12'
        variant="standard" sx={{
          width: 400,
        }}
        slotProps={{
          select: {
            disableUnderline: true,
          },
          input: {
            disableUnderline: true,
          }
        }}
      />
      <Button variant="contained"
      size='small'
      disableTouchRipple
      color='error' sx={{
        paddingY: '4px',
        display: {
          xs: 'none',
          md: 'flex',
        },
        alignItems: 'center',
      }}>
        <SearchIcon fontSize='small'/>
      </Button>
    </Box>
  )
}

function CategoryButton() {
  return (
    <Box sx={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
      <WidgetsOutlinedIcon fontSize='large' sx={{
        color: {
          xs: grey[200],
          md: grey[600],
        },
        fontSize: {
          xs: 28,
          md: 34
        }
      }}/>
      <KeyboardArrowDownIcon sx={{
        display: {
          xs: 'none',
          md: 'block',
        },
        color: {
          xs: grey[200],
          md: grey[600],
        },
      }}/>
    </Box>
  )
}

function HeaderUpBanner() {
  return (
    <Box component='div' sx={{
      position: "relative",
      width: '100%',
      height: {xl: '70px'},
      display: {
        xs: 'none',
        sm: 'block',
      }
    }}>
      <Image src="/top-banner.png" alt={''} fill/>
    </Box>
  )
}

function Logo() {
  return (
    <Box sx={{
        position: "relative",
        height: {
          xs: '30px',
          md: '45px'
        },
      }}>
      <Image
        src="/logo.png"
        fill
        priority
        alt="Logo"
        style={{ objectFit: "contain", position: 'absolute'}}
      />
    </Box>
  )
}

function NotificationButton() {
  return (
    <Stack direction={'column'} sx={{
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      display: {
        xs: 'none',
        md: 'flex',
      }
    }}>
      <NotificationsOutlinedIcon sx={{
        fontSize: 30,
        color: grey[500],
      }}/>
      <Typography sx={{
        color: grey[600],
        fontWeight: 'light',
        fontSize: '13px',
      }}>
        Thông Báo
      </Typography>
    </Stack>
  )
}

function CartButton() {
  return (
    <Stack direction={'column'} sx={{
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
    }}>
      <AddShoppingCartRoundedIcon sx={{
        fontSize: 30,
        color: {
          xs: grey[200],
          md: grey[600],
        },
      }}/>
      <Typography sx={{
        color: {
          xs: grey[200],
          md: grey[600],
        },
        fontWeight: 'light',
        fontSize: '13px',
        display: {
          xs: 'none',
          md: 'block',
        }
      }}>
        Giỏ hàng
      </Typography>
    </Stack>
  )
}

function ProfileButton() {
  return (
    <Stack direction={'column'} sx={{
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
    }}>
      <PersonOutlineOutlinedIcon sx={{
        fontSize: 30,
        color: {
          xs: grey[200],
          md: grey[600],
        },
      }}/>
      <Typography sx={{
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
  )
}

export function Header() {
  return (
    <Stack direction='column'>
      <HeaderUpBanner/>
      <Box sx={{
        backgroundColor: {
          md: 'white',
          xs: red['600']
        }
      }}>
      <Grid2 container
        paddingY={{xs: 1, md: 2}}
        spacing={1}
        sx={{
          height: {
            md: '80px',
          },
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <Grid2 size={{
            xs: 12,
            md: 3
          }}>
            <Logo/>
          </Grid2>
          <Grid2 size={{
            xs: 7,
            md: 3
          }}>
            <Box sx={{
              display: 'flex', 
              gap: '20px',
              justifyContent: 'center'
            }}>
              <CategoryButton/>
              <SearchField/>
            </Box>
          </Grid2>
          <Grid2 size={{
            xs: 5,
            md: 3
          }}>
            <Stack alignItems={'center'} direction={'row'} spacing={2}>
              <NotificationButton/>
              <CartButton/>
              <ProfileButton/>
              <LanguageButton/>
            </Stack>
          </Grid2>
        </Grid2>
      </Box>
    </Stack>
  )
}