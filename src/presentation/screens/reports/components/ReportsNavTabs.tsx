import React from 'react';
import type { ReportSubScreen } from '../../../../core/entities/reports.types';
import { useReportsFlow } from '../../../../application/state/reports-flow.context';

interface TabItem {
  id: ReportSubScreen;
  label: string;
}

const tabs: TabItem[] = [
  { id: 'OVERVIEW', label: 'Overview' },
  { id: 'ACADEMIC_PERFORMANCE', label: 'Academic Performance' },
  { id: 'FEES_PAYMENTS', label: 'Fees & Payments' },
  { id: 'ATTENDANCE_LIBRARY', label: 'Attendance & Library' },
];

export const ReportsNavTabs: React.FC = () => {
  const { currentSubScreen, setSubScreen } = useReportsFlow();

  return (
    <nav className="reports-nav-tabs" aria-label="Reports sub-navigation">
      {tabs.map((tab) => {
        const isActive = currentSubScreen === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            className={`reports-nav-tab ${isActive ? 'reports-nav-tab--active' : ''}`}
            onClick={() => setSubScreen(tab.id)}
          >
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
};
