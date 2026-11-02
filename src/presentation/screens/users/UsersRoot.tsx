import React from 'react';
import { UsersFlowProvider, useUsersFlow } from '../../../application/state/users-flow.context';
import { UsersNavTabs } from './components/UsersNavTabs';
import { UserDirectoryScreen } from './screens/UserDirectoryScreen';
import { UserCreateEditScreen } from './screens/UserCreateEditScreen';
import { UserConfirmationModal } from './components/UserConfirmationModal';
import { Icon } from '../../widgets/Icon/Icon';
import './Users.css';

interface UsersScreenProps {
  onNavigateToDashboard: () => void;
}

const UsersContent: React.FC<UsersScreenProps> = ({ onNavigateToDashboard }) => {
  const { currentSubScreen, goToCreateAccount, goToDirectory, toastMessage } = useUsersFlow();

  const isDirectory = currentSubScreen === 'DIRECTORY';

  return (
    <div className="users-container">
      {/* Hero Header */}
      <div className="users-hero">
        <div className="users-hero__left">
          <nav className="users-hero__crumbs" aria-label="Breadcrumb">
            <button
              type="button"
              className="users-hero__crumb--link"
              onClick={onNavigateToDashboard}
            >
              Dashboard
            </button>
            <span className="users-hero__crumb-sep">/</span>
            <span style={{ fontWeight: 500 }}>Administration</span>
            <span className="users-hero__crumb-sep">/</span>
            <span className="users-hero__crumb--current">
              {isDirectory ? 'Account Directory' : 'Create & Edit'}
            </span>
          </nav>

          <div className="users-hero__title-row">
            <button
              type="button"
              className="edusync-btn-back-circle"
              onClick={isDirectory ? onNavigateToDashboard : goToDirectory}
              title={isDirectory ? 'Back to Dashboard' : 'Back to Directory'}
              aria-label={isDirectory ? 'Back to Dashboard' : 'Back to Directory'}
            >
              ←
            </button>
            <div>
              <h1 className="users-hero__title">
                {isDirectory ? 'User Management' : 'Create & Edit User Account'}
              </h1>
              <p className="users-hero__subtitle">
                {isDirectory
                  ? 'Manage account access, supported roles, account status, and recent activity'
                  : 'Assign the correct product role and manage account security'}
              </p>
            </div>
          </div>
        </div>

        <div className="users-hero__actions">
          <button
            type="button"
            className="edusync-btn edusync-btn--secondary"
            onClick={onNavigateToDashboard}
          >
            ← Dashboard
          </button>
          {isDirectory ? (
            <button
              type="button"
              className="edusync-btn edusync-btn--primary"
              onClick={goToCreateAccount}
            >
              + Create account
            </button>
          ) : (
            <button
              type="button"
              className="edusync-btn edusync-btn--secondary"
              onClick={goToDirectory}
            >
              Back to directory
            </button>
          )}
        </div>
      </div>

      {/* Sub Navigation Tabs */}
      <UsersNavTabs />

      {/* Screen View (4 KPI cards sit directly beneath tabs on directory) */}
      {isDirectory ? <UserDirectoryScreen /> : <UserCreateEditScreen />}

      {/* Confirmation Modal */}
      <UserConfirmationModal />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="users-toast">
          <Icon name="check" size={16} />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export const UsersScreen: React.FC<UsersScreenProps> = (props) => {
  return (
    <UsersFlowProvider>
      <UsersContent {...props} />
    </UsersFlowProvider>
  );
};
