import React from 'react';
import {
  TimetableFlowProvider,
  useTimetableFlow,
} from '../../../application/state/timetable-flow.context';
import { TimetableWeeklyOverviewScreen } from './TimetableWeeklyOverviewScreen';
import { TimetableDailyViewScreen } from './TimetableDailyViewScreen';
import { TimetableClassTeacherViewsScreen } from './TimetableClassTeacherViewsScreen';
import { TimetableScheduleBuilderScreen } from './TimetableScheduleBuilderScreen';
import { TimetableModals } from './TimetableModals';
import './Timetable.css';

interface TimetableScreenProps {
  onNavigateToDashboard: () => void;
}

const TimetableContent: React.FC<TimetableScreenProps> = ({
  onNavigateToDashboard,
}) => {
  const { subScreen, isLoading } = useTimetableFlow();

  if (isLoading) {
    return (
      <div style={{ padding: 40, textAlign: 'center', color: 'var(--edusync-text-secondary, #667085)' }}>
        Loading timetable schedules...
      </div>
    );
  }

  const renderCurrentScreen = () => {
    switch (subScreen) {
      case 'WEEKLY_OVERVIEW':
        return <TimetableWeeklyOverviewScreen onNavigateToDashboard={onNavigateToDashboard} />;
      case 'DAILY_VIEW':
        return <TimetableDailyViewScreen onNavigateToDashboard={onNavigateToDashboard} />;
      case 'CLASS_TEACHER_VIEWS':
        return <TimetableClassTeacherViewsScreen onNavigateToDashboard={onNavigateToDashboard} />;
      case 'SCHEDULE_BUILDER':
        return <TimetableScheduleBuilderScreen onNavigateToDashboard={onNavigateToDashboard} />;
      default:
        return <TimetableWeeklyOverviewScreen onNavigateToDashboard={onNavigateToDashboard} />;
    }
  };

  return (
    <>
      {renderCurrentScreen()}
      <TimetableModals />
    </>
  );
};

export const TimetableScreen: React.FC<TimetableScreenProps> = (props) => {
  return (
    <TimetableFlowProvider>
      <TimetableContent {...props} />
    </TimetableFlowProvider>
  );
};
