import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Typography,
    Box,
    IconButton,
    Snackbar,
    Alert,
} from '@mui/material';
import { ContentCopy as CopyIcon, WhatsApp as WhatsAppIcon, Close as CloseIcon } from '@mui/icons-material';

interface ShareDialogProps {
    open: boolean;
    onClose: () => void;
    uuid: string;
    /** Slug du photographe pour construire le lien vers son site (ex: "jeanphoto") */
    photographerSlug?: string;
    /** Numéro WhatsApp du client (ex: +33612345678). Si fourni, ouvre un chat direct. */
    clientPhone?: string;
}

const ShareDialog: React.FC<ShareDialogProps> = ({ open, onClose, uuid, photographerSlug, clientPhone }) => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    // Lien vers la galerie du client
    // - Local dev  : /{slug}/g/{uuid}
    // - Production : https://{slug}.vanda-studio.org/g/{uuid}
    const domain = import.meta.env.VITE_PUBLIC_DOMAIN; // ex: "vanda-studio.org"
    const galleryUrl = photographerSlug
        ? domain
            ? `https://${photographerSlug}.${domain}/g/${uuid}`
            : `${window.location.origin}/${photographerSlug}/g/${uuid}`
        : `${window.location.origin}/g/${uuid}`; // fallback sans slug

    const handleCopy = () => {
        navigator.clipboard.writeText(galleryUrl);
        setSnackbarOpen(true);
    };

    const handleWhatsApp = () => {
        const message = `Bonjour ! 📸 Votre galerie photo est prête :\n${galleryUrl}`;

        let whatsappUrl: string;
        if (clientPhone) {
            // Numéro direct : ouvre un chat avec le client
            // Nettoie le numéro (retire espaces, tirets, parenthèses)
            const cleanPhone = clientPhone.replace(/[\s\-().+]/g, '');
            whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
        } else {
            // Pas de numéro : partage générique
            whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
        }

        window.open(whatsappUrl, '_blank');
    };

    return (
        <>
            <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
                <DialogTitle component="div" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        Partager la galerie
                    </Typography>
                    <IconButton onClick={onClose} size="small">
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent>
                    {clientPhone ? (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, p: 1.5, bgcolor: '#f0fdf4', borderRadius: 2, border: '1px solid #bbf7d0' }}>
                            <WhatsAppIcon sx={{ color: '#16a34a', fontSize: 18 }} />
                            <Typography variant="body2" sx={{ color: '#15803d', fontWeight: 500 }}>
                                Envoi direct à : <strong>{clientPhone}</strong>
                            </Typography>
                        </Box>
                    ) : (
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            Copiez ce lien et partagez-le avec vos clients
                        </Typography>
                    )}

                    <TextField
                        fullWidth
                        value={galleryUrl}
                        variant="outlined"
                        InputProps={{
                            readOnly: true,
                            endAdornment: (
                                <IconButton onClick={handleCopy} edge="end">
                                    <CopyIcon />
                                </IconButton>
                            ),
                        }}
                        sx={{ mb: 2 }}
                    />

                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<WhatsAppIcon />}
                            onClick={handleWhatsApp}
                            fullWidth
                            sx={{ fontWeight: 'bold' }}
                        >
                            {clientPhone
                                ? `Envoyer à ${clientPhone}`
                                : 'Partager via WhatsApp'
                            }
                        </Button>
                    </Box>
                </DialogContent>

                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button onClick={onClose} color="inherit">
                        Fermer
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert severity="success" variant="filled">
                    Lien copié dans le presse-papier
                </Alert>
            </Snackbar>
        </>
    );
};

export default ShareDialog;
