import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, 
  Trash2, 
  Mail, 
  MailOpen, 
  Paperclip, 
  CheckSquare, 
  Square, 
  Archive, 
  Inbox,
  Clock,
  Sparkles
} from 'lucide-react';

function formatEmailDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  const now = new Date();
  
  const isToday = date.toDateString() === now.toDateString();
  if (isToday) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  const isThisYear = date.getFullYear() === now.getFullYear();
  if (isThisYear) {
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  }

  return date.toLocaleDateString([], { year: '2-digit', month: 'numeric', day: 'numeric' });
}

function getAvatarColor(name = '') {
  const colors = [
    'from-purple-500 to-indigo-600',
    'from-blue-500 to-cyan-600',
    'from-emerald-500 to-teal-600',
    'from-amber-500 to-orange-600',
    'from-rose-500 to-pink-600',
    'from-violet-500 to-purple-600'
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

export default function EmailList({ 
  emails, 
  selectedEmail, 
  onSelectEmail, 
  onToggleStar, 
  onToggleRead, 
  onDeleteEmail,
  currentFolder
}) {
  const [filterTab, setFilterTab] = useState('all'); // 'all', 'unread', 'starred'
  const [selectedIds, setSelectedIds] = useState([]);

  // Filter list
  const filteredEmails = emails.filter(email => {
    if (filterTab === 'unread') return email.unread;
    if (filterTab === 'starred') return email.starred;
    return true;
  });

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredEmails.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredEmails.map(e => e.id));
    }
  };

  const toggleSelectOne = (e, id) => {
    e.stopPropagation();
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-4rem)] bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800 overflow-hidden transition-colors">
      {/* List Toolbar */}
      <div className="h-13 px-4 border-b border-slate-200/70 dark:border-slate-800 flex items-center justify-between bg-slate-50/60 dark:bg-slate-900/60 backdrop-blur-xs select-none">
        <div className="flex items-center gap-3">
          <button 
            onClick={toggleSelectAll} 
            className="text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 p-1 rounded transition-colors"
            title="Seleccionar todos"
          >
            {selectedIds.length > 0 && selectedIds.length === filteredEmails.length ? (
              <CheckSquare className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            ) : (
              <Square className="w-4 h-4" />
            )}
          </button>

          {/* Filter Tabs */}
          <div className="flex items-center bg-slate-200/60 dark:bg-slate-800 p-0.5 rounded-lg text-xs font-medium">
            <button
              onClick={() => setFilterTab('all')}
              className={`px-3 py-1 rounded-md transition-all ${
                filterTab === 'all'
                  ? 'bg-white dark:bg-slate-700 text-purple-800 dark:text-purple-300 shadow-2xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Todos ({emails.length})
            </button>
            <button
              onClick={() => setFilterTab('unread')}
              className={`px-3 py-1 rounded-md transition-all ${
                filterTab === 'unread'
                  ? 'bg-white dark:bg-slate-700 text-purple-800 dark:text-purple-300 shadow-2xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              No leídos
            </button>
            <button
              onClick={() => setFilterTab('starred')}
              className={`px-3 py-1 rounded-md transition-all ${
                filterTab === 'starred'
                  ? 'bg-white dark:bg-slate-700 text-purple-800 dark:text-purple-300 shadow-2xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Destacados
            </button>
          </div>
        </div>

        {/* Bulk Action Buttons if items are checked */}
        {selectedIds.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-1 bg-purple-50 dark:bg-purple-950/60 px-2 py-1 rounded-lg border border-purple-200 dark:border-purple-800"
          >
            <span className="text-xs font-bold text-purple-700 dark:text-purple-300 mr-2">
              {selectedIds.length} seleccionados
            </span>
            <button
              onClick={() => {
                selectedIds.forEach(id => onDeleteEmail(id));
                setSelectedIds([]);
              }}
              className="p-1 hover:text-rose-600 text-slate-500 rounded transition-colors"
              title="Eliminar seleccionados"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </div>

      {/* Email Item Rows List */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
        <AnimatePresence>
          {filteredEmails.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center h-72 text-center p-6"
            >
              <div className="w-16 h-16 rounded-full bg-purple-50 dark:bg-purple-950/50 flex items-center justify-center text-purple-500 mb-3 shadow-inner">
                <Inbox className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-slate-700 dark:text-slate-300 text-base mb-1">
                No hay correos en esta vista
              </h3>
              <p className="text-xs text-slate-400 max-w-xs">
                {filterTab !== 'all' 
                  ? 'No hay mensajes que coincidan con este filtro.' 
                  : 'Esta bandeja se encuentra limpia. Los nuevos correos de tu cuenta aparecerán aquí.'}
              </p>
            </motion.div>
          ) : (
            filteredEmails.map((email) => {
              const isSelected = selectedEmail?.id === email.id;
              const isChecked = selectedIds.includes(email.id);
              const avatarGrad = getAvatarColor(email.from?.name || 'User');
              const initial = (email.from?.name || email.from?.email || 'U')[0].toUpperCase();

              return (
                <motion.div
                  key={email.id}
                  layout
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -30, height: 0 }}
                  transition={{ duration: 0.18 }}
                  onClick={() => onSelectEmail(email)}
                  className={`group relative flex items-center gap-3 px-4 py-3 cursor-pointer transition-all border-l-4 ${
                    isSelected 
                      ? 'bg-purple-50/90 dark:bg-purple-950/40 border-purple-600' 
                      : email.unread 
                        ? 'bg-white dark:bg-slate-900 border-purple-500 font-semibold shadow-xs' 
                        : 'bg-slate-50/30 dark:bg-slate-900/40 border-transparent hover:bg-slate-100/60 dark:hover:bg-slate-800/60'
                  }`}
                >
                  {/* Selection Checkbox */}
                  <button
                    onClick={(e) => toggleSelectOne(e, email.id)}
                    className="text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 p-0.5 rounded transition-colors"
                  >
                    {isChecked ? (
                      <CheckSquare className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    ) : (
                      <Square className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                    )}
                  </button>

                  {/* Star Toggle Button with pop animation */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleStar(email.id);
                    }}
                    className="p-1 rounded-full hover:bg-purple-100/60 dark:hover:bg-slate-800 transition-colors"
                    title={email.starred ? "Quitar de destacados" : "Destacar correo"}
                  >
                    <Star 
                      className={`w-4 h-4 transition-all duration-200 transform ${
                        email.starred 
                          ? 'fill-amber-400 text-amber-400 scale-110 drop-shadow-xs' 
                          : 'text-slate-300 group-hover:text-slate-400 hover:scale-110'
                      }`} 
                    />
                  </button>

                  {/* Sender Avatar */}
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-tr ${avatarGrad} flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-2xs`}>
                    {initial}
                  </div>

                  {/* Sender & Subject & Snippet */}
                  <div className="flex-1 min-w-0 pr-2">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className={`text-sm truncate ${
                        email.unread 
                          ? 'text-slate-900 dark:text-white font-bold' 
                          : 'text-slate-700 dark:text-slate-300 font-normal'
                      }`}>
                        {email.from?.name || email.from?.email || 'Remitente'}
                      </span>
                      <span className="text-[11px] text-slate-400 group-hover:hidden shrink-0 ml-2">
                        {formatEmailDate(email.date)}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 truncate">
                      {email.hasAttachment && (
                        <Paperclip className="w-3 h-3 text-slate-400 shrink-0" />
                      )}
                      <span className={`truncate ${
                        email.unread ? 'text-slate-800 dark:text-slate-200 font-medium' : ''
                      }`}>
                        {email.subject}
                      </span>
                      <span className="text-slate-300 dark:text-slate-600">-</span>
                      <span className="text-slate-400 dark:text-slate-500 truncate">
                        {email.snippet}
                      </span>
                    </div>
                  </div>

                  {/* Hover Quick Action Buttons (Yahoo style hover toolbar) */}
                  <div className="hidden group-hover:flex items-center gap-1 absolute right-3 bg-white/95 dark:bg-slate-800/95 py-1 px-1.5 rounded-lg shadow-md border border-slate-200/80 dark:border-slate-700">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleRead(email.id, email.unread);
                      }}
                      className="p-1.5 text-slate-500 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-slate-700 rounded transition-colors"
                      title={email.unread ? "Marcar como leído" : "Marcar como no leído"}
                    >
                      {email.unread ? <MailOpen className="w-3.5 h-3.5" /> : <Mail className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteEmail(email.id);
                      }}
                      className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-slate-700 rounded transition-colors"
                      title="Eliminar correo"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
