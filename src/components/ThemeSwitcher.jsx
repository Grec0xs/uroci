import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Sparkles, Moon } from 'lucide-react';

export default function ThemeSwitcher({ themeMode, setThemeMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const options = [
    { id: 'light', label: 'Claro', icon: Sun, color: 'text-amber-500' },
    { id: 'system', label: 'Auto', icon: Sparkles, color: 'text-purple-500 dark:text-purple-400' },
    { id: 'dark', label: 'Oscuro', icon: Moon, color: 'text-indigo-400 dark:text-indigo-300' },
  ];

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const activeOption = options.find(o => o.id === themeMode) || options[1];
  const ActiveIcon = activeOption.icon;

  return (
    <div ref={containerRef} className="relative flex items-center select-none">
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 450, damping: 30 }}
        className={`flex items-center h-7 rounded-full overflow-hidden transition-all duration-150 ${
          isOpen
            ? 'bg-[#ebebf0] dark:bg-[#252528] p-0.5 border border-black/[0.08] dark:border-white/[0.08] shadow-sm'
            : 'hover:bg-black/[0.04] dark:hover:bg-white/[0.06] p-0.5'
        }`}
      >
        {!isOpen ? (
          <button
            onClick={() => setIsOpen(true)}
            className="w-6 h-6 flex items-center justify-center rounded-full text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-transform active:scale-90"
            title={`Tema: ${activeOption.label} (clic para desplegar opciones)`}
          >
            <ActiveIcon className={`w-3.5 h-3.5 ${activeOption.color}`} />
          </button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="flex items-center gap-0.5"
          >
            {options.map((opt) => {
              const Icon = opt.icon;
              const isSelected = themeMode === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => {
                    setThemeMode(opt.id);
                    setTimeout(() => setIsOpen(false), 220);
                  }}
                  className={`relative px-2 py-0.5 h-6 rounded-full text-[10px] font-medium flex items-center gap-1 transition-colors ${
                    isSelected
                      ? 'text-slate-900 dark:text-white font-semibold'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                  title={opt.label}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeThemeHighlight"
                      className="absolute inset-0 bg-white dark:bg-[#38383c] rounded-full shadow-xs"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1">
                    <Icon className={`w-3 h-3 ${isSelected ? opt.color : ''}`} />
                    <span>{opt.label}</span>
                  </span>
                </button>
              );
            })}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
