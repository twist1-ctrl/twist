import { createTheme } from '@mui/material/styles';
import { PaletteOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
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
      main: '#1976d2', // דוגמה לצבע ראשי
    },
    secondary: {
      main: '#dc004e', // דוגמה לצבע משני
    },
    nav: {
      active: '#fff',
      inactive: 'rgba(255,255,255,0.7)',
      hover: '#fff',
    },
  },
  typography: {
    // ניתן להוסיף הגדרות טיפוגרפיה אם נדרש
  },
});