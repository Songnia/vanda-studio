import React, { useState } from 'react';
import type { InvoiceData, StudioInfo } from '@/types/invoice';

interface HeaderFormProps {
    invoice: InvoiceData;
    onUpdateMetadata: (field: keyof InvoiceData, value: any) => void;
    onUpdateClient: (field: any, value: string) => void;
    onUpdateStudio: (field: keyof StudioInfo, value: string) => void;
}

const MOCK_CLIENTS = [
    { name: 'Alice Martin', email: 'alice@example.com', phone: '+33 6 12 34 56 78' },
    { name: 'Julien Durand', email: 'julien@photos.fr', phone: '+33 6 98 76 54 32' },
];

const InvoiceHeaderForm: React.FC<HeaderFormProps> = ({ invoice, onUpdateMetadata, onUpdateClient, onUpdateStudio }) => {
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [search, setSearch] = useState(invoice.client.name);

    const handleSelectClient = (client: typeof MOCK_CLIENTS[0]) => {
        onUpdateClient('name', client.name);
        onUpdateClient('email', client.email);
        onUpdateClient('phone', client.phone);
        setSearch(client.name);
        setShowSuggestions(false);
    };

    const filteredClients = MOCK_CLIENTS.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase())
    );

    const inputClasses = "w-full bg-white border border-black px-4 py-2.5 outline-none focus:ring-1 focus:ring-green-500 transition-all text-slate-800 rounded-lg text-sm";

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Colonne 1 : Informations Facture */}
            <div className="flex flex-col gap-5">
                <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-widest mb-1">DÉTAILS FACTURE</h3>
                <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase mb-1.5 block">N° Facture</label>
                    <input
                        type="text"
                        value={invoice.number || ''}
                        onChange={(e) => onUpdateMetadata('number', e.target.value)}
                        className={`${inputClasses} font-mono font-bold`}
                    />
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase mb-1.5 block">Date</label>
                        <input
                            type="date"
                            value={invoice.issueDate || ''}
                            onChange={(e) => onUpdateMetadata('issueDate', e.target.value)}
                            className={inputClasses}
                        />
                    </div>
                    <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase mb-1.5 block">Échéance</label>
                        <input
                            type="date"
                            value={invoice.dueDate || ''}
                            onChange={(e) => onUpdateMetadata('dueDate', e.target.value)}
                            className={inputClasses}
                        />
                    </div>
                </div>
            </div>

            {/* Colonne 2 : Prestataire (Studio) */}
            <div className="flex flex-col gap-5">
                <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-widest mb-1">PRESTATAIRE (VOUS)</h3>
                <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase mb-1.5 block">Nom du Studio</label>
                    <input
                        type="text"
                        value={invoice.studio.photographerName || ''}
                        onChange={(e) => onUpdateStudio('photographerName', e.target.value)}
                        className={`${inputClasses} font-bold`}
                    />
                </div>
                <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase mb-1.5 block">Email & Contact</label>
                    <input
                        type="email"
                        value={invoice.studio.email || ''}
                        onChange={(e) => onUpdateStudio('email', e.target.value)}
                        className={inputClasses}
                        placeholder="email@studio.com"
                    />
                </div>
                <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase mb-1.5 block">Téléphone</label>
                    <input
                        type="tel"
                        value={invoice.studio.phone || ''}
                        onChange={(e) => onUpdateStudio('phone', e.target.value)}
                        className={inputClasses}
                    />
                </div>
            </div>

            {/* Colonne 3 : Client */}
            <div className="flex flex-col gap-5">
                <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-widest mb-1">CLIENT</h3>
                <div className="relative">
                    <label className="text-[10px] font-bold text-slate-400 uppercase mb-1.5 block">Nom du Client</label>
                    <input
                        type="text"
                        placeholder="Recherche..."
                        value={search || ''}
                        onFocus={() => setShowSuggestions(true)}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            onUpdateClient('name', e.target.value);
                        }}
                        className={`${inputClasses} font-bold`}
                    />

                    {showSuggestions && search && filteredClients.length > 0 && (
                        <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 shadow-xl rounded-xl overflow-hidden">
                            {filteredClients.map((client, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => handleSelectClient(client)}
                                    className="px-4 py-2.5 hover:bg-green-50 cursor-pointer border-b border-slate-50 last:border-none"
                                >
                                    <div className="font-semibold text-slate-800 text-sm">{client.name}</div>
                                    <div className="text-[10px] text-slate-500">{client.email}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase mb-1.5 block">Email Client</label>
                        <input
                            type="email"
                            value={invoice.client.email || ''}
                            onChange={(e) => onUpdateClient('email', e.target.value)}
                            className={inputClasses}
                        />
                    </div>
                    <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase mb-1.5 block">Adresse Client</label>
                        <input
                            type="text"
                            placeholder="Ville, Pays..."
                            value={invoice.client.address || ''}
                            onChange={(e) => onUpdateClient('address', e.target.value)}
                            className={inputClasses}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvoiceHeaderForm;
