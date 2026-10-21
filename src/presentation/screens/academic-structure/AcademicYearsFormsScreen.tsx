import React, { useState } from 'react';
import { useAcademicStructureFlow } from '../../../application/state/academic-structure-flow.context';
import { AcademicNavTabs } from './components/AcademicNavTabs';

interface AcademicYearsFormsScreenProps {
  onNavigateToDashboard: () => void;
}

export const AcademicYearsFormsScreen: React.FC<AcademicYearsFormsScreenProps> = ({
  onNavigateToDashboard,
}) => {
  const {
    academicYears,
    goToOverview,
    openArchiveModal,
    saveStructure,
    showToast,
  } = useAcademicStructureFlow();

  // Form states
  const [academicYear, setAcademicYear] = useState('2026–27');
  const [className, setClassName] = useState('Grade 8');
  const [sectionName, setSectionName] = useState('A');
  const [studentCapacity, setStudentCapacity] = useState('35');
  const [classTeacher, setClassTeacher] = useState('Sarah Johnson');
  const [subject, setSubject] = useState('Mathematics');
  const [subjectCode, setSubjectCode] = useState('MTH-08');
  const [department, setDepartment] = useState('Science');

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveStructure({
      academicYear,
      className,
      sectionName,
      studentCapacity: Number(studentCapacity) || 35,
      classTeacher,
      subject,
      subjectCode,
      department,
    });
  };

  const resetForm = () => {
    setClassName('Grade 8');
    setSectionName('A');
    setStudentCapacity('35');
    setClassTeacher('Sarah Johnson');
    setSubject('Mathematics');
    setSubjectCode('MTH-08');
    setDepartment('Science');
  };

  return (
    <div className="academic-structure-container">
      {/* 1. HERO & BREADCRUMBS */}
      <div className="academic-hero">
        <div>
          <div className="academic-hero__crumbs">
            <button
              type="button"
              className="academic-hero__crumb--link"
              onClick={onNavigateToDashboard}
            >
              Dashboard
            </button>
            <span className="academic-hero__crumb-sep">/</span>
            <button
              type="button"
              className="academic-hero__crumb--link"
              onClick={goToOverview}
            >
              Classes & Subjects
            </button>
            <span className="academic-hero__crumb-sep">/</span>
            <span style={{ color: 'var(--edusync-text-navy, #14213D)', fontWeight: 600 }}>Academic years</span>
          </div>

          <div className="academic-hero__title-row">
            <button
              type="button"
              className="edusync-btn-back-circle"
              onClick={goToOverview}
              title="Return to Classes Overview"
              aria-label="Back to Classes"
            >
              ←
            </button>
            <div>
              <h1 className="academic-hero__title">Academic years & structure forms</h1>
              <p className="academic-hero__subtitle">
                Configure year dates, class capacity, enrollment, and assignments.
              </p>
            </div>
          </div>
        </div>

        <div className="academic-hero__actions">
          <button
            type="button"
            className="edusync-btn edusync-btn--secondary"
            onClick={goToOverview}
          >
            ← Back to classes
          </button>
          <button
            type="button"
            className="edusync-btn edusync-btn--primary"
            onClick={() => showToast('success', 'Creating new academic year')}
          >
            + Add academic year
          </button>
        </div>
      </div>

      {/* 2. SUB-NAVIGATION TABS */}
      <AcademicNavTabs />

      {/* 3. TOP CARD: ACADEMIC YEARS TABLE */}
      <div className="academic-card">
        <div className="academic-card__header">
          <div>
            <h3 className="academic-card__title">Academic years</h3>
            <p className="academic-card__subtitle">Year settings control class and enrollment availability.</p>
          </div>
        </div>

        <div className="academic-table-wrap">
          <table className="academic-table">
            <thead>
              <tr>
                <th>Academic year</th>
                <th>Start date</th>
                <th>End date</th>
                <th>Classes</th>
                <th>Enrollment</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {academicYears.map((yr) => (
                <tr key={yr.id}>
                  <td style={{ fontWeight: 600 }}>{yr.year}</td>
                  <td>{yr.startDate}</td>
                  <td>{yr.endDate}</td>
                  <td>{yr.classesCount}</td>
                  <td>
                    <span
                      className={`academic-pill ${
                        yr.enrollment === 'Open'
                          ? 'academic-pill--active'
                          : yr.enrollment === 'Closed'
                          ? 'academic-pill--archived'
                          : 'academic-pill--draft'
                      }`}
                    >
                      {yr.enrollment}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`academic-pill ${
                        yr.status === 'Active'
                          ? 'academic-pill--active'
                          : yr.status === 'Archived'
                          ? 'academic-pill--archived'
                          : 'academic-pill--draft'
                      }`}
                    >
                      {yr.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    {yr.status === 'Active' && (
                      <button
                        type="button"
                        className="edusync-btn edusync-btn--secondary"
                        style={{ padding: '4px 10px', fontSize: 12 }}
                        onClick={() => openArchiveModal(yr)}
                      >
                        Archive
                      </button>
                    )}
                    {yr.status === 'Draft' && (
                      <button
                        type="button"
                        className="edusync-btn edusync-btn--primary"
                        style={{ padding: '4px 10px', fontSize: 12 }}
                        onClick={() => showToast('success', `Activated year ${yr.year}`)}
                      >
                        Activate
                      </button>
                    )}
                    {yr.status === 'Archived' && (
                      <span style={{ fontSize: 12, color: 'var(--edusync-text-muted, #98A2B3)' }}>
                        Archived
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. 2-COLUMN SPLIT: FORM & CONFIRMATION / FEEDBACK STATES */}
      <div className="academic-two-col-grid">
        {/* LEFT: CREATE / EDIT ACADEMIC STRUCTURE FORM */}
        <div className="academic-card">
          <div className="academic-card__header">
            <div>
              <h3 className="academic-card__title">Create / edit academic structure</h3>
              <p className="academic-card__subtitle">Define class, section and subject relationships</p>
            </div>
          </div>

          <form onSubmit={handleFormSubmit}>
            <div className="academic-form-grid">
              <div className="academic-form-group">
                <label className="academic-form-label">Academic year *</label>
                <select
                  className="academic-form-select"
                  value={academicYear}
                  onChange={(e) => setAcademicYear(e.target.value)}
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
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  placeholder="e.g. Grade 8"
                  required
                />
              </div>

              <div className="academic-form-group">
                <label className="academic-form-label">Section name *</label>
                <input
                  type="text"
                  className="academic-form-input"
                  value={sectionName}
                  onChange={(e) => setSectionName(e.target.value)}
                  placeholder="e.g. A"
                  required
                />
              </div>

              <div className="academic-form-group">
                <label className="academic-form-label">Student capacity *</label>
                <input
                  type="number"
                  className="academic-form-input"
                  value={studentCapacity}
                  onChange={(e) => setStudentCapacity(e.target.value)}
                  placeholder="35"
                  min="1"
                  required
                />
              </div>

              <div className="academic-form-group academic-form-group--full">
                <label className="academic-form-label">Class teacher</label>
                <select
                  className="academic-form-select"
                  value={classTeacher}
                  onChange={(e) => setClassTeacher(e.target.value)}
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

              <div className="academic-form-group">
                <label className="academic-form-label">Subject</label>
                <input
                  type="text"
                  className="academic-form-input"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Mathematics"
                />
              </div>

              <div className="academic-form-group">
                <label className="academic-form-label">Subject code</label>
                <input
                  type="text"
                  className="academic-form-input"
                  value={subjectCode}
                  onChange={(e) => setSubjectCode(e.target.value)}
                  placeholder="MTH-08"
                />
              </div>

              <div className="academic-form-group academic-form-group--full">
                <label className="academic-form-label">Department</label>
                <select
                  className="academic-form-select"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                >
                  <option value="Science">Science</option>
                  <option value="Languages">Languages</option>
                  <option value="Technology">Technology</option>
                  <option value="Humanities">Humanities</option>
                  <option value="Arts">Arts</option>
                </select>
              </div>
            </div>

            <div className="academic-form-note">
              Capacity must be greater than zero. Required relationships must be selected.
            </div>

            <div className="academic-form-actions">
              <button
                type="button"
                className="edusync-btn edusync-btn--secondary"
                onClick={resetForm}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="edusync-btn edusync-btn--primary"
              >
                Save changes
              </button>
            </div>
          </form>
        </div>

        {/* RIGHT: CONFIRMATION & FEEDBACK STATES */}
        <div className="academic-card">
          <div className="academic-card__header">
            <div>
              <h3 className="academic-card__title">Confirmation & feedback states</h3>
              <p className="academic-card__subtitle">Specimen preview of modals, toasts and empty states</p>
            </div>
          </div>

          <div className="academic-feedback-stack">
            {/* 1. Archive Modal Confirmation Preview Box */}
            <div className="academic-confirm-preview-box">
              <h4 className="academic-confirm-preview-box__title">Archive academic year 2025–26?</h4>
              <p className="academic-confirm-preview-box__sub">
                Existing class and result records will be preserved.
              </p>
              <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
                <button
                  type="button"
                  className="edusync-btn edusync-btn--secondary"
                  style={{ padding: '6px 14px', fontSize: 13 }}
                  onClick={() => showToast('success', 'Action cancelled')}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="edusync-btn"
                  style={{
                    padding: '6px 14px',
                    fontSize: 13,
                    background: '#DC2626',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: 8,
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                  onClick={() => showToast('success', 'Academic year 2025–26 archived')}
                >
                  Archive
                </button>
              </div>
            </div>

            {/* 2. Success Toast Banner */}
            <div className="academic-toast-banner academic-toast-banner--success">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <span>Academic structure saved successfully</span>
            </div>

            {/* 3. Error Toast Banner */}
            <div className="academic-toast-banner academic-toast-banner--error">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <span>Unable to save changes. Try again.</span>
            </div>

            {/* 4. Empty State Box */}
            <div className="academic-empty-state-box">
              <h4 className="academic-empty-state-box__title">No subjects assigned yet</h4>
              <p className="academic-empty-state-box__sub">
                Assign a teacher and subject to this class.
              </p>
              <button
                type="button"
                className="edusync-btn edusync-btn--secondary"
                style={{ padding: '6px 14px', fontSize: 13 }}
                onClick={() => showToast('success', 'Ready to assign subject')}
              >
                Assign subject
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
