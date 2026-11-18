import React from 'react';
import { 
  Inbox, 
  Star, 
  Send, 
  FileText, 
  Archive, 
  AlertOctagon, 
  Trash2, 
  SquarePen, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export default function Sidebar({ 
  currentFolder, 
  setCurrentFolder, 
  unreadCount, 
  onOpenCompose, 
  onOpenConnectModal,
  status 
}) {
  const folders = [
    { id: 'inbox', label: 'Bandeja de entrada', icon: Inbox, count: unreadCount },
    { id: 'starred', label: 'Destacados', icon: Star },
    { id: 'sent', label: 'Enviados', icon: Send },
    { id: 'drafts', label: 'Borradores', icon: FileText },
    { id: 'archive', label: 'Archivo', icon: Archive },
    { id: 'spam', label: 'Spam', icon: AlertOctagon },
    { id: 'trash', label: 'Papelera', icon: Trash2 },
  ];

  return (
    <aside className="w-56 min-w-[210px] h-[calc(100vh-3.5rem)] bg-[#fbfbfd]/70 dark:bg-[#161618]/70 border-r border-black/[0.06] dark:border-white/[0.08] flex flex-col justify-between p-2.5 select-none transition-colors">
      <div className="space-y-3">
        {/* Apple + Yahoo Compose Button */}
        <button
          onClick={onOpenCompose}
          className="w-full yahoo-apple-gradient hover:brightness-105 active:scale-[0.98] text-white font-medium py-2 px-3 rounded-xl shadow-sm shadow-purple-600/25 flex items-center justify-center gap-2 transition-all duration-150 text-xs"
        >
          <SquarePen className="w-4 h-4" />
          <span>Redactar</span>
        </button>

        {/* Folder Navigation - Apple Mail sidebar styling */}
        <nav className="space-y-0.5">
          <p className="px-2.5 text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
            Buzones
          </p>
          {folders.map((item) => {
            const Icon = item.icon;
            const isActive = currentFolder === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentFolder(item.id)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-all duration-100 ${
                  isActive
                    ? 'bg-purple-100/80 dark:bg-purple-950/50 text-purple-900 dark:text-purple-200 font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-black/[0.04] dark:hover:bg-white/[0.05] hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    className={`w-3.5 h-3.5 ${
                      isActive 
                        ? 'text-purple-700 dark:text-purple-400' 
                        : 'text-slate-400 dark:text-slate-500'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.count > 0 && (
                  <span
                    className={`px-1.5 py-0.2 rounded-md text-[10px] font-semibold ${
                      isActive
                        ? 'bg-purple-600 text-white'
                        : 'bg-purple-100 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300'
                    }`}
                  >
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Labels / Categories preview */}
        <div className="pt-2 border-t border-black/[0.04] dark:border-white/[0.06]">
          <p className="px-2.5 text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
            Etiquetas
          </p>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2 px-2.5 py-1 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 rounded-lg hover:bg-black/[0.03] dark:hover:bg-white/[0.04] cursor-pointer">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              <span>Trabajo</span>
            </div>
            <div className="flex items-center gap-2 px-2.5 py-1 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 rounded-lg hover:bg-black/[0.03] dark:hover:bg-white/[0.04] cursor-pointer">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Personal</span>
            </div>
            <div className="flex items-center gap-2 px-2.5 py-1 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 rounded-lg hover:bg-black/[0.03] dark:hover:bg-white/[0.04] cursor-pointer">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <span>Finanzas</span>
            </div>
          </div>
        </div>
      </div>

      {/* Gmail Account Card at Bottom - Minimalist Apple card */}
      <div 
        onClick={onOpenConnectModal}
        className="p-2.5 bg-white/80 dark:bg-[#1e1e20] border border-black/[0.06] dark:border-white/[0.08] rounded-xl hover:border-purple-300/60 dark:hover:border-purple-700/60 transition-all cursor-pointer group"
      >
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-800 dark:text-slate-200">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span>Cuenta</span>
          </div>
          <span className={`text-[9px] font-semibold px-1 py-0.2 rounded ${
            status?.connected 
              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300' 
              : 'bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300'
          }`}>
            {status?.connected ? 'Gmail' : 'Demo'}
          </span>
        </div>
        <p className="text-[10px] text-slate-400 dark:text-slate-500 truncate">
          {status?.connected ? status.email : 'Vincular cuenta @gmail.com'}
        </p>
      </div>
    </aside>
  );
}
