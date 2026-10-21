import React from 'react';
import { useNoticesFlow } from '../../../../application/state/notices-flow.context';

export const ExportCompleteModal: React.FC = () => {
  const { exportModalOpen, closeExportModal, goToNotificationHistory } = useNoticesFlow();

  if (!exportModalOpen) return null;

  const handleBack = () => {
    closeExportModal();
    goToNotificationHistory();
  };

  return (
    <div className="notices-modal-overlay" onClick={closeExportModal}>
      <div className="notices-modal-card notices-modal-card--success" onClick={(e) => e.stopPropagation()}>
        <div className="notices-modal-success-icon">↓</div>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--edusync-brand-primary, #3659D9)', letterSpacing: '0.08em' }}>
          EXPORT COMPLETE
        </div>
        <h3 className="notices-modal-title" style={{ fontSize: 20 }}>Export prepared</h3>
        <p style={{ margin: 0, fontSize: 13, color: 'var(--edusync-text-secondary, #667085)', lineHeight: 1.5 }}>
          The notification history file has been prepared with the current filters and date range. Your download should begin automatically.
        </p>

        <button
          type="button"
          className="edusync-btn edusync-btn--primary"
          style={{ width: '100%', marginTop: 8 }}
          onClick={handleBack}
        >
          Back to notification history
        </button>
      </div>
    </div>
  );
};
