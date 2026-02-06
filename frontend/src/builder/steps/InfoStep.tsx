import { useState } from 'react';
import { Building2, Mail, Phone, MapPin, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import type { SiteConfig } from '@/types/builder';

interface InfoStepProps {
  config: SiteConfig;
  onUpdate: (updates: Partial<SiteConfig>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export function InfoStep({ config, onUpdate, onNext, onPrev }: InfoStepProps) {
  const [formData, setFormData] = useState({
    siteName: config.siteName,
    tagline: config.tagline,
    description: config.description,
    logo: config.logo || '',
    useStudioNameAsLogo: config.useStudioNameAsLogo || false,
    email: config.email,
    phone: config.phone,
    address: config.address,
    city: config.city,
    country: config.country
  });

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, logo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    onUpdate(formData);
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Informations de votre studio</h2>
        <p className="text-gray-600">Ces informations apparaîtront sur votre site</p>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          {/* Nom du studio */}
          <div className="space-y-2">
            <Label htmlFor="siteName" className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Nom du studio *
            </Label>
            <Input
              id="siteName"
              value={formData.siteName}
              onChange={(e) => handleChange('siteName', e.target.value)}
              placeholder="Ex: Studio Lumière"
            />
          </div>

          {/* Logo */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="useStudioName"
                checked={formData.useStudioNameAsLogo}
                onCheckedChange={(checked) => handleChange('useStudioNameAsLogo', checked === true)}
              />
              <label
                htmlFor="useStudioName"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Utiliser le nom de votre studio comme logo
              </label>
            </div>

            {!formData.useStudioNameAsLogo && (
              <div className="space-y-4 pl-6 border-l-2 border-gray-100">
                <Label htmlFor="logo" className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  Logo du studio
                </Label>

                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <Input
                      id="logo"
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="cursor-pointer"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Formats acceptés : JPG, PNG, WEBP. Max 2Mo conseillé.
                    </p>
                  </div>

                  {formData.logo && (
                    <div className="w-16 h-16 border rounded overflow-hidden bg-gray-50 flex items-center justify-center relative group">
                      <img
                        src={formData.logo}
                        alt="Logo Preview"
                        className="w-full h-full object-contain"
                      />
                      <button
                        onClick={() => handleChange('logo', '')}
                        className="absolute inset-0 bg-black/50 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center text-xs transition-opacity"
                      >
                        Supprimer
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Tagline */}
          <div className="space-y-2">
            <Label htmlFor="tagline">Slogan / Phrase d'accroche</Label>
            <Input
              id="tagline"
              value={formData.tagline}
              onChange={(e) => handleChange('tagline', e.target.value)}
              placeholder="Ex: Capturer vos moments précieux"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description courte</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Décrivez votre activité en quelques phrases..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Email */}
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

            {/* Téléphone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Téléphone
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="+33 6 00 00 00 00"
              />
            </div>
          </div>

          {/* Adresse */}
          <div className="space-y-2">
            <Label htmlFor="address" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Adresse
            </Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => handleChange('address', e.target.value)}
              placeholder="123 Rue de la Photo"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Ville */}
            <div className="space-y-2">
              <Label htmlFor="city">Ville</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => handleChange('city', e.target.value)}
                placeholder="Paris"
              />
            </div>

            {/* Pays */}
            <div className="space-y-2">
              <Label htmlFor="country">Pays</Label>
              <Input
                id="country"
                value={formData.country}
                onChange={(e) => handleChange('country', e.target.value)}
                placeholder="France"
              />
            </div>
          </div>
        </div>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrev}>
          Retour
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!formData.siteName || !formData.email}
          className="bg-yellow-500 hover:bg-yellow-600 text-black"
        >
          Continuer
        </Button>
      </div>
    </div>
  );
}
