import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Button, Container, List, ListItem, ListItemIcon, ListItemText, Divider, Chip, Paper, useTheme } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LinkIcon from '@mui/icons-material/Link';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PhoneIcon from '@mui/icons-material/Phone';
import StarIcon from '@mui/icons-material/Star';
import Layout from '../components/Layout';
import { useLocale } from '../hooks/useLocale';

interface PackageCardProps {
    title: string;
    price: string;
    features: string[];
    buttonText: string;
    animationDelay?: string;
}

const PackageCard: React.FC<PackageCardProps> = ({ title, price, features, buttonText, animationDelay }) => {
    const theme = useTheme();

    return (
        <Box sx={{ xs: 12, sm: 6, md: 4, display: 'flex', width: { xs: '100%', sm: '50%', md: '33.33%' } }}>
            <Card
                sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    p: 2,
                    textAlign: 'center',
                    boxShadow: 3,
                    borderRadius: 2,
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: 6,
                    },
                    animation: `fadeInUp 0.8s ${animationDelay || '0s'} ease-out forwards`,
                    opacity: 0,
                    '@keyframes fadeInUp': {
                        '0%': {
                            opacity: 0,
                            transform: 'translateY(20px)',
                        },
                        '100%': {
                            opacity: 1,
                            transform: 'translateY(0)',
                        },
                    },
                }}
            >
                <CardContent>
                    <Typography variant="h5" component="h3" gutterBottom sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
                        {title}
                    </Typography>
                    <Typography variant="h4" component="p" sx={{ my: 2, color: theme.palette.secondary.main, fontWeight: 'bold' }}>
                        {price}
                    </Typography>
                    <List sx={{ textAlign: 'left', mb: 2 }}>
                        {features.map((feature, index) => (
                            <ListItem key={index} disablePadding>
                                <ListItemIcon sx={{ minWidth: 35 }}>
                                    <CheckCircleOutlineIcon sx={{ color: theme.palette.primary.main }} />
                                </ListItemIcon>
                                <ListItemText primary={feature} />
                            </ListItem>
                        ))}
                    </List>
                </CardContent>
                <Button variant="contained" sx={{ bgcolor: theme.palette.secondary.main, '&:hover': { bgcolor: theme.palette.secondary.dark } }} fullWidth>
                    {buttonText}
                </Button>
            </Card>
        </Box>
    );
};

