import React from 'react';
import { FinanceProvider, useFinance } from '../../../application/state/finance-flow.context';
import { FinanceOverviewScreen } from './FinanceOverviewScreen';
import { FinanceCategoriesAssignmentScreen } from './FinanceCategoriesAssignmentScreen';
import { FinanceInvoicesPaymentsScreen } from './FinanceInvoicesPaymentsScreen';
import { FinanceDuesReportsScreen } from './FinanceDuesReportsScreen';
import { FinanceModals } from './FinanceModals';
import './Finance.css';

interface FinanceScreenProps {
  onNavigateToDashboard?: () => void;
}

const FinanceFlowContainer: React.FC<FinanceScreenProps> = ({ onNavigateToDashboard }) => {
  const { currentScreen, toastMessage } = useFinance();

  const renderActiveScreen = () => {
    switch (currentScreen) {
      case 'OVERVIEW':
        return <FinanceOverviewScreen onNavigateToDashboard={onNavigateToDashboard} />;
      case 'CATEGORIES_ASSIGNMENT':
        return <FinanceCategoriesAssignmentScreen onNavigateToDashboard={onNavigateToDashboard} />;
      case 'INVOICES_PAYMENTS':
        return <FinanceInvoicesPaymentsScreen onNavigateToDashboard={onNavigateToDashboard} />;
      case 'DUES_REPORTS':
        return <FinanceDuesReportsScreen onNavigateToDashboard={onNavigateToDashboard} />;
      default:
        return <FinanceOverviewScreen onNavigateToDashboard={onNavigateToDashboard} />;
    }
  };

  return (
    <>
      {renderActiveScreen()}
      <FinanceModals />
      {toastMessage && (
        <div className="finance-toast" role="status" aria-live="polite">
          <span>✓</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </>
  );
};

export const FinanceScreen: React.FC<FinanceScreenProps> = (props) => {
  return (
    <FinanceProvider>
      <FinanceFlowContainer {...props} />
    </FinanceProvider>
  );
};
