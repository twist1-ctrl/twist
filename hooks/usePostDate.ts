import { useMemo } from 'react';
import { formatGregorianDate, formatHebrewDate } from '../utils/postDate';

export function usePostDate(value: Date | string, locale?: string) {
  return useMemo(() => {
    const gregorianDate = formatGregorianDate(value, locale);
    const hebrewDate = formatHebrewDate(value);

    return {
      gregorianDate,
      hebrewDate,
      combinedDate: `${gregorianDate} • ${hebrewDate}`,
    };
  }, [value, locale]);
}
