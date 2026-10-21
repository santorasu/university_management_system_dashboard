import React, { useState } from 'react';
import { useAttendanceFlow } from '../../../application/state/attendance-flow.context';
import { AttendanceNavTabs } from './components/AttendanceNavTabs';

interface AbsenceNotificationsStatesScreenProps {
  onNavigateToDashboard: () => void;
}

export const AbsenceNotificationsStatesScreen: React.FC<AbsenceNotificationsStatesScreenProps> = ({
  onNavigateToDashboard,
}) => {
  const {
    notifications,
    goToOverview,
    retryNotificationItem,
    showToast,
  } = useAttendanceFlow();

  const [searchNotif, setSearchNotif] = useState('');
  const [typeFilter, setTypeFilter] = useState('All types');
  const [deliveryFilter, setDeliveryFilter] = useState('All statuses');
  const [dateRange, setDateRange] = useState('This month');

  const filteredNotifications = notifications.filter((n) => {
    const matchesSearch =
      n.studentName.toLowerCase().includes(searchNotif.toLowerCase()) ||
      n.guardianName.toLowerCase().includes(searchNotif.toLowerCase());
    const matchesDelivery =
      deliveryFilter === 'All statuses' || n.deliveryStatus === deliveryFilter;
    return matchesSearch && matchesDelivery;
  });

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
            <span style={{ color: 'var(--edusync-text-navy, #14213D)', fontWeight: 600 }}>Notifications & states</span>
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
              <h1 className="attendance-hero__title">Absence notifications & report states</h1>
              <p className="attendance-hero__subtitle">
                Review absence-related notification records and common attendance workflow states.
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
            onClick={() => showToast('success', 'Exporting notification records...')}
          >
            Export records
          </button>
        </div>
      </div>

      {/* 2. SUB-NAVIGATION TABS */}
      <AttendanceNavTabs />

      {/* 3. ABSENCE NOTIFICATION RECORDS TABLE */}
      <div className="attendance-card">
        <div className="attendance-card__header">
          <div>
            <h3 className="attendance-card__title">Absence notification records</h3>
            <p className="attendance-card__subtitle">
              Messages triggered by absence rules and manual review.
            </p>
          </div>
        </div>

        {/* FILTER BAR */}
        <div className="academic-filter-bar" style={{ marginBottom: 16 }}>
          <div className="academic-filter-bar__left">
            <div className="academic-search-input-wrap">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                type="text"
                className="academic-search-input"
                placeholder="Search student or guardian…"
                value={searchNotif}
                onChange={(e) => setSearchNotif(e.target.value)}
              />
            </div>

            <select
              className="academic-select-filter"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="All types">Notification type: All types</option>
              <option value="Consecutive">Consecutive absences</option>
              <option value="Unexcused">Unexcused absence</option>
              <option value="Monthly">Monthly threshold</option>
            </select>

            <select
              className="academic-select-filter"
              value={deliveryFilter}
              onChange={(e) => setDeliveryFilter(e.target.value)}
            >
              <option value="All statuses">Delivery status: All statuses</option>
              <option value="Delivered">Delivered</option>
              <option value="Failed">Failed</option>
              <option value="Queued">Queued</option>
            </select>

            <select
              className="academic-select-filter"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="This month">Date range: This month</option>
              <option value="Last month">Last month</option>
            </select>
          </div>

          <div className="academic-filter-bar__right">
            <button
              type="button"
              className="edusync-btn edusync-btn--secondary"
              onClick={() => showToast('success', 'Notification filters applied')}
            >
              Apply
            </button>
          </div>
        </div>

        {/* NOTIFICATIONS TABLE */}
        <div style={{ width: '100%', overflowX: 'auto' }}>
          <table className="academic-table">
            <thead>
              <tr>
                <th>Student / guardian</th>
                <th>Trigger</th>
                <th>Sent at</th>
                <th>Channel</th>
                <th>Delivery</th>
                <th style={{ textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredNotifications.map((notif) => (
                <tr key={notif.id}>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontWeight: 600 }}>{notif.studentName}</span>
                      <span style={{ fontSize: 12, color: 'var(--edusync-text-secondary, #667085)' }}>
                        {notif.guardianName}
                      </span>
                    </div>
                  </td>
                  <td>{notif.trigger}</td>
                  <td>{notif.sentAt}</td>
                  <td>
                    <span className="academic-pill" style={{ background: '#F2F4F7', color: '#344054' }}>
                      {notif.channel}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`academic-pill ${
                        notif.deliveryStatus === 'Delivered'
                          ? 'academic-pill--active'
                          : notif.deliveryStatus === 'Failed'
                          ? 'academic-pill--warning'
                          : 'academic-pill--draft'
                      }`}
                    >
                      {notif.deliveryStatus}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    {notif.deliveryStatus === 'Failed' ? (
                      <button
                        type="button"
                        className="edusync-btn edusync-btn--primary"
                        style={{ padding: '4px 10px', fontSize: 12 }}
                        onClick={() => retryNotificationItem(notif.id)}
                      >
                        Retry
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="edusync-btn edusync-btn--secondary"
                        style={{ padding: '4px 10px', fontSize: 12 }}
                        onClick={() => showToast('success', `Details for ${notif.studentName}`)}
                      >
                        View
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. 3-COLUMN SYSTEM STATES PREVIEW */}
      <div className="attendance-states-triad-grid">
        {/* State 1: Loading */}
        <div className="attendance-state-preview-card">
          <div className="attendance-spinner"></div>
          <h4 className="attendance-state-preview-card__title">Loading state</h4>
          <p className="attendance-state-preview-card__desc">Fetching attendance telemetry...</p>
        </div>

        {/* State 2: Empty */}
        <div className="attendance-state-preview-card">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#98A2B3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
          <h4 className="attendance-state-preview-card__title">Empty state</h4>
          <p className="attendance-state-preview-card__desc">No attendance records match these filters.</p>
          <button
            type="button"
            className="edusync-btn edusync-btn--secondary"
            style={{ padding: '4px 10px', fontSize: 12, marginTop: 4 }}
            onClick={() => showToast('success', 'Filters cleared')}
          >
            Clear filters
          </button>
        </div>

        {/* State 3: Error */}
        <div className="attendance-state-preview-card">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <h4 className="attendance-state-preview-card__title" style={{ color: '#DC2626' }}>Error state</h4>
          <p className="attendance-state-preview-card__desc">
            Attendance records could not be loaded. Check your connection and try again.
          </p>
          <button
            type="button"
            className="edusync-btn edusync-btn--secondary"
            style={{ padding: '4px 10px', fontSize: 12, marginTop: 4 }}
            onClick={() => showToast('success', 'Retrying connection...')}
          >
            Retry
          </button>
        </div>
      </div>

      {/* 5. VALIDATION & CONFIRMATION STATES */}
      <div className="attendance-card">
        <div className="attendance-card__header">
          <div>
            <h3 className="attendance-card__title">Validation & confirmation</h3>
            <p className="attendance-card__subtitle">Select a date, class, and section before saving.</p>
          </div>
        </div>

        <div className="attendance-confirm-banner">
          <div>
            <h4 className="attendance-confirm-banner__title">Submit attendance for Grade 8 · Section A?</h4>
            <p className="attendance-confirm-banner__sub">
              Unsaved changes will be committed to the official academic record.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button
              type="button"
              className="edusync-btn edusync-btn--secondary"
              onClick={() => showToast('success', 'Submission cancelled')}
            >
              Cancel
            </button>
            <button
              type="button"
              className="edusync-btn edusync-btn--primary"
              onClick={() => showToast('success', 'Attendance confirmed')}
            >
              Confirm
            </button>
          </div>
        </div>

        <p style={{ margin: '14px 0 0 0', fontSize: 12, color: 'var(--edusync-text-muted, #98A2B3)' }}>
          Exports are available for the filtered date range. Absence notifications retain delivery status and retry details.
        </p>
      </div>
    </div>
  );
};
