import React from 'react';
import {
  AssignmentFlowProvider,
  useAssignmentFlow,
} from '../../../application/state/assignment-flow.context';
import { AssignmentsOverviewScreen } from './AssignmentsOverviewScreen';
import { AssignmentListDetailsScreen } from './AssignmentListDetailsScreen';
import { AssignmentCreateEditScreen } from './AssignmentCreateEditScreen';
import { AssignmentSubmissionsMaterialsScreen } from './AssignmentSubmissionsMaterialsScreen';
import {
  AddMaterialModal,
  AssignmentToastNotice,
  ReviewSubmissionModal,
} from './AssignmentModals';
import './Assignments.css';

interface AssignmentsRootContentProps {
  onNavigateToDashboard: () => void;
}

const AssignmentsRootContent: React.FC<AssignmentsRootContentProps> = ({
  onNavigateToDashboard,
}) => {
  const { currentScreen } = useAssignmentFlow();

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'OVERVIEW':
        return (
          <AssignmentsOverviewScreen onNavigateToDashboard={onNavigateToDashboard} />
        );
      case 'LIST_DETAILS':
        return (
          <AssignmentListDetailsScreen
            onNavigateToDashboard={onNavigateToDashboard}
          />
        );
      case 'CREATE_EDIT':
        return (
          <AssignmentCreateEditScreen
            onNavigateToDashboard={onNavigateToDashboard}
          />
        );
      case 'SUBMISSIONS_MATERIALS':
        return (
          <AssignmentSubmissionsMaterialsScreen
            onNavigateToDashboard={onNavigateToDashboard}
          />
        );
      default:
        return (
          <AssignmentsOverviewScreen onNavigateToDashboard={onNavigateToDashboard} />
        );
    }
  };

  return (
    <div className="edusync-assignments-root-container">
      {renderCurrentScreen()}
      <AddMaterialModal />
      <ReviewSubmissionModal />
      <AssignmentToastNotice />
    </div>
  );
};

export interface AssignmentsScreenProps {
  onNavigateToDashboard: () => void;
}

export const AssignmentsScreen: React.FC<AssignmentsScreenProps> = ({
  onNavigateToDashboard,
}) => {
  return (
    <AssignmentFlowProvider>
      <AssignmentsRootContent onNavigateToDashboard={onNavigateToDashboard} />
    </AssignmentFlowProvider>
  );
};
