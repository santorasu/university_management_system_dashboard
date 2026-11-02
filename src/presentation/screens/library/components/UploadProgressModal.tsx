import React from 'react';
import { useLibraryFlow } from '../../../../application/state/library-flow.context';

export const UploadProgressModal: React.FC = () => {
  const {
    uploadProgressModalOpen,
    closeUploadProgressModal,
    openUploadSuccessModal,
    openUploadFailedModal,
  } = useLibraryFlow();

  if (!uploadProgressModalOpen) return null;

  return (
    <div className="library-modal-overlay" onClick={closeUploadProgressModal}>
      <div className="library-modal-card" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#3659D9', letterSpacing: '0.08em', marginBottom: 4 }}>
              UPLOAD PROGRESS
            </div>
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#14213D' }}>
              Uploading document…
            </h3>
            <p style={{ margin: '4px 0 0', fontSize: 13, color: '#667085' }}>
              Verify file before attaching to a student or teacher record.
            </p>
          </div>
          <button
            type="button"
            onClick={closeUploadProgressModal}
            style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#98A2B3' }}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <div style={{ background: '#F8FAFC', border: '1px solid #E4E7EC', borderRadius: 10, padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#14213D' }}>school-record.pdf</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#3659D9' }}>68%</span>
          </div>

          <div className="library-progress-bar-track">
            <div className="library-progress-bar-fill" style={{ width: '68%' }} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#667085' }}>
            <span>8.4 MB of 12.4 MB uploaded</span>
            <span>Est. 4 seconds remaining</span>
          </div>

          <p style={{ margin: 0, fontSize: 12, color: '#667085', lineHeight: 1.45 }}>
            school-record.pdf is being verified before it is attached to the selected record.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', paddingTop: 8 }}>
          <button
            type="button"
            className="edusync-btn edusync-btn--secondary"
            onClick={openUploadFailedModal}
          >
            Simulate failure
          </button>
          <button
            type="button"
            className="edusync-btn edusync-btn--primary"
            onClick={openUploadSuccessModal}
          >
            Complete upload
          </button>
        </div>
      </div>
    </div>
  );
};
