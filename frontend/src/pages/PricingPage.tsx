import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    Grid,
    Card,
    CardContent,
    Switch,
    FormControlLabel,
    Chip,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';
import { Check, Close, Star, Rocket, WorkspacePremium, TrendingUp } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import PublicNavbar from '@/components/Layout/PublicNavbar';
import PublicFooter from '@/components/Layout/PublicFooter';

interface PricingPlan {
    id: string;
    name: string;
    icon: React.ReactNode;
    price: {
        monthly: number;
        annual: number;
    };
    badge?: string;
    badgeColor?: string;
    description: string;
    features: {
        name: string;
        included: boolean | string;
    }[];
    cta: string;
    ctaColor: string;
    popular?: boolean;
}

const pricingPlans: PricingPlan[] = [
    {
        id: 'starter',
        name: 'STARTER',
        icon: <Rocket />,
        price: { monthly: 5000, annual: 50000 },
        badge: 'Idéal pour débuter',
        badgeColor: '#4caf50', // Green
        description: 'Lancez votre activité pro',
        features: [
            { name: 'Site Builder complet', included: true },
            { name: 'Pages', included: '5 max' },
            { name: 'Photos Portfolio', included: '20' },
            { name: 'Galeries Client', included: '4/mois' },
            { name: 'Stockage', included: '500 MB' },
            { name: 'Domaine personnalisé', included: false },
            { name: 'Sans Watermark', included: false },
            { name: 'Analytics', included: false },
            { name: 'Support', included: 'Email 48h' },
        ],
        cta: 'Commencer',
        ctaColor: '#4caf50',
    },
    {
        id: 'pro',
        name: 'PRO',
        icon: <Star />,
        price: { monthly: 15000, annual: 150000 },
        badge: '⭐ PLUS POPULAIRE',
        badgeColor: '#2196f3', // Blue
        description: 'Pour photographes actifs',
        features: [
            { name: 'Site Builder complet', included: true },
            { name: 'Pages', included: 'Illimité' },
            { name: 'Photos Portfolio', included: '500' },
            { name: 'Galeries Client', included: '20/mois' },
            { name: 'Stockage', included: '50 GB' },
            { name: 'Domaine personnalisé', included: true },
            { name: 'Sans Watermark', included: true },
            { name: 'Analytics', included: 'Basique' },
            { name: 'Support', included: 'Email 12h' },
        ],
        cta: 'Passer à PRO',
        ctaColor: '#2196f3',
        popular: true,
    },
    {
        id: 'studio',
        name: 'STUDIO',
        icon: <WorkspacePremium />,
        price: { monthly: 45000, annual: 450000 },
        badge: '👑 POUR STUDIOS PRO',
        badgeColor: '#9c27b0', // Purple
        description: 'Pour studios établis et agences',
        features: [
            { name: 'Site Builder complet', included: true },
            { name: 'Pages', included: 'Illimité' },
            { name: 'Photos Portfolio', included: 'Illimité' },
            { name: 'Galeries Client', included: 'Illimité' },
            { name: 'Stockage', included: '500 GB' },
            { name: 'Domaine personnalisé', included: true },
            { name: 'Sans Watermark', included: true },
            { name: 'Analytics', included: 'Avancé' },
            { name: 'Support', included: 'Chat + Tél' },
            { name: 'Multi-utilisateurs', included: '3 comptes' },
            { name: 'White Label', included: true },
            { name: 'API Access', included: true },
        ],
        cta: 'Devenir Studio',
        ctaColor: '#9c27b0',
    },
];

