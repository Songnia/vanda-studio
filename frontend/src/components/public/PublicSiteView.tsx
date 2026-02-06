import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PreviewSiteWrapper } from '@/components/PreviewSiteWrapper';
import { siteConfigService } from '@/services/siteConfigService';
import type { SiteConfig } from '@/types/builder';
import { Loader2 } from 'lucide-react';
import { defaultSiteConfig } from '@/types/builder';

export function PublicSiteView() {
    const { slug } = useParams<{ slug: string }>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [config, setConfig] = useState<SiteConfig | null>(null);

    useEffect(() => {
        const fetchSite = async () => {
            if (!slug) return;

            try {
                setLoading(true);
                const data = await siteConfigService.getPublicSite(slug);

                // Merge with default config to ensure all fields exist
                // The API returns { site_name, slug, config_data, ... }
                // We need to construct a full SiteConfig object

                const fullConfig: SiteConfig = {
                    ...defaultSiteConfig,
                    ...data.config_data, // The stored JSON config
                    siteName: data.site_name, // Override with DB site name
                };

                setConfig(fullConfig);
            } catch (err: any) {
                console.error('Failed to load site:', err);
                setError('Site introuvable ou non publié.');
            } finally {
                setLoading(false);
            }
        };

        fetchSite();
    }, [slug]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-900 text-white">
                <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
                <p>Chargement du site...</p>
            </div>
        );
    }

    if (error || !config) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-900 text-white p-4">
                <h1 className="text-2xl font-bold mb-2 text-red-500">Oups !</h1>
                <p className="text-lg text-gray-400">{error || "Impossible d'afficher le site."}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <PreviewSiteWrapper config={config} />
        </div>
    );
}
