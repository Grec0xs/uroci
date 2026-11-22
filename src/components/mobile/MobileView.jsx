import React, { useState, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import MobileHeader from './MobileHeader';
import MobileBottomBar from './MobileBottomBar';
import MobileFolderSheet from './MobileFolderSheet';
import MobileReader from './MobileReader';
import MobileCompose from './MobileCompose';
import EmailList from '../EmailList';
import GmailConnectModal from '../GmailConnectModal';

const folderDisplayNames = {
  inbox: 'Buzón de Entrada',
  starred: 'Destacados',
  sent: 'Enviados',
  drafts: 'Borradores',
  archive: 'Archivo',
  spam: 'Spam',
  trash: 'Papelera'
};

export default function MobileView({
  emails,
  selectedEmail,
  setSelectedEmail,
  currentFolder,
  setCurrentFolder,
  searchQuery,
  setSearchQuery,
  status,
  isRefreshing,
  onRefresh,
  themeMode,
  setThemeMode,
  onToggleStar,
  onToggleRead,
  onDeleteEmail,
  onSendEmail,
  unreadCount,
  composeOpen,
  setComposeOpen,
  composeData,
  setComposeData,
  connectModalOpen,
  setConnectModalOpen,
  fetchStatus,
  fetchEmails,
  showToast
}) {
  const [filterTab, setFilterTab] = useState('all');
  const [folderSheetOpen, setFolderSheetOpen] = useState(false);

  // Filter emails for list
  const filteredEmails = useMemo(() => {
    return emails.filter(email => {
      if (filterTab === 'unread') return email.unread;
      if (filterTab === 'starred') return email.starred;
      return true;
    });
  }, [emails, filterTab]);

  const handleReply = (email, isForward = false) => {
    setComposeData({
      to: isForward ? '' : email.from.email,
      subject: isForward ? `Fwd: ${email.subject}` : `Re: ${email.subject}`,
      body: `\n\n--- Mensaje original ---\nDe: ${email.from.name} <${email.from.email}>\nFecha: ${email.date}\nAsunto: ${email.subject}\n\n${email.text || ''}`,
    });
    setComposeOpen(true);
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#f5f5f7] dark:bg-[#121214] text-slate-800 dark:text-slate-100 relative">
      {/* Mobile Header with Folder Selector & Search */}
      <MobileHeader
        currentFolder={currentFolder}
        onOpenFolderSheet={() => setFolderSheetOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isRefreshing={isRefreshing}
        onRefresh={onRefresh}
        themeMode={themeMode}
        setThemeMode={setThemeMode}
        filterTab={filterTab}
        setFilterTab={setFilterTab}
        unreadCount={unreadCount}
      />

      {/* Main Email List Area */}
      <div className="flex-1 overflow-y-auto px-2 py-1">
        <EmailList
          emails={emails}
          selectedEmail={selectedEmail}
          onSelectEmail={setSelectedEmail}
          onToggleStar={onToggleStar}
          onToggleRead={onToggleRead}
          onDeleteEmail={onDeleteEmail}
          currentFolder={currentFolder}
        />
      </div>

      {/* Bottom Tab Bar */}
      <MobileBottomBar
        currentFolder={currentFolder}
        onSelectFolder={(folder) => {
          setCurrentFolder(folder);
          setSelectedEmail(null);
        }}
        unreadCount={unreadCount}
        onOpenCompose={() => {
          setComposeData({});
          setComposeOpen(true);
        }}
        onOpenFolderSheet={() => setFolderSheetOpen(true)}
        onOpenConnectModal={() => setConnectModalOpen(true)}
        status={status}
      />

      {/* Full Screen Slide-in Reader for Mobile */}
      <AnimatePresence>
        {selectedEmail && (
          <MobileReader
            email={selectedEmail}
            onClose={() => setSelectedEmail(null)}
            onDelete={onDeleteEmail}
            onToggleStar={onToggleStar}
            onReply={handleReply}
            onSendQuickReply={onSendEmail}
            folderName={folderDisplayNames[currentFolder] || 'Buzón'}
          />
        )}
      </AnimatePresence>

      {/* iOS Folder Bottom Sheet */}
      <MobileFolderSheet
        isOpen={folderSheetOpen}
        onClose={() => setFolderSheetOpen(false)}
        currentFolder={currentFolder}
        onSelectFolder={(folder) => {
          setCurrentFolder(folder);
          setSelectedEmail(null);
        }}
        unreadCount={unreadCount}
        status={status}
        onOpenConnectModal={() => setConnectModalOpen(true)}
      />

      {/* Mobile Compose Modal */}
      <MobileCompose
        isOpen={composeOpen}
        onClose={() => setComposeOpen(false)}
        onSend={onSendEmail}
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
    </div>
  );
}