const PricingPage: React.FC = () => {
    const [isAnnual, setIsAnnual] = useState(false);

    const getPrice = (plan: PricingPlan) => {
        // if (plan.price.monthly === 0) return 'Gratuit'; // Removed as Starter is now paid
        const price = isAnnual ? plan.price.annual : plan.price.monthly;
        return `${price.toLocaleString()} F`;
    };

    const getPriceSubtext = (plan: PricingPlan) => {
        if (isAnnual) return '/an (-17%)';
        return '/mois';
    };

    return (
        <>
            <PublicNavbar />
            <Box sx={{ minHeight: '100vh', backgroundColor: '#0a0a0a', py: 8 }}>
                <Container maxWidth="lg">
                    {/* Header */}
                    <Box sx={{ textAlign: 'center', mb: 6 }}>
                        <Typography
                            variant="h2"
                            sx={{
                                fontSize: { xs: '2.5rem', md: '3.5rem' },
                                fontWeight: 800,
                                color: 'white',
                                mb: 2,
                            }}
                        >
                            Choisissez votre{' '}
                            <Box component="span" sx={{ color: '#4caf50' }}>
                                plan
                            </Box>
                        </Typography>
                        <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.2rem', mb: 4 }}>
                            Commencez gratuitement, upgradez quand vous êtes prêt
                        </Typography>

                        {/* Annual/Monthly Toggle */}
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={isAnnual}
                                    onChange={(e) => setIsAnnual(e.target.checked)}
                                    sx={{
                                        '& .MuiSwitch-switchBase.Mui-checked': {
                                            color: '#4caf50',
                                        },
                                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                            backgroundColor: '#4caf50',
                                        },
                                    }}
                                />
                            }
                            label={
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Typography sx={{ color: 'white' }}>Facturation annuelle</Typography>
                                    <Chip
                                        label="Économisez 17%"
                                        size="small"
                                        sx={{
                                            backgroundColor: 'rgba(76, 175, 80, 0.2)',
                                            color: '#4caf50',
                                            fontWeight: 600,
                                        }}
                                    />
                                </Box>
                            }
                            sx={{ mb: 4 }}
                        />
                    </Box>

                    {/* Pricing Cards */}
                    <Grid container spacing={4} sx={{ mb: 8 }}>
                        {pricingPlans.map((plan) => (
                            <Grid size={{ xs: 12, md: 4 }} key={plan.id}>
                                <Card
                                    sx={{
                                        height: '100%',
                                        backgroundColor: plan.popular ? `${plan.ctaColor}0d` : 'rgba(255,255,255,0.03)', // 0d = 5% opacity
                                        border: plan.popular ? `2px solid ${plan.ctaColor}` : '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '16px',
                                        position: 'relative',
                                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-8px)',
                                            boxShadow: plan.popular
                                                ? `0 12px 40px ${plan.ctaColor}4d` // 4d = 30% opacity
                                                : '0 12px 40px rgba(0,0,0,0.5)',
                                            border: `2px solid ${plan.ctaColor}`,
                                        },
                                    }}
                                >
                                    {/* Badge */}
                                    {plan.badge && (
                                        <Chip
                                            label={plan.badge}
                                            sx={{
                                                position: 'absolute',
                                                top: 16,
                                                right: 16,
                                                backgroundColor: plan.badgeColor,
                                                color: plan.id === 'pro' ? '#0a0a0a' : 'white',
                                                fontWeight: 700,
                                                fontSize: '0.75rem',
                                            }}
                                        />
                                    )}

                                    <CardContent sx={{ p: 4 }}>
                                        {/* Icon */}
                                        <Box
                                            sx={{
                                                width: 60,
                                                height: 60,
                                                borderRadius: '12px',
                                                backgroundColor: `${plan.ctaColor}20`,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                mb: 3,
                                            }}
                                        >
                                            {React.cloneElement(plan.icon as React.ReactElement, {
                                                sx: { fontSize: 32, color: plan.ctaColor },
                                            })}
                                        </Box>

                                        {/* Plan Name */}
                                        <Typography
                                            variant="h5"
                                            sx={{
                                                fontWeight: 700,
                                                color: 'white',
                                                mb: 1,
                                            }}
                                        >
                                            {plan.name}
                                        </Typography>

                                        {/* Description */}
                                        <Typography sx={{ color: 'rgba(255,255,255,0.6)', mb: 3, fontSize: '0.95rem' }}>
                                            {plan.description}
                                        </Typography>

                                        {/* Price */}
                                        <Box sx={{ mb: 4 }}>
                                            <Typography
                                                variant="h3"
                                                sx={{
                                                    fontWeight: 800,
                                                    color: 'white',
                                                    display: 'inline',
                                                }}
                                            >
                                                {getPrice(plan)}
                                            </Typography>
                                            <Typography
                                                component="span"
                                                sx={{
                                                    color: 'rgba(255,255,255,0.5)',
                                                    ml: 1,
                                                    fontSize: '1rem',
                                                }}
                                            >
                                                {getPriceSubtext(plan)}
                                            </Typography>
                                        </Box>

                                        {/* CTA Button */}
                                        <Button
                                            component={RouterLink}
                                            to="/auth/register"
                                            onClick={() => localStorage.setItem('selectedPlan', plan.id)}
                                            variant="contained"
                                            fullWidth
                                            size="large"
                                            sx={{
                                                backgroundColor: plan.ctaColor,
                                                color: plan.id === 'starter' ? '#0a0a0a' : 'white',
                                                fontWeight: 700,
                                                py: 1.5,
                                                mb: 3,
                                                borderRadius: '8px',
                                                textTransform: 'none',
                                                '&:hover': {
                                                    backgroundColor: plan.ctaColor,
                                                    opacity: 0.9,
                                                },
                                            }}
                                        >
                                            {plan.cta}
                                        </Button>

                                        {/* Features List */}
                                        <List sx={{ p: 0 }}>
                                            {plan.features.map((feature, index) => (
                                                <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                                                    <ListItemIcon sx={{ minWidth: 32 }}>
                                                        {feature.included === false ? (
                                                            <Close sx={{ color: 'rgba(255,255,255,0.3)', fontSize: 20 }} />
                                                        ) : (
                                                            <Check sx={{ color: plan.ctaColor, fontSize: 20 }} />
                                                        )}
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary={feature.name}
                                                        secondary={
                                                            typeof feature.included === 'string' ? feature.included : null
                                                        }
                                                        primaryTypographyProps={{
                                                            sx: {
                                                                color:
                                                                    feature.included === false
                                                                        ? 'rgba(255,255,255,0.3)'
                                                                        : 'rgba(255,255,255,0.9)',
                                                                fontSize: '0.9rem',
                                                            },
                                                        }}
                                                        secondaryTypographyProps={{
                                                            sx: { color: plan.ctaColor, fontSize: '0.8rem', fontWeight: 600 },
                                                        }}
                                                    />
                                                </ListItem>
                                            ))}
                                        </List>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    {/* Comparison Table */}
                    <Box sx={{ mb: 8 }}>
                        <Typography
                            variant="h4"
                            sx={{
                                fontSize: { xs: '1.8rem', md: '2.2rem' },
                                fontWeight: 700,
                                color: 'white',
                                mb: 4,
                                textAlign: 'center',
                            }}
                        >
                            Comparaison détaillée
                        </Typography>

                        <TableContainer
                            component={Paper}
                            sx={{
                                backgroundColor: 'rgba(255,255,255,0.03)',
                                borderRadius: '12px',
                                border: '1px solid rgba(255,255,255,0.1)',
                            }}
                        >
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ color: 'white', fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                            Fonctionnalité
                                        </TableCell>
                                        <TableCell align="center" sx={{ color: 'white', fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                            Starter
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            sx={{
                                                color: '#2196f3',
                                                fontWeight: 700,
                                                borderBottom: '1px solid rgba(255,255,255,0.1)',
                                                backgroundColor: 'rgba(33, 150, 243, 0.05)',
                                            }}
                                        >
                                            PRO ⭐
                                        </TableCell>
                                        <TableCell align="center" sx={{ color: '#9c27b0', fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                            STUDIO 👑
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {[
                                        { name: 'Site Builder', starter: '✅', pro: '✅', studio: '✅' },
                                        { name: 'Pages', starter: '5', pro: 'Illimité', studio: 'Illimité' },
                                        { name: 'Photos Portfolio', starter: '20', pro: '500', studio: 'Illimité' },
                                        { name: 'Galeries/mois', starter: '4', pro: '20', studio: 'Illimité' },
                                        { name: 'Stockage', starter: '500 MB', pro: '50 GB', studio: '500 GB' },
                                        { name: 'Domaine personnalisé', starter: '❌', pro: '✅', studio: '✅' },
                                        { name: 'Sans Watermark', starter: '❌', pro: '✅', studio: '✅' },
                                        { name: 'Multi-utilisateurs', starter: '❌', pro: '❌', studio: '3 comptes' },
                                        { name: 'White Label', starter: '❌', pro: '❌', studio: '✅' },
                                        { name: 'Support', starter: 'Email 48h', pro: 'Email 12h', studio: 'Chat + Tél' },
                                        { name: 'Analytics', starter: '❌', pro: 'Basique', studio: 'Avancé' },
                                        { name: 'API', starter: '❌', pro: '❌', studio: '✅' },
                                    ].map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell sx={{ color: 'rgba(255,255,255,0.9)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="center" sx={{ color: 'rgba(255,255,255,0.7)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                                {row.starter}
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                sx={{
                                                    color: 'rgba(255,255,255,0.9)',
                                                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                                                    backgroundColor: 'rgba(33, 150, 243, 0.03)',
                                                    fontWeight: 600,
                                                }}
                                            >
                                                {row.pro}
                                            </TableCell>
                                            <TableCell align="center" sx={{ color: 'rgba(255,255,255,0.7)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                                {row.studio}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>

                    {/* FAQ Section */}
                    <Box sx={{ mb: 8 }}>
                        <Typography
                            variant="h4"
                            sx={{
                                fontSize: { xs: '1.8rem', md: '2.2rem' },
                                fontWeight: 700,
                                color: 'white',
                                mb: 4,
                                textAlign: 'center',
                            }}
                        >
                            Questions fréquentes
                        </Typography>

                        <Grid container spacing={3}>
                            {[
                                {
                                    q: 'Ai-je besoin de compétences techniques ?',
                                    a: 'Aucune ! Si vous savez utiliser Instagram, vous savez utiliser VANDA STUDIO.',
                                },
                                {
                                    q: 'Puis-je changer de plan plus tard ?',
                                    a: 'Oui, upgrade ou downgrade à tout moment. Pas d\'engagement.',
                                },
                                {
                                    q: 'Que se passe-t-il si j\'annule ?',
                                    a: 'Vos données sont exportables. Pas de prise en otage.',
                                },
                                {
                                    q: 'Le domaine personnalisé est-il inclus ?',
                                    a: 'Le sous-domaine est gratuit. Votre propre domaine (.com) est inclus dans PRO.',
                                },
                            ].map((faq, index) => (
                                <Grid size={{ xs: 12, md: 6 }} key={index}>
                                    <Card
                                        sx={{
                                            backgroundColor: 'rgba(255,255,255,0.03)',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            borderRadius: '12px',
                                        }}
                                    >
                                        <CardContent sx={{ p: 3 }}>
                                            <Typography sx={{ color: '#4caf50', fontWeight: 700, mb: 1, fontSize: '1.05rem' }}>
                                                {faq.q}
                                            </Typography>
                                            <Typography sx={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                                                {faq.a}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>

                    {/* Final CTA */}
                    <Box
                        sx={{
                            textAlign: 'center',
                            py: 6,
                            px: 4,
                            background: 'linear-gradient(135deg, rgba(68, 240, 0, 0.1) 0%, rgba(136, 240, 0, 0.05) 100%)',
                            borderRadius: '16px',
                            border: '1px solid rgba(76, 240, 0, 0.2)',
                        }}
                    >
                        <Typography
                            variant="h4"
                            sx={{
                                fontSize: { xs: '1.8rem', md: '2.2rem' },
                                fontWeight: 700,
                                color: 'white',
                                mb: 2,
                            }}
                        >
                            Prêt à transformer votre activité ?
                        </Typography>
                        <Typography sx={{ color: 'rgba(255,255,255,0.7)', mb: 4, fontSize: '1.1rem' }}>
                            Rejoignez 500+ photographes qui ont fait le choix de VANDA STUDIO
                        </Typography>
                        <Button
                            component={RouterLink}
                            to="/auth/register"
                            variant="contained"
                            size="large"
                            startIcon={<TrendingUp />}
                            sx={{
                                backgroundColor: '#4caf50',
                                color: '#0a0a0a',
                                fontWeight: 700,
                                fontSize: '1.2rem',
                                px: 5,
                                py: 2,
                                borderRadius: '8px',
                                textTransform: 'none',
                                '&:hover': {
                                    backgroundColor: '#388e3c',
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 8px 24px rgba(76, 240, 0, 0.4)',
                                },
                                transition: 'all 0.3s ease',
                            }}
                        >
                            Créer mon site maintenant
                        </Button>
                        <Typography sx={{ color: 'rgba(255,255,255,0.5)', mt: 2, fontSize: '0.9rem' }}>
                            Essai gratuit 14 jours • Sans carte bancaire • Annulation en 1 clic
                        </Typography>
                    </Box>
                </Container>
            </Box>
            <PublicFooter />
        </>
    );
};

export default PricingPage;
