import React, { useState } from 'react';
import { DashboardSidebar } from './dashboard/components/DashboardSidebar';
import { DashboardHeader } from './dashboard/components/DashboardHeader';
import { DashboardOverview } from './dashboard/DashboardOverview';
import { RecentActivitiesDestination } from './dashboard/destinations/RecentActivitiesDestination';
import { UpcomingEventsDestination } from './dashboard/destinations/UpcomingEventsDestination';
import { AttendanceReportDestination } from './dashboard/destinations/AttendanceReportDestination';
import { FeesFinanceDestination } from './dashboard/destinations/FeesFinanceDestination';
import { StudentsScreen } from './students/StudentsRoot';
import { TeachersScreen } from './teachers/TeachersRoot';
import { AcademicStructureScreen } from './academic-structure/AcademicStructureRoot';
import type { DashboardDestination } from '../../core/entities/auth.types';
import './DashboardScreen.css';

export const DashboardScreen: React.FC = () => {
  const [currentDestination, setCurrentDestination] = useState<DashboardDestination>('OVERVIEW');

  const renderDestination = () => {
    switch (currentDestination) {
      case 'OVERVIEW':
        return <DashboardOverview onNavigate={setCurrentDestination} />;
      case 'STUDENTS':
        return <StudentsScreen onNavigateToDashboard={() => setCurrentDestination('OVERVIEW')} />;
      case 'TEACHERS':
        return <TeachersScreen onNavigateToDashboard={() => setCurrentDestination('OVERVIEW')} />;
      case 'CLASSES_SUBJECTS':
        return <AcademicStructureScreen onNavigateToDashboard={() => setCurrentDestination('OVERVIEW')} />;
      case 'RECENT_ACTIVITIES':
        return <RecentActivitiesDestination onNavigate={setCurrentDestination} />;
      case 'UPCOMING_EVENTS':
        return <UpcomingEventsDestination onNavigate={setCurrentDestination} />;
      case 'ATTENDANCE_REPORT':
        return <AttendanceReportDestination onNavigate={setCurrentDestination} />;
      case 'FEES_FINANCE_REPORT':
        return <FeesFinanceDestination onNavigate={setCurrentDestination} />;
      default:
        return <DashboardOverview onNavigate={setCurrentDestination} />;
    }
  };

  return (
    <div className="edusync-dashboard-shell">
      {/* SIDEBAR NAVIGATION */}
      <DashboardSidebar
        currentDestination={currentDestination}
        onNavigate={setCurrentDestination}
        schoolName="Maple Grove School"
      />

      {/* MAIN VIEWPORT */}
      <div className="edusync-dashboard-viewport">
        <DashboardHeader />
        <main className="edusync-dashboard-content">
          {renderDestination()}
        </main>
      </div>
    </div>
  );
};
