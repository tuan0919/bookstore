
import { Box } from '@mui/material';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import { grey } from '@mui/material/colors';
import { useState } from 'react';
import { CategoryDrawer } from '~/components/NavBar/CategoryDrawer';

export function CategoryButton() {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  console.log('Category Button re-render')
  return (
    <>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer'
      }}
        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
      >
        <WidgetsOutlinedIcon fontSize='large' sx={{
          color: {
            xs: grey[200],
            md: grey[600],
          },
          fontSize: {
            xs: 28,
            md: 34
          }
        }} />
      </Box>
      <CategoryDrawer
        setClose={() => setIsDrawerOpen(false)}
        open={isDrawerOpen}
      />
    </>
  )
}