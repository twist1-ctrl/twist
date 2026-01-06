import { useRouter } from 'next/router';
import { Select, MenuItem, Box } from '@mui/material';

export default function LanguageSwitcher() {
  const router = useRouter();
  const { locale } = router;

  // Change language via select
  const handleLanguageChange = (e: any) => {
    const newLocale = e.target.value;
    router.push(router.pathname, router.asPath, { locale: newLocale });
  };

  return (
    <Box>
      <Select
        value={locale}
        onChange={handleLanguageChange}
        size="small"
        sx={{
          color: 'white',
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(255,255,255,0.5)',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
          },
          '& .MuiSvgIcon-root': {
            color: 'white',
          },
        }}
      >
        <MenuItem value="he">🇮🇱 עברית</MenuItem>
        <MenuItem value="en">🇺🇸 English</MenuItem>
      </Select>
    </Box>
  );
}
