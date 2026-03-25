# Prompt pour Claude - Intégration Landing Page Vanda Studio

## Contexte
Je dois remplacer l'ancienne landing page de Vanda Studio par une nouvelle version inspirée de Linear.app. Le projet utilise React + TypeScript + Tailwind CSS.

## Structure actuelle
```
page/
├── LandingPage.tsx      ← REMPLACER
├── PricingPage.tsx      ← CRÉER (n'existe pas, renvoie 404)
├── login.tsx            ← CONSERVER (ne pas toucher)
└── signup.tsx           ← CONSERVER (ne pas toucher)
```

## Instructions

### 1. Installer la dépendance
```bash
npm install framer-motion
```

### 2. Mettre à jour src/index.css
REMPLACER tout le contenu par :
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 4%;
    --foreground: 0 0% 98%;
    --card: 0 0% 6%;
    --card-foreground: 0 0% 98%;
    --popover: 0 0% 6%;
    --popover-foreground: 0 0% 98%;
    --primary: 142 71% 45%;
    --primary-foreground: 0 0% 4%;
    --secondary: 0 0% 10%;
    --secondary-foreground: 0 0% 98%;
    --muted: 0 0% 12%;
    --muted-foreground: 0 0% 60%;
    --accent: 142 71% 45%;
    --accent-foreground: 0 0% 4%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 15%;
    --input: 0 0% 15%;
    --ring: 142 71% 45%;
    --radius: 0.625rem;
  }
}

@layer base {
  * { @apply border-border; }
  html { scroll-behavior: smooth; }
  body { @apply bg-background text-foreground antialiased; }
}

