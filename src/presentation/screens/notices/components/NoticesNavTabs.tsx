import React from 'react';
import { useNoticesFlow } from '../../../../application/state/notices-flow.context';
import type { NoticesSubScreen } from '../../../../core/entities/notice.types';

export const NoticesNavTabs: React.FC = () => {
  const { subScreen, goToOverview, goToCreateNotice, goToMessagesInbox, goToNotificationHistory } =
    useNoticesFlow();

  const tabs: { id: NoticesSubScreen; label: string; onClick: () => void }[] = [
    { id: 'NOTICES_OVERVIEW', label: 'Notices & Announcements', onClick: goToOverview },
    { id: 'NOTICES_CREATE_EDIT', label: 'Create / Edit Notice', onClick: goToCreateNotice },
    { id: 'MESSAGES_INBOX', label: 'Messages & Conversations', onClick: goToMessagesInbox },
    { id: 'NOTIFICATIONS_HISTORY', label: 'Notification History', onClick: goToNotificationHistory },
  ];

  return (
    <nav className="notices-nav-tabs" aria-label="Notices and communication navigation tabs">
      {tabs.map((tab) => {
        const isActive = subScreen === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            className={`notices-nav-tab ${isActive ? 'notices-nav-tab--active' : ''}`}
            onClick={tab.onClick}
          >
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
};
