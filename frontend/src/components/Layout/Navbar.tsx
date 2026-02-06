import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Box, Button, Drawer, List, ListItem, ListItemButton, ListItemText, useTheme, useMediaQuery, Badge } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '@/template/context/CartContext';
import { authService } from '../../services/authService';
import { useSiteConfig } from '@/context/SiteConfigContext';
import defaultLogo from '@/template/assets/logo/logo2.svg';

const Navbar: React.FC<{ basePath?: string }> = ({ basePath }) => {
    const { config } = useSiteConfig();
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [mobileOpen, setMobileOpen] = useState(false);
    const { cartCount, openCart } = useCart();

    const isAdminPage = location.pathname.startsWith('/admin') ||
        location.pathname === '/login' ||
        location.pathname === '/signup';

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleLogout = () => {
        authService.logout();
        navigate('/login');
    };

    const navItems = [
        { label: 'Home', path: basePath ? `/${basePath}` : '/' },
        { label: 'Shop', path: basePath ? `/${basePath}/shop` : '/shop' },
        { label: 'Blog', path: basePath ? `/${basePath}/blog` : '/blog' },
        { label: 'About', path: basePath ? `/${basePath}/about` : '/about' },
        { label: 'Contact', path: basePath ? `/${basePath}/contact` : '/contact' },
    ];

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', py: 2 }}>
            <Box
                component={RouterLink}
                to={basePath ? `/${basePath}` : "/"}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mb: 2,
                    textDecoration: 'none'
                }}
            >
                {config?.useStudioNameAsLogo ? (
                    <Box sx={{ typography: 'h6', fontWeight: 'bold', color: 'text.primary' }}>
                        {config.siteName}
                    </Box>
                ) : (
                    <img src={config?.logo || defaultLogo} alt={`${config?.siteName || 'Studio'} Logo`} style={{ height: '40px', objectFit: 'contain' }} />
                )}
            </Box>
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.label} disablePadding>
                        <ListItemButton component={RouterLink} to={item.path} sx={{ textAlign: 'center' }}>
                            <ListItemText primary={item.label} />
                        </ListItemButton>
                    </ListItem>
                ))}
                {isAdminPage && (
                    <Box sx={{ borderTop: '1px solid', borderColor: 'divider', mt: 1, pt: 1 }}>
                        {authService.isAuthenticated() ? (
                            <>
                                <ListItem disablePadding>
                                    <ListItemButton component={RouterLink} to="/admin/dashboard" sx={{ textAlign: 'center' }}>
                                        <ListItemText primary="Admin" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton onClick={handleLogout} sx={{ textAlign: 'center', color: 'error.main' }}>
                                        <ListItemText primary="Déconnexion" />
                                    </ListItemButton>
                                </ListItem>
                            </>
                        ) : (
                            <>
                                <ListItem disablePadding>
                                    <ListItemButton component={RouterLink} to="/login" sx={{ textAlign: 'center' }}>
                                        <ListItemText primary="Connexion" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton component={RouterLink} to="/signup" sx={{ textAlign: 'center' }}>
                                        <ListItemText primary="S'inscrire" />
                                    </ListItemButton>
                                </ListItem>
                            </>
                        )}
                    </Box>
                )}
            </List>
        </Box>
    );

    return (
        <AppBar position="sticky" color="default" elevation={0} sx={{ borderBottom: '1px solid', borderColor: 'divider', backgroundColor: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)' }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                {/* Left: Hamburger (Mobile) or Spacer (Desktop) */}
                {isMobile ? (
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                ) : (
                    <Box sx={{ width: 48 }} />
                )}

                {/* Center: Logo */}
                <Box
                    component={RouterLink}
                    to={basePath ? `/${basePath}` : "/"}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        position: 'absolute',
                        left: { xs: '50%', md: '10%' },
                        transform: { xs: 'translateX(-50%)', md: 'none' },
                        textDecoration: 'none',
                        color: 'inherit'
                    }}
                >
                    {config?.useStudioNameAsLogo ? (
                        <Box sx={{ typography: 'h6', fontWeight: 'bold', color: 'text.primary', whiteSpace: 'nowrap' }}>
                            {config.siteName}
                        </Box>
                    ) : (
                        <img
                            src={config?.logo || defaultLogo}
                            alt={`${config?.siteName || 'Studio'} Logo`}
                            style={{ height: isMobile ? '32px' : '45px', objectFit: 'contain' }}
                        />
                    )}
                </Box>

                {/* Right: Links (Desktop) & Actions */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {!isMobile && (
                        <Box sx={{ display: 'flex', gap: 2, mr: 2 }}>
                            {navItems.map((item) => (
                                <Button key={item.label} component={RouterLink} to={item.path} color="inherit" sx={{ fontWeight: 500 }}>
                                    {item.label}
                                </Button>
                            ))}
                        </Box>
                    )}
                    <IconButton color="inherit">
                        <SearchIcon />
                    </IconButton>
                    <IconButton color="inherit" onClick={openCart}>
                        <Badge badgeContent={cartCount} color="primary">
                            <ShoppingBagIcon />
                        </Badge>
                    </IconButton>

                    {isAdminPage && !isMobile && (
                        <Box sx={{ ml: 2, display: 'flex', gap: 1 }}>
                            {authService.isAuthenticated() ? (
                                <>
                                    <Button component={RouterLink} to="/admin/dashboard" variant="outlined" size="small">
                                        Admin
                                    </Button>
                                    <Button onClick={handleLogout} variant="text" size="small" color="error">
                                        Déconnexion
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button component={RouterLink} to="/login" variant="text" size="small">
                                        Connexion
                                    </Button>
                                    <Button component={RouterLink} to="/signup" variant="contained" size="small">
                                        S'inscrire
                                    </Button>
                                </>
                            )}
                        </Box>
                    )}
                </Box>
            </Toolbar>
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
                }}
            >
                {drawer}
            </Drawer>
        </AppBar>
    );
};

export default Navbar;
