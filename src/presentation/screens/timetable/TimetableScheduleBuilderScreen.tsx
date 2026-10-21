import React, { useState } from 'react';
import { useTimetableFlow } from '../../../application/state/timetable-flow.context';
import { TimetableNavTabs } from './components/TimetableNavTabs';

interface TimetableScheduleBuilderScreenProps {
  onNavigateToDashboard: () => void;
}

export const TimetableScheduleBuilderScreen: React.FC<TimetableScheduleBuilderScreenProps> = ({
  onNavigateToDashboard,
}) => {
  const {
    timeSlotConfigs,
    academicEvents,
    upcomingSchedule,
    goToWeeklyOverview,
    saveNewSchedule,
    openAddEventModal,
    showToast,
  } = useTimetableFlow();

  // Form State
  const [subject, setSubject] = useState('Mathematics');
  const [teacher, setTeacher] = useState('Nusrat Jahan');
  const [classroom, setClassroom] = useState('Room 204');
  const [day, setDay] = useState('Monday');
  const [startTime, setStartTime] = useState('08:00 AM');
  const [endTime, setEndTime] = useState('08:45 AM');
  const [periodLabel, setPeriodLabel] = useState('Period 1');
  const [repeatDays, setRepeatDays] = useState<string[]>(['Mon', 'Wed', 'Fri']);

  const allDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const toggleDay = (d: string) => {
    setRepeatDays((prev) =>
      prev.includes(d) ? prev.filter((item) => item !== d) : [...prev, d]
    );
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await saveNewSchedule({
      subject,
      teacher,
      classroom,
      day,
      startTime,
      endTime,
      periodLabel,
      repeatDays,
    });
    if (ok) {
      goToWeeklyOverview();
    }
  };

  const resetForm = () => {
    setSubject('Mathematics');
    setTeacher('Nusrat Jahan');
    setClassroom('Room 204');
    setDay('Monday');
    setStartTime('08:00 AM');
    setEndTime('08:45 AM');
    setPeriodLabel('Period 1');
    setRepeatDays(['Mon', 'Wed', 'Fri']);
    showToast('success', 'Form reset.');
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
            <span style={{ color: 'var(--edusync-text-navy, #14213D)', fontWeight: 600 }}>Schedule Builder</span>
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
              <h1 className="attendance-hero__title">Schedule Builder</h1>
              <p className="attendance-hero__subtitle">
                Create or edit class periods, configure time slots and detect conflicts before saving.
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
            onClick={() => showToast('success', 'Ready to add new schedule period')}
          >
            + New schedule
          </button>
        </div>
      </div>

      {/* 2. SUB-NAVIGATION TABS */}
      <TimetableNavTabs />

      {/* 3. 2-COLUMN SPLIT: FORM & RIGHT PANELS */}
      <div className="academic-two-col-grid">
        {/* LEFT: PERIOD DETAILS FORM */}
        <div className="timetable-card">
          <div className="timetable-card__header">
            <div>
              <h3 className="timetable-card__title">Period details</h3>
              <p className="timetable-card__subtitle">Configure single period or recurring class session</p>
            </div>
          </div>

          <form onSubmit={handleFormSubmit}>
            <div className="academic-form-grid">
              <div className="academic-form-group">
                <label className="academic-form-label">Subject *</label>
                <select
                  className="academic-form-select"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                >
                  <option value="Mathematics">Mathematics</option>
                  <option value="English">English</option>
                  <option value="Science">Science</option>
                  <option value="Bangla">Bangla</option>
                  <option value="ICT">ICT</option>
                  <option value="History">History</option>
                  <option value="Physics">Physics</option>
                </select>
              </div>

              <div className="academic-form-group">
                <label className="academic-form-label">Teacher *</label>
                <select
                  className="academic-form-select"
                  value={teacher}
                  onChange={(e) => setTeacher(e.target.value)}
                >
                  <option value="Nusrat Jahan">Nusrat Jahan</option>
                  <option value="Farhan Ahmed">Farhan Ahmed</option>
                  <option value="Maliha Noor">Maliha Noor</option>
                  <option value="Tania Akter">Tania Akter</option>
                  <option value="Rafiq Hasan">Rafiq Hasan</option>
                  <option value="Sadia Islam">Sadia Islam</option>
                </select>
              </div>

              <div className="academic-form-group">
                <label className="academic-form-label">Classroom *</label>
                <select
                  className="academic-form-select"
                  value={classroom}
                  onChange={(e) => setClassroom(e.target.value)}
                >
                  <option value="Room 204">Room 204</option>
                  <option value="Room 105">Room 105</option>
                  <option value="Lab 02">Lab 02</option>
                  <option value="Room 201">Room 201</option>
                  <option value="Lab 01">Lab 01</option>
                  <option value="Room 108">Room 108</option>
                </select>
              </div>

              <div className="academic-form-group">
                <label className="academic-form-label">Day *</label>
                <select
                  className="academic-form-select"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                >
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                </select>
              </div>

              <div className="academic-form-group">
                <label className="academic-form-label">Start time</label>
                <input
                  type="text"
                  className="academic-form-input"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>

              <div className="academic-form-group">
                <label className="academic-form-label">End time</label>
                <input
                  type="text"
                  className="academic-form-input"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>

              <div className="academic-form-group academic-form-group--full">
                <label className="academic-form-label">Period label</label>
                <input
                  type="text"
                  className="academic-form-input"
                  value={periodLabel}
                  onChange={(e) => setPeriodLabel(e.target.value)}
                />
              </div>

              <div className="academic-form-group academic-form-group--full">
                <label className="academic-form-label">Repeat on</label>
                <div className="timetable-days-toggle-row">
                  {allDays.map((d) => (
                    <button
                      key={d}
                      type="button"
                      className={`timetable-day-chip ${
                        repeatDays.includes(d) ? 'timetable-day-chip--active' : ''
                      }`}
                      onClick={() => toggleDay(d)}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* LIVE CONFLICT CHECK BANNER */}
            <div
              style={{
                marginTop: 18,
                padding: '12px 16px',
                background: '#FFFBEB',
                border: '1px solid #FDE68A',
                borderRadius: 8,
              }}
            >
              <h4 style={{ margin: '0 0 4px 0', fontSize: 13, fontWeight: 700, color: '#92400E' }}>
                Conflict check: Teacher overlap detected
              </h4>
              <p style={{ margin: 0, fontSize: 12, color: '#B45309' }}>
                Nusrat Jahan is assigned to Class 7B at 08:30 AM. Choose another teacher, room or time slot before saving.
              </p>
            </div>

            <div className="academic-form-actions">
              <button
                type="button"
                className="edusync-btn edusync-btn--secondary"
                onClick={resetForm}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="edusync-btn edusync-btn--primary"
              >
                Save schedule
              </button>
            </div>
          </form>
        </div>

        {/* RIGHT: TIME SLOTS CONFIGURATION & ACADEMIC EVENTS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {/* 1. TIME-SLOT CONFIGURATION */}
          <div className="timetable-card">
            <div className="timetable-card__header">
              <div>
                <h3 className="timetable-card__title" style={{ fontSize: 16 }}>Time-slot configuration</h3>
                <p className="timetable-card__subtitle">Default daily period schedule</p>
              </div>
              <button
                type="button"
                className="edusync-btn edusync-btn--secondary"
                style={{ padding: '4px 10px', fontSize: 12 }}
                onClick={() => showToast('success', 'Opening time slot editor')}
              >
                Edit time slots
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {timeSlotConfigs.map((ts) => (
                <div
                  key={ts.id}
                  className="timetable-slot-config-item"
                  style={{ background: ts.isBreak ? '#FFFBEB' : '#F8FAFC' }}
                >
                  <span className="timetable-slot-config-item__label">
                    {ts.label} {ts.isBreak && '☕'}
                  </span>
                  <span className="timetable-slot-config-item__time">{ts.timeRange}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 2. ACADEMIC EVENTS & HOLIDAYS */}
          <div className="timetable-card">
            <div className="timetable-card__header">
              <div>
                <h3 className="timetable-card__title" style={{ fontSize: 16 }}>Academic events & holidays</h3>
                <p className="timetable-card__subtitle">Scheduled campus wide milestones</p>
              </div>
              <button
                type="button"
                className="edusync-btn edusync-btn--primary"
                style={{ padding: '4px 10px', fontSize: 12 }}
                onClick={openAddEventModal}
              >
                + Add event
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {academicEvents.map((ev) => (
                <div
                  key={ev.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px 12px',
                    background: '#F8FAFC',
                    border: '1px solid var(--edusync-border-default, #E4E7EC)',
                    borderRadius: 8,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span
                      style={{
                        padding: '4px 8px',
                        borderRadius: 6,
                        background: '#EEF2FF',
                        color: 'var(--edusync-brand-primary, #3659D9)',
                        fontWeight: 700,
                        fontSize: 12,
                      }}
                    >
                      {ev.date}
                    </span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--edusync-text-navy, #14213D)' }}>
                      {ev.title}
                    </span>
                  </div>

                  <span
                    className={`academic-pill ${
                      ev.type === 'Academic event'
                        ? 'academic-pill--active'
                        : ev.type === 'Holiday'
                        ? 'academic-pill--warning'
                        : 'academic-pill--draft'
                    }`}
                  >
                    {ev.type}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 3. UPCOMING SCHEDULE PREVIEW */}
          <div className="timetable-card">
            <div className="timetable-card__header" style={{ marginBottom: 12 }}>
              <h3 className="timetable-card__title" style={{ fontSize: 16 }}>Upcoming schedule</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {upcomingSchedule.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 12px',
                    background: '#F8FAFC',
                    borderRadius: 6,
                    fontSize: 12,
                  }}
                >
                  <span style={{ fontWeight: 600, color: 'var(--edusync-brand-primary, #3659D9)' }}>
                    {item.timeText}
                  </span>
                  <span style={{ color: 'var(--edusync-text-navy, #14213D)' }}>{item.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
