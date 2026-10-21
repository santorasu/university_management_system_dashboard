import React, { useState } from 'react';
import { useAttendanceFlow } from '../../../application/state/attendance-flow.context';
import { AttendanceNavTabs } from './components/AttendanceNavTabs';

interface MonthlyCalendarHistoryScreenProps {
  onNavigateToDashboard: () => void;
}

export const MonthlyCalendarHistoryScreen: React.FC<MonthlyCalendarHistoryScreenProps> = ({
  onNavigateToDashboard,
}) => {
  const {
    calendarDays,
    studentHistory,
    gradeSummaries,
    goToOverview,
    selectStudentForHistory,
    showToast,
  } = useAttendanceFlow();

  const [selectedStudentId, setSelectedStudentId] = useState('STU-2026-001');

  const handleStudentChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setSelectedStudentId(id);
    await selectStudentForHistory(id);
  };

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

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
            <span style={{ color: 'var(--edusync-text-navy, #14213D)', fontWeight: 600 }}>Calendar & history</span>
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
              <h1 className="attendance-hero__title">Monthly attendance calendar</h1>
              <p className="attendance-hero__subtitle">
                Review monthly attendance patterns and open a student's attendance history.
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
            onClick={() => showToast('success', 'Monthly attendance report exported')}
          >
            Export report
          </button>
        </div>
      </div>

      {/* 2. SUB-NAVIGATION TABS */}
      <AttendanceNavTabs />

      {/* 3. ROW 1: CALENDAR & STUDENT HISTORY */}
      <div className="attendance-grid-60-40">
        {/* LEFT: MONTHLY CALENDAR */}
        <div className="attendance-card">
          <div className="attendance-card__header">
            <div>
              <h3 className="attendance-card__title">October 2026</h3>
              <p className="attendance-card__subtitle">
                Grade 8 · Section A · Daily class attendance rate
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600, color: 'var(--edusync-brand-primary, #3659D9)' }}>
              <span>‹ October 2026 ›</span>
            </div>
          </div>

          {/* DAYS OF WEEK */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8, textAlign: 'center' }}>
            {daysOfWeek.map((day) => (
              <span key={day} className="attendance-calendar-header-day">
                {day}
              </span>
            ))}
          </div>

          {/* 31 DAY TILES */}
          <div className="attendance-calendar-grid">
            {calendarDays.map((d) => (
              <div
                key={d.day}
                className="attendance-calendar-day-tile"
                onClick={() => showToast('success', `Inspecting Oct ${d.day}: ${d.rate}% attendance`)}
              >
                <span className="attendance-calendar-day-tile__num">{d.day}</span>
                <span className={`attendance-calendar-day-tile__badge attendance-calendar-day-tile__badge--${d.statusLevel}`}>
                  {d.rate}%
                </span>
              </div>
            ))}
          </div>

          {/* CALENDAR LEGEND */}
          <div className="attendance-calendar-legend">
            <div className="attendance-calendar-legend__item">
              <span className="attendance-calendar-legend__dot" style={{ background: '#15803D' }}></span>
              <span>94%+ High attendance</span>
            </div>
            <div className="attendance-calendar-legend__item">
              <span className="attendance-calendar-legend__dot" style={{ background: '#3659D9' }}></span>
              <span>90–93% Moderate</span>
            </div>
            <div className="attendance-calendar-legend__item">
              <span className="attendance-calendar-legend__dot" style={{ background: '#D97706' }}></span>
              <span>Below 90% Needs review</span>
            </div>
          </div>
        </div>

        {/* RIGHT: STUDENT ATTENDANCE HISTORY */}
        <div className="attendance-card">
          <div className="attendance-card__header">
            <div>
              <h3 className="attendance-card__title">Student attendance history</h3>
              <p className="attendance-card__subtitle">
                Select a student to inspect attendance over time
              </p>
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4, color: 'var(--edusync-text-secondary, #667085)' }}>
              Student
            </label>
            <select
              className="academic-select-filter"
              style={{ width: '100%' }}
              value={selectedStudentId}
              onChange={handleStudentChange}
            >
              <option value="STU-2026-001">Ava Thompson · STU-2026-001</option>
              <option value="STU-2026-002">Noah Williams · STU-2026-002</option>
            </select>
          </div>

          {/* 4 STAT BADGES */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
            <div style={{ background: '#F0FDF4', border: '1px solid #DCFCE7', borderRadius: 8, padding: 10 }}>
              <span style={{ display: 'block', fontSize: 11, color: '#15803D', fontWeight: 600 }}>Present</span>
              <span style={{ fontSize: 18, fontWeight: 700, color: '#15803D' }}>
                {studentHistory?.presentDays ?? 18} days
              </span>
            </div>

            <div style={{ background: '#FEF2F2', border: '1px solid #FEE2E2', borderRadius: 8, padding: 10 }}>
              <span style={{ display: 'block', fontSize: 11, color: '#DC2626', fontWeight: 600 }}>Absent</span>
              <span style={{ fontSize: 18, fontWeight: 700, color: '#DC2626' }}>
                {studentHistory?.absentDays ?? 2} days
              </span>
            </div>

            <div style={{ background: '#FFFBEB', border: '1px solid #FEF3C7', borderRadius: 8, padding: 10 }}>
              <span style={{ display: 'block', fontSize: 11, color: '#D97706', fontWeight: 600 }}>Late</span>
              <span style={{ fontSize: 18, fontWeight: 700, color: '#D97706' }}>
                {studentHistory?.lateDays ?? 1} day
              </span>
            </div>

            <div style={{ background: '#EEF2FF', border: '1px solid #E0E7FF', borderRadius: 8, padding: 10 }}>
              <span style={{ display: 'block', fontSize: 11, color: '#3659D9', fontWeight: 600 }}>Excused</span>
              <span style={{ fontSize: 18, fontWeight: 700, color: '#3659D9' }}>
                {studentHistory?.excusedDays ?? 1} day
              </span>
            </div>
          </div>

          {/* RECENT RECORDS */}
          <div>
            <span style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8, color: 'var(--edusync-text-navy, #14213D)' }}>
              Recent records
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {studentHistory?.recentRecords?.map((rec, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 12px',
                    background: '#F8FAFC',
                    borderRadius: 6,
                    fontSize: 13,
                  }}
                >
                  <span style={{ fontWeight: 500 }}>{rec.date}</span>
                  <span
                    className={`academic-pill ${
                      rec.status === 'Present'
                        ? 'academic-pill--active'
                        : rec.status === 'Absent'
                        ? 'academic-pill--warning'
                        : 'academic-pill--draft'
                    }`}
                  >
                    {rec.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. CLASS-WISE ATTENDANCE REPORT PREVIEW */}
      <div className="attendance-card">
        <div className="attendance-card__header">
          <div>
            <h3 className="attendance-card__title">Class-wise attendance report</h3>
            <p className="attendance-card__subtitle">October 2026 · All grades · Daily average attendance</p>
          </div>
        </div>

        <div className="attendance-grade-strip">
          {gradeSummaries.map((g) => (
            <div key={g.grade} className="attendance-grade-chip">
              <span className="attendance-grade-chip__title">{g.grade}</span>
              <span className="attendance-grade-chip__rate">{g.rate}</span>
              <span
                className={`academic-pill ${
                  g.statusText === 'Strong'
                    ? 'academic-pill--active'
                    : g.statusText === 'Review'
                    ? 'academic-pill--warning'
                    : 'academic-pill--draft'
                }`}
                style={{ width: 'fit-content', marginTop: 4 }}
              >
                {g.statusText}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
