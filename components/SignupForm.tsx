import { useState } from 'react';
import { TextField, Button, Box, Alert } from '@mui/material';
import { useLocale } from '../hooks/useLocale';

export default function SignupForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { t } = useLocale();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // API call here
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 3000);
    }, 500);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        gap: 1,
        maxWidth: 500,
        mx: 'auto',
        mt: 3,
        flexDirection: { xs: 'column', sm: 'row' },
      }}
    >
      <TextField
        type="email"
        placeholder={t('home.emailPlaceholder')}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        fullWidth
        size="small"
        variant="outlined"
      />
      <Button
        type="submit"
        variant="contained"
        disabled={loading}
        sx={{ whiteSpace: 'nowrap' }}
      >
        {loading ? t('home.loading') : t('home.submit')}
      </Button>
      {submitted && (
        <Alert severity="success" sx={{ width: '100%' }}>
          תודה על ההרשמה!
        </Alert>
      )}
    </Box>
  );
}
