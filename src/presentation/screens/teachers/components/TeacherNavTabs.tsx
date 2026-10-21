import React from 'react';
import { useTeacherFlow } from '../../../../application/state/teacher-flow.context';

export const TeacherNavTabs: React.FC = () => {
  const { subScreen, goToDirectory, goToConsolidatedOverview, goToAddTeacher, goToFeedback } =
    useTeacherFlow();

  const tabs = [
    { id: 'TEACHERS_DIRECTORY', label: 'Teacher Directory', onClick: goToDirectory },
    { id: 'TEACHERS_CONSOLIDATED', label: 'Overview & Profile', onClick: goToConsolidatedOverview },
    { id: 'TEACHERS_FEEDBACK', label: 'Feedback & Ratings', onClick: goToFeedback },
    { id: 'TEACHERS_ADD_EDIT', label: 'Add Teacher', onClick: goToAddTeacher },
  ];

  return (
    <nav className="academic-nav-tabs" aria-label="Teacher navigation tabs">
      {tabs.map((tab) => {
        const isActive = subScreen === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            className={`academic-nav-tab ${isActive ? 'academic-nav-tab--active' : ''}`}
            onClick={tab.onClick}
          >
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
};
