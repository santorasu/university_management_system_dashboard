import React, { useState } from 'react';
import { useExamFlow } from '../../../application/state/exam-flow.context';
import { ExamsNavTabs } from './components/ExamsNavTabs';
import type {
  ExamType,
  AcademicTerm,
  SubjectScheduleItem,
} from '../../../core/entities/exam.types';

interface ExamCreateScheduleScreenProps {
  onNavigateToDashboard: () => void;
}

export const ExamCreateScheduleScreen: React.FC<ExamCreateScheduleScreenProps> = ({
  onNavigateToDashboard,
}) => {
  const {
    editingExam,
    isCreateMode,
    scheduleExam,
    saveDraft,
    goToOverview,
  } = useExamFlow();

  const [name, setName] = useState<string>(
    editingExam?.name || 'Mid-Term Examination'
  );
  const [type, setType] = useState<ExamType>(
    editingExam?.type || 'Mid-Term'
  );
  const [academicYear, setAcademicYear] = useState<string>(
    editingExam?.academicYear || '2026–2027'
  );
  const [term, setTerm] = useState<AcademicTerm>(
    editingExam?.term || 'Term 1'
  );
  const [startDate, setStartDate] = useState<string>(
    editingExam?.startDate || '24 Oct 2026'
  );
  const [endDate, setEndDate] = useState<string>(
    editingExam?.endDate || '31 Oct 2026'
  );
  const [classesInput, setClassesInput] = useState<string>(
    editingExam?.classes?.join(', ') || 'Class 8-A, Class 8-B, Class 7-A, Class 7-B'
  );
  const [subjectsInput, setSubjectsInput] = useState<string>(
    editingExam?.subjects?.join(', ') || 'Mathematics, English, Science, History, Geography'
  );
  const [instructions, setInstructions] = useState<string>(
    editingExam?.instructions ||
      'Review subject schedules and confirm invigilator assignments before publishing the timetable.'
  );

  const [schedules, setSchedules] = useState<SubjectScheduleItem[]>(
    editingExam?.schedule?.length
      ? editingExam.schedule
      : [
          {
            id: 'sch-1',
            subject: 'Mathematics',
            date: '24 Oct',
            time: '09:00',
            duration: '2 hrs',
            room: 'Room 204',
          },
          {
            id: 'sch-2',
            subject: 'English',
            date: '25 Oct',
            time: '09:00',
            duration: '2 hrs',
            room: 'Room 205',
          },
          {
            id: 'sch-3',
            subject: 'Science',
            date: '27 Oct',
            time: '11:00',
            duration: '2 hrs',
            room: 'Lab 1',
          },
        ]
  );

  const [isAddScheduleOpen, setIsAddScheduleOpen] = useState(false);
  const [newSubject, setNewSubject] = useState('History');
  const [newDate, setNewDate] = useState('29 Oct');
  const [newTime, setNewTime] = useState('09:00');
  const [newRoom, setNewRoom] = useState('Room 206');

  const handleAddSchedule = () => {
    if (!newSubject.trim()) return;
    setSchedules((prev) => [
      ...prev,
      {
        id: `sch-${Date.now()}`,
        subject: newSubject,
        date: newDate,
        time: newTime,
        duration: '2 hrs',
        room: newRoom,
      },
    ]);
    setIsAddScheduleOpen(false);
  };

  const handleRemoveSchedule = (id: string) => {
    setSchedules((prev) => prev.filter((s) => s.id !== id));
  };

  const handleScheduleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const classList = classesInput.split(',').map((c) => c.trim()).filter(Boolean);
    const subjectList = subjectsInput.split(',').map((s) => s.trim()).filter(Boolean);

    await scheduleExam({
      name,
      type,
      academicYear,
      term,
      startDate,
      endDate,
      classes: classList,
      subjects: subjectList,
      instructions,
      schedule: schedules,
    });
  };

  const handleDraftSubmit = async () => {
    const classList = classesInput.split(',').map((c) => c.trim()).filter(Boolean);
    const subjectList = subjectsInput.split(',').map((s) => s.trim()).filter(Boolean);

    await saveDraft({
      name,
      type,
      academicYear,
      term,
      startDate,
      endDate,
      classes: classList,
      subjects: subjectList,
      instructions,
      schedule: schedules,
    });
  };

  return (
    <div className="exams-container">
      {/* 1. HERO HEADER */}
      <div className="exams-hero">
        <div>
          <div className="exams-hero__crumbs">
            <button
              type="button"
              className="exams-hero__crumb--link"
              onClick={onNavigateToDashboard}
            >
              Dashboard
            </button>
            <span className="exams-hero__crumb-sep">/</span>
            <button
              type="button"
              className="exams-hero__crumb--link"
              onClick={goToOverview}
            >
              Exams &amp; Results
            </button>
            <span className="exams-hero__crumb-sep">/</span>
            <span style={{ color: 'var(--edusync-text-navy, #14213D)', fontWeight: 600 }}>
              {isCreateMode ? 'Create Exam' : 'Edit Exam'}
            </span>
          </div>

          <div className="exams-hero__title-row">
            <button
              type="button"
              className="edusync-btn-back-circle"
              onClick={goToOverview}
              title="Return to Overview"
              aria-label="Back to Overview"
            >
              ←
            </button>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h1 className="exams-hero__title">
                  {isCreateMode ? 'Create / Edit Exam' : `Edit: ${editingExam?.name}`}
                </h1>
                <span className="edusync-badge-custom edusync-badge-custom--draft">
                  Draft
                </span>
              </div>
              <p className="exams-hero__subtitle">
                Configure exam type, academic term, classes, subjects, and schedule.
              </p>
            </div>
          </div>
        </div>

        <div className="exams-hero__actions">
          <button
            type="button"
            className="edusync-btn edusync-btn--secondary"
            onClick={handleDraftSubmit}
          >
            Save draft
          </button>
          <button
            type="button"
            className="edusync-btn edusync-btn--primary"
            onClick={handleScheduleSubmit}
          >
            Schedule exam
          </button>
        </div>
      </div>

      {/* 2. SUB-NAVIGATION TABS */}
      <ExamsNavTabs />

      {/* 3. MAIN FORM LAYOUT: TWO COLUMNS (65% / 35%) */}
      <form onSubmit={handleScheduleSubmit}>
        <div className="exams-split-row--form">
          {/* Left Column: Form Details & Subject Schedule */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Card 1: Exam information */}
            <div className="exams-card">
              <div className="exams-card__header-group">
                <h2 className="exams-card__title">Exam information</h2>
                <p className="exams-card__subtitle">
                  Define high-level administrative details and timeline
                </p>
              </div>

              <div className="exams-form-field">
                <label className="exams-filter-label">Exam name *</label>
                <input
                  type="text"
                  className="exams-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Mid-Term Examination"
                  required
                />
              </div>

              <div className="exams-form-row exams-form-row--2col">
                <div className="exams-form-field">
                  <label className="exams-filter-label">Exam type</label>
                  <select
                    className="exams-select"
                    value={type}
                    onChange={(e) => setType(e.target.value as ExamType)}
                  >
                    <option value="Mid-Term">Mid-Term</option>
                    <option value="Final Exam">Final Exam</option>
                    <option value="Class Test">Class Test</option>
                    <option value="Diagnostic Quiz">Diagnostic Quiz</option>
                    <option value="Annual Examination">Annual Examination</option>
                  </select>
                </div>

                <div className="exams-form-field">
                  <label className="exams-filter-label">Academic year</label>
                  <input
                    type="text"
                    className="exams-input"
                    value={academicYear}
                    onChange={(e) => setAcademicYear(e.target.value)}
                  />
                </div>
              </div>

              <div className="exams-form-row exams-form-row--2col">
                <div className="exams-form-field">
                  <label className="exams-filter-label">Academic term</label>
                  <select
                    className="exams-select"
                    value={term}
                    onChange={(e) => setTerm(e.target.value as AcademicTerm)}
                  >
                    <option value="Term 1">Term 1</option>
                    <option value="Term 2">Term 2</option>
                    <option value="Term 3">Term 3</option>
                  </select>
                </div>

                <div className="exams-form-field">
                  <label className="exams-filter-label">Exam dates (Start — End)</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="text"
                      className="exams-input"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      placeholder="Start date"
                    />
                    <input
                      type="text"
                      className="exams-input"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      placeholder="End date"
                    />
                  </div>
                </div>
              </div>

              <div className="exams-form-row exams-form-row--2col">
                <div className="exams-form-field">
                  <label className="exams-filter-label">Applicable classes (comma separated)</label>
                  <input
                    type="text"
                    className="exams-input"
                    value={classesInput}
                    onChange={(e) => setClassesInput(e.target.value)}
                    placeholder="e.g. Class 8-A, Class 8-B"
                  />
                </div>

                <div className="exams-form-field">
                  <label className="exams-filter-label">Subjects (comma separated)</label>
                  <input
                    type="text"
                    className="exams-input"
                    value={subjectsInput}
                    onChange={(e) => setSubjectsInput(e.target.value)}
                    placeholder="e.g. Mathematics, English, Science"
                  />
                </div>
              </div>

              <div className="exams-form-field">
                <label className="exams-filter-label">Exam instructions</label>
                <textarea
                  className="exams-textarea"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  rows={3}
                />
              </div>
            </div>

            {/* Card 2: Subject schedule */}
            <div className="exams-card">
              <div className="exams-card__header-row">
                <div className="exams-card__header-group">
                  <h2 className="exams-card__title">Subject schedule</h2>
                  <p className="exams-card__subtitle">
                    Add an exam date, time, duration, and room for each subject.
                  </p>
                </div>
                <button
                  type="button"
                  className="edusync-btn edusync-btn--secondary edusync-btn--sm"
                  onClick={() => setIsAddScheduleOpen(!isAddScheduleOpen)}
                >
                  {isAddScheduleOpen ? 'Cancel' : '＋ Add subject schedule'}
                </button>
              </div>

              {/* Inline Schedule Creator */}
              {isAddScheduleOpen && (
                <div
                  style={{
                    backgroundColor: '#F8FAFC',
                    border: '1px solid var(--edusync-border-default, #E4E7EC)',
                    borderRadius: '8px',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                  }}
                >
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                    <div className="exams-form-field">
                      <label className="exams-filter-label">Subject</label>
                      <input
                        type="text"
                        className="exams-input"
                        value={newSubject}
                        onChange={(e) => setNewSubject(e.target.value)}
                      />
                    </div>
                    <div className="exams-form-field">
                      <label className="exams-filter-label">Date</label>
                      <input
                        type="text"
                        className="exams-input"
                        value={newDate}
                        onChange={(e) => setNewDate(e.target.value)}
                      />
                    </div>
                    <div className="exams-form-field">
                      <label className="exams-filter-label">Time</label>
                      <input
                        type="text"
                        className="exams-input"
                        value={newTime}
                        onChange={(e) => setNewTime(e.target.value)}
                      />
                    </div>
                    <div className="exams-form-field">
                      <label className="exams-filter-label">Room</label>
                      <input
                        type="text"
                        className="exams-input"
                        value={newRoom}
                        onChange={(e) => setNewRoom(e.target.value)}
                      />
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                    <button
                      type="button"
                      className="edusync-btn edusync-btn--secondary edusync-btn--sm"
                      onClick={() => setIsAddScheduleOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="edusync-btn edusync-btn--primary edusync-btn--sm"
                      onClick={handleAddSchedule}
                    >
                      Save Slot
                    </button>
                  </div>
                </div>
              )}

              <div className="edusync-table-container">
                <table className="edusync-table">
                  <thead>
                    <tr>
                      <th>SUBJECT</th>
                      <th>DATE</th>
                      <th>TIME</th>
                      <th>ROOM</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {schedules.map((item) => (
                      <tr key={item.id}>
                        <td><strong>{item.subject}</strong></td>
                        <td>{item.date}</td>
                        <td>{item.time}</td>
                        <td>{item.room || 'Room 204'}</td>
                        <td>
                          <button
                            type="button"
                            className="edusync-btn-text-action"
                            style={{ color: '#DC2626' }}
                            onClick={() => handleRemoveSchedule(item.id)}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column: Validation Checklist, Confirmation, Feedback States */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Card 1: Validation checklist */}
            <div className="exams-card">
              <div className="exams-card__header-group">
                <h2 className="exams-card__title">Validation checklist</h2>
                <p className="exams-card__subtitle">
                  Verify parameters before scheduling
                </p>
              </div>

              <div className="exams-checklist-group">
                <div className="exams-checklist-item">
                  <span className="exams-check-icon--success">✓</span>
                  <span>Exam name, type and academic term</span>
                </div>
                <div className="exams-checklist-item">
                  <span className="exams-check-icon--success">✓</span>
                  <span>At least one class and subject selected</span>
                </div>
                <div className="exams-checklist-item">
                  <span className="exams-check-icon--warning">!</span>
                  <span>Start/end dates and subject times do not overlap</span>
                </div>
              </div>
            </div>

            {/* Card 2: Confirmation preview specimen */}
            <div className="exams-card" style={{ borderLeft: '4px solid var(--edusync-brand-primary, #3659D9)' }}>
              <div className="exams-card__header-group">
                <h3 className="exams-card__title">Schedule this exam?</h3>
                <p className="exams-card__subtitle">
                  Teachers will be notified when the schedule is published.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
                <button
                  type="button"
                  className="edusync-btn edusync-btn--secondary edusync-btn--sm"
                  onClick={goToOverview}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="edusync-btn edusync-btn--primary edusync-btn--sm"
                >
                  Confirm schedule
                </button>
              </div>
            </div>

            {/* Card 3: System feedback states (Figma specimen #51:1745) */}
            <div className="exams-card">
              <div className="exams-card__header-group">
                <h2 className="exams-card__title">System feedback states</h2>
                <p className="exams-card__subtitle">
                  Automated validation indicators
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ padding: '8px 12px', backgroundColor: '#F0FDF4', borderRadius: '6px', border: '1px solid #BBF7D0' }}>
                  <span className="edusync-badge-custom edusync-badge-custom--published" style={{ marginBottom: '4px', display: 'inline-block' }}>
                    Success · Exam scheduled
                  </span>
                  <p style={{ margin: 0, fontSize: '12px', color: '#166534' }}>
                    Schedule saved and teacher notifications queued.
                  </p>
                </div>

                <div style={{ padding: '8px 12px', backgroundColor: '#FEF2F2', borderRadius: '6px', border: '1px solid #FECACA' }}>
                  <span className="edusync-badge-custom edusync-badge-custom--late" style={{ marginBottom: '4px', display: 'inline-block' }}>
                    Error · Date conflict
                  </span>
                  <p style={{ margin: 0, fontSize: '12px', color: '#991B1B' }}>
                    This subject overlaps with another scheduled exam.
                  </p>
                </div>

                <div style={{ padding: '8px 12px', backgroundColor: '#FFFBEB', borderRadius: '6px', border: '1px solid #FDE68A' }}>
                  <span className="edusync-badge-custom edusync-badge-custom--pending" style={{ marginBottom: '4px', display: 'inline-block' }}>
                    Warning · Missing subject
                  </span>
                  <p style={{ margin: 0, fontSize: '12px', color: '#92400E' }}>
                    Add at least one subject before scheduling.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Actions Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '20px',
            paddingTop: '16px',
            borderTop: '1px solid var(--edusync-border-default, #E4E7EC)',
          }}
        >
          <button
            type="button"
            className="edusync-btn edusync-btn--secondary"
            onClick={goToOverview}
          >
            Cancel
          </button>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              type="button"
              className="edusync-btn edusync-btn--secondary"
              onClick={handleDraftSubmit}
            >
              Save draft
            </button>
            <button
              type="submit"
              className="edusync-btn edusync-btn--primary"
            >
              Schedule exam
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
