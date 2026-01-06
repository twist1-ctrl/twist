import { createTheme } from '@mui/material/styles';
import { PaletteOptions } from '@mui/material/styles';
import { COLORS, HOVER_COLORS } from './constants/colors';

declare module '@mui/material/styles' {
  interface Palette {
    nav: {
      active: string;
      inactive: string;
      hover: string;
    };
  }
  interface PaletteOptions {
    nav?: {
      active: string;
      inactive: string;
      hover: string;
    };
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: COLORS.primary,
      dark: HOVER_COLORS.primaryHover,
      light: '#8fb9ad',
      contrastText: COLORS.white,
    },
    secondary: {
      main: COLORS.secondary,
      dark: '#8a2925',
      light: '#d96660',
      contrastText: COLORS.white,
    },
    background: {
      default: COLORS.lightGray,
      paper: COLORS.white,
    },
    text: {
      primary: COLORS.darkGray,
      secondary: '#666666',
    },
    nav: {
      active: COLORS.white,
      inactive: 'rgba(255,255,255,0.7)',
      hover: COLORS.white,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: COLORS.primary,
          color: COLORS.white,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          '&:hover': {
            backgroundColor: HOVER_COLORS.primaryHover,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: COLORS.white,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: '#e0e0e0',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: COLORS.white,
        },
      },
    },
  },
  typography: {
    fontFamily: '"Ploni AAA", sans-serif',
    h1: {
      color: COLORS.primary,
      fontWeight: 700,
    },
    h2: {
      color: COLORS.primary,
      fontWeight: 600,
    },
    h3: {
      color: COLORS.primary,
      fontWeight: 600,
    },
    h4: {
      color: COLORS.primary,
      fontWeight: 600,
    },
  },
});