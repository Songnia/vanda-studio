import { useState, useRef } from 'react';
import { Upload, Image, X, Type, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { SaveButton } from '@/builder/components/SaveButton';
import type { SiteConfig } from '@/types/builder';

interface HeroStepProps {
  config: SiteConfig;
  onUpdate: (updates: Partial<SiteConfig>) => void;
  onNext: () => void;
  onPrev: () => void;
  onSave: (updates?: Partial<SiteConfig>) => Promise<boolean>;
  isSaving: boolean;
}

export function HeroStep({ config, onUpdate, onNext, onPrev, onSave, isSaving }: HeroStepProps) {
  const [isDirty, setIsDirty] = useState(false);
  const [heroImages, setHeroImages] = useState<string[]>(config.heroImages);
  const [tagline, setTagline] = useState(config.tagline);
  const [description, setDescription] = useState(config.description);
  const [showCTA, setShowCTA] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const flashInfoFileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            setHeroImages(prev => [...prev, event.target!.result as string]);
            setIsDirty(true);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleFlashInfoImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onUpdate({
            flashInfo: { ...config.flashInfo, backgroundImage: event.target!.result as string }
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index: number) => {
    setHeroImages(prev => prev.filter((_, i) => i !== index));
    setIsDirty(true);
  };

  const handleSubmit = () => {
    onUpdate({
      heroImages,
      tagline,
      description
    });
    onNext();
  };

  const handleSave = async () => {
    const updates = { heroImages, tagline, description };
    onUpdate(updates);
    if (typeof onSave === 'function') {
      const ok = await onSave(updates);
      if (ok) setIsDirty(false);
      return ok;
    }
    return false;
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Bannière principale</h2>
        <p className="text-gray-600">Configurez l'accueil de votre site</p>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          {/* Tagline */}
          <div className="space-y-2">
            <Label htmlFor="tagline" className="flex items-center gap-2">
              <Type className="w-4 h-4" />
              Titre principal
            </Label>
            <Input
              id="tagline"
              value={tagline}
              onChange={(e) => { setTagline(e.target.value); setIsDirty(true); }}
              placeholder="Ex: Capturer vos moments précieux"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="heroDescription">Sous-titre / Description</Label>
            <Textarea
              id="heroDescription"
              value={description}
              onChange={(e) => { setDescription(e.target.value); setIsDirty(true); }}
              placeholder="Décrivez votre activité..."
              rows={2}
            />
          </div>

          {/* Images du hero */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Image className="w-4 h-4" />
              Images de la bannière
            </Label>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileUpload}
              className="hidden"
            />

            {heroImages.length === 0 ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-green-500 transition-colors"
              >
                <Upload className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                <p className="text-gray-600 font-medium">Cliquez pour ajouter des images</p>
                <p className="text-sm text-gray-500 mt-1">ou glissez-déposez vos photos ici</p>
                <p className="text-xs text-gray-400 mt-2">PNG, JPG jusqu'à 10MB</p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {heroImages.map((image, index) => (
                    <div key={index} className="relative group aspect-video">
                      <img
                        src={image}
                        alt={`Hero ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="aspect-video border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-green-500 transition-colors"
                  >
                    <Upload className="w-8 h-8 text-gray-400" />
                    <span className="text-sm text-gray-500 mt-1">Ajouter</span>
                  </button>
                </div>
                <p className="text-sm text-gray-500">
                  {heroImages.length} image{heroImages.length > 1 ? 's' : ''} • Les images défilent automatiquement
                </p>
              </div>
            )}
          </div>

          {/* Options CTA */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-green-500" />
              <div>
                <p className="font-medium">Boutons d'action</p>
                <p className="text-sm text-gray-500">Afficher "Voir le portfolio" et "Réserver"</p>
              </div>
            </div>
            <Switch checked={showCTA} onCheckedChange={setShowCTA} />
          </div>

          {/* Flash Info Configuration */}
          <Card className="p-4 border-green-200 bg-green-50/30">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-green-600" />
                  <h3 className="font-bold text-gray-900">Bandeau "Flash Info"</h3>
                </div>
                <Switch
                  checked={config.flashInfo.enabled}
                  onCheckedChange={(checked) => onUpdate({
                    flashInfo: { ...config.flashInfo, enabled: checked }
                  })}
                />
              </div>

              {config.flashInfo.enabled && (
                <div className="space-y-4 pt-2 border-t border-green-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Titre de l'offre</Label>
                      <Input
                        value={config.flashInfo.title}
                        onChange={(e) => onUpdate({
                          flashInfo: { ...config.flashInfo, title: e.target.value }
                        })}
                        placeholder="Ex: Offre Spéciale"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Texte du bouton</Label>
                      <Input
                        value={config.flashInfo.buttonText}
                        onChange={(e) => onUpdate({
                          flashInfo: { ...config.flashInfo, buttonText: e.target.value }
                        })}
                        placeholder="Ex: En profiter"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Sous-titre / Description de l'offre</Label>
                    <Input
                      value={config.flashInfo.subtitle}
                      onChange={(e) => onUpdate({
                        flashInfo: { ...config.flashInfo, subtitle: e.target.value }
                      })}
                      placeholder="Ex: -20% sur votre séance ce mois-ci !"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Image className="w-4 h-4" />
                      Image de fond du bandeau
                    </Label>
                    <input
                      ref={flashInfoFileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFlashInfoImageUpload}
                      className="hidden"
                    />

                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                      <div className="w-full flex-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => flashInfoFileInputRef.current?.click()}
                          className="w-full border-dashed border-green-300 hover:border-green-400 bg-white"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          {config.flashInfo.backgroundImage ? 'Changer l\'image' : 'Sélectionner une image'}
                        </Button>
                      </div>

                      {config.flashInfo.backgroundImage && (
                        <div className="relative group w-24 h-12 border border-green-200 rounded overflow-hidden shadow-sm flex-shrink-0">
                          <img
                            src={config.flashInfo.backgroundImage}
                            alt="Aperçu Bandeau"
                            className="w-full h-full object-cover"
                          />
                          <button
                            onClick={() => onUpdate({ flashInfo: { ...config.flashInfo, backgroundImage: '' } })}
                            className="absolute inset-0 bg-black/40 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Message WhatsApp pré-rempli</Label>
                    <Textarea
                      value={config.flashInfo.whatsappMessage}
                      onChange={(e) => onUpdate({
                        flashInfo: { ...config.flashInfo, whatsappMessage: e.target.value }
                      })}
                      placeholder="Le message qui sera envoyé quand le client clique sur le bouton..."
                      rows={2}
                    />
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </Card>


      {/* Aperçu */}
      {heroImages.length > 0 && (
        <Card className="p-4">
          <Label className="mb-3 block">Aperçu de la bannière</Label>
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <img
              src={heroImages[0]}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-6">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {tagline || 'Votre titre'}
              </h3>
              <p className="text-white/80 mb-4 max-w-lg">
                {description || 'Votre description'}
              </p>
              {showCTA && (
                <div className="flex gap-3">
                  <button
                    className="px-4 py-2 rounded-lg font-medium"
                    style={{ backgroundColor: config.accentColor, color: config.primaryColor }}
                  >
                    Voir le portfolio
                  </button>
                  <button className="px-4 py-2 rounded-lg font-medium border-2 border-white text-white">
                    Réserver
                  </button>
                </div>
              )}
            </div>
          </div>
        </Card>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 pt-6 border-t border-gray-100">
        <Button 
          variant="outline" 
          onClick={onPrev}
          className="w-full sm:w-auto h-11 sm:h-10 order-2 sm:order-1"
        >
          Retour
        </Button>
        <div className="flex flex-col sm:flex-row gap-3 order-1 sm:order-2">
          <SaveButton onSave={handleSave} isSaving={isSaving} isDirty={isDirty} className="w-full sm:w-auto h-11 sm:h-10" />
          <Button
            onClick={handleSubmit}
            className="bg-green-500 hover:bg-green-600 text-black h-11 sm:h-10 w-full sm:w-auto font-bold"
          >
            Continuer
          </Button>
        </div>
      </div>
    </div>
  );
}
