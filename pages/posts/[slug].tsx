import { GetStaticPaths, GetStaticProps } from 'next';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Box, Typography, Container, Divider, Button, CircularProgress } from '@mui/material';
import Layout from '../../components/Layout';
import { usePostDate } from '../../hooks/usePostDate';
import { fetchAllPostSlugs, fetchPostBySlug } from '../../services/posts';
import { IPost } from '../../types/post';

interface PostPageProps {
  post: IPost;
}

export default function PostPage({ post }: PostPageProps) {
  const router = useRouter();
  const { t } = useTranslation('common');
  const { gregorianDate, hebrewDate } = usePostDate(post.publishedDate, router.locale);
  const isHebrew = router.locale === 'he';
  const backButtonIconProps = isHebrew
    ? { startIcon: <ArrowForwardRoundedIcon fontSize="small" /> }
    : { startIcon: <ArrowBackRoundedIcon fontSize="small" /> };
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);

  const getPdfUrl = () => {
    const locale = router.locale || router.defaultLocale || 'he';
    const base = typeof window !== 'undefined' ? window.location.origin : '';
    return `${base}/api/posts/${encodeURIComponent(post.slug)}/pdf?locale=${encodeURIComponent(locale)}`;
  };

  const handleDownloadContextMenu = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      await navigator.clipboard.writeText(getPdfUrl());
    } catch (error) {
      console.error('Failed to copy PDF link:', error);
    }
  };

  const handlePdfDownload = async () => {
    if (isDownloadingPdf) {
      return;
    }

    setIsDownloadingPdf(true);

    try {
      const locale = router.locale || router.defaultLocale || 'he';
      const response = await fetch(getPdfUrl());

      if (!response.ok) {
        throw new Error(`Failed to download PDF: ${response.status}`);
      }

      const contentDisposition = response.headers.get('Content-Disposition');
      let fileName = `${post.slug || 'post'}.pdf`;
      if (contentDisposition) {
        const utf8Match = contentDisposition.match(/filename\*=UTF-8''([^;]+)/i);
        if (utf8Match) {
          fileName = decodeURIComponent(utf8Match[1]);
        } else {
          const asciiMatch = contentDisposition.match(/filename="([^"]+)"/i);
          if (asciiMatch) {
            fileName = asciiMatch[1];
          }
        }
      }

      const pdfBlob = await response.blob();
      const objectUrl = window.URL.createObjectURL(pdfBlob);
      const downloadLink = document.createElement('a');
      downloadLink.href = objectUrl;
      downloadLink.download = fileName;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      downloadLink.remove();
      window.URL.revokeObjectURL(objectUrl);
    } catch (error) {
      console.error('Failed to download PDF:', error);
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  return (
    <Layout>
      <Container maxWidth="md">
        <Box sx={{ py: 6 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3, direction: 'ltr' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
              <Button
                variant="text"
                onClick={handlePdfDownload}
                onContextMenu={handleDownloadContextMenu}
                disabled={isDownloadingPdf}
                startIcon={!isHebrew ? (isDownloadingPdf ? <CircularProgress size={14} color="inherit" /> : <FileDownloadRoundedIcon fontSize="small" />) : undefined}
                endIcon={isHebrew ? (isDownloadingPdf ? <CircularProgress size={14} color="inherit" /> : <FileDownloadRoundedIcon fontSize="small" />) : undefined}
                sx={{
                  gap: 1,
                  px: 0,
                  minWidth: 'auto',
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
                {t('posts.downloadPdf')}
              </Button>

              <Button
                variant="text"
                onClick={() => router.push('/posts')}
                dir={isHebrew ? 'rtl' : 'ltr'}
                {...backButtonIconProps}
                sx={{
                  gap: 1,
                  px: 0,
                  minWidth: 'auto',
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
            </Box>

            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ fontWeight: 500, whiteSpace: 'nowrap', marginLeft: 'auto' }}
            >
              {gregorianDate}
              {router.locale === 'he' && ` • ${hebrewDate}`}
            </Typography>
          </Box>

          {/* Post Title */}
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom
            sx={{ fontWeight: 'bold', mb: 4 }}
          >
            {post.title}
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
              dir={isHebrew ? 'rtl' : 'ltr'}
              {...backButtonIconProps}
              sx={{
                gap: 1,
                minWidth: 220,
                borderRadius: '999px',
                px: 3,
                py: 1.25,
                '& .MuiButton-startIcon, & .MuiButton-endIcon': {
                  margin: 0,
                },
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
    const slugs = await fetchAllPostSlugs();
    const paths = slugs.map((slug) => ({
      params: { slug },
    }));

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
    const post = await fetchPostBySlug(slug);

    if (!post) {
      return {
        notFound: true,
      };
    }

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
