import { useState, useEffect } from 'react';
import { Stack, Typography, Box } from '@mui/material';
import PostCard from './PostCard';

interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);

  // Fetch posts from API
  useEffect(() => {
    // API call here
  }, []);

  return (
    <Box>
      {posts.length === 0 ? (
        <Typography variant="body1" color="text.secondary" sx={{ py: 4, textAlign: 'center' }}>
          No posts yet
        </Typography>
      ) : (
        <Stack spacing={2}>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </Stack>
      )}
    </Box>
  );
}
