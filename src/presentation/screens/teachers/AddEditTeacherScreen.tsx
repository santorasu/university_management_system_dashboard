import React, { useState } from 'react';
import { useTeacherFlow } from '../../../application/state/teacher-flow.context';
import { TeacherNavTabs } from './components/TeacherNavTabs';
import type { EmploymentType, TeacherAvailability, TeacherStatus } from '../../../core/entities/teacher.types';

interface AddEditTeacherScreenProps {
  onNavigateToDashboard: () => void;
}

export const AddEditTeacherScreen: React.FC<AddEditTeacherScreenProps> = ({
  onNavigateToDashboard,
}) => {
  const {
    editingTeacher,
    teachers,
    saveTeacher,
    goToConsolidatedOverview,
    isLoading,
  } = useTeacherFlow();

  const isEditMode = Boolean(editingTeacher);

  // Form states
  const [fullName, setFullName] = useState(editingTeacher?.fullName || '');
  const [teacherId, setTeacherId] = useState(
    editingTeacher?.teacherId || `TCH-2026-0${teachers.length + 40}`
  );
  const [email, setEmail] = useState(editingTeacher?.email || '');
  const [phone, setPhone] = useState(editingTeacher?.phone || '');
  const [address, setAddress] = useState(editingTeacher?.address || '');
  const [joiningDate, setJoiningDate] = useState(
    editingTeacher?.joiningDate || '16 Oct 2026'
  );

  const [employmentType, setEmploymentType] = useState<EmploymentType>(
    editingTeacher?.employmentType || 'Full-time'
  );
  const [department, setDepartment] = useState(
    editingTeacher?.department || 'Mathematics & Science'
  );
  const [qualification, setQualification] = useState(
    editingTeacher?.qualification || 'M.Sc. Mathematics'
  );

  const [subjectsInput, setSubjectsInput] = useState(
    editingTeacher?.subjects.join(', ') || 'Mathematics, Physics'
  );
  const [classesInput, setClassesInput] = useState(
    editingTeacher?.classesSummary || '8A, 9A, 10B'
  );
  const [weeklyLoad, setWeeklyLoad] = useState(
    editingTeacher?.weeklyTeachingLoad || '18 periods / week'
  );
  const [availability, setAvailability] = useState<TeacherAvailability>(
    editingTeacher?.availability || 'Available'
  );

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setErrorMessage('Full name is required.');
      return;
    }

    setErrorMessage(null);
    const parsedSubjects = subjectsInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    await saveTeacher({
      fullName,
      teacherId,
      email: email || `${fullName.toLowerCase().replace(/\s+/g, '.')}@edusync.edu`,
      phone: phone || '+1 (555) 000-0000',
      address,
      joiningDate,
      employmentType,
      department,
      qualification,
      subjects: parsedSubjects.length > 0 ? parsedSubjects : ['General Studies'],
      classesSummary: classesInput,
      weeklyTeachingLoad: weeklyLoad,
      availability,
      status: (availability === 'On leave' ? 'On leave' : 'Active') as TeacherStatus,
    });
  };

  return (
    <div className="edusync-teachers-view">
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
              onClick={goToConsolidatedOverview}
            >
              Teachers
            </button>
            <span className="academic-hero__crumb-sep">/</span>
            <span style={{ color: 'var(--edusync-text-navy, #14213D)', fontWeight: 600 }}>
              {isEditMode ? 'Edit' : 'Add'}
            </span>
          </div>

          <div className="academic-hero__title-row">
            <button
              type="button"
              className="edusync-btn-back-circle"
              onClick={goToConsolidatedOverview}
              title="Back to teachers overview"
              aria-label="Back"
            >
              ←
            </button>
            <div>
              <h1 className="academic-hero__title">
                {isEditMode ? 'Edit teacher' : 'Add teacher'}
              </h1>
              <p className="academic-hero__subtitle">
                Create or update a teacher record, employment details, and teaching assignments.
              </p>
            </div>
          </div>
        </div>

        <div className="academic-hero__actions">
          <button
            type="button"
            className="edusync-btn edusync-btn--secondary"
            onClick={goToConsolidatedOverview}
          >
            ← Back to teachers
          </button>
        </div>
      </div>

      {/* 2. SUB-NAVIGATION TABS (Persistent across screens) */}
      <TeacherNavTabs />

      {errorMessage && (
        <div className="edusync-alert edusync-alert--error" style={{ marginBottom: '20px' }}>
          <span>{errorMessage}</span>
        </div>
      )}

      {/* 3. FORM CONTAINER */}
      <form onSubmit={handleSubmit} className="edusync-teacher-form">
        {/* Card 1: Personal and contact information */}
        <div className="edusync-teacher-form-card">
          <h3 className="edusync-teacher-form-card__title">Personal and contact information</h3>
          <div className="edusync-teacher-form-grid edusync-teacher-form-grid--2col">
            <div className="edusync-form-group">
              <label className="edusync-form-label">Full name *</label>
              <input
                type="text"
                placeholder="Enter teacher's full name"
                className="edusync-form-input"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <div className="edusync-form-group">
              <label className="edusync-form-label">Teacher ID *</label>
              <input
                type="text"
                className="edusync-form-input"
                value={teacherId}
                onChange={(e) => setTeacherId(e.target.value)}
                required
              />
            </div>

            <div className="edusync-form-group">
              <label className="edusync-form-label">Email address</label>
              <input
                type="email"
                placeholder="teacher@edusync.edu"
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
              <label className="edusync-form-label">Address</label>
              <input
                type="text"
                placeholder="Street address, city"
                className="edusync-form-input"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="edusync-form-group">
              <label className="edusync-form-label">Joining date</label>
              <input
                type="text"
                className="edusync-form-input"
                value={joiningDate}
                onChange={(e) => setJoiningDate(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Card 2: Employment information */}
        <div className="edusync-teacher-form-card">
          <h3 className="edusync-teacher-form-card__title">Employment information</h3>
          <div className="edusync-teacher-form-grid edusync-teacher-form-grid--3col">
            <div className="edusync-form-group">
              <label className="edusync-form-label">Employment type</label>
              <select
                className="edusync-form-select"
                value={employmentType}
                onChange={(e) => setEmploymentType(e.target.value as EmploymentType)}
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
              </select>
            </div>

            <div className="edusync-form-group">
              <label className="edusync-form-label">Department</label>
              <select
                className="edusync-form-select"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
                <option value="Mathematics & Science">Mathematics &amp; Science</option>
                <option value="Languages">Languages</option>
                <option value="Technology">Technology</option>
                <option value="Humanities">Humanities</option>
              </select>
            </div>

            <div className="edusync-form-group">
              <label className="edusync-form-label">Qualification</label>
              <input
                type="text"
                placeholder="e.g. M.Sc. Mathematics"
                className="edusync-form-input"
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Card 3: Teaching assignments and availability */}
        <div className="edusync-teacher-form-card">
          <h3 className="edusync-teacher-form-card__title">
            Teaching assignments and availability
          </h3>
          <div className="edusync-teacher-form-grid edusync-teacher-form-grid--2col">
            <div className="edusync-form-group">
              <label className="edusync-form-label">Assigned subjects (comma separated) *</label>
              <input
                type="text"
                placeholder="Mathematics, Physics"
                className="edusync-form-input"
                value={subjectsInput}
                onChange={(e) => setSubjectsInput(e.target.value)}
                required
              />
            </div>

            <div className="edusync-form-group">
              <label className="edusync-form-label">Assigned classes (comma separated) *</label>
              <input
                type="text"
                placeholder="8A, 9A, 10B"
                className="edusync-form-input"
                value={classesInput}
                onChange={(e) => setClassesInput(e.target.value)}
                required
              />
            </div>

            <div className="edusync-form-group">
              <label className="edusync-form-label">Weekly teaching load</label>
              <input
                type="text"
                placeholder="18 periods / week"
                className="edusync-form-input"
                value={weeklyLoad}
                onChange={(e) => setWeeklyLoad(e.target.value)}
              />
            </div>

            <div className="edusync-form-group">
              <label className="edusync-form-label">Availability status</label>
              <select
                className="edusync-form-select"
                value={availability}
                onChange={(e) => setAvailability(e.target.value as TeacherAvailability)}
              >
                <option value="Available">Available</option>
                <option value="On leave">On leave</option>
                <option value="Limited">Limited</option>
                <option value="Unavailable">Unavailable</option>
              </select>
            </div>
          </div>
        </div>

        {/* Form Actions Footer */}
        <div className="edusync-teacher-form-footer">
          <span className="edusync-teacher-form-footer__notice">
            Complete required fields before saving teacher record.
          </span>
          <div className="edusync-teacher-form-footer__btns">
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
              {isLoading ? 'Saving...' : 'Save teacher'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
