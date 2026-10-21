import React from 'react';
import {
  NoticesFlowProvider,
  useNoticesFlow,
} from '../../../application/state/notices-flow.context';
import { NoticesOverviewScreen } from './NoticesOverviewScreen';
import { NoticesCreateEditScreen } from './NoticesCreateEditScreen';
import { MessagesInboxScreen } from './MessagesInboxScreen';
import { NotificationHistoryScreen } from './NotificationHistoryScreen';
import { NoticePreviewModal } from './components/NoticePreviewModal';
import { ComposeMessageModal } from './components/ComposeMessageModal';
import { MessageSentModal } from './components/MessageSentModal';
import { ExportCompleteModal } from './components/ExportCompleteModal';
import './Notices.css';

interface NoticesRootProps {
  onNavigateToDashboard: () => void;
}

const NoticesFlowCoordinator: React.FC<NoticesRootProps> = ({ onNavigateToDashboard }) => {
  const { subScreen, toast, clearToast } = useNoticesFlow();

  const renderActiveScreen = () => {
    switch (subScreen) {
      case 'NOTICES_CREATE_EDIT':
        return <NoticesCreateEditScreen onNavigateToDashboard={onNavigateToDashboard} />;
      case 'MESSAGES_INBOX':
        return <MessagesInboxScreen onNavigateToDashboard={onNavigateToDashboard} />;
      case 'NOTIFICATIONS_HISTORY':
        return <NotificationHistoryScreen onNavigateToDashboard={onNavigateToDashboard} />;
      case 'NOTICES_OVERVIEW':
      default:
        return <NoticesOverviewScreen onNavigateToDashboard={onNavigateToDashboard} />;
    }
  };

  return (
    <>
      {/* Toast Alert Banner */}
      {toast && (
        <div
          style={{
            position: 'fixed',
            top: 24,
            right: 24,
            zIndex: 9999,
            backgroundColor:
              toast.type === 'success' ? '#148557' : toast.type === 'error' ? '#BF2E33' : '#3659D9',
            color: '#ffffff',
            padding: '12px 20px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          <span>{toast.type === 'success' ? '✓' : toast.type === 'error' ? '⚠️' : 'ℹ️'}</span>
          <span>{toast.message}</span>
          <button
            type="button"
            onClick={clearToast}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#ffffff',
              fontSize: '16px',
              cursor: 'pointer',
              marginLeft: '8px',
              padding: 0,
            }}
          >
            ×
          </button>
        </div>
      )}

      {/* Screen View */}
      {renderActiveScreen()}

      {/* Modals */}
      <NoticePreviewModal />
      <ComposeMessageModal />
      <MessageSentModal />
      <ExportCompleteModal />
    </>
  );
};

export const NoticesScreen: React.FC<NoticesRootProps> = (props) => {
  return (
    <NoticesFlowProvider>
      <NoticesFlowCoordinator {...props} />
    </NoticesFlowProvider>
  );
};

export default NoticesScreen;
