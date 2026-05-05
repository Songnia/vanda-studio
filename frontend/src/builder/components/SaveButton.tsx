import { useState } from 'react';
import { Save, Check, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SaveButtonProps {
  /** Callback that performs the save. */
  onSave: () => Promise<boolean>;
  isSaving: boolean;
  /** Disables the button when there are no changes to save. */
  isDirty?: boolean;
  /** Optional extra classes */
  className?: string;
}

/**
 * Shared "Sauvegarder" button for all builder steps (1–8).
 * - Disabled (grayed) when `isDirty` is false (no changes).
 * - Shows spinner while saving, green check on success, red alert on failure.
 */
export function SaveButton({ onSave, isSaving, isDirty = true, className = '' }: SaveButtonProps) {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSave = async () => {
    if (isSaving || !isDirty) return;
    setStatus('idle');
    const ok = await onSave();
    setStatus(ok ? 'success' : 'error');
    // Keep success state until next change
    if (!ok) setTimeout(() => setStatus('idle'), 2500);
  };

  const isDisabled = isSaving || !isDirty;

  return (
    <Button
      variant="outline"
      onClick={handleSave}
      disabled={isDisabled}
      title={!isDirty ? 'Aucune modification à sauvegarder' : 'Sauvegarder les modifications'}
      className={`transition-all ${
        isDirty
          ? 'border-green-400 text-green-700 hover:bg-green-50 hover:border-green-500'
          : 'border-gray-200 text-gray-400 cursor-not-allowed'
      } ${className}`}
    >
      {isSaving ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      ) : status === 'success' ? (
        <Check className="w-4 h-4 mr-2 text-green-600" />
      ) : status === 'error' ? (
        <AlertCircle className="w-4 h-4 mr-2 text-red-500" />
      ) : (
        <Save className="w-4 h-4 mr-2" />
      )}
      {isSaving
        ? 'Sauvegarde...'
        : status === 'success'
        ? 'Sauvegardé !'
        : status === 'error'
        ? 'Erreur'
        : 'Sauvegarder'}
    </Button>
  );
}
