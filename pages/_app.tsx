import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme as baseTheme } from '../theme';
import { COLORS, HOVER_COLORS } from '../constants/colors';
import '../styles/globals.css';

// Create theme with RTL/LTR support based on locale
const createLocalizedTheme = (direction: 'rtl' | 'ltr') => {
  return createTheme({
    ...baseTheme,
    direction,
  });
};

const themes = {
  he: createLocalizedTheme('rtl'),
  en: createLocalizedTheme('ltr'),
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
