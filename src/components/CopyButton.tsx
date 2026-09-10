import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyButtonProps {
  textToCopy: string;
  label?: string;
  theme?: 'dark' | 'light';
  size?: 'sm' | 'md';
  className?: string;
}

export const CopyButton: React.FC<CopyButtonProps> = ({
  textToCopy,
  label = 'Salin',
  theme = 'dark',
  size = 'sm',
  className = '',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Gagal menyalin:', err);
    }
  };

  const isLight = theme === 'light';
  const iconSize = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';

  return (
    <div className="relative inline-flex items-center">
      <button
        type="button"
        onClick={handleCopy}
        title={copied ? 'Tersalin!' : `${label} (${textToCopy})`}
        aria-label={`${label} ${textToCopy}`}
        className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-semibold transition-all duration-200 ${
          copied
            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 scale-105'
            : isLight
            ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 hover:text-navy-900'
            : 'bg-navy-800/80 hover:bg-navy-700 text-slate-300 hover:text-gold-400 border border-navy-700/60'
        } focus:outline-none focus:ring-2 focus:ring-gold-400/50 ${className}`}
      >
        {copied ? (
          <>
            <Check className={`${iconSize} text-emerald-400 stroke-[3] animate-in zoom-in-50 duration-200`} />
            <span className="text-emerald-400 font-bold">Tersalin!</span>
          </>
        ) : (
          <>
            <Copy className={`${iconSize} transition-transform duration-200 hover:scale-110`} />
            {label && <span className="opacity-90">{label}</span>}
          </>
        )}
      </button>

      {/* Floating Tooltip feedback */}
      {copied && (
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded bg-emerald-600 text-white text-[11px] font-bold shadow-lg whitespace-nowrap z-30 animate-in fade-in slide-in-from-bottom-2 duration-150">
          Tersalin ke clipboard!
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-0.5 border-4 border-transparent border-t-emerald-600" />
        </div>
      )}
    </div>
  );
};
