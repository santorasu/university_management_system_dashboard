import React from 'react';
import { useNoticesFlow } from '../../../../application/state/notices-flow.context';

export const MessageSentModal: React.FC = () => {
  const { messageSentModalOpen, closeMessageSentModal, goToMessagesInbox } = useNoticesFlow();

  if (!messageSentModalOpen) return null;

  const handleBackToInbox = () => {
    closeMessageSentModal();
    goToMessagesInbox();
  };

  return (
    <div className="notices-modal-overlay" onClick={closeMessageSentModal}>
      <div className="notices-modal-card notices-modal-card--success" onClick={(e) => e.stopPropagation()}>
        <div className="notices-modal-success-icon">✓</div>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#148557', letterSpacing: '0.08em' }}>
          MESSAGE SENT
        </div>
        <h3 className="notices-modal-title" style={{ fontSize: 20 }}>Message sent successfully</h3>
        <p style={{ margin: 0, fontSize: 13, color: 'var(--edusync-text-secondary, #667085)', lineHeight: 1.5 }}>
          The message is now listed in the inbox and delivery history for the selected audience.
        </p>

        <button
          type="button"
          className="edusync-btn edusync-btn--primary"
          style={{ width: '100%', marginTop: 8 }}
          onClick={handleBackToInbox}
        >
          Back to inbox
        </button>
      </div>
    </div>
  );
};
