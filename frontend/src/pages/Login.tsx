import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    TextField,
    Button,
    Paper,
    Link,
    Alert,
    CircularProgress,
    InputAdornment,
    IconButton
} from '@mui/material';
import {
    Email as EmailIcon,
    Lock as LockIcon,
    Visibility,
    VisibilityOff
} from '@mui/icons-material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { authService } from '../services/authService';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await authService.login({ email, password });

            // Smart Redirect:
            // If user has a site built -> Admin Dashboard (Delivery)
            // If user is new -> Site Builder
            if (response.has_site) {
                navigate('/admin/dashboard');
            } else {
                navigate('/builder');
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Une erreur est survenue lors de la connexion.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8, mb: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Paper elevation={0} sx={{ p: 4, width: '100%', borderRadius: 4, border: '1px solid', borderColor: 'divider' }}>
                    <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 700 }}>
                        Connexion
                    </Typography>
                    <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
                        Accédez à votre espace Ultimate Studio
                    </Typography>

                    {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Email"
                            variant="outlined"
                            margin="normal"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon color="action" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Mot de passe"
                            type={showPassword ? 'text' : 'password'}
                            variant="outlined"
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon color="action" />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />

                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            size="large"
                            disabled={loading}
                            sx={{ mt: 4, mb: 2, py: 1.5, borderRadius: 2, fontWeight: 600 }}
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Se connecter'}
                        </Button>

                        <Box sx={{ mt: 2, textAlign: 'center' }}>
                            <Typography variant="body2">
                                Vous n'avez pas de compte ?{' '}
                                <Link component={RouterLink} to="/signup" sx={{ fontWeight: 600 }}>
                                    Inscrivez-vous
                                </Link>
                            </Typography>
                        </Box>
                    </form>
                </Paper>
            </Box>
        </Container>
    );
};

export default Login;
