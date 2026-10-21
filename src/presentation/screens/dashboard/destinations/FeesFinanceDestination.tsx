import React from 'react';
import { StatCard } from '../components/StatCard';
import { Button } from '../../../widgets/Button/Button';
import type { DashboardDestination } from '../../../../core/entities/auth.types';

interface DestinationProps {
  onNavigate: (destination: DashboardDestination) => void;
}

export const FeesFinanceDestination: React.FC<DestinationProps> = ({ onNavigate }) => {
  const collectionDays = [
    { day: 'Mon', pct: 60 },
    { day: 'Tue', pct: 75 },
    { day: 'Wed', pct: 70 },
    { day: 'Thu', pct: 86 },
    { day: 'Fri', pct: 90 },
    { day: 'Sat', pct: 100 },
  ];

  const classRows = [
    { name: 'Class 6', assigned: '৳18,50,000', collected: '৳16,92,000', due: '৳1,58,000' },
    { name: 'Class 7', assigned: '৳9,10,000', collected: '৳6,85,000', due: '৳2,25,000' },
    { name: 'Class 8', assigned: '৳18,90,000', collected: '৳17,12,000', due: '৳1,78,000' },
  ];

  return (
    <div className="edusync-destination-view">
      {/* BREADCRUMB */}
      <nav className="edusync-dash-breadcrumb">
        <span onClick={() => onNavigate('OVERVIEW')} style={{ cursor: 'pointer' }}>Maple Grove School</span>
        <span className="edusync-dash-breadcrumb__separator">&gt;</span>
        <span onClick={() => onNavigate('OVERVIEW')} style={{ cursor: 'pointer' }}>Dashboard</span>
        <span className="edusync-dash-breadcrumb__separator">&gt;</span>
        <span className="edusync-dash-breadcrumb__current">Fees &amp; Finance Report</span>
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
            <h1 className="edusync-destination-title" style={{ margin: 0 }}>Fees &amp; Finance Report</h1>
          </div>
          <p className="edusync-destination-subtitle" style={{ marginTop: '4px' }}>
            Fee collection, outstanding balances, and payment summaries.
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
          <option>Quarter 1</option>
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
        <StatCard label="Fees assigned" value="৳48,50,000" />
        <StatCard label="Collected" value="৳36,72,500" />
        <StatCard label="Outstanding" value="৳11,77,500" />
        <StatCard label="Overdue" value="৳3,26,000" />
      </div>

      {/* 2-COLUMN SECTION */}
      <div className="edusync-report-two-col">
        {/* Fee collection vs outstanding */}
        <div className="edusync-destination-table-card">
          <div className="edusync-destination-table-header">
            <h3 className="edusync-destination-table-title">Fee collection vs outstanding</h3>
            <p className="edusync-destination-table-desc">Monthly fee collection overview · 2026–27</p>
          </div>
          <div className="edusync-bar-chart-container">
            {collectionDays.map((d) => (
              <div key={d.day} className="edusync-bar-chart-col">
                <div className="edusync-bar-chart-track">
                  <div className="edusync-bar-chart-fill" style={{ height: `${d.pct}%` }} />
                </div>
                <span className="edusync-bar-chart-label">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Finance summary */}
        <div className="edusync-destination-table-card">
          <div className="edusync-destination-table-header">
            <h3 className="edusync-destination-table-title">Finance summary</h3>
          </div>
          <div className="edusync-insights-list">
            <div className="edusync-insight-box">
              Collection rate: 75.7%
            </div>
            <div className="edusync-insight-box">
              Paid invoices: 1,248
            </div>
            <div className="edusync-insight-box">
              Partially paid: 83
            </div>
            <div className="edusync-insight-box">
              Overdue accounts: 147
            </div>
          </div>
        </div>
      </div>

      {/* CLASS BREAKDOWN TABLE */}
      <div className="edusync-destination-table-card">
        <div className="edusync-destination-table-header">
          <h3 className="edusync-destination-table-title">Fee collection by class</h3>
        </div>
        <div className="edusync-dash-table-wrapper">
          <table className="edusync-dash-table">
            <thead>
              <tr>
                <th>Class</th>
                <th>Assigned</th>
                <th>Collected</th>
                <th>Due</th>
              </tr>
            </thead>
            <tbody>
              {classRows.map((row) => (
                <tr key={row.name}>
                  <td><strong>{row.name}</strong></td>
                  <td>{row.assigned}</td>
                  <td>{row.collected}</td>
                  <td>{row.due}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
