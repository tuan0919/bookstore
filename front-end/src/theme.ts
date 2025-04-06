import { grey } from '@mui/material/colors';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// A custom theme for this app
let theme = createTheme({
  cssVariables: true,
  typography: {
    fontFamily: `"Segoe UI", Arial, sans-serif`,
  },
  palette: {
    background: {
      default: grey['100']
    },
    primary: {
      main: '#C92127',
    },
    secondary: {
      main: '#19857b',
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;