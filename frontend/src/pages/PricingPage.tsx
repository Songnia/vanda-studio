import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Check, Star, ArrowRight, Menu, X } from 'lucide-react'
import vandaLogo from '@/template/assets/logo/vanda_logo.png'
import PublicFooter from '../components/Layout/PublicFooter'

const ADMIN_URL = import.meta.env.VITE_ADMIN_URL || 'https://app.vanda-studio.org';

// Simplified Navbar for Pricing Page
function PricingNavbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass-strong' : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <a href="/" className="flex items-center gap-2 group">
                        <img
                            src={vandaLogo}
                            alt="Vanda Studio Logo"
                            style={{ height: '50px', objectFit: 'contain' }}
                        />
                        <span style={{
                            fontSize: '1.25rem',
                            fontWeight: 800,
                            background: 'linear-gradient(135deg, #4caf50 0%, #81c784 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            letterSpacing: '-0.5px'
                        }}>
                            VANDA STUDIO
                        </span>
                    </a>

                    {/* Desktop Login/Register - Mid section intentionally empty as requested */}
                    <div className="hidden md:flex items-center gap-6">
                        <a href={`${ADMIN_URL}/auth/login`} className="text-sm text-gray-400 hover:text-white transition-colors">
                            Connexion
                        </a>
                        <a
                            href={`${ADMIN_URL}/auth/register`}
                            className="bg-green-500 hover:bg-green-600 text-black font-semibold px-6 py-2 rounded-lg transition-colors"
                        >
                            Créer mon site
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-white"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="md:hidden glass-strong rounded-xl mt-2 p-4"
                    >
                        <div className="flex flex-col gap-4">
                            <a href={`${ADMIN_URL}/auth/login`} className="text-gray-400 hover:text-white transition-colors">Connexion</a>
                            <a
                                href={`${ADMIN_URL}/auth/register`}
                                className="bg-green-500 hover:bg-green-600 text-black font-semibold px-4 py-2 rounded-lg text-center transition-colors"
                            >
                                Créer mon site
                            </a>
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.nav>
    )
}

// Pricing Hero
function PricingHero() {
    return (
        <section className="pt-32 pb-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl sm:text-5xl font-bold text-white mb-6"
                >
                    Des tarifs <span className="gradient-text">simples et transparents</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-lg text-gray-400"
                >
                    Commencez gratuitement, upgradez quand vous êtes prêt.
                    Pas de frais cachés, annulation à tout moment.
                </motion.p>
            </div>
        </section>
    )
}

