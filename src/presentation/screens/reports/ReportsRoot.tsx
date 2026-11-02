import React from 'react';
import { ReportsFlowProvider, useReportsFlow } from '../../../application/state/reports-flow.context';
import { ReportsNavTabs } from './components/ReportsNavTabs';
import { ReportFiltersBar } from './components/ReportFiltersBar';
import { ReportExportModal } from './components/ReportExportModal';
import { ReportsOverviewScreen } from './screens/ReportsOverviewScreen';
import { ReportsAcademicPerformanceScreen } from './screens/ReportsAcademicPerformanceScreen';
import { ReportsFeesPaymentsScreen } from './screens/ReportsFeesPaymentsScreen';
import { ReportsAttendanceLibraryScreen } from './screens/ReportsAttendanceLibraryScreen';
import { Icon } from '../../widgets/Icon/Icon';
import './Reports.css';

interface ReportsScreenProps {
  onNavigateToDashboard: () => void;
}

const ReportsContent: React.FC<ReportsScreenProps> = ({ onNavigateToDashboard }) => {
  const { currentSubScreen, openExportModal, toastMessage } = useReportsFlow();

  const getHeaderInfo = () => {
    switch (currentSubScreen) {
      case 'OVERVIEW':
        return {
          title: 'Reports & Analytics',
          subtitle: 'Explore school performance across enrollment, attendance, academics, finance, and library activity',
          breadcrumb: 'Overview',
          actionText: 'Export report',
          actionIcon: 'clipboard-check' as const,
        };
      case 'ACADEMIC_PERFORMANCE':
        return {
          title: 'Academic Performance Reports',
          subtitle: 'Review enrollment, class strength, examination results, and academic progress',
          breadcrumb: 'Academic Performance',
          actionText: 'Print report',
          actionIcon: 'clipboard-check' as const,
        };
      case 'FEES_PAYMENTS':
        return {
          title: 'Fees & Payment Reports',
          subtitle: 'Track fee collection, outstanding dues, and payment history',
          breadcrumb: 'Fees & Payments',
          actionText: 'Export finance report',
          actionIcon: 'chart-no-axes-combined' as const,
        };
      case 'ATTENDANCE_LIBRARY':
        return {
          title: 'Attendance & Library Reports',
          subtitle: 'Compare attendance patterns and library borrowing activity',
          breadcrumb: 'Attendance & Library',
          actionText: 'Export activity report',
          actionIcon: 'clipboard-check' as const,
        };
    }
  };

  const header = getHeaderInfo();

  const renderSubScreen = () => {
    switch (currentSubScreen) {
      case 'OVERVIEW':
        return <ReportsOverviewScreen />;
      case 'ACADEMIC_PERFORMANCE':
        return <ReportsAcademicPerformanceScreen />;
      case 'FEES_PAYMENTS':
        return <ReportsFeesPaymentsScreen />;
      case 'ATTENDANCE_LIBRARY':
        return <ReportsAttendanceLibraryScreen />;
    }
  };

  return (
    <div className="reports-container">
      {/* Hero Header */}
      <div className="reports-hero">
        <div className="reports-hero__left">
          <button
            type="button"
            className="reports-back-btn"
            onClick={onNavigateToDashboard}
            title="Back to Dashboard"
            aria-label="Back to Dashboard"
          >
            ←
          </button>
          <div>
            <div className="reports-breadcrumbs">
              Dashboard / Reports & Analytics / {header.breadcrumb}
            </div>
            <h1 className="reports-title">{header.title}</h1>
            <p className="reports-subtitle">{header.subtitle}</p>
          </div>
        </div>

        <div className="reports-hero__actions">
          <button
            type="button"
            className="reports-primary-btn"
            onClick={() => openExportModal(header.title)}
          >
            <Icon name={header.actionIcon} size={16} />
            {header.actionText}
          </button>
        </div>
      </div>

      {/* Persistent Sub Navigation Tabs */}
      <ReportsNavTabs />

      {/* Filter Bar */}
      <ReportFiltersBar />

      {/* Active Screen View */}
      {renderSubScreen()}

      {/* Interactive Export Modal */}
      <ReportExportModal />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="reports-toast">
          <Icon name="check" size={16} />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export const ReportsScreen: React.FC<ReportsScreenProps> = (props) => {
  return (
    <ReportsFlowProvider>
      <ReportsContent {...props} />
    </ReportsFlowProvider>
  );
};
