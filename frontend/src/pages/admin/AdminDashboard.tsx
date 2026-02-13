import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import { galleryService } from '../../services/galleryService';
import type { Gallery } from '../../types/gallery';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Trash2, Share2, Search, Star, Plus, Youtube, Users, MessageSquare, MessageCircle, Heart, Globe } from 'lucide-react';
import { Input } from "@/components/ui/input";
import ShareDialog from '../../components/Delivery/ShareDialog';
import { usePlanLimits } from '@/hooks/usePlanLimits';
import { UpgradeDialog } from '@/components/common/UpgradeDialog';

const AdminDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [galleries, setGalleries] = useState<Gallery[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [shareDialogOpen, setShareDialogOpen] = useState(false);
    const [shareUuid, setShareUuid] = useState('');
    const [user, setUser] = useState<any>(null);

    // Plan limits
    const { checkLimit, limits, currentPlan } = usePlanLimits();
    const [upgradeDialogOpen, setUpgradeDialogOpen] = useState(false);
    const [upgradeFeature, setUpgradeFeature] = useState<'photos' | 'galleries' | 'domain' | 'branding'>('galleries');

    useEffect(() => {
        setUser(authService.getCurrentUser());
        loadGalleries();
    }, []);

    const loadGalleries = async () => {
        try {
            const allGalleries = await galleryService.getAllGalleries();
            setGalleries(allGalleries);
        } catch (error) {
            console.error("Failed to load galleries", error);
        }
    };

    const handleDelete = async (uuid: string) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cette galerie ?')) {
            await galleryService.deleteGallery(uuid);
            loadGalleries();
        }
    };

    const handleView = (uuid: string) => {
        navigate(`/admin/gallery/${uuid}`);
    };

    const handleShare = (uuid: string) => {
        setShareUuid(uuid);
        setShareDialogOpen(true);
    };

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Bonjour";
        if (hour < 18) return "Bon après-midi";
        return "Bonsoir";
    };

    // Filter logic
    const filteredGalleries = galleries.filter(g =>
        g.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (g.createdAt && g.createdAt.includes(searchTerm))
    );

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            {/* Upgrade Banner 
            <div className="bg-[#FFFAF0] rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between relative overflow-hidden border border-yellow-100 shadow-sm transition-all hover:shadow-md">
                <div className="z-10 relative space-y-4 max-w-xl">
                    <div className="text-yellow-600 font-bold tracking-wide text-xs uppercase">UPGRADE PRO</div>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 font-serif">Passez au niveau supérieur.</h2>
                    <p className="text-slate-600 text-lg">
                        Débloquez toutes les fonctionnalités premium : Stockage illimité, noms de domaine personnalisés et bien plus encore.
                    </p>
                    <Button className="bg-[#4caf50] text-white hover:bg-[#45a049] font-bold rounded-full px-8 h-12 text-base transition-all transform hover:scale-105">
                        Passer Pro <span className="ml-2">&gt;</span>
                    </Button>
                </div>

                <div className="hidden md:block relative">
                    <div className="absolute -right-20 -top-40 w-80 h-80 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
                    <div className="absolute -right-10 top-10 w-60 h-60 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>

                    <div className="relative w-72 h-44 bg-white rounded-2xl shadow-xl border border-slate-100 p-6 rotate-3 transform transition-transform hover:rotate-0 duration-500">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                                    <Star className="w-5 h-5 text-yellow-600 fill-yellow-600" />
                                </div>
                                <span className="font-bold text-slate-900">Pro Plan</span>
                            </div>
                            <span className="text-xs font-mono text-slate-400">2026</span>
                        </div>
                        <div className="space-y-2">
                            <div className="h-2 bg-slate-100 rounded-full w-3/4"></div>
                            <div className="h-2 bg-slate-100 rounded-full w-1/2"></div>
                        </div>
                        <div className="mt-8 text-2xl font-bold text-slate-900">
                            ILLIMITÉ
                        </div>
                    </div>
                </div>
            </div>*/}

            {/* Greeting Section */}
            <div className="py-2">
                <h1 className="text-3xl font-serif text-slate-900">
                    {getGreeting()} {user?.name?.split(' ')[0]} ! 🌤️
                </h1>
                <p className="text-slate-500 mt-2 flex items-center gap-2">
                    <span className="text-lg">🎉</span>
                    La journée est bien partie. Que diriez-vous d'une nouvelle promotion ?
                </p>
            </div>

            {/* Quick Actions & Toolbar */}
            <div className="flex flex-wrap items-center gap-8 mb-4">
                <Button
                    className="bg-[#4caf50] text-white hover:bg-[#45a049] gap-2 rounded-full px-6 font-medium shadow-sm transition-transform hover:scale-105"
                    onClick={() => {
                        // Check gallery limit before navigation
                        if (checkLimit('galleries', galleries.length)) {
                            setUpgradeFeature('galleries');
                            setUpgradeDialogOpen(true);
                        } else {
                            navigate('/admin/new-delivery');
                        }
                    }}
                >
                    <div className="p-1 bg-black/10 rounded-full">
                        <Plus className="w-3 h-3" />
                    </div>
                    Ajouter une livraison
                </Button>

                {/* <Button
                    variant="outline"
                    className="gap-2 rounded-full px-6 font-medium shadow-sm transition-transform hover:scale-105 border-blue-200 text-blue-600 hover:bg-blue-50"
                    onClick={() => {
                        // Check if custom domain is allowed
                        if (!limits.canCustomDomain) {
                            setUpgradeFeature('domain');
                            setUpgradeDialogOpen(true);
                        } else {
                            // TODO: Navigate to domain settings
                            alert('Paramètres de domaine à implémenter');
                        }
                    }}
                >
                    <Globe className="w-4 h-4" />
                    Connecter mon domaine
                </Button> */}

                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                        placeholder="Rechercher une livraison..."
                        className="pl-10 bg-white rounded-full border-slate-200 focus-visible:ring-green-400"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                {/*<div className="flex gap-2 ml-auto">
                    <Button variant="outline" size="sm" className="rounded-full">Filtres</Button>
                    <Button variant="outline" size="sm" className="rounded-full">Exporter</Button>
                </div> */}
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-slate-50 hover:bg-slate-50">
                            <TableHead className="w-[300px]">Client / Titre</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Photos</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Likes</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredGalleries.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center h-32 text-slate-500">
                                    Aucune livraison trouvée.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredGalleries.map((gallery) => (
                                <TableRow key={gallery.uuid} className="group">
                                    <TableCell className="font-medium">
                                        <div className="flex flex-col">
                                            <span className="text-slate-900">{gallery.title}</span>
                                            {/* <span className="text-xs text-slate-500">mariage@exemple.com</span> if we had email */}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {new Date(gallery.createdAt).toLocaleDateString('fr-FR', {
                                            day: '2-digit', month: '2-digit', year: 'numeric'
                                        })}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="secondary" className="font-normal">
                                            {gallery.images.length} photos
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {/* Mock Status based on logic */}
                                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none shadow-none">
                                            Livré
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1.5">
                                            <Heart className="w-4 h-4 text-green-500 fill-green-500" />
                                            <span className="font-medium text-slate-700">
                                                {gallery.images.filter(img => img.isLiked).length}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-500 hover:text-slate-900" onClick={() => handleView(gallery.uuid)}>
                                                <Eye className="w-4 h-4" />
                                            </Button>
                                            <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-500 hover:text-blue-600" onClick={() => handleShare(gallery.uuid)}>
                                                <Share2 className="w-4 h-4" />
                                            </Button>
                                            <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-500 hover:text-red-600" onClick={() => handleDelete(gallery.uuid)}>
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Resources Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8">
                {/* Youtube Card */}
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center text-center space-y-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                        <Youtube className="w-6 h-6 text-slate-900" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-slate-900">Rejoignez-nous sur Youtube</h3>
                        <p className="text-slate-500 text-sm max-w-xs mx-auto mt-2">Découvrez des vidéos pratiques pour apprendre à utiliser Ultimate</p>
                    </div>
                    <Button className="bg-black text-white hover:bg-slate-800 rounded-full px-8">
                        Accéder maintenant
                    </Button>
                </div>

                {/* Hub Card */}
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center text-center space-y-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-slate-900" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-slate-900">Rejoignez notre Hub</h3>
                        <p className="text-slate-500 text-sm max-w-xs mx-auto mt-2">Rejoignez la communauté d'entraide des créateurs Ultimate</p>
                    </div>
                    <Button className="bg-[#4caf50] text-white hover:bg-[#45a049] rounded-full px-8 font-medium">
                        Rejoindre maintenant
                    </Button>
                </div>

                {/* Suggestions */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                    <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0">
                        <MessageSquare className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900">Partagez vos suggestions</h4>
                        <p className="text-slate-500 text-xs">Vos suggestions nous aident à améliorer Ultimate</p>
                    </div>
                </div>

                {/* WhatsApp */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                    <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0">
                        <MessageCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900">Rejoignez-nous sur WhatsApp</h4>
                        <p className="text-slate-500 text-xs">Rejoignez notre canal WhatsApp</p>
                    </div>
                </div>
            </div>

            <ShareDialog
                open={shareDialogOpen}
                onClose={() => setShareDialogOpen(false)}
                uuid={shareUuid}
            />

            {/* Upgrade Dialog */}
            <UpgradeDialog
                open={upgradeDialogOpen}
                onClose={() => setUpgradeDialogOpen(false)}
                feature={upgradeFeature}
                currentPlan={currentPlan}
            />
        </div>
    );
};

export default AdminDashboard;
