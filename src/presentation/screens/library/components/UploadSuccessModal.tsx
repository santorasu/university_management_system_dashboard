import React from 'react';
import { useLibraryFlow } from '../../../../application/state/library-flow.context';

export const UploadSuccessModal: React.FC = () => {
  const {
    uploadSuccessModalOpen,
    closeUploadSuccessModal,
    goToDocumentManagement,
  } = useLibraryFlow();

  if (!uploadSuccessModalOpen) return null;

  const handleBack = () => {
    closeUploadSuccessModal();
    goToDocumentManagement();
  };

  return (
    <div className="library-modal-overlay" onClick={closeUploadSuccessModal}>
      <div className="library-modal-card library-modal-card--centered" onClick={(e) => e.stopPropagation()}>
        <div className="library-modal-icon-badge library-modal-icon-badge--success">
          ✓
        </div>

        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#148557', letterSpacing: '0.08em', marginBottom: 4 }}>
            UPLOAD COMPLETE
          </div>
          <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#14213D' }}>
            Document uploaded
          </h3>
          <p style={{ margin: '8px 0 0', fontSize: 13, color: '#667085', lineHeight: 1.45 }}>
            The document was uploaded and is now attached to the selected student or teacher record.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 12, marginTop: 12, width: '100%', justifyContent: 'center' }}>
          <button
            type="button"
            className="edusync-btn edusync-btn--secondary"
            onClick={handleBack}
          >
            View records
          </button>
          <button
            type="button"
            className="edusync-btn edusync-btn--primary"
            onClick={handleBack}
          >
            Back to documents
          </button>
        </div>
      </div>
    </div>
  );
};
