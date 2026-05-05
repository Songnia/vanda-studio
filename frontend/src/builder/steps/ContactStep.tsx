import { useState } from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, Youtube, Globe, Link2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { SaveButton } from '@/builder/components/SaveButton';
import type { SiteConfig } from '@/types/builder';

interface ContactStepProps {
  config: SiteConfig;
  onUpdate: (updates: Partial<SiteConfig>) => void;
  onNext: () => void;
  onPrev: () => void;
  onSave: (updates?: Partial<SiteConfig>) => Promise<boolean>;
  isSaving: boolean;
}

export function ContactStep({ config, onUpdate, onNext, onPrev, onSave, isSaving }: ContactStepProps) {
  const [isDirty, setIsDirty] = useState(false);
  const [formData, setFormData] = useState({
    email: config.email,
    phone: config.phone,
    address: config.address,
    city: config.city,
    country: config.country,
    socials: config.socials
  });


  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setIsDirty(true);
  };

  const handleSocialChange = (platform: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      socials: {
        ...prev.socials,
        [platform]: value
      }
    }));
    setIsDirty(true);
  };

  const handleSubmit = () => {
    onUpdate(formData);
    onNext();
  };

  const handleSave = async () => {
    onUpdate(formData);
    if (typeof onSave === 'function') {
      const ok = await onSave(formData);
      if (ok) setIsDirty(false);
      return ok;
    }
    return false;
  };

  const socialInputs = [
    { key: 'instagram', label: 'Instagram', icon: Instagram, placeholder: '@votre_compte' },
    { key: 'facebook', label: 'Facebook', icon: Facebook, placeholder: 'votre.page' },
    { key: 'twitter', label: 'Twitter / X', icon: Twitter, placeholder: '@votre_compte' },
    { key: 'youtube', label: 'YouTube', icon: Youtube, placeholder: 'votre_chaine' },
    { key: 'website', label: 'Site web', icon: Globe, placeholder: 'www.votresite.com' }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Informations de Contact</h2>
        <p className="text-gray-600">Configurez comment vos clients peuvent vous joindre</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Coordonnées */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Mail className="w-5 h-5 text-green-500" />
            <h3 className="font-semibold">Coordonnées</h3>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="contact@monstudio.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Téléphone
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="+237 6 00 00 00 00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Adresse
              </Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                placeholder="Ex: Rue de la Joie"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">Ville</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleChange('city', e.target.value)}
                  placeholder="Douala"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Pays</Label>
                <Input
                  id="country"
                  value={formData.country}
                  onChange={(e) => handleChange('country', e.target.value)}
                  placeholder="Cameroun"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Réseaux sociaux */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Link2 className="w-5 h-5 text-green-500" />
            <h3 className="font-semibold">Réseaux sociaux</h3>
          </div>

          <div className="space-y-4">
            {socialInputs.map(({ key, label, icon: Icon, placeholder }) => (
              <div key={key} className="space-y-2">
                <Label htmlFor={key} className="flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  {label}
                </Label>
                <Input
                  id={key}
                  value={formData.socials[key as keyof typeof formData.socials] || ''}
                  onChange={(e) => handleSocialChange(key, e.target.value)}
                  placeholder={placeholder}
                />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Options d'affichage *
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Options de la page contact</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">Formulaire de contact</p>
              <p className="text-sm text-gray-500">Afficher un formulaire pour recevoir des messages</p>
            </div>
            <Switch checked={showForm} onCheckedChange={setShowForm} />
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">Carte Google Maps</p>
              <p className="text-sm text-gray-500">Afficher votre localisation sur une carte</p>
            </div>
            <Switch checked={showMap} onCheckedChange={setShowMap} />
          </div>
        </div>
      </Card>/}

      {/* Aperçu */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Aperçu</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="font-medium text-gray-700">Contactez-nous</h4>
            {formData.email && (
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-green-500" />
                <span>{formData.email}</span>
              </div>
            )}
            {formData.phone && (
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-green-500" />
                <span>{formData.phone}</span>
              </div>
            )}
            {(formData.address || formData.city) && (
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-green-500" />
                <span>
                  {[formData.address, formData.city, formData.country].filter(Boolean).join(', ')}
                </span>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-gray-700">Suivez-nous</h4>
            <div className="flex gap-3">
              {formData.socials.instagram && (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white">
                  <Instagram className="w-5 h-5" />
                </div>
              )}
              {formData.socials.facebook && (
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
                  <Facebook className="w-5 h-5" />
                </div>
              )}
              {formData.socials.twitter && (
                <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white">
                  <Twitter className="w-5 h-5" />
                </div>
              )}
              {formData.socials.youtube && (
                <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white">
                  <Youtube className="w-5 h-5" />
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>

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
            disabled={!formData.email}
            className="bg-green-500 hover:bg-green-600 text-black h-11 sm:h-10 w-full sm:w-auto font-bold"
          >
            Continuer
          </Button>
        </div>
      </div>
    </div>
  );
}
