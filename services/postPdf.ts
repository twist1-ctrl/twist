import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';
import { BLOCKS, INLINES, MARKS, Document } from '@contentful/rich-text-types';
import { documentToHtmlString, Options } from '@contentful/rich-text-html-renderer';
import { IPost } from '../types/post';
import { formatGregorianDate, formatHebrewDate } from '../utils/postDate';

type SupportedLocale = 'he' | 'en';

const copyByLocale: Record<SupportedLocale, { siteTitle: string; siteTagline: string; publishedLabel: string; generatedFromLabel: string; untitledFallback: string; }> = {
  he: {
    siteTitle: 'טוויסט',
    siteTagline: 'מגזין תוכן שובר שגרה',
    publishedLabel: 'פורסם',
    generatedFromLabel: 'הוכן מתוך אתר',
    untitledFallback: 'פוסט',
  },
  en: {
    siteTitle: 'TWIST',
    siteTagline: 'Magazine for breaking routines',
    publishedLabel: 'Published',
    generatedFromLabel: 'Generated from',
    untitledFallback: 'post',
  },
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getLogoDataUri(): string {
  const logoPath = path.join(process.cwd(), 'public', 'resources', 'logo.png');
  const logoBuffer = fs.readFileSync(logoPath);
  return `data:image/png;base64,${logoBuffer.toString('base64')}`;
}

function renderRichTextToHtml(content?: Document): string {
  if (!content) {
    return '';
  }

  const options: Options = {
    renderMark: {
      [MARKS.BOLD]: (text) => `<strong>${text}</strong>`,
      [MARKS.ITALIC]: (text) => `<em>${text}</em>`,
      [MARKS.UNDERLINE]: (text) => `<u>${text}</u>`,
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (_, next) => `<p>${next(_.content)}</p>`,
      [BLOCKS.HEADING_1]: (_, next) => `<h1>${next(_.content)}</h1>`,
      [BLOCKS.HEADING_2]: (_, next) => `<h2>${next(_.content)}</h2>`,
      [BLOCKS.HEADING_3]: (_, next) => `<h3>${next(_.content)}</h3>`,
      [BLOCKS.HEADING_4]: (_, next) => `<h4>${next(_.content)}</h4>`,
      [BLOCKS.HEADING_5]: (_, next) => `<h5>${next(_.content)}</h5>`,
      [BLOCKS.HEADING_6]: (_, next) => `<h6>${next(_.content)}</h6>`,
      [BLOCKS.UL_LIST]: (_, next) => `<ul>${next(_.content)}</ul>`,
      [BLOCKS.OL_LIST]: (_, next) => `<ol>${next(_.content)}</ol>`,
      [BLOCKS.LIST_ITEM]: (_, next) => `<li>${next(_.content)}</li>`,
      [BLOCKS.QUOTE]: (_, next) => `<blockquote>${next(_.content)}</blockquote>`,
      [BLOCKS.HR]: () => '<hr />',
      [INLINES.HYPERLINK]: (node, next) => {
        const uri = typeof node.data.uri === 'string' ? node.data.uri : '#';
        return `<a href="${escapeHtml(uri)}">${next(node.content)}</a>`;
      },
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const title = node.data.target?.fields?.title || '';
        const fileUrl = node.data.target?.fields?.file?.url;

        if (!fileUrl) {
          return '';
        }

        return `<figure><img src="https:${fileUrl}" alt="${escapeHtml(title)}" /><figcaption>${escapeHtml(title)}</figcaption></figure>`;
      },
    },
  };

  return documentToHtmlString(content, options);
}