// Pricing Cards
function PricingCards() {
    const plans = [
        {
            id: 'mensuel',
            name: 'Mensuel',
            description: 'Flexibilité totale, sans engagement',
            price: 5000,
            period: '/mois',
            features: [
                'Site Builder complet',
                'Pages illimitées',
                'Photos portfolio illimitées',
                'Galeries illimitées',
                'Stockage illimité',
                'Domaine personnalisé',
                'Sans watermark',
                'Analytics',
                'Support prioritaire',
                'API access',
            ],
            cta: 'Commencer',
            popular: false,
            color: 'green',
        },
        {
            id: 'annuel',
            name: 'Annuel',
            description: 'La meilleure valeur, payez moins',
            price: 50000,
            period: '/an',
            badge: 'Économisez 10 000 F',
            features: [
                'Tout du plan Mensuel',
                'Pages illimitées',
                'Photos portfolio illimitées',
                'Galeries illimitées',
                'Stockage illimité',
                'Domaine personnalisé',
                'Sans watermark',
                'Analytics',
                'Support prioritaire',
                'API access',
            ],
            cta: 'Choisir Annuel',
            popular: true,
            color: 'blue',
        },
    ]

    const getColorClasses = (color: string) => {
        switch (color) {
            case 'blue':
                return {
                    text: 'text-blue-400',
                    bg: 'bg-blue-500',
                    border: 'border-blue-500/30',
                    glow: 'shadow-[0_0_40px_rgba(59,130,246,0.15)]',
                    button: 'bg-blue-500 hover:bg-blue-600 text-white',
                    lightBg: 'bg-blue-500/20'
                };
            default: // green
                return {
                    text: 'text-green-400',
                    bg: 'bg-green-500',
                    border: 'border-green-500/30',
                    glow: 'shadow-[0_0_40px_rgba(74,222,128,0.15)]',
                    button: 'bg-green-500 hover:bg-green-600 text-black',
                    lightBg: 'bg-green-500/20'
                };
        }
    };

    return (
        <section className="py-16">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Toggle Mensuel/Annuel commenté */}
                {/* <div className="flex items-center justify-center gap-4 mb-12">
                    <span>Mensuel</span>
                    <button>...</button>
                    <span>Annuel <span>-17%</span></span>
                </div> */}

                {/* Cards */}
                <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                    {plans.map((plan, index) => {
                        const colors = getColorClasses(plan.color);
                        return (
                            <motion.div
                                key={plan.name}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`relative rounded-2xl p-8 ${plan.popular
                                    ? `glass-strong ${colors.border} ${colors.glow}`
                                    : 'glass border-white/5'
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                        <span className={`${colors.bg} text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1`}>
                                            <Star className="w-3 h-3 fill-white" />
                                            MEILLEURE VALEUR
                                        </span>
                                    </div>
                                )}
                                {(plan as any).badge && (
                                    <div className="absolute top-4 right-4">
                                        <span className="bg-green-500/20 text-green-400 text-xs font-semibold px-2 py-1 rounded-full">
                                            {(plan as any).badge}
                                        </span>
                                    </div>
                                )}

                                <div className="mb-6">
                                    <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                                    <p className="text-sm text-gray-400">{plan.description}</p>
                                </div>

                                <div className="mb-8">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-5xl font-bold text-white">
                                            {plan.price.toLocaleString()} F
                                        </span>
                                        <span className="text-gray-400">{plan.period}</span>
                                    </div>
                                </div>

                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <Check className={`w-5 h-5 ${colors.text} flex-shrink-0 mt-0.5`} />
                                            <span className="text-sm text-gray-300">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <a
                                    href={`${ADMIN_URL}/auth/register`}
                                    onClick={() => localStorage.setItem('selectedPlan', plan.id)}
                                    className={`block w-full text-center py-3 rounded-lg font-semibold transition-colors ${colors.button}`}
                                >
                                    {plan.cta}
                                </a>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    )
}

// ComparisonTable
function ComparisonTable() {
    const features = [
        { name: 'Site Builder', mensuel: true, annuel: true },
        { name: 'Pages', mensuel: 'Illimité', annuel: 'Illimité' },
        { name: 'Photos portfolio', mensuel: 'Illimité', annuel: 'Illimité' },
        { name: 'Galeries/mois', mensuel: 'Illimité', annuel: 'Illimité' },
        { name: 'Stockage', mensuel: 'Illimité', annuel: 'Illimité' },
        { name: 'Domaine personnalisé', mensuel: true, annuel: true },
        { name: 'Sans watermark', mensuel: true, annuel: true },
        { name: 'Multi-utilisateurs', mensuel: true, annuel: true },
        { name: 'White label', mensuel: true, annuel: true },
        { name: 'Support', mensuel: 'Prioritaire', annuel: 'Prioritaire' },
        { name: 'Analytics', mensuel: true, annuel: true },
        { name: 'API', mensuel: true, annuel: true },
    ]

    const renderCell = (value: string | boolean, colorClass: string) => {
        if (typeof value === 'boolean') {
            return value ? (
                <Check className={`w-5 h-5 ${colorClass} mx-auto`} />
            ) : (
                <span className="text-gray-600">—</span>
            );
        }
        return <span className="text-gray-300">{value}</span>;
    };

    return (
        <section className="py-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-bold text-white mb-8 text-center">
                    Toutes les fonctionnalités incluses
                </h2>

                <div className="glass rounded-2xl overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="text-left p-4 text-gray-400 font-medium">Fonctionnalité</th>
                                <th className="text-center p-4 text-white font-medium">Mensuel</th>
                                <th className="text-center p-4 text-blue-400 font-medium bg-blue-500/5">
                                    Annuel <span className="text-xs ml-1">⭐</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {features.map((feature, index) => (
                                <tr key={index} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                                    <td className="p-4 text-gray-300">{feature.name}</td>
                                    <td className="p-4 text-center">
                                        {renderCell(feature.mensuel, 'text-green-400')}
                                    </td>
                                    <td className="p-4 text-center bg-blue-500/5">
                                        {renderCell(feature.annuel, 'text-blue-400')}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}

// FAQ Section
function FAQSection() {
    const faqs = [
        {
            q: 'Ai-je besoin de compétences techniques ?',
            a: 'Aucune ! Si vous savez utiliser Instagram, vous savez utiliser VANDA STUDIO.',
        },
        {
            q: "Puis-je changer de plan plus tard ?",
            a: "Oui, upgrade ou downgrade à tout moment. Pas d'engagement."
        },
        {
            q: "Que se passe-t-il si j'annule ?",
            a: "Vos données sont exportables. Pas de prise en otage."
        },
        {
            q: "Le domaine personnalisé est-il inclus ?",
            a: "Oui, le support d'un domaine personnalisé est inclus dans les deux formules."
        },
    ]

    return (
        <section className="py-24 bg-white/[0.02]">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-bold text-white mb-8 text-center">
                    Questions fréquentes
                </h2>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="glass rounded-xl p-6"
                        >
                            <h3 className="text-white font-medium mb-2">{faq.q}</h3>
                            <p className="text-gray-400">{faq.a}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

// CTA Section
function CTASection() {
    return (
        <section className="py-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative glass-strong rounded-3xl p-12 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Prêt à commencer ?
                    </h2>
                    <p className="text-gray-400 mb-8">
                        Essai gratuit de 30 jours. Sans carte bancaire.
                    </p>
                    <a
                        href={`${ADMIN_URL}/auth/register`}
                        className="bg-green-500 hover:bg-green-600 text-black font-semibold px-8 py-3 rounded-lg inline-flex items-center gap-2 transition-colors"
                    >
                        Créer mon site gratuitement
                        <ArrowRight className="w-5 h-5" />
                    </a>
                </div>
            </div>
        </section>
    )
}

// Main Pricing Page Component
export default function PricingPage() {
    return (
        <div className="min-h-screen bg-background text-foreground linear-theme font-sans">
            <PricingNavbar />
            <PricingHero />
            <PricingCards />
            <ComparisonTable />
            <FAQSection />
            <CTASection />
            <PublicFooter />
        </div>
    )
}
