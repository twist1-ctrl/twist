import { Box, Typography } from '@mui/material';
import { useLocale } from '../hooks/useLocale';
import Layout from '../components/Layout';
import SignupForm from '../components/SignupForm';

export default function Home() {
  const { t } = useLocale();

  return (
    <Layout>
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          {t('signupForm.title')}
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          {t('signupForm.subtitle')}
        </Typography>
        <SignupForm />
      </Box>
    </Layout>
  );
}
