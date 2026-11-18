import React from 'react';
import { 
  Search, 
  RotateCw, 
  Moon, 
  Sun, 
  HelpCircle, 
  Mail, 
  Sparkles,
  Radio,
  SlidersHorizontal,
  X
} from 'lucide-react';

export default function Navbar({ 
  searchQuery, 
  setSearchQuery, 
  isRefreshing, 
  onRefresh, 
  darkMode, 
  setDarkMode, 
  status, 
  onOpenConnectModal 
}) {
  return (
    <header className="h-16 border-b border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/90 backdrop-blur-md px-4 flex items-center justify-between sticky top-0 z-30 transition-colors">
      {/* Brand logo & title */}
      <div className="flex items-center gap-3 w-64 min-w-[220px]">
        <div className="w-10 h-10 rounded-xl yahoo-gradient flex items-center justify-center text-white shadow-md shadow-purple-500/20 transform hover:scale-105 transition-transform duration-200 cursor-pointer">
          <Mail className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-purple-700 via-indigo-600 to-purple-800 dark:from-purple-400 dark:to-indigo-300 bg-clip-text text-transparent">
              Uroci Mail
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300">
              Yahoo! Style
            </span>
          </div>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 leading-none">
            Simple & Elegante
          </p>
        </div>
      </div>

      {/* Global Search Bar */}
      <div className="flex-1 max-w-2xl px-4">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-purple-600 dark:group-focus-within:text-purple-400 transition-colors">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por remitente, asunto o contenido..."
            className="w-full pl-10 pr-10 py-2.5 bg-slate-100/90 dark:bg-slate-800/90 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm rounded-full border border-transparent focus:border-purple-400 dark:focus:border-purple-600 focus:bg-white dark:focus:bg-slate-900 focus:shadow-sm focus:outline-none transition-all duration-200"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Action buttons & Gmail Status */}
      <div className="flex items-center gap-2">
        {/* Connection status badge / button */}
        <button
          onClick={onOpenConnectModal}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border ${
            status?.connected 
              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100'
              : 'bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800 hover:bg-purple-100 shadow-sm'
          }`}
          title="Configurar conexión con cuenta @gmail.com"
        >
          <span className="relative flex h-2 w-2">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
              status?.connected ? 'bg-emerald-400' : 'bg-purple-400'
            }`}></span>
            <span className={`relative inline-flex rounded-full h-2 w-2 ${
              status?.connected ? 'bg-emerald-500' : 'bg-purple-600'
            }`}></span>
          </span>
          <span className="hidden sm:inline">
            {status?.connected ? (status.email || 'Gmail Conectado') : 'Conectar @gmail.com'}
          </span>
          {!status?.connected && (
            <span className="bg-purple-200/70 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-[10px] px-1 rounded font-semibold">
              Demo
            </span>
          )}
        </button>

        {/* Refresh button with smooth spin */}
        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors relative"
          title="Actualizar correos"
        >
          <RotateCw className={`w-4 h-4 transition-transform duration-700 ${isRefreshing ? 'animate-spin text-purple-600' : ''}`} />
        </button>

        {/* Dark mode toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
          title="Cambiar tema visual"
        >
          {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* User Avatar */}
        <div 
          onClick={onOpenConnectModal}
          className="w-8 h-8 rounded-full yahoo-gradient flex items-center justify-center text-white text-xs font-bold cursor-pointer ring-2 ring-purple-100 dark:ring-purple-900/40 hover:opacity-90 transition-opacity ml-1 shadow-sm"
          title="Gestionar cuenta"
        >
          {status?.email ? status.email[0].toUpperCase() : 'U'}
        </div>
      </div>
    </header>
  );
}
