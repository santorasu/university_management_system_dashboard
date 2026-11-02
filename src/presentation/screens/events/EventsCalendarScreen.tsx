import React, { useState } from 'react';
import { useEventsFlow } from '../../../application/state/events-flow.context';
import { EventsNavTabs } from './components/EventsNavTabs';
import { EventsKpiCards } from './components/EventsKpiCards';
import type { EventCategory, SchoolEvent } from '../../../core/entities/event.types';

interface EventsCalendarScreenProps {
  onNavigateToDashboard: () => void;
}

export const EventsCalendarScreen: React.FC<EventsCalendarScreenProps> = ({
  onNavigateToDashboard,
}) => {
  const {
    events,
    saveEvent,
    goToDirectory,
  } = useEventsFlow();

  const [eventTitle, setEventTitle] = useState('Parent–Teacher Meeting');
  const [eventType, setEventType] = useState<EventCategory>('Academic');
  const [eventDate, setEventDate] = useState('20 Oct 2026');
  const [startTime, setStartTime] = useState('09:00 AM');
  const [endTime, setEndTime] = useState('11:00 AM');
  const [audience, setAudience] = useState('Parents · Class 6–8');
  const [location, setLocation] = useState('Main auditorium');

  const handleSave = async (isDraft: boolean) => {
    if (!eventTitle.trim()) {
      alert('Please enter an event title');
      return;
    }
    await saveEvent({
      title: eventTitle,
      category: eventType,
      date: eventDate,
      startTime,
      endTime,
      timeRange: `${startTime.replace(':00', '')}–${endTime.replace(':00', '')}`,
      audience,
      location,
      status: isDraft ? 'Draft' : 'Published',
    });
  };

  // Calendar cells for October 2026
  // Sunday Sept 27 to Saturday Oct 31 (35 cells)
  const calendarCells = [
    { day: 27, muted: true, events: [] },
    { day: 28, muted: true, events: [] },
    { day: 29, muted: true, events: [] },
    { day: 30, muted: true, events: [] },
    { day: 1, muted: false, events: [] },
    { day: 2, muted: false, events: [] },
    { day: 3, muted: false, events: [] },
    { day: 4, muted: false, events: [] },
    { day: 5, muted: false, events: [] },
    { day: 6, muted: false, events: [{ name: 'Assembly', type: 'school' }] },
    { day: 7, muted: false, events: [] },
    { day: 8, muted: false, events: [{ name: 'Holiday', type: 'holiday' }] },
    { day: 9, muted: false, events: [] },
    { day: 10, muted: false, events: [] },
    { day: 11, muted: false, events: [] },
    { day: 12, muted: false, events: [] },
    { day: 13, muted: false, events: [] },
    { day: 14, muted: false, events: [{ name: 'Exam', type: 'academic' }] },
    { day: 15, muted: false, events: [] },
    { day: 16, muted: false, events: [] },
    { day: 17, muted: false, events: [] },
    { day: 18, muted: false, events: [] },
    { day: 19, muted: false, events: [{ name: 'Sports', type: 'sports' }] },
    { day: 20, muted: false, events: [{ name: 'PTM', type: 'meeting' }] },
    { day: 21, muted: false, events: [] },
    { day: 22, muted: false, events: [{ name: 'Meeting', type: 'meeting' }] },
    { day: 23, muted: false, events: [] },
    { day: 24, muted: false, events: [] },
    { day: 25, muted: false, events: [] },
    { day: 26, muted: false, events: [] },
    { day: 27, muted: false, events: [] },
    { day: 28, muted: false, events: [{ name: 'Cultural Day', type: 'cultural' }] },
    { day: 29, muted: false, events: [] },
    { day: 30, muted: false, events: [] },
    { day: 31, muted: false, events: [] },
  ];

  return (
    <div className="events-container">
      {/* 1. HERO / HEADER & BREADCRUMBS */}
      <div className="events-hero">
        <div className="events-hero__left">
          <nav className="events-hero__crumbs" aria-label="Breadcrumb">
            <button
              type="button"
              className="events-hero__crumb--link"
              onClick={onNavigateToDashboard}
            >
              Dashboard
            </button>
            <span className="events-hero__crumb-sep">/</span>
            <span style={{ fontWeight: 500 }}>School Operations</span>
            <span className="events-hero__crumb-sep">/</span>
            <span className="events-hero__crumb--current">School Events Calendar</span>
          </nav>

          <div className="events-hero__title-row">
            <button
              type="button"
              className="edusync-btn-back-circle"
              onClick={onNavigateToDashboard}
              title="Return to Dashboard"
              aria-label="Back to Dashboard"
            >
              ←
            </button>
            <div>
              <h1 className="events-hero__title">School Events</h1>
              <p className="events-hero__subtitle">
                Plan academic events and holidays with clear dates, times, and audiences
              </p>
            </div>
          </div>
        </div>

        <div className="events-hero__actions">
          <button
            type="button"
            className="edusync-btn edusync-btn--secondary"
            onClick={goToDirectory}
          >
            📋 Events List
          </button>
          <button
            type="button"
            className="edusync-btn edusync-btn--primary"
            onClick={() => {
              const el = document.getElementById('event-title-input');
              if (el) el.focus();
            }}
          >
            + Create event
          </button>
        </div>
      </div>

      {/* 2. SUB-NAVIGATION TABS (DIRECTLY UNDER HERO) */}
      <EventsNavTabs />

      {/* 3. 4 KPI STAT METRIC CARDS (DIRECTLY UNDER TABS) */}
      <EventsKpiCards />

      {/* 4. MAIN 65% / 35% SPLIT: CALENDAR + UPCOMING & EDITOR */}
      <div className="events-split-grid">
        {/* LEFT COLUMN: SCHOOL EVENTS CALENDAR */}
        <div className="events-card events-calendar">
          <div className="events-calendar-header">
            <div>
              <h2 className="events-card__title">October 2026</h2>
              <p className="events-card__subtitle">School calendar · Academic year 2026–27</p>
            </div>

            <div className="events-calendar-nav">
              <button type="button" className="events-calendar-nav-btn">
                ‹
              </button>
              <button type="button" className="events-calendar-nav-btn">
                Today
              </button>
              <button type="button" className="events-calendar-nav-btn">
                ›
              </button>
            </div>
          </div>

          {/* Days of week header */}
          <div className="events-calendar-days-row">
            {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((d) => (
              <div key={d} className="events-calendar-day-label">
                {d}
              </div>
            ))}
          </div>

          {/* Calendar Grid Cells */}
          <div className="events-calendar-cells-grid">
            {calendarCells.map((cell, idx) => (
              <div
                key={idx}
                className={`events-calendar-cell ${cell.muted ? 'events-calendar-cell--muted' : ''}`}
              >
                <span className="events-calendar-cell__date">{cell.day}</span>
                {cell.events.map((ev, evIdx) => (
                  <span
                    key={evIdx}
                    className={`events-calendar-event-pill events-calendar-event-pill--${ev.type}`}
                  >
                    {ev.name}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: UPCOMING EVENTS & EVENT EDITOR */}
        <div className="events-side-col">
          {/* Upcoming Events Panel */}
          <div className="events-card">
            <div className="events-card__header">
              <div>
                <h3 className="events-card__title" style={{ fontSize: 16 }}>Upcoming events</h3>
                <p className="events-card__subtitle" style={{ fontSize: 12 }}>Next scheduled school activities</p>
              </div>
            </div>

            <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {events.slice(0, 4).map((evt: SchoolEvent) => (
                <div
                  key={evt.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 12px',
                    borderRadius: 8,
                    background: '#F8FAFC',
                    border: '1px solid #E4E7EC',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#14213D' }}>
                      {evt.title}
                    </span>
                    <span style={{ fontSize: 11, color: '#667085' }}>
                      {evt.audience}
                    </span>
                  </div>
                  <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#3659D9' }}>
                      {evt.date.split(' ').slice(0, 2).join(' ')}
                    </span>
                    <span style={{ fontSize: 11, color: '#98A2B3' }}>
                      {evt.timeRange}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Create / Edit Event Form Card */}
          <div className="events-card">
            <div className="events-card__header">
              <div>
                <h3 className="events-card__title" style={{ fontSize: 16 }}>Create / edit event</h3>
                <p className="events-card__subtitle" style={{ fontSize: 12 }}>Set schedule, audience, and event type</p>
              </div>
            </div>

            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div className="events-form-group" style={{ margin: 0 }}>
                <label className="events-form-label">Event title</label>
                <input
                  id="event-title-input"
                  type="text"
                  className="events-form-input"
                  placeholder="e.g. Parent–Teacher Meeting"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div className="events-form-group" style={{ margin: 0 }}>
                  <label className="events-form-label">Event type</label>
                  <select
                    className="events-form-select"
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value as any)}
                  >
                    <option value="Academic">Academic</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Holiday">Holiday</option>
                    <option value="Sports">Sports</option>
                    <option value="Cultural">Cultural</option>
                    <option value="School event">School event</option>
                  </select>
                </div>

                <div className="events-form-group" style={{ margin: 0 }}>
                  <label className="events-form-label">Date</label>
                  <input
                    type="text"
                    className="events-form-input"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div className="events-form-group" style={{ margin: 0 }}>
                  <label className="events-form-label">Start time</label>
                  <input
                    type="text"
                    className="events-form-input"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                </div>

                <div className="events-form-group" style={{ margin: 0 }}>
                  <label className="events-form-label">End time</label>
                  <input
                    type="text"
                    className="events-form-input"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </div>
              </div>

              <div className="events-form-group" style={{ margin: 0 }}>
                <label className="events-form-label">Audience</label>
                <input
                  type="text"
                  className="events-form-input"
                  placeholder="Select roles, classes, or sections"
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                />
              </div>

              <div className="events-form-group" style={{ margin: 0 }}>
                <label className="events-form-label">Location</label>
                <input
                  type="text"
                  className="events-form-input"
                  placeholder="Main auditorium"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                <button
                  type="button"
                  className="edusync-btn edusync-btn--secondary"
                  style={{ flex: 1 }}
                  onClick={() => handleSave(true)}
                >
                  Save draft
                </button>
                <button
                  type="button"
                  className="edusync-btn edusync-btn--primary"
                  style={{ flex: 1 }}
                  onClick={() => handleSave(false)}
                >
                  Save event
                </button>
              </div>
            </div>
          </div>

          {/* Holiday academic event notes */}
          <div
            style={{
              padding: 16,
              background: '#F8FAFC',
              border: '1px solid #E4E7EC',
              borderRadius: 10,
              fontSize: 12,
              color: '#667085',
              lineHeight: 1.5,
            }}
          >
            <div style={{ fontWeight: 700, color: '#14213D', marginBottom: 6 }}>
              Event types & planning
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div>• <strong>Academic:</strong> Exams, orientation, meetings</div>
              <div>• <strong>Holiday:</strong> Public and school holidays</div>
              <div>• <strong>School event:</strong> Sports, cultural, parent events</div>
            </div>
            <div style={{ marginTop: 6, fontStyle: 'italic', color: '#98A2B3' }}>
              Confirm dates and audience before publishing the school calendar.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
