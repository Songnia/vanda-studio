import { useState } from 'react';
import { Plus, X, Briefcase, Edit2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import type { SiteConfig, Service } from '@/types/builder';

interface ServicesStepProps {
  config: SiteConfig;
  onAddService: (service: Omit<Service, 'id'>) => void;
  onRemoveService: (id: string) => void;
  onUpdateService: (id: string, updates: Partial<Service>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export function ServicesStep({ 
  config, 
  onAddService, 
  onRemoveService, 
  onUpdateService,
  onNext, 
  onPrev 
}: ServicesStepProps) {
  const [services, setServices] = useState(config.services);
  const [editingService, setEditingService] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newService, setNewService] = useState({
    title: '',
    description: '',
    features: ['']
  });

  const handleAddService = () => {
    if (newService.title && newService.description) {
      const serviceData = {
        title: newService.title,
        description: newService.description,
        features: newService.features.filter(f => f.trim() !== '')
      };
      onAddService(serviceData);
      setServices(prev => [...prev, { id: Date.now().toString(), ...serviceData }]);
      setNewService({ title: '', description: '', features: [''] });
      setDialogOpen(false);
    }
  };

  const handleRemoveService = (id: string) => {
    onRemoveService(id);
    setServices(prev => prev.filter(s => s.id !== id));
  };

  const handleUpdateService = (id: string, updates: Partial<Service>) => {
    onUpdateService(id, updates);
    setServices(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const addFeature = () => {
    setNewService(prev => ({ ...prev, features: [...prev.features, ''] }));
  };

  const updateFeature = (index: number, value: string) => {
    setNewService(prev => ({
      ...prev,
      features: prev.features.map((f, i) => i === index ? value : f)
    }));
  };

  const removeFeature = (index: number) => {
    setNewService(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Vos Services</h2>
        <p className="text-gray-600">Décrivez les prestations que vous proposez</p>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-yellow-500" />
            <h3 className="font-semibold">Services ({services.length})</h3>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
                <Plus className="w-4 h-4 mr-2" />
                Ajouter un service
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Nouveau service</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                {/* Titre */}
                <div className="space-y-2">
                  <Label htmlFor="serviceTitle">Nom du service *</Label>
                  <Input
                    id="serviceTitle"
                    value={newService.title}
                    onChange={(e) => setNewService(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Ex: Shooting Portrait"
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="serviceDescription">Description *</Label>
                  <Textarea
                    id="serviceDescription"
                    value={newService.description}
                    onChange={(e) => setNewService(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Décrivez ce service..."
                    rows={3}
                  />
                </div>

                {/* Features */}
                <div className="space-y-2">
                  <Label>Inclus dans ce service</Label>
                  {newService.features.map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={feature}
                        onChange={(e) => updateFeature(index, e.target.value)}
                        placeholder={`Élément ${index + 1}`}
                      />
                      {newService.features.length > 1 && (
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => removeFeature(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button variant="outline" onClick={addFeature} className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter un élément
                  </Button>
                </div>

                <Button 
                  onClick={handleAddService}
                  disabled={!newService.title || !newService.description}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
                >
                  Ajouter le service
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {services.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
            <Briefcase className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 font-medium">Aucun service défini</p>
            <p className="text-sm text-gray-400">Ajoutez vos prestations pour les afficher sur votre site</p>
          </div>
        ) : (
          <div className="space-y-4">
            {services.map((service, index) => (
              <Card key={service.id} className="p-4">
                {editingService === service.id ? (
                  <EditServiceForm 
                    service={service}
                    onSave={(updates) => {
                      handleUpdateService(service.id, updates);
                      setEditingService(null);
                    }}
                    onCancel={() => setEditingService(null)}
                  />
                ) : (
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-yellow-100 flex items-center justify-center">
                      <span className="text-sm font-bold text-yellow-600">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg">{service.title}</h4>
                      <p className="text-gray-600 text-sm mt-1">{service.description}</p>
                      {service.features.length > 0 && (
                        <ul className="mt-3 space-y-1">
                          {service.features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-gray-500">
                              <Check className="w-3 h-3 text-green-500" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => setEditingService(service.id)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => handleRemoveService(service.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrev}>
          Retour
        </Button>
        <Button 
          onClick={onNext}
          className="bg-yellow-500 hover:bg-yellow-600 text-black"
        >
          Continuer
        </Button>
      </div>
    </div>
  );
}

// Composant pour éditer un service
function EditServiceForm({ 
  service, 
  onSave, 
  onCancel 
}: { 
  service: { title: string; description: string; features: string[] };
  onSave: (updates: typeof service) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState(service);

  const addFeature = () => {
    setFormData(prev => ({ ...prev, features: [...prev.features, ''] }));
  };

  const updateFeature = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map((f, i) => i === index ? value : f)
    }));
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Nom du service</Label>
        <Input
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
        />
      </div>
      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          rows={2}
        />
      </div>
      <div className="space-y-2">
        <Label>Éléments inclus</Label>
        {formData.features.map((feature, index) => (
          <div key={index} className="flex gap-2">
            <Input
              value={feature}
              onChange={(e) => updateFeature(index, e.target.value)}
            />
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => removeFeature(index)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ))}
        <Button variant="outline" onClick={addFeature} size="sm">
          <Plus className="w-3 h-3 mr-1" />
          Ajouter
        </Button>
      </div>
      <div className="flex gap-2">
        <Button onClick={() => onSave(formData)} className="flex-1 bg-green-500 hover:bg-green-600 text-white">
          <Check className="w-4 h-4 mr-2" />
          Enregistrer
        </Button>
        <Button variant="outline" onClick={onCancel}>
          Annuler
        </Button>
      </div>
    </div>
  );
}
