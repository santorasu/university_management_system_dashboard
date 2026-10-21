import React from 'react';
import { useAttendanceFlow } from '../../../application/state/attendance-flow.context';

export const AttendanceModals: React.FC = () => {
  const {
    isConfirmDialogOpen,
    closeConfirmDialog,
    saveAttendance,
    selectedClass,
    selectedSection,
    toastNotification,
    clearToast,
  } = useAttendanceFlow();

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

      {/* 2. CONFIRM SUBMISSION MODAL */}
      {isConfirmDialogOpen && (
        <div className="academic-modal-overlay" onClick={closeConfirmDialog}>
          <div className="academic-modal-panel" style={{ maxWidth: 460 }} onClick={(e) => e.stopPropagation()}>
            <div className="academic-modal-header">
              <h3 className="academic-modal-title">Submit Attendance</h3>
              <button
                type="button"
                className="academic-modal-close-btn"
                onClick={closeConfirmDialog}
              >
                ✕
              </button>
            </div>

            <div className="academic-modal-body">
              <p style={{ margin: 0, fontSize: 15, color: 'var(--edusync-text-primary, #172033)' }}>
                Submit attendance records for <strong>{selectedClass} · Section {selectedSection}</strong>?
              </p>
              <p style={{ margin: '8px 0 0 0', fontSize: 13, color: 'var(--edusync-text-secondary, #667085)' }}>
                Absence notices will automatically queue for any unexcused absences.
              </p>
            </div>

            <div className="academic-modal-footer">
              <button
                type="button"
                className="edusync-btn edusync-btn--secondary"
                onClick={closeConfirmDialog}
              >
                Cancel
              </button>
              <button
                type="button"
                className="edusync-btn edusync-btn--primary"
                onClick={saveAttendance}
              >
                Confirm & Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
