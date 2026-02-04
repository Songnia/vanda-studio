
import React, { useState } from 'react';

/**
 * 1. DÉFINITION DU CONTRAT (TYPES)
 */
interface SiteConfig {
    siteName: string;
    primaryColor: string;
}

const defaultConfig: SiteConfig = {
    siteName: "Mon Studio Photo",
    primaryColor: "#000000"
};

/**
 * 2. COMPOSANT DU SITE EXISTANT
 * Ce composant est "passif", il ne fait qu'afficher ce qu'on lui donne.
 */
function MonSiteExistant({ config }: { config: SiteConfig }) {
    return (
        <div style={{ padding: '20px', border: '2px solid silver' }}>
            <header style={{ backgroundColor: config.primaryColor, color: 'white', padding: '10px' }}>
                <h1>{config.siteName}</h1>
            </header>
            <main>
                <p>Bienvenue sur mon site dynamique !</p>
            </main>
        </div>
    );
}

/**
 * 3. COMPOSANT DU BUILDER (PANNEAU DE CONTRÔLE)
 * Ce composant permet de modifier la configuration.
 */
function PanneauDeControle({ config, setConfig }: { config: SiteConfig, setConfig: React.Dispatch<React.SetStateAction<SiteConfig>> }) {
    return (
        <div style={{ margin: '20px 0', padding: '10px', background: '#f0f0f0' }}>
            <h3>🛠 Personnalisation</h3>
            <div>
                <label>Nom du site : </label>
                <input
                    type="text"
                    value={config.siteName}
                    onChange={(e) => setConfig({ ...config, siteName: e.target.value })}
                />
            </div>
            <div>
                <label>Couleur principale : </label>
                <input
                    type="color"
                    value={config.primaryColor}
                    onChange={(e) => setConfig({ ...config, primaryColor: e.target.value })}
                />
            </div>
        </div>
    );
}

/**
 * 4. L'ASSEMBLAGE (COMPOSANT PARENT)
 * C'est ici que le useState est créé et partagé.
 */
export default function App() {
    // Le state global qui contient tout votre "contrat"
    const [config, setConfig] = useState<SiteConfig>(defaultConfig);

    return (
        <div style={{ fontFamily: 'sans-serif', maxWidth: '800px', margin: 'auto' }}>
            <h2>Builder de Site Photo</h2>

            {/* On passe config et setConfig au builder pour modification */}
            <PanneauDeControle config={config} setConfig={setConfig} />

            <hr />

            {/* On passe uniquement config au site pour affichage */}
            <MonSiteExistant config={config} />
        </div>
    );
}
