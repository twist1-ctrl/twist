import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { Box, Container, Typography, Divider, Link } from '@mui/material';
import Layout from '../components/Layout';

export default function PrivacyPage() {
  const { t } = useTranslation('common');

  return (
    <Layout>
      <Container maxWidth="md">
        <Box sx={{ py: 6, direction: 'rtl', textAlign: 'right' }}>
          <Typography variant="h3" component="h1" fontWeight={800} gutterBottom>
            מדיניות פרטיות
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            עודכן לאחרונה: מאי 2026
          </Typography>
          <Divider sx={{ mb: 4 }} />

          <Section title="1. מבוא">
            ברוכים הבאים ל-<strong>טוויסט</strong> (להלן: "האתר"). אנו מכבדים את פרטיותכם ומחויבים להגן על המידע האישי שלכם.
            מדיניות פרטיות זו מסבירה אילו נתונים אנו אוספים, כיצד אנו משתמשים בהם, ואילו זכויות עומדות לרשותכם.
          </Section>

          <Section title="2. מידע שאנו אוספים">
            בעת ההרשמה לניוזלטר אנו אוספים:
            <ul>
              <li>כתובת דוא"ל</li>
              <li>שם מלא</li>
              <li>מגדר</li>
              <li>גיל</li>
              <li>יישוב מגורים</li>
              <li>כתובת IP (אוטומטית)</li>
            </ul>
            בעת גלישה אנו עשויים לאסוף נתוני שימוש (דפים שנצפו, זמן שהייה, לחיצות) באמצעות Google Analytics.
          </Section>

          <Section title="3. שימוש במידע">
            המידע שנאסף משמש לצרכים הבאים בלבד:
            <ul>
              <li>שליחת הניוזלטר השבועי</li>
              <li>התאמת התוכן להעדפות המנוי</li>
              <li>שיפור חוויית הגלישה באתר</li>
              <li>ניתוח סטטיסטי אנונימי</li>
            </ul>
          </Section>

          <Section title="4. שיתוף מידע עם צדדים שלישיים">
            אנו מעבירים מידע לשירותים הבאים:
            <ul>
              <li><strong>Pulseem</strong> — פלטפורמת שליחת הניוזלטר (שמות, אימייל, נתוני פרופיל)</li>
              <li><strong>Google Analytics</strong> — נתוני שימוש אנונימיים בלבד</li>
            </ul>
            אנו <strong>לא</strong> מוכרים או משכירים מידע אישי לצדדים שלישיים.
          </Section>

          <Section title="5. אבטחת מידע">
            האתר פועל על פרוטוקול HTTPS מוצפן. נתוני המנויים מאוחסנים בשרתי Pulseem בהתאם לתקני אבטחה מקובלים.
          </Section>

          <Section title="6. זכויות המשתמש">
            בהתאם לחוק הגנת הפרטיות, התשמ"א-1981, עומדות לכם הזכויות הבאות:
            <ul>
              <li><strong>עיון:</strong> לבקש לעיין במידע שנאסף אודותיכם</li>
              <li><strong>תיקון:</strong> לבקש תיקון מידע שגוי</li>
              <li><strong>מחיקה:</strong> לבקש מחיקת המידע האישי שלכם</li>
              <li><strong>הסרה:</strong> להסיר את הרשמתכם מהניוזלטר בכל עת</li>
            </ul>
            לממוש זכויות אלו, פנו אלינו:{' '}
            <Link href="/contact" color="primary">
              דף יצירת קשר
            </Link>
          </Section>

          <Section title="7. עוגיות (Cookies)">
            האתר עשוי להשתמש בעוגיות לצרכי ניתוח סטטיסטי (Google Analytics). ניתן לחסום עוגיות דרך הגדרות הדפדפן.
          </Section>

          <Section title="8. שינויים במדיניות">
            אנו שומרים לעצמנו את הזכות לעדכן מדיניות זו. שינויים מהותיים יפורסמו באתר ויכנסו לתוקף 14 ימים לאחר הפרסום.
          </Section>

          <Section title="9. יצירת קשר">
            לשאלות בנושא פרטיות:{' '}
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
