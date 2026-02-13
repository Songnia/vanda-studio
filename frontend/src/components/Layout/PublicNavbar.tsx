import React, { useState, useEffect } from 'react';
import {
    AppBar,
    Toolbar,
    Box,
    Button,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Container,
} from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const PublicNavbar: React.FC = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const navItems = [
        { label: 'Accueil', path: '/' },
        { label: 'Tarifs', path: '/pricing' },
    ];

    const drawer = (
        <Box sx={{ width: 280, height: '100%', backgroundColor: '#0a0a0a', color: 'white' }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
                <IconButton onClick={handleDrawerToggle} sx={{ color: 'white' }}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.path} disablePadding>
                        <ListItemButton
                            component={RouterLink}
                            to={item.path}
                            onClick={handleDrawerToggle}
                            selected={location.pathname === item.path}
                            sx={{
                                '&.Mui-selected': {
                                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                                    borderLeft: '3px solid #4caf50',
                                },
                            }}
                        >
                            <ListItemText primary={item.label} />
                        </ListItemButton>
                    </ListItem>
                ))}
                <ListItem sx={{ mt: 2 }}>
                    <Button
                        component={RouterLink}
                        to="/auth/login"
                        fullWidth
                        variant="outlined"
                        sx={{
                            borderColor: 'rgba(255,255,255,0.3)',
                            color: 'white',
                            mb: 1,
                        }}
                    >
                        Connexion
                    </Button>
                </ListItem>
                <ListItem>
                    <Button
                        component={RouterLink}
                        to="/auth/register"
                        fullWidth
                        variant="contained"
                        sx={{
                            backgroundColor: '#4caf50',
                            color: '#0a0a0a',
                            fontWeight: 700,
                            '&:hover': {
                                backgroundColor: '#388e3c',
                            },
                        }}
                    >
                        Créer mon site
                    </Button>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <>
            <AppBar
                position="fixed"
                elevation={scrolled ? 4 : 0}
                sx={{
                    backgroundColor: scrolled ? '#0a0a0a' : 'transparent',
                    backdropFilter: scrolled ? 'none' : 'blur(10px)',
                    transition: 'all 0.3s ease',
                    borderBottom: scrolled ? '1px solid rgba(255,255,255,0.1)' : 'none',
                }}
            >
                <Container maxWidth="lg">
                    <Toolbar sx={{ justifyContent: 'space-between', py: 1.5 }}>
                        {/* Logo */}
                        <Box
                            component={RouterLink}
                            to="/"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                textDecoration: 'none',
                                color: 'white',
                            }}
                        >
                            <Box
                                sx={{
                                    fontSize: '1.5rem',
                                    fontWeight: 800,
                                    background: 'linear-gradient(135deg, #4caf50 0%, #81c784 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    letterSpacing: '-0.5px',
                                }}
                            >
                                VANDA STUDIO
                            </Box>
                        </Box>

                        {/* Desktop Navigation */}
                        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 4 }}>
                            {navItems.map((item) => (
                                <Button
                                    key={item.path}
                                    component={RouterLink}
                                    to={item.path}
                                    sx={{
                                        color: location.pathname === item.path ? '#4caf50' : 'white',
                                        fontWeight: 600,
                                        textTransform: 'none',
                                        fontSize: '1rem',
                                        position: 'relative',
                                        '&:hover': {
                                            backgroundColor: 'transparent',
                                            color: '#4caf50',
                                        },
                                        '&::after': {
                                            content: '""',
                                            position: 'absolute',
                                            bottom: 0,
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            width: location.pathname === item.path ? '100%' : '0%',
                                            height: '2px',
                                            backgroundColor: '#4caf50',
                                            transition: 'width 0.3s ease',
                                        },
                                        '&:hover::after': {
                                            width: '100%',
                                        },
                                    }}
                                >
                                    {item.label}
                                </Button>
                            ))}

                            <Button
                                component={RouterLink}
                                to="/auth/login"
                                variant="outlined"
                                sx={{
                                    borderColor: 'rgba(255,255,255,0.3)',
                                    color: 'white',
                                    fontWeight: 600,
                                    textTransform: 'none',
                                    '&:hover': {
                                        borderColor: '#4caf50',
                                        backgroundColor: 'rgba(76, 175, 80, 0.05)',
                                    },
                                }}
                            >
                                Connexion
                            </Button>

                            <Button
                                component={RouterLink}
                                to="/auth/register"
                                variant="contained"
                                sx={{
                                    backgroundColor: '#4caf50',
                                    color: '#0a0a0a',
                                    fontWeight: 700,
                                    textTransform: 'none',
                                    px: 3,
                                    '&:hover': {
                                        backgroundColor: '#388e3c',
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 4px 12px rgba(76, 175, 80, 0.3)',
                                    },
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                Créer mon site
                            </Button>
                        </Box>

                        {/* Mobile menu button */}
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ display: { md: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Toolbar>
                </Container>
            </AppBar>

            {/* Mobile drawer */}
            <Drawer
                variant="temporary"
                anchor="right"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: 280,
                    },
                }}
            >
                {drawer}
            </Drawer>

            {/* Spacer to prevent content from going under fixed navbar */}
            <Toolbar sx={{ mb: 2 }} />
        </>
    );
};

export default PublicNavbar;
