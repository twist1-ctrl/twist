import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { appWithTranslation } from 'next-i18next';
import { useTranslation } from 'next-i18next';
import { theme as baseTheme } from '../theme';
import { COLORS, HOVER_COLORS } from '../constants/colors';
import { useRouteChange } from '../hooks/useRouteChange';
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
  const router = useRouter();
  const { locale } = router;
  const { t } = useTranslation('common');
  const { isLoading: isRouteChanging } = useRouteChange();
  const currentTheme = themes[locale as keyof typeof themes] || themes.he;

  useEffect(() => {
    // Set document direction
    document.documentElement.dir = locale === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = locale || 'he';
  }, [locale]);

  return (
    <ThemeProvider theme={currentTheme}>
      <Head>
        <title>{t('meta.siteTitle')}</title>
      </Head>
      <CssBaseline />
      {isRouteChanging && (
        <Box
          sx={{
            position: 'fixed',
            inset: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: 'rgba(255, 255, 255, 0.75)',
            zIndex: 9999,
          }}
        >
          <CircularProgress size={48} />
        </Box>
      )}
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default appWithTranslation(App);
