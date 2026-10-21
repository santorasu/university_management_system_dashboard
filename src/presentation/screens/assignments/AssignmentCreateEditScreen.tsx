import React, { useState } from 'react';
import { useAssignmentFlow } from '../../../application/state/assignment-flow.context';
import { AssignmentsNavTabs } from './components/AssignmentsNavTabs';
import type {
  AssignmentAttachment,
  LatePolicy,
  SubmissionType,
} from '../../../core/entities/assignment.types';

interface AssignmentCreateEditScreenProps {
  onNavigateToDashboard: () => void;
}

export const AssignmentCreateEditScreen: React.FC<AssignmentCreateEditScreenProps> = ({
  onNavigateToDashboard,
}) => {
  const {
    editingAssignment,
    isCreateMode,
    isSubmitting,
    saveDraft,
    publishAssignment,
    goToOverview,
    goToListDetails,
  } = useAssignmentFlow();

  // Form State
  const [title, setTitle] = useState(
    editingAssignment?.title || (isCreateMode ? 'Algebra — Worksheet 05' : '')
  );
  const [academicYear, setAcademicYear] = useState(
    editingAssignment?.academicYear || '2026–2027'
  );
  const [className, setClassName] = useState(
    editingAssignment?.className || 'Class 8-A'
  );
  const [section, setSection] = useState(
    editingAssignment?.section || 'Section A'
  );
  const [subject, setSubject] = useState(
    editingAssignment?.subject || 'Mathematics'
  );
  const [teacherName, setTeacherName] = useState(
    editingAssignment?.teacherName || 'Nusrat Jahan'
  );
  const [dueDate, setDueDate] = useState(
    editingAssignment?.dueDate || '28 Oct 2026'
  );
  const [dueTime, setDueTime] = useState(
    editingAssignment?.dueTime || '11:59 PM'
  );
  const [instructions, setInstructions] = useState(
    editingAssignment?.instructions ||
      'Complete questions 1–15. Show your working and submit as a PDF.'
  );
  const [maxMarks, setMaxMarks] = useState<number>(
    editingAssignment?.maxMarks || 20
  );
  const [submissionType, setSubmissionType] = useState<SubmissionType>(
    editingAssignment?.submissionType || 'File upload'
  );
  const [latePolicy, setLatePolicy] = useState<LatePolicy>(
    editingAssignment?.latePolicy || 'Allow with late label'
  );

  const [attachments, setAttachments] = useState<AssignmentAttachment[]>(
    editingAssignment?.attachments || [
      {
        id: 'att-default',
        name: 'Unit 4 — Algebra notes.pdf',
        size: '1.8 MB',
        type: 'PDF',
      },
    ]
  );

  const [visibleToClass, setVisibleToClass] = useState<boolean>(
    editingAssignment?.visibleToClass ?? false
  );
  const [notifyStudents, setNotifyStudents] = useState<boolean>(
    editingAssignment?.notifyStudents ?? true
  );
  const [allowResubmission, setAllowResubmission] = useState<boolean>(
    editingAssignment?.allowResubmission ?? true
  );

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const newAtt: AssignmentAttachment = {
        id: `att-${Date.now()}`,
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        type: file.type.includes('pdf') ? 'PDF' : 'Document',
      };
      setAttachments((prev) => [...prev, newAtt]);
    }
  };

  const removeAttachment = (id: string) => {
    setAttachments((prev) => prev.filter((a) => a.id !== id));
  };

  const getFormData = () => ({
    title,
    academicYear,
    className,
    section,
    subject,
    teacherName,
    dueDate,
    dueTime,
    instructions,
    maxMarks,
    submissionType,
    latePolicy,
    attachments,
    visibleToClass,
    notifyStudents,
    allowResubmission,
  });

  const handleSaveDraft = async () => {
    await saveDraft(getFormData());
  };

  const handlePublish = async () => {
    await publishAssignment(getFormData());
  };

  return (
    <div className="assignments-container">
      {/* 1. HERO HEADER & BREADCRUMBS */}
      <div className="assignments-hero">
        <div>
          <div className="assignments-hero__crumbs">
            <button
              type="button"
              className="assignments-hero__crumb--link"
              onClick={onNavigateToDashboard}
            >
              Dashboard
            </button>
            <span className="assignments-hero__crumb-sep">/</span>
            <button
              type="button"
              className="assignments-hero__crumb--link"
              onClick={goToOverview}
            >
              Assignments &amp; Class Materials
            </button>
            <span className="assignments-hero__crumb-sep">/</span>
            <button
              type="button"
              className="assignments-hero__crumb--link"
              onClick={() => goToListDetails()}
            >
              Assignment list
            </button>
            <span className="assignments-hero__crumb-sep">/</span>
            <span style={{ color: 'var(--edusync-text-navy, #14213D)', fontWeight: 600 }}>
              {isCreateMode ? 'Create assignment' : 'Edit assignment'}
            </span>
          </div>

          <div className="assignments-hero__title-row">
            <button
              type="button"
              className="edusync-btn-back-circle"
              onClick={() => goToListDetails()}
              title="Return to Assignment List"
              aria-label="Back to List"
            >
              ←
            </button>
            <div>
              <h1 className="assignments-hero__title">
                {isCreateMode ? 'Create assignment' : 'Edit assignment'}
              </h1>
              <p className="assignments-hero__subtitle">
                Set the assignment details, class context, deadlines, and learning resources.
              </p>
            </div>
          </div>
        </div>

        <div className="assignments-hero__actions">
          <button
            type="button"
            className="edusync-btn edusync-btn--secondary"
            onClick={() => goToListDetails()}
          >
            ← Back to list
          </button>
          <span className="edusync-badge-custom edusync-badge-custom--draft">
            Draft
          </span>
          <button
            type="button"
            className="edusync-btn edusync-btn--secondary"
            onClick={handleSaveDraft}
            disabled={isSubmitting}
          >
            Save draft
          </button>
          <button
            type="button"
            className="edusync-btn edusync-btn--primary"
            onClick={handlePublish}
            disabled={isSubmitting}
          >
            {isCreateMode ? 'Publish assignment' : 'Save changes'}
          </button>
        </div>
      </div>

      {/* 2. SUB-NAVIGATION TABS (Placed directly below Hero for consistency) */}
      <AssignmentsNavTabs />

      {/* 3. TWO-COLUMN SPLIT FORM GRID */}
      <div className="assignments-split-row">
        {/* LEFT COLUMN: Assignment details form (65%) */}
        <div className="assignments-card">
          <div className="assignments-card__header-group">
            <h2 className="assignments-card__title">Assignment details</h2>
          </div>

          <form className="assignments-form" onSubmit={(e) => e.preventDefault()}>
            {/* Title & Academic Year */}
            <div className="assignments-form-row assignments-form-row--2col">
              <div className="assignments-form-field" style={{ flex: 2 }}>
                <label className="assignments-form-label">Assignment title *</label>
                <input
                  type="text"
                  className="assignments-input"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Algebra — Worksheet 05"
                  required
                />
              </div>

              <div className="assignments-form-field" style={{ flex: 1 }}>
                <label className="assignments-form-label">Academic year</label>
                <input
                  type="text"
                  className="assignments-input"
                  value={academicYear}
                  onChange={(e) => setAcademicYear(e.target.value)}
                />
              </div>
            </div>

            {/* Class, Section, Subject */}
            <div className="assignments-form-row assignments-form-row--3col">
              <div className="assignments-form-field">
                <label className="assignments-form-label">Class *</label>
                <select
                  className="assignments-select"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                >
                  <option value="Class 8-A">Class 8</option>
                  <option value="Class 7-B">Class 7</option>
                  <option value="Class 9-A">Class 9</option>
                  <option value="Class 8-B">Class 8</option>
                </select>
              </div>

              <div className="assignments-form-field">
                <label className="assignments-form-label">Section *</label>
                <select
                  className="assignments-select"
                  value={section}
                  onChange={(e) => setSection(e.target.value)}
                >
                  <option value="Section A">Section A</option>
                  <option value="Section B">Section B</option>
                  <option value="Section C">Section C</option>
                </select>
              </div>

              <div className="assignments-form-field">
                <label className="assignments-form-label">Subject *</label>
                <select
                  className="assignments-select"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                >
                  <option value="Mathematics">Mathematics</option>
                  <option value="English">English</option>
                  <option value="Science">Science</option>
                </select>
              </div>
            </div>

            {/* Teacher, Due Date, Due Time */}
            <div className="assignments-form-row assignments-form-row--3col">
              <div className="assignments-form-field">
                <label className="assignments-form-label">Assigned teacher</label>
                <input
                  type="text"
                  className="assignments-input"
                  value={teacherName}
                  onChange={(e) => setTeacherName(e.target.value)}
                />
              </div>

              <div className="assignments-form-field">
                <label className="assignments-form-label">Due date *</label>
                <input
                  type="text"
                  className="assignments-input"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  placeholder="28 Oct 2026"
                  required
                />
              </div>

              <div className="assignments-form-field">
                <label className="assignments-form-label">Due time</label>
                <input
                  type="text"
                  className="assignments-input"
                  value={dueTime}
                  onChange={(e) => setDueTime(e.target.value)}
                />
              </div>
            </div>

            {/* Instructions */}
            <div className="assignments-form-field">
              <label className="assignments-form-label">Instructions</label>
              <textarea
                className="assignments-textarea"
                rows={3}
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="Complete questions 1–15. Show your working and submit as a PDF."
              />
            </div>

            {/* Maximum marks, Submission type, Late submission policy */}
            <div className="assignments-form-row assignments-form-row--3col">
              <div className="assignments-form-field">
                <label className="assignments-form-label">Maximum marks</label>
                <input
                  type="number"
                  className="assignments-input"
                  value={maxMarks}
                  onChange={(e) => setMaxMarks(Number(e.target.value))}
                />
              </div>

              <div className="assignments-form-field">
                <label className="assignments-form-label">Submission type</label>
                <select
                  className="assignments-select"
                  value={submissionType}
                  onChange={(e) => setSubmissionType(e.target.value as SubmissionType)}
                >
                  <option value="File upload">File upload</option>
                  <option value="Online text">Online text</option>
                  <option value="Physical paper">Physical paper</option>
                </select>
              </div>

              <div className="assignments-form-field">
                <label className="assignments-form-label">Late submission policy</label>
                <select
                  className="assignments-select"
                  value={latePolicy}
                  onChange={(e) => setLatePolicy(e.target.value as LatePolicy)}
                >
                  <option value="Allow with late label">Allow with late label</option>
                  <option value="Reject late submissions">Reject late submissions</option>
                  <option value="Penalty per day">Penalty per day</option>
                </select>
              </div>
            </div>
          </form>
        </div>

        {/* RIGHT COLUMN: Stack of Attachments & Publishing Options (35%) */}
        <div className="assignments-side-stack">
          {/* Card 1: Attachments & resources */}
          <div className="assignments-card assignments-side-card">
            <div className="assignments-card__header-group">
              <h2 className="assignments-card__title">Attachments &amp; resources</h2>
              <p className="assignments-card__subtitle">
                Attach worksheets or link helpful reading material.
              </p>
            </div>

            <label className="assignments-upload-zone">
              <input
                type="file"
                className="assignments-visually-hidden"
                onChange={handleFileUpload}
              />
              <span className="assignments-upload-zone__icon">＋ Upload files</span>
              <span className="assignments-upload-zone__hint">
                PDF, DOCX, PPTX, JPG · up to 20 MB
              </span>
            </label>

            <div className="assignments-attachments-list">
              {attachments.map((att) => (
                <div key={att.id} className="assignments-attachment-item">
                  <div className="assignments-attachment-item__info">
                    <span className="assignments-attachment-item__name">
                      {att.name}
                    </span>
                    <span className="assignments-attachment-item__meta">
                      {att.size} · {att.type}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="assignments-btn-icon-remove"
                    onClick={() => removeAttachment(att.id)}
                    aria-label="Remove attachment"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Publishing options */}
          <div className="assignments-card assignments-side-card">
            <div className="assignments-card__header-group">
              <h2 className="assignments-card__title">Publishing options</h2>
            </div>

            <div className="assignments-options-list">
              <label className="assignments-checkbox-row">
                <input
                  type="checkbox"
                  checked={visibleToClass}
                  onChange={(e) => setVisibleToClass(e.target.checked)}
                />
                <div className="assignments-checkbox-row__text">
                  <span className="assignments-checkbox-row__title">
                    Visible to selected class
                  </span>
                  <span className="assignments-checkbox-row__desc">
                    Students in {className}
                  </span>
                </div>
              </label>

              <label className="assignments-checkbox-row">
                <input
                  type="checkbox"
                  checked={notifyStudents}
                  onChange={(e) => setNotifyStudents(e.target.checked)}
                />
                <div className="assignments-checkbox-row__text">
                  <span className="assignments-checkbox-row__title">
                    Notify students
                  </span>
                  <span className="assignments-checkbox-row__desc">
                    Send notification on publish
                  </span>
                </div>
              </label>

              <label className="assignments-checkbox-row">
                <input
                  type="checkbox"
                  checked={allowResubmission}
                  onChange={(e) => setAllowResubmission(e.target.checked)}
                />
                <div className="assignments-checkbox-row__text">
                  <span className="assignments-checkbox-row__title">
                    Allow resubmission
                  </span>
                  <span className="assignments-checkbox-row__desc">
                    Students can replace their file
                  </span>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* 4. VALIDATION HELPER CARD */}
      <div className="assignments-card assignments-helper-card">
        <div className="assignments-helper-card__content">
          <div>
            <h3 className="assignments-helper-card__title">Before publishing</h3>
            <p className="assignments-helper-card__desc">
              Confirm class, section, subject, teacher, and due date. Students will see the
              assignment after it is published.
            </p>
          </div>
          <span className="edusync-badge-custom edusync-badge-custom--warning">
            Required fields
          </span>
        </div>
      </div>

      {/* 5. STUDENT-FACING PREVIEW CARD */}
      <div className="assignments-card assignments-preview-card">
        <div className="assignments-preview-card__header">
          <span className="assignments-preview-card__tag">
            Student-facing preview
          </span>
          <span className="edusync-badge-custom edusync-badge-custom--draft">
            Draft preview
          </span>
        </div>
        <div className="assignments-preview-card__body">
          <h3 className="assignments-preview-card__title">
            {title || 'Untitled Assignment'}
          </h3>
          <p className="assignments-preview-card__meta">
            {className} · {subject} · Due {dueDate}, {dueTime} · {maxMarks} marks
          </p>
        </div>
      </div>

      {/* 6. BOTTOM ACTIONS BAR */}
      <div className="assignments-bottom-actions">
        <button
          type="button"
          className="edusync-btn edusync-btn--secondary"
          onClick={() => goToListDetails()}
        >
          Cancel
        </button>
        <div className="assignments-bottom-actions__right">
          <button
            type="button"
            className="edusync-btn edusync-btn--secondary"
            onClick={handleSaveDraft}
            disabled={isSubmitting}
          >
            Save draft
          </button>
          <button
            type="button"
            className="edusync-btn edusync-btn--primary"
            onClick={handlePublish}
            disabled={isSubmitting}
          >
            {isCreateMode ? 'Publish assignment' : 'Save changes'}
          </button>
        </div>
      </div>
    </div>
  );
};
