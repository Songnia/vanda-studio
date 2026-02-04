import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#f2f20d',
      contrastText: '#181811',
    },
    background: {
      default: '#f8f8f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#181811',
      secondary: '#79747e',
    },
    divider: '#c4c7c5',
  },
  typography: {
    fontFamily: '"Inter", "sans-serif"',
    h1: {
      fontFamily: '"Playfair Display", "serif"',
    },
    h2: {
      fontFamily: '"Playfair Display", "serif"',
    },
    h3: {
      fontFamily: '"Playfair Display", "serif"',
    },
    button: {
      textTransform: 'none',
      fontWeight: 700,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '4px', // Small corner radius as per PRD
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
        },
      },
    },
  },
});

export default theme;
