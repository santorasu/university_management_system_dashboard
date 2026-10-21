import React, { useState } from 'react';
import { StatCard } from '../components/StatCard';
import { Badge } from '../../../widgets/Badge/Badge';
import { Button } from '../../../widgets/Button/Button';
import { Pagination } from '../../../widgets/Pagination/Pagination';
import type { DashboardDestination } from '../../../../core/entities/auth.types';

interface DestinationProps {
  onNavigate: (destination: DashboardDestination) => void;
}

export const RecentActivitiesDestination: React.FC<DestinationProps> = ({ onNavigate }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const activities = [
    { id: '1', activity: 'Student record updated', user: 'Admin · R. Islam', module: 'Students', time: '19 Oct · 15:42', status: 'Completed' },
    { id: '2', activity: 'Attendance marked', user: 'Teacher · N. Akter', module: 'Attendance', time: '19 Oct · 14:18', status: 'Completed' },
    { id: '3', activity: 'Fee payment recorded', user: 'Admin · M. Hasan', module: 'Finance', time: '19 Oct · 12:06', status: 'Completed' },
    { id: '4', activity: 'Notice published', user: 'Admin · S. Ahmed', module: 'Notices', time: '19 Oct · 11:32', status: 'Completed' },
    { id: '5', activity: 'Exam schedule edited', user: 'Admin · R. Islam', module: 'Exams', time: '18 Oct · 16:50', status: 'Completed' },
    { id: '6', activity: 'Password reset requested', user: 'Admin · M. Hasan', module: 'Users', time: '18 Oct · 15:22', status: 'Review' },
    { id: '7', activity: 'Book returned', user: 'Librarian · Admin', module: 'Library', time: '18 Oct · 13:05', status: 'Completed' },
    { id: '8', activity: 'Event details updated', user: 'Admin · S. Ahmed', module: 'Events', time: '18 Oct · 10:40', status: 'Completed' },
  ];

  return (
    <div className="edusync-destination-view">
      {/* BREADCRUMB */}
      <nav className="edusync-dash-breadcrumb">
        <span onClick={() => onNavigate('OVERVIEW')} style={{ cursor: 'pointer' }}>Maple Grove School</span>
        <span className="edusync-dash-breadcrumb__separator">&gt;</span>
        <span onClick={() => onNavigate('OVERVIEW')} style={{ cursor: 'pointer' }}>Dashboard</span>
        <span className="edusync-dash-breadcrumb__separator">&gt;</span>
        <span className="edusync-dash-breadcrumb__current">Recent Activities</span>
      </nav>

      {/* HEADER */}
      <div className="edusync-destination-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              type="button"
              className="edusync-btn-back-circle"
              onClick={() => onNavigate('OVERVIEW')}
              title="Back to Dashboard"
              aria-label="Back to Dashboard"
            >
              ←
            </button>
            <h1 className="edusync-destination-title" style={{ margin: 0 }}>Recent Activities</h1>
          </div>
          <p className="edusync-destination-subtitle" style={{ marginTop: '4px' }}>
            Review recent user actions and important updates across the school system.
          </p>
        </div>
        <button
          type="button"
          className="edusync-btn edusync-btn--secondary"
          onClick={() => onNavigate('OVERVIEW')}
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* FILTERS BAR */}
      <div className="edusync-destination-filters">
        <div className="edusync-destination-search">
          <input
            type="text"
            placeholder="Search activity, user, or module..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select className="edusync-destination-select">
          <option>All modules</option>
          <option>Students</option>
          <option>Attendance</option>
          <option>Finance</option>
          <option>Exams</option>
        </select>
        <select className="edusync-destination-select">
          <option>All users</option>
          <option>Administrators</option>
          <option>Teachers</option>
          <option>Staff</option>
        </select>
        <Button variant="primary" size="md" fullWidth={false}>
          Apply filters
        </Button>
      </div>

      {/* 4 STATS ROW */}
      <div className="edusync-destination-stats-grid">
        <StatCard label="Total activities" value="1,284" />
        <StatCard label="Today" value="86" />
        <StatCard label="Admin actions" value="42" />
        <StatCard label="Alerts" value="7" />
      </div>

      {/* DATA TABLE */}
      <div className="edusync-destination-table-card">
        <div className="edusync-destination-table-header">
          <h3 className="edusync-destination-table-title">Recent activity log</h3>
          <p className="edusync-destination-table-desc">
            A searchable audit trail of important actions across the school system.
          </p>
        </div>

        <div className="edusync-dash-table-wrapper">
          <table className="edusync-dash-table">
            <thead>
              <tr>
                <th>Activity</th>
                <th>User</th>
                <th>Module</th>
                <th>Date &amp; time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((row) => (
                <tr key={row.id}>
                  <td><strong>{row.activity}</strong></td>
                  <td>{row.user}</td>
                  <td>{row.module}</td>
                  <td>{row.time}</td>
                  <td>
                    <Badge variant={row.status === 'Completed' ? 'success' : 'warning'}>
                      {row.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="edusync-destination-table-footer">
          <span>Showing 1–8 of 1,284 activities</span>
          <Pagination currentPage={currentPage} totalPages={3} onPageChange={setCurrentPage} />
        </div>
      </div>
    </div>
  );
};
