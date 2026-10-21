import React from 'react';
import {
  AttendanceFlowProvider,
  useAttendanceFlow,
} from '../../../application/state/attendance-flow.context';
import { AttendanceOverviewScreen } from './AttendanceOverviewScreen';
import { DailyRecordsScreen } from './DailyRecordsScreen';
import { MonthlyCalendarHistoryScreen } from './MonthlyCalendarHistoryScreen';
import { AbsenceNotificationsStatesScreen } from './AbsenceNotificationsStatesScreen';
import { AttendanceModals } from './AttendanceModals';
import './Attendance.css';

interface AttendanceScreenProps {
  onNavigateToDashboard: () => void;
}

const AttendanceContent: React.FC<AttendanceScreenProps> = ({
  onNavigateToDashboard,
}) => {
  const { subScreen, isLoading } = useAttendanceFlow();

  if (isLoading) {
    return (
      <div style={{ padding: 40, textAlign: 'center', color: 'var(--edusync-text-secondary, #667085)' }}>
        Loading attendance records...
      </div>
    );
  }

  const renderCurrentScreen = () => {
    switch (subScreen) {
      case 'ATTENDANCE_OVERVIEW':
        return <AttendanceOverviewScreen onNavigateToDashboard={onNavigateToDashboard} />;
      case 'DAILY_RECORDS':
        return <DailyRecordsScreen onNavigateToDashboard={onNavigateToDashboard} />;
      case 'CALENDAR_HISTORY':
        return <MonthlyCalendarHistoryScreen onNavigateToDashboard={onNavigateToDashboard} />;
      case 'NOTIFICATIONS_STATES':
        return <AbsenceNotificationsStatesScreen onNavigateToDashboard={onNavigateToDashboard} />;
      default:
        return <AttendanceOverviewScreen onNavigateToDashboard={onNavigateToDashboard} />;
    }
  };

  return (
    <>
      {renderCurrentScreen()}
      <AttendanceModals />
    </>
  );
};

export const AttendanceScreen: React.FC<AttendanceScreenProps> = (props) => {
  return (
    <AttendanceFlowProvider>
      <AttendanceContent {...props} />
    </AttendanceFlowProvider>
  );
};
