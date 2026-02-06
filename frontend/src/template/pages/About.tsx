import React from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';
import { useTranslation } from 'react-i18next';
import photographerImage from '../assets/promoteur/promoteur-1.png';

const About: React.FC = () => {
    const { t } = useTranslation();

    return (
        <Box sx={{ py: { xs: 8, md: 12 } }}>
            <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 8, alignItems: 'center' }}>
                    {/* Image Column */}
                    <Box sx={{ flex: { xs: '1 1 auto', md: '0 0 40%' }, width: '100%', position: 'relative' }}>
                        <Box
                            sx={{
                                position: 'absolute',
                                top: -20,
                                left: -20,
                                width: '100%',
                                height: '100%',
                                border: '2px solid',
                                borderColor: 'primary.main',
                                borderRadius: 2,
                                zIndex: 0,
                            }}
                        />
                        <Paper
                            elevation={4}
                            sx={{
                                position: 'relative',
                                borderRadius: 2,
                                overflow: 'hidden',
                                zIndex: 1,
                                aspectRatio: '3/4',
                            }}
                        >
                            <img
                                src={photographerImage}
                                alt={t('about.founder')}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </Paper>
                    </Box>

                    {/* Content Column */}
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 'bold', letterSpacing: 2 }}>
                            {t('about.title')}
                        </Typography>
                        <Typography variant="h2" sx={{ fontWeight: 'bold', mt: 1, mb: 4 }}>
                            {t('about.founder')}
                        </Typography>

                        <Box sx={{ mb: 4 }}>
                            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                                {t('about.biography')}
                            </Typography>
                            <Typography variant="body1" color="text.secondary" paragraph sx={{ lineHeight: 1.8 }}>
                                {t('about.bio1')}
                            </Typography>
                            <Typography variant="body1" color="text.secondary" paragraph sx={{ lineHeight: 1.8 }}>
                                {t('about.bio2')}
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                                {t('about.philosophy')}
                            </Typography>
                            <Typography variant="body1" color="text.secondary" paragraph sx={{ lineHeight: 1.8 }}>
                                {t('about.quote')}
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                                {t('about.philosophyDesc')}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default About;
