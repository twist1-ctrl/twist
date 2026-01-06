import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface LocaleData {
  [key: string]: any;
}

export function useLocale() {
  const { locale } = useRouter();
  const [localeData, setLocaleData] = useState<LocaleData>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load JSON based on current locale
    const loadLocale = async () => {
      try {
        const response = await fetch(`/locales/${locale}/common.json`);
        const data = await response.json();
        setLocaleData(data);
      } catch (error) {
        console.error('Failed to load locale:', error);
      } finally {
        setLoading(false);
      }
    };

    loadLocale();
  }, [locale]);

  // Get text: t('home.title') or t('navigation.signup')
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = localeData;

    for (const k of keys) {
      value = value?.[k];
    }

    return typeof value === 'string' ? value : key;
  };

  // Determine text direction based on locale
  const direction = locale === 'he' ? 'rtl' : 'ltr';

  return { t, locale, direction, loading };
}
