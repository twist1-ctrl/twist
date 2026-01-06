import { Box, Typography } from '@mui/material';
import { useLocale } from '../hooks/useLocale';
import Layout from '../components/Layout';
import PostList from '../components/PostList';

export default function Posts() {
  const { t } = useLocale();

  return (
    <Layout>
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          {t('posts.title')}
        </Typography>
        <PostList />
      </Box>
    </Layout>
  );
}
