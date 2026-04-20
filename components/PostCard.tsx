import { Card, CardContent, CardMedia, Typography, CardActionArea, Tooltip } from '@mui/material';
import { useRouter } from 'next/router';
import { IPost } from '../types/post';
import { HDate, gematriya } from '@hebcal/core';

const hebrewMonths = [
  'ניסן', 'אייר', 'סיוון', 'תמוז', 'אב', 'אלול',
  'תשרי', 'חשוון', 'כסלו', 'טבת', 'שבט', 'אדר'
];

const hebrewMonthsLeap = [
  'ניסן', 'אייר', 'סיוון', 'תמוז', 'אב', 'אלול',
  'תשרי', 'חשוון', 'כסלו', 'טבת', 'שבט', 'אדר א׳', 'אדר ב׳'
];

function getHebrewDateString(date: Date): string {
  const hdate = new HDate(date);
  const day = gematriya(hdate.getDate());
  const isLeapYear = hdate.isLeapYear();
  const monthList = isLeapYear ? hebrewMonthsLeap : hebrewMonths;
  const monthName = monthList[hdate.getMonth() - 1];
  const year = gematriya(hdate.getFullYear());
  return `${day} ${monthName} ${year}`;
}

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
      <Tooltip
        title={post.title}
        arrow
        slotProps={{
          tooltip: {
            sx: {
              color: '#fff',
              fontSize: '1.2rem',
              fontWeight: 400,
            },
          },
          arrow: {
            sx: {
              color: 'rgba(97, 97, 97, 0.92)',
            },
          },
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
            <Typography
              variant="h5"
              component="h2"
              gutterBottom
              noWrap
              sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
            >
              {post.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {new Date(post.publishedDate).toLocaleDateString()}
              {router.locale === 'he' && ` • ${getHebrewDateString(new Date(post.publishedDate))}`}
            </Typography>
            {post.excerpt && (
              <Typography variant="body1" color="text.primary">
                {post.excerpt}
              </Typography>
            )}
          </CardContent>
        </CardActionArea>
      </Tooltip>
    </Card>
  );
}
