import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
    Camera,
    Layout,
    Image,
    Share2,
    Check,
    ArrowRight,
    Star,
    Heart,
    Globe,
    Sparkles,
    Menu,
    X
} from 'lucide-react'

const ADMIN_URL = import.meta.env.VITE_ADMIN_URL || 'https://app.vanda-studio.org';

// Navigation Component
function Navigation() {
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
                        <span style={{
                            fontSize: '1.5rem',
                            fontWeight: 800,
                            background: 'linear-gradient(135deg, #4caf50 0%, #81c784 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            letterSpacing: '-0.5px'
                        }}>
                            🞹 VANDA STUDIO
                        </span>
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <a href="#features" className="text-sm text-gray-400 hover:text-white transition-colors">Fonctionnalités</a>
                        <a href="#how-it-works" className="text-sm text-gray-400 hover:text-white transition-colors">Comment ça marche</a>
                        <a href="/pricing" className="text-sm text-gray-400 hover:text-white transition-colors">Tarifs</a>
                        <a href="#testimonials" className="text-sm text-gray-400 hover:text-white transition-colors">Témoignages</a>
                    </div>

                    {/* CTAs */}
                    <div className="hidden md:flex items-center gap-4">
                        <a href={`${ADMIN_URL}/auth/login`} className="text-sm text-gray-400 hover:text-white transition-colors">
                            Connexion
                        </a>
                        <a
                            href={`${ADMIN_URL}/auth/register`}
                            className="bg-green-500 hover:bg-green-600 text-black font-medium px-4 py-2 rounded-lg transition-colors"
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
                            <a href="#features" className="text-gray-400 hover:text-white transition-colors">Fonctionnalités</a>
                            <a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors">Comment ça marche</a>
                            <a href="#pricing" className="text-gray-400 hover:text-white transition-colors">Tarifs</a>
                            <a href="#testimonials" className="text-gray-400 hover:text-white transition-colors">Témoignages</a>
                            <hr className="border-white/10" />
                            <a href={`${ADMIN_URL}/auth/login`} className="text-gray-400 hover:text-white transition-colors">Connexion</a>
                            <a
                                href={`${ADMIN_URL}/auth/register`}
                                className="bg-green-500 hover:bg-green-600 text-black font-medium px-4 py-2 rounded-lg text-center transition-colors"
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

// Hero Section
function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(74,222,128,0.08),transparent_50%)]" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-6"
                        >
                            <Sparkles className="w-4 h-4 text-green-400" />
                            <span className="text-sm text-gray-300">Essai gratuit 30 jours • Sans carte bancaire</span>
                        </motion.div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                            Créez votre site de{' '}
                            <span className="gradient-text">photographe professionnel</span>{' '}
                            en 10 minutes
                        </h1>

                        <p className="text-lg text-gray-400 mb-8 max-w-xl">
                            Sans code, sans stress. De la création à la livraison de galeries,
                            VANDA STUDIO gère tout pour vous.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <a
                                href={`${ADMIN_URL}/auth/register`}
                                className="bg-green-500 hover:bg-green-600 text-black font-semibold px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
                            >
                                <Camera className="w-5 h-5" />
                                Créer mon site gratuitement
                            </a>
                            {/* <button className="border border-white/20 text-white hover:bg-white/5 px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors">
                                <Layout className="w-5 h-5" />
                                Voir une démo
                            </button>*/}
                        </div>

                        {/* Social Proof Mini */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="mt-10 flex items-center gap-4"
                        >
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4].map((i) => (
                                    <div
                                        key={i}
                                        className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 border-2 border-black"
                                    />
                                ))}
                            </div>
                            <div className="text-sm text-gray-400">
                                <span className="text-white font-semibold">500+</span> photographes nous font confiance
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Content - Mockup */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                        className="relative"
                    >
                        <div className="relative animate-float">
                            {/* Glow */}
                            <div className="absolute inset-0 bg-green-500/20 rounded-2xl blur-2xl" />

                            {/* Mockup Card */}
                            <div className="relative glass-strong rounded-2xl p-6 glow-green">
                                {/* Browser Chrome */}
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-red-500" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                        <div className="w-3 h-3 rounded-full bg-green-500" />
                                    </div>
                                    <div className="flex-1 mx-4">
                                        <div className="bg-black/30 rounded-md px-3 py-1 text-xs text-gray-500 text-center">
                                            monstudio.vandastudio.com
                                        </div>
                                    </div>
                                </div>

                                {/* Mockup Content */}
                                <div className="space-y-4">
                                    {/* Hero */}
                                    <div className="h-32 bg-gradient-to-br from-green-500/20 to-green-600/10 rounded-xl flex items-center justify-center">
                                        <Camera className="w-12 h-12 text-green-400" />
                                    </div>

                                    {/* Content Grid */}
                                    <div className="grid grid-cols-3 gap-3">
                                        <div className="aspect-square bg-white/5 rounded-lg" />
                                        <div className="aspect-square bg-white/5 rounded-lg" />
                                        <div className="aspect-square bg-white/5 rounded-lg" />
                                    </div>

                                    {/* Text Lines */}
                                    <div className="space-y-2">
                                        <div className="h-3 bg-white/10 rounded w-3/4" />
                                        <div className="h-3 bg-white/10 rounded w-1/2" />
                                    </div>
                                </div>
                            </div>

                            {/* Floating Elements */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                                className="absolute -top-4 -right-4 glass rounded-lg px-3 py-2"
                            >
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500" />
                                    <span className="text-xs text-gray-300">En ligne</span>
                                </div>
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                                className="absolute -bottom-4 -left-4 glass rounded-lg px-4 py-3"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                                        <Heart className="w-4 h-4 text-green-400" />
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-400">Nouveau favori</div>
                                        <div className="text-sm text-white font-medium">Photo #12</div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

// Social Proof Section
function SocialProofSection() {
    const stats = [
        { value: '500+', label: 'Sites créés' },
        { value: '50K+', label: 'Photos livrées' },
        { value: '98%', label: 'Clients satisfaits' },
        { value: '4.9', label: 'Note moyenne' },
    ]

    return (
        <section className="py-20 border-y border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                        Rejoignez <span className="gradient-text">500+ photographes</span> qui ont transformé leur activité
                    </h2>
                </motion.div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="text-center"
                        >
                            <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                            <div className="text-sm text-gray-400">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Testimonial */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto"
                >
                    <div className="glass rounded-2xl p-8 text-center">
                        <div className="flex justify-center gap-1 mb-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                            ))}
                        </div>
                        <blockquote className="text-lg sm:text-xl text-gray-300 mb-6 italic">
                            "J'ai créé mon site en 8 minutes chrono. Incroyable ! Mes clients adorent les galeries privées.
                            Ça a complètement changé ma façon de livrer mes photos."
                        </blockquote>
                        <div className="flex items-center justify-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600" />
                            <div className="text-left">
                                <div className="text-white font-medium">Sophie Martin</div>
                                <div className="text-sm text-gray-400">Photographe Mariage, Paris</div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

// Features Section
function FeaturesSection() {
    const features = [
        {
            number: '1.0',
            title: 'Builder Ultra-Rapide',
            description: 'Votre site professionnel en 10 étapes simples. Pas besoin d\'être développeur.',
            icon: Layout,
            items: [
                'Personnalisez vos couleurs et logo',
                'Ajoutez vos plus belles photos',
                'Configurez vos services et tarifs',
                'Publiez en un clic',
            ],
        },
        {
            number: '2.0',
            title: 'Galeries Client Intégrées',
            description: 'Livrez vos photos comme un pro. Galeries privées, téléchargement ZIP, sélection de favoris.',
            icon: Image,
            items: [
                'Galeries protégées par code PIN',
                'Téléchargement groupé en ZIP',
                'Clients sélectionnent leurs favoris',
                'Partage par lien unique',
            ],
        },
        {
            number: '3.0',
            title: 'Présence Professionnelle',
            description: 'Un site qui vous ressemble, optimisé pour Google.',
            icon: Globe,
            items: [
                'Domaine personnalisé inclus',
                'SEO optimisé pour les recherches',
                'Responsive sur tous les appareils',
                'Multi-langue (FR/EN)',
            ],
        },
    ]

    return (
        <section id="features" className="py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                        Tout ce qu'il faut pour <span className="gradient-text">réussir en ligne</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Une suite complète d'outils conçue spécialement pour les photographes professionnels.
                    </p>
                </motion.div>

                <div className="space-y-24">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.number}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                                }`}
                        >
                            <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                                <div className="inline-flex items-center gap-2 mb-4">
                                    <span className="text-green-400 font-mono text-sm">{feature.number}</span>
                                    <div className="w-8 h-px bg-green-400/30" />
                                </div>
                                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">{feature.title}</h3>
                                <p className="text-gray-400 mb-6">{feature.description}</p>
                                <ul className="space-y-3">
                                    {feature.items.map((item, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                            <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                                                <Check className="w-3 h-3 text-green-400" />
                                            </div>
                                            <span className="text-gray-300">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                                <div className="relative">
                                    <div className="absolute inset-0 bg-green-500/10 rounded-2xl blur-xl" />
                                    <div className="relative glass-strong rounded-2xl p-6">
                                        <feature.icon className="w-12 h-12 text-green-400 mb-4" />
                                        <div className="space-y-3">
                                            {[1, 2, 3].map((i) => (
                                                <div key={i} className="h-12 bg-white/5 rounded-lg" />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

// How It Works Section
function HowItWorksSection() {
    const steps = [
        {
            number: '01',
            title: 'Créez votre site',
            description: 'Inscrivez-vous et obtenez un site professionnel instantanément. Personnalisez votre design sans aucune compétence technique.',
            icon: Layout,
        },
        {
            number: '02',
            title: 'Créez vos galeries',
            description: 'Importez vos photos en haute définition. Nous les optimisons automatiquement pour le web tout en gardant la qualité.',
            icon: Image,
        },
        {
            number: '03',
            title: 'Livrez vos clients',
            description: 'Partagez des galeries privées sécurisées. Vos clients sélectionnent leurs favoris et téléchargent leurs photos simplement.',
            icon: Share2,
        },
    ]

    return (
        <section id="how-it-works" className="py-24 bg-white/[0.02]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                        Comment ça <span className="gradient-text">marche ?</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Lancez votre activité en 3 étapes simples. Pas de compétences techniques requises.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.number}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="relative"
                        >
                            {/* Connector Line */}
                            {index < steps.length - 1 && (
                                <div className="hidden md:block absolute top-12 left-full w-full h-px bg-gradient-to-r from-green-500/30 to-transparent" />
                            )}

                            <div className="glass rounded-2xl p-8 h-full hover:border-green-500/30 transition-colors">
                                <div className="text-4xl font-bold text-green-400/30 mb-4">{step.number}</div>
                                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center mb-6">
                                    <step.icon className="w-6 h-6 text-green-400" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                                <p className="text-gray-400">{step.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <a
                        href="/pricing"
                        className="bg-green-500 hover:bg-green-600 text-black font-semibold px-6 py-3 rounded-lg inline-flex items-center gap-2 transition-colors"
                    >
                        Voir les tarifs
                        <ArrowRight className="w-5 h-5" />
                    </a>
                </motion.div>
            </div>
        </section>
    )
}

// Pricing Section
function PricingSection() {
    const [isYearly, setIsYearly] = useState(false)

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
        <section id="pricing" className="py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                        Des tarifs <span className="gradient-text">simples et transparents</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto mb-8">
                        Commencez gratuitement, upgradez quand vous êtes prêt. Pas de frais cachés.
                    </p>

                    {/* Billing Toggle commenté */}
                    {/* <div className="flex items-center justify-center gap-4">
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
                    </div> */}
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                    {plans.map((plan, index) => {
                        const colors = getColorClasses(plan.color);
                        return (
                            <motion.div
                                key={plan.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
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

// Testimonials Section
function TestimonialsSection() {
    const testimonials = [
        {
            quote: "VANDA STUDIO a transformé ma façon de travailler. Mes clients adorent les galeries privées.",
            author: "Marie L.",
            role: "Photographe Portrait",
            rating: 5,
        },
        {
            quote: "Enfin un outil simple et professionnel. J'ai gagné des heures de travail chaque semaine.",
            author: "Thomas B.",
            role: "Studio Photo",
            rating: 5,
        },
        {
            quote: "Le support est incroyable et les mises à jour régulières. Je recommande à 100% !",
            author: "Julie D.",
            role: "Photographe Mariage",
            rating: 5,
        },
    ]

    return (
        <section id="testimonials" className="py-24 bg-white/[0.02]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                        Ce que disent <span className="gradient-text">nos clients</span>
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="glass rounded-2xl p-6"
                        >
                            <div className="flex gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                            <p className="text-gray-300 mb-6">"{testimonial.quote}"</p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600" />
                                <div>
                                    <div className="text-white font-medium">{testimonial.author}</div>
                                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                                </div>
                            </div>
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
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative"
                >
                    {/* Background Glow */}
                    <div className="absolute inset-0 bg-green-500/10 rounded-3xl blur-3xl" />

                    <div className="relative glass-strong rounded-3xl p-12 text-center">
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                            Prêt à transformer <span className="gradient-text">votre activité ?</span>
                        </h2>
                        <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                            Rejoignez 500+ photographes qui ont déjà fait le pas. Essai gratuit de 30 jours,
                            sans engagement.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href={`${ADMIN_URL}/auth/register`}
                                className="bg-green-500 hover:bg-green-600 text-black font-semibold px-8 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
                            >
                                <Camera className="w-5 h-5" />
                                Créer mon site maintenant
                            </a>
                            {/*<a
                                href="/contact"
                                className="border border-white/20 text-white hover:bg-white/5 px-8 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
                            >
                                Nous contacter
                            </a> */}
                        </div>

                        <div className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-400 flex-wrap">
                            <div className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-green-400" />
                                Essai gratuit 30 jours
                            </div>
                            <div className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-green-400" />
                                Sans carte bancaire
                            </div>
                            <div className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-green-400" />
                                Annulation facile
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

// Footer
function Footer() {
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
                            <span className="font-semibold text-white">🞹 VANDA STUDIO</span>
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

// Main Landing Page Component
export default function LandingPage() {
    return (
        <div className="min-h-screen bg-background text-foreground linear-theme font-sans">
            <Navigation />

            <main>
                <HeroSection />
                <SocialProofSection />
                <FeaturesSection />
                <HowItWorksSection />
                <PricingSection />
                <TestimonialsSection />
                <CTASection />
            </main>

            <Footer />
        </div>
    )
}
