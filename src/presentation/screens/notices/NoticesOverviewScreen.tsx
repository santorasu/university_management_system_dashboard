import React from 'react';
import { useNoticesFlow } from '../../../application/state/notices-flow.context';
import { NoticesNavTabs } from './components/NoticesNavTabs';
import { NoticesKpiCards } from './components/NoticesKpiCards';
import type { Notice } from '../../../core/entities/notice.types';

interface NoticesOverviewScreenProps {
  onNavigateToDashboard: () => void;
}

export const NoticesOverviewScreen: React.FC<NoticesOverviewScreenProps> = ({
  onNavigateToDashboard,
}) => {
  const {
    notices,
    kpis,
    noticeFilters,
    setNoticeSearchQuery,
    setNoticeStatus,
    setNoticeAudience,
    goToCreateNotice,
    goToEditNotice,
    goToMessagesInbox,
    goToNotificationHistory,
    openPreviewModal,
    openComposeModal,
  } = useNoticesFlow();

  const handleOpenNotice = (notice: Notice) => {
    openPreviewModal(notice);
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
            <span style={{ fontWeight: 500 }}>Notices & Messages</span>
            <span className="notices-hero__crumb-sep">/</span>
            <span className="notices-hero__crumb--current">Overview</span>
          </nav>

          <div className="notices-hero__title-row">
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
              <h1 className="notices-hero__title">Notices & Announcements</h1>
              <p className="notices-hero__subtitle">
                Create targeted announcements and manage publication across your school community
              </p>
            </div>
          </div>
        </div>

        <div className="notices-hero__actions">
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
            onClick={goToCreateNotice}
          >
            + Create notice
          </button>
        </div>
      </div>

      {/* 2. SUB-NAVIGATION TABS (DIRECTLY UNDER HERO) */}
      <NoticesNavTabs />

      {/* 3. 4 KPI STAT METRIC CARDS (DIRECTLY UNDER TABS) */}
      <NoticesKpiCards stats={kpis} />

      {/* 4. MAIN SPLIT: 65% RECENT NOTICES TABLE + 35% QUICK ACTIONS & GUIDANCE */}
      <div className="notices-overview-grid">
        {/* LEFT COLUMN: RECENT NOTICES */}
        <div className="notices-card">
          <div className="notices-card__header">
            <div>
              <h2 className="notices-card__title">Recent notices</h2>
              <p className="notices-card__subtitle">
                Manage drafts, published announcements, and scheduled notices
              </p>
            </div>
          </div>

          {/* Filter Toolbar */}
          <div className="notices-filter-bar">
            <div className="notices-search-input-wrap">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                type="text"
                className="notices-search-input"
                placeholder="Title or keyword…"
                value={noticeFilters.searchQuery}
                onChange={(e) => setNoticeSearchQuery(e.target.value)}
              />
            </div>

            <select
              className="notices-select-filter"
              value={noticeFilters.status}
              onChange={(e) => setNoticeStatus(e.target.value)}
              aria-label="Filter notices by status"
            >
              <option value="All statuses">All statuses</option>
              <option value="Published">Published</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Draft">Draft</option>
            </select>

            <select
              className="notices-select-filter"
              value={noticeFilters.audience}
              onChange={(e) => setNoticeAudience(e.target.value)}
              aria-label="Filter notices by audience"
            >
              <option value="All audiences">All audiences</option>
              <option value="Teachers">Teachers</option>
              <option value="Students">Students</option>
              <option value="Parents">Parents</option>
            </select>
          </div>

          {/* Notices Table */}
          <div className="notices-table-wrap">
            <table className="notices-table">
              <thead>
                <tr>
                  <th style={{ width: '38%' }}>Notice</th>
                  <th style={{ width: '22%' }}>Audience</th>
                  <th style={{ width: '18%' }}>Publish Date</th>
                  <th style={{ width: '12%' }}>Status</th>
                  <th style={{ width: '10%', textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {notices.map((notice) => (
                  <tr key={notice.id}>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <span
                          style={{ fontWeight: 600, color: 'var(--edusync-text-navy, #14213D)', cursor: 'pointer' }}
                          onClick={() => handleOpenNotice(notice)}
                        >
                          {notice.title}
                        </span>
                        <span style={{ fontSize: 12, color: 'var(--edusync-text-muted, #98A2B3)' }}>
                          {notice.category} · by {notice.author}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span style={{ fontSize: 13, color: 'var(--edusync-text-secondary, #667085)' }}>
                        {notice.audience}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontSize: 13, color: 'var(--edusync-text-secondary, #667085)' }}>
                        {notice.publishDate}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`notices-pill ${
                          notice.status === 'Published'
                            ? 'notices-pill--published'
                            : notice.status === 'Scheduled'
                            ? 'notices-pill--scheduled'
                            : 'notices-pill--draft'
                        }`}
                      >
                        {notice.status}
                      </span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <div style={{ display: 'inline-flex', gap: 6 }}>
                        <button
                          type="button"
                          className="edusync-btn edusync-btn--secondary"
                          style={{ padding: '4px 8px', fontSize: 12 }}
                          onClick={() => handleOpenNotice(notice)}
                        >
                          View
                        </button>
                        <button
                          type="button"
                          className="edusync-btn edusync-btn--secondary"
                          style={{ padding: '4px 8px', fontSize: 12 }}
                          onClick={() => goToEditNotice(notice)}
                        >
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT COLUMN: QUICK ACTIONS & AUDIENCE TARGETING */}
        <div className="notices-side-col">
          {/* Quick Actions Card */}
          <div className="notices-card">
            <div className="notices-card__header" style={{ marginBottom: 12 }}>
              <div>
                <h3 className="notices-card__title">Quick actions</h3>
                <p className="notices-card__subtitle">Common communication tasks</p>
              </div>
            </div>

            <div className="notices-quick-actions-list">
              <div
                className="notices-quick-action-item"
                onClick={goToCreateNotice}
                role="button"
                tabIndex={0}
              >
                <div className="notices-quick-action-item__title">
                  <span>Create announcement</span>
                  <span style={{ color: '#3659D9' }}>→</span>
                </div>
                <p className="notices-quick-action-item__desc">
                  Write a new notice for a targeted audience
                </p>
              </div>

              <div
                className="notices-quick-action-item"
                onClick={() => setNoticeStatus('Draft')}
                role="button"
                tabIndex={0}
              >
                <div className="notices-quick-action-item__title">
                  <span>Review drafts</span>
                  <span style={{ color: '#3659D9' }}>→</span>
                </div>
                <p className="notices-quick-action-item__desc">
                  Continue editing saved announcements
                </p>
              </div>

              <div
                className="notices-quick-action-item"
                onClick={goToCreateNotice}
                role="button"
                tabIndex={0}
              >
                <div className="notices-quick-action-item__title">
                  <span>Schedule publication</span>
                  <span style={{ color: '#3659D9' }}>→</span>
                </div>
                <p className="notices-quick-action-item__desc">
                  Plan notices for a future date
                </p>
              </div>
            </div>
          </div>

          {/* Audience Targeting Card */}
          <div className="notices-card">
            <div className="notices-card__header" style={{ marginBottom: 12 }}>
              <div>
                <h3 className="notices-card__title">Audience targeting</h3>
                <p className="notices-card__subtitle">Send the right update to the right group</p>
              </div>
            </div>

            <div className="notices-audience-list">
              <div className="notices-audience-item">
                <span className="notices-audience-item__role">Teachers</span>
                <span className="notices-audience-item__targeting">Role-based</span>
              </div>
              <div className="notices-audience-item">
                <span className="notices-audience-item__role">Students</span>
                <span className="notices-audience-item__targeting">Class and section</span>
              </div>
              <div className="notices-audience-item">
                <span className="notices-audience-item__role">Parents</span>
                <span className="notices-audience-item__targeting">Class, section, or all parents</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. BOTTOM 4-COLUMN LATERAL QUICK ACTION CARDS */}
      <div className="notices-bottom-grid">
        <div
          className="notices-bottom-card"
          onClick={openComposeModal}
          role="button"
          tabIndex={0}
        >
          <div className="notices-bottom-card__title">
            <span>Compose Message</span>
            <span style={{ color: '#3659D9' }}>↗</span>
          </div>
          <p className="notices-bottom-card__desc">
            Directly message parents, teachers, or specific student classes.
          </p>
        </div>

        <div
          className="notices-bottom-card"
          onClick={goToMessagesInbox}
          role="button"
          tabIndex={0}
        >
          <div className="notices-bottom-card__title">
            <span>Messages Inbox</span>
            <span style={{ color: '#3659D9' }}>↗</span>
          </div>
          <p className="notices-bottom-card__desc">
            Check incoming queries from parents and student inquiries.
          </p>
        </div>

        <div
          className="notices-bottom-card"
          onClick={goToNotificationHistory}
          role="button"
          tabIndex={0}
        >
          <div className="notices-bottom-card__title">
            <span>Notification History</span>
            <span style={{ color: '#3659D9' }}>↗</span>
          </div>
          <p className="notices-bottom-card__desc">
            Track delivery rates, channel receipts, and read timestamps.
          </p>
        </div>

        <div
          className="notices-bottom-card"
          onClick={goToCreateNotice}
          role="button"
          tabIndex={0}
        >
          <div className="notices-bottom-card__title">
            <span>Create Notice</span>
            <span style={{ color: '#3659D9' }}>↗</span>
          </div>
          <p className="notices-bottom-card__desc">
            Compose and schedule high-priority announcements school-wide.
          </p>
        </div>
      </div>
    </div>
  );
};
