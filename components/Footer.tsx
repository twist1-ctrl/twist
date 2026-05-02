import { Box, Container, Typography, Link as MuiLink } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

export default function Footer() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const year = new Date().getFullYear();

  const links = [
    { href: '/terms', label: t('footer.terms') },
    { href: '/privacy', label: t('footer.privacy') },
    { href: '/accessibility', label: t('footer.accessibility') },
  ];

  return (
    <Box
      component="footer"
      sx={{
        borderTop: '1px solid',
        borderColor: 'divider',
        py: 2.5,
        mt: 'auto',
        bgcolor: 'rgba(255,255,255,0.6)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 1.5,
            direction: router.locale === 'he' ? 'rtl' : 'ltr',
          }}
        >
          <Typography variant="caption" color="text.secondary">
            &copy; {year} {router.locale === 'he' ? 'טוויסט' : 'TWIST'}. {router.locale === 'he' ? 'כל הזכויות שמורות.' : 'All rights reserved.'}
          </Typography>

          <Box sx={{ display: 'flex', gap: 2.5, flexWrap: 'wrap' }}>
            {links.map((link) => (
              <MuiLink
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); router.push(link.href); }}
                underline="hover"
                variant="caption"
                color="text.secondary"
                sx={{ cursor: 'pointer', '&:hover': { color: 'text.primary' } }}
              >
                {link.label}
              </MuiLink>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