.glass {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.glass-strong {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.gradient-text {
  background: linear-gradient(135deg, #4ade80 0%, #22c55e 50%, #16a34a 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.glow-green {
  box-shadow: 0 0 40px rgba(74, 222, 128, 0.15);
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}
```

### 3. Créer page/LandingPage.tsx
Créer le fichier avec ce composant complet (voir ci-dessous)

### 4. Créer page/PricingPage.tsx  
Créer le fichier avec ce composant complet (voir ci-dessous)

### 5. Vérifier le routing
S'assurer que ces routes existent :
- `/` → LandingPage
- `/pricing` → PricingPage
- `/auth/login` → login existant
- `/auth/register` → signup existant

## Code LandingPage.tsx complet

```tsx
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Camera, Layout, Image, Share2, Check, ArrowRight, Star, Heart, Globe, Sparkles, Menu, X } from 'lucide-react'

function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-strong' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
              <Camera className="w-4 h-4 text-black" />
            </div>
            <span className="font-semibold text-white group-hover:text-green-400 transition-colors">VANDA STUDIO</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-gray-400 hover:text-white transition-colors">Fonctionnalités</a>
            <a href="#how-it-works" className="text-sm text-gray-400 hover:text-white transition-colors">Comment ça marche</a>
            <a href="#pricing" className="text-sm text-gray-400 hover:text-white transition-colors">Tarifs</a>
            <a href="#testimonials" className="text-sm text-gray-400 hover:text-white transition-colors">Témoignages</a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a href="/auth/login" className="text-sm text-gray-400 hover:text-white transition-colors">Connexion</a>
            <a href="/auth/register" className="bg-green-500 hover:bg-green-600 text-black font-medium px-4 py-2 rounded-lg transition-colors">Créer mon site</a>
          </div>

          <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="md:hidden glass-strong rounded-xl mt-2 p-4">
            <div className="flex flex-col gap-4">
              <a href="#features" className="text-gray-400 hover:text-white transition-colors">Fonctionnalités</a>
              <a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors">Comment ça marche</a>
              <a href="#pricing" className="text-gray-400 hover:text-white transition-colors">Tarifs</a>
              <a href="#testimonials" className="text-gray-400 hover:text-white transition-colors">Témoignages</a>
              <hr className="border-white/10" />
              <a href="/auth/login" className="text-gray-400 hover:text-white transition-colors">Connexion</a>
              <a href="/auth/register" className="bg-green-500 hover:bg-green-600 text-black font-medium px-4 py-2 rounded-lg text-center transition-colors">Créer mon site</a>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(74,222,128,0.08),transparent_50%)]" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }}>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-6">
              <Sparkles className="w-4 h-4 text-green-400" />
              <span className="text-sm text-gray-300">Essai gratuit 14 jours • Sans carte bancaire</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Créez votre site de <span className="gradient-text">photographe professionnel</span> en 10 minutes
            </h1>

            <p className="text-lg text-gray-400 mb-8 max-w-xl">
              Sans code, sans stress. De la création à la livraison de galeries, VANDA STUDIO gère tout pour vous.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/auth/register" className="bg-green-500 hover:bg-green-600 text-black font-semibold px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors">
                <Camera className="w-5 h-5" />
                Créer mon site gratuitement
              </a>
              <button className="border border-white/20 text-white hover:bg-white/5 px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors">
                <Layout className="w-5 h-5" />
                Voir une démo
              </button>
            </div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-10 flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 border-2 border-black" />
                ))}
              </div>
              <div className="text-sm text-gray-400"><span className="text-white font-semibold">500+</span> photographes nous font confiance</div>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }} className="relative">
            <div className="relative animate-float">
              <div className="absolute inset-0 bg-green-500/20 rounded-2xl blur-2xl" />
              <div className="relative glass-strong rounded-2xl p-6 glow-green">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="bg-black/30 rounded-md px-3 py-1 text-xs text-gray-500 text-center">monstudio.vandastudio.com</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-32 bg-gradient-to-br from-green-500/20 to-green-600/10 rounded-xl flex items-center justify-center">
                    <Camera className="w-12 h-12 text-green-400" />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {[1, 2, 3].map((i) => <div key={i} className="aspect-square bg-white/5 rounded-lg" />)}
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-white/10 rounded w-3/4" />
                    <div className="h-3 bg-white/10 rounded w-1/2" />
                  </div>
                </div>
              </div>
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} className="absolute -top-4 -right-4 glass rounded-lg px-3 py-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-xs text-gray-300">En ligne</span>
                </div>
              </motion.div>
              <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }} className="absolute -bottom-4 -left-4 glass rounded-lg px-4 py-3">
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
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Rejoignez <span className="gradient-text">500+ photographes</span> qui ont transformé leur activité</h2>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto">
          <div className="glass rounded-2xl p-8 text-center">
            <div className="flex justify-center gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
            </div>
            <blockquote className="text-lg sm:text-xl text-gray-300 mb-6 italic">"J'ai créé mon site en 8 minutes chrono. Incroyable ! Mes clients adorent les galeries privées. Ça a complètement changé ma façon de livrer mes photos."</blockquote>
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

