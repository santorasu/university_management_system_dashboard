import React from 'react';
import { useTeacherFlow } from '../../../application/state/teacher-flow.context';
import { TeacherKpiCards } from './components/TeacherKpiCards';
import { TeacherQuickProfile } from './components/TeacherQuickProfile';
import { TeacherNavTabs } from './components/TeacherNavTabs';
import { Icon } from '../../widgets/Icon/Icon';

interface ConsolidatedOverviewScreenProps {
  onNavigateToDashboard: () => void;
}

export const ConsolidatedOverviewScreen: React.FC<ConsolidatedOverviewScreenProps> = ({
  onNavigateToDashboard,
}) => {
  const {
    teachers,
    stats,
    selectedTeacher,
    selectTeacher,
    filters,
    setSearchQuery,
    setDepartment,
    setStatus,
    goToDirectory,
    goToAddTeacher,
    goToProfile,
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
              onClick={goToDirectory}
              role="button"
              tabIndex={0}
            >
              Teachers
            </span>
            <span className="edusync-dashboard-hero__crumb-sep">/</span>
            <span className="edusync-dashboard-hero__crumb edusync-dashboard-hero__crumb--current">
              Overview
            </span>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '6px' }}>
            <button
              type="button"
              className="edusync-btn-back-circle"
              onClick={onNavigateToDashboard}
              title="Back to Dashboard"
              aria-label="Back to Dashboard"
            >
              ←
            </button>
            <h1 className="edusync-dashboard-hero__title" style={{ margin: 0 }}>Teachers</h1>
          </div>
          <p className="edusync-dashboard-hero__subtitle" style={{ marginTop: '4px' }}>
            Manage teacher profiles, subjects, classes, employment, and availability.
          </p>
        </div>

        <div className="edusync-teachers-view__header-actions" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
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
            onClick={goToAddTeacher}
          >
            + Add teacher
          </button>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <TeacherNavTabs />

      {/* 4 KPI Cards (Placed below tabbar) */}
      <TeacherKpiCards stats={stats} />

      {/* Split Grid: Left Directory Table (60%), Right Quick Profile (40%) */}
      <div className="edusync-teachers-consolidated-grid">
        {/* Left Column: Teacher Directory */}
        <div className="edusync-teacher-directory-card">
          <div className="edusync-teacher-directory-card__header">
            <div>
              <h3 className="edusync-teacher-directory-card__title">Teacher directory</h3>
              <span className="edusync-teacher-directory-card__count">
                {stats?.totalTeachers || 86} teacher records
              </span>
            </div>
          </div>

          {/* Filters Bar */}
          <div className="edusync-teacher-directory-card__filters">
            <div className="edusync-teacher-directory-card__search-wrap">
              <Icon name="search" size={16} className="edusync-input-search-icon" />
              <input
                type="text"
                placeholder="Search name, teacher ID, email..."
                className="edusync-teacher-directory-card__search-input"
                value={filters.searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="edusync-teacher-directory-card__select-group">
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
            </div>
          </div>

          {/* Table */}
          <div className="edusync-table-container">
            <table className="edusync-table">
              <thead>
                <tr>
                  <th style={{ width: '38%' }}>Teacher</th>
                  <th style={{ width: '22%' }}>Teacher ID</th>
                  <th style={{ width: '22%' }}>Subjects</th>
                  <th style={{ width: '18%' }}>Availability</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((teacher) => {
                  const isSelected = selectedTeacher?.id === teacher.id;
                  return (
                    <tr
                      key={teacher.id}
                      className={`edusync-table-row--interactive ${
                        isSelected ? 'edusync-table-row--selected' : ''
                      }`}
                      onClick={() => selectTeacher(teacher)}
                    >
                      <td>
                        <div className="edusync-teacher-cell">
                          <div
                            className="edusync-teacher-cell__avatar"
                            style={{ backgroundColor: teacher.avatarColor }}
                          >
                            {teacher.initials}
                          </div>
                          <span
                            className="edusync-teacher-cell__name"
                            onClick={(e) => {
                              e.stopPropagation();
                              goToProfile(teacher);
                            }}
                            title="View full profile"
                          >
                            {teacher.fullName}
                          </span>
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
                    </tr>
                  );
                })}
                {teachers.length === 0 && (
                  <tr>
                    <td colSpan={4} className="edusync-table-empty">
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
              Showing 1–{teachers.length} of {stats?.totalTeachers || 86} teachers
            </span>
            <div className="edusync-pagination">
              <button type="button" className="edusync-pagination__btn" disabled>
                Previous
              </button>
              <div className="edusync-pagination__pages">
                <button type="button" className="edusync-pagination__page-num edusync-pagination__page-num--active">
                  1
                </button>
              </div>
              <button type="button" className="edusync-pagination__btn" disabled>
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Quick Profile */}
        <div className="edusync-teachers-consolidated-right">
          <TeacherQuickProfile teacher={selectedTeacher} />
        </div>
      </div>
    </div>
  );
};
