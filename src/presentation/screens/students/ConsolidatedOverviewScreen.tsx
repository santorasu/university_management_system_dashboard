import React from 'react';
import { useStudentFlow } from '../../../application/state/student-flow.context';
import { StudentKpiCards } from './components/StudentKpiCards';
import { StudentQuickProfile } from './components/StudentQuickProfile';
import { StudentNavTabs } from './components/StudentNavTabs';
import { Icon } from '../../widgets/Icon/Icon';

interface ConsolidatedOverviewScreenProps {
  onNavigateToDashboard: () => void;
}

export const ConsolidatedOverviewScreen: React.FC<ConsolidatedOverviewScreenProps> = ({
  onNavigateToDashboard,
}) => {
  const {
    students,
    stats,
    selectedStudent,
    selectStudent,
    filters,
    setSearchQuery,
    setSelectedClass,
    setSelectedStatus,
    goToAddStudent,
    goToProfile,
  } = useStudentFlow();

  return (
    <div className="edusync-students-view">
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
            <span style={{ fontWeight: 500 }}>Students</span>
            <span className="academic-hero__crumb-sep">/</span>
            <span style={{ color: 'var(--edusync-text-navy, #14213D)', fontWeight: 600 }}>Overview</span>
          </div>

          <div className="academic-hero__title-row">
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
              <h1 className="academic-hero__title">Students</h1>
              <p className="academic-hero__subtitle">
                Manage student records, guardians, academic progress, and fees.
              </p>
            </div>
          </div>
        </div>

        <div className="academic-hero__actions">
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
            onClick={goToAddStudent}
          >
            + Add student
          </button>
        </div>
      </div>

      {/* 2. SUB-NAVIGATION TABS */}
      <StudentNavTabs />

      {/* 3. 4 KPI STAT CARDS (Placed directly below tabbar) */}
      <StudentKpiCards stats={stats} mode="consolidated" />

      {/* 4. SPLIT GRID: Left Directory Table (62%), Right Quick Profile (38%) */}
      <div className="edusync-students-consolidated-grid">
        {/* Left Column: Student Directory */}
        <div className="edusync-student-directory-card">
          <div className="edusync-student-directory-card__header">
            <div>
              <h3 className="edusync-student-directory-card__title">Student directory</h3>
              <span className="edusync-student-directory-card__count">
                {stats?.totalStudents.toLocaleString() || '1,248'} records
              </span>
            </div>
          </div>

          {/* Filters Bar */}
          <div className="edusync-student-directory-card__filters">
            <div className="edusync-student-directory-card__search-wrap">
              <Icon name="search" size={16} className="edusync-input-search-icon" />
              <input
                type="text"
                placeholder="Search name or student ID..."
                className="edusync-student-directory-card__search-input"
                value={filters.searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="edusync-student-directory-card__select-group">
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
            </div>
          </div>

          {/* Table */}
          <div className="edusync-table-container">
            <table className="edusync-table">
              <thead>
                <tr>
                  <th style={{ width: '40%' }}>Student</th>
                  <th style={{ width: '22%' }}>Class</th>
                  <th style={{ width: '20%' }}>Attendance</th>
                  <th style={{ width: '18%' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => {
                  const isSelected = selectedStudent?.id === student.id;
                  return (
                    <tr
                      key={student.id}
                      className={`edusync-table-row--interactive ${
                        isSelected ? 'edusync-table-row--selected' : ''
                      }`}
                      onClick={() => selectStudent(student)}
                    >
                      <td>
                        <div className="edusync-student-cell">
                          <div
                            className="edusync-student-cell__avatar"
                            style={{ backgroundColor: student.avatarColor }}
                          >
                            {student.initials}
                          </div>
                          <div className="edusync-student-cell__details">
                            <span
                              className="edusync-student-cell__name"
                              onClick={(e) => {
                                e.stopPropagation();
                                goToProfile(student);
                              }}
                              title="View full profile"
                            >
                              {student.fullName}
                            </span>
                            <span className="edusync-student-cell__id">{student.studentId}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="edusync-table-cell-text">
                          {student.grade} {student.section}
                        </span>
                      </td>
                      <td>
                        <span className="edusync-table-cell-text">
                          {student.attendanceRate > 0 ? `${student.attendanceRate}%` : '—'}
                        </span>
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
                    </tr>
                  );
                })}
                {students.length === 0 && (
                  <tr>
                    <td colSpan={4} className="edusync-table-empty">
                      No student records found matching the search criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Pagination Footer */}
          <div className="edusync-table-footer">
            <span className="edusync-table-footer__info">
              Showing 1–{students.length} of {stats?.totalStudents.toLocaleString() || '1,248'} students
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
        <div className="edusync-students-consolidated-right">
          <StudentQuickProfile student={selectedStudent} />
        </div>
      </div>
    </div>
  );
};
