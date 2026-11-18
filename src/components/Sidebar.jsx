import React from 'react';
import { 
  Inbox, 
  Star, 
  Send, 
  FileText, 
  Archive, 
  AlertOctagon, 
  Trash2, 
  PenSquare, 
  Tag, 
  HardDrive,
  ExternalLink,
  ShieldCheck
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
    <aside className="w-64 min-w-[240px] h-[calc(100vh-4rem)] bg-white/70 dark:bg-slate-900/60 backdrop-blur-md border-r border-slate-200/80 dark:border-slate-800 flex flex-col justify-between p-3.5 select-none transition-colors">
      <div className="space-y-4">
        {/* Yahoo-style Compose Button */}
        <button
          onClick={onOpenCompose}
          className="w-full yahoo-gradient hover:opacity-95 text-white font-semibold py-3 px-4 rounded-2xl shadow-lg shadow-purple-600/20 flex items-center justify-center gap-2.5 transform active:scale-[0.98] hover:translate-y-[-1px] transition-all duration-200"
        >
          <PenSquare className="w-5 h-5" />
          <span className="tracking-wide">Redactar</span>
        </button>

        {/* Folder Navigation */}
        <nav className="space-y-1">
          {folders.map((item) => {
            const Icon = item.icon;
            const isActive = currentFolder === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentFolder(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group ${
                  isActive
                    ? 'bg-purple-100/80 dark:bg-purple-950/60 text-purple-900 dark:text-purple-200 font-semibold shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100/80 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-transform group-hover:scale-110 duration-200 ${
                      isActive 
                        ? 'text-purple-700 dark:text-purple-400' 
                        : 'text-slate-400 dark:text-slate-500'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.count > 0 && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-purple-600 text-white shadow-xs'
                        : 'bg-purple-100 text-purple-700 dark:bg-slate-800 dark:text-purple-300'
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
        <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800/80">
          <p className="px-3 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
            Vistas rápidas
          </p>
          <div className="space-y-1">
            <div className="flex items-center gap-2.5 px-3 py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-purple-600 cursor-pointer transition-colors rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 ring-2 ring-blue-100 dark:ring-blue-900"></span>
              <span>Trabajo</span>
            </div>
            <div className="flex items-center gap-2.5 px-3 py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-purple-600 cursor-pointer transition-colors rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-emerald-100 dark:ring-emerald-900"></span>
              <span>Personal</span>
            </div>
            <div className="flex items-center gap-2.5 px-3 py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-purple-600 cursor-pointer transition-colors rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 ring-2 ring-amber-100 dark:ring-amber-900"></span>
              <span>Importante</span>
            </div>
          </div>
        </div>
      </div>

      {/* Gmail Account Card at Bottom */}
      <div className="bg-gradient-to-br from-purple-50 to-indigo-50/50 dark:from-slate-800/70 dark:to-purple-950/20 border border-purple-100 dark:border-purple-900/40 rounded-2xl p-3.5 space-y-2.5 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
            <ShieldCheck className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span>Cuenta vinculada</span>
          </div>
          <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
            status?.connected 
              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300' 
              : 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300'
          }`}>
            {status?.connected ? 'Gmail Activo' : 'Modo Demo'}
          </span>
        </div>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
          {status?.connected 
            ? `Sincronizando correos con ${status.email}` 
            : 'Conecta tu cuenta @gmail.com para recibir tus correos reales'}
        </p>
        <button
          onClick={onOpenConnectModal}
          className="w-full text-xs font-medium text-purple-700 dark:text-purple-300 hover:text-purple-800 dark:hover:text-purple-200 bg-white dark:bg-slate-800 border border-purple-200 dark:border-purple-700/60 py-1.5 rounded-lg flex items-center justify-center gap-1.5 shadow-2xs hover:shadow-xs transition-all"
        >
          <span>{status?.connected ? 'Cambiar cuenta' : 'Vincular Gmail'}</span>
          <ExternalLink className="w-3 h-3" />
        </button>
      </div>
    </aside>
  );
}
