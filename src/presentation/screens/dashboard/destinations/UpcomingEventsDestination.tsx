import React, { useState } from 'react';
import { StatCard } from '../components/StatCard';
import { Badge } from '../../../widgets/Badge/Badge';
import { Button } from '../../../widgets/Button/Button';
import { Pagination } from '../../../widgets/Pagination/Pagination';
import type { DashboardDestination } from '../../../../core/entities/auth.types';

interface DestinationProps {
  onNavigate: (destination: DashboardDestination) => void;
}

export const UpcomingEventsDestination: React.FC<DestinationProps> = ({ onNavigate }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const events = [
    { id: '1', title: 'Parent–Teacher Meeting', date: '22 Oct 2026', category: 'Meeting', organizer: 'Academic Office', status: 'Published' },
    { id: '2', title: 'Mid-term Examination', date: '26–30 Oct 2026', category: 'Academic', organizer: 'Exam Committee', status: 'Published' },
    { id: '3', title: 'Science Exhibition', date: '04 Nov 2026', category: 'School event', organizer: 'Science Dept.', status: 'Draft' },
    { id: '4', title: 'Annual Sports Day', date: '12 Nov 2026', category: 'Sports', organizer: 'Sports Committee', status: 'Published' },
    { id: '5', title: 'Library Reading Week', date: '16–20 Nov 2026', category: 'Library', organizer: 'Library Team', status: 'Published' },
    { id: '6', title: 'Winter Cultural Program', date: '28 Nov 2026', category: 'Cultural', organizer: 'Cultural Club', status: 'Draft' },
    { id: '7', title: 'Admission Orientation', date: '03 Dec 2026', category: 'Admission', organizer: 'Admission Office', status: 'Published' },
    { id: '8', title: 'Final Examination Briefing', date: '06 Dec 2026', category: 'Academic', organizer: 'Exam Committee', status: 'Scheduled' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Published':
        return <Badge variant="success">{status}</Badge>;
      case 'Draft':
        return <Badge variant="neutral">{status}</Badge>;
      case 'Scheduled':
        return <Badge variant="info">{status}</Badge>;
      default:
        return <Badge variant="neutral">{status}</Badge>;
    }
  };

  return (
    <div className="edusync-destination-view">
      {/* BREADCRUMB */}
      <nav className="edusync-dash-breadcrumb">
        <span onClick={() => onNavigate('OVERVIEW')} style={{ cursor: 'pointer' }}>Maple Grove School</span>
        <span className="edusync-dash-breadcrumb__separator">&gt;</span>
        <span onClick={() => onNavigate('OVERVIEW')} style={{ cursor: 'pointer' }}>Dashboard</span>
        <span className="edusync-dash-breadcrumb__separator">&gt;</span>
        <span className="edusync-dash-breadcrumb__current">Upcoming Events</span>
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
            <h1 className="edusync-destination-title" style={{ margin: 0 }}>Upcoming Events</h1>
          </div>
          <p className="edusync-destination-subtitle" style={{ marginTop: '4px' }}>
            Browse school events, dates, organizers, and publication status.
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
            placeholder="Search events by title, category, or organizer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select className="edusync-destination-select">
          <option>All categories</option>
          <option>Academic</option>
          <option>Sports</option>
          <option>Meeting</option>
        </select>
        <select className="edusync-destination-select">
          <option>All statuses</option>
          <option>Published</option>
          <option>Draft</option>
          <option>Scheduled</option>
        </select>
        <Button variant="primary" size="md" fullWidth={false}>
          Apply filters
        </Button>
      </div>

      {/* 4 STATS ROW */}
      <div className="edusync-destination-stats-grid">
        <StatCard label="Total events" value="24" />
        <StatCard label="Upcoming" value="8" />
        <StatCard label="This month" value="6" />
        <StatCard label="Completed" value="16" />
      </div>

      {/* DATA TABLE */}
      <div className="edusync-destination-table-card">
        <div className="edusync-destination-table-header">
          <h3 className="edusync-destination-table-title">School events calendar list</h3>
          <p className="edusync-destination-table-desc">
            Browse school events, dates, organizers, and publication status.
          </p>
        </div>

        <div className="edusync-dash-table-wrapper">
          <table className="edusync-dash-table">
            <thead>
              <tr>
                <th>Event</th>
                <th>Date</th>
                <th>Category</th>
                <th>Organizer</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {events.map((row) => (
                <tr key={row.id}>
                  <td><strong>{row.title}</strong></td>
                  <td>{row.date}</td>
                  <td>{row.category}</td>
                  <td>{row.organizer}</td>
                  <td>{getStatusBadge(row.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="edusync-destination-table-footer">
          <span>Showing 1–8 of 24 events</span>
          <Pagination currentPage={currentPage} totalPages={3} onPageChange={setCurrentPage} />
        </div>
      </div>
    </div>
  );
};
