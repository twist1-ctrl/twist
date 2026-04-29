import { useRouter } from 'next/router';
import {
  AppBar as MuiAppBar,
  Toolbar,
  Box,
  Link as MuiLink,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'next-i18next';

export default function AppBar() {
  const router = useRouter();
  const theme = useTheme();
  const { t } = useTranslation('common');

  // Highlight active route
  const isActive = (path: string) => router.pathname === path;

  const navItems = [
    { href: '/', label: t('navigation.signup') },
    { href: '/posts', label: t('navigation.posts') },
    { href: '/contact', label: t('navigation.contact') },
  ];

  return (
    <MuiAppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: 'transparent',
        color: 'text.primary',
        boxShadow: 'none',
        top: 0,
      }}
    >
      <Toolbar
        sx={{
          mt: 1.25,
          mx: { xs: 1, sm: 2 },
          minHeight: { xs: 64, sm: 72 },
          px: { xs: 1.5, sm: 2.5 },
          borderRadius: '18px',
          bgcolor: 'rgba(255, 255, 255, 0.78)',
          border: '1px solid rgba(201, 61, 53, 0.18)',
          boxShadow: '0 8px 26px rgba(0, 0, 0, 0.08)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          display: 'flex',
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: { xs: 1, sm: 1.25 },
            flex: 1,
            overflowX: 'auto',
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          {navItems.map((item) => (
            <MuiLink
              key={item.href}
              href={item.href}
              underline="none"
              onClick={(e) => {
                e.preventDefault();
                router.push(item.href);
              }}
              sx={{
                color: isActive(item.href) ? theme.palette.secondary.main : theme.palette.text.secondary,
                fontWeight: isActive(item.href) ? 700 : 500,
                px: { xs: 1.25, sm: 1.6 },
                py: 0.7,
                borderRadius: '999px',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease',
                bgcolor: isActive(item.href) ? 'rgba(201, 61, 53, 0.1)' : 'transparent',
                '&:hover': {
                  color: theme.palette.secondary.main,
                  bgcolor: 'rgba(201, 61, 53, 0.08)',
                },
              }}
            >
              {item.label}
            </MuiLink>
          ))}
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            px: { xs: 1.25, sm: 1.5 },
            py: { xs: 0.6, sm: 0.75 },
            bgcolor: '#ffffff',
          }}
        >
          <Box
            component="img"
            src="/resources/logo.png"
            alt="Twist logo"
            sx={{
              height: { xs: 24, sm: 30 },
              width: 'auto',
              display: 'block',
            }}
          />
        </Box>
      </Toolbar>
    </MuiAppBar>
  );
}
