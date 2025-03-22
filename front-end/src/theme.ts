import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// A custom theme for this app
let theme = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;