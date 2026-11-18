import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Minus, 
  Maximize2, 
  Minimize2, 
  Send, 
  Paperclip, 
  Bold, 
  Italic, 
  Trash2,
  Smile
} from 'lucide-react';

export default function ComposeModal({ 
  isOpen, 
  onClose, 
  onSend, 
  initialData = {} 
}) {
  const [to, setTo] = useState(initialData.to || '');
  const [cc, setCc] = useState('');
  const [showCc, setShowCc] = useState(false);
  const [subject, setSubject] = useState(initialData.subject || '');
  const [body, setBody] = useState(initialData.body || '');
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isSending, setIsSending] = useState(false);

  React.useEffect(() => {
    if (initialData.to !== undefined) setTo(initialData.to);
    if (initialData.subject !== undefined) setSubject(initialData.subject);
    if (initialData.body !== undefined) setBody(initialData.body);
  }, [initialData]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!to || !subject) {
      alert('Por favor ingresa un destinatario y el asunto.');
      return;
    }

    setIsSending(true);
    await onSend({ to, cc, subject, body });
    setIsSending(false);
    setTo('');
    setCc('');
    setSubject('');
    setBody('');
    onClose();
  };

  // Minimized floating bar
  if (isMinimized) {
    return (
      <div className="fixed bottom-0 right-6 z-50 bg-white dark:bg-[#1e1e20] border border-black/[0.08] dark:border-white/[0.08] rounded-t-xl shadow-lg w-72 flex items-center justify-between px-3.5 py-2 cursor-pointer hover:bg-slate-50 transition-all select-none">
        <div 
          onClick={() => setIsMinimized(false)}
          className="flex items-center gap-2 truncate font-medium text-xs text-slate-800 dark:text-slate-200 flex-1"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
          <span className="truncate">{subject || 'Nuevo mensaje'}</span>
        </div>
        <div className="flex items-center gap-1 text-slate-400">
          <button onClick={() => setIsMinimized(false)} className="p-1 hover:text-slate-600">
            <Maximize2 className="w-3 h-3" />
          </button>
          <button onClick={onClose} className="p-1 hover:text-slate-600">
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 15, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 15, scale: 0.98 }}
        transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed z-50 bg-white dark:bg-[#1c1c1e] border border-black/[0.08] dark:border-white/[0.08] rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-150 ${
          isMaximized
            ? 'inset-6 max-w-4xl mx-auto my-auto h-[90vh]'
            : 'bottom-4 right-6 w-full max-w-lg h-[500px]'
        }`}
      >
        {/* Apple window style header */}
        <div className="px-4 py-2.5 bg-[#f5f5f7]/80 dark:bg-[#252528]/80 border-b border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 mr-2">
              <button 
                type="button" 
                onClick={onClose}
                className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e] hover:brightness-90 transition-all"
                title="Cerrar"
              />
              <button 
                type="button" 
                onClick={() => setIsMinimized(true)}
                className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123] hover:brightness-90 transition-all"
                title="Minimizar"
              />
              <button 
                type="button" 
                onClick={() => setIsMaximized(!isMaximized)}
                className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29] hover:brightness-90 transition-all"
                title="Maximizar"
              />
            </div>
            <span className="font-semibold text-xs text-slate-800 dark:text-slate-200">
              Nuevo mensaje
            </span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between">
          <div className="divide-y divide-black/[0.04] dark:divide-white/[0.04]">
            {/* To */}
            <div className="flex items-center px-4 py-2">
              <label className="w-12 text-xs text-slate-400 dark:text-slate-500 font-medium">Para:</label>
              <input
                type="email"
                required
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="destinatario@correo.com"
                className="flex-1 text-xs bg-transparent border-none text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-0"
              />
              {!showCc && (
                <button
                  type="button"
                  onClick={() => setShowCc(true)}
                  className="text-[11px] text-purple-600 dark:text-purple-400 hover:underline"
                >
                  CC
                </button>
              )}
            </div>

            {/* CC */}
            {showCc && (
              <div className="flex items-center px-4 py-2">
                <label className="w-12 text-xs text-slate-400 dark:text-slate-500 font-medium">CC:</label>
                <input
                  type="email"
                  value={cc}
                  onChange={(e) => setCc(e.target.value)}
                  placeholder="copia@correo.com"
                  className="flex-1 text-xs bg-transparent border-none text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-0"
                />
              </div>
            )}

            {/* Subject */}
            <div className="flex items-center px-4 py-2">
              <label className="w-12 text-xs text-slate-400 dark:text-slate-500 font-medium">Asunto:</label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Escribe el asunto"
                className="flex-1 text-xs font-medium bg-transparent border-none text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-0"
              />
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 p-4">
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Escribe el contenido..."
              className="w-full h-full text-xs bg-transparent border-none text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-0 resize-none leading-relaxed"
            />
          </div>

          {/* Bottom Toolbar */}
          <div className="p-2.5 border-t border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between bg-[#fbfbfd] dark:bg-[#1c1c1e]">
            <div className="flex items-center gap-0.5 text-slate-400">
              <button 
                type="button" 
                onClick={() => setBody(prev => prev + " **texto** ")}
                className="p-1 hover:text-slate-700 dark:hover:text-white rounded"
                title="Negrita"
              >
                <Bold className="w-3.5 h-3.5" />
              </button>
              <button 
                type="button" 
                onClick={() => setBody(prev => prev + " *cursiva* ")}
                className="p-1 hover:text-slate-700 dark:hover:text-white rounded"
                title="Cursiva"
              >
                <Italic className="w-3.5 h-3.5" />
              </button>
              <button 
                type="button" 
                onClick={() => alert("Adjuntar archivo")}
                className="p-1 hover:text-slate-700 dark:hover:text-white rounded"
                title="Adjuntar archivo"
              >
                <Paperclip className="w-3.5 h-3.5" />
              </button>
              <button 
                type="button" 
                onClick={() => setBody(prev => prev + " 😊 ")}
                className="p-1 hover:text-slate-700 dark:hover:text-white rounded"
                title="Emoji"
              >
                <Smile className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="p-1 text-slate-400 hover:text-rose-600 rounded"
                title="Descartar"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <button
                type="submit"
                disabled={isSending}
                className="yahoo-apple-gradient hover:brightness-105 disabled:opacity-40 text-white font-medium px-4 py-1.5 rounded-lg text-xs flex items-center gap-1.5 shadow-sm transition-all"
              >
                <Send className="w-3 h-3" />
                <span>{isSending ? 'Enviando...' : 'Enviar'}</span>
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </AnimatePresence>
  );
}
