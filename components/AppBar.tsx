import { useRouter } from 'next/router';
import {
  AppBar as MuiAppBar,
  Toolbar,
  Button,
  Box,
  Link as MuiLink,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useLocale } from '../hooks/useLocale';
import LanguageSwitcher from './LanguageSwitcher';
import { navLinkStyles } from '../styles/navLinkStyles';

export default function AppBar() {
  const router = useRouter();
  const theme = useTheme();
  const { t } = useLocale();

  // Highlight active route
  const isActive = (path: string) => router.pathname === path;

  const navItems = [
    { href: '/', label: t('navigation.signup') },
    { href: '/packages', label: t('navigation.packages') },
    { href: '/posts', label: t('navigation.posts') },
  ];

  return (
    <MuiAppBar position="sticky">
      <Toolbar>
        <Box sx={{ display: 'flex', gap: 2, flex: 1 }}>
          {navItems.map((item) => (
            <MuiLink
              key={item.href}
              href={item.href}
              underline="none"
              onClick={(e) => {
                e.preventDefault();
                router.push(item.href);
              }}
              sx={navLinkStyles(theme, isActive(item.href))}
            >
              {item.label}
            </MuiLink>
          ))}
        </Box>
        <LanguageSwitcher />
      </Toolbar>
    </MuiAppBar>
  );
}
