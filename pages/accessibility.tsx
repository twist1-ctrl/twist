import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Box, Container, Typography, Divider, Link } from '@mui/material';
import Layout from '../components/Layout';

export default function AccessibilityPage() {
  return (
    <Layout>
      <Container maxWidth="md">
        <Box sx={{ py: 6, direction: 'rtl', textAlign: 'right' }}>
          <Typography variant="h3" component="h1" fontWeight={800} gutterBottom>
            הצהרת נגישות
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            עודכן לאחרונה: מאי 2026
          </Typography>
          <Divider sx={{ mb: 4 }} />

          <Section title="מחויבות לנגישות">
            האתר <strong>טוויסט</strong> מחויב לנגישות דיגיטלית עבור כל האנשים, לרבות אנשים עם מוגבלויות.
            אנו שואפים להטמיע את הנחיות הנגישות לתכני אינטרנט (WCAG 2.1) ברמה AA.
          </Section>

          <Section title="מאפייני הנגישות הקיימים">
            <ul>
              <li>האתר כולל תגיות <code>lang</code> ו-<code>dir</code> מתאימות לעברית ולאנגלית</li>
              <li>ניווט מקלדת בפקדי האתר</li>
              <li>תגיות <code>alt</code> לתמונות</li>
              <li>ניגודיות צבעים תקנית</li>
              <li>גודל גופן קריא ומתאים לקריאה</li>
              <li>הנחיות ARIA לאלמנטים אינטראקטיביים</li>
              <li>עיצוב Responsive המותאם למסכים שונים</li>
            </ul>
          </Section>

          <Section title="תחומים בטיפול">
            אנו ממשיכים לשפר את נגישות האתר ועובדים על:
            <ul>
              <li>שיפור תיאורי תמונות ותכנים</li>
              <li>התאמת קריינות מסך</li>
              <li>בדיקות נגישות שוטפות</li>
            </ul>
          </Section>

          <Section title="יצירת קשר — נגישות">
            נתקלתם בבעיית נגישות? נשמח לדעת ולתקן.
            <br />
            פנו אלינו דרך{' '}
            <Link href="/contact" color="primary">
              דף יצירת הקשר
            </Link>
            {' '}ונטפל בפנייתכם בהקדם האפשרי.
          </Section>

          <Section title="בסיס חוקי">
            הצהרה זו נערכה בהתאם לתקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות),
            התשע"ג-2013, ובהתאם להנחיות{' '}
            <Link href="https://www.gov.il/he/departments/topics/accessibility" target="_blank" rel="noopener noreferrer" color="primary">
              נציבות שוויון זכויות לאנשים עם מוגבלות
            </Link>
            .
          </Section>
        </Box>
      </Container>
    </Layout>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" fontWeight={700} gutterBottom>
        {title}
      </Typography>
      <Typography variant="body1" color="text.secondary" component="div" sx={{ lineHeight: 1.8 }}>
        {children}
      </Typography>
    </Box>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale || 'he', ['common'])),
  },
});
