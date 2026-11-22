import React from 'react';
import { 
  Inbox, 
  Star, 
  SquarePen, 
  Folder, 
  User,
  ShieldCheck
} from 'lucide-react';

export default function MobileBottomBar({
  currentFolder,
  onSelectFolder,
  unreadCount,
  onOpenCompose,
  onOpenFolderSheet,
  onOpenConnectModal,
  status
}) {
  return (
    <nav className="h-16 pb-safe bg-white/90 dark:bg-[#161618]/90 backdrop-blur-xl border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-around px-2 select-none z-30 shrink-0">
      {/* Inbox Tab */}
      <button
        onClick={() => onSelectFolder('inbox')}
        className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors relative ${
          currentFolder === 'inbox' 
            ? 'text-purple-600 dark:text-purple-400 font-semibold' 
            : 'text-slate-400 dark:text-slate-500'
        }`}
      >
        <div className="relative">
          <Inbox className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-2 bg-purple-600 text-white text-[9px] font-bold px-1 rounded-full min-w-[14px] text-center">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
        </div>
        <span className="text-[10px] mt-0.5">Buzón</span>
      </button>

      {/* Starred Tab */}
      <button
        onClick={() => onSelectFolder('starred')}
        className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
          currentFolder === 'starred' 
            ? 'text-amber-500 font-semibold' 
            : 'text-slate-400 dark:text-slate-500'
        }`}
      >
        <Star className={`w-5 h-5 ${currentFolder === 'starred' ? 'fill-amber-400' : ''}`} />
        <span className="text-[10px] mt-0.5">Favoritos</span>
      </button>

      {/* Compose Button - Prominent center button */}
      <div className="flex-1 flex justify-center -mt-3">
        <button
          onClick={onOpenCompose}
          className="w-12 h-12 rounded-full yahoo-apple-gradient flex items-center justify-center text-white shadow-lg shadow-purple-600/30 transform active:scale-90 transition-transform"
          title="Redactar nuevo correo"
        >
          <SquarePen className="w-5 h-5 stroke-[2.2]" />
        </button>
      </div>

      {/* Folders Sheet Trigger */}
      <button
        onClick={onOpenFolderSheet}
        className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
          !['inbox', 'starred'].includes(currentFolder) 
            ? 'text-purple-600 dark:text-purple-400 font-semibold' 
            : 'text-slate-400 dark:text-slate-500'
        }`}
      >
        <Folder className="w-5 h-5" />
        <span className="text-[10px] mt-0.5">Carpetas</span>
      </button>

      {/* Account / Settings Tab */}
      <button
        onClick={onOpenConnectModal}
        className="flex flex-col items-center justify-center flex-1 py-1 text-slate-400 dark:text-slate-500 relative transition-colors"
      >
        <div className="relative">
          <ShieldCheck className="w-5 h-5" />
          <span className={`absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full ${
            status?.connected ? 'bg-emerald-500' : 'bg-purple-500'
          }`} />
        </div>
        <span className="text-[10px] mt-0.5">
          {status?.connected ? 'Gmail' : 'Cuenta'}
        </span>
      </button>
    </nav>
  );
}
