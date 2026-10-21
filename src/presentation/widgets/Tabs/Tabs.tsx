import React from 'react';
import './Tabs.css';

export interface TabItem {
  id: string;
  label: string;
  badge?: string | number;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  className = '',
}) => {
  return (
    <div className={`edusync-tabs-nav ${className}`}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            type="button"
            className={`edusync-tab-btn ${isActive ? 'edusync-tab-btn--active' : ''}`}
            onClick={() => onChange(tab.id)}
          >
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span className={`edusync-tab-badge ${isActive ? 'edusync-tab-badge--active' : ''}`}>
                {tab.badge}
              </span>
            )}
            {isActive && <div className="edusync-tab-indicator" />}
          </button>
        );
      })}
    </div>
  );
};
