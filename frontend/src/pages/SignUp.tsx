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
    Person as PersonIcon,
    Visibility,
    VisibilityOff
} from '@mui/icons-material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { authService } from '../services/authService';

const SignUp: React.FC = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== passwordConfirmation) {
            setError('Les mots de passe ne correspondent pas.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            await authService.register({
                name,
                email,
                password,
                password_confirmation: passwordConfirmation
            });
            navigate('/builder');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Une erreur est survenue lors de l\'inscription.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8, mb: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Paper elevation={0} sx={{ p: 4, width: '100%', borderRadius: 4, border: '1px solid', borderColor: 'divider' }}>
                    <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 700 }}>
                        Inscription
                    </Typography>
                    <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
                        Rejoignez l'aventure Ultimate Studio
                    </Typography>

                    {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Nom complet"
                            variant="outlined"
                            margin="normal"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonIcon color="action" />
                                    </InputAdornment>
                                ),
                            }}
                        />
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
                        <TextField
                            fullWidth
                            label="Confirmer le mot de passe"
                            type={showPassword ? 'text' : 'password'}
                            variant="outlined"
                            margin="normal"
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            required
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon color="action" />
                                    </InputAdornment>
                                ),
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
                            {loading ? <CircularProgress size={24} color="inherit" /> : 'S\'inscrire'}
                        </Button>

                        <Box sx={{ mt: 2, textAlign: 'center' }}>
                            <Typography variant="body2">
                                Vous avez déjà un compte ?{' '}
                                <Link component={RouterLink} to="/login" sx={{ fontWeight: 600 }}>
                                    Connectez-vous
                                </Link>
                            </Typography>
                        </Box>
                    </form>
                </Paper>
            </Box>
        </Container>
    );
};

export default SignUp;
