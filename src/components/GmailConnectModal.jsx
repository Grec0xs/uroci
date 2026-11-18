import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  KeyRound, 
  Mail, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck,
  Lock,
  Loader2
} from 'lucide-react';

export default function GmailConnectModal({ 
  isOpen, 
  onClose, 
  status, 
  onConnectSuccess, 
  onDisconnect 
}) {
  const [email, setEmail] = useState(status?.email || '');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleConnect = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Error al conectar con Gmail');
      }

      onConnectSuccess(data);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = async () => {
    setLoading(true);
    try {
      await fetch('/api/disconnect', { method: 'POST' });
      onDisconnect();
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="yahoo-gradient p-6 text-white relative">
          <button 
            onClick={onClose}
            className="absolute top-5 right-5 p-1 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-xs">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Conectar cuenta de Gmail</h2>
              <p className="text-xs text-white/80">Recibe y lee tus correos de @gmail.com aquí</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Guide Steps */}
          <div className="bg-purple-50/70 dark:bg-purple-950/40 p-4 rounded-2xl border border-purple-100 dark:border-purple-900/50 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-bold text-purple-950 dark:text-purple-200">
              <ShieldCheck className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span>¿Cómo funciona la conexión segura con Gmail?</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Google requiere una <strong>Contraseña de Aplicación</strong> de 16 caracteres para clientes de correo externos:
            </p>
            <ol className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 list-decimal list-inside pl-1">
              <li>Ingresa a tu cuenta de Google &gt; <strong>Seguridad</strong>.</li>
              <li>Busca <strong>Contraseñas de aplicaciones</strong> (o abre el enlace de abajo).</li>
              <li>Genera una contraseña nueva (ej: "Uroci Mail") y copia los 16 caracteres.</li>
            </ol>
            <div className="pt-1">
              <a 
                href="https://myaccount.google.com/apppasswords" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-700 dark:text-purple-300 hover:underline"
              >
                <span>Abrir Google Contraseñas de aplicaciones</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 rounded-xl flex items-center gap-2.5 text-xs text-rose-700 dark:text-rose-300">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleConnect} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Correo electrónico (@gmail.com)
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu.cuenta@gmail.com"
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:border-purple-500 focus:outline-none dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Contraseña de aplicación de Google (16 caracteres)
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="xxxx xxxx xxxx xxxx"
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:border-purple-500 focus:outline-none dark:text-white"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between gap-3">
              {status?.connected ? (
                <button
                  type="button"
                  onClick={handleDisconnect}
                  disabled={loading}
                  className="px-4 py-2.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors border border-rose-200 dark:border-rose-900"
                >
                  Desconectar y volver a Demo
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                >
                  Continuar en Demo
                </button>
              )}

              <button
                type="submit"
                disabled={loading}
                className="yahoo-gradient hover:opacity-95 text-white text-xs font-bold px-6 py-2.5 rounded-xl flex items-center gap-2 shadow-md shadow-purple-600/20 disabled:opacity-50 transition-all"
              >
                {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>{loading ? 'Verificando con Google...' : 'Conectar Gmail'}</span>
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
