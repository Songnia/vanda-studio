import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    ArrowLeft,
    Search,
    Copy,
    Store,
    LogOut,
    User,
    HelpCircle,
    Globe,
    ChevronDown,
    CreditCard
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { authService } from '../../services/authService';
import { siteConfigService } from '../../services/siteConfigService';

export function AdminNavbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState<any>(null);
    const [breadcrumbs, setBreadcrumbs] = useState<string[]>([]);
    const [slug, setSlug] = useState<string>('');

    useEffect(() => {
        const currentUser = authService.getCurrentUser();
        setUser(currentUser);

        const fetchConfig = async () => {
            try {
                const configs = await siteConfigService.getMyConfigs();
                if (configs && configs.length > 0) {
                    // Use the first config found
                    setSlug(configs[0].slug);
                }
            } catch (error) {
                console.error("Failed to fetch site config", error);
            }
        };

        fetchConfig();
    }, []);

    useEffect(() => {
        const path = location.pathname;
        if (path === '/admin' || path === '/admin/') {
            setBreadcrumbs(['Admin', 'Tableau de bord']);
        } else {
            const parts = path.split('/').filter(p => p && p !== 'admin');
            const formattedParts = parts.map(p => {
                return p.charAt(0).toUpperCase() + p.slice(1).replace(/-/g, ' ');
            });
            setBreadcrumbs(['Admin', ...formattedParts]);
        }
    }, [location]);

    const handleLogout = () => {
        authService.logout();
        navigate('/login');
    };

    const copyLink = () => {
        if (!slug) return;
        const url = `${window.location.origin}/${slug}`;
        navigator.clipboard.writeText(url);
        // You might want to add a toast here
        alert('Lien copié: ' + url);
    };

    const visitSite = () => {
        if (!slug) return;
        window.open(`/${slug}`, '_blank');
    };

    return (
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sticky top-0 z-50">
            {/* LEFT: Breadcrumbs & Back */}
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    {/* Placeholder Logo */}
                    <div className="font-bold text-xl tracking-tight flex items-center gap-1">
                        <span className="text-green-500">🞹</span>
                        <span>VANDA</span>
                    </div>
                    <span className="bg-gray-100 text-xs px-2 py-0.5 rounded-full text-gray-600 font-medium">
                        Studio
                    </span>
                </div>

                <div className="flex items-center gap-1 text-sm">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="gap-2 text-gray-600 hover:text-gray-900 hidden md:flex"
                        onClick={() => navigate(-1)}
                    >
                        <ArrowLeft className="w-4 h-4" />
                    </Button>
                    {breadcrumbs.map((crumb, index) => (
                        <div key={index} className="flex items-center">
                            <span className="flex items-center">
                                {crumb}
                            </span>
                            {index < breadcrumbs.length - 1 && (
                                <span className="text-slate-300 mx-2">/</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* CENTER: Search Bar */}
            <div className="flex-1 max-w-xl mx-4 hidden md:block">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                        placeholder="Trouvez n'importe quoi..."
                        className="pl-9 bg-gray-100 border-none rounded-full h-10 focus-visible:ring-1 focus-visible:ring-green-400"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                        <span className="flex items-center justify-center min-w-[20px] h-5 bg-white rounded border border-gray-200 text-[10px] text-gray-500 font-medium px-1">
                            ⌘K
                        </span>
                    </div>
                </div>
            </div>

            {/* RIGHT: Actions & Profile */}
            <div className="flex items-center gap-2">
                {slug && (
                    <Button
                        variant="ghost"
                        className="gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full hidden lg:flex"
                        onClick={visitSite}
                    >
                        <Store className="w-4 h-4" />
                        <span>Visiter mon site</span>
                    </Button>
                )}

                {slug && (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-500 hover:bg-gray-100 rounded-full"
                        onClick={copyLink}
                        title="Copier le lien"
                    >
                        <Copy className="w-4 h-4" />
                    </Button>
                )}

                <div className="h-6 w-px bg-gray-200 mx-1"></div>

                {/* Profile Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full w-9 h-9 p-0 overflow-hidden border border-gray-200">
                            <Avatar className="w-full h-full">
                                <AvatarImage src={user?.avatar} />
                                <AvatarFallback className="bg-gray-100 text-gray-600 font-medium">
                                    {user?.name?.charAt(0) || 'U'}
                                </AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-64 p-2">
                        <div className="flex items-center gap-3 p-2 mb-2">
                            <Avatar className="w-10 h-10 border border-gray-100">
                                <AvatarFallback className="bg-gray-100 text-gray-600">
                                    {user?.name?.charAt(0) || 'U'}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 overflow-hidden">
                                <p className="font-semibold text-sm truncate">{user?.name || 'Utilisateur'}</p>
                                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                            </div>
                        </div>

                        <DropdownMenuSeparator />

                        <div className="px-2 py-1.5 flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                                <Globe className="w-4 h-4 text-gray-500" />
                                <span>Français</span>
                            </div>
                            <ChevronDown className="w-3 h-3 text-gray-400" />
                        </div>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                            className="gap-2 cursor-pointer"
                            onClick={() => navigate('/pricing')}
                        >
                            <CreditCard className="w-4 h-4" />
                            <span>Mon abonnement</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 cursor-pointer">
                            <User className="w-4 h-4" />
                            <span>Mon Profil</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 cursor-pointer">
                            <HelpCircle className="w-4 h-4" />
                            <span>Centre d'aide</span>
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                            className="gap-2 text-red-600 focus:text-red-700 focus:bg-red-50 cursor-pointer"
                            onClick={handleLogout}
                        >
                            <LogOut className="w-4 h-4" />
                            <span>Se déconnecter</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
