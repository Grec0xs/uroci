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
  Underline, 
  List, 
  Link2, 
  Smile, 
  Trash2,
  Sparkles
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

  // Sync if initialData changes
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
      <div className="fixed bottom-0 right-8 z-50 bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-800 rounded-t-xl shadow-xl w-72 flex items-center justify-between px-4 py-2.5 cursor-pointer hover:bg-purple-50/50 transition-all">
        <div 
          onClick={() => setIsMinimized(false)}
          className="flex items-center gap-2 truncate font-semibold text-xs text-purple-900 dark:text-purple-300 flex-1"
        >
          <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse"></span>
          <span className="truncate">{subject || 'Nuevo mensaje'}</span>
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={() => setIsMinimized(false)} 
            className="p-1 text-slate-400 hover:text-slate-600 rounded"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
          <button 
            onClick={onClose} 
            className="p-1 text-slate-400 hover:text-slate-600 rounded"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.96 }}
        transition={{ duration: 0.2 }}
        className={`fixed z-50 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-floating flex flex-col overflow-hidden transition-all duration-200 ${
          isMaximized
            ? 'inset-6 max-w-4xl mx-auto my-auto h-[90vh]'
            : 'bottom-4 right-6 w-full max-w-xl h-[560px]'
        }`}
      >
        {/* Header bar (Yahoo style) */}
        <div className="yahoo-gradient px-4 py-3 flex items-center justify-between text-white select-none">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm">Mensaje nuevo</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsMinimized(true)}
              className="p-1 text-white/80 hover:text-white hover:bg-white/10 rounded transition-colors"
              title="Minimizar"
            >
              <Minus className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-1 text-white/80 hover:text-white hover:bg-white/10 rounded transition-colors"
              title={isMaximized ? "Restaurar" : "Maximizar"}
            >
              {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-1 text-white/80 hover:text-white hover:bg-white/10 rounded transition-colors"
              title="Cerrar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between">
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {/* To field */}
            <div className="flex items-center px-4 py-2">
              <label className="w-14 text-xs font-semibold text-slate-400 dark:text-slate-500">Para:</label>
              <input
                type="email"
                required
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="ejemplo@correo.com"
                className="flex-1 text-sm bg-transparent border-none text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-0"
              />
              {!showCc && (
                <button
                  type="button"
                  onClick={() => setShowCc(true)}
                  className="text-xs text-purple-600 dark:text-purple-400 hover:underline font-medium"
                >
                  CC
                </button>
              )}
            </div>

            {/* CC field if toggled */}
            {showCc && (
              <div className="flex items-center px-4 py-2">
                <label className="w-14 text-xs font-semibold text-slate-400 dark:text-slate-500">CC:</label>
                <input
                  type="email"
                  value={cc}
                  onChange={(e) => setCc(e.target.value)}
                  placeholder="copia@correo.com"
                  className="flex-1 text-sm bg-transparent border-none text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-0"
                />
              </div>
            )}

            {/* Subject field */}
            <div className="flex items-center px-4 py-2">
              <label className="w-14 text-xs font-semibold text-slate-400 dark:text-slate-500">Asunto:</label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Asunto del correo"
                className="flex-1 text-sm font-medium bg-transparent border-none text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-0"
              />
            </div>
          </div>

          {/* Body field */}
          <div className="flex-1 p-4">
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Escribe tu mensaje aquí..."
              className="w-full h-full text-sm bg-transparent border-none text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-0 resize-none leading-relaxed"
            />
          </div>

          {/* Bottom Actions & Formatting Toolbar */}
          <div className="p-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/60">
            {/* Formatting tools */}
            <div className="flex items-center gap-1 text-slate-400 dark:text-slate-500">
              <button 
                type="button" 
                onClick={() => setBody(prev => prev + " **texto** ")}
                className="p-1.5 hover:text-purple-600 hover:bg-slate-200/60 dark:hover:bg-slate-800 rounded transition-colors"
                title="Negrita"
              >
                <Bold className="w-4 h-4" />
              </button>
              <button 
                type="button" 
                onClick={() => setBody(prev => prev + " *cursiva* ")}
                className="p-1.5 hover:text-purple-600 hover:bg-slate-200/60 dark:hover:bg-slate-800 rounded transition-colors"
                title="Cursiva"
              >
                <Italic className="w-4 h-4" />
              </button>
              <button 
                type="button" 
                onClick={() => alert("Función para adjuntar archivo")}
                className="p-1.5 hover:text-purple-600 hover:bg-slate-200/60 dark:hover:bg-slate-800 rounded transition-colors"
                title="Adjuntar archivo"
              >
                <Paperclip className="w-4 h-4" />
              </button>
              <button 
                type="button" 
                onClick={() => setBody(prev => prev + " 😊 ")}
                className="p-1.5 hover:text-purple-600 hover:bg-slate-200/60 dark:hover:bg-slate-800 rounded transition-colors"
                title="Emoji"
              >
                <Smile className="w-4 h-4" />
              </button>
            </div>

            {/* Send & Discard */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-rose-600 rounded-lg transition-colors"
                title="Descartar borrador"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                type="submit"
                disabled={isSending}
                className="yahoo-gradient hover:opacity-95 disabled:opacity-50 text-white font-semibold px-5 py-2 rounded-xl text-xs flex items-center gap-2 shadow-md shadow-purple-600/20 active:scale-95 transition-all"
              >
                <Send className={`w-3.5 h-3.5 ${isSending ? 'animate-bounce' : ''}`} />
                <span>{isSending ? 'Enviando...' : 'Enviar'}</span>
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </AnimatePresence>
  );
}
