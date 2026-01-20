import { Box, Typography, Container, Stack } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '../components/Layout';
import PostCard from '../components/PostCard';
import contentfulClient from '../services/contentful';
import { BlogPostSkeleton, IPost } from '../types/post';

interface PostsProps {
  posts: IPost[];
}

export default function Posts({ posts }: PostsProps) {
  const { t } = useTranslation('common');

  return (
    <Layout>
      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ mb: 4 }}>
            {t('posts.title')}
          </Typography>
          
          {posts.length === 0 ? (
            <Typography variant="body1" color="text.secondary" sx={{ py: 4, textAlign: 'center' }}>
              No posts available yet
            </Typography>
          ) : (
            <Box 
              sx={{ 
                display: 'grid', 
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
                gap: 3 
              }}
            >
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </Box>
          )}
        </Box>
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  try {
    console.log('🔍 Fetching posts from Contentful...');
    
    // Fetch blog posts from Contentful
    const response = await contentfulClient.getEntries<BlogPostSkeleton>({
      content_type: 'blogPost',
      order: ['-fields.publishDate'], // Sort by most recent first
    });

    console.log('📦 Contentful Response:', {
      total: response.total,
      items: response.items.length,
      firstItem: response.items[0] ? {
        id: response.items[0].sys.id,
        title: response.items[0].fields.title,
      } : 'No items'
    }); 

    // Transform Contentful entries to our simplified IPost format
    const posts: IPost[] = response.items.map((item) => {
      // Get the first image from relatedImages array
      const relatedImages = item.fields.relatedImages;
      const firstImage = relatedImages && relatedImages.length > 0 ? relatedImages[0] : null;
      
      const imageUrl = firstImage && 'fields' in firstImage && firstImage.fields?.file?.url 
        ? `https:${firstImage.fields.file.url}` 
        : '';
      const imageAlt = firstImage && 'fields' in firstImage && firstImage.fields?.title 
        ? firstImage.fields.title 
        : item.fields.title;

      // Generate slug from title if not provided
      const slug = item.fields.slug || 
        (item.fields.title as string)
          .toLowerCase()
          .replace(/[^\w\s-]/g, '') // Remove special characters
          .replace(/\s+/g, '-') // Replace spaces with hyphens
          .replace(/-+/g, '-') // Replace multiple hyphens with single
          .trim() ||
        item.sys.id; // Fallback to ID if slug is empty

      // Convert RichText to plain text for excerpt/content
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
          .join('\n');
      }

      return {
        id: item.sys.id,
        title: item.fields.title as string,
        slug: slug,
        featuredImage: {
          url: imageUrl,
          alt: imageAlt as string,
        },
        content: contentText,
        excerpt: contentText.substring(0, 150) + (contentText.length > 150 ? '...' : ''),
        publishedDate: item.fields.publishDate as string,
        ...(item.fields.category && { category: item.fields.category as string[] }),
      };
    });

    return {
      props: {
        posts,
        ...(await serverSideTranslations(locale, ['common'])),
      },
      revalidate: 300, // Revalidate every 5 minutes
    };
  } catch (error) {
    console.error('Error fetching posts from Contentful:', error);
    
    return {
      props: {
        posts: [],
        ...(await serverSideTranslations(locale, ['common'])),
      },
      revalidate: 300,
    };
  }
}
