import React, { useState } from 'react';
import { useAcademicStructureFlow } from '../../../application/state/academic-structure-flow.context';

export const AcademicModals: React.FC = () => {
  const {
    isAddClassModalOpen,
    closeAddClassModal,
    isArchiveModalOpen,
    yearToArchive,
    closeArchiveModal,
    confirmArchiveYear,
    isEnrollModalOpen,
    closeEnrollModal,
    toastNotification,
    clearToast,
    saveStructure,
    showToast,
  } = useAcademicStructureFlow();

  // Add Class Form State
  const [modalYear, setModalYear] = useState('2026–27');
  const [modalClassName, setModalClassName] = useState('');
  const [modalSectionName, setModalSectionName] = useState('A');
  const [modalCapacity, setModalCapacity] = useState('35');
  const [modalTeacher, setModalTeacher] = useState('Sarah Johnson');

  // Enroll Student Form State
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentSection, setNewStudentSection] = useState('A');

  const handleAddClassSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalClassName) return;
    const ok = await saveStructure({
      academicYear: modalYear,
      className: modalClassName,
      sectionName: modalSectionName,
      studentCapacity: Number(modalCapacity) || 35,
      classTeacher: modalTeacher,
    });
    if (ok) {
      setModalClassName('');
      closeAddClassModal();
    }
  };

  const handleEnrollSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName) return;
    showToast('success', `Student "${newStudentName}" enrolled in Section ${newStudentSection} successfully`);
    setNewStudentName('');
    closeEnrollModal();
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

      {/* 2. ADD CLASS MODAL */}
      {isAddClassModalOpen && (
        <div className="academic-modal-overlay" onClick={closeAddClassModal}>
          <div className="academic-modal-panel" onClick={(e) => e.stopPropagation()}>
            <div className="academic-modal-header">
              <h3 className="academic-modal-title">Add Class & Section</h3>
              <button
                type="button"
                className="academic-modal-close-btn"
                onClick={closeAddClassModal}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddClassSubmit}>
              <div className="academic-modal-body">
                <div className="academic-form-grid">
                  <div className="academic-form-group">
                    <label className="academic-form-label">Academic year *</label>
                    <select
                      className="academic-form-select"
                      value={modalYear}
                      onChange={(e) => setModalYear(e.target.value)}
                    >
                      <option value="2026–27">2026–27</option>
                      <option value="2025–26">2025–26</option>
                      <option value="2027–28">2027–28</option>
                    </select>
                  </div>

                  <div className="academic-form-group">
                    <label className="academic-form-label">Class name *</label>
                    <input
                      type="text"
                      className="academic-form-input"
                      placeholder="e.g. Grade 5"
                      value={modalClassName}
                      onChange={(e) => setModalClassName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="academic-form-group">
                    <label className="academic-form-label">Section name *</label>
                    <input
                      type="text"
                      className="academic-form-input"
                      placeholder="e.g. A"
                      value={modalSectionName}
                      onChange={(e) => setModalSectionName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="academic-form-group">
                    <label className="academic-form-label">Student capacity *</label>
                    <input
                      type="number"
                      className="academic-form-input"
                      placeholder="35"
                      min="1"
                      value={modalCapacity}
                      onChange={(e) => setModalCapacity(e.target.value)}
                      required
                    />
                  </div>

                  <div className="academic-form-group academic-form-group--full">
                    <label className="academic-form-label">Class teacher</label>
                    <select
                      className="academic-form-select"
                      value={modalTeacher}
                      onChange={(e) => setModalTeacher(e.target.value)}
                    >
                      <option value="Sarah Johnson">Sarah Johnson</option>
                      <option value="Daniel Kim">Daniel Kim</option>
                      <option value="Priya Patel">Priya Patel</option>
                      <option value="Ayesha Rahman">Ayesha Rahman</option>
                      <option value="Michael Chen">Michael Chen</option>
                      <option value="Omar Hassan">Omar Hassan</option>
                      <option value="Emily Davis">Emily Davis</option>
                    </select>
                  </div>
                </div>

                <div className="academic-form-note" style={{ marginTop: 16 }}>
                  Capacity must be greater than zero. Required relationships must be selected.
                </div>
              </div>

              <div className="academic-modal-footer">
                <button
                  type="button"
                  className="edusync-btn edusync-btn--secondary"
                  onClick={closeAddClassModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="edusync-btn edusync-btn--primary"
                >
                  Save class
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. ARCHIVE YEAR CONFIRMATION MODAL */}
      {isArchiveModalOpen && yearToArchive && (
        <div className="academic-modal-overlay" onClick={closeArchiveModal}>
          <div className="academic-modal-panel" style={{ maxWidth: 460 }} onClick={(e) => e.stopPropagation()}>
            <div className="academic-modal-header">
              <h3 className="academic-modal-title">Archive Academic Year?</h3>
              <button
                type="button"
                className="academic-modal-close-btn"
                onClick={closeArchiveModal}
              >
                ✕
              </button>
            </div>

            <div className="academic-modal-body">
              <p style={{ margin: 0, fontSize: 15, color: 'var(--edusync-text-primary, #172033)' }}>
                Are you sure you want to archive academic year <strong>{yearToArchive.year}</strong>?
              </p>
              <p style={{ margin: '8px 0 0 0', fontSize: 13, color: 'var(--edusync-text-secondary, #667085)' }}>
                Existing class and result records will be preserved in archived read-only mode.
              </p>
            </div>

            <div className="academic-modal-footer">
              <button
                type="button"
                className="edusync-btn edusync-btn--secondary"
                onClick={closeArchiveModal}
              >
                Cancel
              </button>
              <button
                type="button"
                className="edusync-btn"
                style={{
                  background: '#DC2626',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: 8,
                  padding: '8px 16px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
                onClick={confirmArchiveYear}
              >
                Archive year
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. ENROLL STUDENTS MODAL */}
      {isEnrollModalOpen && (
        <div className="academic-modal-overlay" onClick={closeEnrollModal}>
          <div className="academic-modal-panel" onClick={(e) => e.stopPropagation()}>
            <div className="academic-modal-header">
              <h3 className="academic-modal-title">Enroll Student</h3>
              <button
                type="button"
                className="academic-modal-close-btn"
                onClick={closeEnrollModal}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleEnrollSubmit}>
              <div className="academic-modal-body">
                <div className="academic-form-grid">
                  <div className="academic-form-group academic-form-group--full">
                    <label className="academic-form-label">Student full name *</label>
                    <input
                      type="text"
                      className="academic-form-input"
                      placeholder="e.g. Benjamin Hayes"
                      value={newStudentName}
                      onChange={(e) => setNewStudentName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="academic-form-group">
                    <label className="academic-form-label">Target Section *</label>
                    <select
                      className="academic-form-select"
                      value={newStudentSection}
                      onChange={(e) => setNewStudentSection(e.target.value)}
                    >
                      <option value="A">Section A</option>
                      <option value="B">Section B</option>
                      <option value="C">Section C</option>
                      <option value="D">Section D</option>
                    </select>
                  </div>

                  <div className="academic-form-group">
                    <label className="academic-form-label">Enrollment Date</label>
                    <input
                      type="text"
                      className="academic-form-input"
                      value="Today (21 Oct 2026)"
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div className="academic-modal-footer">
                <button
                  type="button"
                  className="edusync-btn edusync-btn--secondary"
                  onClick={closeEnrollModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="edusync-btn edusync-btn--primary"
                >
                  Confirm enrollment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
