import React from 'react';
import { useTimetableFlow } from '../../../../application/state/timetable-flow.context';

export const TimetableNavTabs: React.FC = () => {
  const {
    subScreen,
    goToWeeklyOverview,
    goToDailyView,
    goToClassTeacherViews,
    goToScheduleBuilder,
  } = useTimetableFlow();

  return (
    <nav className="timetable-nav-tabs" aria-label="Timetable navigation tabs">
      <button
        type="button"
        className={`timetable-nav-tab ${subScreen === 'WEEKLY_OVERVIEW' ? 'timetable-nav-tab--active' : ''}`}
        onClick={goToWeeklyOverview}
      >
        Weekly Overview
      </button>

      <button
        type="button"
        className={`timetable-nav-tab ${subScreen === 'DAILY_VIEW' ? 'timetable-nav-tab--active' : ''}`}
        onClick={goToDailyView}
      >
        Daily View
      </button>

      <button
        type="button"
        className={`timetable-nav-tab ${subScreen === 'CLASS_TEACHER_VIEWS' ? 'timetable-nav-tab--active' : ''}`}
        onClick={goToClassTeacherViews}
      >
        Class & Teacher Views
      </button>

      <button
        type="button"
        className={`timetable-nav-tab ${subScreen === 'SCHEDULE_BUILDER' ? 'timetable-nav-tab--active' : ''}`}
        onClick={goToScheduleBuilder}
      >
        Schedule Builder & Slots
      </button>
    </nav>
  );
};
