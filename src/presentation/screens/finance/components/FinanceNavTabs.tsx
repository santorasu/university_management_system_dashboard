import React from 'react';
import type { FeesScreenId } from '../../../../core/entities/finance.types';
import { useFinance } from '../../../../application/state/finance-flow.context';

export const FinanceNavTabs: React.FC = () => {
  const { currentScreen, setCurrentScreen } = useFinance();

  const tabs: { id: FeesScreenId; label: string }[] = [
    { id: 'OVERVIEW', label: 'Finance Overview' },
    { id: 'CATEGORIES_ASSIGNMENT', label: 'Categories & Assignment' },
    { id: 'INVOICES_PAYMENTS', label: 'Invoices & Payments' },
    { id: 'DUES_REPORTS', label: 'Dues & Reports' },
  ];

  return (
    <nav className="finance-nav-tabs" aria-label="Fees & Finance Navigation Tabs">
      {tabs.map((tab) => {
        const isActive = currentScreen === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            className={`finance-nav-tab ${isActive ? 'finance-nav-tab--active' : ''}`}
            onClick={() => setCurrentScreen(tab.id)}
          >
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
};
