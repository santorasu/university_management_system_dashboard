import React from 'react';
import { StatCard } from '../components/StatCard';
import { Button } from '../../../widgets/Button/Button';
import type { DashboardDestination } from '../../../../core/entities/auth.types';

interface DestinationProps {
  onNavigate: (destination: DashboardDestination) => void;
}

export const AttendanceReportDestination: React.FC<DestinationProps> = ({ onNavigate }) => {
  const trendDays = [
    { day: 'Mon', pct: 92 },
    { day: 'Tue', pct: 95 },
    { day: 'Wed', pct: 94 },
    { day: 'Thu', pct: 97.2 },
    { day: 'Fri', pct: 96 },
    { day: 'Sat', pct: 98 },
  ];

  const classRows = [
    { name: 'Class 6', attendance: '95.2%', present: '412', absent: '21' },
    { name: 'Class 7', attendance: '94.1%', present: '393', absent: '25' },
    { name: 'Class 8', attendance: '93.8%', present: '386', absent: '28' },
  ];

  return (
    <div className="edusync-destination-view">
      {/* BREADCRUMB */}
      <nav className="edusync-dash-breadcrumb">
        <span onClick={() => onNavigate('OVERVIEW')} style={{ cursor: 'pointer' }}>Maple Grove School</span>
        <span className="edusync-dash-breadcrumb__separator">&gt;</span>
        <span onClick={() => onNavigate('OVERVIEW')} style={{ cursor: 'pointer' }}>Dashboard</span>
        <span className="edusync-dash-breadcrumb__separator">&gt;</span>
        <span className="edusync-dash-breadcrumb__current">Attendance Report</span>
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
            <h1 className="edusync-destination-title" style={{ margin: 0 }}>Attendance Report</h1>
          </div>
          <p className="edusync-destination-subtitle" style={{ marginTop: '4px' }}>
            Detailed attendance trends, class breakdowns, and absence indicators.
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
        <select className="edusync-destination-select">
          <option>Date range: 12–19 Oct 2026</option>
          <option>Last 30 Days</option>
          <option>Term 1 Total</option>
        </select>
        <select className="edusync-destination-select">
          <option>Academic year: 2026–27</option>
          <option>Academic year: 2025–26</option>
        </select>
        <select className="edusync-destination-select">
          <option>All classes</option>
          <option>Class 6</option>
          <option>Class 7</option>
          <option>Class 8</option>
        </select>
        <Button variant="primary" size="md" fullWidth={false}>
          Apply filters
        </Button>
      </div>

      {/* 4 STATS ROW */}
      <div className="edusync-destination-stats-grid">
        <StatCard label="Average attendance" value="94.6%" />
        <StatCard label="Present today" value="1,248" />
        <StatCard label="Absent today" value="71" />
        <StatCard label="Trend" value="↑ 2.4%" trend="↑ 2.4%" isPositive />
      </div>

      {/* 2-COLUMN SECTION: CHART + INSIGHTS */}
      <div className="edusync-report-two-col">
        {/* Attendance trend by school day */}
        <div className="edusync-destination-table-card">
          <div className="edusync-destination-table-header">
            <h3 className="edusync-destination-table-title">Attendance trend by school day</h3>
            <p className="edusync-destination-table-desc">Daily attendance percentage · 12–16 October</p>
          </div>
          <div className="edusync-bar-chart-container">
            {trendDays.map((d) => (
              <div key={d.day} className="edusync-bar-chart-col">
                <div className="edusync-bar-chart-track">
                  <div className="edusync-bar-chart-fill" style={{ height: `${d.pct}%` }} />
                </div>
                <span className="edusync-bar-chart-label">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Attendance insights */}
        <div className="edusync-destination-table-card">
          <div className="edusync-destination-table-header">
            <h3 className="edusync-destination-table-title">Attendance insights</h3>
          </div>
          <div className="edusync-insights-list">
            <div className="edusync-insight-box">
              Highest attendance: Thursday · 97.2%
            </div>
            <div className="edusync-insight-box">
              Lowest attendance: Tuesday · 91.8%
            </div>
            <div className="edusync-insight-box">
              Students with repeated absences: 18
            </div>
            <div className="edusync-insight-box">
              Notifications sent this week: 34
            </div>
          </div>
        </div>
      </div>

      {/* CLASS BREAKDOWN TABLE */}
      <div className="edusync-destination-table-card">
        <div className="edusync-destination-table-header">
          <h3 className="edusync-destination-table-title">Attendance by class</h3>
        </div>
        <div className="edusync-dash-table-wrapper">
          <table className="edusync-dash-table">
            <thead>
              <tr>
                <th>Class</th>
                <th>Attendance</th>
                <th>Present</th>
                <th>Absent</th>
              </tr>
            </thead>
            <tbody>
              {classRows.map((row) => (
                <tr key={row.name}>
                  <td><strong>{row.name}</strong></td>
                  <td>{row.attendance}</td>
                  <td>{row.present}</td>
                  <td>{row.absent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
