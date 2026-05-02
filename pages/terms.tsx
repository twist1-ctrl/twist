import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Box, Container, Typography, Divider, Link } from '@mui/material';
import Layout from '../components/Layout';

export default function TermsPage() {
  return (
    <Layout>
      <Container maxWidth="md">
        <Box sx={{ py: 6, direction: 'rtl', textAlign: 'right' }}>
          <Typography variant="h3" component="h1" fontWeight={800} gutterBottom>
            תקנון ותנאי שימוש
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            עודכן לאחרונה: מאי 2026
          </Typography>
          <Divider sx={{ mb: 4 }} />

          <Section title="1. כללי">
            ברוכים הבאים לאתר <strong>טוויסט</strong>. השימוש באתר מהווה הסכמה לתנאים המפורטים להלן.
            אם אינכם מסכימים לתנאים אלו, נא הפסיקו את השימוש באתר.
          </Section>

          <Section title="2. תיאור השירות">
            האתר מציע מגזין תוכן שבועי בדוא"ל, עמודי פוסטים, ואפשרות הרשמה לניוזלטר. השירות ניתן ללא תשלום.
          </Section>

          <Section title="3. הרשמה לניוזלטר">
            <ul>
              <li>ההרשמה מהווה הסכמה לקבלת עדכונים שבועיים מהאתר.</li>
              <li>ניתן להסיר את ההרשמה בכל עת דרך קישור ההסרה בכל עדכון שנשלח.</li>
              <li>אנו מחויבים לא לשלוח ספאם ולא לשתף את פרטיכם עם גורמים שאינם מפורטים במדיניות הפרטיות.</li>
            </ul>
          </Section>

          <Section title="4. קניין רוחני">
            כל התכנים באתר — טקסטים, תמונות, עיצוב, קוד — הם רכושם הבלעדי של טוויסט או שהשימוש בהם נעשה ברישיון מתאים.
            אין לשכפל, להעתיק, להפיץ או לפרסם תכנים מהאתר ללא אישור מפורש מראש ובכתב.
          </Section>

          <Section title="5. הגבלת אחריות">
            האתר ותכניו מוגשים "כמות שהם" (as-is). אנו עושים כל מאמץ להגיש מידע מדויק ועדכני, אך:
            <ul>
              <li>איננו מתחייבים לזמינות רציפה של האתר.</li>
              <li>איננו אחראים לנזק ישיר או עקיף הנובע מהשימוש באתר.</li>
              <li>התכנים אינם מהווים ייעוץ מקצועי (משפטי, רפואי, כלכלי וכו').</li>
            </ul>
          </Section>

          <Section title="6. קישורים חיצוניים">
            האתר עשוי להכיל קישורים לאתרים חיצוניים. איננו אחראים לתוכן אתרים אלו ולמדיניות הפרטיות שלהם.
          </Section>

          <Section title="7. שינויים בתנאים">
            אנו שומרים לעצמנו את הזכות לשנות את תנאי השימוש בכל עת. שינויים יפורסמו בעמוד זה ויכנסו לתוקף מיידית.
          </Section>

          <Section title="8. דין וסמכות שיפוטית">
            תנאים אלו כפופים לדיני מדינת ישראל. כל סכסוך יידון בבתי המשפט המוסמכים במחוז מרכז, ישראל.
          </Section>

          <Section title="9. יצירת קשר">
            לשאלות ופניות:{' '}
            <Link href="/contact" color="primary">
              צרו קשר
            </Link>
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
