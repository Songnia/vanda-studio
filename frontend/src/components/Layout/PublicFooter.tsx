import { Globe } from 'lucide-react'
import vandaLogo from '@/template/assets/logo/vanda_logo.png'

export default function PublicFooter() {
    const links = {
        Product: [
            { label: 'Fonctionnalités', href: '#features' },
            { label: 'Tarifs', href: '#pricing' },
            { label: 'Démo', href: '#' },
            { label: 'Changelog', href: '#' },
        ],
        Resources: [
            { label: 'Centre d\'aide', href: '#' },
            { label: 'Documentation', href: '#' },
            { label: 'Blog', href: '#' },
            { label: 'Roadmap', href: '#' },
        ],
        Company: [
            { label: 'À propos', href: '#' },
            { label: 'Carrières', href: '#' },
            { label: 'Contact', href: '#' },
            { label: 'Presse', href: '#' },
        ],
        Legal: [
            { label: 'Confidentialité', href: '#' },
            { label: 'Conditions', href: '#' },
            { label: 'CGV', href: '#' },
            { label: 'Mentions légales', href: '#' },
        ],
    }

    return (
        <footer className="py-16 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
                    {/* Logo & Description */}
                    <div className="col-span-2">
                    <a href="/" className="flex items-center gap-2 mb-4">
                            <img
                                src={vandaLogo}
                                alt="Vanda Studio Logo"
                                style={{ height: '40px', objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
                            />
                            <span style={{
                                fontSize: '1.1rem',
                                fontWeight: 800,
                                background: 'linear-gradient(135deg, #4caf50 0%, #81c784 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                letterSpacing: '-0.5px'
                            }}>
                                VANDA STUDIO
                            </span>
                        </a>
                        <p className="text-gray-400 text-sm mb-4 max-w-xs">
                            La plateforme tout-en-un pour créer votre site de photographe professionnel
                            et livrer vos galeries clients.
                        </p>
                        <div className="flex gap-4">
                            {['twitter', 'instagram', 'linkedin', 'youtube'].map((social) => (
                                <a
                                    key={social}
                                    href="#"
                                    className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                                >
                                    <Globe className="w-4 h-4 text-gray-400" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    {Object.entries(links).map(([category, items]) => (
                        <div key={category}>
                            <h4 className="text-white font-medium mb-4">{category}</h4>
                            <ul className="space-y-2">
                                {items.map((item) => (
                                    <li key={item.label}>
                                        <a
                                            href={item.href}
                                            className="text-sm text-gray-400 hover:text-white transition-colors"
                                        >
                                            {item.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-500">
                        © 2026 VANDA STUDIO. Tous droits réservés.
                    </p>
                    <p className="text-sm text-gray-500">
                        Fait avec ❤️ pour les photographes
                    </p>
                </div>
            </div>
        </footer>
    )
}
