import { GetStaticPaths, GetStaticProps } from 'next';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS, INLINES, Document } from '@contentful/rich-text-types';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Box, Typography, Container, Divider, Button } from '@mui/material';
import Layout from '../../components/Layout';
import contentfulClient from '../../services/contentful';
import { usePostDate } from '../../hooks/usePostDate';
import { BlogPostSkeleton, IPost } from '../../types/post';

interface PostPageProps {
  post: IPost;
}

export default function PostPage({ post }: PostPageProps) {
  const router = useRouter();
  const { t } = useTranslation('common');
  const { gregorianDate, hebrewDate } = usePostDate(post.publishedDate, router.locale);
  const isHebrew = router.locale === 'he';
  const backIcon = isHebrew ? <ArrowForwardRoundedIcon fontSize="small" /> : <ArrowBackRoundedIcon fontSize="small" />;

  return (
    <Layout>
      <Container maxWidth="md">
        <Box sx={{ py: 6 }}>
          <Button
            variant="text"
            onClick={() => router.push('/posts')}
            startIcon={!isHebrew ? backIcon : undefined}
            endIcon={isHebrew ? backIcon : undefined}
            sx={{
              gap: 1,
              mb: 3,
              px: 0,
              minWidth: 'auto',
              alignSelf: 'flex-start',
              color: 'text.secondary',
              fontWeight: 600,
              '& .MuiButton-startIcon, & .MuiButton-endIcon': {
                margin: 0,
              },
              '&:hover': {
                bgcolor: 'transparent',
                color: 'text.primary',
              },
            }}
          >
            {t('posts.backToPosts')}
          </Button>

          {/* Post Title */}
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom
            sx={{ fontWeight: 'bold', mb: 2 }}
          >
            {post.title}
          </Typography>

          {/* Published Date */}
          <Typography 
            variant="subtitle1" 
            color="text.secondary" 
            sx={{ mb: 4 }}
          >
            {gregorianDate}
            {router.locale === 'he' && ` • ${hebrewDate}`}
          </Typography>

          {/* Featured Image */}
          <Box 
            sx={{ 
              position: 'relative', 
              width: '100%', 
              height: 400,
              mb: 4,
              borderRadius: 2,
              overflow: 'hidden'
            }}
          >
            <img
              src={post.featuredImage.url}
              alt={post.featuredImage.alt || post.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </Box>

          <Divider sx={{ mb: 4 }} />

          {/* Post Content */}
          <Box
            sx={{
              lineHeight: 1.8,
              fontSize: '1.1rem',
              '& p': { mb: 2 },
              '& ul': { pl: 3, mb: 2, listStyleType: 'disc' },
              '& ol': { pl: 3, mb: 2, listStyleType: 'decimal' },
              '& li': { mb: 0.5 },
              '& b, & strong': { fontWeight: 700 },
              '& i, & em': { fontStyle: 'italic' },
              '& u': { textDecoration: 'underline' },
              '& h1, & h2, & h3, & h4, & h5, & h6': { fontWeight: 700, mt: 3, mb: 1 },
              '& blockquote': {
                borderLeft: '4px solid',
                borderColor: 'primary.main',
                pl: 2,
                ml: 0,
                my: 2,
                color: 'text.secondary',
              },
              '& a': { color: 'primary.main', textDecoration: 'underline' },
            }}
          >
            {post.rawContent
              ? documentToReactComponents(post.rawContent)
              : post.content}
          </Box>

          <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => router.push('/posts')}
              sx={{
                minWidth: 220,
                borderRadius: '999px',
                px: 3,
                py: 1.25,
              }}
            >
              {t('posts.backToPosts')}
            </Button>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    // Fetch all blog posts to generate paths
    const response = await contentfulClient.getEntries<BlogPostSkeleton>({
      content_type: 'blogPost',
    });

    // Generate paths for each post
    const paths = response.items.map((item) => {
      // Generate slug from title if not provided
      const slug = item.fields.slug || 
        (item.fields.title as string)
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .trim() || 
        item.sys.id; // Fallback to ID if slug is empty

      return {
        params: { slug: slug as string },
      };
    });

    return {
      paths,
      fallback: 'blocking', // Generate pages on-demand if not pre-rendered
    };
  } catch (error) {
    console.error('Error generating static paths:', error);
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const slug = params?.slug as string;

  try {
    // Fetch the specific post by slug
    const response: Awaited<ReturnType<typeof contentfulClient.getEntries<BlogPostSkeleton>>> = await contentfulClient.getEntries<BlogPostSkeleton>({
      content_type: 'blogPost',
      'fields.slug': slug,
      limit: 1,
    });

    if (response.items.length === 0) {
      return {
        notFound: true,
      };
    }

    const item = response.items[0];

    // Generate slug from title if not provided
    const postSlug = item.fields.slug || 
      (item.fields.title as string)
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim() ||
      item.sys.id; // Fallback to ID if slug is empty

    // Get the first image from relatedImages array
    const relatedImages = item.fields.relatedImages;
    const firstImage = relatedImages && relatedImages.length > 0 ? relatedImages[0] : null;
    
    const imageUrl = firstImage && 'fields' in firstImage && firstImage.fields?.file?.url 
      ? `https:${firstImage.fields.file.url}` 
      : '';
    const imageAlt = firstImage && 'fields' in firstImage && firstImage.fields?.title 
      ? firstImage.fields.title 
      : item.fields.title;

    const richTextContent = item.fields.postContent as Document | undefined;
    let contentText = '';
    if (richTextContent?.content) {
      contentText = richTextContent.content
        .map((node: any) => {
          if (node.nodeType === 'paragraph' && node.content) {
            return node.content.map((c: any) => c.value || '').join('');
          }
          return '';
        })
        .join('\n\n');
    }

    // Transform to our IPost format
    const post: IPost = {
      id: item.sys.id,
      title: item.fields.title as string,
      slug: postSlug,
      featuredImage: {
        url: imageUrl,
        alt: imageAlt as string,
      },
      content: contentText,
      rawContent: richTextContent,
      publishedDate: item.fields.publishDate as string,
      ...(item.fields.category && { category: item.fields.category as string[] }),
    };

    return {
      props: {
        post,
        ...(await serverSideTranslations(locale || 'en', ['common'])),
      },
      revalidate: 60, // Revalidate every 60 seconds
    };
  } catch (error) {
    console.error('Error fetching post:', error);
    return {
      notFound: true,
    };
  }
};
