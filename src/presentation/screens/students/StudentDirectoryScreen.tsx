import React from 'react';
import { useStudentFlow } from '../../../application/state/student-flow.context';
import { StudentKpiCards } from './components/StudentKpiCards';
import { Icon } from '../../widgets/Icon/Icon';

interface StudentDirectoryScreenProps {
  onNavigateToDashboard: () => void;
}

export const StudentDirectoryScreen: React.FC<StudentDirectoryScreenProps> = ({
  onNavigateToDashboard,
}) => {
  const {
    students,
    stats,
    filters,
    setSearchQuery,
    setSelectedClass,
    setSelectedStatus,
    setSelectedSection,
    goToConsolidatedOverview,
    goToAddStudent,
    goToEditStudent,
    goToProfile,
  } = useStudentFlow();

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
              Directory
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
            <h1 className="edusync-dashboard-hero__title" style={{ margin: 0 }}>Students directory</h1>
          </div>
          <p className="edusync-dashboard-hero__subtitle" style={{ marginTop: '4px' }}>
            Manage student records, enrollment, guardians, and academic history.
          </p>
        </div>

        <div className="edusync-students-view__header-actions" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
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
            onClick={onNavigateToDashboard}
          >
            Dashboard
          </button>
          <button
            type="button"
            className="edusync-btn edusync-btn--primary"
            onClick={goToAddStudent}
          >
            Add student
          </button>
        </div>
      </div>

      {/* 4 KPI Cards */}
      <StudentKpiCards stats={stats} mode="directory" />

      {/* Full-Width Directory Card */}
      <div className="edusync-student-directory-card edusync-student-directory-card--full">
        <div className="edusync-student-directory-card__header">
          <div>
            <h3 className="edusync-student-directory-card__title">Student directory</h3>
            <span className="edusync-student-directory-card__count">
              {stats?.totalStudents.toLocaleString() || '1,248'} records
            </span>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="edusync-student-directory-card__filters edusync-student-directory-card__filters--full">
          <div className="edusync-student-directory-card__search-wrap edusync-student-directory-card__search-wrap--lg">
            <Icon name="search" size={16} className="edusync-input-search-icon" />
            <input
              type="text"
              placeholder="Search name, student ID, guardian..."
              className="edusync-student-directory-card__search-input"
              value={filters.searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <select
            className="edusync-student-directory-card__select"
            value={filters.selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            aria-label="Filter by class"
          >
            <option value="All classes">All classes</option>
            <option value="Grade 5">Grade 5</option>
            <option value="Grade 6">Grade 6</option>
            <option value="Grade 7">Grade 7</option>
            <option value="Grade 8">Grade 8</option>
            <option value="Grade 9">Grade 9</option>
          </select>

          <select
            className="edusync-student-directory-card__select"
            value={filters.selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            aria-label="Filter by status"
          >
            <option value="All statuses">All statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <select
            className="edusync-student-directory-card__select"
            value={filters.selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            aria-label="Filter by section"
          >
            <option value="All sections">All sections</option>
            <option value="A">Section A</option>
            <option value="B">Section B</option>
            <option value="C">Section C</option>
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
                <th style={{ width: '22%' }}>Student</th>
                <th style={{ width: '13%' }}>Student ID</th>
                <th style={{ width: '13%' }}>Class / Section</th>
                <th style={{ width: '15%' }}>Guardian</th>
                <th style={{ width: '11%' }}>Attendance</th>
                <th style={{ width: '10%' }}>Fee status</th>
                <th style={{ width: '9%' }}>Status</th>
                <th style={{ width: '7%', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="edusync-table-row--interactive">
                  <td>
                    <div
                      className="edusync-student-cell"
                      onClick={() => goToProfile(student)}
                      title="View student profile"
                    >
                      <div
                        className="edusync-student-cell__avatar"
                        style={{ backgroundColor: student.avatarColor }}
                      >
                        {student.initials}
                      </div>
                      <span className="edusync-student-cell__name">{student.fullName}</span>
                    </div>
                  </td>
                  <td>
                    <span className="edusync-table-cell-text">{student.studentId}</span>
                  </td>
                  <td>
                    <span className="edusync-table-cell-text">
                      {student.grade} · {student.section}
                    </span>
                  </td>
                  <td>
                    <span className="edusync-table-cell-text">{student.guardianName}</span>
                  </td>
                  <td>
                    <span className="edusync-table-cell-text">
                      {student.attendanceRate > 0 ? `${student.attendanceRate}%` : '—'}
                    </span>
                  </td>
                  <td>
                    {student.feeStatus ? (
                      <span
                        className={`edusync-badge-pill ${
                          student.feeStatus === 'Paid'
                            ? 'edusync-badge-pill--success'
                            : student.feeStatus === 'Pending'
                            ? 'edusync-badge-pill--warning'
                            : student.feeStatus === 'Overdue'
                            ? 'edusync-badge-pill--error'
                            : 'edusync-badge-pill--neutral'
                        }`}
                      >
                        {student.feeStatus}
                      </span>
                    ) : (
                      <span className="edusync-table-cell-muted">—</span>
                    )}
                  </td>
                  <td>
                    <span
                      className={`edusync-badge-pill ${
                        student.status === 'Active'
                          ? 'edusync-badge-pill--success'
                          : 'edusync-badge-pill--warning'
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button
                      type="button"
                      className="edusync-btn edusync-btn--secondary edusync-btn--xs"
                      onClick={() => goToEditStudent(student)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
              {students.length === 0 && (
                <tr>
                  <td colSpan={8} className="edusync-table-empty">
                    No student records found matching the search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="edusync-table-footer">
          <span className="edusync-table-footer__info">
            Showing 1–{students.length} of {stats?.totalStudents.toLocaleString() || '1,248'} records
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
