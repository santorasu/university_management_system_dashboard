import React, { useState } from 'react';
import { useTimetableFlow } from '../../../application/state/timetable-flow.context';
import { TimetableNavTabs } from './components/TimetableNavTabs';

interface TimetableDailyViewScreenProps {
  onNavigateToDashboard: () => void;
}

export const TimetableDailyViewScreen: React.FC<TimetableDailyViewScreenProps> = ({
  onNavigateToDashboard,
}) => {
  const {
    dailyPeriods,
    selectedDate,
    setSelectedDate,
    isConflictDismissed,
    dismissConflict,
    goToWeeklyOverview,
    goToScheduleBuilder,
    showToast,
  } = useTimetableFlow();

  const [classFilter, setClassFilter] = useState('All classes');
  const [teacherFilter, setTeacherFilter] = useState('All teachers');

  const filteredPeriods = dailyPeriods.filter((p) => {
    const matchesClass = classFilter === 'All classes' || p.className === classFilter;
    const matchesTeacher = teacherFilter === 'All teachers' || p.teacher === teacherFilter;
    return matchesClass && matchesTeacher;
  });

  return (
    <div className="timetable-container">
      {/* 1. HERO & BREADCRUMBS */}
      <div className="timetable-hero">
        <div>
          <div className="timetable-hero__crumbs">
            <button
              type="button"
              className="timetable-hero__crumb--link"
              onClick={onNavigateToDashboard}
            >
              Dashboard
            </button>
            <span className="timetable-hero__crumb-sep">/</span>
            <button
              type="button"
              className="timetable-hero__crumb--link"
              onClick={goToWeeklyOverview}
            >
              Timetable & Scheduling
            </button>
            <span className="timetable-hero__crumb-sep">/</span>
            <span style={{ color: 'var(--edusync-text-navy, #14213D)', fontWeight: 600 }}>Daily View</span>
          </div>

          <div className="timetable-hero__title-row">
            <button
              type="button"
              className="edusync-btn-back-circle"
              onClick={goToWeeklyOverview}
              title="Return to Weekly Overview"
              aria-label="Back to Overview"
            >
              ←
            </button>
            <div>
              <h1 className="timetable-hero__title">Daily Timetable</h1>
              <p className="timetable-hero__subtitle">
                Review periods, classroom assignments and teacher coverage for a selected day.
              </p>
            </div>
          </div>
        </div>

        <div className="timetable-hero__actions">
          <button
            type="button"
            className="edusync-btn edusync-btn--secondary"
            onClick={goToWeeklyOverview}
          >
            ← Back to overview
          </button>
          <button
            type="button"
            className="edusync-btn edusync-btn--primary"
            onClick={goToScheduleBuilder}
          >
            + Create schedule
          </button>
        </div>
      </div>

      {/* 2. SUB-NAVIGATION TABS */}
      <TimetableNavTabs />

      {/* 3. 4 DAILY METRIC CARDS */}
      <div className="timetable-kpis-grid">
        <div className="timetable-kpi-card">
          <span className="timetable-kpi-card__label">Total periods</span>
          <span className="timetable-kpi-card__value">48</span>
          <span className="timetable-kpi-card__subtext">Across 8 time slots</span>
        </div>

        <div className="timetable-kpi-card">
          <span className="timetable-kpi-card__label">Assigned</span>
          <span className="timetable-kpi-card__value" style={{ color: '#15803D' }}>44</span>
          <span className="timetable-kpi-card__subtext" style={{ color: '#15803D' }}>92% covered</span>
        </div>

        <div className="timetable-kpi-card">
          <span className="timetable-kpi-card__label">Free rooms</span>
          <span className="timetable-kpi-card__value">4</span>
          <span className="timetable-kpi-card__subtext">Available today</span>
        </div>

        <div className="timetable-kpi-card">
          <span className="timetable-kpi-card__label">Conflicts</span>
          <span className="timetable-kpi-card__value" style={{ color: '#DC2626' }}>1</span>
          <span className="timetable-kpi-card__subtext timetable-kpi-card__subtext--danger">
            Teacher overlap
          </span>
        </div>
      </div>

      {/* 4. FILTER TOOLBAR CARD */}
      <div className="attendance-card" style={{ padding: '16px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--edusync-text-secondary, #667085)' }}>
                Date
              </span>
              <input
                type="text"
                className="academic-select-filter"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                style={{ minWidth: 180 }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--edusync-text-secondary, #667085)' }}>
                Academic year
              </span>
              <select className="academic-select-filter" defaultValue="2026–2027">
                <option value="2026–2027">2026–2027</option>
                <option value="2025–2026">2025–2026</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--edusync-text-secondary, #667085)' }}>
                Class
              </span>
              <select
                className="academic-select-filter"
                value={classFilter}
                onChange={(e) => setClassFilter(e.target.value)}
              >
                <option value="All classes">All classes</option>
                <option value="Class 8">Class 8</option>
                <option value="Class 7">Class 7</option>
                <option value="Class 9">Class 9</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--edusync-text-secondary, #667085)' }}>
                Teacher
              </span>
              <select
                className="academic-select-filter"
                value={teacherFilter}
                onChange={(e) => setTeacherFilter(e.target.value)}
              >
                <option value="All teachers">All teachers</option>
                <option value="Nusrat Jahan">Nusrat Jahan</option>
                <option value="Farhan Ahmed">Farhan Ahmed</option>
                <option value="Maliha Noor">Maliha Noor</option>
                <option value="Sadia Islam">Sadia Islam</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button
              type="button"
              className="edusync-btn edusync-btn--secondary"
              onClick={() => {
                setClassFilter('All classes');
                setTeacherFilter('All teachers');
                showToast('success', 'Filters reset');
              }}
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* 5. CONFLICT BANNER (IF DETECTED) */}
      {!isConflictDismissed && (
        <div className="timetable-conflict-banner">
          <div>
            <h4 className="timetable-conflict-banner__title">⚠️ Schedule conflict detected</h4>
            <p className="timetable-conflict-banner__desc">
              Science · Class 7B overlaps with another assignment for Maliha Noor at 09:40 AM.
            </p>
          </div>
          <button
            type="button"
            className="edusync-btn"
            style={{ background: '#DC2626', color: '#ffffff', border: 'none', borderRadius: 8, padding: '7px 14px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
            onClick={dismissConflict}
          >
            Review conflict
          </button>
        </div>
      )}

      {/* 6. DAILY PERIODS TABLE */}
      <div className="timetable-card">
        <div className="timetable-card__header">
          <div>
            <h3 className="timetable-card__title">Monday · 12 October</h3>
            <p className="timetable-card__subtitle">Period schedule for selected date</p>
          </div>
        </div>

        <div style={{ width: '100%', overflowX: 'auto' }}>
          <table className="academic-table">
            <thead>
              <tr>
                <th>TIME</th>
                <th>CLASS / SECTION</th>
                <th>SUBJECT</th>
                <th>TEACHER</th>
                <th>ROOM</th>
                <th>STATUS</th>
                <th style={{ textAlign: 'right' }}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filteredPeriods.map((row) => (
                <tr key={row.id}>
                  <td style={{ fontWeight: 600, color: 'var(--edusync-text-navy, #14213D)' }}>
                    {row.timeSlot}
                  </td>
                  <td>{row.className} · {row.section}</td>
                  <td style={{ fontWeight: 600 }}>{row.subject}</td>
                  <td>{row.teacher}</td>
                  <td>{row.room}</td>
                  <td>
                    <span
                      className={`academic-pill ${
                        row.status === 'Assigned'
                          ? 'academic-pill--active'
                          : row.status === 'Conflict'
                          ? 'academic-pill--warning'
                          : 'academic-pill--draft'
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      type="button"
                      className="edusync-btn edusync-btn--secondary"
                      style={{ padding: '4px 10px', fontSize: 12 }}
                      onClick={() => showToast('success', `Editing ${row.subject} (${row.timeSlot})`)}
                    >
                      {row.status === 'Conflict' ? 'Review' : row.status === 'Unassigned' ? 'Assign' : 'Edit'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
