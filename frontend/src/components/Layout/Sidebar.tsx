import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Package,
    Palette,
    LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { authService } from '../../services/authService';

const navItems = [
    {
        path: '/admin/dashboard',
        label: 'Tableau de bord',
        icon: LayoutDashboard
    },
    {
        path: '/admin/dashboard', // Mapping to dashboard as Livraisons for now
        label: 'Livraisons',
        icon: Package,
    },
    {
        path: '/admin/site-builder',
        label: 'Mon Site',
        icon: Palette,
    },
];

interface SidebarProps {
    className?: string;
    showLogo?: boolean;
}

export function Sidebar({ className, showLogo = true }: SidebarProps) {
    return (
        <div className={cn("flex flex-col h-full bg-slate-50 border-r border-slate-200", className)}>
            {/* Logo */}
            {showLogo && (
                <div className="h-16 flex items-center px-6 border-b border-slate-200">
                    <span className="font-bold text-xl tracking-tight">ULTIMATE STUDIO</span>
                </div>
            )}

            {/* Navigation */}
            <nav className="flex-1 py-6 px-3 space-y-1">
                {navItems.map((item, index) => (
                    <NavLink
                        key={index}
                        to={item.path}
                        className={({ isActive }) => cn(
                            "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                            "text-slate-600 hover:bg-white hover:text-slate-900 border-l-4 border-transparent",
                            isActive && "bg-white text-slate-900 shadow-sm border-l-[#f2f20d]"
                        )}
                    >
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium text-sm">{item.label}</span>
                    </NavLink>
                ))}
            </nav>
        </div>
    );
}
