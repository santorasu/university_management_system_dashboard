import React from 'react';
import type { NoticeKpiStats } from '../../../../core/entities/notice.types';

interface NoticesKpiCardsProps {
  stats: NoticeKpiStats | null;
}

export const NoticesKpiCards: React.FC<NoticesKpiCardsProps> = ({ stats }) => {
  const data = stats || {
    publishedNotices: 24,
    publishedNoticesSubtext: '↑ 4 this term',
    drafts: 6,
    draftsSubtext: 'Needs review',
    scheduled: 3,
    scheduledSubtext: 'Upcoming',
    unreadMessages: 18,
    unreadMessagesSubtext: 'Across inboxes',
  };

  return (
    <div className="notices-kpis-grid">
      {/* 1. Published notices (Blue) */}
      <div className="notices-kpi-card notices-kpi-card--blue">
        <span className="notices-kpi-card__label">Published notices</span>
        <span className="notices-kpi-card__value">{data.publishedNotices}</span>
        <span className="notices-kpi-card__subtext notices-kpi-card__subtext--blue">
          {data.publishedNoticesSubtext}
        </span>
      </div>

      {/* 2. Drafts (Amber) */}
      <div className="notices-kpi-card notices-kpi-card--amber">
        <span className="notices-kpi-card__label">Drafts</span>
        <span className="notices-kpi-card__value">{data.drafts}</span>
        <span className="notices-kpi-card__subtext notices-kpi-card__subtext--amber">
          {data.draftsSubtext}
        </span>
      </div>

      {/* 3. Scheduled (Green) */}
      <div className="notices-kpi-card notices-kpi-card--green">
        <span className="notices-kpi-card__label">Scheduled</span>
        <span className="notices-kpi-card__value">{data.scheduled}</span>
        <span className="notices-kpi-card__subtext notices-kpi-card__subtext--green">
          {data.scheduledSubtext}
        </span>
      </div>

      {/* 4. Unread messages (Red/Purple) */}
      <div className="notices-kpi-card notices-kpi-card--red">
        <span className="notices-kpi-card__label">Unread messages</span>
        <span className="notices-kpi-card__value">{data.unreadMessages}</span>
        <span className="notices-kpi-card__subtext notices-kpi-card__subtext--red">
          {data.unreadMessagesSubtext}
        </span>
      </div>
    </div>
  );
};
