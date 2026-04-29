import { GetStaticPaths, GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Box, Typography, Container, Divider } from '@mui/material';
import Image from 'next/image';
import Layout from '../../components/Layout';
import contentfulClient from '../../services/contentful';
import { BlogPostSkeleton, IPost } from '../../types/post';

interface PostPageProps {
  post: IPost;
}

export default function PostPage({ post }: PostPageProps) {
  const { t } = useTranslation('common');

  return (
    <Layout>
      <Container maxWidth="md">
        <Box sx={{ py: 6 }}>
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
            {new Date(post.publishedDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
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
          <Typography 
            variant="body1" 
            component="div"
            sx={{ 
              lineHeight: 1.8,
              fontSize: '1.1rem',
              whiteSpace: 'pre-wrap',
              '& p': { mb: 2 }
            }}
          >
            {post.content}
          </Typography>
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

    // Convert RichText to plain text for content
    const richTextContent = item.fields.postContent;
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
