import React, { useState, useMemo } from 'react';
import { useAssignmentFlow } from '../../../application/state/assignment-flow.context';
import { AssignmentsNavTabs } from './components/AssignmentsNavTabs';
import type {
  StudentSubmission,
  SubmissionsInnerTab,
} from '../../../core/entities/assignment.types';

interface AssignmentSubmissionsMaterialsScreenProps {
  onNavigateToDashboard: () => void;
}

export const AssignmentSubmissionsMaterialsScreen: React.FC<
  AssignmentSubmissionsMaterialsScreenProps
> = ({ onNavigateToDashboard }) => {
  const {
    allAssignments,
    submissions,
    materials,
    submissionFilter,
    updateSubmissionFilter,
    activeInnerTab,
    setActiveInnerTab,
    setReviewingSubmission,
    setAddMaterialModalOpen,
    sendReminder,
    goToOverview,
  } = useAssignmentFlow();

  // Local filter states for Grading and Materials tabs
  const [gradingStatusFilter, setGradingStatusFilter] = useState<string>('ALL');
  const [gradingSearchQuery, setGradingSearchQuery] = useState<string>('');
  const [materialTypeFilter, setMaterialTypeFilter] = useState<string>('ALL');
  const [materialSearchQuery, setMaterialSearchQuery] = useState<string>('');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Submitted':
        return (
          <span className="edusync-badge-custom edusync-badge-custom--published">
            Submitted
          </span>
        );
      case 'Graded':
        return (
          <span className="edusync-badge-custom edusync-badge-custom--graded">
            Graded
          </span>
        );
      case 'Late':
        return (
          <span className="edusync-badge-custom edusync-badge-custom--late">
            Late
          </span>
        );
      case 'Pending':
        return (
          <span className="edusync-badge-custom edusync-badge-custom--pending">
            Pending
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

  const handleActionClick = (sub: StudentSubmission) => {
    if (sub.status === 'Pending') {
      sendReminder(sub.id);
    } else {
      setReviewingSubmission(sub);
    }
  };

  const innerTabs: { id: SubmissionsInnerTab; label: string }[] = [
    { id: 'SUBMISSIONS', label: 'Submissions' },
    { id: 'GRADING', label: 'Grading overview' },
    { id: 'MATERIALS', label: 'Class materials' },
  ];

  // Memoized lists for Grading tab
  const awaitingReviewSubmissions = useMemo(() => {
    return submissions.filter(
      (s) =>
        (s.status === 'Submitted' || s.status === 'Late') &&
        (gradingSearchQuery === '' ||
          s.studentName.toLowerCase().includes(gradingSearchQuery.toLowerCase()))
    );
  }, [submissions, gradingSearchQuery]);

  const gradedSubmissions = useMemo(() => {
    return submissions.filter(
      (s) =>
        s.status === 'Graded' &&
        (gradingSearchQuery === '' ||
          s.studentName.toLowerCase().includes(gradingSearchQuery.toLowerCase()))
    );
  }, [submissions, gradingSearchQuery]);

  // Memoized materials for Class Materials tab
  const filteredMaterials = useMemo(() => {
    return materials.filter((m) => {
      const matchesType =
        materialTypeFilter === 'ALL' || m.type === materialTypeFilter;
      const matchesSearch =
        materialSearchQuery === '' ||
          m.title.toLowerCase().includes(materialSearchQuery.toLowerCase()) ||
          m.subject.toLowerCase().includes(materialSearchQuery.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [materials, materialTypeFilter, materialSearchQuery]);

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
            <span style={{ color: 'var(--edusync-text-navy, #14213D)', fontWeight: 600 }}>
              {activeInnerTab === 'SUBMISSIONS'
                ? 'Student Submissions'
                : activeInnerTab === 'GRADING'
                ? 'Grading Overview'
                : 'Class Materials Library'}
            </span>
          </div>

          <div className="assignments-hero__title-row">
            <button
              type="button"
              className="edusync-btn-back-circle"
              onClick={goToOverview}
              title="Return to Assignments Overview"
              aria-label="Back to Overview"
            >
              ←
            </button>
            <div>
              <h1 className="assignments-hero__title">
                {activeInnerTab === 'SUBMISSIONS' && 'Student submissions'}
                {activeInnerTab === 'GRADING' && 'Grading & assessment overview'}
                {activeInnerTab === 'MATERIALS' && 'Class learning materials'}
              </h1>
              <p className="assignments-hero__subtitle">
                {activeInnerTab === 'SUBMISSIONS' &&
                  'Track, inspect, and evaluate student coursework submissions.'}
                {activeInnerTab === 'GRADING' &&
                  'Monitor grading progress, score distribution, and prioritize pending reviews.'}
                {activeInnerTab === 'MATERIALS' &&
                  'Organize and distribute syllabi, lecture notes, and worksheets with students.'}
              </p>
            </div>
          </div>
        </div>

        <div className="assignments-hero__actions">
          <button
            type="button"
            className="edusync-btn edusync-btn--secondary"
            onClick={goToOverview}
          >
            ← Back to overview
          </button>
          {activeInnerTab === 'MATERIALS' ? (
            <button
              type="button"
              className="edusync-btn edusync-btn--primary"
              onClick={() => setAddMaterialModalOpen(true)}
            >
              + Add material
            </button>
          ) : activeInnerTab === 'GRADING' ? (
            <button
              type="button"
              className="edusync-btn edusync-btn--primary"
              onClick={() => {
                if (awaitingReviewSubmissions.length > 0) {
                  setReviewingSubmission(awaitingReviewSubmissions[0]);
                } else {
                  alert('All submitted assignments have been evaluated!');
                }
              }}
            >
              ⚡ Grade next submission
            </button>
          ) : (
            <button
              type="button"
              className="edusync-btn edusync-btn--primary"
              onClick={() => alert('Exporting student submissions report...')}
            >
              Export CSV
            </button>
          )}
        </div>
      </div>

      {/* 2. SUB-NAVIGATION TABS (Pinned directly below Hero) */}
      <AssignmentsNavTabs />

      {/* 3. INNER SECTION TABS (Dedicated tab switcher) */}
      <div className="assignments-inner-tabs" role="tablist">
        {innerTabs.map((tab) => {
          const isActive = activeInnerTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`assignments-inner-tab ${
                isActive ? 'assignments-inner-tab--active' : ''
              }`}
              onClick={() => setActiveInnerTab(tab.id)}
            >
              <span>{tab.label}</span>
              {isActive && <div className="assignments-inner-tab__bar" />}
            </button>
          );
        })}
      </div>

      {/* =========================================================================
          TAB 1: SUBMISSIONS VIEW (Exclusively Student Submissions Table & Toolbar)
          ========================================================================= */}
      {activeInnerTab === 'SUBMISSIONS' && (
        <>
          {/* Submissions Filter Toolbar */}
          <div className="assignments-card assignments-filter-card">
            <div className="assignments-filter-grid">
              {/* Assignment dropdown */}
              <div className="assignments-filter-field" style={{ flex: 1.5 }}>
                <label className="assignments-filter-label">Assignment</label>
                <select
                  className="assignments-select"
                  value={submissionFilter.assignmentId}
                  onChange={(e) =>
                    updateSubmissionFilter({ assignmentId: e.target.value })
                  }
                >
                  {allAssignments.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Class / Section */}
              <div className="assignments-filter-field">
                <label className="assignments-filter-label">Class / Section</label>
                <select
                  className="assignments-select"
                  value={submissionFilter.className}
                  onChange={(e) =>
                    updateSubmissionFilter({ className: e.target.value })
                  }
                >
                  <option value="Class 8-A">Class 8-A</option>
                  <option value="Class 7-B">Class 7-B</option>
                  <option value="Class 9-A">Class 9-A</option>
                  <option value="Class 8-B">Class 8-B</option>
                </select>
              </div>

              {/* Submission status */}
              <div className="assignments-filter-field">
                <label className="assignments-filter-label">
                  Submission status
                </label>
                <select
                  className="assignments-select"
                  value={submissionFilter.status}
                  onChange={(e) =>
                    updateSubmissionFilter({ status: e.target.value })
                  }
                >
                  <option value="All statuses">All statuses</option>
                  <option value="Submitted">Submitted</option>
                  <option value="Graded">Graded</option>
                  <option value="Late">Late</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>

              {/* Student Search */}
              <div className="assignments-filter-field" style={{ flex: 1.2 }}>
                <label className="assignments-filter-label">Student search</label>
                <input
                  type="text"
                  className="assignments-input"
                  placeholder="Search student name"
                  value={submissionFilter.studentSearch}
                  onChange={(e) =>
                    updateSubmissionFilter({ studentSearch: e.target.value })
                  }
                />
              </div>

              {/* Export CTA */}
              <div className="assignments-filter-actions">
                <button
                  type="button"
                  className="edusync-btn edusync-btn--secondary edusync-btn--sm"
                  onClick={() => alert('Exporting submission records report...')}
                >
                  Export
                </button>
              </div>
            </div>
          </div>

          {/* Student submissions table */}
          <div className="assignments-card">
            <div className="assignments-card__header-group">
              <h2 className="assignments-card__title">Student submissions</h2>
              <p className="assignments-card__subtitle">
                32 students · 24 submitted · 5 pending · 3 late
              </p>
            </div>

            <div className="edusync-table-container">
              <table className="edusync-table">
                <thead>
                  <tr>
                    <th>STUDENT</th>
                    <th>SUBMITTED AT</th>
                    <th>FILE / RESOURCE</th>
                    <th>STATUS</th>
                    <th>MARKS</th>
                    <th>REVIEW</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((sub) => (
                    <tr key={sub.id}>
                      <td>
                        <span className="assignments-student-name">
                          {sub.studentName}
                        </span>
                      </td>
                      <td>{sub.submittedAt}</td>
                      <td>
                        {sub.fileName !== '—' ? (
                          <span className="assignments-file-link">
                            📎 {sub.fileName}
                          </span>
                        ) : (
                          '—'
                        )}
                      </td>
                      <td>{getStatusBadge(sub.status)}</td>
                      <td>
                        {sub.marks !== null && sub.marks !== undefined
                          ? `${sub.marks} / 20`
                          : '—'}
                      </td>
                      <td>
                        <button
                          type="button"
                          className="edusync-btn-text-action"
                          onClick={() => handleActionClick(sub)}
                        >
                          {sub.status === 'Graded'
                            ? 'View grade'
                            : sub.status === 'Pending'
                            ? 'Send reminder'
                            : 'Open submission'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Submissions Table Footer */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '12px',
                borderTop: '1px solid var(--edusync-border-default, #E4E7EC)',
                fontSize: '12px',
                color: 'var(--edusync-text-secondary, #667085)',
              }}
            >
              <span>Showing {submissions.length} of 32 submissions</span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  className="edusync-btn edusync-btn--secondary edusync-btn--sm"
                  disabled
                >
                  Previous
                </button>
                <button
                  type="button"
                  className="edusync-btn edusync-btn--secondary edusync-btn--sm"
                  disabled
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* =========================================================================
          TAB 2: GRADING OVERVIEW VIEW (Dedicated Assessment Analytics & Grading Queue)
          ========================================================================= */}
      {activeInnerTab === 'GRADING' && (
        <>
          {/* Grading Filter Bar */}
          <div className="assignments-card assignments-filter-card">
            <div className="assignments-filter-grid">
              <div className="assignments-filter-field" style={{ flex: 1.5 }}>
                <label className="assignments-filter-label">Assignment</label>
                <select
                  className="assignments-select"
                  value={submissionFilter.assignmentId}
                  onChange={(e) =>
                    updateSubmissionFilter({ assignmentId: e.target.value })
                  }
                >
                  {allAssignments.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="assignments-filter-field">
                <label className="assignments-filter-label">Class / Section</label>
                <select
                  className="assignments-select"
                  value={submissionFilter.className}
                  onChange={(e) =>
                    updateSubmissionFilter({ className: e.target.value })
                  }
                >
                  <option value="Class 8-A">Class 8-A</option>
                  <option value="Class 7-B">Class 7-B</option>
                  <option value="Class 9-A">Class 9-A</option>
                </select>
              </div>

              <div className="assignments-filter-field">
                <label className="assignments-filter-label">Grading Filter</label>
                <select
                  className="assignments-select"
                  value={gradingStatusFilter}
                  onChange={(e) => setGradingStatusFilter(e.target.value)}
                >
                  <option value="ALL">All submissions</option>
                  <option value="AWAITING">Awaiting review only</option>
                  <option value="GRADED">Graded only</option>
                </select>
              </div>

              <div className="assignments-filter-field" style={{ flex: 1.2 }}>
                <label className="assignments-filter-label">Search Student</label>
                <input
                  type="text"
                  className="assignments-input"
                  placeholder="Filter student in grading..."
                  value={gradingSearchQuery}
                  onChange={(e) => setGradingSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* 4 Grading KPI Summary Cards */}
          <div className="assignments-kpis-grid">
            <div className="assignments-kpi-card">
              <div
                className="assignments-kpi-card__bar"
                style={{ backgroundColor: '#B86E0F' }}
              />
              <div className="assignments-kpi-card__content">
                <span className="assignments-kpi-card__label">Awaiting review</span>
                <span className="assignments-kpi-card__val">12</span>
                <span className="assignments-kpi-card__hint">
                  50% of submissions · Priority
                </span>
              </div>
            </div>

            <div className="assignments-kpi-card">
              <div
                className="assignments-kpi-card__bar"
                style={{ backgroundColor: '#148C57' }}
              />
              <div className="assignments-kpi-card__content">
                <span className="assignments-kpi-card__label">Graded</span>
                <span className="assignments-kpi-card__val">12</span>
                <span className="assignments-kpi-card__hint">
                  50% evaluated · Feedback sent
                </span>
              </div>
            </div>

            <div className="assignments-kpi-card">
              <div
                className="assignments-kpi-card__bar"
                style={{ backgroundColor: '#6B4AB8' }}
              />
              <div className="assignments-kpi-card__content">
                <span className="assignments-kpi-card__label">
                  Returned for revision
                </span>
                <span className="assignments-kpi-card__val">2</span>
                <span className="assignments-kpi-card__hint">
                  Resubmission allowed
                </span>
              </div>
            </div>

            <div className="assignments-kpi-card">
              <div
                className="assignments-kpi-card__bar"
                style={{ backgroundColor: '#3659D9' }}
              />
              <div className="assignments-kpi-card__content">
                <span className="assignments-kpi-card__label">Average score</span>
                <span className="assignments-kpi-card__val">16.4 / 20</span>
                <span className="assignments-kpi-card__hint">
                  Median: 17.0 · Highest: 20
                </span>
              </div>
            </div>
          </div>

          {/* 2-Column Analytics: Grading Progress vs Score Distribution */}
          <div className="assignments-split-row">
            {/* Left: Grading Progress Meter */}
            <div className="assignments-card">
              <div className="assignments-card__header-group">
                <h2 className="assignments-card__title">Grading progress</h2>
                <p className="assignments-card__subtitle">
                  Grading velocity for Algebra — Worksheet 04
                </p>
              </div>

              <div className="assignments-grading-metrics">
                <div className="assignments-grading-metric">
                  <div className="assignments-grading-metric__head">
                    <span className="assignments-grading-metric__label">
                      Awaiting review
                    </span>
                    <span className="assignments-grading-metric__val">12 (50%)</span>
                  </div>
                  <div className="assignments-progress-bar">
                    <div
                      className="assignments-progress-bar__fill assignments-progress-bar__fill--amber"
                      style={{ width: '50%' }}
                    />
                  </div>
                </div>

                <div className="assignments-grading-metric">
                  <div className="assignments-grading-metric__head">
                    <span className="assignments-grading-metric__label">Graded</span>
                    <span className="assignments-grading-metric__val">12 (50%)</span>
                  </div>
                  <div className="assignments-progress-bar">
                    <div
                      className="assignments-progress-bar__fill assignments-progress-bar__fill--green"
                      style={{ width: '50%' }}
                    />
                  </div>
                </div>

                <div className="assignments-grading-metric">
                  <div className="assignments-grading-metric__head">
                    <span className="assignments-grading-metric__label">
                      Returned for revision
                    </span>
                    <span className="assignments-grading-metric__val">2 (8%)</span>
                  </div>
                  <div className="assignments-progress-bar">
                    <div
                      className="assignments-progress-bar__fill assignments-progress-bar__fill--purple"
                      style={{ width: '8%' }}
                    />
                  </div>
                </div>
              </div>

              <div className="assignments-grading-footer">
                <span className="assignments-grading-avg">
                  Average score: 16.4 / 20 (Passing rate: 96%)
                </span>
              </div>
            </div>

            {/* Right: Score Distribution */}
            <div className="assignments-card">
              <div className="assignments-card__header-group">
                <h2 className="assignments-card__title">Score distribution</h2>
                <p className="assignments-card__subtitle">
                  Graded performance across 12 completed reviews
                </p>
              </div>

              <div className="assignments-grading-metrics">
                <div className="assignments-grading-metric">
                  <div className="assignments-grading-metric__head">
                    <span className="assignments-grading-metric__label">
                      18 – 20 marks (Excellent)
                    </span>
                    <span className="assignments-grading-metric__val">6 students (50%)</span>
                  </div>
                  <div className="assignments-progress-bar">
                    <div
                      className="assignments-progress-bar__fill assignments-progress-bar__fill--green"
                      style={{ width: '50%' }}
                    />
                  </div>
                </div>

                <div className="assignments-grading-metric">
                  <div className="assignments-grading-metric__head">
                    <span className="assignments-grading-metric__label">
                      15 – 17 marks (Good)
                    </span>
                    <span className="assignments-grading-metric__val">4 students (33%)</span>
                  </div>
                  <div className="assignments-progress-bar">
                    <div
                      className="assignments-progress-bar__fill assignments-progress-bar__fill--blue"
                      style={{ width: '33%' }}
                    />
                  </div>
                </div>

                <div className="assignments-grading-metric">
                  <div className="assignments-grading-metric__head">
                    <span className="assignments-grading-metric__label">
                      12 – 14 marks (Average)
                    </span>
                    <span className="assignments-grading-metric__val">2 students (17%)</span>
                  </div>
                  <div className="assignments-progress-bar">
                    <div
                      className="assignments-progress-bar__fill assignments-progress-bar__fill--amber"
                      style={{ width: '17%' }}
                    />
                  </div>
                </div>

                <div className="assignments-grading-metric">
                  <div className="assignments-grading-metric__head">
                    <span className="assignments-grading-metric__label">
                      Below 12 marks (Support needed)
                    </span>
                    <span className="assignments-grading-metric__val">0 students (0%)</span>
                  </div>
                  <div className="assignments-progress-bar">
                    <div
                      className="assignments-progress-bar__fill assignments-progress-bar__fill--gray"
                      style={{ width: '0%' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submissions Awaiting Grading Queue */}
          {(gradingStatusFilter === 'ALL' || gradingStatusFilter === 'AWAITING') && (
            <div className="assignments-card">
              <div className="assignments-card__header-group">
                <h2 className="assignments-card__title">
                  Submissions awaiting review ({awaitingReviewSubmissions.length})
                </h2>
                <p className="assignments-card__subtitle">
                  Work submitted by students requiring evaluation and score assignment
                </p>
              </div>

              <div className="edusync-table-container">
                <table className="edusync-table">
                  <thead>
                    <tr>
                      <th>STUDENT</th>
                      <th>SUBMITTED AT</th>
                      <th>ATTACHMENT</th>
                      <th>STATUS</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {awaitingReviewSubmissions.map((sub) => (
                      <tr key={sub.id}>
                        <td>
                          <span className="assignments-student-name">
                            {sub.studentName}
                          </span>
                        </td>
                        <td>{sub.submittedAt}</td>
                        <td>
                          <span className="assignments-file-link">
                            📎 {sub.fileName}
                          </span>
                        </td>
                        <td>{getStatusBadge(sub.status)}</td>
                        <td>
                          <button
                            type="button"
                            className="edusync-btn edusync-btn--primary edusync-btn--sm"
                            onClick={() => setReviewingSubmission(sub)}
                          >
                            Grade submission
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Graded Submissions Log */}
          {(gradingStatusFilter === 'ALL' || gradingStatusFilter === 'GRADED') && (
            <div className="assignments-card">
              <div className="assignments-card__header-group">
                <h2 className="assignments-card__title">
                  Graded coursework log ({gradedSubmissions.length})
                </h2>
                <p className="assignments-card__subtitle">
                  Completed evaluations with recorded marks and teacher feedback
                </p>
              </div>

              <div className="edusync-table-container">
                <table className="edusync-table">
                  <thead>
                    <tr>
                      <th>STUDENT</th>
                      <th>SUBMITTED AT</th>
                      <th>MARKS</th>
                      <th>TEACHER FEEDBACK</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gradedSubmissions.map((sub) => (
                      <tr key={sub.id}>
                        <td>
                          <span className="assignments-student-name">
                            {sub.studentName}
                          </span>
                        </td>
                        <td>{sub.submittedAt}</td>
                        <td>
                          <span
                            style={{
                              fontWeight: 700,
                              color: 'var(--edusync-brand-primary, #3659D9)',
                            }}
                          >
                            {sub.marks} / 20
                          </span>
                        </td>
                        <td style={{ color: 'var(--edusync-text-secondary, #667085)' }}>
                          {sub.feedback || 'Evaluated and recorded'}
                        </td>
                        <td>
                          <button
                            type="button"
                            className="edusync-btn edusync-btn--secondary edusync-btn--sm"
                            onClick={() => setReviewingSubmission(sub)}
                          >
                            Edit grade
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      {/* =========================================================================
          TAB 3: CLASS MATERIALS VIEW (Dedicated Full-width Materials Library)
          ========================================================================= */}
      {activeInnerTab === 'MATERIALS' && (
        <>
          {/* Class Materials Filter Bar */}
          <div className="assignments-card assignments-filter-card">
            <div className="assignments-filter-grid">
              <div className="assignments-filter-field">
                <label className="assignments-filter-label">Class</label>
                <select
                  className="assignments-select"
                  value={submissionFilter.className}
                  onChange={(e) =>
                    updateSubmissionFilter({ className: e.target.value })
                  }
                >
                  <option value="Class 8-A">Class 8-A</option>
                  <option value="Class 7-B">Class 7-B</option>
                  <option value="Class 9-A">Class 9-A</option>
                </select>
              </div>

              <div className="assignments-filter-field">
                <label className="assignments-filter-label">Material Type</label>
                <select
                  className="assignments-select"
                  value={materialTypeFilter}
                  onChange={(e) => setMaterialTypeFilter(e.target.value)}
                >
                  <option value="ALL">All resource types</option>
                  <option value="PDF">PDF Documents</option>
                  <option value="Link">Web / Video Links</option>
                  <option value="DOCX">Word Documents (.docx)</option>
                  <option value="PPTX">Presentations (.pptx)</option>
                </select>
              </div>

              <div className="assignments-filter-field" style={{ flex: 1.5 }}>
                <label className="assignments-filter-label">Search Library</label>
                <input
                  type="text"
                  className="assignments-input"
                  placeholder="Search resources by title or subject..."
                  value={materialSearchQuery}
                  onChange={(e) => setMaterialSearchQuery(e.target.value)}
                />
              </div>

              <div className="assignments-filter-actions">
                <button
                  type="button"
                  className="edusync-btn edusync-btn--primary edusync-btn--sm"
                  onClick={() => setAddMaterialModalOpen(true)}
                >
                  + Add material
                </button>
              </div>
            </div>
          </div>

          {/* Full-width Class Materials Library */}
          <div className="assignments-card">
            <div className="assignments-card__header-row">
              <div className="assignments-card__header-group">
                <h2 className="assignments-card__title">
                  Class materials library ({filteredMaterials.length})
                </h2>
                <p className="assignments-card__subtitle">
                  Curated learning resources, worksheets, and syllabus guides for{' '}
                  {submissionFilter.className}
                </p>
              </div>
              <button
                type="button"
                className="edusync-btn edusync-btn--secondary edusync-btn--sm"
                onClick={() => setAddMaterialModalOpen(true)}
              >
                + Upload new resource
              </button>
            </div>

            <div className="edusync-table-container">
              <table className="edusync-table">
                <thead>
                  <tr>
                    <th>RESOURCE TITLE</th>
                    <th>SUBJECT</th>
                    <th>TYPE</th>
                    <th>FILE SIZE</th>
                    <th>LAST UPDATED</th>
                    <th>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMaterials.map((m) => (
                    <tr key={m.id}>
                      <td>
                        <span className="assignments-material-title">
                          {m.title}
                        </span>
                      </td>
                      <td>
                        <span className="assignments-detail-badge">
                          {m.subject || 'Mathematics'}
                        </span>
                      </td>
                      <td>
                        <span className="edusync-badge-custom edusync-badge-custom--draft">
                          {m.type}
                        </span>
                      </td>
                      <td>{m.size || (m.type === 'Link' ? 'External link' : '1.5 MB')}</td>
                      <td>{m.updatedAt}</td>
                      <td>
                        <button
                          type="button"
                          className="edusync-btn-text-action"
                          onClick={() =>
                            m.url
                              ? window.open(m.url, '_blank')
                              : alert(`Opening learning resource: ${m.title}`)
                          }
                        >
                          {m.type === 'Link' ? 'Open link ↗' : 'View file'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Upload Dropzone Card */}
          <div
            className="assignments-card"
            style={{
              cursor: 'pointer',
              borderStyle: 'dashed',
              backgroundColor: '#F8FAFC',
            }}
            onClick={() => setAddMaterialModalOpen(true)}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '28px',
                gap: '8px',
                textAlign: 'center',
              }}
            >
              <span style={{ fontSize: '24px' }}>📁</span>
              <h3
                style={{
                  margin: 0,
                  fontSize: '15px',
                  fontWeight: 600,
                  color: 'var(--edusync-text-navy, #14213D)',
                }}
              >
                Add another resource for {submissionFilter.className}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: '13px',
                  color: 'var(--edusync-text-secondary, #667085)',
                }}
              >
                Upload PDF guides, problem sets, or link recorded lectures directly to the class
              </p>
              <button
                type="button"
                className="edusync-btn edusync-btn--secondary edusync-btn--sm"
                style={{ marginTop: '8px' }}
                onClick={(e) => {
                  e.stopPropagation();
                  setAddMaterialModalOpen(true);
                }}
              >
                + Choose file or link
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
