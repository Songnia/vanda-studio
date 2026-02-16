import { useState } from 'react';
import { PreviewSiteWrapper } from '@/components/PreviewSiteWrapper';
import { Eye, Download, Code, Check, Copy, ExternalLink, RefreshCw, Smartphone, Monitor, Tablet, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { SaveConfigDialog } from '@/builder/SaveConfigDialog';
import type { SiteConfig } from '@/types/builder';

interface PreviewStepProps {
  config: SiteConfig;
  onReset: () => void;
  onPrev: () => void;
}

export function PreviewStep({ config, onReset, onPrev }: PreviewStepProps) {
  const [copied, setCopied] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  const handleCopyCode = () => {
    const code = generateSiteCode(config);
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExport = () => {
    const code = generateSiteCode(config);
    const blob = new Blob([code], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${config.siteName.replace(/\s+/g, '-').toLowerCase()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getPreviewWidth = () => {
    switch (previewDevice) {
      case 'mobile': return '375px';
      case 'tablet': return '768px';
      default: return '100%';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Votre site est prêt !</h2>
        <p className="text-gray-600">Visualisez, exportez et partagez votre site</p>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap justify-center gap-3">
        <Button onClick={() => setShowSaveDialog(true)} className="bg-primary hover:bg-primary/90 gap-2">
          <Save className="w-4 h-4" />
          Sauvegarder
        </Button>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Code className="w-4 h-4" />
              Voir le code
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh]">
            <DialogHeader>
              <DialogTitle>Code source de votre site</DialogTitle>
            </DialogHeader>
            <div className="relative">
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-auto max-h-[60vh] text-sm">
                <code>{generateSiteCode(config)}</code>
              </pre>
              <Button
                size="sm"
                onClick={handleCopyCode}
                className="absolute top-2 right-2 gap-2"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copié !' : 'Copier'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Button onClick={handleExport} className="bg-green-500 hover:bg-green-600 text-black gap-2">
          <Download className="w-4 h-4" />
          Télécharger le site
        </Button>

        <Button variant="outline" onClick={onReset} className="gap-2 text-red-500 hover:text-red-600">
          <RefreshCw className="w-4 h-4" />
          Recommencer
        </Button>
      </div>

      {/* Aperçu */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-green-500" />
            <h3 className="font-semibold">Aperçu en direct</h3>
          </div>
          <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setPreviewDevice('desktop')}
              className={`p-2 rounded ${previewDevice === 'desktop' ? 'bg-white shadow-sm' : ''}`}
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPreviewDevice('tablet')}
              className={`p-2 rounded ${previewDevice === 'tablet' ? 'bg-white shadow-sm' : ''}`}
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPreviewDevice('mobile')}
              className={`p-2 rounded ${previewDevice === 'mobile' ? 'bg-white shadow-sm' : ''}`}
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          <div
            className="border rounded-lg overflow-hidden transition-all duration-300"
            style={{ width: getPreviewWidth(), maxWidth: '100%' }}
          >
            <SitePreview config={config} />
          </div>
        </div>
      </Card>

      {/* Récapitulatif */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Récapitulatif de votre site</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-green-500">{config.photos.length}</p>
            <p className="text-sm text-gray-600">Photos</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-green-500">{config.services.length}</p>
            <p className="text-sm text-gray-600">Services</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-green-500">{config.pricingPlans.length}</p>
            <p className="text-sm text-gray-600">Forfaits</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-green-500">{config.testimonials.length}</p>
            <p className="text-sm text-gray-600">Témoignages</p>
          </div>
        </div>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrev}>
          Retour
        </Button>
        <Button
          onClick={handleExport}
          className="bg-green-500 hover:bg-green-600 text-white gap-2"
        >
          <ExternalLink className="w-4 h-4" />
          Exporter mon site
        </Button>
      </div>

      <SaveConfigDialog
        open={showSaveDialog}
        onOpenChange={setShowSaveDialog}
        config={config}
      />
    </div>
  );
}

// Composant d'aperçu du site
function SitePreview({ config }: { config: SiteConfig }) {
  return <PreviewSiteWrapper config={config} />;
}

// Génère le code HTML complet du site
function generateSiteCode(config: SiteConfig): string {
  const categories = [...new Set(config.photos.map(p => p.category))];

  return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${config.siteName} - ${config.tagline}</title>
    <meta name="description" content="${config.description}">
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: '${config.primaryColor}',
                        accent: '${config.accentColor}',
                        secondary: '${config.secondaryColor}'
                    }
                }
            }
        }
    </script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        body { font-family: 'Inter', sans-serif; }
    </style>
