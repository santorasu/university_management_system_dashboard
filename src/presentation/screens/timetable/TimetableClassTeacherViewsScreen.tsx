import React from 'react';
import { useTimetableFlow } from '../../../application/state/timetable-flow.context';
import { TimetableNavTabs } from './components/TimetableNavTabs';

interface TimetableClassTeacherViewsScreenProps {
  onNavigateToDashboard: () => void;
}

export const TimetableClassTeacherViewsScreen: React.FC<TimetableClassTeacherViewsScreenProps> = ({
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
    viewMode,
    setViewMode,
    teacherWorkloads,
    roomAvailabilities,
    goToWeeklyOverview,
    goToScheduleBuilder,
    deleteSelectedSlot,
    showToast,
  } = useTimetableFlow();

  const days: Array<'MON' | 'TUE' | 'WED' | 'THU' | 'FRI'> = ['MON', 'TUE', 'WED', 'THU', 'FRI'];
  const times = ['08:00', '09:00', '10:00', '11:00', '12:00'];

  const getSlotForGrid = (d: 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI', t: string) => {
    return weeklySlots.find((s) => s.day === d && s.time === t);
  };

  return (
    <div className="timetable-container">
      {/* 1. HERO & BREADCRUMBS */}
      <div className="timetable-hero">
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
              onClick={goToWeeklyOverview}
            >
              Timetable & Scheduling
            </button>
            <span className="attendance-hero__crumb-sep">/</span>
            <span style={{ color: 'var(--edusync-text-navy, #14213D)', fontWeight: 600 }}>Class & Teacher Views</span>
          </div>

          <div className="attendance-hero__title-row">
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
              <h1 className="attendance-hero__title">Class & Teacher Timetables</h1>
              <p className="attendance-hero__subtitle">
                Switch between class-wise and teacher-wise schedules and manage subject-room assignments.
              </p>
            </div>
          </div>
        </div>

        <div className="attendance-hero__actions">
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
            + Assign subject
          </button>
        </div>
      </div>

      {/* 2. SUB-NAVIGATION TABS */}
      <TimetableNavTabs />

      {/* 3. SEGMENTED VIEW CONTROLS & FILTER */}
      <div className="attendance-card" style={{ padding: '14px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {/* Class view vs Teacher view segmented buttons */}
            <div className="timetable-segmented-controls">
              <button
                type="button"
                className={`timetable-segment-btn ${viewMode === 'class' ? 'timetable-segment-btn--active' : ''}`}
                onClick={() => setViewMode('class')}
              >
                Class view
              </button>
              <button
                type="button"
                className={`timetable-segment-btn ${viewMode === 'teacher' ? 'timetable-segment-btn--active' : ''}`}
                onClick={() => setViewMode('teacher')}
              >
                Teacher view
              </button>
            </div>

            {viewMode === 'class' ? (
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <select
                  className="academic-select-filter"
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                >
                  <option value="Class 8">Class 8</option>
                  <option value="Class 7">Class 7</option>
                  <option value="Class 9">Class 9</option>
                </select>
                <select
                  className="academic-select-filter"
                  value={selectedSection}
                  onChange={(e) => setSelectedSection(e.target.value)}
                >
                  <option value="Section A">Section A</option>
                  <option value="Section B">Section B</option>
                </select>
              </div>
            ) : (
              <select className="academic-select-filter" defaultValue="Nusrat Jahan">
                <option value="Nusrat Jahan">Nusrat Jahan (Mathematics)</option>
                <option value="Farhan Ahmed">Farhan Ahmed (English)</option>
                <option value="Maliha Noor">Maliha Noor (Science)</option>
              </select>
            )}
          </div>

          <span style={{ fontSize: 13, color: 'var(--edusync-text-secondary, #667085)', fontWeight: 500 }}>
            Academic year 2026–2027 · Term 1
          </span>
        </div>
      </div>

      {/* 4. SPLIT 65% / 35%: TIMETABLE GRID & INSPECTION / WORKLOAD PANELS */}
      <div className="timetable-split-70-30">
        {/* LEFT: SCHEDULE GRID */}
        <div className="timetable-card">
          <div className="timetable-card__header">
            <div>
              <h3 className="timetable-card__title">
                {viewMode === 'class' ? `${selectedClass} · ${selectedSection}` : 'Nusrat Jahan · Schedule'}
              </h3>
              <p className="timetable-card__subtitle">Weekly subject and classroom assignments</p>
            </div>
          </div>

          <div className="timetable-grid-table-wrap">
            <table className="timetable-grid-table">
              <thead>
                <tr>
                  <th className="timetable-time-th">TIME</th>
                  {days.map((d) => (
                    <th key={d}>{d}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {times.map((t) => (
                  <tr key={t}>
                    <td className="timetable-time-td">{t}</td>
                    {days.map((d) => {
                      const slot = getSlotForGrid(d, t);
                      const isSelected = selectedSlot?.id === slot?.id;
                      return (
                        <td key={`${d}-${t}`}>
                          {slot ? (
                            <div
                              className={`timetable-slot-cell timetable-slot-cell--${slot.type} ${
                                isSelected ? 'timetable-slot-cell--selected' : ''
                              }`}
                              onClick={() => {
                                setSelectedSlot(slot);
                                showToast('success', `Viewing ${slot.subject}`);
                              }}
                            >
                              <span className="timetable-slot-subject">{slot.subject}</span>
                              <span className="timetable-slot-room">{slot.room}</span>
                            </div>
                          ) : (
                            <div className="timetable-slot-cell" style={{ borderStyle: 'dashed', background: '#FAFAFA' }}>
                              <span style={{ fontSize: 11, color: 'var(--edusync-text-muted, #98A2B3)' }}>
                                —
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
        </div>

        {/* RIGHT: INSPECTION, WORKLOAD & ROOM AVAILABILITY */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {/* 1. SELECTED ASSIGNMENT CARD */}
          <div className="timetable-card">
            <div className="timetable-card__header" style={{ marginBottom: 12 }}>
              <h3 className="timetable-card__title" style={{ fontSize: 16 }}>Selected assignment</h3>
            </div>

            {selectedSlot ? (
              <div className="timetable-assignment-details-box">
                <div className="timetable-assignment-prop">
                  <span className="timetable-assignment-prop__label">SUBJECT</span>
                  <span className="timetable-assignment-prop__value">{selectedSlot.subject}</span>
                </div>

                <div className="timetable-assignment-prop">
                  <span className="timetable-assignment-prop__label">TEACHER</span>
                  <span className="timetable-assignment-prop__value">{selectedSlot.teacher}</span>
                </div>

                <div className="timetable-assignment-prop">
                  <span className="timetable-assignment-prop__label">CLASSROOM</span>
                  <span className="timetable-assignment-prop__value">{selectedSlot.room} · Capacity 40</span>
                </div>

                <div className="timetable-assignment-prop">
                  <span className="timetable-assignment-prop__label">TIME</span>
                  <span className="timetable-assignment-prop__value">
                    {selectedSlot.day} · {selectedSlot.time}–{Number(selectedSlot.time.slice(0, 2)) + 0}:45
                  </span>
                </div>

                <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                  <button
                    type="button"
                    className="edusync-btn edusync-btn--secondary"
                    style={{ flex: 1, padding: '6px 12px', fontSize: 12 }}
                    onClick={() => goToScheduleBuilder()}
                  >
                    Edit assignment
                  </button>
                  <button
                    type="button"
                    className="edusync-btn"
                    style={{
                      padding: '6px 12px',
                      fontSize: 12,
                      background: '#FEF2F2',
                      color: '#DC2626',
                      border: '1px solid #FECACA',
                      borderRadius: 8,
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                    onClick={() => deleteSelectedSlot(selectedSlot.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <p style={{ margin: 0, fontSize: 13, color: 'var(--edusync-text-secondary, #667085)' }}>
                Select any assignment block on the schedule.
              </p>
            )}
          </div>

          {/* 2. TEACHER WORKLOAD OVERVIEW */}
          <div className="timetable-card">
            <div className="timetable-card__header" style={{ marginBottom: 12 }}>
              <h3 className="timetable-card__title" style={{ fontSize: 16 }}>Teacher workload overview</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {teacherWorkloads.map((tw) => (
                <div
                  key={tw.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 12px',
                    background: '#F8FAFC',
                    borderRadius: 8,
                    fontSize: 13,
                  }}
                >
                  <span style={{ fontWeight: 600 }}>{tw.teacherName}</span>
                  <span style={{ color: 'var(--edusync-brand-primary, #3659D9)', fontWeight: 600 }}>
                    {tw.periodsPerWeek} periods / week
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 3. ROOM AVAILABILITY */}
          <div className="timetable-card">
            <div className="timetable-card__header" style={{ marginBottom: 12 }}>
              <h3 className="timetable-card__title" style={{ fontSize: 16 }}>Room availability</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {roomAvailabilities.map((ra) => (
                <div
                  key={ra.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 12px',
                    background: '#F8FAFC',
                    borderRadius: 8,
                    fontSize: 13,
                  }}
                >
                  <div>
                    <span style={{ display: 'block', fontWeight: 600 }}>{ra.roomName}</span>
                    <span style={{ fontSize: 11, color: 'var(--edusync-text-secondary, #667085)' }}>
                      {ra.statusText}
                    </span>
                  </div>
                  <span
                    className={`academic-pill ${
                      ra.isBusy ? 'academic-pill--warning' : 'academic-pill--active'
                    }`}
                  >
                    {ra.isBusy ? 'Busy' : 'Free'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
