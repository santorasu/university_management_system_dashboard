import React from 'react';
import { useTimetableFlow } from '../../../application/state/timetable-flow.context';
import { TimetableKpis } from './components/TimetableKpis';
import { TimetableNavTabs } from './components/TimetableNavTabs';
import type { TimetableSlot } from '../../../core/entities/timetable.types';

interface TimetableWeeklyOverviewScreenProps {
  onNavigateToDashboard: () => void;
}

export const TimetableWeeklyOverviewScreen: React.FC<TimetableWeeklyOverviewScreenProps> = ({
  onNavigateToDashboard,
}) => {
  const {
    weeklySlots,
    selectedSlot,
    setSelectedSlot,
    selectedClass,
    setSelectedClass,
    selectedSection,
    setSelectedSection,
    selectedTeacher,
    setSelectedTeacher,
    selectedDay,
    setSelectedDay,
    upcomingSchedule,
    goToDailyView,
    goToScheduleBuilder,
    showToast,
  } = useTimetableFlow();

  const days: Array<{ label: string; dateNum: number; key: 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' }> = [
    { label: 'MON', dateNum: 12, key: 'MON' },
    { label: 'TUE', dateNum: 13, key: 'TUE' },
    { label: 'WED', dateNum: 14, key: 'WED' },
    { label: 'THU', dateNum: 15, key: 'THU' },
    { label: 'FRI', dateNum: 16, key: 'FRI' },
    { label: 'SAT', dateNum: 17, key: 'SAT' },
  ];

  const timeSlots = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00'];

  const getSlot = (dayKey: 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT', timeStr: string): TimetableSlot | undefined => {
    return weeklySlots.find((s) => s.day === dayKey && s.time === timeStr);
  };

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
            <span style={{ fontWeight: 500 }}>Timetable & Scheduling</span>
            <span className="timetable-hero__crumb-sep">/</span>
            <span style={{ color: 'var(--edusync-text-navy, #14213D)', fontWeight: 600 }}>Weekly Overview</span>
          </div>

          <div className="timetable-hero__title-row">
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
              <h1 className="timetable-hero__title">Timetable & Scheduling</h1>
              <p className="timetable-hero__subtitle">
                Manage weekly classes, teacher availability, rooms and academic events.
              </p>
            </div>
          </div>
        </div>

        <div className="timetable-hero__actions">
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
            onClick={goToScheduleBuilder}
          >
            + Create schedule
          </button>
        </div>
      </div>

      {/* 2. SUB-NAVIGATION TABS (Placed directly below Hero for consistency) */}
      <TimetableNavTabs />

      {/* 3. 4 KPI STAT CARDS (Placed under tabs) */}
      <TimetableKpis />

      {/* 4. FILTER TOOLBAR CARD */}
      <div className="attendance-card" style={{ padding: '16px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--edusync-text-secondary, #667085)' }}>
                Weekly timetable
              </span>
              <input
                type="text"
                className="academic-select-filter"
                value="12–17 October 2026"
                readOnly
                style={{ minWidth: 160 }}
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
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                <option value="Class 8">Class 8</option>
                <option value="Class 7">Class 7</option>
                <option value="Class 9">Class 9</option>
                <option value="Class 10">Class 10</option>
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
                <option value="Section A">Section A</option>
                <option value="Section B">Section B</option>
                <option value="Section C">Section C</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--edusync-text-secondary, #667085)' }}>
                Teacher
              </span>
              <select
                className="academic-select-filter"
                value={selectedTeacher}
                onChange={(e) => setSelectedTeacher(e.target.value)}
              >
                <option value="All teachers">All teachers</option>
                <option value="Nusrat Jahan">Nusrat Jahan</option>
                <option value="Farhan Ahmed">Farhan Ahmed</option>
                <option value="Maliha Noor">Maliha Noor</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--edusync-text-secondary, #667085)' }}>
                Day
              </span>
              <select
                className="academic-select-filter"
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
              >
                <option value="All days">All days</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 16 }}>
            <button
              type="button"
              className="edusync-btn edusync-btn--secondary"
              onClick={goToDailyView}
            >
              Daily View →
            </button>
          </div>
        </div>
      </div>

      {/* 5. SPLIT 70% / 30%: WEEKLY TIMETABLE GRID & UPCOMING SCHEDULE */}
      <div className="timetable-split-70-30">
        {/* LEFT: WEEKLY TIMETABLE GRID */}
        <div className="timetable-card">
          <div className="timetable-card__header">
            <div>
              <h3 className="timetable-card__title">Weekly timetable</h3>
              <p className="timetable-card__subtitle">
                {selectedClass} · {selectedSection} · 12–17 October 2026
              </p>
            </div>
          </div>

          <div className="timetable-grid-table-wrap">
            <table className="timetable-grid-table">
              <thead>
                <tr>
                  <th className="timetable-time-th">TIME</th>
                  {days.map((d) => (
                    <th key={d.key}>
                      {d.label} {d.dateNum}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((timeStr) => (
                  <tr key={timeStr}>
                    <td className="timetable-time-td">{timeStr}</td>
                    {days.map((d) => {
                      const slot = getSlot(d.key, timeStr);
                      const isSelected = selectedSlot?.id === slot?.id;
                      return (
                        <td key={`${d.key}-${timeStr}`}>
                          {slot ? (
                            <div
                              className={`timetable-slot-cell timetable-slot-cell--${slot.type} ${
                                isSelected ? 'timetable-slot-cell--selected' : ''
                              }`}
                              onClick={() => {
                                setSelectedSlot(slot);
                                showToast('success', `Selected ${slot.subject} (${slot.room})`);
                              }}
                            >
                              <span className="timetable-slot-subject">{slot.subject}</span>
                              <span className="timetable-slot-room">{slot.room}</span>
                            </div>
                          ) : (
                            <div
                              className="timetable-slot-cell"
                              style={{ borderStyle: 'dashed', background: '#FAFAFA' }}
                              onClick={() => goToScheduleBuilder()}
                            >
                              <span style={{ fontSize: 11, color: 'var(--edusync-text-muted, #98A2B3)' }}>
                                + Free
                              </span>
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* SCHEDULE LEGEND */}
          <div className="timetable-legend">
            <div className="timetable-legend-item">
              <span className="timetable-legend-badge" style={{ background: '#3659D9' }}></span>
              <span>Class</span>
            </div>
            <div className="timetable-legend-item">
              <span className="timetable-legend-badge" style={{ background: '#059669' }}></span>
              <span>Lab</span>
            </div>
            <div className="timetable-legend-item">
              <span className="timetable-legend-badge" style={{ background: '#D97706' }}></span>
              <span>Exam</span>
            </div>
            <div className="timetable-legend-item">
              <span className="timetable-legend-badge" style={{ background: '#7C3AED' }}></span>
              <span>Event / holiday</span>
            </div>
            <span style={{ marginLeft: 'auto', fontStyle: 'italic', fontSize: 11, color: 'var(--edusync-text-muted, #98A2B3)' }}>
              Select a timetable block to inspect or edit its assignment.
            </span>
          </div>
        </div>

        {/* RIGHT: UPCOMING SCHEDULE */}
        <div className="timetable-card">
          <div className="timetable-card__header">
            <div>
              <h3 className="timetable-card__title">Upcoming schedule</h3>
              <p className="timetable-card__subtitle">Events, tests & lectures</p>
            </div>
          </div>

          <div className="timetable-upcoming-list">
            {upcomingSchedule.map((item) => (
              <div key={item.id} className="timetable-upcoming-item">
                <span className="timetable-upcoming-item__time">{item.timeText}</span>
                <span className="timetable-upcoming-item__title">{item.title}</span>
                <span className="timetable-upcoming-item__loc">{item.location}</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 16 }}>
            <button
              type="button"
              className="edusync-btn edusync-btn--secondary"
              style={{ width: '100%', fontSize: 13 }}
              onClick={goToScheduleBuilder}
            >
              View all events
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
