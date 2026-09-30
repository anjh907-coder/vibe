import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-stone-900 text-white px-4 py-3 rounded-xl shadow-lg border border-stone-700 animate-in fade-in slide-in-from-bottom-3 duration-200">
      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
      <span className="text-xs sm:text-sm font-medium">{message}</span>
    </div>
  );
};
