import { Box, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '../components/Layout';
import SignupForm from '../components/SignupForm';

export default function Home() {
  const { t } = useTranslation('common');

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

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
