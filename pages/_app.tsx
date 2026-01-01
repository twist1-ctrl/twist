import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Create theme with RTL support
const themes = {
  he: createTheme({
    direction: 'rtl',
    palette: {
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
      nav: {
        active: '#fff',
        inactive: 'rgba(255,255,255,0.7)',
        hover: '#fff',
      },
    },
  }),
  en: createTheme({
    direction: 'ltr',
    palette: {
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
      nav: {
        active: '#fff',
        inactive: 'rgba(255,255,255,0.7)',
        hover: '#fff',
      },
    },
  }),
};

function App({ Component, pageProps }: AppProps) {
  const { locale } = useRouter();
  const [mounted, setMounted] = useState(false);
  const currentTheme = themes[locale as keyof typeof themes] || themes.he;

  useEffect(() => {
    setMounted(true);
    // Set document direction
    document.documentElement.dir = locale === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = locale || 'he';
  }, [locale]);

  if (!mounted) return null;

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default App;
