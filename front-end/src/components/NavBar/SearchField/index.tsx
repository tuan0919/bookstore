import { Box, Button, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

export function SearchField() {
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