import React from 'react';
import { BrandLogo } from '../../../widgets/BrandLogo/BrandLogo';
import { Icon, type IconName } from '../../../widgets/Icon/Icon';
import type { DashboardDestination } from '../../../../core/entities/auth.types';

interface SidebarProps {
  currentDestination: DashboardDestination;
  onNavigate: (destination: DashboardDestination) => void;
  schoolName?: string;
}

interface NavItemDef {
  id: string;
  label: string;
  icon: IconName;
  destination?: DashboardDestination;
}

interface NavGroupDef {
  title: string;
  items: NavItemDef[];
}

export const DashboardSidebar: React.FC<SidebarProps> = ({
  currentDestination,
  onNavigate,
  schoolName = 'Maple Grove School',
}) => {
  const navGroups: NavGroupDef[] = [
    {
      title: 'OVERVIEW',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: 'layout-dashboard', destination: 'OVERVIEW' },
      ],
    },
    {
      title: 'ACADEMICS',
      items: [
        { id: 'students', label: 'Students', icon: 'graduation-cap', destination: 'STUDENTS' },
        { id: 'teachers', label: 'Teachers', icon: 'users', destination: 'TEACHERS' },
        { id: 'classes', label: 'Classes & Subjects', icon: 'book-open', destination: 'CLASSES_SUBJECTS' },
        { id: 'attendance', label: 'Attendance', icon: 'user-check', destination: 'ATTENDANCE_REPORT' },
        { id: 'timetable', label: 'Timetable', icon: 'calendar-days', destination: 'TIMETABLE' },
        { id: 'assignments', label: 'Assignments & Materials', icon: 'notebook-pen', destination: 'ASSIGNMENTS' },
        { id: 'exams', label: 'Exams & Results', icon: 'clipboard-check', destination: 'EXAMS' },
      ],
    },
    {
      title: 'SCHOOL OPERATIONS',
      items: [
        { id: 'finance', label: 'Fees & Finance', icon: 'wallet', destination: 'FEES_FINANCE_REPORT' },
        { id: 'notices', label: 'Notices & Messages', icon: 'messages-square' },
        { id: 'library', label: 'Library & Documents', icon: 'folder-open' },
        { id: 'events', label: 'Events', icon: 'calendar-check', destination: 'UPCOMING_EVENTS' },
      ],
    },
    {
      title: 'ADMINISTRATION',
      items: [
        { id: 'reports', label: 'Reports & Analytics', icon: 'chart-no-axes-combined', destination: 'RECENT_ACTIVITIES' },
        { id: 'users', label: 'User Management', icon: 'user-cog' },
        { id: 'settings', label: 'School Settings', icon: 'settings' },
      ],
    },
  ];

  return (
    <aside className="edusync-sidebar" aria-label="School Administration Navigation">
      {/* BRAND & HEADER */}
      <div className="edusync-sidebar__brand-container">
        <div className="edusync-sidebar__brand-logo-row" onClick={() => onNavigate('OVERVIEW')} style={{ cursor: 'pointer' }}>
          <BrandLogo variant="on-dark" size="sm" />
        </div>
        <div className="edusync-sidebar__subword">SCHOOL ADMINISTRATION</div>
      </div>

      {/* NAVIGATION GROUPS */}
      <nav className="edusync-sidebar__nav">
        {navGroups.map((group) => (
          <div key={group.title} className="edusync-sidebar__group">
            <div className="edusync-sidebar__group-title">{group.title}</div>
            <div className="edusync-sidebar__group-items">
              {group.items.map((item) => {
                const isActive = item.destination
                  ? currentDestination === item.destination
                  : false;

                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`edusync-sidebar__nav-item ${
                      isActive ? 'edusync-sidebar__nav-item--active' : ''
                    }`}
                    onClick={() => {
                      if (item.destination) {
                        onNavigate(item.destination);
                      } else {
                        // For demonstration, default to overview or related report
                        onNavigate('OVERVIEW');
                      }
                    }}
                  >
                    <Icon name={item.icon} size={18} className="edusync-sidebar__item-icon" />
                    <span className="edusync-sidebar__item-text">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* FOOTER SCHOOL IDENTITY CARD */}
      <div className="edusync-sidebar__footer">
        <div className="edusync-sidebar__school-card">
          <div className="edusync-sidebar__school-icon-wrapper">
            <Icon name="school" size={16} />
          </div>
          <div className="edusync-sidebar__school-info">
            <div className="edusync-sidebar__school-name">{schoolName}</div>
            <div className="edusync-sidebar__school-term">Academic year 2026–27</div>
          </div>
        </div>
      </div>
    </aside>
  );
};
