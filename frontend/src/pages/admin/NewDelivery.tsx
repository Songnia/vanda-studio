import React, { useState } from 'react';
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    Stack,
    Alert,
    Snackbar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowBack as BackIcon, Save as SaveIcon } from '@mui/icons-material';
import DualUploadZone from '../../components/Delivery/DualUploadZone';
import ShareDialog from '../../components/Delivery/ShareDialog';
import { galleryService } from '../../services/galleryService';
import type { GalleryImage } from '../../types/gallery';

const NewDelivery: React.FC = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState<File[]>([]);
    const [zipFile, setZipFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [shareDialogOpen, setShareDialogOpen] = useState(false);
    const [createdUuid, setCreatedUuid] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const [zipUploading, setZipUploading] = useState(false);
    const [zipProgress, setZipProgress] = useState(0);
    const [imagesUploading, setImagesUploading] = useState(false);
    const [imagesProgress, setImagesProgress] = useState(0);
    const [uploadStatus, setUploadStatus] = useState('');

    const handleImagesSelected = (files: File[]) => {
        setImages(files);
        // Simulate upload progress
        setImagesUploading(true);
        setImagesProgress(0);
        const interval = setInterval(() => {
            setImagesProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setImagesUploading(false);
                    return 100;
                }
                return prev + 10;
            });
        }, 150);
    };

    const handleZipSelected = (files: File[]) => {
        if (files.length > 0) {
            setZipFile(files[0]);
            // Simulate upload progress
            setZipUploading(true);
            setZipProgress(0);
            const interval = setInterval(() => {
                setZipProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setZipUploading(false);
                        return 100;
                    }
                    return prev + 10;
                });
            }, 200);
        }
    };

    const BATCH_SIZE = 5; // Upload 5 images at a time to stay under server limits

    const handleSave = async () => {
        if (!title.trim()) {
            setSnackbarMessage('Veuillez entrer un titre');
            setSnackbarOpen(true);
            return;
        }

        if (images.length === 0) {
            setSnackbarMessage('Veuillez ajouter au moins une image');
            setSnackbarOpen(true);
            return;
        }

        setUploading(true);
        setUploadStatus('Création de la galerie...');

        try {
            // Step 1: Create gallery with no photos (just metadata)
            const newGallery = await galleryService.createGallery({
                title,
                description,
                images: [],
                files: [],
                zipFileUrl: '#',
                zipFileSize: '0',
                pin: '1234'
            });

            const galleryUuid = newGallery.uuid;

            // Step 2: Upload images in batches
            const totalBatches = Math.ceil(images.length / BATCH_SIZE);
            for (let i = 0; i < images.length; i += BATCH_SIZE) {
                const batch = images.slice(i, i + BATCH_SIZE);
                const batchNumber = Math.floor(i / BATCH_SIZE) + 1;
                setUploadStatus(`Upload photos: lot ${batchNumber}/${totalBatches} (${Math.min(i + BATCH_SIZE, images.length)}/${images.length})...`);
                setImagesProgress(Math.round((batchNumber / totalBatches) * 100));
                await galleryService.addPhotosToGallery(galleryUuid, batch);
            }
            setImagesProgress(100);

            // Step 3: Upload ZIP if provided (non-blocking)
            if (zipFile) {
                setUploadStatus('Upload du fichier ZIP...');
                try {
                    await galleryService.uploadZipToGallery(galleryUuid, zipFile);
                } catch (zipError) {
                    console.warn('ZIP upload failed (non-blocking):', zipError);
                    setSnackbarMessage(`Galerie créée avec succès ! Mais le ZIP (${(zipFile.size / (1024 * 1024)).toFixed(1)} Mo) n'a pas pu être uploadé (taille trop grande). Vous pouvez le re-télécharger plus tard.`);
                    setSnackbarOpen(true);
                }
            }

            setCreatedUuid(galleryUuid);
            setUploading(false);
            setUploadStatus('');
            setShareDialogOpen(true);
        } catch (error) {
            console.error("Failed to create gallery", error);
            setSnackbarMessage('Erreur lors de la création de la galerie');
            setSnackbarOpen(true);
            setUploading(false);
            setUploadStatus('');
        }
    };

    const handleDialogClose = () => {
        setShareDialogOpen(false);
        navigate('/admin/dashboard');
    };

    return (
        <Container maxWidth="md" sx={{ py: { xs: 3, md: 6 } }}>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Button
                    startIcon={<BackIcon />}
                    onClick={() => navigate('/admin/dashboard')}
                    sx={{ mb: 2 }}
                >
                    Retour
                </Button>

                <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Nouvelle Livraison
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Créez une galerie photo pour partager avec vos clients
                </Typography>
            </Box>

            {/* Form */}
            <Box component="form" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                <Stack spacing={3}>
                    {/* Title */}
                    <TextField
                        fullWidth
                        label="Titre de l'événement"
                        variant="outlined"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Ex: Mariage Alice & Bob"
                        required
                    />

                    {/* Description */}
                    <TextField
                        fullWidth
                        label="Description"
                        variant="outlined"
                        multiline
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Une brève description de l'événement..."
                    />

                    {/* Upload Zone A - Images */}
                    <Box>
                        <DualUploadZone
                            title="Zone A: Images JPG"
                            subtitle="Glissez vos photos ici ou cliquez pour sélectionner (format JPG, PNG)"
                            acceptedTypes="image/jpeg,image/jpg,image/png"
                            multiple={true}
                            onFilesSelected={handleImagesSelected}
                            uploading={imagesUploading}
                            uploadProgress={imagesProgress}
                        />
                        {images.length > 0 && !imagesUploading && (
                            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                                {images.length} image(s) sélectionnée(s)
                            </Typography>
                        )}
                    </Box>

                    {/* Upload Zone B - ZIP */}
                    {/*<Box>
                        <DualUploadZone
                            title="Zone B: Fichier ZIP (optionnel)"
                            subtitle="Package haute résolution pour téléchargement (format ZIP)"
                            acceptedTypes=".zip"
                            multiple={false}
                            onFilesSelected={handleZipSelected}
                            uploading={zipUploading}
                            uploadProgress={zipProgress}
                        />
                        {zipFile && !zipUploading && (
                            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                                {zipFile.name} ({(zipFile.size / (1024 * 1024)).toFixed(2)} MB)
                            </Typography>
                        )}
                    </Box>*/}

                    {/* Actions */}
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', flexDirection: 'column', alignItems: 'flex-end' }}>
                        {uploading && uploadStatus && (
                            <Typography variant="caption" color="text.secondary" sx={{ alignSelf: 'flex-start' }}>
                                {uploadStatus}
                            </Typography>
                        )}
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Button
                                variant="outlined"
                                onClick={() => navigate('/admin/dashboard')}
                                disabled={uploading}
                            >
                                Annuler
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                startIcon={<SaveIcon />}
                                disabled={uploading}
                                sx={{ fontWeight: 'bold' }}
                            >
                                {uploading ? `En cours... (${imagesProgress}%)` : 'Enregistrer & Partager'}
                            </Button>
                        </Box>
                    </Box>
                </Stack>
            </Box>

            {/* Share Dialog */}
            <ShareDialog
                open={shareDialogOpen}
                onClose={handleDialogClose}
                uuid={createdUuid}
            />

            {/* Snackbar */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert severity="warning" variant="filled">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default NewDelivery;
