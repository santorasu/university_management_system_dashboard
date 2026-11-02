import React from 'react';
import { useReportsFlow } from '../../../../application/state/reports-flow.context';
import { Badge } from '../../../widgets/Badge/Badge';
import { ReportFiltersBar } from '../components/ReportFiltersBar';

export const ReportsOverviewScreen: React.FC = () => {
  const { overviewData, isLoading } = useReportsFlow();

  if (isLoading || !overviewData) {
    return <div style={{ padding: '40px', textAlign: 'center', color: '#667085' }}>Loading reports data...</div>;
  }

  const { kpis, enrollmentTrend, monthlyFeeCollection, recentActivity, categoryShares } = overviewData;

  // Max value for scaling chart bars
  const maxEnrollment = 320;
  const maxFee = 55;

  return (
    <div>
      {/* 4 KPI Cards */}
      <div className="reports-kpis-grid">
        <div className="reports-kpi-card reports-kpi-card--blue">
          <div className="reports-kpi-label">Students enrolled</div>
          <div className="reports-kpi-value">{kpis.studentsEnrolled.toLocaleString()}</div>
          <div className="reports-kpi-sub">{kpis.studentsEnrolledSub}</div>
        </div>

        <div className="reports-kpi-card reports-kpi-card--emerald">
          <div className="reports-kpi-label">Attendance rate</div>
          <div className="reports-kpi-value">{kpis.attendanceRate}</div>
          <div className="reports-kpi-sub">{kpis.attendanceRateSub}</div>
        </div>

        <div className="reports-kpi-card reports-kpi-card--purple">
          <div className="reports-kpi-label">Exam pass rate</div>
          <div className="reports-kpi-value">{kpis.examPassRate}</div>
          <div className="reports-kpi-sub">{kpis.examPassRateSub}</div>
        </div>

        <div className="reports-kpi-card reports-kpi-card--amber">
          <div className="reports-kpi-label">Fees collected</div>
          <div className="reports-kpi-value">{kpis.feesCollected}</div>
          <div className="reports-kpi-sub">{kpis.feesCollectedSub}</div>
        </div>
      </div>

      {/* Filter Bar (Placed directly beneath KPI cards for consistency with all modules) */}
      <ReportFiltersBar />

      {/* 2 Charts in 50/50 Row */}
      <div className="reports-charts-row">
        {/* Left: Enrollment Trend */}
        <div className="reports-card">
          <div className="reports-card-header">
            <h3 className="reports-card-title">Enrollment trend</h3>
            <p className="reports-card-subtitle">Summary by period / category</p>
          </div>
          <div className="reports-barchart">
            {enrollmentTrend.map((pt) => {
              const heightPercent = Math.round((pt.count / maxEnrollment) * 100);
              return (
                <div key={pt.month} className="reports-bar-col">
                  <span className="reports-bar-val">{pt.count}</span>
                  <div
                    className="reports-bar reports-bar--blue"
                    style={{ height: `${heightPercent}%` }}
                    title={`${pt.month}: ${pt.count} students`}
                  />
                  <span className="reports-bar-label">{pt.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Monthly Fee Collection */}
        <div className="reports-card">
          <div className="reports-card-header">
            <h3 className="reports-card-title">Monthly fee collection</h3>
            <p className="reports-card-subtitle">Summary by period / category</p>
          </div>
          <div className="reports-barchart">
            {monthlyFeeCollection.map((pt) => {
              const heightPercent = Math.round((pt.amount / maxFee) * 100);
              return (
                <div key={pt.month} className="reports-bar-col">
                  <span className="reports-bar-val">{pt.amount}</span>
                  <div
                    className="reports-bar reports-bar--green"
                    style={{ height: `${heightPercent}%` }}
                    title={`${pt.month}: ৳${pt.amount}L`}
                  />
                  <span className="reports-bar-label">{pt.month}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Split Row: Recent report activity (63%) & Report categories (35%) */}
      <div className="reports-split-row">
        {/* Left: Recent Activity Table */}
        <div className="reports-card">
          <div className="reports-card-header">
            <h3 className="reports-card-title">Recent report activity</h3>
            <p className="reports-card-subtitle">Detailed breakdown for the selected filters</p>
          </div>
          <div className="reports-table-wrap">
            <table className="reports-table">
              <thead>
                <tr>
                  <th>REPORT</th>
                  <th>PERIOD</th>
                  <th>UPDATED</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {recentActivity.map((row) => (
                  <tr key={row.id}>
                    <td style={{ fontWeight: 500, color: 'var(--edusync-text-navy, #14213D)' }}>
                      {row.report}
                    </td>
                    <td style={{ color: 'var(--edusync-text-secondary, #667085)' }}>{row.period}</td>
                    <td style={{ color: 'var(--edusync-text-secondary, #667085)' }}>{row.updated}</td>
                    <td>
                      <Badge variant="success">
                        {row.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Report Categories */}
        <div className="reports-card">
          <div className="reports-card-header">
            <h3 className="reports-card-title">Report categories</h3>
            <p className="reports-card-subtitle">Share by status</p>
          </div>
          <div className="reports-shares-list">
            {categoryShares.map((cat) => (
              <div key={cat.category} className="reports-share-row">
                <div className="reports-share-left">
                  <div className="reports-share-dot" style={{ background: cat.color }} />
                  <span className="reports-share-label">{cat.category}</span>
                </div>
                <span className="reports-share-val">{cat.share}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
