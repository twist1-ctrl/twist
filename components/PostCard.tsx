import { Card, CardContent, CardMedia, Typography, CardActionArea } from '@mui/material';
import { useRouter } from 'next/router';
import { IPost } from '../types/post';

interface PostCardProps {
  post: IPost;
}

export default function PostCard({ post }: PostCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/posts/${post.slug}`);
  };

  return (
    <Card 
      sx={{ 
        mb: 2,
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        }
      }}
    >
      <CardActionArea onClick={handleClick}>
        <CardMedia
          component="img"
          height="200"
          image={post.featuredImage.url}
          alt={post.featuredImage.alt || post.title}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            {post.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {new Date(post.publishedDate).toLocaleDateString()}
          </Typography>
          {post.excerpt && (
            <Typography variant="body1" color="text.primary">
              {post.excerpt}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
