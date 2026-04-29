import { createClient } from 'contentful';
import axios from 'axios';

const spaceId = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const environmentId = process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT_ID || 'master';
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

// Axios instance with Contentful base URL and Authorization header preset
export const contentfulAxios = axios.create({
  baseURL: `https://cdn.contentful.com/spaces/${spaceId}/environments/${environmentId}`,
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

// Initialize the Contentful client
// You'll need to add these environment variables to your .env.local file:
// NEXT_PUBLIC_CONTENTFUL_SPACE_ID=your_space_id
// NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN=your_access_token
// NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT_ID=master
const client = createClient({
  space: spaceId || '',
  accessToken: accessToken || '',
});

export async function getContentfulTags() {
  const response = await contentfulAxios.get('/tags');
  return response.data;
}

export default client;
