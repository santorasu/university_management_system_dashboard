import React from 'react';
import { useTeacherFlow } from '../../../../application/state/teacher-flow.context';

export const TeacherNavTabs: React.FC = () => {
  const { subScreen, goToConsolidatedOverview, goToDirectory, goToFeedback, goToAddTeacher } =
    useTeacherFlow();

  const tabs = [
    {
      id: 'TEACHERS_CONSOLIDATED',
      label: 'Overview',
      isActive: subScreen === 'TEACHERS_CONSOLIDATED' || subScreen === 'TEACHERS_PROFILE',
      onClick: goToConsolidatedOverview,
    },
    {
      id: 'TEACHERS_DIRECTORY',
      label: 'Teacher Directory',
      isActive: subScreen === 'TEACHERS_DIRECTORY',
      onClick: goToDirectory,
    },
    {
      id: 'TEACHERS_FEEDBACK',
      label: 'Feedback & Ratings',
      isActive: subScreen === 'TEACHERS_FEEDBACK',
      onClick: goToFeedback,
    },
    {
      id: 'TEACHERS_ADD_EDIT',
      label: 'Add Teacher',
      isActive: subScreen === 'TEACHERS_ADD_EDIT',
      onClick: goToAddTeacher,
    },
  ];

  return (
    <nav className="academic-nav-tabs" aria-label="Teacher navigation tabs">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          className={`academic-nav-tab ${tab.isActive ? 'academic-nav-tab--active' : ''}`}
          onClick={tab.onClick}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
};
