import { Box, Button, Container, Grid2, Stack, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import { grey, red } from '@mui/material/colors';
import { LanguageButton } from './client/language-button';
import { ProfileButton } from './client/account-button';
import { NotificationButton } from './client/notification-button';
import topBanner from '/top-banner.png';
import logo from '/logo.png';

function SearchField() {
  return (
    <Box sx={{
      border: '1px solid #4d4d4d',
      paddingX: '8px',
      paddingY: '2px',
      borderRadius: 2,
      flex: {
        md: 1,
        xs: 0,
      },
      width: {
        md: 'auto',
        xs: 190
      },
      backgroundColor: {
        xs: 'white',
      },
      display: 'flex',
      alignItems: 'center',
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
      <img src={topBanner} alt={''}/>
    </Box>
  )
}

function Logo() {
  return (
    <Box sx={{
        position: "relative",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: {
          xs: '100%',
          md: '100%'
        },
        width: {
          xs: '50%',
          md: '80%'
        }
      }}>
      <img
        src={logo}
        alt="Logo"
        width={'100%'}
        style={{ objectFit: "contain"}}
      />
    </Box>
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

export function Header() {
  return (
    <Stack direction='column' sx={{backgroundColor: 'white'}}>
      <HeaderUpBanner/>
      <Container sx={{
        backgroundColor: {
          md: 'transparent',
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
          <Grid2
          sx={{
            justifyContent: 'center',
            display: 'flex',
          }}
          size={{
            xs: 12,
            md: 3
          }}>
            <Logo/>
          </Grid2>
          <Grid2 size={{
            xs: 7,
            md: 3
          }}>
            <Stack 
            direction='row'
            sx={{
              gap: 1,
              justifyContent: 'center'
            }}>
              <CategoryButton/>
              <SearchField/>
            </Stack>
          </Grid2>
          <Grid2 size={{
            xs: 5,
            md: 3
          }}>
            <Stack alignItems={'center'} justifyContent={'flex-end'} direction={'row'} spacing={2}>
              <NotificationButton/>
              <CartButton/>
              <ProfileButton/>
              <LanguageButton/>
            </Stack>
          </Grid2>
        </Grid2>
      </Container>
    </Stack>
  )
}