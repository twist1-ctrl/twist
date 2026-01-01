import { Box, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { useLocale } from '../hooks/useLocale';
import Layout from '../components/Layout';

export default function Packages() {
    const { t } = useLocale();

    return (
        <Layout>
            <Box sx={{ py: 4 }}>
                <Typography variant="h3" component="h1" gutterBottom>
                    {t('packages.title')}
                </Typography>
                <Grid container spacing={3} sx={{ mt: 2 }}>

                    <Card>
                        <CardContent>
                            <Typography variant="h5" gutterBottom>
                                Basic
                            </Typography>
                            <Typography variant="h6" color="primary" gutterBottom>
                                $99
                            </Typography>
                            <Button variant="contained" fullWidth>
                                {t('home.submit')}
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Box>
        </Layout>
    );
}