export default function Packages() {
    const { t } = useLocale();
    const theme = useTheme();

    return (
        <Layout>
            <Container maxWidth="md" sx={{ py: 5 }}>
                <Box textAlign="center" mb={5}>
                    <Typography variant="h3" component="h1" gutterBottom sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
                        חבילות פרסום מותאמות
                    </Typography>
                    <Typography variant="h6" component="p" color="text.secondary" sx={{ mb: 3 }}>
                        בחר את החבילה המושלמת עבור עסקך
                    </Typography>
                    <Typography variant="body1" component="p" paragraph>
                        אנחנו מציעים פתרונות פרסום גמישים ויעילים לעסקים בכל גודל
                    </Typography>
                </Box>

                <Divider sx={{ my: 4 }} />

                <Box sx={{ my: 5 }}>
                    <Typography variant="h4" component="h2" gutterBottom textAlign="center" sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
                        קהל יעד חם ומקצועי
                    </Typography>
                    <Paper elevation={3} sx={{ p: 3, borderRadius: 2, bgcolor: '#f9f9f9' }}>
                        <Typography variant="body1" paragraph>
                            הגיע לקהל של כ-20,000 עוקבים אמינים וממושכים
                        </Typography>
                        <Typography variant="body1" paragraph>
                            שיעור פתיחה של 40% - קהל עם כושר קנייה גבוה ואתנוג'ית מוכחת
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                            <Chip
                                icon={<MailOutlineIcon />}
                                label="~20,000 עוקבים"
                                sx={{ bgcolor: theme.palette.primary.main, color: 'white' }}
                            />
                            <Chip
                                icon={<CheckCircleOutlineIcon />}
                                label="40% שיעור פתיחה"
                                sx={{ bgcolor: theme.palette.secondary.main, color: 'white' }}
                            />
                        </Box>
                    </Paper>
                </Box>

                <Divider sx={{ my: 4 }} />

                <Box sx={{ my: 5 }}>
                    <Typography variant="h4" component="h2" gutterBottom textAlign="center" sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
                        החבילות שלנו
                    </Typography>
                    <Grid container spacing={4} justifyContent="center">
                        <PackageCard
                            key="newsletter"
                            title="עלון / הודעה"
                            price="₪450"
                            features={[
                                'טקסט אישי',
                                'הודעה כללית',
                                'הצגה בגוף המייל',
                                '100 מנויים',
                            ]}
                            buttonText="קנה עכשיו"
                            animationDelay="0s"
                        />
                        <PackageCard
                            key="content"
                            title="תוכן / הודעה"
                            price="₪280"
                            features={[
                                'תוכן/הודעה בפלטפורמה',
                                'טקסט מותאם אישית',
                                'עד 120 מילים',
                                'הצגה בעלון',
                            ]}
                            buttonText="קנה עכשיו"
                            animationDelay="0.2s"
                        />
                        <PackageCard
                            key="video"
                            title="וידאו אישי"
                            price="₪580"
                            features={[
                                'וידאו אישי',
                                'טקסט מותאם אישית',
                                'עד 10 מילים',
                                'השפעה מקסימלית',
                            ]}
                            buttonText="קנה עכשיו"
                            animationDelay="0.4s"
                        />
                        <Box sx={{ display: 'flex', width: { xs: '100%', sm: '50%', md: '33.33%' } }}>
                            <Card
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    p: 2,
                                    textAlign: 'center',
                                    boxShadow: 3,
                                    borderRadius: 2,
                                    bgcolor: theme.palette.primary.main,
                                    color: 'white',
                                    transition: 'transform 0.3s ease-in-out',
                                    '&:hover': {
                                        transform: 'translateY(-5px)',
                                        boxShadow: 6,
                                    },
                                    animation: 'fadeInUp 0.8s 0.6s ease-out forwards',
                                    opacity: 0,
                                    '@keyframes fadeInUp': {
                                        '0%': {
                                            opacity: 0,
                                            transform: 'translateY(20px)',
                                        },
                                        '100%': {
                                            opacity: 1,
                                            transform: 'translateY(0)',
                                        },
                                    },
                                }}
                            >
                                <CardContent>
                                    <MonetizationOnIcon sx={{ fontSize: 60, mb: 2 }} />
                                    <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                                        🎁 חבילה פרימיום
                                    </Typography>
                                    <Typography variant="h4" component="p" sx={{ my: 2, fontWeight: 'bold' }}>
                                        הנחה של 25%
                                    </Typography>
                                    <Typography variant="body1">
                                        4 הצגות פרימיום + 2 הצגות נוספות בגוף המייל בעמדה ראשונה ללא תשלום נוסף
                                    </Typography>
                                </CardContent>
                                <Button variant="contained" sx={{ bgcolor: theme.palette.secondary.main, '&:hover': { bgcolor: theme.palette.secondary.dark } }} fullWidth>
                                    קנה חבילה
                                </Button>
                            </Card>
                        </Box>
                    </Grid>
                </Box>

                <Divider sx={{ my: 4 }} />

                <Box sx={{ my: 5 }} textAlign="center">
                    <Typography variant="h4" component="h2" gutterBottom sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
                        דוגמאות מעלון שלנו
                    </Typography>
                    <Box sx={{ '& a': { color: theme.palette.secondary.main, mx: 1, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } } }}>
                        <LinkIcon sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                        <a href="#" target="_blank" rel="noopener noreferrer">דוגמה 1</a>
                        {' | '}
                        <LinkIcon sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                        <a href="#" target="_blank" rel="noopener noreferrer">דוגמה 2</a>
                        {' | '}
                        <LinkIcon sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                        <a href="#" target="_blank" rel="noopener noreferrer">דוגמה 3</a>
                    </Box>
                </Box>

                <Divider sx={{ my: 4 }} />

                <Box sx={{ my: 5 }} textAlign="center">
                    <Typography variant="h4" component="h2" gutterBottom sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
                        מה אומרים הלקוחות שלנו
                    </Typography>
                    <Grid container spacing={2} justifyContent="center">
                        {['🌟 הצלחה 1', '🌟 הצלחה 2', '🌟 הצלחה 3', '🌟 הצלחה 4'].map((text, index) => (
                            <Box key={index}>
                                <Chip
                                    icon={<StarIcon />}
                                    label={text}
                                    sx={{ bgcolor: theme.palette.primary.main, color: 'white', '&:hover': { bgcolor: theme.palette.secondary.main }, cursor: 'pointer' }}
                                />
                            </Box>
                        ))}
                    </Grid>
                </Box>

                <Divider sx={{ my: 4 }} />

                <Box sx={{ my: 5 }} textAlign="center">
                    <Typography variant="h4" component="h2" gutterBottom sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
                        צרו קשר עכשיו
                    </Typography>
                    <Typography variant="h6" component="p" sx={{ mb: 3 }}>
                        לכל שאלה או התלבטות, אל תהסס/י לפנות אלי - אני כאן כדי לעזור!
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
                        <Button
                            variant="contained"
                            startIcon={<PhoneIcon />}
                            href="tel:0535928598"
                            sx={{ bgcolor: theme.palette.secondary.main, '&:hover': { bgcolor: theme.palette.secondary.dark } }}
                        >
                            053-5928598
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<PhoneIcon />}
                            href="tel:0583217458"
                            sx={{ bgcolor: theme.palette.primary.main, '&:hover': { bgcolor: theme.palette.primary.dark } }}
                        >
                            058-3217458
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<WhatsAppIcon />}
                            href="https://wa.me/972535928598"
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{ bgcolor: '#25D366', '&:hover': { bgcolor: '#20BA61' } }}
                        >
                            וואטסאפ
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Layout>
    );
}
