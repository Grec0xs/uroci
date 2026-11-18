import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Sparkles, Moon } from 'lucide-react';

export default function ThemeSwitcher({ themeMode, setThemeMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const options = [
    { id: 'light', label: 'Claro', icon: Sun, color: 'text-amber-500' },
    { id: 'system', label: 'Dispositivo', icon: Sparkles, color: 'text-purple-500 dark:text-purple-400' },
    { id: 'dark', label: 'Oscuro', icon: Moon, color: 'text-indigo-400 dark:text-indigo-300' },
  ];

  const currentOption = options.find(o => o.id === themeMode) || options[1];
  const CurrentIcon = currentOption.icon;

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

  return (
    <div ref={containerRef} className="relative flex items-center select-none">
      <AnimatePresence initial={false} mode="wait">
        {!isOpen ? (
          // Collapsed single button
          <motion.button
            key="collapsed-theme-btn"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.15 }}
            onClick={() => setIsOpen(true)}
            className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.06] rounded-md transition-colors relative group"
            title={`Tema: ${currentOption.label} (clic para desplegar opciones)`}
          >
            <CurrentIcon className={`w-3.5 h-3.5 ${currentOption.color} transition-transform duration-200 group-hover:scale-110`} />
            {themeMode === 'system' && (
              <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-purple-500" />
            )}
          </motion.button>
        ) : (
          // Expanded AirPods-style capsule segmented control
          <motion.div
            key="expanded-theme-control"
            initial={{ opacity: 0, width: 34, scale: 0.9 }}
            animate={{ opacity: 1, width: 'auto', scale: 1 }}
            exit={{ opacity: 0, width: 34, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 450, damping: 30 }}
            className="flex items-center bg-[#f0f0f4] dark:bg-[#252528] p-0.5 rounded-full border border-black/[0.06] dark:border-white/[0.08] shadow-md shadow-black/5"
          >
            {options.map((option) => {
              const Icon = option.icon;
              const isActive = themeMode === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => {
                    setThemeMode(option.id);
                    // Smoothly close after choosing
                    setTimeout(() => setIsOpen(false), 200);
                  }}
                  className={`relative px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 transition-colors z-10 ${
                    isActive 
                      ? 'text-slate-900 dark:text-white font-semibold' 
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                  title={option.label}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeThemePill"
                      className="absolute inset-0 bg-white dark:bg-[#38383c] rounded-full shadow-xs"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1">
                    <Icon className={`w-3.5 h-3.5 ${isActive ? option.color : ''}`} />
                    <span className="text-[10px] hidden sm:inline">{option.label}</span>
                  </span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
