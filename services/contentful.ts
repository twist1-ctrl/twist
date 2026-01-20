import { createClient } from 'contentful';

// Initialize the Contentful client
// You'll need to add these environment variables to your .env.local file:
// NEXT_PUBLIC_CONTENTFUL_SPACE_ID=your_space_id
// NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN=your_access_token
const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN || '',
});

export default client;
