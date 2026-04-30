import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
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
import { GA_ID, pageview } from '../services/analytics';
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

  useEffect(() => {
    const handleRouteChange = (url: string) => pageview(url);
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => router.events.off('routeChangeComplete', handleRouteChange);
  }, [router.events]);

  return (
    <ThemeProvider theme={currentTheme}>
      <Head>
        <title>{t('meta.siteTitle')}</title>
      </Head>
      {GA_ID && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          />
          <Script
            id="gtag-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { page_path: window.location.pathname });
              `,
            }}
          />
        </>
      )}
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
