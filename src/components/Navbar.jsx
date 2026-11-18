import React from 'react';
import { 
  Search, 
  RotateCw, 
  Moon, 
  Sun, 
  Mail, 
  X,
  SlidersHorizontal,
  ChevronRight
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
    <header className="h-14 border-b border-black/[0.06] dark:border-white/[0.08] bg-[#fbfbfd]/80 dark:bg-[#161618]/80 backdrop-blur-xl px-4 flex items-center justify-between sticky top-0 z-30 transition-colors select-none">
      {/* Brand logo & title - Apple clean layout + Yahoo identity */}
      <div className="flex items-center gap-2.5 w-60 min-w-[200px]">
        <div className="w-8 h-8 rounded-xl yahoo-apple-gradient flex items-center justify-center text-white shadow-sm shadow-purple-600/30">
          <Mail className="w-4 h-4 stroke-[2]" />
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-semibold text-sm tracking-tight text-slate-900 dark:text-white">
            Uroci Mail
          </span>
          <span className="text-[9px] font-semibold tracking-wide uppercase px-1.5 py-0.5 rounded-full bg-purple-100/70 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300">
            Hybrid
          </span>
        </div>
      </div>

      {/* Global Search Bar - Apple Spotlight / Mail toolbar style */}
      <div className="flex-1 max-w-xl px-4">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-purple-600 dark:group-focus-within:text-purple-400 transition-colors">
            <Search className="w-3.5 h-3.5" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar en todos los buzones..."
            className="w-full pl-9 pr-8 py-1.5 bg-[#eaeaf0]/70 dark:bg-[#252528]/80 hover:bg-[#e4e4ea] dark:hover:bg-[#2c2c30] text-slate-800 dark:text-slate-100 text-xs rounded-lg border border-transparent focus:border-purple-500/30 focus:bg-white dark:focus:bg-[#1c1c1e] focus:shadow-xs focus:outline-none transition-all duration-150 placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Action buttons & Gmail Status - Apple sleek segmented controls */}
      <div className="flex items-center gap-2">
        {/* Connection status badge */}
        <button
          onClick={onOpenConnectModal}
          className={`flex items-center gap-2 px-2.5 py-1 rounded-lg text-xs font-medium transition-all border ${
            status?.connected 
              ? 'bg-emerald-50/80 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border-emerald-200/60 dark:border-emerald-800/40 hover:bg-emerald-100/60'
              : 'bg-purple-50/70 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300 border-purple-200/60 dark:border-purple-800/40 hover:bg-purple-100/60'
          }`}
          title="Configurar conexión con @gmail.com"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
              status?.connected ? 'bg-emerald-400' : 'bg-purple-400'
            }`}></span>
            <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${
              status?.connected ? 'bg-emerald-500' : 'bg-purple-600'
            }`}></span>
          </span>
          <span className="hidden sm:inline text-[11px]">
            {status?.connected ? (status.email || 'Gmail Conectado') : 'Conectar @gmail.com'}
          </span>
          {!status?.connected && (
            <span className="text-[10px] opacity-70 font-semibold">
              Demo
            </span>
          )}
        </button>

        {/* Refresh button with smooth spin */}
        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.06] rounded-md transition-colors"
          title="Comprobar correo nuevo"
        >
          <RotateCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-purple-600' : ''}`} />
        </button>

        {/* Dark mode toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.06] rounded-md transition-colors"
          title="Cambiar tema"
        >
          {darkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5" />}
        </button>

        {/* User Avatar */}
        <div 
          onClick={onOpenConnectModal}
          className="w-7 h-7 rounded-full yahoo-apple-gradient flex items-center justify-center text-white text-[11px] font-semibold cursor-pointer shadow-xs ml-0.5"
          title="Gestionar cuenta"
        >
          {status?.email ? status.email[0].toUpperCase() : 'U'}
        </div>
      </div>
    </header>
  );
}
