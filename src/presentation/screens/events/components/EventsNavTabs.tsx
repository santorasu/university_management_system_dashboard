import React from 'react';
import { useEventsFlow } from '../../../../application/state/events-flow.context';
import type { EventsSubScreen } from '../../../../core/entities/event.types';

interface TabItem {
  id: EventsSubScreen;
  label: string;
}

const TABS: TabItem[] = [
  { id: 'EVENTS_CALENDAR', label: 'Calendar & Event Editor' },
  { id: 'EVENTS_DIRECTORY', label: 'Events Directory & Schedule' },
];

export const EventsNavTabs: React.FC = () => {
  const { subScreen, goToCalendar, goToDirectory } = useEventsFlow();

  const handleTabClick = (id: EventsSubScreen) => {
    if (id === 'EVENTS_CALENDAR') {
      goToCalendar();
    } else {
      goToDirectory();
    }
  };

  return (
    <nav className="events-nav-tabs" aria-label="School Events Navigation">
      {TABS.map((tab) => {
        const isActive = subScreen === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            className={`events-nav-tab ${isActive ? 'events-nav-tab--active' : ''}`}
            onClick={() => handleTabClick(tab.id)}
            aria-current={isActive ? 'page' : undefined}
          >
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
};
