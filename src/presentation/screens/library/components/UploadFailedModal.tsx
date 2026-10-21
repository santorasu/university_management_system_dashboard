import React from 'react';
import { useLibraryFlow } from '../../../../application/state/library-flow.context';

export const UploadFailedModal: React.FC = () => {
  const {
    uploadFailedModalOpen,
    closeUploadFailedModal,
    openUploadProgressModal,
    goToDocumentManagement,
  } = useLibraryFlow();

  if (!uploadFailedModalOpen) return null;

  const handleRetry = () => {
    closeUploadFailedModal();
    openUploadProgressModal();
  };

  const handleBack = () => {
    closeUploadFailedModal();
    goToDocumentManagement();
  };

  return (
    <div className="library-modal-overlay" onClick={closeUploadFailedModal}>
      <div className="library-modal-card library-modal-card--centered" onClick={(e) => e.stopPropagation()}>
        <div className="library-modal-icon-badge library-modal-icon-badge--error">
          !
        </div>

        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#BF2E33', letterSpacing: '0.08em', marginBottom: 4 }}>
            UPLOAD FAILED
          </div>
          <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#14213D' }}>
            Upload couldn’t finish
          </h3>
          <p style={{ margin: '8px 0 0', fontSize: 13, color: '#667085', lineHeight: 1.45 }}>
            The file could not be uploaded. Check your connection and file type before retrying.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 12, marginTop: 12, width: '100%', justifyContent: 'center' }}>
          <button
            type="button"
            className="edusync-btn edusync-btn--secondary"
            onClick={handleBack}
          >
            Back to documents
          </button>
          <button
            type="button"
            className="edusync-btn edusync-btn--primary"
            style={{ backgroundColor: '#BF2E33', borderColor: '#BF2E33' }}
            onClick={handleRetry}
          >
            Retry upload
          </button>
        </div>
      </div>
    </div>
  );
};
