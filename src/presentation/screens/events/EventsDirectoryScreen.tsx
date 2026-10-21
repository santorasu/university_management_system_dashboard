import React, { useState } from 'react';
import { useEventsFlow } from '../../../application/state/events-flow.context';
import { EventsNavTabs } from './components/EventsNavTabs';
import { EventsKpiCards } from './components/EventsKpiCards';
import type { SchoolEvent, EventStatus } from '../../../core/entities/event.types';

interface EventsDirectoryScreenProps {
  onNavigateToDashboard: () => void;
}

export const EventsDirectoryScreen: React.FC<EventsDirectoryScreenProps> = ({
  onNavigateToDashboard,
}) => {
  const {
    events,
    eventFilters,
    setSearchQuery,
    setCategory,
    setStatus,
    resetFilters,
    goToCalendar,
    selectEvent,
    showToast,
  } = useEventsFlow();

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
  const totalPages = Math.ceil(events.length / pageSize) || 1;
  const paginatedEvents = events.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const getStatusBadge = (status: EventStatus) => {
    switch (status) {
      case 'Published':
        return <span className="events-status-pill events-status-pill--published">Published</span>;
      case 'Draft':
        return <span className="events-status-pill events-status-pill--draft">Draft</span>;
      case 'Scheduled':
        return <span className="events-status-pill events-status-pill--scheduled">Scheduled</span>;
      case 'Completed':
        return <span className="events-status-pill events-status-pill--completed">Completed</span>;
      default:
        return <span className="events-status-pill">{status}</span>;
    }
  };

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
            <span className="events-hero__crumb--current">Events Directory</span>
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
              <h1 className="events-hero__title">School Events Directory</h1>
              <p className="events-hero__subtitle">
                Comprehensive roster of scheduled academic, athletic, cultural, and administrative events
              </p>
            </div>
          </div>
        </div>

        <div className="events-hero__actions">
          <button
            type="button"
            className="edusync-btn edusync-btn--secondary"
            onClick={goToCalendar}
          >
            📅 View Calendar
          </button>
          <button
            type="button"
            className="edusync-btn edusync-btn--primary"
            onClick={goToCalendar}
          >
            + Create event
          </button>
        </div>
      </div>

      {/* 2. SUB-NAVIGATION TABS (DIRECTLY UNDER HERO) */}
      <EventsNavTabs />

      {/* 3. 4 KPI STAT METRIC CARDS (DIRECTLY UNDER TABS) */}
      <EventsKpiCards />

      {/* 4. FULL-WIDTH DIRECTORY TABLE CARD */}
      <div className="events-card">
        <div className="events-card__header">
          <div>
            <h2 className="events-card__title">Scheduled events & activities</h2>
            <p className="events-card__subtitle">
              Browse school events, dates, organizers, and publication status
            </p>
          </div>
          <button
            type="button"
            className="edusync-btn edusync-btn--secondary"
            style={{ fontSize: 13, padding: '6px 14px' }}
            onClick={() => showToast('info', 'Events schedule exported to CSV')}
          >
            📥 Export Schedule
          </button>
        </div>

        {/* Filters Bar */}
        <div className="events-filter-bar">
          <input
            type="text"
            className="events-filter-input"
            placeholder="Search events by title, organizer, or keyword..."
            value={eventFilters.searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <select
            className="events-filter-select"
            value={eventFilters.category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All categories">All categories</option>
            <option value="Academic">Academic</option>
            <option value="Meeting">Meeting</option>
            <option value="Sports">Sports</option>
            <option value="Cultural">Cultural</option>
            <option value="School event">School event</option>
            <option value="Holiday">Holiday</option>
          </select>

          <select
            className="events-filter-select"
            value={eventFilters.status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="All statuses">All statuses</option>
            <option value="Published">Published</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Draft">Draft</option>
            <option value="Completed">Completed</option>
          </select>

          <button
            type="button"
            className="edusync-btn edusync-btn--secondary"
            style={{ padding: '7px 12px', fontSize: 13 }}
            onClick={resetFilters}
          >
            Reset
          </button>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table className="events-table">
            <thead>
              <tr>
                <th>EVENT</th>
                <th>DATE & TIME</th>
                <th>CATEGORY</th>
                <th>AUDIENCE / ORGANIZER</th>
                <th>LOCATION</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {paginatedEvents.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '36px', color: '#667085' }}>
                    No events match your current filter criteria.
                  </td>
                </tr>
              ) : (
                paginatedEvents.map((evt: SchoolEvent) => (
                  <tr key={evt.id}>
                    <td>
                      <div style={{ fontWeight: 600, color: '#14213D' }}>{evt.title}</div>
                      <div style={{ fontSize: 11, color: '#667085' }}>{evt.id}</div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, color: '#14213D' }}>{evt.date}</div>
                      <div style={{ fontSize: 11, color: '#667085' }}>{evt.timeRange}</div>
                    </td>
                    <td>
                      <span
                        style={{
                          fontSize: 12,
                          padding: '3px 8px',
                          background: '#F2F4F7',
                          borderRadius: 4,
                          color: '#344054',
                          fontWeight: 500,
                        }}
                      >
                        {evt.category}
                      </span>
                    </td>
                    <td>
                      <div style={{ color: '#14213D', fontSize: 13 }}>{evt.audience}</div>
                      <div style={{ fontSize: 11, color: '#667085' }}>Org: {evt.organizer}</div>
                    </td>
                    <td style={{ color: '#475467', whiteSpace: 'nowrap' }}>
                      {evt.location}
                    </td>
                    <td>{getStatusBadge(evt.status)}</td>
                    <td>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button
                          type="button"
                          className="edusync-btn edusync-btn--secondary"
                          style={{ padding: '4px 10px', fontSize: 12 }}
                          onClick={() => selectEvent(evt)}
                        >
                          Calendar
                        </button>
                        <button
                          type="button"
                          className="edusync-btn edusync-btn--secondary"
                          style={{ padding: '4px 8px', fontSize: 12 }}
                          onClick={() => showToast('info', `Notification preview generated for ${evt.title}`)}
                        >
                          Notice
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer with pagination */}
        <div
          style={{
            padding: '14px 24px',
            borderTop: '1px solid #E4E7EC',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 13,
            color: '#667085',
          }}
        >
          <span>
            Showing {(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, events.length)} of {events.length} events
          </span>

          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <button
              type="button"
              className="edusync-btn edusync-btn--secondary"
              style={{ padding: '4px 10px', fontSize: 12 }}
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              Previous
            </button>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#14213D', margin: '0 4px' }}>
              Page {currentPage} of {totalPages}
            </span>
            <button
              type="button"
              className="edusync-btn edusync-btn--secondary"
              style={{ padding: '4px 10px', fontSize: 12 }}
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
