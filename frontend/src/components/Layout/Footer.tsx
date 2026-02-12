import React from 'react';
import { Box, Container, Typography, IconButton, Link, Divider } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import { Link as RouterLink } from 'react-router-dom';

import logo from '@/template/assets/logo/logo2.svg';

const Footer: React.FC = () => {
    return (
        <Box component="footer" sx={{ backgroundColor: '#181811', color: 'white', pt: 8, pb: 4 }}>
            <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {/* Brand Column */}
                    <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 30%' } }}>
                        <Box sx={{ mb: 3 }}>
                            <img src={logo} alt="mon Studios Logo" style={{ height: '40px', filter: 'brightness(0) invert(1)' }} />
                        </Box>
                        <Typography variant="body2" sx={{ color: 'grey.400', mb: 3, lineHeight: 1.8, maxWidth: '300px' }}>
                            Capturing life's most precious moments with professional excellence. From studio portraits to grand events, we bring your vision to life.
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <IconButton size="small" sx={{ color: 'white', '&:hover': { color: 'primary.main' } }}>
                                <FacebookIcon />
                            </IconButton>
                            <IconButton size="small" sx={{ color: 'white', '&:hover': { color: 'primary.main' } }}>
                                <InstagramIcon />
                            </IconButton>
                            <IconButton size="small" sx={{ color: 'white', '&:hover': { color: 'primary.main' } }}>
                                <TwitterIcon />
                            </IconButton>
                            <IconButton size="small" sx={{ color: 'white', '&:hover': { color: 'primary.main' } }}>
                                <LinkedInIcon />
                            </IconButton>
                        </Box>
                    </Box>

                    {/* Quick Links */}
                    <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 45%', md: '1 1 25%' } }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
                            Quick Links
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {['Home', 'Portfolio', 'About', 'Contact'].map((item) => (
                                <Link
                                    key={item}
                                    component={RouterLink}
                                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                    sx={{
                                        color: 'grey.400',
                                        textDecoration: 'none',
                                        transition: 'color 0.2s',
                                        '&:hover': { color: 'primary.main', pl: 1 },
                                        display: 'inline-block',
                                    }}
                                >
                                    {item}
                                </Link>
                            ))}
                        </Box>
                    </Box>

                    {/* Contact Info */}
                    <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 45%', md: '1 1 30%' } }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
                            Contact Us
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <LocationOnIcon sx={{ color: 'primary.main' }} />
                                <Typography variant="body2" sx={{ color: 'grey.400' }}>
                                    123 Studio Lane, Creative District<br />
                                    Abidjan, Côte d'Ivoire
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <PhoneIcon sx={{ color: 'primary.main' }} />
                                <Typography variant="body2" sx={{ color: 'grey.400' }}>
                                    +225 07 00 00 00 00
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <EmailIcon sx={{ color: 'primary.main' }} />
                                <Typography variant="body2" sx={{ color: 'grey.400' }}>
                                    hello@monstudio.com
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>

                <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', my: 4 }} />

                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
                    <Typography variant="body2" sx={{ color: 'grey.500' }}>
                        © {new Date().getFullYear()} mon Studios. All rights reserved.
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 3 }}>
                        <Link href="#" sx={{ color: 'grey.500', textDecoration: 'none', fontSize: '0.875rem', '&:hover': { color: 'white' } }}>
                            Privacy Policy
                        </Link>
                        <Link href="#" sx={{ color: 'grey.500', textDecoration: 'none', fontSize: '0.875rem', '&:hover': { color: 'white' } }}>
                            Terms of Service
                        </Link>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
