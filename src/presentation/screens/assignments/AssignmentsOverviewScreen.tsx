import React from 'react';
import { useAssignmentFlow } from '../../../application/state/assignment-flow.context';
import { AssignmentsNavTabs } from './components/AssignmentsNavTabs';
import { AssignmentKpiCards } from './components/AssignmentKpiCards';
import type { Assignment } from '../../../core/entities/assignment.types';

interface AssignmentsOverviewScreenProps {
  onNavigateToDashboard: () => void;
}

export const AssignmentsOverviewScreen: React.FC<AssignmentsOverviewScreenProps> = ({
  onNavigateToDashboard,
}) => {
  const {
    recentAssignments,
    kpiStats,
    goToListDetails,
    goToCreateAssignment,
    goToSubmissionsMaterials,
  } = useAssignmentFlow();

  const handleRowClick = (assignment: Assignment) => {
    goToListDetails(assignment);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Published':
        return <span className="edusync-badge-custom edusync-badge-custom--published">Published</span>;
      case 'Draft':
        return <span className="edusync-badge-custom edusync-badge-custom--draft">Draft</span>;
      case 'Late':
        return <span className="edusync-badge-custom edusync-badge-custom--late">Late</span>;
      default:
        return <span className="edusync-badge-custom edusync-badge-custom--draft">{status}</span>;
    }
  };

  const submissionStats = kpiStats?.submissionStatus ?? {
    submitted: 412,
    pending: 74,
    late: 26,
    graded: 356,
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
            <span style={{ fontWeight: 500 }}>Assignments &amp; Class Materials</span>
            <span className="assignments-hero__crumb-sep">/</span>
            <span style={{ color: 'var(--edusync-text-navy, #14213D)', fontWeight: 600 }}>
              Overview
            </span>
          </div>

          <div className="assignments-hero__title-row">
            <button
              type="button"
              className="edusync-btn-back-circle"
              onClick={onNavigateToDashboard}
              title="Return to Dashboard Overview"
              aria-label="Back to Dashboard"
            >
              ←
            </button>
            <div>
              <h1 className="assignments-hero__title">
                Assignments &amp; Class Materials
              </h1>
              <p className="assignments-hero__subtitle">
                Create assignments, track student work, and manage learning resources.
              </p>
            </div>
          </div>
        </div>

        <div className="assignments-hero__actions">
          <button
            type="button"
            className="edusync-btn edusync-btn--secondary"
            onClick={onNavigateToDashboard}
          >
            ← Dashboard
          </button>
          <button
            type="button"
            className="edusync-btn edusync-btn--primary"
            onClick={goToCreateAssignment}
          >
            + Create assignment
          </button>
        </div>
      </div>

      {/* 2. SUB-NAVIGATION TABS (Placed directly below Hero for consistency) */}
      <AssignmentsNavTabs />

      {/* 3. 4 KPI STAT CARDS (Placed directly under tabs) */}
      <AssignmentKpiCards />

      {/* 4. MAIN 65% / 35% SPLIT ROW */}
      <div className="assignments-split-row">
        {/* LEFT: Recent Assignments Panel */}
        <div className="assignments-card">
          <div className="assignments-card__header-row">
            <div className="assignments-card__header-group">
              <h2 className="assignments-card__title">Recent assignments</h2>
              <p className="assignments-card__subtitle">
                Latest created and updated coursework
              </p>
            </div>
            <button
              type="button"
              className="edusync-btn-text-action"
              onClick={() => goToListDetails()}
            >
              View all →
            </button>
          </div>

          <div className="edusync-table-container">
            <table className="edusync-table">
              <thead>
                <tr>
                  <th>ASSIGNMENT</th>
                  <th>CLASS</th>
                  <th>DUE DATE</th>
                  <th>STATUS</th>
                  <th>SUBMISSIONS</th>
                </tr>
              </thead>
              <tbody>
                {recentAssignments.map((assignment) => (
                  <tr
                    key={assignment.id}
                    className="edusync-table__row--clickable"
                    onClick={() => handleRowClick(assignment)}
                    title="Click to view details"
                  >
                    <td>
                      <span className="assignments-table-title">
                        {assignment.title}
                      </span>
                    </td>
                    <td>{assignment.className}</td>
                    <td>{assignment.dueDate}</td>
                    <td>{getStatusBadge(assignment.status)}</td>
                    <td>
                      {assignment.status === 'Draft'
                        ? '—'
                        : `${assignment.submittedCount} / ${assignment.totalStudents}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT: Submission Status Panel */}
        <div className="assignments-card">
          <div className="assignments-card__header-group">
            <h2 className="assignments-card__title">Submission status</h2>
            <p className="assignments-card__subtitle">
              Across currently published assignments
            </p>
          </div>

          <div className="assignments-status-list">
            <div
              className="assignments-status-item assignments-status-item--clickable"
              onClick={() =>
                goToSubmissionsMaterials('SUBMISSIONS', undefined, 'Submitted')
              }
              role="button"
              tabIndex={0}
              title="Filter submitted in Submissions"
            >
              <div className="assignments-status-item__left">
                <span className="edusync-dot edusync-dot--submitted" />
                <span className="assignments-status-item__label">Submitted</span>
              </div>
              <span className="assignments-status-item__value">
                {submissionStats.submitted}
              </span>
            </div>
            <div className="assignments-status-divider" />

            <div
              className="assignments-status-item assignments-status-item--clickable"
              onClick={() =>
                goToSubmissionsMaterials('SUBMISSIONS', undefined, 'Pending')
              }
              role="button"
              tabIndex={0}
              title="Filter pending in Submissions"
            >
              <div className="assignments-status-item__left">
                <span className="edusync-dot edusync-dot--pending" />
                <span className="assignments-status-item__label">Pending</span>
              </div>
              <span className="assignments-status-item__value">
                {submissionStats.pending}
              </span>
            </div>
            <div className="assignments-status-divider" />

            <div
              className="assignments-status-item assignments-status-item--clickable"
              onClick={() =>
                goToSubmissionsMaterials('SUBMISSIONS', undefined, 'Late')
              }
              role="button"
              tabIndex={0}
              title="Filter late in Submissions"
            >
              <div className="assignments-status-item__left">
                <span className="edusync-dot edusync-dot--late" />
                <span className="assignments-status-item__label">Late</span>
              </div>
              <span className="assignments-status-item__value">
                {submissionStats.late}
              </span>
            </div>
            <div className="assignments-status-divider" />

            <div
              className="assignments-status-item assignments-status-item--clickable"
              onClick={() =>
                goToSubmissionsMaterials('SUBMISSIONS', undefined, 'Graded')
              }
              role="button"
              tabIndex={0}
              title="Filter graded in Submissions"
            >
              <div className="assignments-status-item__left">
                <span className="edusync-dot edusync-dot--graded" />
                <span className="assignments-status-item__label">Graded</span>
              </div>
              <span className="assignments-status-item__value">
                {submissionStats.graded}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. MANAGE COURSEWORK QUICK ACTION CARDS */}
      <div className="assignments-card">
        <div className="assignments-card__header-group">
          <h2 className="assignments-card__title">Manage coursework</h2>
          <p className="assignments-card__subtitle">
            Jump into assignment workflows or the shared learning-resource library.
          </p>
        </div>

        <div className="assignments-action-cards-grid">
          {/* Card 1: Assignment list */}
          <div
            className="assignments-action-card"
            onClick={() => goToListDetails()}
            role="button"
            tabIndex={0}
          >
            <div>
              <div className="assignments-action-card__title">Assignment list</div>
              <div className="assignments-action-card__desc">
                Search, filter, and review assignments
              </div>
            </div>
            <div className="assignments-action-card__link">Open →</div>
          </div>

          {/* Card 2: Create assignment */}
          <div
            className="assignments-action-card"
            onClick={goToCreateAssignment}
            role="button"
            tabIndex={0}
          >
            <div>
              <div className="assignments-action-card__title">Create assignment</div>
              <div className="assignments-action-card__desc">
                Set class, subject, deadlines, and attachments
              </div>
            </div>
            <div className="assignments-action-card__link">Open →</div>
          </div>

          {/* Card 3: Submission tracking */}
          <div
            className="assignments-action-card"
            onClick={() => goToSubmissionsMaterials('SUBMISSIONS')}
            role="button"
            tabIndex={0}
          >
            <div>
              <div className="assignments-action-card__title">Submission tracking</div>
              <div className="assignments-action-card__desc">
                Review submitted, pending, and late work
              </div>
            </div>
            <div className="assignments-action-card__link">Open →</div>
          </div>

          {/* Card 4: Class materials */}
          <div
            className="assignments-action-card"
            onClick={() => goToSubmissionsMaterials('MATERIALS')}
            role="button"
            tabIndex={0}
          >
            <div>
              <div className="assignments-action-card__title">Class materials</div>
              <div className="assignments-action-card__desc">
                Manage files and learning resources
              </div>
            </div>
            <div className="assignments-action-card__link">Open →</div>
          </div>
        </div>
      </div>
    </div>
  );
};
