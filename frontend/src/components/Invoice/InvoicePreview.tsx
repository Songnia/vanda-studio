import React from 'react';
import type { InvoiceData } from '@/types/invoice';

interface PreviewProps {
    invoice: InvoiceData;
    totals: { subtotal: number; taxAmount: number; grandTotal: number };
}

const InvoicePreview: React.FC<PreviewProps> = ({ invoice, totals }) => {
    return (
        <div id="invoice-content" className="w-full aspect-[1/1.414] p-[8%] flex flex-col font-sans text-slate-800 bg-white">
            <div className="flex justify-between items-start mb-12">
                <div className="max-w-[150px]">
                    {invoice.studio.logoUrl ? (
                        <img src={invoice.studio.logoUrl} alt="Studio Logo" className="w-full h-auto grayscale" />
                    ) : (
                        <div className="h-10 bg-slate-100 rounded px-3 flex items-center text-[10px] font-bold text-slate-400">LOGO</div>
                    )}
                </div>
                <div className="text-right text-[10px] text-slate-500 space-y-0.5">
                    <p className="font-bold text-slate-900 text-xs uppercase tracking-tight">{invoice.studio.photographerName}</p>
                    <p>{invoice.studio.email}</p>
                    <p>{invoice.studio.address}</p>
                    <p className="font-mono text-[9px] text-slate-400">{invoice.studio.phone}</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-12">
                <div>
                    <h3 className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2">Facturé à :</h3>
                    <div className="space-y-1">
                        <p className="font-bold text-slate-900">{invoice.client.name || "Client"}</p>
                        <p className="text-[11px] text-slate-500 leading-relaxed font-mono">
                            {invoice.client.phone || "Non renseigné"}
                        </p>
                    </div>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl space-y-2">
                    <div className="flex justify-between items-center text-[11px]">
                        <span className="text-slate-400 text-[10px] uppercase">FACTURE N°</span>
                        <span className="font-mono font-bold">{invoice.number}</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px]">
                        <span className="text-slate-400 text-[10px] uppercase">DATE</span>
                        <span className="font-medium">{new Date(invoice.issueDate).toLocaleDateString('fr-FR')}</span>
                    </div>
                </div>
            </div>

            <div className="flex-1">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b-2 border-slate-900">
                            <th className="py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Prestation</th>
                            <th className="py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 text-center">Qté</th>
                            <th className="py-2 text-[10px] font-bold uppercase tracking-wider text-slate-900 text-right">Total</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {invoice.items.map((item, idx) => (
                            <tr key={idx}>
                                <td className="py-3 text-[11px] font-medium text-slate-800">{item.description || "..."}</td>
                                <td className="py-3 text-[11px] text-slate-500 text-center">{item.quantity}</td>
                                <td className="py-3 text-[11px] font-bold text-slate-900 text-right">{Number(item.total).toLocaleString('fr-FR', { minimumFractionDigits: 0, maximumFractionDigits: 2 })} FCFA</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-8 pt-6 border-t-2 border-slate-900 flex justify-end">
                <div className="w-[180px] space-y-2">
                    {invoice.includeTax && (
                        <>
                            <div className="flex justify-between text-[11px] text-slate-500">
                                <span>Hors Taxe</span>
                                <span>{Number(totals.subtotal).toLocaleString('fr-FR', { minimumFractionDigits: 0, maximumFractionDigits: 2 })} FCFA</span>
                            </div>
                            <div className="flex justify-between text-[11px] text-slate-500">
                                <span>TVA ({invoice.taxRate}%)</span>
                                <span>{Number(totals.taxAmount).toLocaleString('fr-FR', { minimumFractionDigits: 0, maximumFractionDigits: 2 })} FCFA</span>
                            </div>
                        </>
                    )}
                    <div className="flex justify-between py-2 border-t border-slate-100 mt-2">
                        <span className="font-bold text-slate-900 text-xs">
                            {invoice.includeTax ? 'Total TTC' : 'Total Net'}
                        </span>
                        <span className="font-black text-green-600 text-base">
                            {Number(totals.grandTotal).toLocaleString('fr-FR', { minimumFractionDigits: 0, maximumFractionDigits: 2 })} FCFA
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvoicePreview;
