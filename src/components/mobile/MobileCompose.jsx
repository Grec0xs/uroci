import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, Paperclip, Smile } from 'lucide-react';

export default function MobileCompose({
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

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 350 }}
        className="fixed inset-0 z-50 bg-white dark:bg-[#1c1c1e] flex flex-col pt-safe select-none"
      >
        {/* Navigation Bar */}
        <div className="h-12 px-4 border-b border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between bg-[#fbfbfd]/80 dark:bg-[#161618]/80 backdrop-blur-md shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-medium text-slate-500 active:opacity-60"
          >
            Cancelar
          </button>

          <span className="font-semibold text-xs text-slate-900 dark:text-white">
            Nuevo mensaje
          </span>

          <button
            onClick={handleSubmit}
            disabled={isSending || !to || !subject}
            className="yahoo-apple-gradient text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-xs disabled:opacity-40 active:scale-95 transition-all flex items-center gap-1"
          >
            <Send className="w-3 h-3" />
            <span>{isSending ? '...' : 'Enviar'}</span>
          </button>
        </div>

        {/* Input Fields */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between overflow-hidden">
          <div className="divide-y divide-black/[0.04] dark:divide-white/[0.04] bg-white dark:bg-[#1c1c1e]">
            {/* To field */}
            <div className="flex items-center px-4 py-2.5">
              <label className="w-14 text-xs font-medium text-slate-400">Para:</label>
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
                  className="text-xs text-purple-600 dark:text-purple-400 font-medium"
                >
                  CC
                </button>
              )}
            </div>

            {/* CC field */}
            {showCc && (
              <div className="flex items-center px-4 py-2.5">
                <label className="w-14 text-xs font-medium text-slate-400">CC:</label>
                <input
                  type="email"
                  value={cc}
                  onChange={(e) => setCc(e.target.value)}
                  placeholder="copia@correo.com"
                  className="flex-1 text-xs bg-transparent border-none text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-0"
                />
              </div>
            )}

            {/* Subject field */}
            <div className="flex items-center px-4 py-2.5">
              <label className="w-14 text-xs font-medium text-slate-400">Asunto:</label>
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

          {/* Body field */}
          <div className="flex-1 p-4 bg-white dark:bg-[#1c1c1e]">
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Escribe tu mensaje aquí..."
              className="w-full h-full text-xs sm:text-sm bg-transparent border-none text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-0 resize-none leading-relaxed"
            />
          </div>

          {/* Bottom accessory bar */}
          <div className="h-11 pb-safe px-4 border-t border-black/[0.04] dark:border-white/[0.06] bg-[#fbfbfd] dark:bg-[#161618] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3 text-slate-400">
              <button
                type="button"
                onClick={() => alert("Adjuntar archivo")}
                className="p-1.5 hover:text-purple-600"
              >
                <Paperclip className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setBody(prev => prev + " 😊 ")}
                className="p-1.5 hover:text-purple-600"
              >
                <Smile className="w-4 h-4" />
              </button>
            </div>
            <span className="text-[10px] text-slate-400">
              Uroci Mail para iOS
            </span>
          </div>
        </form>
      </motion.div>
    </AnimatePresence>
  );
}
