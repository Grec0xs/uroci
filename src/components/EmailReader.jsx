import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Reply, 
  Forward, 
  Trash2, 
  Printer, 
  Mail, 
  Star, 
  Paperclip, 
  Download, 
  Send, 
  X,
  ArrowLeft
} from 'lucide-react';

export default function EmailReader({ 
  email, 
  onClose, 
  onDelete, 
  onToggleStar, 
  onReply, 
  onSendQuickReply 
}) {
  const [quickReplyText, setQuickReplyText] = useState('');
  const [isSendingReply, setIsSendingReply] = useState(false);

  if (!email) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center h-[calc(100vh-3.5rem)] bg-[#fbfbfd] dark:bg-[#121214] text-slate-400 p-8 select-none">
        <div className="w-14 h-14 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.04] dark:border-white/[0.06] flex items-center justify-center text-slate-300 dark:text-slate-600 mb-3">
          <Mail className="w-7 h-7 stroke-[1.2]" />
        </div>
        <p className="font-medium text-slate-600 dark:text-slate-400 text-xs">
          Ningún mensaje seleccionado
        </p>
      </div>
    );
  }

  const handleSendReply = async () => {
    if (!quickReplyText.trim()) return;
    setIsSendingReply(true);
    await onSendQuickReply({
      to: email.from.email,
      subject: `Re: ${email.subject}`,
      body: quickReplyText,
    });
    setQuickReplyText('');
    setIsSendingReply(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const senderInitial = (email.from?.name || email.from?.email || 'U')[0].toUpperCase();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.15 }}
      className="flex-1 flex flex-col h-[calc(100vh-3.5rem)] bg-white dark:bg-[#161618] overflow-hidden"
    >
      {/* Top Action Toolbar - Apple Mail minimalist toolbar */}
      <div className="h-12 px-4 border-b border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between bg-[#fbfbfd]/70 dark:bg-[#161618]/70 backdrop-blur-md select-none">
        <div className="flex items-center gap-1">
          <button 
            onClick={onClose}
            className="lg:hidden p-1.5 text-slate-500 hover:bg-black/[0.04] rounded-md mr-1"
            title="Volver"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => onReply(email)}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-black/[0.04] dark:hover:bg-white/[0.06] rounded-md transition-colors"
          >
            <Reply className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span>Responder</span>
          </button>

          <button
            onClick={() => onReply(email, true)}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-black/[0.04] dark:hover:bg-white/[0.06] rounded-md transition-colors"
          >
            <Forward className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reenviar</span>
          </button>

          <button
            onClick={() => onDelete(email.id)}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-rose-600 hover:bg-rose-50/50 dark:hover:bg-rose-950/20 rounded-md transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Eliminar</span>
          </button>

          <button
            onClick={handlePrint}
            className="p-1.5 text-slate-500 hover:bg-black/[0.04] dark:hover:bg-white/[0.06] rounded-md transition-colors"
            title="Imprimir"
          >
            <Printer className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onToggleStar(email.id)}
            className="p-1.5 rounded-md hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-colors"
            title={email.starred ? "Quitar de destacados" : "Destacar"}
          >
            <Star className={`w-3.5 h-3.5 ${email.starred ? 'fill-amber-400 text-amber-400' : 'text-slate-400'}`} />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-black/[0.04] dark:hover:bg-white/[0.06] rounded-md transition-colors"
            title="Cerrar vista"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Email Body & Details Container */}
      <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
        {/* Email Header */}
        <div className="border-b border-black/[0.06] dark:border-white/[0.08] pb-5">
          <h1 className="text-lg font-semibold text-slate-900 dark:text-white leading-snug mb-3">
            {email.subject}
          </h1>

          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full yahoo-apple-gradient flex items-center justify-center text-white font-semibold text-xs shadow-xs">
                {senderInitial}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-xs text-slate-900 dark:text-white">
                    {email.from?.name || email.from?.email}
                  </span>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500">
                    &lt;{email.from?.email}&gt;
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 dark:text-slate-500">
                  Para: <span className="text-slate-600 dark:text-slate-300">mí</span>
                </div>
              </div>
            </div>

            <div className="text-right text-[11px] text-slate-400 dark:text-slate-500 shrink-0">
              {email.date ? new Date(email.date).toLocaleString('es-MX', {
                dateStyle: 'medium',
                timeStyle: 'short'
              }) : ''}
            </div>
          </div>
        </div>

        {/* Attachments Section if present */}
        {email.attachments && email.attachments.length > 0 && (
          <div className="bg-[#f5f5f7] dark:bg-[#1e1e20] p-3 rounded-xl border border-black/[0.04] dark:border-white/[0.06] space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300">
              <Paperclip className="w-3.5 h-3.5 text-purple-600" />
              <span>{email.attachments.length} archivo(s) adjunto(s)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {email.attachments.map((att, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center justify-between p-2 bg-white dark:bg-[#252528] rounded-lg border border-black/[0.06] dark:border-white/[0.06]"
                >
                  <div className="truncate pr-2">
                    <p className="text-xs font-medium text-slate-800 dark:text-slate-200 truncate">{att.filename}</p>
                    <p className="text-[10px] text-slate-400">{(att.size / 1024).toFixed(1)} KB</p>
                  </div>
                  <button 
                    onClick={() => alert(`Descargando archivo: ${att.filename}`)}
                    className="p-1 text-slate-400 hover:text-purple-600 rounded transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Message Content */}
        <div className="text-slate-800 dark:text-slate-200 text-xs sm:text-sm leading-relaxed overflow-x-auto min-h-[140px]">
          {email.html ? (
            <div 
              className="email-content-wrapper" 
              dangerouslySetInnerHTML={{ __html: email.html }} 
            />
          ) : (
            <p className="whitespace-pre-wrap">{email.text || email.snippet}</p>
          )}
        </div>

        {/* Quick Inline Reply Box - Apple Mail clean style */}
        <div className="pt-4 border-t border-black/[0.06] dark:border-white/[0.08]">
          <div className="bg-[#f9f9fb] dark:bg-[#1c1c1e] rounded-xl border border-black/[0.06] dark:border-white/[0.08] p-3 space-y-2.5">
            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-300">
              <Reply className="w-3 h-3 text-purple-600 dark:text-purple-400" />
              <span>Respuesta a {email.from?.name || email.from?.email}</span>
            </div>
            <textarea
              rows={3}
              value={quickReplyText}
              onChange={(e) => setQuickReplyText(e.target.value)}
              placeholder="Escribe una respuesta rápida..."
              className="w-full bg-white dark:bg-[#252528] border border-black/[0.06] dark:border-white/[0.08] rounded-lg p-2.5 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-purple-500/40 transition-all resize-none"
            />
            <div className="flex justify-end">
              <button
                onClick={handleSendReply}
                disabled={!quickReplyText.trim() || isSendingReply}
                className="yahoo-apple-gradient hover:brightness-105 disabled:opacity-40 text-white text-xs font-medium px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all"
              >
                <Send className="w-3 h-3" />
                <span>{isSendingReply ? 'Enviando...' : 'Enviar'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