</head>
<body class="bg-white">
    <!-- Header -->
    <header class="bg-primary text-white px-6 py-4">
        <div class="max-w-6xl mx-auto flex items-center justify-between">
            <div class="font-bold text-xl">${config.siteName}</div>
            <nav class="hidden md:flex gap-6">
                <a href="#accueil" class="hover:opacity-80 transition">Accueil</a>
                <a href="#portfolio" class="hover:opacity-80 transition">Portfolio</a>
                <a href="#services" class="hover:opacity-80 transition">Services</a>
                <a href="#tarifs" class="hover:opacity-80 transition">Tarifs</a>
                <a href="#contact" class="hover:opacity-80 transition">Contact</a>
            </nav>
        </div>
    </header>

    ${config.enabledSections.hero ? `
    <!-- Hero Section -->
    <section id="accueil" class="relative h-[500px] md:h-[600px]">
        ${config.heroImages.length > 0 ? `
        <img src="${config.heroImages[0]}" alt="Hero" class="w-full h-full object-cover">
        ` : ''}
        <div class="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center px-6">
            <h1 class="text-4xl md:text-6xl font-bold text-white mb-4">${config.tagline}</h1>
            <p class="text-white/80 max-w-2xl text-lg mb-8">${config.description}</p>
            <div class="flex gap-4">
                <a href="#portfolio" class="px-8 py-3 rounded-lg font-medium bg-accent text-primary hover:opacity-90 transition">
                    Voir le portfolio
                </a>
                <a href="#contact" class="px-8 py-3 rounded-lg font-medium border-2 border-white text-white hover:bg-white/10 transition">
                    Réserver
                </a>
            </div>
        </div>
    </section>
    ` : ''}

    ${config.enabledSections.portfolio && config.photos.length > 0 ? `
    <!-- Portfolio Section -->
    <section id="portfolio" class="py-16 px-6">
        <div class="max-w-6xl mx-auto">
            <h2 class="text-3xl font-bold text-center mb-4">Portfolio</h2>
            <p class="text-gray-600 text-center mb-8">Découvrez mes dernières réalisations</p>
            
            <div class="flex flex-wrap justify-center gap-2 mb-8">
                <button class="px-4 py-2 rounded-full text-sm bg-primary text-white">Tous</button>
                ${categories.map(cat => `
                <button class="px-4 py-2 rounded-full text-sm bg-gray-100 hover:bg-gray-200 transition">${cat}</button>
                `).join('')}
            </div>
            
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                ${config.photos.map(photo => `
                <div class="aspect-square group relative overflow-hidden rounded-lg">
                    <img src="${photo.url}" alt="${photo.category}" class="w-full h-full object-cover transition group-hover:scale-105">
                    <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-end p-4">
                        <div>
                            <p class="text-white font-medium">${photo.category}</p>
                        </div>
                    </div>
                </div>
                `).join('')}
            </div>
        </div>
    </section>
    ` : ''}

    ${config.enabledSections.services && config.services.length > 0 ? `
    <!-- Services Section -->
    <section id="services" class="py-16 px-6 bg-secondary">
        <div class="max-w-6xl mx-auto">
            <h2 class="text-3xl font-bold text-center mb-4">Nos Services</h2>
            <p class="text-gray-600 text-center mb-12">Des prestations adaptées à vos besoins</p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                ${config.services.map(service => `
                <div class="p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition">
                    <h3 class="font-bold text-xl mb-3">${service.title}</h3>
                    <p class="text-gray-600 mb-4">${service.description}</p>
                    <ul class="space-y-2">
                        ${service.features.map(feature => `
                        <li class="flex items-center gap-2 text-sm text-gray-500">
                            <span class="w-2 h-2 rounded-full bg-accent"></span>
                            ${feature}
                        </li>
                        `).join('')}
                    </ul>
                </div>
                `).join('')}
            </div>
        </div>
    </section>
    ` : ''}

    ${config.enabledSections.pricing && config.pricingPlans.length > 0 ? `
    <!-- Pricing Section -->
    <section id="tarifs" class="py-16 px-6">
        <div class="max-w-6xl mx-auto">
            <h2 class="text-3xl font-bold text-center mb-4">Nos Tarifs</h2>
            <p class="text-gray-600 text-center mb-12">Des forfaits transparents pour tous les budgets</p>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                ${config.pricingPlans.map(plan => `
                <div class="p-8 rounded-xl border-2 ${plan.recommended ? 'border-accent relative' : 'border-gray-200'}">
                    ${plan.recommended ? '<span class="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-primary text-xs font-bold px-3 py-1 rounded-full">RECOMMANDÉ</span>' : ''}
                    <h3 class="font-bold text-xl">${plan.name}</h3>
                    <p class="text-4xl font-bold my-4">${plan.price}</p>
                    <p class="text-gray-600 text-sm mb-6">${plan.description}</p>
                    <ul class="space-y-3 mb-8">
                        ${plan.features.map(feature => `
                        <li class="flex items-center gap-2 text-sm">
                            <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            ${feature}
                        </li>
                        `).join('')}
                    </ul>
                    <button class="w-full py-3 rounded-lg font-medium border-2 border-primary hover:bg-primary hover:text-white transition">
                        ${plan.recommended ? 'Choisir ce forfait' : 'Réserver'}
                    </button>
                </div>
                `).join('')}
            </div>
        </div>
    </section>
    ` : ''}

    ${config.enabledSections.testimonials && config.testimonials.length > 0 ? `
    <!-- Testimonials Section -->
    <section class="py-16 px-6 bg-secondary">
        <div class="max-w-6xl mx-auto">
            <h2 class="text-3xl font-bold text-center mb-4">Témoignages</h2>
            <p class="text-gray-600 text-center mb-12">Ce que disent nos clients</p>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                ${config.testimonials.map(testimonial => `
                <div class="p-6 bg-white rounded-xl">
                    <div class="flex gap-1 mb-4">
                        ${[...Array(testimonial.rating)].map(() => '<span class="text-green-400">★</span>').join('')}
                    </div>
                    <p class="text-gray-700 italic mb-6">"${testimonial.content}"</p>
                    <div class="flex items-center gap-3">
                        <div class="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                            ${testimonial.name.charAt(0)}
                        </div>
                        <div>
                            <p class="font-semibold">${testimonial.name}</p>
                            <p class="text-sm text-gray-500">${testimonial.role}</p>
                        </div>
                    </div>
                </div>
                `).join('')}
            </div>
        </div>
    </section>
    ` : ''}

    ${config.enabledSections.contact ? `
    <!-- Contact Section -->
    <section id="contact" class="py-16 px-6">
        <div class="max-w-6xl mx-auto">
            <h2 class="text-3xl font-bold text-center mb-4">Contact</h2>
            <p class="text-gray-600 text-center mb-12">Prêt à immortaliser vos moments ? Contactez-moi !</p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                    <h3 class="font-bold text-xl mb-6">Informations</h3>
                    <div class="space-y-4">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                </svg>
                            </div>
                            <div>
                                <p class="text-sm text-gray-500">Email</p>
                                <p class="font-medium">${config.email}</p>
                            </div>
                        </div>
                        ${config.phone ? `
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                </svg>
                            </div>
                            <div>
                                <p class="text-sm text-gray-500">Téléphone</p>
                                <p class="font-medium">${config.phone}</p>
                            </div>
                        </div>
                        ` : ''}
                        ${config.address ? `
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                            </div>
                            <div>
                                <p class="text-sm text-gray-500">Adresse</p>
                                <p class="font-medium">${[config.address, config.city, config.country].filter(Boolean).join(', ')}</p>
                            </div>
                        </div>
                        ` : ''}
                    </div>
                </div>
                
                <div>
                    <h3 class="font-bold text-xl mb-6">Envoyez un message</h3>
                    <form class="space-y-4">
                        <div class="grid grid-cols-2 gap-4">
                            <input type="text" placeholder="Nom" class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent">
                            <input type="email" placeholder="Email" class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent">
                        </div>
                        <input type="text" placeholder="Sujet" class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent">
                        <textarea placeholder="Votre message" rows="4" class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"></textarea>
                        <button type="submit" class="w-full py-3 rounded-lg font-medium bg-primary text-white hover:opacity-90 transition">
                            Envoyer
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </section>
    ` : ''}

    <!-- Footer -->
    <footer class="bg-primary text-white py-12 px-6">
        <div class="max-w-6xl mx-auto text-center">
            <p class="font-bold text-2xl mb-2">${config.siteName}</p>
            <p class="text-white/70 mb-6">${config.tagline}</p>
            <div class="flex justify-center gap-6 text-sm text-white/70 mb-8">
                <span>${config.email}</span>
                ${config.phone ? `<span>•</span><span>${config.phone}</span>` : ''}
            </div>
            ${Object.values(config.socials).some(v => v) ? `
            <div class="flex justify-center gap-4 mb-8">
                ${config.socials.instagram ? `<a href="https://instagram.com/${config.socials.instagram.replace('@', '')}" class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition">IG</a>` : ''}
                ${config.socials.facebook ? `<a href="https://facebook.com/${config.socials.facebook}" class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition">FB</a>` : ''}
            </div>
            ` : ''}
            <p class="text-white/50 text-sm">© 2024 ${config.siteName}. Tous droits réservés.</p>
        </div>
    </footer>
</body>
</html>`;
}
