import React from 'react';
import { useStudentFlow } from '../../../../application/state/student-flow.context';

export const StudentNavTabs: React.FC = () => {
  const { subScreen, goToDirectory, goToConsolidatedOverview, goToAddStudent } = useStudentFlow();

  const tabs = [
    { id: 'STUDENTS_DIRECTORY', label: 'Student Directory', onClick: goToDirectory },
    { id: 'STUDENTS_CONSOLIDATED', label: 'Overview & Profile', onClick: goToConsolidatedOverview },
    { id: 'STUDENTS_ADD_EDIT', label: 'Add Student', onClick: goToAddStudent },
  ];

  return (
    <nav className="academic-nav-tabs" aria-label="Student navigation tabs">
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
