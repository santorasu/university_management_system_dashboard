import React from 'react';
import {
  LibraryFlowProvider,
  useLibraryFlow,
} from '../../../application/state/library-flow.context';
import { LibraryInventoryScreen } from './LibraryInventoryScreen';
import { BookDetailsLendingScreen } from './BookDetailsLendingScreen';
import { DocumentManagementScreen } from './DocumentManagementScreen';
import { UploadProgressModal } from './components/UploadProgressModal';
import { UploadSuccessModal } from './components/UploadSuccessModal';
import { UploadFailedModal } from './components/UploadFailedModal';
import './Library.css';

interface LibraryRootProps {
  onNavigateToDashboard: () => void;
}

const LibraryFlowCoordinator: React.FC<LibraryRootProps> = ({ onNavigateToDashboard }) => {
  const { subScreen, toast, clearToast } = useLibraryFlow();

  const renderActiveScreen = () => {
    switch (subScreen) {
      case 'BOOK_DETAILS_LENDING':
        return <BookDetailsLendingScreen onNavigateToDashboard={onNavigateToDashboard} />;
      case 'DOCUMENT_MANAGEMENT':
        return <DocumentManagementScreen onNavigateToDashboard={onNavigateToDashboard} />;
      case 'LIBRARY_INVENTORY':
      default:
        return <LibraryInventoryScreen onNavigateToDashboard={onNavigateToDashboard} />;
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
      <UploadProgressModal />
      <UploadSuccessModal />
      <UploadFailedModal />
    </>
  );
};

export const LibraryScreen: React.FC<LibraryRootProps> = (props) => {
  return (
    <LibraryFlowProvider>
      <LibraryFlowCoordinator {...props} />
    </LibraryFlowProvider>
  );
};

export default LibraryScreen;
