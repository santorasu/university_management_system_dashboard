import React from 'react';
import { useStudentFlow } from '../../../../application/state/student-flow.context';

export const StudentNavTabs: React.FC = () => {
  const { subScreen, goToConsolidatedOverview, goToDirectory, goToAddStudent } = useStudentFlow();

  const tabs = [
    {
      id: 'STUDENTS_CONSOLIDATED',
      label: 'Overview',
      isActive: subScreen === 'STUDENTS_CONSOLIDATED' || subScreen === 'STUDENTS_PROFILE',
      onClick: goToConsolidatedOverview,
    },
    {
      id: 'STUDENTS_DIRECTORY',
      label: 'Student Directory',
      isActive: subScreen === 'STUDENTS_DIRECTORY',
      onClick: goToDirectory,
    },
    {
      id: 'STUDENTS_ADD_EDIT',
      label: 'Add Student',
      isActive: subScreen === 'STUDENTS_ADD_EDIT',
      onClick: goToAddStudent,
    },
  ];

  return (
    <nav className="academic-nav-tabs" aria-label="Student navigation tabs">
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
