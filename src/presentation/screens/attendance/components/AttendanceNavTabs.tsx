import React from 'react';
import { useAttendanceFlow } from '../../../../application/state/attendance-flow.context';

export const AttendanceNavTabs: React.FC = () => {
  const {
    subScreen,
    goToOverview,
    goToDailyRecords,
    goToCalendarHistory,
    goToNotificationsStates,
  } = useAttendanceFlow();

  return (
    <nav className="attendance-nav-tabs" aria-label="Attendance navigation tabs">
      <button
        type="button"
        className={`attendance-nav-tab ${subScreen === 'ATTENDANCE_OVERVIEW' ? 'attendance-nav-tab--active' : ''}`}
        onClick={goToOverview}
      >
        Overview
      </button>

      <button
        type="button"
        className={`attendance-nav-tab ${subScreen === 'DAILY_RECORDS' ? 'attendance-nav-tab--active' : ''}`}
        onClick={() => goToDailyRecords()}
      >
        Daily Records
      </button>

      <button
        type="button"
        className={`attendance-nav-tab ${subScreen === 'CALENDAR_HISTORY' ? 'attendance-nav-tab--active' : ''}`}
        onClick={goToCalendarHistory}
      >
        Calendar & History
      </button>

      <button
        type="button"
        className={`attendance-nav-tab ${subScreen === 'NOTIFICATIONS_STATES' ? 'attendance-nav-tab--active' : ''}`}
        onClick={goToNotificationsStates}
      >
        Notifications & States
      </button>
    </nav>
  );
};
