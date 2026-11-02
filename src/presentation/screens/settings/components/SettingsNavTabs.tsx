import React from 'react';
import type { SettingsTab } from '../../../../core/entities/settings.types';
import { useSettingsFlow } from '../../../../application/state/settings-flow.context';

interface TabItem {
  id: SettingsTab;
  label: string;
}

const tabs: TabItem[] = [
  { id: 'PROFILE_ACADEMICS', label: 'School Profile & Academics' },
  { id: 'ATTENDANCE_SECURITY', label: 'Attendance, Notifications & Security' },
];

export const SettingsNavTabs: React.FC = () => {
  const { activeTab, setActiveTab } = useSettingsFlow();

  return (
    <nav className="settings-nav-tabs" aria-label="School Settings Tabs">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            className={`settings-nav-tab ${isActive ? 'settings-nav-tab--active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
};
