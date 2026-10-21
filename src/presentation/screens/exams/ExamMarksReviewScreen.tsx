import React from 'react';
import { useExamFlow } from '../../../application/state/exam-flow.context';
import { ExamsNavTabs } from './components/ExamsNavTabs';
import type { StudentExamMark } from '../../../core/entities/exam.types';

interface ExamMarksReviewScreenProps {
  onNavigateToDashboard: () => void;
}

export const ExamMarksReviewScreen: React.FC<ExamMarksReviewScreenProps> = ({
  onNavigateToDashboard,
}) => {
  const {
    allExams,
    teacherSubmissions,
    studentMarks,
    gradingBands,
    filterClass,
    filterSubject,
    filterTeacherStatus,
    setFilterClass,
    setFilterSubject,
    setFilterTeacherStatus,
    approveTeacherMarks,
    sendTeacherReminder,
    setIsGradingConfigModalOpen,
    setEditingMark,
    goToOverview,
  } = useExamFlow();

  const getValidationBadge = (val: string) => {
    switch (val) {
      case 'Valid':
        return (
          <span className="edusync-badge-custom edusync-badge-custom--valid">
            Valid
          </span>
        );
      case '2 missing':
      case 'Missing':
        return (
          <span className="edusync-badge-custom edusync-badge-custom--missing">
            {val}
          </span>
        );
      case 'Out of range':
        return (
          <span className="edusync-badge-custom edusync-badge-custom--out-range">
            Out of range
          </span>
        );
      case 'Not submitted':
        return (
          <span className="edusync-badge-custom edusync-badge-custom--draft">
            Not submitted
          </span>
        );
      default:
        return (
          <span className="edusync-badge-custom edusync-badge-custom--draft">
            {val}
          </span>
        );
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Submitted':
        return (
          <span className="edusync-badge-custom edusync-badge-custom--published">
            Submitted
          </span>
        );
      case 'Under Review':
        return (
          <span className="edusync-badge-custom edusync-badge-custom--under-review">
            Under Review
          </span>
        );
      case 'Pending':
        return (
          <span className="edusync-badge-custom edusync-badge-custom--pending">
            Pending
          </span>
        );
      case 'Approved':
        return (
          <span className="edusync-badge-custom edusync-badge-custom--valid">
            Approved
          </span>
        );
      default:
        return (
          <span className="edusync-badge-custom edusync-badge-custom--draft">
            {status}
          </span>
        );
    }
  };

  const handleEditMark = (mark: StudentExamMark) => {
    setEditingMark(mark);
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
              Marks Entry &amp; Review
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
                <h1 className="exams-hero__title">Marks Entry &amp; Review</h1>
                <span className="edusync-badge-custom edusync-badge-custom--under-review">
                  Under Review
                </span>
              </div>
              <p className="exams-hero__subtitle">
                Track teacher-submitted marks, validate scores, and configure grading.
              </p>
            </div>
          </div>
        </div>

        <div className="exams-hero__actions">
          <button
            type="button"
            className="edusync-btn edusync-btn--secondary"
            onClick={goToOverview}
          >
            ← Back to overview
          </button>
          <button
            type="button"
            className="edusync-btn edusync-btn--primary"
            onClick={() => setIsGradingConfigModalOpen(true)}
          >
            ⚙️ Grading configuration
          </button>
        </div>
      </div>

      {/* 2. SUB-NAVIGATION TABS */}
      <ExamsNavTabs />

      {/* 3. MARKS FILTERS CARD */}
      <div className="exams-card exams-filter-card">
        <div className="exams-filter-grid">
          <div className="exams-filter-field" style={{ flex: 1.5 }}>
            <label className="exams-filter-label">Exam</label>
            <select className="exams-select" defaultValue="Mid-Term Examination">
              {allExams.map((e) => (
                <option key={e.id} value={e.name}>
                  {e.name}
                </option>
              ))}
            </select>
          </div>

          <div className="exams-filter-field">
            <label className="exams-filter-label">Class / Section</label>
            <select
              className="exams-select"
              value={filterClass}
              onChange={(e) => setFilterClass(e.target.value)}
            >
              <option value="Class 8-A">Class 8-A</option>
              <option value="Class 8-B">Class 8-B</option>
              <option value="Class 9-A">Class 9-A</option>
              <option value="Class 7-B">Class 7-B</option>
            </select>
          </div>

          <div className="exams-filter-field">
            <label className="exams-filter-label">Subject</label>
            <select
              className="exams-select"
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
            >
              <option value="Mathematics">Mathematics</option>
              <option value="English">English</option>
              <option value="Science">Science</option>
              <option value="History">History</option>
            </select>
          </div>

          <div className="exams-filter-field">
            <label className="exams-filter-label">Teacher review status</label>
            <select
              className="exams-select"
              value={filterTeacherStatus}
              onChange={(e) => setFilterTeacherStatus(e.target.value)}
            >
              <option value="All statuses">All statuses</option>
              <option value="Submitted">Submitted</option>
              <option value="Under Review">Under Review</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
            </select>
          </div>

          <div className="exams-filter-actions">
            <button
              type="button"
              className="edusync-btn edusync-btn--secondary edusync-btn--sm"
              onClick={() => {
                setFilterClass('Class 8-A');
                setFilterSubject('Mathematics');
                setFilterTeacherStatus('All statuses');
              }}
            >
              Reset
            </button>
            <button
              type="button"
              className="edusync-btn edusync-btn--primary edusync-btn--sm"
              onClick={() => alert('Filters applied.')}
            >
              Apply
            </button>
          </div>
        </div>
      </div>

      {/* 4. TEACHER-SUBMITTED MARKS TABLE */}
      <div className="exams-card">
        <div className="exams-card__header-group">
          <h2 className="exams-card__title">Teacher-submitted marks</h2>
          <p className="exams-card__subtitle">
            Review completion, validate scores, and approve submitted marks.
          </p>
        </div>

        <div className="edusync-table-container">
          <table className="edusync-table">
            <thead>
              <tr>
                <th>CLASS / SUBJECT</th>
                <th>TEACHER</th>
                <th>SUBMITTED</th>
                <th>MARKS</th>
                <th>VALIDATION</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {teacherSubmissions.map((sub) => (
                <tr key={sub.id}>
                  <td>
                    <strong>{sub.className} · {sub.subject}</strong>
                  </td>
                  <td>{sub.teacherName}</td>
                  <td>{sub.submittedAt}</td>
                  <td>{sub.submittedCount} / {sub.totalStudents}</td>
                  <td>{getValidationBadge(sub.validation)}</td>
                  <td>{getStatusBadge(sub.status)}</td>
                  <td>
                    {sub.status === 'Pending' ? (
                      <button
                        type="button"
                        className="edusync-btn-text-action"
                        onClick={() => sendTeacherReminder(sub.id)}
                      >
                        Send reminder
                      </button>
                    ) : sub.status === 'Approved' ? (
                      <span style={{ fontSize: '12px', color: '#166534', fontWeight: 600 }}>
                        ✓ Approved
                      </span>
                    ) : (
                      <button
                        type="button"
                        className="edusync-btn-text-action"
                        onClick={() => approveTeacherMarks(sub.id)}
                      >
                        Review &amp; Approve
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. SPLIT ROW: MARKS ENTRY OVERVIEW & GRADING CONFIGURATION */}
      <div className="exams-split-row--50-50">
        {/* Left: Marks Entry Overview */}
        <div className="exams-card">
          <div className="exams-card__header-group">
            <h2 className="exams-card__title">Marks entry overview</h2>
            <p className="exams-card__subtitle">
              Class 8-A · Mathematics · Maximum marks: 100
            </p>
          </div>

          <div className="edusync-table-container">
            <table className="edusync-table">
              <thead>
                <tr>
                  <th>STUDENT</th>
                  <th>ROLL</th>
                  <th>MARKS</th>
                  <th>VALIDATION</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {studentMarks.map((sm) => (
                  <tr key={sm.id}>
                    <td>
                      <span style={{ fontWeight: 600, color: 'var(--edusync-text-navy, #14213D)' }}>
                        {sm.studentName}
                      </span>
                    </td>
                    <td>{sm.rollNo}</td>
                    <td>{sm.marks !== null ? sm.marks : '—'}</td>
                    <td>{getValidationBadge(sm.validation)}</td>
                    <td>
                      <button
                        type="button"
                        className="edusync-btn-text-action"
                        onClick={() => handleEditMark(sm)}
                      >
                        {sm.validation === 'Out of range'
                          ? 'Fix marks'
                          : sm.validation === 'Missing'
                          ? 'Enter marks'
                          : 'Edit'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Grading Configuration */}
        <div className="exams-card">
          <div className="exams-card__header-row">
            <div className="exams-card__header-group">
              <h2 className="exams-card__title">Grading configuration</h2>
              <p className="exams-card__subtitle">
                Configure score bands and grade points.
              </p>
            </div>
            <button
              type="button"
              className="edusync-btn edusync-btn--secondary edusync-btn--sm"
              onClick={() => setIsGradingConfigModalOpen(true)}
            >
              Edit grading scale
            </button>
          </div>

          <div className="edusync-table-container">
            <table className="edusync-table">
              <thead>
                <tr>
                  <th>GRADE</th>
                  <th>MARKS RANGE</th>
                  <th>GRADE POINT</th>
                </tr>
              </thead>
              <tbody>
                {gradingBands.slice(0, 4).map((band) => (
                  <tr key={band.grade}>
                    <td>
                      <span className="edusync-badge-custom edusync-badge-custom--valid">
                        {band.grade}
                      </span>
                    </td>
                    <td>{band.range}</td>
                    <td><strong>{band.gradePoint}</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button
              type="button"
              className="edusync-btn edusync-btn--primary"
              onClick={() => {
                if (teacherSubmissions.length > 0) {
                  approveTeacherMarks(teacherSubmissions[0].id);
                }
              }}
            >
              Approve selected marks
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
