import { Autocomplete, TextField } from '@mui/material';
import { useState } from 'react';
import { useLocale } from '../hooks/useLocale';
import type { City } from '@/constants/cities';
import { ISRAEL_CITIES } from '@/constants/cities';
import { formStyles } from '../constants/componentStyles';

interface CitySelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function CitySelector({ value, onChange }: CitySelectorProps) {
  const { locale, t, direction } = useLocale();
  const [searchInputValue, setSearchInputValue] = useState('');
  
  const textAlign = direction === 'rtl' ? 'right' : 'left';

  // Create options based on current locale
  const options = ISRAEL_CITIES.map((city: City) => ({
    label: locale === 'he' ? city.he : city.en,
    value: city.he, // Store Hebrew name as value for consistency
  }));

  const currentCity = ISRAEL_CITIES.find((city: City) => city.he === value);
  const displayLabel = currentCity
    ? locale === 'he'
      ? currentCity.he
      : currentCity.en
    : value; // Show custom text if not in list

  return (
    <Autocomplete
      options={options}
      value={value ? { label: displayLabel, value: value } : null}
      onChange={(_, newValue) => {
        if (newValue) {
          // If selected from list, use the Hebrew value; if free text, use the text as value
          onChange(typeof newValue === 'string' ? newValue : newValue.value);
          setSearchInputValue('');
        } else {
          onChange('');
          setSearchInputValue('');
        }
      }}
      inputValue={searchInputValue || displayLabel}
      onInputChange={(_, newInputValue, reason) => {
        setSearchInputValue(newInputValue);
        // Allow free text input - save it when user finishes typing
        if (reason === 'input') {
          onChange(newInputValue);
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={t('signupForm.residenceInput')}
          sx={{
            '& .MuiOutlinedInput-root': {
              padding: '0.9rem',
              fontSize: '1.05rem',
            },
            '& .MuiOutlinedInput-input': {
              direction: direction,
              textAlign: textAlign,
            },
          }}
        />
      )}
      noOptionsText={t('signupForm.noOptions') || 'No options'}
      clearText={t('signupForm.clearText') || 'Clear'}
      openText={t('signupForm.openText') || 'Open'}
      closeText={t('signupForm.closeText') || 'Close'}
      componentsProps={{
        paper: {
          sx: {
            '& .MuiAutocomplete-listbox': {
              direction: direction,
            },
          },
        },
      }}
      freeSolo={true}
      selectOnFocus
      clearOnBlur={false}
    />
  );
}
