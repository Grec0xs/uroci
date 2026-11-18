import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Reply, 
  Forward, 
  Trash2, 
  Printer, 
  Mail, 
  Star, 
  MoreHorizontal, 
  Paperclip, 
  Download, 
  Send, 
  X,
  ArrowLeft,
  Sparkles,
  ExternalLink
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
      <div className="flex-1 flex flex-col items-center justify-center h-[calc(100vh-4rem)] bg-slate-50/50 dark:bg-slate-900/40 text-slate-400 p-8 select-none">
        <div className="w-20 h-20 rounded-2xl bg-purple-100/50 dark:bg-purple-950/40 flex items-center justify-center text-purple-500 mb-4 shadow-xs">
          <Mail className="w-10 h-10 stroke-[1.5]" />
        </div>
        <h3 className="font-semibold text-slate-700 dark:text-slate-300 text-lg mb-1">
          Ningún correo seleccionado
        </h3>
        <p className="text-xs text-slate-400 max-w-xs text-center">
          Haz clic en cualquier mensaje de la lista para leer su contenido, responder o gestionar archivos adjuntos.
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
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.2 }}
      className="flex-1 flex flex-col h-[calc(100vh-4rem)] bg-white dark:bg-slate-900 overflow-hidden"
    >
      {/* Top Action Toolbar */}
      <div className="h-13 px-5 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between bg-slate-50/40 dark:bg-slate-900/60 select-none">
        <div className="flex items-center gap-1.5">
          <button 
            onClick={onClose}
            className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg mr-1"
            title="Volver"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => onReply(email)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg shadow-2xs transition-colors"
          >
            <Reply className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span>Responder</span>
          </button>

          <button
            onClick={() => onReply(email, true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <Forward className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reenviar</span>
          </button>

          <button
            onClick={() => onDelete(email.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Eliminar</span>
          </button>

          <button
            onClick={handlePrint}
            className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            title="Imprimir"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggleStar(email.id)}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={email.starred ? "Quitar de destacados" : "Destacar"}
          >
            <Star className={`w-4 h-4 ${email.starred ? 'fill-amber-400 text-amber-400' : 'text-slate-400'}`} />
          </button>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            title="Cerrar vista"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Email Body & Details Container */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        {/* Email Header */}
        <div className="border-b border-slate-100 dark:border-slate-800/80 pb-5">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white leading-snug mb-4">
            {email.subject}
          </h1>

          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full yahoo-gradient flex items-center justify-center text-white font-bold text-sm shadow-sm">
                {senderInitial}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-slate-900 dark:text-white">
                    {email.from?.name || email.from?.email}
                  </span>
                  <span className="text-xs text-slate-400 dark:text-slate-500">
                    &lt;{email.from?.email}&gt;
                  </span>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Para: <span className="text-slate-700 dark:text-slate-300">mí</span>
                </div>
              </div>
            </div>

            <div className="text-right text-xs text-slate-400 dark:text-slate-500 shrink-0">
              {email.date ? new Date(email.date).toLocaleString('es-MX', {
                dateStyle: 'medium',
                timeStyle: 'short'
              }) : ''}
            </div>
          </div>
        </div>

        {/* Attachments Section if present */}
        {email.attachments && email.attachments.length > 0 && (
          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200/70 dark:border-slate-700 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
              <Paperclip className="w-3.5 h-3.5 text-purple-600" />
              <span>{email.attachments.length} archivo(s) adjunto(s)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {email.attachments.map((att, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center justify-between p-2.5 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-purple-300 transition-colors"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <div className="w-7 h-7 rounded bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 flex items-center justify-center text-[10px] font-bold uppercase shrink-0">
                      {att.filename.split('.').pop() || 'FILE'}
                    </div>
                    <div className="truncate">
                      <p className="text-xs font-medium text-slate-800 dark:text-slate-200 truncate">{att.filename}</p>
                      <p className="text-[10px] text-slate-400">{(att.size / 1024).toFixed(1)} KB</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => alert(`Descargando archivo simulado: ${att.filename}`)}
                    className="p-1.5 text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 rounded transition-colors"
                    title="Descargar"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Render HTML or Text Body */}
        <div className="prose dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 text-sm leading-relaxed overflow-x-auto min-h-[160px]">
          {email.html ? (
            <div 
              className="email-content-wrapper" 
              dangerouslySetInnerHTML={{ __html: email.html }} 
            />
          ) : (
            <p className="whitespace-pre-wrap">{email.text || email.snippet}</p>
          )}
        </div>

        {/* Quick Inline Reply Box at Bottom */}
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
          <div className="bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-3.5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
              <Reply className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span>Respuesta rápida a {email.from?.name || email.from?.email}</span>
            </div>
            <textarea
              rows={3}
              value={quickReplyText}
              onChange={(e) => setQuickReplyText(e.target.value)}
              placeholder="Escribe tu respuesta aquí..."
              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10 transition-all resize-none"
            />
            <div className="flex justify-end">
              <button
                onClick={handleSendReply}
                disabled={!quickReplyText.trim() || isSendingReply}
                className="yahoo-gradient hover:opacity-95 disabled:opacity-50 text-white text-xs font-semibold px-4 py-2 rounded-xl flex items-center gap-2 shadow-sm transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSendingReply ? 'Enviando...' : 'Enviar respuesta'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
