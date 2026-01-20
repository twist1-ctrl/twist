import { Asset, EntryFieldTypes } from 'contentful';

// Define the blog post skeleton type for Contentful
export interface BlogPostSkeleton {
  contentTypeId: 'blogPost';
  fields: {
    title: EntryFieldTypes.Text;
    slug: EntryFieldTypes.Text;
    relatedImages?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
    postContent?: EntryFieldTypes.RichText;
    publishDate: EntryFieldTypes.Date;
    category?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
  };
}

// Simplified post interface for our components
export interface IPost {
  id: string;
  title: string;
  slug: string;
  featuredImage: {
    url: string;
    alt: string;
  };
  content: string;
  excerpt?: string;
  publishedDate: string;
  category?: string[];
}
