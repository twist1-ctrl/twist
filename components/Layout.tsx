import { ReactNode } from 'react';
import { Container, Box } from '@mui/material';
import AppBar from './AppBar';
import CirclesDecoration from './CirclesDecoration';

interface LayoutProps {
  children: ReactNode;
  showCircles?: boolean;
}

export default function Layout({ children, showCircles = true }: LayoutProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
      <CirclesDecoration show={showCircles} />
      <AppBar />
      <Container
        maxWidth="lg"
        sx={{
          flex: 1,
          py: 4,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {children}
      </Container>
    </Box>
  );
}
