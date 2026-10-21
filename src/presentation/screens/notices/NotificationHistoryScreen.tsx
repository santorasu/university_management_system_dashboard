import React from 'react';
import { useNoticesFlow } from '../../../application/state/notices-flow.context';
import { NoticesNavTabs } from './components/NoticesNavTabs';
import { NoticesKpiCards } from './components/NoticesKpiCards';

interface NotificationHistoryScreenProps {
  onNavigateToDashboard: () => void;
}

export const NotificationHistoryScreen: React.FC<NotificationHistoryScreenProps> = ({
  onNavigateToDashboard,
}) => {
  const {
    kpis,
    notifications,
    notificationSummary,
    notificationFilters,
    setNotificationSearchQuery,
    setNotificationChannel,
    setNotificationReadStatus,
    setNotificationAudience,
    resetNotificationFilters,
    openExportModal,
    goToOverview,
  } = useNoticesFlow();

  const getDeliveryBadgeClass = (delivery: string) => {
    switch (delivery.toLowerCase()) {
      case 'delivered':
        return 'notices-status-pill notices-status-pill--published';
      case 'failed':
        return 'notices-status-pill notices-status-pill--expired';
      default:
        return 'notices-status-pill notices-status-pill--draft';
    }
  };

  const getReadStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'read':
        return 'notices-status-pill notices-status-pill--published';
      case 'unread':
        return 'notices-status-pill notices-status-pill--draft';
      default:
        return 'notices-status-pill';
    }
  };

  return (
    <div className="notices-container">
      {/* 1. HERO / HEADER & BREADCRUMBS */}
      <div className="notices-hero">
        <div className="notices-hero__left">
          <nav className="notices-hero__crumbs" aria-label="Breadcrumb">
            <button
              type="button"
              className="notices-hero__crumb--link"
              onClick={onNavigateToDashboard}
            >
              Dashboard
            </button>
            <span className="notices-hero__crumb-sep">/</span>
            <button
              type="button"
              className="notices-hero__crumb--link"
              onClick={goToOverview}
            >
              Notices & Messages
            </button>
            <span className="notices-hero__crumb-sep">/</span>
            <span className="notices-hero__crumb--current">Notification History</span>
          </nav>

          <div className="notices-hero__title-row">
            <button
              type="button"
              className="edusync-btn-back-circle"
              onClick={goToOverview}
              title="Return to Notices Overview"
              aria-label="Back to Notices"
            >
              ←
            </button>
            <div>
              <h1 className="notices-hero__title">Notification History</h1>
              <p className="notices-hero__subtitle">
                Track delivery, read status, and recent notification activity
              </p>
            </div>
          </div>
        </div>

        <div className="notices-hero__actions">
          <button
            type="button"
            className="edusync-btn edusync-btn--secondary"
            onClick={goToOverview}
          >
            ← Notices
          </button>
          <button
            type="button"
            className="edusync-btn edusync-btn--primary"
            onClick={openExportModal}
          >
            Export history
          </button>
        </div>
      </div>

      {/* 2. SUB-NAVIGATION TABS (DIRECTLY UNDER HERO) */}
      <NoticesNavTabs />

      {/* 3. 4 KPI STAT METRIC CARDS (DIRECTLY UNDER TABS) */}
      <NoticesKpiCards stats={kpis} />

      {/* 4. MAIN NOTIFICATION HISTORY GRID: TABLE + DELIVERY SUMMARY */}
      <div className="notif-history-grid">
        {/* LEFT COLUMN: TABLE */}
        <div className="notices-card">
          <div className="notices-card__header">
            <div>
              <h2 className="notices-card__title">Notification history</h2>
              <p className="notices-card__subtitle">
                Track notices, recipients, delivery, and read/unread state
              </p>
            </div>
            <button
              type="button"
              className="edusync-btn edusync-btn--secondary"
              style={{ fontSize: 13, padding: '6px 14px' }}
              onClick={openExportModal}
            >
              📥 Export CSV
            </button>
          </div>

          {/* Filter Bar */}
          <div className="notices-filter-bar">
            <input
              type="text"
              className="notices-filter-input"
              placeholder="Search by notice, recipient, or keyword..."
              value={notificationFilters.searchQuery}
              onChange={(e) => setNotificationSearchQuery(e.target.value)}
              style={{ minWidth: 220 }}
            />

            <select
              className="notices-filter-select"
              value={notificationFilters.channel}
              onChange={(e) => setNotificationChannel(e.target.value)}
            >
              <option value="All channels">All channels</option>
              <option value="In-app + Email">In-app + Email</option>
              <option value="In-app">In-app</option>
              <option value="SMS">SMS</option>
            </select>

            <select
              className="notices-filter-select"
              value={notificationFilters.readStatus}
              onChange={(e) => setNotificationReadStatus(e.target.value)}
            >
              <option value="All statuses">All read statuses</option>
              <option value="Read">Read</option>
              <option value="Unread">Unread</option>
            </select>

            <select
              className="notices-filter-select"
              value={notificationFilters.audience}
              onChange={(e) => setNotificationAudience(e.target.value)}
            >
              <option value="All roles">All audiences</option>
              <option value="Teachers">Teachers</option>
              <option value="Students">Students</option>
              <option value="Parents">Parents</option>
            </select>

            <button
              type="button"
              className="edusync-btn edusync-btn--secondary"
              style={{ padding: '7px 12px', fontSize: 13 }}
              onClick={resetNotificationFilters}
            >
              Reset
            </button>
          </div>

          {/* Table */}
          <div style={{ overflowX: 'auto' }}>
            <table className="notices-table">
              <thead>
                <tr>
                  <th>DATE</th>
                  <th>NOTIFICATION</th>
                  <th>RECIPIENT</th>
                  <th>CHANNEL</th>
                  <th>DELIVERY</th>
                  <th>READ STATUS</th>
                </tr>
              </thead>
              <tbody>
                {notifications.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', padding: '36px', color: '#667085' }}>
                      No notifications match your current filters.
                    </td>
                  </tr>
                ) : (
                  notifications.map((record) => (
                    <tr key={record.id}>
                      <td style={{ whiteSpace: 'nowrap', color: '#667085', fontSize: 13 }}>
                        {record.date}
                      </td>
                      <td style={{ fontWeight: 600, color: '#14213D' }}>
                        {record.title}
                      </td>
                      <td style={{ color: '#475467' }}>
                        {record.recipient}
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
                          {record.channel}
                        </span>
                      </td>
                      <td>
                        <span className={getDeliveryBadgeClass(record.deliveryStatus)}>
                          {record.deliveryStatus}
                        </span>
                      </td>
                      <td>
                        <span className={getReadStatusBadgeClass(record.readStatus)}>
                          {record.readStatus}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT COLUMN: DELIVERY SUMMARY */}
        <div className="notices-side-col">
          <div className="notices-card">
            <div className="notices-card__header">
              <div>
                <h2 className="notices-card__title">Delivery summary</h2>
                <p className="notices-card__subtitle">Recent notification outcomes</p>
              </div>
            </div>

            <div style={{ padding: '20px 24px' }}>
              <div className="notif-progress-group">
                {/* Delivered */}
                <div className="notif-progress-item">
                  <div className="notif-progress-item__header">
                    <span>Delivered</span>
                    <span style={{ fontWeight: 700, color: '#148557' }}>
                      {notificationSummary ? `${notificationSummary.deliveredPct}%` : '98.4%'}
                    </span>
                  </div>
                  <div className="notif-progress-bar-bg">
                    <div
                      className="notif-progress-bar-fill notif-progress-bar-fill--green"
                      style={{
                        width: `${notificationSummary ? notificationSummary.deliveredPct : 98.4}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Read */}
                <div className="notif-progress-item">
                  <div className="notif-progress-item__header">
                    <span>Read</span>
                    <span style={{ fontWeight: 700, color: '#3659D9' }}>
                      {notificationSummary ? `${notificationSummary.readPct}%` : '76.2%'}
                    </span>
                  </div>
                  <div className="notif-progress-bar-bg">
                    <div
                      className="notif-progress-bar-fill notif-progress-bar-fill--blue"
                      style={{
                        width: `${notificationSummary ? notificationSummary.readPct : 76.2}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Unread */}
                <div className="notif-progress-item">
                  <div className="notif-progress-item__header">
                    <span>Unread</span>
                    <span style={{ fontWeight: 700, color: '#A66308' }}>
                      {notificationSummary ? `${notificationSummary.unreadPct}%` : '23.8%'}
                    </span>
                  </div>
                  <div className="notif-progress-bar-bg">
                    <div
                      className="notif-progress-bar-fill notif-progress-bar-fill--amber"
                      style={{
                        width: `${notificationSummary ? notificationSummary.unreadPct : 23.8}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Failed */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 14px',
                    borderRadius: 8,
                    background: '#FEF3F2',
                    border: '1px solid #FECDCA',
                    marginTop: 6,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ color: '#BF2E33', fontSize: 16 }}>⚠️</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#BF2E33' }}>
                      Delivery failures
                    </span>
                  </div>
                  <span style={{ fontSize: 15, fontWeight: 700, color: '#BF2E33' }}>
                    {notificationSummary ? notificationSummary.failedCount : 12}
                  </span>
                </div>
              </div>

              {/* Summary Guidance Box */}
              <div
                style={{
                  marginTop: 20,
                  padding: 14,
                  borderRadius: 8,
                  background: '#F8FAFC',
                  border: '1px solid #E4E7EC',
                  fontSize: 12,
                  color: '#667085',
                  lineHeight: 1.45,
                }}
              >
                Failed deliveries automatically trigger SMS fallback if enabled in school notification policies.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
