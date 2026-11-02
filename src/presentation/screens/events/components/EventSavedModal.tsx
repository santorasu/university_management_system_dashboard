import React from 'react';
import { useEventsFlow } from '../../../../application/state/events-flow.context';

export const EventSavedModal: React.FC = () => {
  const { eventSavedModalOpen, closeEventSavedModal, goToCalendar } = useEventsFlow();

  if (!eventSavedModalOpen) return null;

  const handleBack = () => {
    closeEventSavedModal();
    goToCalendar();
  };

  return (
    <div className="events-modal-overlay" onClick={closeEventSavedModal}>
      <div className="events-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="events-modal-icon-badge">
          📅
        </div>

        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#3659D9', letterSpacing: '0.08em', marginBottom: 4 }}>
            EVENT SAVED
          </div>
          <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#14213D' }}>
            Event saved to calendar
          </h3>
          <p style={{ margin: '8px 0 0', fontSize: 13, color: '#667085', lineHeight: 1.45 }}>
            Your event has been saved to the school calendar. Review the final date, time and audience in the calendar.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 12, marginTop: 12, width: '100%', justifyContent: 'center' }}>
          <button
            type="button"
            className="edusync-btn edusync-btn--secondary"
            onClick={closeEventSavedModal}
          >
            Review event
          </button>
          <button
            type="button"
            className="edusync-btn edusync-btn--primary"
            onClick={handleBack}
          >
            Back to calendar
          </button>
        </div>
      </div>
    </div>
  );
};