function FeaturesSection() {
  const features = [
    {
      number: '1.0',
      title: 'Builder Ultra-Rapide',
      description: 'Votre site professionnel en 10 étapes simples. Pas besoin d\'être développeur.',
      icon: Layout,
      items: ['Personnalisez vos couleurs et logo', 'Ajoutez vos plus belles photos', 'Configurez vos services et tarifs', 'Publiez en un clic'],
    },
    {
      number: '2.0',
      title: 'Galeries Client Intégrées',
      description: 'Livrez vos photos comme un pro. Galeries privées, téléchargement ZIP, sélection de favoris.',
      icon: Image,
      items: ['Galeries protégées par code PIN', 'Téléchargement groupé en ZIP', 'Clients sélectionnent leurs favoris', 'Partage par lien unique'],
    },
    {
      number: '3.0',
      title: 'Présence Professionnelle',
      description: 'Un site qui vous ressemble, optimisé pour Google.',
      icon: Globe,
      items: ['Domaine personnalisé inclus', 'SEO optimisé pour les recherches', 'Responsive sur tous les appareils', 'Multi-langue (FR/EN)'],
    },
  ]

  return (
    <section id="features" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Tout ce qu'il faut pour <span className="gradient-text">réussir en ligne</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Une suite complète d'outils conçue spécialement pour les photographes professionnels.</p>
        </motion.div>
        <div className="space-y-24">
          {features.map((feature, index) => (
            <motion.div key={feature.number} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
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
                      {[1, 2, 3].map((i) => <div key={i} className="h-12 bg-white/5 rounded-lg" />)}
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

function HowItWorksSection() {
  const steps = [
    { number: '01', title: 'Créez votre site', description: 'Inscrivez-vous et obtenez un site professionnel instantanément. Personnalisez votre design sans aucune compétence technique.', icon: Layout },
    { number: '02', title: 'Créez vos galeries', description: 'Importez vos photos en haute définition. Nous les optimisons automatiquement pour le web tout en gardant la qualité.', icon: Image },
    { number: '03', title: 'Livrez vos clients', description: 'Partagez des galeries privées sécurisées. Vos clients sélectionnent leurs favoris et téléchargent leurs photos simplement.', icon: Share2 },
  ]

  return (
    <section id="how-it-works" className="py-24 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Comment ça <span className="gradient-text">marche ?</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Lancez votre activité en 3 étapes simples. Pas de compétences techniques requises.</p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div key={step.number} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.2 }} className="relative">
              {index < steps.length - 1 && <div className="hidden md:block absolute top-12 left-full w-full h-px bg-gradient-to-r from-green-500/30 to-transparent" />}
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
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mt-12">
          <a href="/pricing" className="bg-green-500 hover:bg-green-600 text-black font-semibold px-6 py-3 rounded-lg inline-flex items-center gap-2 transition-colors">Voir les tarifs <ArrowRight className="w-5 h-5" /></a>
        </motion.div>
      </div>
    </section>
  )
}

function PricingSection() {
  const [isYearly, setIsYearly] = useState(true)

  const plans = [
    {
      name: 'Starter',
      description: 'Parfait pour débuter',
      price: { monthly: 0, yearly: 0 },
      features: ['Site Builder complet', '5 pages max', '20 photos portfolio', '2 galeries/mois', '500 MB stockage', 'Sous-domaine .vandastudio.com', 'Support email (48h)'],
      cta: 'Commencer gratuitement',
      popular: false,
    },
    {
      name: 'Pro',
      description: 'Pour photographes actifs',
      price: { monthly: 29, yearly: 24 },
      features: ['Tout du plan Starter', 'Pages illimitées', '500 photos portfolio', '20 galeries/mois', '50 GB stockage', 'Domaine personnalisé', 'Sans watermark', 'Analytics basiques', 'Support prioritaire (12h)'],
      cta: 'Passer à Pro',
      popular: true,
    },
    {
      name: 'Studio',
      description: 'Pour studios établis',
      price: { monthly: 79, yearly: 66 },
      features: ['Tout du plan Pro', 'Galeries illimitées', '500 GB stockage', '3 comptes utilisateurs', 'White label complet', 'Support chat + téléphone', 'Analytics avancés', 'API access', 'Backup automatique'],
      cta: 'Devenir Studio',
      popular: false,
    },
  ]

  return (
    <section id="pricing" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Des tarifs <span className="gradient-text">simples et transparents</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">Commencez gratuitement, upgradez quand vous êtes prêt. Pas de frais cachés.</p>
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm ${!isYearly ? 'text-white' : 'text-gray-400'}`}>Mensuel</span>
            <button onClick={() => setIsYearly(!isYearly)} className={`relative w-14 h-7 rounded-full transition-colors ${isYearly ? 'bg-green-500' : 'bg-gray-700'}`}>
              <span className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-transform ${isYearly ? 'translate-x-8' : 'translate-x-1'}`} />
            </button>
            <span className={`text-sm ${isYearly ? 'text-white' : 'text-gray-400'}`}>Annuel <span className="ml-2 px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">-17%</span></span>
          </div>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div key={plan.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className={`relative rounded-2xl p-8 ${plan.popular ? 'glass-strong border-green-500/30 glow-green' : 'glass border-white/5'}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-green-500 text-black text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1"><Star className="w-3 h-3 fill-black" />PLUS POPULAIRE</span>
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-sm text-gray-400">{plan.description}</p>
              </div>
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">{plan.price.monthly === 0 ? 'Gratuit' : `€${isYearly ? plan.price.yearly : plan.price.monthly}`}</span>
                  {plan.price.monthly > 0 && <span className="text-gray-400">/mois</span>}
                </div>
                {plan.price.monthly > 0 && isYearly && <div className="text-sm text-gray-500 mt-1">€{plan.price.yearly * 12}/an facturé annuellement</div>}
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <a href="/auth/register" className={`block w-full text-center py-3 rounded-lg font-medium transition-colors ${plan.popular ? 'bg-green-500 hover:bg-green-600 text-black' : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'}`}>{plan.cta}</a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialsSection() {
  const testimonials = [
    { quote: "VANDA STUDIO a transformé ma façon de travailler. Mes clients adorent les galeries privées.", author: "Marie L.", role: "Photographe Portrait", rating: 5 },
    { quote: "Enfin un outil simple et professionnel. J'ai gagné des heures de travail chaque semaine.", author: "Thomas B.", role: "Studio Photo", rating: 5 },
    { quote: "Le support est incroyable et les mises à jour régulières. Je recommande à 100% !", author: "Julie D.", role: "Photographe Mariage", rating: 5 },
  ]

  return (
    <section id="testimonials" className="py-24 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ce que disent <span className="gradient-text">nos clients</span></h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="glass rounded-2xl p-6">
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
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

function CTASection() {
  return (
    <section className="py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative">
          <div className="absolute inset-0 bg-green-500/10 rounded-3xl blur-3xl" />
          <div className="relative glass-strong rounded-3xl p-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Prêt à transformer <span className="gradient-text">votre activité ?</span></h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">Rejoignez 500+ photographes qui ont déjà fait le pas. Essai gratuit de 14 jours, sans engagement.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/auth/register" className="bg-green-500 hover:bg-green-600 text-black font-semibold px-8 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"><Camera className="w-5 h-5" />Créer mon site maintenant</a>
              <a href="/contact" className="border border-white/20 text-white hover:bg-white/5 px-8 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors">Nous contacter</a>
            </div>
            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-400 flex-wrap">
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-green-400" />Essai gratuit 14 jours</div>
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-green-400" />Sans carte bancaire</div>
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-green-400" />Annulation facile</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Footer() {
  const links = {
    Product: [{ label: 'Fonctionnalités', href: '#features' }, { label: 'Tarifs', href: '#pricing' }, { label: 'Démo', href: '#' }, { label: 'Changelog', href: '#' }],
    Resources: [{ label: 'Centre d\'aide', href: '#' }, { label: 'Documentation', href: '#' }, { label: 'Blog', href: '#' }, { label: 'Roadmap', href: '#' }],
    Company: [{ label: 'À propos', href: '#' }, { label: 'Carrières', href: '#' }, { label: 'Contact', href: '#' }, { label: 'Presse', href: '#' }],
    Legal: [{ label: 'Confidentialité', href: '#' }, { label: 'Conditions', href: '#' }, { label: 'CGV', href: '#' }, { label: 'Mentions légales', href: '#' }],
  }

  return (
    <footer className="py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2">
            <a href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center"><Camera className="w-4 h-4 text-black" /></div>
              <span className="font-semibold text-white">VANDA STUDIO</span>
            </a>
            <p className="text-gray-400 text-sm mb-4 max-w-xs">La plateforme tout-en-un pour créer votre site de photographe professionnel et livrer vos galeries clients.</p>
            <div className="flex gap-4">
              {['twitter', 'instagram', 'linkedin', 'youtube'].map((social) => (
                <a key={social} href="#" className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"><Globe className="w-4 h-4 text-gray-400" /></a>
              ))}
            </div>
          </div>
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-white font-medium mb-4">{category}</h4>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.label}><a href={item.href} className="text-sm text-gray-400 hover:text-white transition-colors">{item.label}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">© 2026 VANDA STUDIO. Tous droits réservés.</p>
          <p className="text-sm text-gray-500">Fait avec ❤️ pour les photographes</p>
        </div>
      </div>
    </footer>
  )
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
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
```

## Code PricingPage.tsx complet

```tsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Star, Camera, ArrowRight } from 'lucide-react'

function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center"><Camera className="w-4 h-4 text-black" /></div>
            <span className="font-semibold text-white group-hover:text-green-400 transition-colors">VANDA STUDIO</span>
          </a>
          <div className="flex items-center gap-4">
            <a href="/auth/login" className="text-sm text-gray-400 hover:text-white transition-colors">Connexion</a>
            <a href="/auth/register" className="bg-green-500 hover:bg-green-600 text-black font-medium px-4 py-2 rounded-lg transition-colors">Créer mon site</a>
          </div>
        </div>
      </div>
    </nav>
  )
}

function PricingHero() {
  return (
    <section className="pt-32 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl sm:text-5xl font-bold text-white mb-6">Des tarifs <span className="gradient-text">simples et transparents</span></motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-lg text-gray-400">Commencez gratuitement, upgradez quand vous êtes prêt. Pas de frais cachés, annulation à tout moment.</motion.p>
      </div>
    </section>
  )
}

function PricingCards() {
  const [isYearly, setIsYearly] = useState(true)

  const plans = [
    { name: 'Starter', description: 'Parfait pour débuter', price: { monthly: 0, yearly: 0 }, features: ['Site Builder complet', '5 pages max', '20 photos portfolio', '2 galeries/mois', '500 MB stockage', 'Sous-domaine .vandastudio.com', 'Support email (48h)'], cta: 'Commencer gratuitement', popular: false },
    { name: 'Pro', description: 'Pour photographes actifs', price: { monthly: 29, yearly: 24 }, features: ['Tout du plan Starter', 'Pages illimitées', '500 photos portfolio', '20 galeries/mois', '50 GB stockage', 'Domaine personnalisé', 'Sans watermark', 'Analytics basiques', 'Support prioritaire (12h)'], cta: 'Passer à Pro', popular: true },
    { name: 'Studio', description: 'Pour studios établis', price: { monthly: 79, yearly: 66 }, features: ['Tout du plan Pro', 'Galeries illimitées', '500 GB stockage', '3 comptes utilisateurs', 'White label complet', 'Support chat + téléphone', 'Analytics avancés', 'API access', 'Backup automatique'], cta: 'Devenir Studio', popular: false },
  ]

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className={`text-sm ${!isYearly ? 'text-white' : 'text-gray-400'}`}>Mensuel</span>
          <button onClick={() => setIsYearly(!isYearly)} className={`relative w-14 h-7 rounded-full transition-colors ${isYearly ? 'bg-green-500' : 'bg-gray-700'}`}>
            <span className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-transform ${isYearly ? 'translate-x-8' : 'translate-x-1'}`} />
          </button>
          <span className={`text-sm ${isYearly ? 'text-white' : 'text-gray-400'}`}>Annuel <span className="ml-2 px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">-17%</span></span>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div key={plan.name} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className={`relative rounded-2xl p-8 ${plan.popular ? 'glass-strong border-green-500/30 glow-green' : 'glass border-white/5'}`}>
              {plan.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2"><span className="bg-green-500 text-black text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1"><Star className="w-3 h-3 fill-black" />PLUS POPULAIRE</span></div>}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-sm text-gray-400">{plan.description}</p>
              </div>
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">{plan.price.monthly === 0 ? 'Gratuit' : `€${isYearly ? plan.price.yearly : plan.price.monthly}`}</span>
                  {plan.price.monthly > 0 && <span className="text-gray-400">/mois</span>}
                </div>
                {plan.price.monthly > 0 && isYearly && <div className="text-sm text-gray-500 mt-1">€{plan.price.yearly * 12}/an facturé annuellement</div>}
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3"><Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" /><span className="text-sm text-gray-300">{feature}</span></li>
                ))}
              </ul>
              <a href="/auth/register" className={`block w-full text-center py-3 rounded-lg font-medium transition-colors ${plan.popular ? 'bg-green-500 hover:bg-green-600 text-black' : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'}`}>{plan.cta}</a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ComparisonTable() {
  const features = [
    { name: 'Pages', starter: '5', pro: 'Illimité', studio: 'Illimité' },
    { name: 'Photos portfolio', starter: '20', pro: '500', studio: 'Illimité' },
    { name: 'Galeries/mois', starter: '2', pro: '20', studio: 'Illimité' },
    { name: 'Stockage', starter: '500 MB', pro: '50 GB', studio: '500 GB' },
    { name: 'Domaine personnalisé', starter: false, pro: true, studio: true },
    { name: 'Sans watermark', starter: false, pro: true, studio: true },
    { name: 'Multi-utilisateurs', starter: false, pro: false, studio: '3 comptes' },
    { name: 'White label', starter: false, pro: false, studio: true },
    { name: 'Support', starter: 'Email 48h', pro: 'Email 12h', studio: 'Chat + Tél' },
    { name: 'Analytics', starter: false, pro: 'Basique', studio: 'Avancé' },
    { name: 'API', starter: false, pro: false, studio: true },
  ]

  return (
    <section className="py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">Comparaison des fonctionnalités</h2>
        <div className="glass rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-gray-400 font-medium">Fonctionnalité</th>
                <th className="text-center p-4 text-white font-medium">Starter</th>
                <th className="text-center p-4 text-green-400 font-medium">Pro</th>
                <th className="text-center p-4 text-white font-medium">Studio</th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr key={index} className="border-b border-white/5 last:border-0">
                  <td className="p-4 text-gray-300">{feature.name}</td>
                  <td className="p-4 text-center">{typeof feature.starter === 'boolean' ? feature.starter ? <Check className="w-5 h-5 text-green-400 mx-auto" /> : <span className="text-gray-600">—</span> : <span className="text-gray-300">{feature.starter}</span>}</td>
                  <td className="p-4 text-center bg-green-500/5">{typeof feature.pro === 'boolean' ? feature.pro ? <Check className="w-5 h-5 text-green-400 mx-auto" /> : <span className="text-gray-600">—</span> : <span className="text-gray-300">{feature.pro}</span>}</td>
                  <td className="p-4 text-center">{typeof feature.studio === 'boolean' ? feature.studio ? <Check className="w-5 h-5 text-green-400 mx-auto" /> : <span className="text-gray-600">—</span> : <span className="text-gray-300">{feature.studio}</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

function FAQSection() {
  const faqs = [
    { q: "Puis-je changer de plan plus tard ?", a: "Oui, vous pouvez upgrade ou downgrade à tout moment. Pas d'engagement." },
    { q: "Que se passe-t-il si j'annule ?", a: "Vos données sont exportables. Pas de prise en otage." },
    { q: "Le domaine personnalisé est-il inclus ?", a: "Le sous-domaine est gratuit. Votre propre domaine (.com) est inclus dans PRO et Studio." },
    { q: "Puis-je vendre mes photos via le site ?", a: "Pas encore, mais c'est sur notre roadmap !" },
  ]

  return (
    <section className="py-24 bg-white/[0.02]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">Questions fréquentes</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="glass rounded-xl p-6">
              <h3 className="text-white font-medium mb-2">{faq.q}</h3>
              <p className="text-gray-400">{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section className="py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative glass-strong rounded-3xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Prêt à commencer ?</h2>
          <p className="text-gray-400 mb-8">Essai gratuit de 14 jours. Sans carte bancaire.</p>
          <a href="/auth/register" className="bg-green-500 hover:bg-green-600 text-black font-semibold px-8 py-3 rounded-lg inline-flex items-center gap-2 transition-colors">Créer mon site gratuitement <ArrowRight className="w-5 h-5" /></a>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center"><Camera className="w-4 h-4 text-black" /></div>
            <span className="font-semibold text-white">VANDA STUDIO</span>
          </a>
          <p className="text-sm text-gray-500">© 2026 VANDA STUDIO. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navigation />
      <PricingHero />
      <PricingCards />
      <ComparisonTable />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  )
}
```

## Vérifications finales

1. Vérifier que `lucide-react` est installé : `npm list lucide-react`
2. Vérifier le build : `npm run build`
3. Vérifier les routes dans votre router
4. Tester toutes les fonctionnalités interactives (toggle, mobile menu, ancres)
