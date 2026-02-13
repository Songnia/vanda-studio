import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton, Divider } from '@mui/material';
import { Facebook, Instagram, Twitter, LinkedIn } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const PublicFooter: React.FC = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        navigation: [
            { label: 'Accueil', path: '/' },
            { label: 'Tarifs', path: '/pricing' },
            { label: 'À propos', path: '/about' },
        ],
        legal: [
            { label: 'Politique de confidentialité', path: '/privacy' },
            { label: 'Conditions d\'utilisation', path: '/terms' },
            { label: 'Mentions légales', path: '/legal' },
        ],
        support: [
            { label: 'Centre d\'aide', path: '/help' },
            { label: 'Documentation', path: '/docs' },
            { label: 'Contact', path: '/contact' },
        ],
    };

    const socialLinks = [
        { icon: <Facebook />, url: 'https://facebook.com', label: 'Facebook' },
        { icon: <Instagram />, url: 'https://instagram.com', label: 'Instagram' },
        { icon: <Twitter />, url: 'https://twitter.com', label: 'Twitter' },
        { icon: <LinkedIn />, url: 'https://linkedin.com', label: 'LinkedIn' },
    ];

    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: '#0a0a0a',
                borderTop: '1px solid rgba(255,255,255,0.1)',
                pt: 8,
                pb: 4,
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    {/* À propos */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Box sx={{ mb: 3 }}>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 800,
                                    background: 'linear-gradient(135deg, #4caf50 0%, #81c784 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    mb: 2,
                                }}
                            >
                                VANDA STUDIO
                            </Typography>
                            <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', lineHeight: 1.8 }}>
                                La plateforme tout-en-un pour créer votre site de photographe professionnel et livrer vos galeries clients.
                            </Typography>
                        </Box>

                        {/* Réseaux sociaux */}
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            {socialLinks.map((social) => (
                                <IconButton
                                    key={social.label}
                                    component="a"
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    sx={{
                                        color: 'rgba(255,255,255,0.6)',
                                        '&:hover': {
                                            color: '#4caf50',
                                            backgroundColor: 'rgba(76, 175, 80, 0.1)',
                                        },
                                        transition: 'all 0.3s ease',
                                    }}
                                >
                                    {social.icon}
                                </IconButton>
                            ))}
                        </Box>
                    </Grid>

                    {/* Navigation */}
                    <Grid size={{ xs: 12, sm: 4, md: 2 }}>
                        <Typography
                            variant="h6"
                            sx={{
                                color: 'white',
                                fontWeight: 700,
                                fontSize: '1rem',
                                mb: 2,
                            }}
                        >
                            Navigation
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                            {footerLinks.navigation.map((link) => (
                                <Link
                                    key={link.path}
                                    component={RouterLink}
                                    to={link.path}
                                    sx={{
                                        color: 'rgba(255,255,255,0.7)',
                                        textDecoration: 'none',
                                        fontSize: '0.9rem',
                                        '&:hover': {
                                            color: '#4caf50',
                                        },
                                        transition: 'color 0.3s ease',
                                    }}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </Box>
                    </Grid>

                    {/* Support */}
                    <Grid size={{ xs: 12, sm: 4, md: 3 }}>
                        <Typography
                            variant="h6"
                            sx={{
                                color: 'white',
                                fontWeight: 700,
                                fontSize: '1rem',
                                mb: 2,
                            }}
                        >
                            Support
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                            {footerLinks.support.map((link) => (
                                <Link
                                    key={link.path}
                                    component={RouterLink}
                                    to={link.path}
                                    sx={{
                                        color: 'rgba(255,255,255,0.7)',
                                        textDecoration: 'none',
                                        fontSize: '0.9rem',
                                        '&:hover': {
                                            color: '#4caf50',
                                        },
                                        transition: 'color 0.3s ease',
                                    }}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <Link
                                href="mailto:support@vandastudio.com"
                                sx={{
                                    color: 'rgba(255,255,255,0.7)',
                                    textDecoration: 'none',
                                    fontSize: '0.9rem',
                                    '&:hover': {
                                        color: '#4caf50',
                                    },
                                    transition: 'color 0.3s ease',
                                }}
                            >
                                support@vandastudio.com
                            </Link>
                        </Box>
                    </Grid>

                    {/* Légal */}
                    <Grid size={{ xs: 12, sm: 4, md: 3 }}>
                        <Typography
                            variant="h6"
                            sx={{
                                color: 'white',
                                fontWeight: 700,
                                fontSize: '1rem',
                                mb: 2,
                            }}
                        >
                            Légal
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                            {footerLinks.legal.map((link) => (
                                <Link
                                    key={link.path}
                                    component={RouterLink}
                                    to={link.path}
                                    sx={{
                                        color: 'rgba(255,255,255,0.7)',
                                        textDecoration: 'none',
                                        fontSize: '0.9rem',
                                        '&:hover': {
                                            color: '#4caf50',
                                        },
                                        transition: 'color 0.3s ease',
                                    }}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </Box>
                    </Grid>
                </Grid>

                {/* Divider */}
                <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.1)' }} />

                {/* Copyright */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 2,
                    }}
                >
                    <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>
                        © {currentYear} VANDA STUDIO. Tous droits réservés.
                    </Typography>
                    <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>
                        Fait avec ❤️ pour les photographes
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default PublicFooter;
