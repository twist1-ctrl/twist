import { ReactNode } from 'react';
import { Container, Box } from '@mui/material';
import AppBar from './AppBar';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar />
      <Container
        maxWidth="lg"
        sx={{
          flex: 1,
          py: 4,
        }}
      >
        {children}
      </Container>
    </Box>
  );
}
