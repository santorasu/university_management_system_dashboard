import React, { useState } from 'react';
import { useTimetableFlow } from '../../../application/state/timetable-flow.context';

export const TimetableModals: React.FC = () => {
  const {
    isAddEventModalOpen,
    closeAddEventModal,
    toastNotification,
    clearToast,
    showToast,
  } = useTimetableFlow();

  const [eventDate, setEventDate] = useState('24 Oct');
  const [eventTitle, setEventTitle] = useState('');
  const [eventType, setEventType] = useState<'Academic event' | 'Holiday' | 'Meeting'>('Academic event');

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle) return;
    showToast('success', `Event "${eventTitle}" scheduled for ${eventDate}.`);
    setEventTitle('');
    closeAddEventModal();
  };

  return (
    <>
      {/* 1. TOAST NOTIFICATION OVERLAY */}
      {toastNotification && (
        <div
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '12px 20px',
            borderRadius: 10,
            boxShadow: '0 8px 24px rgba(20, 33, 61, 0.16)',
            background: toastNotification.type === 'success' ? '#065F46' : '#991B1B',
            color: '#ffffff',
            fontWeight: 500,
            fontSize: 14,
            animation: 'modalFadeIn 0.2s ease-out',
          }}
        >
          {toastNotification.type === 'success' ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          )}
          <span>{toastNotification.message}</span>
          <button
            type="button"
            onClick={clearToast}
            style={{
              background: 'none',
              border: 'none',
              color: '#ffffff',
              cursor: 'pointer',
              marginLeft: 8,
              fontSize: 16,
              opacity: 0.8,
            }}
          >
            ✕
          </button>
        </div>
      )}

      {/* 2. ADD ACADEMIC EVENT MODAL */}
      {isAddEventModalOpen && (
        <div className="academic-modal-overlay" onClick={closeAddEventModal}>
          <div className="academic-modal-panel" style={{ maxWidth: 460 }} onClick={(e) => e.stopPropagation()}>
            <div className="academic-modal-header">
              <h3 className="academic-modal-title">Add Academic Event or Holiday</h3>
              <button
                type="button"
                className="academic-modal-close-btn"
                onClick={closeAddEventModal}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddEvent}>
              <div className="academic-modal-body">
                <div className="academic-form-grid">
                  <div className="academic-form-group academic-form-group--full">
                    <label className="academic-form-label">Event title *</label>
                    <input
                      type="text"
                      className="academic-form-input"
                      placeholder="e.g. Science Fair Exhibition"
                      value={eventTitle}
                      onChange={(e) => setEventTitle(e.target.value)}
                      required
                    />
                  </div>

                  <div className="academic-form-group">
                    <label className="academic-form-label">Date *</label>
                    <input
                      type="text"
                      className="academic-form-input"
                      placeholder="e.g. 24 Oct"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      required
                    />
                  </div>

                  <div className="academic-form-group">
                    <label className="academic-form-label">Type</label>
                    <select
                      className="academic-form-select"
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value as any)}
                    >
                      <option value="Academic event">Academic event</option>
                      <option value="Holiday">School Holiday</option>
                      <option value="Meeting">Parent / Teacher Meeting</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="academic-modal-footer">
                <button
                  type="button"
                  className="edusync-btn edusync-btn--secondary"
                  onClick={closeAddEventModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="edusync-btn edusync-btn--primary"
                >
                  Save event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
