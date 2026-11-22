import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Inbox, 
  Star, 
  Send, 
  FileText, 
  Archive, 
  AlertOctagon, 
  Trash2, 
  X,
  Check,
  ShieldCheck
} from 'lucide-react';

export default function MobileFolderSheet({
  isOpen,
  onClose,
  currentFolder,
  onSelectFolder,
  unreadCount,
  status,
  onOpenConnectModal
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

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex flex-col justify-end select-none">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-xs"
        />

        {/* Bottom Sheet Card */}
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 350 }}
          className="relative z-10 bg-white dark:bg-[#1c1c1e] rounded-t-3xl border-t border-black/[0.08] dark:border-white/[0.08] shadow-2xl max-h-[85vh] flex flex-col pb-safe"
        >
          {/* iOS Grabber Handle */}
          <div className="w-full flex justify-center pt-2.5 pb-1">
            <div className="w-9 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
          </div>

          {/* Sheet Header */}
          <div className="px-5 py-2.5 flex items-center justify-between border-b border-black/[0.04] dark:border-white/[0.06]">
            <h3 className="font-semibold text-sm text-slate-900 dark:text-white">
              Buzones de Correo
            </h3>
            <button
              onClick={onClose}
              className="p-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Folder List */}
          <div className="p-3 overflow-y-auto space-y-1">
            {folders.map((item) => {
              const Icon = item.icon;
              const isActive = currentFolder === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectFolder(item.id);
                    onClose();
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-purple-100/80 dark:bg-purple-950/60 text-purple-900 dark:text-purple-200 font-semibold'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-black/[0.03] dark:hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-purple-600 dark:text-purple-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.count > 0 && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-600 text-white">
                        {item.count}
                      </span>
                    )}
                    {isActive && <Check className="w-4 h-4 text-purple-600 dark:text-purple-400" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Account info footer */}
          <div className="p-4 border-t border-black/[0.04] dark:border-white/[0.06] bg-[#f9f9fb] dark:bg-[#161618]">
            <div 
              onClick={() => {
                onClose();
                onOpenConnectModal();
              }}
              className="flex items-center justify-between p-3 bg-white dark:bg-[#252528] rounded-xl border border-black/[0.06] dark:border-white/[0.08] cursor-pointer"
            >
              <div className="flex items-center gap-2.5 truncate">
                <ShieldCheck className="w-4 h-4 text-purple-600 shrink-0" />
                <div className="truncate">
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    {status?.connected ? 'Cuenta Conectada' : 'Modo Demostración'}
                  </p>
                  <p className="text-[10px] text-slate-400 truncate">
                    {status?.connected ? status.email : 'Toca para vincular tu @gmail.com'}
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-semibold text-purple-600 dark:text-purple-400 shrink-0 ml-2">
                {status?.connected ? 'Ajustes' : 'Conectar'}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
