import { useState, useMemo, useEffect } from 'react';
import type { InvoiceData, InvoiceLineItem, ClientInfo, StudioInfo } from '@/types/invoice';

const generateId = () => crypto.randomUUID();

export const useInvoiceState = (initialStudioData: StudioInfo) => {
    // Tentative de récupération des données sauvegardées
    const getSavedInvoice = (): InvoiceData | null => {
        const saved = localStorage.getItem('vanda_draft_invoice');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                // On s'assure que le studio est toujours à jour avec les infos globales
                return { ...parsed, studio: initialStudioData };
            } catch (e) {
                return null;
            }
        }
        return null;
    };

    const [invoice, setInvoice] = useState<InvoiceData>(getSavedInvoice() || {
        number: `FACT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        issueDate: new Date().toISOString().split('T')[0],
        dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        client: { name: '', email: '', phone: '', address: '' },
        items: [{ id: generateId(), description: '', quantity: 1, unitPrice: 0, total: 0 }],
        taxRate: 20,
        includeTax: false,
        studio: initialStudioData
    });

    // Sauvegarde automatique à chaque changement
    useEffect(() => {
        localStorage.setItem('vanda_draft_invoice', JSON.stringify(invoice));
    }, [invoice]);

    const updateMetadata = (field: keyof InvoiceData, value: any) => {
        setInvoice(prev => ({ ...prev, [field]: value }));
    };

    const updateClient = (field: keyof ClientInfo, value: string) => {
        setInvoice(prev => ({
            ...prev,
            client: { ...prev.client, [field]: value }
        }));
    };

    const updateStudio = (field: keyof StudioInfo, value: string) => {
        setInvoice(prev => ({
            ...prev,
            studio: { ...prev.studio, [field]: value }
        }));
    };

    const updateLineItem = (id: string, field: keyof Omit<InvoiceLineItem, 'id' | 'total'>, value: any) => {
        setInvoice(prev => ({
            ...prev,
            items: prev.items.map(item => {
                if (item.id === id) {
                    const updatedItem = { ...item, [field]: value };
                    updatedItem.total = updatedItem.quantity * updatedItem.unitPrice;
                    return updatedItem;
                }
                return item;
            })
        }));
    };

    const addLineItem = () => {
        setInvoice(prev => ({
            ...prev,
            items: [...prev.items, { id: generateId(), description: '', quantity: 1, unitPrice: 0, total: 0 }]
        }));
    };

    const removeLineItem = (id: string) => {
        setInvoice(prev => ({
            ...prev,
            items: prev.items.filter(item => item.id !== id)
        }));
    };

    const totals = useMemo(() => {
        const subtotal = (invoice.items || []).reduce((sum, item) => sum + (item.total || 0), 0);
        const taxAmount = invoice.includeTax ? (subtotal * (invoice.taxRate || 0)) / 100 : 0;
        const grandTotal = subtotal + taxAmount;

        return { subtotal, taxAmount, grandTotal };
    }, [invoice.items, invoice.taxRate, invoice.includeTax]);

    const setFullInvoice = (data: InvoiceData) => {
        setInvoice(data);
    };

    const resetInvoice = () => {
        localStorage.removeItem('vanda_draft_invoice');
        setInvoice({
            number: `FACT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
            issueDate: new Date().toISOString().split('T')[0],
            dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            client: { name: '', email: '', phone: '', address: '' },
            items: [{ id: generateId(), description: '', quantity: 1, unitPrice: 0, total: 0 }],
            taxRate: 20,
            includeTax: false,
            studio: initialStudioData
        });
    };

    return {
        invoice,
        totals,
        updateMetadata,
        updateClient,
        updateStudio,
        updateLineItem,
        addLineItem,
        removeLineItem,
        setFullInvoice,
        resetInvoice
    };
};
