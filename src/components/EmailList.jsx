import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, 
  Trash2, 
  Mail, 
  MailOpen, 
  Paperclip, 
  CheckSquare, 
  Square, 
  Inbox
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
  const filteredEmails = useMemo(() => {
    return emails.filter(email => {
      if (filterTab === 'unread') return email.unread;
      if (filterTab === 'starred') return email.starred;
      return true;
    });
  }, [emails, filterTab]);

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredEmails.length && filteredEmails.length > 0) {
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
    <div className="w-full md:w-80 lg:w-[380px] shrink-0 flex flex-col h-[calc(100vh-3.5rem)] bg-[#ffffff] dark:bg-[#1c1c1e] border-r border-black/[0.06] dark:border-white/[0.08] overflow-hidden transition-colors">
      {/* Top Controls Bar - Apple Mail style */}
      <div className="h-12 px-3.5 border-b border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between bg-white/70 dark:bg-[#1c1c1e]/70 backdrop-blur-md select-none shrink-0">
        <div className="flex items-center gap-2">
          <button 
            onClick={toggleSelectAll} 
            className="text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 p-1 rounded-md transition-colors"
            title="Seleccionar todos"
          >
            {selectedIds.length > 0 && selectedIds.length === filteredEmails.length && filteredEmails.length > 0 ? (
              <CheckSquare className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            ) : (
              <Square className="w-3.5 h-3.5" />
            )}
          </button>

          {/* Segmented Control - Apple macOS style */}
          <div className="flex items-center bg-[#f0f0f4] dark:bg-[#2c2c2e] p-0.5 rounded-lg text-[11px] font-medium text-slate-500 dark:text-slate-400">
            <button
              onClick={() => setFilterTab('all')}
              className={`px-2.5 py-1 rounded-[6px] transition-all duration-150 ${
                filterTab === 'all'
                  ? 'bg-white dark:bg-[#3a3a3c] text-slate-900 dark:text-white shadow-xs font-semibold'
                  : 'hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFilterTab('unread')}
              className={`px-2.5 py-1 rounded-[6px] transition-all duration-150 ${
                filterTab === 'unread'
                  ? 'bg-white dark:bg-[#3a3a3c] text-slate-900 dark:text-white shadow-xs font-semibold'
                  : 'hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              No leídos
            </button>
            <button
              onClick={() => setFilterTab('starred')}
              className={`px-2.5 py-1 rounded-[6px] transition-all duration-150 ${
                filterTab === 'starred'
                  ? 'bg-white dark:bg-[#3a3a3c] text-slate-900 dark:text-white shadow-xs font-semibold'
                  : 'hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Destacados
            </button>
          </div>
        </div>

        {/* Bulk Action Buttons */}
        {selectedIds.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-1.5 bg-purple-50 dark:bg-purple-950/40 px-2 py-0.5 rounded-md border border-purple-200/80 dark:border-purple-800/80"
          >
            <span className="text-[11px] font-medium text-purple-700 dark:text-purple-300">
              {selectedIds.length}
            </span>
            <button
              onClick={() => {
                selectedIds.forEach(id => onDeleteEmail(id));
                setSelectedIds([]);
              }}
              className="p-1 hover:text-rose-600 text-slate-400 transition-colors"
              title="Eliminar seleccionados"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </motion.div>
        )}
      </div>

      {/* Email Item Rows List with Buttery Smooth Collapse Animation */}
      <div className="flex-1 overflow-y-auto px-2 py-1.5">
        <AnimatePresence initial={false}>
          {filteredEmails.length === 0 ? (
            <motion.div 
              key={`empty-${filterTab}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center justify-center h-64 text-center p-6 select-none"
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800/60 flex items-center justify-center text-slate-400 mb-2.5">
                <Inbox className="w-6 h-6 stroke-[1.5]" />
              </div>
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                No hay correos
              </p>
              <p className="text-[11px] text-slate-400 max-w-[200px] mt-0.5">
                {filterTab !== 'all' 
                  ? 'No hay mensajes en esta vista.' 
                  : 'Bandeja al día.'}
              </p>
            </motion.div>
          ) : (
            filteredEmails.map((email) => {
              const isSelected = selectedEmail?.id === email.id;
              const isChecked = selectedIds.includes(email.id);

              return (
                <motion.div
                  key={email.id}
                  layout
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ 
                    opacity: { duration: 0.16 },
                    height: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
                    layout: { duration: 0.22, ease: [0.16, 1, 0.3, 1] }
                  }}
                  style={{ overflow: 'hidden' }}
                >
                  <div className="py-0.5">
                    <div
                      onClick={() => onSelectEmail(email)}
                      className={`group relative p-3 rounded-xl cursor-pointer transition-colors duration-150 border select-none ${
                        isSelected 
                          ? 'bg-purple-50/90 dark:bg-purple-950/30 border-purple-200/80 dark:border-purple-800/60 shadow-xs' 
                          : 'bg-white dark:bg-[#1c1c1e] hover:bg-[#f7f7f9] dark:hover:bg-[#252528] border-black/[0.04] dark:border-white/[0.04]'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        {/* Unread dot / Checkbox */}
                        <div className="pt-0.5 shrink-0 flex items-center gap-1.5">
                          <button
                            onClick={(e) => toggleSelectOne(e, email.id)}
                            className="text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            {isChecked ? (
                              <CheckSquare className="w-3.5 h-3.5 text-purple-600" />
                            ) : (
                              <Square className="w-3.5 h-3.5" />
                            )}
                          </button>

                          {email.unread ? (
                            <span className="w-2 h-2 rounded-full bg-purple-600 dark:bg-purple-500 shadow-xs shadow-purple-500/50" />
                          ) : (
                            <span className="w-2 h-2" />
                          )}
                        </div>

                        {/* Email Content Details */}
                        <div className="flex-1 min-w-0">
                          {/* Sender and Time */}
                          <div className="flex items-center justify-between gap-1 mb-0.5">
                            <span className={`text-xs truncate ${
                              email.unread 
                                ? 'font-bold text-slate-900 dark:text-white' 
                                : 'font-medium text-slate-700 dark:text-slate-300'
                            }`}>
                              {email.from?.name || email.from?.email || 'Remitente'}
                            </span>
                            <span className="text-[10px] text-slate-400 dark:text-slate-500 shrink-0 font-normal">
                              {formatEmailDate(email.date)}
                            </span>
                          </div>

                          {/* Subject */}
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className={`text-xs truncate leading-snug ${
                              email.unread 
                                ? 'font-semibold text-slate-800 dark:text-slate-200' 
                                : 'font-normal text-slate-600 dark:text-slate-400'
                            }`}>
                              {email.subject}
                            </span>
                            {email.hasAttachment && (
                              <Paperclip className="w-3 h-3 text-slate-400 shrink-0" />
                            )}
                          </div>

                          {/* 2-line snippet */}
                          <p className="text-[11px] text-slate-400 dark:text-slate-500 line-clamp-2 leading-relaxed">
                            {email.snippet}
                          </p>
                        </div>

                        {/* Star button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleStar(email.id);
                          }}
                          className="p-1 rounded-md text-slate-300 hover:text-amber-400 transition-colors shrink-0"
                        >
                          <Star 
                            className={`w-3.5 h-3.5 transition-transform duration-150 ${
                              email.starred 
                                ? 'fill-amber-400 text-amber-400 scale-110' 
                                : 'hover:scale-110'
                            }`} 
                          />
                        </button>
                      </div>

                      {/* Hover Quick Action Buttons */}
                      <div className="absolute right-2 bottom-2 hidden group-hover:flex items-center gap-1 bg-white dark:bg-[#2c2c2e] p-1 rounded-lg shadow-sm border border-black/[0.06] dark:border-white/[0.08]">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleRead(email.id, email.unread);
                          }}
                          className="p-1 text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                          title={email.unread ? "Marcar como leído" : "Marcar como no leído"}
                        >
                          {email.unread ? <MailOpen className="w-3 h-3" /> : <Mail className="w-3 h-3" />}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteEmail(email.id);
                          }}
                          className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
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
