import React from 'react';
import { 
  ChevronDown, 
  RotateCw, 
  Search, 
  X,
  Mail
} from 'lucide-react';
import ThemeSwitcher from '../ThemeSwitcher';

const folderNames = {
  inbox: 'Entrada',
  starred: 'Favoritos',
  sent: 'Enviados',
  drafts: 'Borradores',
  archive: 'Archivo',
  spam: 'Spam',
  trash: 'Papelera'
};

export default function MobileHeader({
  currentFolder,
  onOpenFolderSheet,
  searchQuery,
  setSearchQuery,
  isRefreshing,
  onRefresh,
  themeMode,
  setThemeMode,
  filterTab,
  setFilterTab,
  unreadCount
}) {
  const currentTitle = folderNames[currentFolder] || 'Buzón';

  return (
    <header className="pt-safe bg-[#fbfbfd]/80 dark:bg-[#161618]/80 backdrop-blur-xl border-b border-black/[0.06] dark:border-white/[0.08] select-none sticky top-0 z-20 shrink-0">
      {/* Top Title Bar */}
      <div className="h-12 px-3 flex items-center justify-between">
        {/* Folder Selector Pill Button */}
        <button
          onClick={onOpenFolderSheet}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 font-semibold text-xs active:scale-95 transition-all border border-purple-200/60 dark:border-purple-800/40"
        >
          <span>{currentTitle}</span>
          {unreadCount > 0 && currentFolder === 'inbox' && (
            <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-pulse" />
          )}
          <ChevronDown className="w-3.5 h-3.5 opacity-60" />
        </button>

        {/* Center Title */}
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-6 rounded-lg yahoo-apple-gradient flex items-center justify-center text-white shadow-xs">
            <Mail className="w-3.5 h-3.5" />
          </div>
          <span className="font-bold text-xs tracking-tight text-slate-900 dark:text-white">
            Uroci Mail
          </span>
        </div>

        {/* Right Actions: Refresh + AirPods Theme Switcher */}
        <div className="flex items-center gap-1">
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="p-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
            title="Comprobar correo"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-purple-600' : ''}`} />
          </button>
          <ThemeSwitcher themeMode={themeMode} setThemeMode={setThemeMode} />
        </div>
      </div>

      {/* Search Bar & Filter Segmented Pill */}
      <div className="px-3 pb-2.5 pt-1 space-y-2">
        {/* Search Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search className="w-3.5 h-3.5" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar correos..."
            className="w-full pl-8 pr-7 py-1.5 bg-[#eaeaf0]/70 dark:bg-[#252528]/80 text-xs rounded-xl border-none focus:outline-none focus:ring-1 focus:ring-purple-500/30 text-slate-800 dark:text-slate-100 placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Segmented Filter Control */}
        <div className="flex items-center bg-[#f0f0f4] dark:bg-[#252528] p-0.5 rounded-xl text-[11px] font-medium text-slate-500">
          <button
            onClick={() => setFilterTab('all')}
            className={`flex-1 py-1 rounded-[10px] text-center transition-all ${
              filterTab === 'all'
                ? 'bg-white dark:bg-[#38383c] text-slate-900 dark:text-white font-semibold shadow-xs'
                : 'hover:text-slate-900'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setFilterTab('unread')}
            className={`flex-1 py-1 rounded-[10px] text-center transition-all ${
              filterTab === 'unread'
                ? 'bg-white dark:bg-[#38383c] text-slate-900 dark:text-white font-semibold shadow-xs'
                : 'hover:text-slate-900'
            }`}
          >
            No leídos
          </button>
          <button
            onClick={() => setFilterTab('starred')}
            className={`flex-1 py-1 rounded-[10px] text-center transition-all ${
              filterTab === 'starred'
                ? 'bg-white dark:bg-[#38383c] text-slate-900 dark:text-white font-semibold shadow-xs'
                : 'hover:text-slate-900'
            }`}
          >
            Favoritos
          </button>
        </div>
      </div>
    </header>
  );
}
