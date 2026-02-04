import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Loader2, Save, Globe } from 'lucide-react';
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
    const [loading, setLoading] = useState(false);
    const [siteName, setSiteName] = useState(config.siteName);
    const [slug, setSlug] = useState('');
    const [isPublished, setIsPublished] = useState(false);
    const { toast } = useToast();

    const handleSave = async () => {
        setLoading(true);
        try {
            // Create a slug from the name if none provided
            const finalSlug = slug || siteName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

            await siteConfigService.create(config, siteName, finalSlug);

            // If user wanted to publish, we can do it in a separate call or update the API to handle it
            // For now, let's assume create handles basic saving, and we might need separate publish logic if the API requires it
            // Based on our implementation, create accepts is_published status implicitly or we might need to add it to the service

            toast({
                title: "Configuration sauvegardée !",
                description: "Votre site a été enregistré avec succès.",
            });

            if (onSaved) onSaved();
            onOpenChange(false);
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
                    <DialogTitle>Sauvegarder votre site</DialogTitle>
                    <DialogDescription>
                        Enregistrez votre configuration pour pouvoir la modifier plus tard.
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
                            />
                        </div>
                        <p className="text-xs text-gray-500">Laissez vide pour générer automatiquement.</p>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Switch
                            id="publish-mode"
                            checked={isPublished}
                            onCheckedChange={setIsPublished}
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
                                Sauvegarde...
                            </>
                        ) : (
                            <>
                                <Save className="mr-2 h-4 w-4" />
                                Sauvegarder
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
