import { Document } from '@contentful/rich-text-types';
import contentfulClient from './contentful';
import { BlogPostSkeleton, IPost } from '../types/post';

type ContentfulPostEntry = Awaited<ReturnType<typeof contentfulClient.getEntries<BlogPostSkeleton>>>['items'][number];

function normalizeSlugPart(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function createPostSlug(title: string, fallbackId: string, explicitSlug?: string): string {
  const source = explicitSlug || title;
  const normalizedSlug = normalizeSlugPart(source);

  return normalizedSlug || fallbackId;
}

function extractPlainTextFromRichText(content?: Document): string {
  if (!content?.content) {
    return '';
  }

  return content.content
    .map((node: any) => {
      if (node.nodeType === 'paragraph' && node.content) {
        return node.content.map((child: any) => child.value || '').join('');
      }

      return '';
    })
    .filter(Boolean)
    .join('\n\n');
}

export function mapContentfulPost(item: ContentfulPostEntry): IPost {
  const title = String(item.fields.title || '');
  const explicitSlug = item.fields.slug ? String(item.fields.slug) : undefined;
  const postSlug = createPostSlug(title, item.sys.id, explicitSlug);
  const relatedImages = Array.isArray(item.fields.relatedImages) ? item.fields.relatedImages : [];
  const firstImage = relatedImages && relatedImages.length > 0 ? relatedImages[0] : null;
  const imageUrl = firstImage && 'fields' in firstImage && firstImage.fields?.file?.url
    ? `https:${firstImage.fields.file.url}`
    : '';
  const imageAlt = firstImage && 'fields' in firstImage && firstImage.fields?.title
    ? firstImage.fields.title
    : title;
  const richTextContent = item.fields.postContent as Document | undefined;

  return {
    id: item.sys.id,
    title,
    slug: postSlug,
    featuredImage: {
      url: imageUrl,
      alt: imageAlt as string,
    },
    content: extractPlainTextFromRichText(richTextContent),
    rawContent: richTextContent,
    publishedDate: String(item.fields.publishDate),
    ...(item.fields.category && { category: item.fields.category.map((value) => String(value)) }),
  };
}

export async function fetchPostBySlug(slug: string): Promise<IPost | null> {
  const directMatch = await contentfulClient.getEntries<BlogPostSkeleton>({
    content_type: 'blogPost',
    'fields.slug': slug,
    limit: 1,
  });

  if (directMatch.items.length > 0) {
    const item = directMatch.items[0];
    return mapContentfulPost(item);
  }

  const fallbackMatch = await contentfulClient.getEntries<BlogPostSkeleton>({
    content_type: 'blogPost',
  });

  const item = fallbackMatch.items.find((entry) =>
    createPostSlug(String(entry.fields.title || ''), entry.sys.id, entry.fields.slug ? String(entry.fields.slug) : undefined) === slug,
  );

  return item ? mapContentfulPost(item) : null;
}

export async function fetchAllPostSlugs(): Promise<string[]> {
  const response = await contentfulClient.getEntries<BlogPostSkeleton>({
    content_type: 'blogPost',
  });

  return response.items.map((item) =>
    createPostSlug(String(item.fields.title || ''), item.sys.id, item.fields.slug ? String(item.fields.slug) : undefined),
  );
}
