import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { AdminNavbar } from './AdminNavbar';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'; // Assuming Sheet is available per file list
import { Button } from '@/components/ui/button';

const AdminLayout: React.FC = () => {
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    return (
        <div className="flex flex-col h-screen bg-slate-50">
            {/* Top Navigation Bar */}
            <AdminNavbar />

            <div className="flex flex-1 overflow-hidden">
                {/* Desktop Sidebar */}
                <Sidebar showLogo={false} className="hidden md:flex w-64 border-r border-slate-200 bg-white" />

                {/* Mobile Sidebar (Sheet) */}
                <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="md:hidden fixed top-20 left-3 z-50 bg-white/80 backdrop-blur-sm border shadow-sm">
                            <Menu className="w-5 h-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 border-r w-64 z-[60]">
                        <Sidebar />
                    </SheetContent>
                </Sheet>

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                    {/* We keep AdminHeader for page-specific actions/titles if needed, 
                        or we can integrate it better. For now, let's keep it but 
                        it might look redundant with the new Navbar. 
                        Let's render it for functionality preservation. */}
                    {/* Scrollable Content */}
                    <main className="flex-1 overflow-y-auto p-6 scroll-smooth">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
