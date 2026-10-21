import React, { useState } from 'react';
import { useStudentFlow } from '../../../application/state/student-flow.context';

interface AddEditStudentScreenProps {
  onNavigateToDashboard: () => void;
}

export const AddEditStudentScreen: React.FC<AddEditStudentScreenProps> = ({
  onNavigateToDashboard,
}) => {
  const {
    editingStudent,
    students,
    saveStudent,
    goToConsolidatedOverview,
    isLoading,
  } = useStudentFlow();

  const isEditMode = Boolean(editingStudent);

  // Form states
  const [fullName, setFullName] = useState(editingStudent?.fullName || '');
  const [studentId, setStudentId] = useState(
    editingStudent?.studentId || `STU-2026-00${students.length + 1}`
  );
  const [email, setEmail] = useState(editingStudent?.email || '');
  const [phone, setPhone] = useState(editingStudent?.phone || '');
  const [dateOfBirth, setDateOfBirth] = useState(editingStudent?.dateOfBirth || '');
  const [enrollmentDate, setEnrollmentDate] = useState(
    editingStudent?.enrollmentDate || '16 Oct 2026'
  );

  const [academicYear, setAcademicYear] = useState(
    editingStudent?.academicYear || '2026–27'
  );
  const [grade, setGrade] = useState(editingStudent?.grade || 'Grade 8');
  const [section, setSection] = useState(editingStudent?.section || 'A');
  const [rollNumber, setRollNumber] = useState(editingStudent?.rollNumber || '08');

  const [guardianName, setGuardianName] = useState(editingStudent?.guardianName || '');
  const [guardianRelationship, setGuardianRelationship] = useState(
    editingStudent?.guardianRelationship || 'Parent / Guardian'
  );
  const [guardianPhone, setGuardianPhone] = useState(editingStudent?.guardianPhone || '');
  const [guardianEmail, setGuardianEmail] = useState(editingStudent?.guardianEmail || '');

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setErrorMessage('Full name is required.');
      return;
    }
    if (!guardianName.trim()) {
      setErrorMessage('Guardian full name is required.');
      return;
    }

    setErrorMessage(null);
    await saveStudent({
      fullName,
      studentId,
      email: email || `${fullName.toLowerCase().replace(/\s+/g, '.')}@example.edu`,
      phone,
      dateOfBirth: dateOfBirth || '14 Mar 2012',
      enrollmentDate,
      academicYear,
      grade,
      section,
      rollNumber,
      guardianName,
      guardianRelationship,
      guardianPhone: guardianPhone || '+1 (555) 000-0000',
      guardianEmail,
    });
  };

  return (
    <div className="edusync-students-view">
      {/* Top Header & Breadcrumbs */}
      <div className="edusync-students-view__top-bar">
        <div className="edusync-students-view__header-left">
          <nav className="edusync-dashboard-hero__breadcrumb">
            <span
              className="edusync-dashboard-hero__crumb edusync-dashboard-hero__crumb--link"
              onClick={onNavigateToDashboard}
              role="button"
              tabIndex={0}
            >
              Dashboard
            </span>
            <span className="edusync-dashboard-hero__crumb-sep">/</span>
            <span
              className="edusync-dashboard-hero__crumb edusync-dashboard-hero__crumb--link"
              onClick={goToConsolidatedOverview}
              role="button"
              tabIndex={0}
            >
              Students
            </span>
            <span className="edusync-dashboard-hero__crumb-sep">/</span>
            <span className="edusync-dashboard-hero__crumb edusync-dashboard-hero__crumb--current">
              {isEditMode ? 'Edit' : 'Add'}
            </span>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '6px' }}>
            <button
              type="button"
              className="edusync-btn-back-circle"
              onClick={goToConsolidatedOverview}
              title="Back to students overview"
              aria-label="Back to students overview"
            >
              ←
            </button>
            <h1 className="edusync-dashboard-hero__title" style={{ margin: 0 }}>
              {isEditMode ? 'Edit student' : 'Add student'}
            </h1>
          </div>
          <p className="edusync-dashboard-hero__subtitle" style={{ marginTop: '4px' }}>
            Create a student record and assign their class, guardian, and account status.
          </p>
        </div>

        <div className="edusync-students-view__header-actions">
          <button
            type="button"
            className="edusync-btn edusync-btn--secondary"
            onClick={goToConsolidatedOverview}
          >
            ← Back to students
          </button>
        </div>
      </div>

      {errorMessage && (
        <div className="edusync-alert edusync-alert--error" style={{ marginBottom: '20px' }}>
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Form Container */}
      <form onSubmit={handleSubmit} className="edusync-student-form">
        {/* Card 1: Personal information */}
        <div className="edusync-student-form-card">
          <h3 className="edusync-student-form-card__title">Personal information</h3>
          <div className="edusync-student-form-grid edusync-student-form-grid--2col">
            <div className="edusync-form-group">
              <label className="edusync-form-label">Full name *</label>
              <input
                type="text"
                placeholder="Enter student's full name"
                className="edusync-form-input"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <div className="edusync-form-group">
              <label className="edusync-form-label">Student ID *</label>
              <input
                type="text"
                className="edusync-form-input"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                required
              />
            </div>

            <div className="edusync-form-group">
              <label className="edusync-form-label">Email address</label>
              <input
                type="email"
                placeholder="student@example.edu"
                className="edusync-form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="edusync-form-group">
              <label className="edusync-form-label">Phone number</label>
              <input
                type="text"
                placeholder="+1 (555) 000-0000"
                className="edusync-form-input"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="edusync-form-group">
              <label className="edusync-form-label">Date of birth</label>
              <input
                type="text"
                placeholder="DD / MM / YYYY"
                className="edusync-form-input"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
            </div>

            <div className="edusync-form-group">
              <label className="edusync-form-label">Enrollment date</label>
              <input
                type="text"
                className="edusync-form-input"
                value={enrollmentDate}
                onChange={(e) => setEnrollmentDate(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Card 2: Class and section assignment */}
        <div className="edusync-student-form-card">
          <h3 className="edusync-student-form-card__title">Class and section assignment</h3>
          <div className="edusync-student-form-grid edusync-student-form-grid--4col">
            <div className="edusync-form-group">
              <label className="edusync-form-label">Academic year</label>
              <input
                type="text"
                className="edusync-form-input"
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
              />
            </div>

            <div className="edusync-form-group">
              <label className="edusync-form-label">Class</label>
              <select
                className="edusync-form-select"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
              >
                <option value="Grade 5">Grade 5</option>
                <option value="Grade 6">Grade 6</option>
                <option value="Grade 7">Grade 7</option>
                <option value="Grade 8">Grade 8</option>
                <option value="Grade 9">Grade 9</option>
              </select>
            </div>

            <div className="edusync-form-group">
              <label className="edusync-form-label">Section</label>
              <select
                className="edusync-form-select"
                value={section}
                onChange={(e) => setSection(e.target.value)}
              >
                <option value="A">Section A</option>
                <option value="B">Section B</option>
                <option value="C">Section C</option>
              </select>
            </div>

            <div className="edusync-form-group">
              <label className="edusync-form-label">Roll number</label>
              <input
                type="text"
                className="edusync-form-input"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Card 3: Guardian information */}
        <div className="edusync-student-form-card">
          <h3 className="edusync-student-form-card__title">Guardian information</h3>
          <div className="edusync-student-form-grid edusync-student-form-grid--2col">
            <div className="edusync-form-group">
              <label className="edusync-form-label">Guardian full name *</label>
              <input
                type="text"
                placeholder="Enter guardian's name"
                className="edusync-form-input"
                value={guardianName}
                onChange={(e) => setGuardianName(e.target.value)}
                required
              />
            </div>

            <div className="edusync-form-group">
              <label className="edusync-form-label">Relationship *</label>
              <input
                type="text"
                placeholder="Parent / Guardian"
                className="edusync-form-input"
                value={guardianRelationship}
                onChange={(e) => setGuardianRelationship(e.target.value)}
                required
              />
            </div>

            <div className="edusync-form-group">
              <label className="edusync-form-label">Guardian phone *</label>
              <input
                type="text"
                placeholder="+1 (555) 000-0000"
                className="edusync-form-input"
                value={guardianPhone}
                onChange={(e) => setGuardianPhone(e.target.value)}
                required
              />
            </div>

            <div className="edusync-form-group">
              <label className="edusync-form-label">Guardian email</label>
              <input
                type="email"
                placeholder="guardian@example.edu"
                className="edusync-form-input"
                value={guardianEmail}
                onChange={(e) => setGuardianEmail(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Form Actions Footer */}
        <div className="edusync-student-form-footer">
          <span className="edusync-student-form-footer__notice">
            Complete all required fields before saving.
          </span>
          <div className="edusync-student-form-footer__btns">
            <button
              type="button"
              className="edusync-btn edusync-btn--secondary"
              onClick={goToConsolidatedOverview}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="edusync-btn edusync-btn--primary"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save student'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
