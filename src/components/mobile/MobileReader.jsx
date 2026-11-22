import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, 
  Reply, 
  Forward, 
  Trash2, 
  Star, 
  Paperclip, 
  Download, 
  Send,
  MoreVertical
} from 'lucide-react';

export default function MobileReader({
  email,
  onClose,
  onDelete,
  onToggleStar,
  onReply,
  onSendQuickReply,
  folderName = 'Buzón'
}) {
  const [quickReplyText, setQuickReplyText] = useState('');
  const [isSendingReply, setIsSendingReply] = useState(false);
  const [showReplyBox, setShowReplyBox] = useState(false);

  if (!email) return null;

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
    setShowReplyBox(false);
  };

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 28, stiffness: 350 }}
      className="fixed inset-0 z-40 bg-white dark:bg-[#121214] flex flex-col pt-safe select-none overflow-hidden"
    >
      {/* Top iOS Navigation Bar */}
      <div className="h-12 px-3 border-b border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between bg-white/80 dark:bg-[#161618]/80 backdrop-blur-md shrink-0">
        <button
          onClick={onClose}
          className="flex items-center gap-1 text-purple-600 dark:text-purple-400 font-medium text-sm py-1 -ml-1 pr-2 active:opacity-60 transition-opacity"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          <span>{folderName}</span>
        </button>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onToggleStar(email.id)}
            className="p-2 rounded-full text-slate-400 active:scale-90 transition-transform"
          >
            <Star className={`w-4 h-4 ${email.starred ? 'fill-amber-400 text-amber-400' : ''}`} />
          </button>
          <button
            onClick={() => {
              onDelete(email.id);
              onClose();
            }}
            className="p-2 rounded-full text-slate-400 hover:text-rose-600 active:scale-90 transition-transform"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Email Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* Subject Header */}
        <div>
          <h1 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
            {email.subject}
          </h1>
        </div>

        {/* Sender Info Card */}
        <div className="flex items-center justify-between py-2 border-b border-black/[0.04] dark:border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full yahoo-apple-gradient flex items-center justify-center text-white font-bold text-xs shadow-xs">
              {(email.from?.name || email.from?.email || 'U')[0].toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-xs text-slate-900 dark:text-white">
                {email.from?.name || email.from?.email}
              </p>
              <p className="text-[10px] text-slate-400 truncate max-w-[200px]">
                De: {email.from?.email}
              </p>
            </div>
          </div>
          <div className="text-right text-[10px] text-slate-400 shrink-0">
            {email.date ? new Date(email.date).toLocaleDateString([], {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            }) : ''}
          </div>
        </div>

        {/* Attachments if any */}
        {email.attachments && email.attachments.length > 0 && (
          <div className="bg-[#f5f5f7] dark:bg-[#1e1e20] p-3 rounded-2xl border border-black/[0.04] dark:border-white/[0.06] space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300">
              <Paperclip className="w-3.5 h-3.5 text-purple-600" />
              <span>{email.attachments.length} archivo(s)</span>
            </div>
            {email.attachments.map((att, idx) => (
              <div 
                key={idx} 
                className="flex items-center justify-between p-2 bg-white dark:bg-[#252528] rounded-xl border border-black/[0.06] dark:border-white/[0.06]"
              >
                <div className="truncate pr-2">
                  <p className="text-xs font-medium text-slate-800 dark:text-slate-200 truncate">{att.filename}</p>
                  <p className="text-[10px] text-slate-400">{(att.size / 1024).toFixed(1)} KB</p>
                </div>
                <button 
                  onClick={() => alert(`Descargando archivo: ${att.filename}`)}
                  className="p-1.5 text-slate-400 hover:text-purple-600 rounded"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Email Body */}
        <div className="text-slate-800 dark:text-slate-200 text-xs sm:text-sm leading-relaxed min-h-[140px] pb-6">
          {email.html ? (
            <div 
              className="email-content-wrapper" 
              dangerouslySetInnerHTML={{ __html: email.html }} 
            />
          ) : (
            <p className="whitespace-pre-wrap">{email.text || email.snippet}</p>
          )}
        </div>

        {/* Quick Inline Reply if expanded */}
        {showReplyBox && (
          <div className="p-3 bg-[#f5f5f7] dark:bg-[#1c1c1e] rounded-2xl border border-black/[0.06] dark:border-white/[0.08] space-y-2 mt-4">
            <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
              Respuesta rápida a {email.from?.name || email.from?.email}:
            </p>
            <textarea
              rows={3}
              value={quickReplyText}
              onChange={(e) => setQuickReplyText(e.target.value)}
              placeholder="Escribe tu mensaje..."
              className="w-full bg-white dark:bg-[#252528] border border-black/[0.06] dark:border-white/[0.08] rounded-xl p-2.5 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-purple-500/40 resize-none"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowReplyBox(false)}
                className="px-3 py-1.5 text-xs text-slate-500 font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={handleSendReply}
                disabled={!quickReplyText.trim() || isSendingReply}
                className="yahoo-apple-gradient text-white text-xs font-semibold px-4 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm"
              >
                <Send className="w-3 h-3" />
                <span>{isSendingReply ? 'Enviando...' : 'Enviar'}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="h-14 pb-safe border-t border-black/[0.06] dark:border-white/[0.08] bg-white/90 dark:bg-[#161618]/90 backdrop-blur-xl flex items-center justify-around px-4 shrink-0">
        <button
          onClick={() => setShowReplyBox(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 font-semibold text-xs active:scale-95 transition-all"
        >
          <Reply className="w-3.5 h-3.5" />
          <span>Responder</span>
        </button>

        <button
          onClick={() => onReply(email, true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full text-slate-600 dark:text-slate-300 font-medium text-xs active:scale-95 transition-all"
        >
          <Forward className="w-3.5 h-3.5" />
          <span>Reenviar</span>
        </button>
      </div>
    </motion.div>
  );
}
