import React, { createContext, useContext } from 'react';
import type { SiteConfig } from '@/types/builder';

interface SiteConfigContextType {
    config: SiteConfig;
}

const SiteConfigContext = createContext<SiteConfigContextType | undefined>(undefined);

export function SiteConfigProvider({
    config,
    children
}: {
    config: SiteConfig;
    children: React.ReactNode
}) {
    return (
        <SiteConfigContext.Provider value={{ config }}>
            {children}
        </SiteConfigContext.Provider>
    );
}

export function useSiteConfig() {
    const context = useContext(SiteConfigContext);
    if (!context) {
        throw new Error('useSiteConfig must be used within a SiteConfigProvider');
    }
    return context;
}
