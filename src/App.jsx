import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import EmailList from './components/EmailList';
import EmailReader from './components/EmailReader';
import ComposeModal from './components/ComposeModal';
import GmailConnectModal from './components/GmailConnectModal';
import Toast from './components/Toast';

export default function App() {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [currentFolder, setCurrentFolder] = useState('inbox');
  const [searchQuery, setSearchQuery] = useState('');
  const [status, setStatus] = useState({ connected: false, email: null, mode: 'demo' });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [composeOpen, setComposeOpen] = useState(false);
  const [composeData, setComposeData] = useState({});
  const [connectModalOpen, setConnectModalOpen] = useState(false);
  const [toast, setToast] = useState(null);
  
  // Theme state: 'light' | 'dark' | 'system'
  const [themeMode, setThemeMode] = useState(() => {
    return localStorage.getItem('uroci_theme_mode') || 'system';
  });

  // Apply theme dynamically including OS system preference listener
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = () => {
      let isDark = false;
      if (themeMode === 'system') {
        isDark = mediaQuery.matches;
      } else {
        isDark = themeMode === 'dark';
      }

      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    applyTheme();
    localStorage.setItem('uroci_theme_mode', themeMode);

    if (themeMode === 'system') {
      mediaQuery.addEventListener('change', applyTheme);
      return () => mediaQuery.removeEventListener('change', applyTheme);
    }
  }, [themeMode]);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Fetch status
  const fetchStatus = useCallback(async () => {
    try {
      const res = await fetch('/api/status');
      if (res.ok) {
        const data = await res.json();
        setStatus(data);
      }
    } catch (err) {
      console.error('Status fetch error:', err);
    }
  }, []);

  // Fetch emails
  const fetchEmails = useCallback(async (showLoader = false) => {
    if (showLoader) setIsRefreshing(true);
    try {
      const params = new URLSearchParams();
      if (currentFolder) params.append('folder', currentFolder);
      if (searchQuery) params.append('search', searchQuery);

      const res = await fetch(`/api/emails?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setEmails(data.emails || []);
      }
    } catch (err) {
      console.error('Email fetch error:', err);
    } finally {
      if (showLoader) {
        setTimeout(() => setIsRefreshing(false), 300);
      }
    }
  }, [currentFolder, searchQuery]);

  // Initial load
  useEffect(() => {
    fetchStatus();
    fetchEmails(true);
  }, [fetchStatus, fetchEmails]);

  // Handle selecting an email
  const handleSelectEmail = async (email) => {
    try {
      const res = await fetch(`/api/emails/${email.id}`);
      if (res.ok) {
        const fullEmail = await res.json();
        setSelectedEmail(fullEmail);
        setEmails(prev => prev.map(e => e.id === email.id ? { ...e, unread: false } : e));
      } else {
        setSelectedEmail(email);
      }
    } catch (err) {
      setSelectedEmail(email);
    }
  };

  // Star/unstar
  const handleToggleStar = async (id) => {
    setEmails(prev => prev.map(e => {
      if (e.id === id) {
        return { ...e, starred: !e.starred };
      }
      return e;
    }));

    if (selectedEmail?.id === id) {
      setSelectedEmail(prev => ({ ...prev, starred: !prev.starred }));
    }

    try {
      await fetch(`/api/emails/${id}/star`, { method: 'POST' });
    } catch (err) {
      console.error('Error toggling star:', err);
    }
  };

  // Toggle read
  const handleToggleRead = async (id, currentUnread) => {
    setEmails(prev => prev.map(e => {
      if (e.id === id) {
        return { ...e, unread: !currentUnread };
      }
      return e;
    }));

    try {
      await fetch(`/api/emails/${id}/read`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ read: currentUnread }),
      });
      showToast(currentUnread ? 'Marcado como leído' : 'Marcado como no leído', 'info');
    } catch (err) {
      console.error('Error toggling read:', err);
    }
  };

  // Delete
  const handleDeleteEmail = async (id) => {
    setEmails(prev => prev.filter(e => e.id !== id));
    if (selectedEmail?.id === id) {
      setSelectedEmail(null);
    }

    try {
      await fetch(`/api/emails/${id}`, { method: 'DELETE' });
      showToast('Correo eliminado', 'success');
    } catch (err) {
      console.error('Error deleting email:', err);
    }
  };

  // Send email
  const handleSendEmail = async ({ to, subject, body }) => {
    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to, subject, body }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Error al enviar');
      }

      showToast('¡Correo enviado con éxito!', 'success');
      fetchEmails();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // Reply from reader
  const handleReplyFromReader = (email, isForward = false) => {
    setComposeData({
      to: isForward ? '' : email.from.email,
      subject: isForward ? `Fwd: ${email.subject}` : `Re: ${email.subject}`,
      body: `\n\n--- Mensaje original ---\nDe: ${email.from.name} <${email.from.email}>\nFecha: ${email.date}\nAsunto: ${email.subject}\n\n${email.text || ''}`,
    });
    setComposeOpen(true);
  };

  const unreadCount = emails.filter(e => e.unread).length;

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#f5f5f7] dark:bg-[#121214] text-slate-800 dark:text-slate-100">
      {/* Top Navbar */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isRefreshing={isRefreshing}
        onRefresh={() => fetchEmails(true)}
        themeMode={themeMode}
        setThemeMode={setThemeMode}
        status={status}
        onOpenConnectModal={() => setConnectModalOpen(true)}
      />

      {/* Main Layout Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <Sidebar
          currentFolder={currentFolder}
          setCurrentFolder={(folder) => {
            setCurrentFolder(folder);
            setSelectedEmail(null);
          }}
          unreadCount={unreadCount}
          onOpenCompose={() => {
            setComposeData({});
            setComposeOpen(true);
          }}
          onOpenConnectModal={() => setConnectModalOpen(true)}
          status={status}
        />

        {/* Email List Pane */}
        <EmailList
          emails={emails}
          selectedEmail={selectedEmail}
          onSelectEmail={handleSelectEmail}
          onToggleStar={handleToggleStar}
          onToggleRead={handleToggleRead}
          onDeleteEmail={handleDeleteEmail}
          currentFolder={currentFolder}
        />

        {/* Email Reader Pane */}
        <div className={`flex-1 ${!selectedEmail ? 'hidden lg:flex' : 'flex'}`}>
          <EmailReader
            email={selectedEmail}
            onClose={() => setSelectedEmail(null)}
            onDelete={handleDeleteEmail}
            onToggleStar={handleToggleStar}
            onReply={handleReplyFromReader}
            onSendQuickReply={handleSendEmail}
          />
        </div>
      </div>

      {/* Floating Compose Window */}
      <ComposeModal
        isOpen={composeOpen}
        onClose={() => setComposeOpen(false)}
        onSend={handleSendEmail}
        initialData={composeData}
      />

      {/* Gmail Connection Settings Modal */}
      <GmailConnectModal
        isOpen={connectModalOpen}
        onClose={() => setConnectModalOpen(false)}
        status={status}
        onConnectSuccess={(data) => {
          fetchStatus();
          fetchEmails(true);
          showToast(`¡Conectado con ${data.email}!`, 'success');
        }}
        onDisconnect={() => {
          fetchStatus();
          fetchEmails(true);
          showToast('Desconectado. Modo demostración.', 'info');
        }}
      />

      {/* Notification Toast */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
