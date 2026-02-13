import React from 'react';
import { Box, Container, Typography, Button, Grid, Card, CardContent, Chip } from '@mui/material';
import { CheckCircle, Rocket, Star, TrendingUp } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import PublicNavbar from '@/components/Layout/PublicNavbar';
import PublicFooter from '@/components/Layout/PublicFooter';

const LandingPage: React.FC = () => {
    return (
        <>
            <PublicNavbar />
            <Box sx={{ minHeight: '100vh', backgroundColor: '#0a0a0a' }}>
                {/* Hero Section */}
                <Box
                    sx={{
                        minHeight: '90vh',
                        background: 'linear-gradient(135deg, #686767ff 0%, #242323ff 100%)',
                        position: 'relative',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    {/* Animated background elements */}
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '20%',
                            right: '10%',
                            width: '400px',
                            height: '400px',
                            background: 'radial-gradient(circle, rgba(68, 240, 0, 0.1) 0%, transparent 70%)',
                            borderRadius: '50%',
                            filter: 'blur(60px)',
                        }}
                    />
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: '10%',
                            left: '5%',
                            width: '300px',
                            height: '300px',
                            background: 'radial-gradient(circle, rgba(76, 240, 0, 0.08) 0%, transparent 70%)',
                            borderRadius: '50%',
                            filter: 'blur(50px)',
                        }}
                    />

                    <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                        <Grid container spacing={6} alignItems="center">
                            <Grid size={{ xs: 12, md: 7 }}>
                                {/* Badge */}
                                <Chip
                                    icon={<Star sx={{ color: '#4caf50 !important' }} />}
                                    label="✨ Essai gratuit 14 jours • Sans carte bancaire"
                                    sx={{
                                        backgroundColor: 'rgba(136, 255, 0, 0.1)',
                                        color: '#4caf50',
                                        border: '1px solid rgba(136, 255, 0, 0.3)',
                                        mb: 3,
                                        fontWeight: 600,
                                    }}
                                />

                                {/* Headline */}
                                <Typography
                                    variant="h1"
                                    sx={{
                                        fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                                        fontWeight: 800,
                                        color: 'white',
                                        mb: 3,
                                        lineHeight: 1.1,
                                    }}
                                >
                                    Créez votre site de{' '}
                                    <Box component="span" sx={{ color: '#4caf50' }}>
                                        photographe professionnel
                                    </Box>{' '}
                                    en 10 minutes
                                </Typography>

                                {/* Subheadline */}
                                <Typography
                                    variant="h5"
                                    sx={{
                                        fontSize: { xs: '1.1rem', md: '1.3rem' },
                                        color: 'rgba(255,255,255,0.8)',
                                        mb: 4,
                                        lineHeight: 1.6,
                                        maxWidth: '600px',
                                    }}
                                >
                                    Sans code, sans stress. De la création à la livraison de galeries, VANDA STUDIO gère tout pour vous.
                                </Typography>

                                {/* CTAs */}
                                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                                    <Button
                                        component={RouterLink}
                                        to="/auth/register"
                                        onClick={() => localStorage.setItem('selectedPlan', 'starter')}
                                        variant="contained"
                                        size="large"
                                        startIcon={<Rocket />}
                                        sx={{
                                            backgroundColor: '#4caf50',
                                            color: '#0a0a0a',
                                            fontWeight: 700,
                                            fontSize: '1.1rem',
                                            px: 4,
                                            py: 1.5,
                                            borderRadius: '8px',
                                            textTransform: 'none',
                                            '&:hover': {
                                                backgroundColor: '#4caf50',
                                                transform: 'translateY(-2px)',
                                                boxShadow: '0 8px 24px rgba(136, 255, 0, 0.3)',
                                            },
                                            transition: 'all 0.3s ease',
                                        }}
                                    >
                                        Créer mon site gratuitement
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        size="large"
                                        sx={{
                                            borderColor: '#4caf50',
                                            color: '#4caf50',
                                            fontWeight: 600,
                                            fontSize: '1.1rem',
                                            px: 4,
                                            py: 1.5,
                                            borderRadius: '8px',
                                            textTransform: 'none',
                                            '&:hover': {
                                                borderColor: '#4caf50',
                                                backgroundColor: 'rgba(240,225,0,0.05)',
                                            },
                                        }}
                                    >
                                        Voir une démo
                                    </Button>
                                </Box>
                            </Grid>

                            {/* Mockup/Visual (placeholder) */}
                            <Grid size={{ xs: 12, md: 5 }} sx={{ display: { xs: 'none', md: 'block' } }}>
                                <Box
                                    sx={{
                                        width: '100%',
                                        height: '500px',
                                        background: 'linear-gradient(135deg, rgba(88, 240, 0, 0.1) 0%, rgba(88, 240, 0, 0.05) 100%)',
                                        borderRadius: '16px',
                                        border: '1px solid rgba(88, 240, 0, 0.2)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        position: 'relative',
                                        overflow: 'hidden',
                                    }}
                                >
                                    <Typography sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '1.2rem' }}>
                                        [Mockup du Builder]
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>

                {/* Social Proof Section */}
                <Box sx={{ py: 8, backgroundColor: '#0f0f0f', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <Container maxWidth="lg">
                        <Box sx={{ textAlign: 'center', mb: 6 }}>
                            <Typography
                                variant="h3"
                                sx={{
                                    fontSize: { xs: '2rem', md: '2.5rem' },
                                    fontWeight: 700,
                                    color: 'white',
                                    mb: 2,
                                }}
                            >
                                Rejoignez{' '}
                                <Box component="span" sx={{ color: '#4caf50' }}>
                                    500+ photographes
                                </Box>
                            </Typography>
                            <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem' }}>
                                qui ont transformé leur activité avec VANDA STUDIO
                            </Typography>
                        </Box>

                        {/* Testimonial Card */}
                        <Card
                            sx={{
                                maxWidth: '600px',
                                mx: 'auto',
                                backgroundColor: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '12px',
                            }}
                        >
                            <CardContent sx={{ p: 4 }}>
                                <Typography sx={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem', fontStyle: 'italic', mb: 2 }}>
                                    "J'ai créé mon site en 8 minutes chrono. Incroyable ! Mes clients adorent les galeries privées."
                                </Typography>
                                <Typography sx={{ color: '#4caf50', fontWeight: 600 }}>
                                    Sophie M., Photographe Mariage
                                </Typography>
                            </CardContent>
                        </Card>
                    </Container>
                </Box>

                {/* Value Proposition #1 - Builder */}
                <Box sx={{ py: 10, backgroundColor: '#0a0a0a' }}>
                    <Container maxWidth="lg">
                        <Grid container spacing={6} alignItems="center">
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Typography
                                    variant="h3"
                                    sx={{
                                        fontSize: { xs: '2rem', md: '2.8rem' },
                                        fontWeight: 700,
                                        color: 'white',
                                        mb: 3,
                                    }}
                                >
                                    Votre site professionnel en{' '}
                                    <Box component="span" sx={{ color: '#4caf50' }}>
                                        10 étapes simples
                                    </Box>
                                </Typography>
                                <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', mb: 4, lineHeight: 1.8 }}>
                                    Pas besoin d'être développeur. Notre builder intuitif vous guide pas à pas pour créer un site qui vous ressemble.
                                </Typography>

                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    {[
                                        'Personnalisez vos couleurs et logo',
                                        'Ajoutez vos plus belles photos',
                                        'Configurez vos services et tarifs',
                                        'Publiez en un clic',
                                    ].map((feature, index) => (
                                        <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <CheckCircle sx={{ color: '#4caf50', fontSize: '24px' }} />
                                            <Typography sx={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.05rem' }}>
                                                {feature}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Box
                                    sx={{
                                        width: '100%',
                                        height: '400px',
                                        background: 'linear-gradient(135deg, rgba(116, 240, 0, 0.08) 0%, rgba(76, 240, 0, 0.03) 100%)',
                                        borderRadius: '12px',
                                        border: '1px solid rgba(76, 240, 0, 0.15)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Typography sx={{ color: 'rgba(255,255,255,0.3)' }}>[GIF du Builder]</Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>

                {/* Value Proposition #2 - Galeries */}
                <Box sx={{ py: 10, backgroundColor: '#0f0f0f' }}>
                    <Container maxWidth="lg">
                        <Grid container spacing={6} alignItems="center">
                            <Grid size={{ xs: 12, md: 6 }} sx={{ order: { xs: 2, md: 1 } }}>
                                <Box
                                    sx={{
                                        width: '100%',
                                        height: '400px',
                                        background: 'linear-gradient(135deg, rgba(56, 240, 0, 0.08) 0%, rgba(108, 240, 0, 0.03) 100%)',
                                        borderRadius: '12px',
                                        border: '1px solid rgba(108, 240, 0, 0.15)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Typography sx={{ color: 'rgba(255,255,255,0.3)' }}>[Interface Galerie]</Typography>
                                </Box>
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }} sx={{ order: { xs: 1, md: 2 } }}>
                                <Typography
                                    variant="h3"
                                    sx={{
                                        fontSize: { xs: '2rem', md: '2.8rem' },
                                        fontWeight: 700,
                                        color: 'white',
                                        mb: 3,
                                    }}
                                >
                                    Livrez vos photos{' '}
                                    <Box component="span" sx={{ color: '#4caf50' }}>
                                        comme un pro
                                    </Box>
                                </Typography>
                                <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', mb: 4, lineHeight: 1.8 }}>
                                    Galeries privées, téléchargement ZIP, sélection de favoris. Tout ce dont vous avez besoin pour une livraison client impeccable.
                                </Typography>

                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    {[
                                        'Galeries protégées par code PIN',
                                        'Téléchargement groupé en ZIP',
                                        'Clients sélectionnent leurs favoris',
                                        'Partage par lien unique',
                                    ].map((feature, index) => (
                                        <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <CheckCircle sx={{ color: '#4caf50', fontSize: '24px' }} />
                                            <Typography sx={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.05rem' }}>
                                                {feature}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>

                {/* How It Works Section */}
                <Box sx={{ py: 10, backgroundColor: '#0a0a0a' }}>
                    <Container maxWidth="lg">
                        <Box sx={{ textAlign: 'center', mb: 8 }}>
                            <Typography
                                variant="h3"
                                sx={{
                                    fontSize: { xs: '2rem', md: '2.5rem' },
                                    fontWeight: 700,
                                    color: 'white',
                                    mb: 2,
                                }}
                            >
                                Comment ça <Box component="span" sx={{ color: '#4caf50' }}>marche ?</Box>
                            </Typography>
                            <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem' }}>
                                Lancez votre activité en 3 étapes simples
                            </Typography>
                        </Box>

                        <Grid container spacing={4}>
                            {[
                                {
                                    step: '01',
                                    title: 'Créez votre site',
                                    description: 'Inscrivez-vous et obtenez un site professionnel instantanément. Personnalisez votre design sans aucune compétence technique.'
                                },
                                {
                                    step: '02',
                                    title: 'Créez vos galeries',
                                    description: 'Importez vos photos en haute définition. Nous les optimisons automatiquement pour le web tout en gardant la qualité.'
                                },
                                {
                                    step: '03',
                                    title: 'Livrez vos clients',
                                    description: 'Partagez des galeries privées sécurisées. Vos clients sélectionnent leurs favoris et téléchargent leurs photos simplement.'
                                }
                            ].map((item, index) => (
                                <Grid size={{ xs: 12, md: 4 }} key={index}>
                                    <Box
                                        sx={{
                                            position: 'relative',
                                            p: 4,
                                            height: '100%',
                                            backgroundColor: 'rgba(255,255,255,0.03)',
                                            borderRadius: '16px',
                                            border: '1px solid rgba(255,255,255,0.05)',
                                            transition: 'transform 0.3s ease',
                                            '&:hover': {
                                                transform: 'translateY(-5px)',
                                                backgroundColor: 'rgba(255,255,255,0.05)',
                                                borderColor: 'rgba(240,225,0,0.3)',
                                            },
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontSize: '4rem',
                                                fontWeight: 900,
                                                color: 'rgba(255,255,255,0.03)',
                                                position: 'absolute',
                                                top: 10,
                                                right: 20,
                                                lineHeight: 1,
                                            }}
                                        >
                                            {item.step}
                                        </Typography>
                                        <Box
                                            sx={{
                                                width: 50,
                                                height: 50,
                                                borderRadius: '50%',
                                                backgroundColor: '#4caf50',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontWeight: 700,
                                                fontSize: '1.2rem',
                                                color: '#0a0a0a',
                                                mb: 3,
                                            }}
                                        >
                                            {index + 1}
                                        </Box>
                                        <Typography variant="h5" sx={{ color: 'white', fontWeight: 700, mb: 2 }}>
                                            {item.title}
                                        </Typography>
                                        <Typography sx={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                                            {item.description}
                                        </Typography>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </Box>

                {/* CTA to Pricing */}
                <Box sx={{ py: 6, backgroundColor: '#0a0a0a', textAlign: 'center' }}>
                    <Container maxWidth="md">
                        <Button
                            component={RouterLink}
                            to="/pricing"
                            variant="outlined"
                            size="large"
                            endIcon={<TrendingUp />}
                            sx={{
                                borderColor: '#4caf50',
                                color: '#4caf50',
                                fontWeight: 600,
                                fontSize: '1.1rem',
                                px: 4,
                                py: 1.5,
                                borderRadius: '8px',
                                textTransform: 'none',
                                '&:hover': {
                                    backgroundColor: 'rgba(240,225,0,0.1)',
                                    borderColor: '#4caf50',
                                },
                            }}
                        >
                            Voir les tarifs
                        </Button>
                    </Container>
                </Box>
            </Box>
            <PublicFooter />
        </>
    );
}

export default LandingPage;
