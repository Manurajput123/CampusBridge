import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react';

export default function Toast() {
  const { toast } = useApp();
  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-indigo-400 shrink-0" />
  };

  const borders = {
    success: 'border-emerald-500/30 bg-emerald-950/80 text-emerald-200',
    error: 'border-rose-500/30 bg-rose-950/80 text-rose-200',
    warning: 'border-amber-500/30 bg-amber-950/80 text-amber-200',
    info: 'border-indigo-500/30 bg-slate-900/90 text-indigo-200'
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-in max-w-md w-full">
      <div className={`p-4 rounded-xl border shadow-2xl backdrop-blur-xl flex items-start gap-3 ${borders[toast.type] || borders.info}`}>
        {icons[toast.type] || icons.info}
        <div className="flex-1 text-sm font-medium leading-relaxed">
          {toast.message}
        </div>
      </div>
    </div>
  );
}
