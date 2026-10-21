import React from 'react';
import {
  EventsFlowProvider,
  useEventsFlow,
} from '../../../application/state/events-flow.context';
import { EventsCalendarScreen } from './EventsCalendarScreen';
import { EventsDirectoryScreen } from './EventsDirectoryScreen';
import { EventSavedModal } from './components/EventSavedModal';
import './Events.css';

interface EventsRootProps {
  onNavigateToDashboard: () => void;
}

const EventsFlowCoordinator: React.FC<EventsRootProps> = ({ onNavigateToDashboard }) => {
  const { subScreen, toast, clearToast } = useEventsFlow();

  const renderActiveScreen = () => {
    switch (subScreen) {
      case 'EVENTS_DIRECTORY':
        return <EventsDirectoryScreen onNavigateToDashboard={onNavigateToDashboard} />;
      case 'EVENTS_CALENDAR':
      default:
        return <EventsCalendarScreen onNavigateToDashboard={onNavigateToDashboard} />;
    }
  };

  return (
    <>
      {/* Toast Alert Banner */}
      {toast && (
        <div
          style={{
            position: 'fixed',
            top: 24,
            right: 24,
            zIndex: 9999,
            backgroundColor:
              toast.type === 'success' ? '#148557' : toast.type === 'error' ? '#BF2E33' : '#3659D9',
            color: '#ffffff',
            padding: '12px 20px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          <span>{toast.type === 'success' ? '✓' : toast.type === 'error' ? '⚠️' : 'ℹ️'}</span>
          <span>{toast.message}</span>
          <button
            type="button"
            onClick={clearToast}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#ffffff',
              fontSize: '16px',
              cursor: 'pointer',
              marginLeft: '8px',
              padding: 0,
            }}
          >
            ×
          </button>
        </div>
      )}

      {/* Screen View */}
      {renderActiveScreen()}

      {/* Event Saved Modal */}
      <EventSavedModal />
    </>
  );
};

export const EventsScreen: React.FC<EventsRootProps> = (props) => {
  return (
    <EventsFlowProvider>
      <EventsFlowCoordinator {...props} />
    </EventsFlowProvider>
  );
};

export default EventsScreen;
