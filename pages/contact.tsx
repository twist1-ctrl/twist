import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '../components/Layout';

export default function ContactPage() {
  const { t } = useTranslation('common');
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@twist.co.il';
  const contactPhone = process.env.NEXT_PUBLIC_CONTACT_PHONE || '053-592-8598';
  const whatsappPhone = process.env.NEXT_PUBLIC_CONTACT_WHATSAPP || contactPhone;
  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(contactEmail)}`;

  const sanitizedPhone = contactPhone.replace(/[^\d+]/g, '');
  const whatsappDigits = whatsappPhone.replace(/\D/g, '');
  const whatsappIntl = whatsappDigits.startsWith('0')
    ? `972${whatsappDigits.slice(1)}`
    : whatsappDigits;

  return (
    <Layout>
      <Box sx={{ maxWidth: 900, mx: 'auto', py: { xs: 2, sm: 4 } }}>
        <Typography variant="h3" component="h1" sx={{ mb: 1 }}>
          {t('contact.title')}
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
          {t('contact.subtitle')}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          {t('contact.description')}
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, minmax(0, 1fr))',
              lg: 'repeat(3, minmax(0, 1fr))',
            },
            gap: 2.5,
            alignItems: 'stretch',
          }}
        >
          <Card sx={{ height: '100%', borderRadius: 3, border: '1px solid rgba(0,0,0,0.07)' }}>
            <CardContent sx={{ p: 3 }}>
              <EmailOutlinedIcon color="secondary" sx={{ fontSize: 32, mb: 1 }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>
                {t('contact.email')}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {contactEmail}
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                href={gmailComposeUrl}
                target="_blank"
                rel="noopener noreferrer"
                fullWidth
              >
                {t('contact.actionEmail')}
              </Button>
            </CardContent>
          </Card>

          <Card sx={{ height: '100%', borderRadius: 3, border: '1px solid rgba(0,0,0,0.07)' }}>
            <CardContent sx={{ p: 3 }}>
              <PhoneOutlinedIcon color="secondary" sx={{ fontSize: 32, mb: 1 }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>
                {t('contact.phone')}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {contactPhone}
              </Typography>
              <Button
                variant="outlined"
                color="secondary"
                href={`tel:${sanitizedPhone}`}
                fullWidth
              >
                {t('contact.actionPhone')}
              </Button>
            </CardContent>
          </Card>

          <Card sx={{ height: '100%', borderRadius: 3, border: '1px solid rgba(0,0,0,0.07)' }}>
            <CardContent sx={{ p: 3 }}>
              <WhatsAppIcon sx={{ fontSize: 32, mb: 1, color: '#25D366' }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>
                {t('contact.whatsapp')}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {whatsappPhone}
              </Typography>
              <Button
                variant="contained"
                href={`https://wa.me/${whatsappIntl}`}
                target="_blank"
                rel="noopener noreferrer"
                fullWidth
                sx={{ bgcolor: '#25D366', '&:hover': { bgcolor: '#1ea957' } }}
              >
                {t('contact.actionWhatsapp')}
              </Button>
            </CardContent>
          </Card>
        </Box>
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