function buildPdfHtml(post: IPost, locale: SupportedLocale, siteOrigin: string): string {
  const copy = copyByLocale[locale];
  const isHebrew = locale === 'he';
  const signupUrl = `${siteOrigin.replace(/\/$/, '')}/signup`;
  const primaryDate = formatGregorianDate(post.publishedDate, locale);
  const secondaryDate = isHebrew ? formatHebrewDate(post.publishedDate) : '';
  const contentHtml = renderRichTextToHtml(post.rawContent) || `<p>${escapeHtml(post.content)}</p>`;
  const featuredImageHtml = post.featuredImage.url
    ? `<div class="hero"><img src="${escapeHtml(post.featuredImage.url)}" alt="${escapeHtml(post.featuredImage.alt || post.title)}" /></div>`
    : '';
  const logoDataUri = getLogoDataUri();

  return `
    <!DOCTYPE html>
    <html lang="${locale}" dir="${isHebrew ? 'rtl' : 'ltr'}">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Assistant:wght@400;600;700;800&family=Inter:wght@400;500;600;700&display=swap');

          :root {
            --ink: #15202b;
            --muted: #5b6670;
            --accent: #d06f2f;
            --brand-red: #c7403a;
            --border: #e6ddd2;
            --paper: #fffdf9;
          }

          * {
            box-sizing: border-box;
          }

          body {
            margin: 0;
            background: linear-gradient(180deg, #f6efe4 0%, #fffdf9 220px);
            color: var(--ink);
            font-family: ${isHebrew ? "'Assistant', 'Arial', sans-serif" : "'Inter', 'Arial', sans-serif"};
            -webkit-font-smoothing: antialiased;
          }

          .page {
            padding: 34px 42px 46px;
          }

          .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 24px;
            direction: ltr;
            margin-bottom: 28px;
          }

          .brand {
            --logo-width: 130px;
            display: inline-flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
          }

          .brand-link {
            position: relative;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
          }

          .brand-link img {
            transition: transform 0.15s ease;
          }

          .brand-link:hover img {
            transform: translateY(-1px);
          }

          .brand-click-indicator {
            position: absolute;
            right: -14px;
            bottom: -8px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 22px;
            height: 22px;
            border-radius: 999px;
            background: #ffffff;
            border: 1px solid var(--border);
            color: var(--brand-red);
            font-size: 14px;
            line-height: 1;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
          }

          .brand img {
            width: var(--logo-width);
            height: auto;
            display: block;
          }

          .brand-subtitle {
            font-size: 12px;
            color: var(--brand-red);
            font-weight: 700;
            width: calc(var(--logo-width) * 0.8);
            text-align: center;
            word-break: keep-all;
          }

          .meta {
            text-align: ${isHebrew ? 'right' : 'left'};
            direction: ${isHebrew ? 'rtl' : 'ltr'};
          }

          .meta-label {
            font-size: 11px;
            text-transform: uppercase;
            color: var(--muted);
            letter-spacing: 0.08em;
            margin-bottom: 6px;
          }

          .meta-value {
            font-size: 15px;
            font-weight: 600;
          }

          .meta-secondary {
            margin-top: 4px;
            font-size: 13px;
            color: var(--muted);
          }

          .title {
            font-size: 34px;
            line-height: 1.15;
            font-weight: 800;
            margin: 0 0 20px;
          }

          .hero {
            margin: 0 0 26px;
            border-radius: 22px;
            overflow: hidden;
            background: #f3ede5;
            page-break-inside: avoid;
          }

          .hero img {
            width: 100%;
            max-height: 320px;
            object-fit: cover;
            display: block;
          }

          .content {
            font-size: 16px;
            line-height: 1.9;
          }

          .content p,
          .content ul,
          .content ol,
          .content blockquote,
          .content figure,
          .content hr {
            margin: 0 0 18px;
          }

          .content h1,
          .content h2,
          .content h3,
          .content h4,
          .content h5,
          .content h6 {
            margin: 32px 0 12px;
            line-height: 1.3;
            page-break-after: avoid;
          }

          .content ul,
          .content ol {
            padding-inline-start: 22px;
          }

          .content a {
            color: var(--accent);
            text-decoration: underline;
          }

          .content blockquote {
            border-inline-start: 4px solid var(--accent);
            padding-inline-start: 16px;
            color: var(--muted);
          }

          .content figure img {
            width: 100%;
            border-radius: 18px;
            display: block;
          }

          .content figcaption {
            margin-top: 8px;
            font-size: 12px;
            color: var(--muted);
          }

          .footer {
            margin-top: 36px;
            padding-top: 18px;
            border-top: 1px solid var(--border);
            font-size: 12px;
            color: var(--muted);
          }
        </style>
      </head>
      <body>
        <main class="page">
          <header class="header">
            <div class="brand">
              <a class="brand-link" href="${escapeHtml(signupUrl)}">
                <img src="${logoDataUri}" alt="${escapeHtml(copy.siteTitle)}" />
                <span class="brand-click-indicator" aria-hidden="true">☝</span>
              </a>
              <div class="brand-subtitle">${escapeHtml(copy.siteTagline)}</div>
            </div>

            <div class="meta">
              <div class="meta-label">${escapeHtml(copy.publishedLabel)}</div>
              <div class="meta-value">${escapeHtml(primaryDate)}</div>
              ${secondaryDate ? `<div class="meta-secondary">${escapeHtml(secondaryDate)}</div>` : ''}
            </div>
          </header>

          <h1 class="title">${escapeHtml(post.title || copy.untitledFallback)}</h1>
          ${featuredImageHtml}
          <section class="content">${contentHtml}</section>
          <footer class="footer">${escapeHtml(copy.generatedFromLabel)} ${escapeHtml(copy.siteTitle)}</footer>
        </main>
      </body>
    </html>
  `;
}

export async function renderPostPdf(post: IPost, locale: SupportedLocale, siteOrigin: string): Promise<Buffer> {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1240, height: 1754, deviceScaleFactor: 1 });
    await page.setContent(buildPdfHtml(post, locale, siteOrigin), { waitUntil: 'networkidle0' });
    await page.emulateMediaType('screen');

    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '12mm',
        right: '10mm',
        bottom: '12mm',
        left: '10mm',
      },
    });

    return Buffer.from(pdf);
  } finally {
    await browser.close();
  }
}
