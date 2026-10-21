import React from 'react';
import { useTeacherFlow } from '../../../application/state/teacher-flow.context';
import { TeacherKpiCards } from './components/TeacherKpiCards';
import { Icon } from '../../widgets/Icon/Icon';

interface TeacherDirectoryScreenProps {
  onNavigateToDashboard: () => void;
}

export const TeacherDirectoryScreen: React.FC<TeacherDirectoryScreenProps> = ({
  onNavigateToDashboard,
}) => {
  const {
    teachers,
    stats,
    filters,
    setSearchQuery,
    setDepartment,
    setStatus,
    setAvailability,
    goToConsolidatedOverview,
    goToAddTeacher,
    goToEditTeacher,
    goToProfile,
    goToFeedback,
  } = useTeacherFlow();

  return (
    <div className="edusync-teachers-view">
      {/* Top Header & Breadcrumbs */}
      <div className="edusync-teachers-view__top-bar">
        <div className="edusync-teachers-view__header-left">
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
              Teachers
            </span>
            <span className="edusync-dashboard-hero__crumb-sep">/</span>
            <span className="edusync-dashboard-hero__crumb edusync-dashboard-hero__crumb--current">
              Directory
            </span>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '6px' }}>
            <button
              type="button"
              className="edusync-btn-back-circle"
              onClick={goToConsolidatedOverview}
              title="Back to teachers overview"
              aria-label="Back to teachers overview"
            >
              ←
            </button>
            <h1 className="edusync-dashboard-hero__title" style={{ margin: 0 }}>Teachers directory</h1>
          </div>
          <p className="edusync-dashboard-hero__subtitle" style={{ marginTop: '4px' }}>
            Manage teacher profiles, subject assignments, employment, availability, and student feedback.
          </p>
        </div>

        <div className="edusync-teachers-view__header-actions" style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="edusync-btn edusync-btn--secondary"
            onClick={goToConsolidatedOverview}
          >
            ← Back to overview
          </button>
          <button
            type="button"
            className="edusync-btn edusync-btn--secondary"
            onClick={goToFeedback}
          >
            Teacher Feedback
          </button>
          <button
            type="button"
            className="edusync-btn edusync-btn--primary"
            onClick={goToAddTeacher}
          >
            Add teacher
          </button>
        </div>
      </div>

      {/* 4 KPI Cards */}
      <TeacherKpiCards stats={stats} />

      {/* Full-Width Directory Card */}
      <div className="edusync-teacher-directory-card edusync-teacher-directory-card--full">
        <div className="edusync-teacher-directory-card__header">
          <div>
            <h3 className="edusync-teacher-directory-card__title">Teacher directory</h3>
            <span className="edusync-teacher-directory-card__count">
              {stats?.totalTeachers || 86} teacher records
            </span>
          </div>
        </div>

        {/* Filters Toolbar */}
        <div className="edusync-teacher-directory-card__filters edusync-teacher-directory-card__filters--full">
          <div className="edusync-teacher-directory-card__search-wrap edusync-teacher-directory-card__search-wrap--lg">
            <Icon name="search" size={16} className="edusync-input-search-icon" />
            <input
              type="text"
              placeholder="Search name, teacher ID, email..."
              className="edusync-teacher-directory-card__search-input"
              value={filters.searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <select
            className="edusync-teacher-directory-card__select"
            value={filters.department}
            onChange={(e) => setDepartment(e.target.value)}
            aria-label="Filter by department"
          >
            <option value="All departments">All departments</option>
            <option value="Mathematics & Science">Mathematics &amp; Science</option>
            <option value="Languages">Languages</option>
            <option value="Technology">Technology</option>
            <option value="Humanities">Humanities</option>
          </select>

          <select
            className="edusync-teacher-directory-card__select"
            value={filters.status}
            onChange={(e) => setStatus(e.target.value)}
            aria-label="Filter by status"
          >
            <option value="All statuses">All statuses</option>
            <option value="Active">Active</option>
            <option value="On leave">On leave</option>
            <option value="Inactive">Inactive</option>
          </select>

          <select
            className="edusync-teacher-directory-card__select"
            value={filters.availability}
            onChange={(e) => setAvailability(e.target.value)}
            aria-label="Filter by availability"
          >
            <option value="Any status">Any status</option>
            <option value="Available">Available</option>
            <option value="On leave">On leave</option>
            <option value="Limited">Limited</option>
            <option value="Unavailable">Unavailable</option>
          </select>

          <div className="edusync-filter-actions">
            <button type="button" className="edusync-btn edusync-btn--secondary">
              Filters
            </button>
            <button type="button" className="edusync-btn edusync-btn--secondary">
              Export
            </button>
          </div>
        </div>

        {/* Directory Table */}
        <div className="edusync-table-container">
          <table className="edusync-table">
            <thead>
              <tr>
                <th style={{ width: '22%' }}>Teacher</th>
                <th style={{ width: '13%' }}>Teacher ID</th>
                <th style={{ width: '18%' }}>Subjects</th>
                <th style={{ width: '10%' }}>Classes</th>
                <th style={{ width: '11%' }}>Employment</th>
                <th style={{ width: '11%' }}>Availability</th>
                <th style={{ width: '8%' }}>Status</th>
                <th style={{ width: '7%', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher) => (
                <tr key={teacher.id} className="edusync-table-row--interactive">
                  <td>
                    <div
                      className="edusync-teacher-cell"
                      onClick={() => goToProfile(teacher)}
                      title="View teacher profile"
                    >
                      <div
                        className="edusync-teacher-cell__avatar"
                        style={{ backgroundColor: teacher.avatarColor }}
                      >
                        {teacher.initials}
                      </div>
                      <span className="edusync-teacher-cell__name">{teacher.fullName}</span>
                    </div>
                  </td>
                  <td>
                    <span className="edusync-table-cell-text">{teacher.teacherId}</span>
                  </td>
                  <td>
                    <span className="edusync-table-cell-text">
                      {teacher.subjects.join(', ')}
                    </span>
                  </td>
                  <td>
                    <span className="edusync-table-cell-text">{teacher.classesSummary}</span>
                  </td>
                  <td>
                    <span className="edusync-table-cell-text">{teacher.employmentType}</span>
                  </td>
                  <td>
                    <span
                      className={`edusync-badge-pill ${
                        teacher.availability === 'Available'
                          ? 'edusync-badge-pill--success'
                          : teacher.availability === 'On leave'
                          ? 'edusync-badge-pill--warning'
                          : teacher.availability === 'Limited'
                          ? 'edusync-badge-pill--warning'
                          : 'edusync-badge-pill--error'
                      }`}
                    >
                      {teacher.availability}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`edusync-badge-pill ${
                        teacher.status === 'Active'
                          ? 'edusync-badge-pill--success'
                          : teacher.status === 'On leave'
                          ? 'edusync-badge-pill--warning'
                          : 'edusync-badge-pill--neutral'
                      }`}
                    >
                      {teacher.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button
                      type="button"
                      className="edusync-btn edusync-btn--secondary edusync-btn--xs"
                      onClick={() => goToEditTeacher(teacher)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
              {teachers.length === 0 && (
                <tr>
                  <td colSpan={8} className="edusync-table-empty">
                    No teacher records found matching criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="edusync-table-footer">
          <span className="edusync-table-footer__info">
            Showing 1–{teachers.length} of {stats?.totalTeachers.toLocaleString() || '86'} records
          </span>
          <div className="edusync-pagination">
            <button type="button" className="edusync-pagination__btn" disabled>
              Previous
            </button>
            <div className="edusync-pagination__pages">
              <button type="button" className="edusync-pagination__page-num edusync-pagination__page-num--active">
                1
              </button>
              <button type="button" className="edusync-pagination__page-num">
                2
              </button>
            </div>
            <button type="button" className="edusync-pagination__btn">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
