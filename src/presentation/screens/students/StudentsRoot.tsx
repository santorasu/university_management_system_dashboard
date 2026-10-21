import React from 'react';
import { StudentFlowProvider, useStudentFlow } from '../../../application/state/student-flow.context';
import { ConsolidatedOverviewScreen } from './ConsolidatedOverviewScreen';
import { StudentDirectoryScreen } from './StudentDirectoryScreen';
import { AddEditStudentScreen } from './AddEditStudentScreen';
import { StudentProfileScreen } from './StudentProfileScreen';
import './Students.css';

interface StudentsCoordinatorProps {
  onNavigateToDashboard: () => void;
}

const StudentsCoordinator: React.FC<StudentsCoordinatorProps> = ({ onNavigateToDashboard }) => {
  const { subScreen, notification, clearNotification } = useStudentFlow();

  return (
    <div className="edusync-students-flow-container">
      {notification && (
        <div
          className={`edusync-alert edusync-alert--${notification.type} edusync-students-notification`}
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

      {subScreen === 'STUDENTS_CONSOLIDATED' && (
        <ConsolidatedOverviewScreen onNavigateToDashboard={onNavigateToDashboard} />
      )}
      {subScreen === 'STUDENTS_DIRECTORY' && (
        <StudentDirectoryScreen onNavigateToDashboard={onNavigateToDashboard} />
      )}
      {subScreen === 'STUDENTS_ADD_EDIT' && (
        <AddEditStudentScreen onNavigateToDashboard={onNavigateToDashboard} />
      )}
      {subScreen === 'STUDENTS_PROFILE' && (
        <StudentProfileScreen onNavigateToDashboard={onNavigateToDashboard} />
      )}
    </div>
  );
};

export const StudentsScreen: React.FC<StudentsCoordinatorProps> = (props) => {
  return (
    <StudentFlowProvider>
      <StudentsCoordinator {...props} />
    </StudentFlowProvider>
  );
};
