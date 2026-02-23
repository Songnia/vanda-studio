import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Star, ArrowRight } from 'lucide-react'
import PublicNavbar from '../components/Layout/PublicNavbar'
import PublicFooter from '../components/Layout/PublicFooter'




const ADMIN_URL = import.meta.env.VITE_ADMIN_URL || 'https://app.vanda-studio.org';

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
    const [isYearly, setIsYearly] = useState(false)

    const plans = [
        {
            id: 'starter',
            name: 'Starter',
            description: 'Lancez votre activité pro',
            price: { monthly: 5000, yearly: 50000 },
            features: [
                'Site Builder complet',
                '5 pages max',
                '20 photos portfolio',
                '4 galeries/mois',
                '500 MB stockage',
                'Sous-domaine .vandastudio.com',
                'Support email (48h)',
            ],
            cta: 'Commencer',
            popular: false,
            color: 'green',
        },
        {
            id: 'pro',
            name: 'Pro',
            description: 'Pour photographes actifs',
            price: { monthly: 15000, yearly: 150000 },
            features: [
                'Tout du plan Starter',
                'Pages illimitées',
                '500 photos portfolio',
                '20 galeries/mois',
                '50 GB stockage',
                'Domaine personnalisé',
                'Sans watermark',
                'Analytics basiques',
                'Support prioritaire (12h)',
            ],
            cta: 'Passer à Pro',
            popular: true,
            color: 'blue',
        },
        {
            id: 'studio',
            name: 'Studio',
            description: 'Pour studios établis',
            price: { monthly: 45000, yearly: 450000 },
            features: [
                'Tout du plan Pro',
                'Galeries illimitées',
                '500 GB stockage',
                '3 comptes utilisateurs',
                'White label complet',
                'Support chat + téléphone',
                'Analytics avancés',
                'API access',
                'Backup automatique',
            ],
            cta: 'Devenir Studio',
            popular: false,
            color: 'purple',
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
            case 'purple':
                return {
                    text: 'text-purple-400',
                    bg: 'bg-purple-500',
                    border: 'border-purple-500/30',
                    glow: 'shadow-[0_0_40px_rgba(168,85,247,0.15)]',
                    button: 'bg-purple-500 hover:bg-purple-600 text-white',
                    lightBg: 'bg-purple-500/20'
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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Toggle */}
                <div className="flex items-center justify-center gap-4 mb-12">
                    <span className={`text-sm ${!isYearly ? 'text-white' : 'text-gray-400'}`}>Mensuel</span>
                    <button
                        onClick={() => setIsYearly(!isYearly)}
                        className={`relative w-14 h-7 rounded-full transition-colors ${isYearly ? 'bg-green-500' : 'bg-gray-700'
                            }`}
                    >
                        <span
                            className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-transform ${isYearly ? 'translate-x-8' : 'translate-x-1'
                                }`}
                        />
                    </button>
                    <span className={`text-sm ${isYearly ? 'text-white' : 'text-gray-400'}`}>
                        Annuel
                        <span className="ml-2 px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">-17%</span>
                    </span>
                </div>

                {/* Cards */}
                <div className="grid md:grid-cols-3 gap-8">
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
                                            PLUS POPULAIRE
                                        </span>
                                    </div>
                                )}

                                <div className="mb-6">
                                    <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                                    <p className="text-sm text-gray-400">{plan.description}</p>
                                </div>

                                <div className="mb-6">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl font-bold text-white">
                                            {(isYearly ? plan.price.yearly : plan.price.monthly).toLocaleString()} F
                                        </span>
                                        <span className="text-gray-400">{isYearly ? '/an' : '/mois'}</span>
                                    </div>
                                    {isYearly && (
                                        <div className="text-sm text-gray-500 mt-1">
                                            Facturé annuellement
                                        </div>
                                    )}
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
                                    className={`block w-full text-center py-3 rounded-lg font-medium transition-colors ${plan.popular
                                        ? colors.button
                                        : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                                        }`}
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
        { name: 'Site Builder', starter: true, pro: true, studio: true },
        { name: 'Pages', starter: '5', pro: 'Illimité', studio: 'Illimité' },
        { name: 'Photos portfolio', starter: '20', pro: '500', studio: 'Illimité' },
        { name: 'Galeries/mois', starter: '4', pro: '20', studio: 'Illimité' },
        { name: 'Stockage', starter: '500 MB', pro: '50 GB', studio: '500 GB' },
        { name: 'Domaine personnalisé', starter: false, pro: true, studio: true },
        { name: 'Sans watermark', starter: false, pro: true, studio: true },
        { name: 'Multi-utilisateurs', starter: false, pro: false, studio: '3 comptes' },
        { name: 'White label', starter: false, pro: false, studio: true },
        { name: 'Support', starter: 'Email 48h', pro: 'Email 12h', studio: 'Chat + Tél' },
        { name: 'Analytics', starter: false, pro: 'Basique', studio: 'Avancé' },
        { name: 'API', starter: false, pro: false, studio: true },
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
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-bold text-white mb-8 text-center">
                    Comparaison des fonctionnalités
                </h2>

                <div className="glass rounded-2xl overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="text-left p-4 text-gray-400 font-medium">Fonctionnalité</th>
                                <th className="text-center p-4 text-white font-medium">Starter</th>
                                <th className="text-center p-4 text-blue-400 font-medium bg-blue-500/5">
                                    Pro <span className="text-xs ml-1">⭐</span>
                                </th>
                                <th className="text-center p-4 text-purple-400 font-medium">
                                    Studio <span className="text-xs ml-1">👑</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {features.map((feature, index) => (
                                <tr key={index} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                                    <td className="p-4 text-gray-300">{feature.name}</td>
                                    <td className="p-4 text-center">
                                        {renderCell(feature.starter, 'text-green-400')}
                                    </td>
                                    <td className="p-4 text-center bg-blue-500/5">
                                        {renderCell(feature.pro, 'text-blue-400')}
                                    </td>
                                    <td className="p-4 text-center">
                                        {renderCell(feature.studio, 'text-purple-400')}
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
            a: "Le sous-domaine est gratuit. Votre propre domaine (.com) est inclus dans PRO."
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
                        Essai gratuit de 14 jours. Sans carte bancaire.
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
            <PublicNavbar />
            <PricingHero />
            <PricingCards />
            <ComparisonTable />
            <FAQSection />
            <CTASection />
            <PublicFooter />
        </div>
    )
}
