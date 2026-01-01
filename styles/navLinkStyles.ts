import { Theme } from '@mui/material/styles';

export const navLinkStyles = (theme: Theme, isActive: boolean) => ({
  color: isActive ? theme.palette.nav.active : theme.palette.nav.inactive,
  fontWeight: isActive ? 600 : 500,
  cursor: 'pointer',
  transition: 'color 0.2s',
  '&:hover': {
    color: theme.palette.nav.hover,
  },
});