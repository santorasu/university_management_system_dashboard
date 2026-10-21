import React from 'react';
import { useAttendanceFlow } from '../../../application/state/attendance-flow.context';
import { AttendanceNavTabs } from './components/AttendanceNavTabs';
import type { AttendanceStatus } from '../../../core/entities/attendance.types';

interface DailyRecordsScreenProps {
  onNavigateToDashboard: () => void;
}

export const DailyRecordsScreen: React.FC<DailyRecordsScreenProps> = ({
  onNavigateToDashboard,
}) => {
  const {
    dailyRecords,
    selectedDate,
    setSelectedDate,
    selectedYear,
    setSelectedYear,
    selectedClass,
    setSelectedClass,
    selectedSection,
    setSelectedSection,
    selectedStatus,
    setSelectedStatus,
    searchStudentQuery,
    setSearchStudentQuery,
    goToOverview,
    updateStudentStatus,
    updateStudentRemarks,
    saveAttendance,
    cancelDailyChanges,
    openConfirmDialog,
    showToast,
  } = useAttendanceFlow();

  // Filter students
  const filteredStudents = dailyRecords.filter((stu) => {
    const matchesSearch =
      stu.name.toLowerCase().includes(searchStudentQuery.toLowerCase()) ||
      stu.studentId.toLowerCase().includes(searchStudentQuery.toLowerCase());
    const matchesStatus =
      selectedStatus === 'All statuses' || stu.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  // Dynamic counts
  const presentCount = dailyRecords.filter((s) => s.status === 'Present').length;
  const absentCount = dailyRecords.filter((s) => s.status === 'Absent').length;
  const lateCount = dailyRecords.filter((s) => s.status === 'Late').length;
  const hasUnsavedChanges = dailyRecords.some((s) => s.isModified);

  return (
    <div className="attendance-container">
      {/* 1. HERO & BREADCRUMBS */}
      <div className="attendance-hero">
        <div>
          <div className="attendance-hero__crumbs">
            <button
              type="button"
              className="attendance-hero__crumb--link"
              onClick={onNavigateToDashboard}
            >
              Dashboard
            </button>
            <span className="attendance-hero__crumb-sep">/</span>
            <button
              type="button"
              className="attendance-hero__crumb--link"
              onClick={goToOverview}
            >
              Attendance
            </button>
            <span className="attendance-hero__crumb-sep">/</span>
            <span style={{ color: 'var(--edusync-text-navy, #14213D)', fontWeight: 600 }}>Daily records</span>
          </div>

          <div className="attendance-hero__title-row">
            <button
              type="button"
              className="edusync-btn-back-circle"
              onClick={goToOverview}
              title="Return to Attendance Overview"
              aria-label="Back to Overview"
            >
              ←
            </button>
            <div>
              <h1 className="attendance-hero__title">Daily attendance records</h1>
              <p className="attendance-hero__subtitle">
                Mark and update student attendance for selected date, class, and section.
              </p>
            </div>
          </div>
        </div>

        <div className="attendance-hero__actions">
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
            onClick={openConfirmDialog}
          >
            Save attendance
          </button>
        </div>
      </div>

      {/* 2. SUB-NAVIGATION TABS */}
      <AttendanceNavTabs />

      {/* 3. FILTER TOOLBAR CARD */}
      <div className="attendance-card" style={{ padding: '16px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--edusync-text-secondary, #667085)' }}>
                Attendance date
              </span>
              <input
                type="text"
                className="academic-select-filter"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                style={{ minWidth: 150 }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--edusync-text-secondary, #667085)' }}>
                Academic year
              </span>
              <select
                className="academic-select-filter"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <option value="2026–27">2026–27</option>
                <option value="2025–26">2025–26</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--edusync-text-secondary, #667085)' }}>
                Class
              </span>
              <select
                className="academic-select-filter"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                <option value="Grade 8">Grade 8</option>
                <option value="Grade 7">Grade 7</option>
                <option value="Grade 6">Grade 6</option>
                <option value="Grade 9">Grade 9</option>
                <option value="Grade 10">Grade 10</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--edusync-text-secondary, #667085)' }}>
                Section
              </span>
              <select
                className="academic-select-filter"
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
              >
                <option value="A">Section A</option>
                <option value="B">Section B</option>
                <option value="C">Section C</option>
                <option value="D">Section D</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--edusync-text-secondary, #667085)' }}>
                Status
              </span>
              <select
                className="academic-select-filter"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="All statuses">All statuses</option>
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
                <option value="Late">Late</option>
                <option value="Excused">Excused</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 16 }}>
            <button
              type="button"
              className="edusync-btn edusync-btn--secondary"
              onClick={() => showToast('success', 'Filters applied')}
            >
              Apply filters
            </button>
            <button
              type="button"
              className="edusync-btn edusync-btn--secondary"
              onClick={() => {
                setSelectedStatus('All statuses');
                setSearchStudentQuery('');
              }}
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* 3. 4 QUICK STAT CHIPS */}
      <div className="attendance-quick-stats-row">
        <div className="attendance-quick-stat-box">
          <span className="attendance-quick-stat-box__label">Class total</span>
          <span className="attendance-quick-stat-box__val">{dailyRecords.length}</span>
        </div>

        <div className="attendance-quick-stat-box">
          <span className="attendance-quick-stat-box__label" style={{ color: '#15803D' }}>Present</span>
          <span className="attendance-quick-stat-box__val" style={{ color: '#15803D' }}>{presentCount}</span>
        </div>

        <div className="attendance-quick-stat-box">
          <span className="attendance-quick-stat-box__label" style={{ color: '#DC2626' }}>Absent</span>
          <span className="attendance-quick-stat-box__val" style={{ color: '#DC2626' }}>{absentCount}</span>
        </div>

        <div className="attendance-quick-stat-box">
          <span className="attendance-quick-stat-box__label" style={{ color: '#D97706' }}>Late</span>
          <span className="attendance-quick-stat-box__val" style={{ color: '#D97706' }}>{lateCount}</span>
        </div>
      </div>

      {/* 4. STUDENT ATTENDANCE TABLE CARD */}
      <div className="attendance-card">
        <div className="attendance-card__header">
          <div>
            <h3 className="attendance-card__title">{selectedClass} · Section {selectedSection}</h3>
            <p className="attendance-card__subtitle">
              {dailyRecords.length} enrolled students · Attendance date: {selectedDate}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <button
              type="button"
              className="edusync-btn edusync-btn--secondary"
              style={{ padding: '6px 12px', fontSize: 13 }}
              onClick={() => showToast('success', 'Exporting attendance CSV...')}
            >
              Export CSV
            </button>
            <button
              type="button"
              className="edusync-btn edusync-btn--secondary"
              style={{ padding: '6px 12px', fontSize: 13 }}
              onClick={() => showToast('success', 'Exporting attendance PDF...')}
            >
              Export PDF
            </button>
          </div>
        </div>

        {/* SEARCH BAR */}
        <div className="academic-search-input-wrap" style={{ marginBottom: 16 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            className="academic-search-input"
            placeholder="Search student name or ID…"
            value={searchStudentQuery}
            onChange={(e) => setSearchStudentQuery(e.target.value)}
          />
        </div>

        {/* TABLE */}
        <div style={{ width: '100%', overflowX: 'auto' }}>
          <table className="academic-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Student ID</th>
                <th>Roll</th>
                <th>Status</th>
                <th>Arrival</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((stu) => (
                <tr
                  key={stu.id}
                  className={stu.isModified ? 'attendance-row--modified' : ''}
                >
                  <td style={{ fontWeight: 600 }}>{stu.name}</td>
                  <td style={{ fontFamily: 'monospace', color: 'var(--edusync-text-secondary, #667085)' }}>
                    {stu.studentId}
                  </td>
                  <td>{stu.roll}</td>
                  <td>
                    {/* 4 Interactive Toggle Buttons */}
                    <div className="attendance-status-picker">
                      {(['Present', 'Absent', 'Late', 'Excused'] as AttendanceStatus[]).map((statusOption) => (
                        <button
                          key={statusOption}
                          type="button"
                          className={`attendance-status-btn attendance-status-btn--${statusOption.toLowerCase()} ${
                            stu.status === statusOption ? 'attendance-status-btn--active' : ''
                          }`}
                          onClick={() => updateStudentStatus(stu.studentId, statusOption)}
                        >
                          {statusOption}
                        </button>
                      ))}
                    </div>
                  </td>
                  <td>
                    <span style={{ fontSize: 13, color: 'var(--edusync-text-primary, #172033)' }}>
                      {stu.arrivalTime}
                    </span>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={stu.remarks === '—' ? '' : stu.remarks}
                      placeholder="Add note…"
                      onChange={(e) => updateStudentRemarks(stu.studentId, e.target.value)}
                      style={{
                        padding: '4px 8px',
                        fontSize: 12,
                        border: '1px solid var(--edusync-border-default, #E4E7EC)',
                        borderRadius: 6,
                        width: '100%',
                        maxWidth: 160,
                        background: 'transparent',
                        outline: 'none',
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* FOOTER NOTICE & ACTIONS */}
        <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--edusync-border-default, #E4E7EC)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ margin: 0, fontSize: 13, color: 'var(--edusync-text-secondary, #667085)' }}>
            Mark each student as Present, Absent, Late, or Excused. Unsaved changes are highlighted.
          </p>

          <div style={{ display: 'flex', gap: 10 }}>
            <button
              type="button"
              className="edusync-btn edusync-btn--secondary"
              onClick={cancelDailyChanges}
              disabled={!hasUnsavedChanges}
            >
              Cancel changes
            </button>
            <button
              type="button"
              className="edusync-btn edusync-btn--primary"
              onClick={saveAttendance}
            >
              Save attendance
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
