import { Card, CardContent, Typography, Box } from '@mui/material';

interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          {post.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {new Date(post.createdAt).toLocaleDateString()}
        </Typography>
        <Typography variant="body1" color="text.primary">
          {post.content}
        </Typography>
      </CardContent>
    </Card>
  );
}
