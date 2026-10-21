import React from 'react';
import { useAssignmentFlow } from '../../../../application/state/assignment-flow.context';

export const AssignmentsNavTabs: React.FC = () => {
  const {
    currentScreen,
    editingAssignment,
    goToOverview,
    goToListDetails,
    goToCreateAssignment,
    goToSubmissionsMaterials,
  } = useAssignmentFlow();

  return (
    <nav className="assignments-nav-tabs" aria-label="Assignments navigation tabs">
      <button
        type="button"
        className={`assignments-nav-tab ${
          currentScreen === 'OVERVIEW' ? 'assignments-nav-tab--active' : ''
        }`}
        onClick={goToOverview}
      >
        Overview
      </button>

      <button
        type="button"
        className={`assignments-nav-tab ${
          currentScreen === 'LIST_DETAILS' ? 'assignments-nav-tab--active' : ''
        }`}
        onClick={() => goToListDetails()}
      >
        Assignment List
      </button>

      <button
        type="button"
        className={`assignments-nav-tab ${
          currentScreen === 'CREATE_EDIT' ? 'assignments-nav-tab--active' : ''
        }`}
        onClick={goToCreateAssignment}
      >
        {editingAssignment ? 'Edit Assignment' : 'Create Assignment'}
      </button>

      <button
        type="button"
        className={`assignments-nav-tab ${
          currentScreen === 'SUBMISSIONS_MATERIALS'
            ? 'assignments-nav-tab--active'
            : ''
        }`}
        onClick={() => goToSubmissionsMaterials()}
      >
        Submissions &amp; Materials
      </button>
    </nav>
  );
};
