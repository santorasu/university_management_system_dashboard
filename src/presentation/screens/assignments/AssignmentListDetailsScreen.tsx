import React from 'react';
import { useAssignmentFlow } from '../../../application/state/assignment-flow.context';
import { AssignmentsNavTabs } from './components/AssignmentsNavTabs';
import type { Assignment } from '../../../core/entities/assignment.types';

interface AssignmentListDetailsScreenProps {
  onNavigateToDashboard: () => void;
}

export const AssignmentListDetailsScreen: React.FC<AssignmentListDetailsScreenProps> = ({
  onNavigateToDashboard,
}) => {
  const {
    allAssignments,
    selectedAssignment,
    listFilter,
    updateListFilter,
    resetListFilter,
    selectAssignment,
    goToOverview,
    goToCreateAssignment,
    goToEditAssignment,
    goToSubmissionsMaterials,
  } = useAssignmentFlow();

  const activeAssignment: Assignment | null =
    selectedAssignment || (allAssignments.length > 0 ? allAssignments[0] : null);

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

  const handleViewSubmissions = () => {
    if (activeAssignment) {
      goToSubmissionsMaterials('SUBMISSIONS', activeAssignment.id);
    }
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
            <span style={{ color: 'var(--edusync-text-navy, #14213D)', fontWeight: 600 }}>
              Assignment list
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
              <h1 className="assignments-hero__title">Assignment list</h1>
              <p className="assignments-hero__subtitle">
                Find assignments, inspect deadlines, and open full coursework details.
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

      {/* 3. ASSIGNMENT FILTERS CARD */}
      <div className="assignments-card assignments-filter-card">
        <div className="assignments-filter-grid">
          {/* Search Query */}
          <div className="assignments-filter-field">
            <label className="assignments-filter-label">Search assignments</label>
            <input
              type="text"
              className="assignments-input"
              placeholder="Search title or keyword"
              value={listFilter.searchQuery}
              onChange={(e) => updateListFilter({ searchQuery: e.target.value })}
            />
          </div>

          {/* Class Filter */}
          <div className="assignments-filter-field">
            <label className="assignments-filter-label">Class</label>
            <select
              className="assignments-select"
              value={listFilter.className}
              onChange={(e) => updateListFilter({ className: e.target.value })}
            >
              <option value="All classes">All classes</option>
              <option value="Class 8-A">Class 8-A</option>
              <option value="Class 7-B">Class 7-B</option>
              <option value="Class 9-A">Class 9-A</option>
              <option value="Class 8-B">Class 8-B</option>
            </select>
          </div>

          {/* Subject Filter */}
          <div className="assignments-filter-field">
            <label className="assignments-filter-label">Subject</label>
            <select
              className="assignments-select"
              value={listFilter.subject}
              onChange={(e) => updateListFilter({ subject: e.target.value })}
            >
              <option value="All subjects">All subjects</option>
              <option value="Mathematics">Mathematics</option>
              <option value="English">English</option>
              <option value="Science">Science</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="assignments-filter-field">
            <label className="assignments-filter-label">Status</label>
            <select
              className="assignments-select"
              value={listFilter.status}
              onChange={(e) => updateListFilter({ status: e.target.value })}
            >
              <option value="All statuses">All statuses</option>
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
              <option value="Late">Late</option>
            </select>
          </div>

          {/* Due date Filter */}
          <div className="assignments-filter-field">
            <label className="assignments-filter-label">Due date</label>
            <select
              className="assignments-select"
              value={listFilter.dueDate}
              onChange={(e) => updateListFilter({ dueDate: e.target.value })}
            >
              <option value="Any date">Any date</option>
              <option value="This week">This week</option>
              <option value="Next week">Next week</option>
            </select>
          </div>

          {/* Reset Action */}
          <div className="assignments-filter-actions">
            <button
              type="button"
              className="edusync-btn edusync-btn--secondary edusync-btn--sm"
              onClick={resetListFilter}
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* 4. ASSIGNMENT LIST TABLE CARD */}
      <div className="assignments-card">
        <div className="edusync-table-container">
          <table className="edusync-table">
            <thead>
              <tr>
                <th>ASSIGNMENT</th>
                <th>CLASS / SECTION</th>
                <th>SUBJECT</th>
                <th>TEACHER</th>
                <th>DUE DATE</th>
                <th>STATUS</th>
                <th>SUBMISSIONS</th>
              </tr>
            </thead>
            <tbody>
              {allAssignments.map((assignment) => {
                const isSelected = activeAssignment?.id === assignment.id;
                return (
                  <tr
                    key={assignment.id}
                    className={`edusync-table__row--clickable ${
                      isSelected ? 'assignments-table__row--selected' : ''
                    }`}
                    onClick={() => selectAssignment(assignment)}
                    title="Click to inspect this assignment"
                  >
                    <td>
                      <span className="assignments-table-title">
                        {assignment.title}
                      </span>
                    </td>
                    <td>{assignment.className.replace('-', ' / ')}</td>
                    <td>{assignment.subject}</td>
                    <td>{assignment.teacherName}</td>
                    <td>{assignment.dueDate}</td>
                    <td>{getStatusBadge(assignment.status)}</td>
                    <td>
                      {assignment.status === 'Draft'
                        ? '—'
                        : `${assignment.submittedCount} / ${assignment.totalStudents}`}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. SELECTED ASSIGNMENT DETAILS CARD */}
      {activeAssignment && (
        <div className="assignments-card assignments-detail-card">
          <div className="assignments-detail-card__header">
            <div className="assignments-detail-card__title-row">
              <h2 className="assignments-card__title">{activeAssignment.title}</h2>
              {getStatusBadge(activeAssignment.status)}
            </div>
            <p className="assignments-detail-card__instructions">
              {activeAssignment.instructions}
            </p>
          </div>

          <div className="assignments-detail-grid">
            <div className="assignments-detail-item">
              <span className="assignments-detail-label">Class / Section</span>
              <span className="assignments-detail-val">
                {activeAssignment.className} • {activeAssignment.section}
              </span>
            </div>

            <div className="assignments-detail-item">
              <span className="assignments-detail-label">Subject</span>
              <span className="assignments-detail-val">
                {activeAssignment.subject}
              </span>
            </div>

            <div className="assignments-detail-item">
              <span className="assignments-detail-label">Assigned teacher</span>
              <span className="assignments-detail-val">
                {activeAssignment.teacherName}
              </span>
            </div>

            <div className="assignments-detail-item">
              <span className="assignments-detail-label">Published</span>
              <span className="assignments-detail-val">
                {activeAssignment.publishDate}
              </span>
            </div>

            <div className="assignments-detail-item">
              <span className="assignments-detail-label">Due date</span>
              <span className="assignments-detail-val">
                {activeAssignment.dueDate} · {activeAssignment.dueTime}
              </span>
            </div>

            <div className="assignments-detail-item">
              <span className="assignments-detail-label">Attachments</span>
              <span className="assignments-detail-val">
                {activeAssignment.attachments.length > 0
                  ? `${activeAssignment.attachments[0].name} · ${activeAssignment.attachments[0].size}`
                  : 'No attached files'}
              </span>
            </div>
          </div>

          <div className="assignments-detail-card__actions">
            <button
              type="button"
              className="edusync-btn edusync-btn--secondary"
              onClick={() => goToEditAssignment(activeAssignment)}
            >
              Edit assignment
            </button>
            <button
              type="button"
              className="edusync-btn edusync-btn--primary"
              onClick={handleViewSubmissions}
            >
              View submissions
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
