import React from 'react';
import { SettingsFlowProvider, useSettingsFlow } from '../../../application/state/settings-flow.context';
import { SettingsNavTabs } from './components/SettingsNavTabs';
import { SettingsSavedModal } from './components/SettingsSavedModal';
import { SchoolProfileAcademicsScreen } from './screens/SchoolProfileAcademicsScreen';
import { AttendanceNotificationsSecurityScreen } from './screens/AttendanceNotificationsSecurityScreen';
import { Icon } from '../../widgets/Icon/Icon';
import './Settings.css';

interface SettingsScreenProps {
  onNavigateToDashboard: () => void;
}

const SettingsContent: React.FC<SettingsScreenProps> = ({ onNavigateToDashboard }) => {
  const { activeTab, toastMessage } = useSettingsFlow();

  const isProfileAcademics = activeTab === 'PROFILE_ACADEMICS';

  return (
    <div className="settings-container">
      {/* Hero Header */}
      <div className="settings-hero">
        <div className="settings-hero__left">
          <nav className="settings-hero__crumbs" aria-label="Breadcrumb">
            <button
              type="button"
              className="settings-hero__crumb--link"
              onClick={onNavigateToDashboard}
            >
              Dashboard
            </button>
            <span className="settings-hero__crumb-sep">/</span>
            <span style={{ fontWeight: 500 }}>Administration</span>
            <span className="settings-hero__crumb-sep">/</span>
            <span className="settings-hero__crumb--current">
              {isProfileAcademics ? 'Profile & Academics' : 'Attendance & Security'}
            </span>
          </nav>

          <div className="settings-hero__title-row">
            <button
              type="button"
              className="edusync-btn-back-circle"
              onClick={onNavigateToDashboard}
              title="Return to Dashboard"
              aria-label="Back to Dashboard"
            >
              ←
            </button>
            <div>
              <h1 className="settings-hero__title">
                {isProfileAcademics
                  ? 'School Profile & Academic Settings'
                  : 'Attendance, Notifications & Security'}
              </h1>
              <p className="settings-hero__subtitle">
                {isProfileAcademics
                  ? 'Configure school identity, academic year, classes, and grading'
                  : 'Set attendance rules, communication preferences, and security policies'}
              </p>
            </div>
          </div>
        </div>

        <div className="settings-hero__actions">
          <button
            type="button"
            className="edusync-btn edusync-btn--secondary"
            onClick={onNavigateToDashboard}
          >
            ← Dashboard
          </button>
        </div>
      </div>

      {/* Persistent Tabs */}
      <SettingsNavTabs />

      {/* Screen Render */}
      {isProfileAcademics ? (
        <SchoolProfileAcademicsScreen />
      ) : (
        <AttendanceNotificationsSecurityScreen />
      )}

      {/* Modal */}
      <SettingsSavedModal />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="settings-toast">
          <Icon name="check" size={16} />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export const SettingsScreen: React.FC<SettingsScreenProps> = (props) => {
  return (
    <SettingsFlowProvider>
      <SettingsContent {...props} />
    </SettingsFlowProvider>
  );
};
