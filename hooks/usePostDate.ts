import { useMemo } from 'react';
import { HDate, gematriya } from '@hebcal/core';

const hebrewMonths = [
  'ניסן', 'אייר', 'סיוון', 'תמוז', 'אב', 'אלול',
  'תשרי', 'חשוון', 'כסלו', 'טבת', 'שבט', 'אדר',
];

const hebrewMonthsLeap = [
  'ניסן', 'אייר', 'סיוון', 'תמוז', 'אב', 'אלול',
  'תשרי', 'חשוון', 'כסלו', 'טבת', 'שבט', 'אדר א׳', 'אדר ב׳',
];

function toDate(value: Date | string): Date {
  return value instanceof Date ? value : new Date(value);
}

export function formatHebrewDate(value: Date | string): string {
  const date = toDate(value);
  const hdate = new HDate(date);
  const day = gematriya(hdate.getDate());
  const monthList = hdate.isLeapYear() ? hebrewMonthsLeap : hebrewMonths;
  const monthName = monthList[hdate.getMonth() - 1];
  const year = gematriya(hdate.getFullYear());

  return `${day} ${monthName} ${year}`;
}

export function formatGregorianDate(value: Date | string, locale?: string): string {
  const date = toDate(value);
  return date.toLocaleDateString(locale);
}

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
