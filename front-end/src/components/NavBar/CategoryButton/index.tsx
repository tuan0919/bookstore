
import { Box } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import { grey } from '@mui/material/colors';

export function CategoryButton() {
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