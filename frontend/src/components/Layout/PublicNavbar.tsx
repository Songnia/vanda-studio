import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { X, Menu } from 'lucide-react'

export default function PublicNavbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const ADMIN_URL = import.meta.env.VITE_ADMIN_URL || 'https://app.vanda-studio.org';

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
                        <a href="/#features" className="text-sm text-gray-400 hover:text-white transition-colors">Fonctionnalités</a>
                        <a href="/#how-it-works" className="text-sm text-gray-400 hover:text-white transition-colors">Comment ça marche</a>
                        <a href="/pricing" className="text-sm text-white font-medium transition-colors">Tarifs</a>
                        <a href="/#testimonials" className="text-sm text-gray-400 hover:text-white transition-colors">Témoignages</a>
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
                            <a href="/#features" className="text-gray-400 hover:text-white transition-colors">Fonctionnalités</a>
                            <a href="/#how-it-works" className="text-gray-400 hover:text-white transition-colors">Comment ça marche</a>
                            <a href="/pricing" className="text-white font-medium transition-colors">Tarifs</a>
                            <a href="/#testimonials" className="text-gray-400 hover:text-white transition-colors">Témoignages</a>
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
