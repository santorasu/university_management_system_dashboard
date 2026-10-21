import React, { useState } from 'react';
import { DashboardSidebar } from './dashboard/components/DashboardSidebar';
import { DashboardHeader } from './dashboard/components/DashboardHeader';
import { DashboardOverview } from './dashboard/DashboardOverview';
import { RecentActivitiesDestination } from './dashboard/destinations/RecentActivitiesDestination';
import { UpcomingEventsDestination } from './dashboard/destinations/UpcomingEventsDestination';
import { FinanceScreen } from './finance/FinanceRoot';
import { StudentsScreen } from './students/StudentsRoot';
import { TeachersScreen } from './teachers/TeachersRoot';
import { AcademicStructureScreen } from './academic-structure/AcademicStructureRoot';
import { AttendanceScreen } from './attendance/AttendanceRoot';
import { TimetableScreen } from './timetable/TimetableRoot';
import { AssignmentsScreen } from './assignments/AssignmentsRoot';
import { ExamsScreen } from './exams/ExamsRoot';
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
      case 'ATTENDANCE_REPORT':
        return <AttendanceScreen onNavigateToDashboard={() => setCurrentDestination('OVERVIEW')} />;
      case 'TIMETABLE':
        return <TimetableScreen onNavigateToDashboard={() => setCurrentDestination('OVERVIEW')} />;
      case 'ASSIGNMENTS':
        return <AssignmentsScreen onNavigateToDashboard={() => setCurrentDestination('OVERVIEW')} />;
      case 'EXAMS':
        return <ExamsScreen onNavigateToDashboard={() => setCurrentDestination('OVERVIEW')} />;
      case 'RECENT_ACTIVITIES':
        return <RecentActivitiesDestination onNavigate={setCurrentDestination} />;
      case 'UPCOMING_EVENTS':
        return <UpcomingEventsDestination onNavigate={setCurrentDestination} />;
      case 'FEES_FINANCE_REPORT':
        return <FinanceScreen onNavigateToDashboard={() => setCurrentDestination('OVERVIEW')} />;
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
