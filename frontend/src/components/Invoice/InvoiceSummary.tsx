import React from 'react';
import * as Switch from '@radix-ui/react-switch';

interface InvoiceSummaryProps {
    totals: {
        subtotal: number;
        taxAmount: number;
        grandTotal: number;
    };
    taxRate: number;
    includeTax: boolean;
    onToggleTax: (value: boolean) => void;
    onUpdateTaxRate: (value: number) => void;
}

const InvoiceSummary: React.FC<InvoiceSummaryProps> = ({ totals, taxRate, includeTax, onToggleTax, onUpdateTaxRate }) => {
    const subtotal = totals?.subtotal || 0;
    const taxAmount = totals?.taxAmount || 0;
    const grandTotal = totals?.grandTotal || 0;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Résumé financier</h2>
                
                <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Appliquer TVA</span>
                    <Switch.Root
                        checked={includeTax}
                        onCheckedChange={onToggleTax}
                        className="w-10 h-5 bg-slate-200 rounded-full relative outline-none cursor-pointer data-[state=checked]:bg-green-600 transition-colors"
                    >
                        <Switch.Thumb className="block w-4 h-4 bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px]" />
                    </Switch.Root>
                </div>
            </div>
            
            <div className="space-y-4">
                {includeTax && (
                    <>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-500">Sous-total HT</span>
                            <span className="font-mono font-bold text-slate-700">{Number(subtotal).toLocaleString('fr-FR', { minimumFractionDigits: 0, maximumFractionDigits: 2 })} FCFA</span>
                        </div>
                        
                        <div className="flex justify-between items-center text-sm">
                            <div className="flex items-center gap-2">
                                <span className="text-slate-500">TVA (%)</span>
                                <input 
                                    type="number"
                                    value={taxRate}
                                    onChange={(e) => onUpdateTaxRate(parseFloat(e.target.value) || 0)}
                                    className="w-14 bg-white border border-black rounded px-2 py-0.5 text-xs font-bold text-center outline-none focus:ring-1 focus:ring-green-500"
                                />
                            </div>
                            <span className="font-mono font-bold text-slate-700">{Number(taxAmount).toLocaleString('fr-FR', { minimumFractionDigits: 0, maximumFractionDigits: 2 })} FCFA</span>
                        </div>
                    </>
                )}

                <div className="pt-6 border-t border-slate-100">
                    <div className="flex justify-between items-end">
                        <div className="space-y-1">
                            <span className="text-[10px] font-bold text-green-600 uppercase tracking-widest block">
                                {includeTax ? 'Total TTC à payer' : 'Total Net à payer'}
                            </span>
                            <span className="text-3xl md:text-4xl font-bold tracking-tighter text-slate-900">
                                {Number(grandTotal).toLocaleString('fr-FR', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
                            </span>
                        </div>
                        <span className="text-sm font-bold text-slate-400 mb-1">FCFA</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvoiceSummary;
