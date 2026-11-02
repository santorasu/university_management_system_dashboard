import React from 'react';
import { useUsersFlow } from '../../../../application/state/users-flow.context';
import type { UsersSubScreen } from '../../../../core/entities/users.types';

interface TabItem {
  id: UsersSubScreen;
  label: string;
}

const tabs: TabItem[] = [
  { id: 'DIRECTORY', label: 'Account Directory' },
  { id: 'CREATE_EDIT', label: 'Create & Edit Account' },
];

export const UsersNavTabs: React.FC = () => {
  const { currentSubScreen, goToDirectory, goToCreateAccount } = useUsersFlow();

  const handleTabClick = (id: UsersSubScreen) => {
    if (id === 'DIRECTORY') {
      goToDirectory();
    } else {
      goToCreateAccount();
    }
  };

  return (
    <nav className="users-nav-tabs" aria-label="User Management Navigation">
      {tabs.map((tab) => {
        const isActive = currentSubScreen === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            className={`users-nav-tab ${isActive ? 'users-nav-tab--active' : ''}`}
            onClick={() => handleTabClick(tab.id)}
            aria-current={isActive ? 'page' : undefined}
          >
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
};
