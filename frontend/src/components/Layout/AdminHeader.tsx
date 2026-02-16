import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button'; // Assuming button exists
import { Plus, Check, Eye } from 'lucide-react';

export function AdminHeader() {
    const location = useLocation();
    const navigate = useNavigate();
    const path = location.pathname;

    let title = "Tableau de bord";
    let breadcrumb = ["Admin"];
    let actions: React.ReactNode = null;

    if (path === '/admin/dashboard') {
        title = "Livraisons";
        breadcrumb = ["Admin", "Livraisons"];
        actions = (
            <Button
                size="sm"
                className="bg-[#4caf50] text-black hover:bg-[#d9d90b] gap-2"
                onClick={() => navigate('/admin/new-delivery')}
            >
                <Plus className="w-4 h-4" />
                Nouvelle livraison
            </Button>
        );
    } else if (path === '/admin/site-builder') {
        title = "Personnaliser mon site";
        breadcrumb = ["Admin", "Mon Site"];
        actions = (
            <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                    <Eye className="w-4 h-4" />
                    Aperçu
                </Button>
                <Button size="sm" className="bg-[#4caf50] text-black hover:bg-[#d9d90b] gap-2">
                    <Check className="w-4 h-4" />
                    Publier
                </Button>
            </div>
        );
    } else if (path.startsWith('/admin/gallery/')) {
        title = "Gestion Galerie";
        breadcrumb = ["Admin", "Livraisons", "Détail"];
    }

    return (
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-10">
            <div>
                <nav className="text-sm text-slate-500 mb-1">
                    {breadcrumb.join(" / ")}
                </nav>
                <h1 className="text-xl font-semibold text-slate-900">{title}</h1>
            </div>
            <div>
                {actions}
            </div>
        </header>
    );
}
