/**
 * Utilitaire de détection de sous-domaine
 * 
 * Logique :
 *  - vanda-studio.org           → type: 'main'    (landing, pricing)
 *  - app.vanda-studio.org       → type: 'admin'   (dashboard, builder)
 *  - studio-martin.vanda-studio.org → type: 'photographer', slug: 'studio-martin'
 *  - localhost / 127.0.0.1      → type: 'main'    (dev local)
 */

export type SubdomainType = 'main' | 'admin' | 'photographer';

export interface SubdomainInfo {
    type: SubdomainType;
    slug: string | null;
}

const BASE_DOMAIN = 'vanda-studio.org';
const RESERVED_SUBDOMAINS = ['app', 'api', 'www', 'mail', 'ftp'];

export function getSubdomainInfo(): SubdomainInfo {
    const hostname = window.location.hostname;

    // Développement local → comportement normal (toutes les routes)
    if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname.startsWith('192.168.')) {
        return { type: 'main', slug: null };
    }

    // Domaine principal exact
    if (hostname === BASE_DOMAIN || hostname === `www.${BASE_DOMAIN}`) {
        return { type: 'main', slug: null };
    }

    // Extraire le sous-domaine
    if (hostname.endsWith(`.${BASE_DOMAIN}`)) {
        const subdomain = hostname.slice(0, hostname.length - BASE_DOMAIN.length - 1);

        // Sous-domaines réservés → admin panel
        if (RESERVED_SUBDOMAINS.includes(subdomain)) {
            return { type: 'admin', slug: null };
        }

        // Tout autre sous-domaine → site d'un photographe
        return { type: 'photographer', slug: subdomain };
    }

    // Fallback
    return { type: 'main', slug: null };
}
