import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Loader2, Save } from 'lucide-react';
import { siteConfigService } from '@/services/siteConfigService';
import type { SiteConfig } from '@/types/builder';
import { useToast } from '@/components/ui/use-toast';

interface SaveConfigDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    config: SiteConfig;
    onSaved?: () => void;
}

export function SaveConfigDialog({ open, onOpenChange, config, onSaved }: SaveConfigDialogProps) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [existingId, setExistingId] = useState<number | null>(null);
    const [siteName, setSiteName] = useState(config.siteName);
    const [slug, setSlug] = useState('');
    const [isPublished, setIsPublished] = useState(false);
    const { toast } = useToast();

    // Check for existing configuration when dialog opens
    useEffect(() => {
        if (open) {
            checkExistingConfig();
        }
    }, [open]);

    const checkExistingConfig = async () => {
        try {
            const configs = await siteConfigService.getMyConfigs();
            if (configs && configs.length > 0) {
                const existing = configs[0];
                setExistingId(existing.id);
                // Populate fields with existing data
                setSiteName(existing.site_name);
                setSlug(existing.slug);
                setIsPublished(existing.is_published);
            }
        } catch (error) {
            console.error("Failed to check existing config", error);
        }
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            if (existingId) {
                // UPDATE existing site
                await siteConfigService.update(existingId, config);
                // We keep siteName/slug/publish status as is on the backend or we can pass them if we wanted to update them
                // But user asked to DISABLE them, implying they shouldn't change.
                // The update method signature is update(id, config, siteName?, slug?).
                // Pass current values just in case, or leave out if backend ignores them. 
                // Let's pass them to be consistent with what's "seen" (even if disabled).

                toast({
                    title: "Site mis à jour !",
                    description: "Vos modifications ont été enregistrées avec succès.",
                });
            } else {
                // CREATE new site
                const finalSlug = slug || siteName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

                await siteConfigService.create(config, siteName, finalSlug);

                toast({
                    title: "Site créé !",
                    description: "Votre site a été enregistré avec succès.",
                });
            }

            if (onSaved) onSaved();
            onOpenChange(false);

            // Redirect to Delivery Platform (Admin Dashboard)
            navigate('/admin/dashboard');
        } catch (error: any) {
            console.error('Save error:', error);
            toast({
                title: "Erreur lors de la sauvegarde",
                description: error.response?.data?.message || "Une erreur est survenue.",
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{existingId ? "Mettre à jour le site" : "Sauvegarder votre site"}</DialogTitle>
                    <DialogDescription>
                        {existingId
                            ? "Vos modifications seront appliquées à votre site existant."
                            : "Enregistrez votre configuration pour la première fois."}
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="site-name">Nom du site</Label>
                        <Input
                            id="site-name"
                            value={siteName}
                            onChange={(e) => setSiteName(e.target.value)}
                            placeholder="Mon Super Studio"
                            disabled={!!existingId}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="slug">URL personnalisée (optionnel)</Label>
                        <div className="flex items-center">
                            <span className="text-sm text-gray-500 mr-1">/sites/</span>
                            <Input
                                id="slug"
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                placeholder="mon-studio"
                                disabled={!!existingId}
                            />
                        </div>
                        <p className="text-xs text-gray-500">Laissez vide pour générer automatiquement.</p>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Switch
                            id="publish-mode"
                            checked={isPublished}
                            onCheckedChange={setIsPublished}
                            disabled={!!existingId}
                        />
                        <Label htmlFor="publish-mode">Publier immédiatement</Label>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
                        Annuler
                    </Button>
                    <Button onClick={handleSave} disabled={loading} className="bg-primary">
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                {existingId ? "Mettre à jour" : "Sauvegarder"}
                            </>
                        ) : (
                            <>
                                <Save className="mr-2 h-4 w-4" />
                                {existingId ? "Mettre à jour" : "Sauvegarder"}
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
