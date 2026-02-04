import { useState, useRef } from 'react';
import { Upload, Image, X, Plus, Folder, Grid3X3, LayoutGrid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import type { SiteConfig, Photo } from '@/types/builder';

interface PortfolioStepProps {
  config: SiteConfig;
  onAddPhoto: (photo: { url: string; title: string; category: string }) => void;
  onRemovePhoto: (id: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

const defaultCategories = [
  "Mariages",
  "Portraits",
  "Grossesse",
  "Bébés & Enfants",
  "Corporate",
  "Événements",
  "Mode",
  "Produit",
  "Nature",
  "Architecture"
];

export function PortfolioStep({ config, onAddPhoto, onRemovePhoto, onNext, onPrev }: PortfolioStepProps) {
  const [photos, setPhotos] = useState<Photo[]>(config.photos);
  const [newCategory, setNewCategory] = useState('');
  const [categories, setCategories] = useState<string[]>([...defaultCategories]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [newPhoto, setNewPhoto] = useState({ url: '', title: '', category: '' });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setNewPhoto(prev => ({ ...prev, url: event.target!.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddPhoto = () => {
    if (newPhoto.url && newPhoto.title) {
      onAddPhoto({
        url: newPhoto.url,
        title: newPhoto.title,
        category: newPhoto.category || 'Autre'
      });
      setPhotos(prev => [...prev, {
        id: Date.now().toString(),
        url: newPhoto.url,
        title: newPhoto.title,
        category: newPhoto.category || 'Autre'
      }]);
      setNewPhoto({ url: '', title: '', category: '' });
      setUploadDialogOpen(false);
    }
  };

  const handleRemovePhoto = (id: string) => {
    onRemovePhoto(id);
    setPhotos(prev => prev.filter(p => p.id !== id));
  };

  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories(prev => [...prev, newCategory]);
      setNewCategory('');
    }
  };

  const filteredPhotos = selectedCategory 
    ? photos.filter(p => p.category === selectedCategory)
    : photos;

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Votre Portfolio</h2>
        <p className="text-gray-600">Ajoutez vos photos et organisez-les par catégories</p>
      </div>

      {/* Catégories */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Folder className="w-4 h-4 text-yellow-500" />
          <Label>Catégories</Label>
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          <button
            onClick={() => setSelectedCategory('')}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              selectedCategory === '' 
                ? 'bg-yellow-500 text-black' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Toutes ({photos.length})
          </button>
          {categories.map(cat => {
            const count = photos.filter(p => p.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat === selectedCategory ? '' : cat)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedCategory === cat 
                    ? 'bg-yellow-500 text-black' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat} {count > 0 && `(${count})`}
              </button>
            );
          })}
        </div>
        <div className="flex gap-2">
          <Input
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Nouvelle catégorie..."
            className="flex-1"
          />
          <Button variant="outline" onClick={handleAddCategory} disabled={!newCategory}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </Card>

      {/* Photos */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <LayoutGrid className="w-5 h-5 text-yellow-500" />
            <h3 className="font-semibold">Photos ({filteredPhotos.length})</h3>
          </div>
          <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
                <Upload className="w-4 h-4 mr-2" />
                Ajouter une photo
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Ajouter une photo</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                {/* Upload */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                
                {!newPhoto.url ? (
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-yellow-500 transition-colors"
                  >
                    <Image className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                    <p className="text-gray-600 font-medium">Cliquez pour sélectionner une image</p>
                  </div>
                ) : (
                  <div className="relative aspect-video">
                    <img
                      src={newPhoto.url}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      onClick={() => setNewPhoto(prev => ({ ...prev, url: '' }))}
                      className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}

                {/* Titre */}
                <div className="space-y-2">
                  <Label htmlFor="photoTitle">Titre de la photo *</Label>
                  <Input
                    id="photoTitle"
                    value={newPhoto.title}
                    onChange={(e) => setNewPhoto(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Ex: Portrait en studio"
                  />
                </div>

                {/* Catégorie */}
                <div className="space-y-2">
                  <Label htmlFor="photoCategory">Catégorie</Label>
                  <select
                    id="photoCategory"
                    value={newPhoto.category}
                    onChange={(e) => setNewPhoto(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="">Sélectionner une catégorie</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <Button 
                  onClick={handleAddPhoto}
                  disabled={!newPhoto.url || !newPhoto.title}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
                >
                  Ajouter au portfolio
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {filteredPhotos.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
            <Grid3X3 className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 font-medium">Aucune photo dans cette catégorie</p>
            <p className="text-sm text-gray-400">Ajoutez vos premières photos pour les voir ici</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredPhotos.map((photo) => (
              <div key={photo.id} className="group relative aspect-square">
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-white font-medium text-sm truncate">{photo.title}</p>
                    <p className="text-white/70 text-xs">{photo.category}</p>
                  </div>
                  <button
                    onClick={() => handleRemovePhoto(photo.id)}
                    className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              </div>
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
