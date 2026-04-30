import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchPostBySlug } from '../../../../services/posts';
import { renderPostPdf } from '../../../../services/postPdf';
import heCommon from '../../../../public/locales/he/common.json';
import enCommon from '../../../../public/locales/en/common.json';

function toLocale(value: string | string[] | undefined): 'he' | 'en' {
  if (value === 'en' || value === 'he') {
    return value;
  }

  return 'he';
}

function getLocalizedSiteTitle(locale: 'he' | 'en'): string {
  return locale === 'he' ? heCommon.meta.siteTitle : enCommon.meta.siteTitle;
}

function createFileName(title: string, locale: 'he' | 'en'): string {
  const siteTitle = getLocalizedSiteTitle(locale);
  const rawName = `${title} | ${siteTitle}`;
  const sanitizedName = rawName
    .trim()
    .replace(/[\r\n\t]/g, ' ')
    .replace(/[\\/:*?"<>|]/g, '')
    .replace(/\s+/g, ' ');

  return `${sanitizedName || 'post'}.pdf`;
}

function createAsciiFallbackFileName(locale: 'he' | 'en'): string {
  return locale === 'he' ? 'twist-post-he.pdf' : 'twist-post-en.pdf';
}

function encodeContentDispositionFileName(fileName: string): string {
  return encodeURIComponent(fileName)
    .replace(/['()]/g, escape)
    .replace(/\*/g, '%2A');
}

function getSiteOrigin(req: NextApiRequest): string {
  const protocol = (req.headers['x-forwarded-proto'] as string) || 'https';
  const host = req.headers.host || 'localhost:3000';
  return `${protocol}://${host}`;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const slug = req.query.slug;

  if (typeof slug !== 'string' || !slug) {
    return res.status(400).json({ message: 'Invalid post slug' });
  }

  try {
    const post = await fetchPostBySlug(slug);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const locale = toLocale(req.query.locale);
    const siteOrigin = getSiteOrigin(req);
    const pdfBuffer = await renderPostPdf(post, locale, siteOrigin);
    const asciiFileName = createAsciiFallbackFileName(locale);
    const utf8FileName = createFileName(post.title, locale);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${asciiFileName}"; filename*=UTF-8''${encodeContentDispositionFileName(utf8FileName)}`,
    );
    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');

    return res.status(200).send(pdfBuffer);
  } catch (error) {
    console.error('Failed to generate post PDF:', error);
    return res.status(500).json({ message: 'Failed to generate PDF' });
  }
}
