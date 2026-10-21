import React from 'react';
import { TeacherFlowProvider, useTeacherFlow } from '../../../application/state/teacher-flow.context';
import { ConsolidatedOverviewScreen } from './ConsolidatedOverviewScreen';
import { TeacherDirectoryScreen } from './TeacherDirectoryScreen';
import { AddEditTeacherScreen } from './AddEditTeacherScreen';
import { TeacherProfileScreen } from './TeacherProfileScreen';
import { TeacherFeedbackScreen } from './TeacherFeedbackScreen';
import './Teachers.css';

interface TeachersCoordinatorProps {
  onNavigateToDashboard: () => void;
}

const TeachersCoordinator: React.FC<TeachersCoordinatorProps> = ({ onNavigateToDashboard }) => {
  const { subScreen, notification, clearNotification } = useTeacherFlow();

  return (
    <div className="edusync-teachers-flow-container">
      {notification && (
        <div
          className={`edusync-alert edusync-alert--${notification.type} edusync-teachers-notification`}
        >
          <span>{notification.message}</span>
          <button
            type="button"
            className="edusync-notification-close"
            onClick={clearNotification}
          >
            ×
          </button>
        </div>
      )}

      {subScreen === 'TEACHERS_CONSOLIDATED' && (
        <ConsolidatedOverviewScreen onNavigateToDashboard={onNavigateToDashboard} />
      )}
      {subScreen === 'TEACHERS_DIRECTORY' && (
        <TeacherDirectoryScreen onNavigateToDashboard={onNavigateToDashboard} />
      )}
      {subScreen === 'TEACHERS_ADD_EDIT' && (
        <AddEditTeacherScreen onNavigateToDashboard={onNavigateToDashboard} />
      )}
      {subScreen === 'TEACHERS_PROFILE' && (
        <TeacherProfileScreen onNavigateToDashboard={onNavigateToDashboard} />
      )}
      {subScreen === 'TEACHERS_FEEDBACK' && (
        <TeacherFeedbackScreen onNavigateToDashboard={onNavigateToDashboard} />
      )}
    </div>
  );
};

export const TeachersScreen: React.FC<TeachersCoordinatorProps> = (props) => {
  return (
    <TeacherFlowProvider>
      <TeachersCoordinator {...props} />
    </TeacherFlowProvider>
  );
};
