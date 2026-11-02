import React from 'react';
import { useReportsFlow } from '../../../../application/state/reports-flow.context';
import { Badge } from '../../../widgets/Badge/Badge';
import { ReportFiltersBar } from '../components/ReportFiltersBar';

export const ReportsAttendanceLibraryScreen: React.FC = () => {
  const { attendanceData, isLoading, openExportModal } = useReportsFlow();

  if (isLoading || !attendanceData) {
    return <div style={{ padding: '40px', textAlign: 'center', color: '#667085' }}>Loading attendance & library reports...</div>;
  }

  const { kpis, attendanceByWeek, libraryActivity, details } = attendanceData;

  const maxAttendanceRate = 100;
  const maxLibrary = 300;

  return (
    <div>
      {/* 4 KPI Cards */}
      <div className="reports-kpis-grid">
        <div className="reports-kpi-card reports-kpi-card--blue">
          <div className="reports-kpi-label">Average attendance</div>
          <div className="reports-kpi-value">{kpis.avgAttendance}</div>
          <div className="reports-kpi-sub">{kpis.avgAttendanceSub}</div>
        </div>

        <div className="reports-kpi-card reports-kpi-card--red">
          <div className="reports-kpi-label">Absent records</div>
          <div className="reports-kpi-value">{kpis.absentRecords}</div>
          <div className="reports-kpi-sub">{kpis.absentRecordsSub}</div>
        </div>

        <div className="reports-kpi-card reports-kpi-card--purple">
          <div className="reports-kpi-label">Books issued</div>
          <div className="reports-kpi-value">{kpis.booksIssued}</div>
          <div className="reports-kpi-sub">{kpis.booksIssuedSub}</div>
        </div>

        <div className="reports-kpi-card reports-kpi-card--amber">
          <div className="reports-kpi-label">Overdue loans</div>
          <div className="reports-kpi-value">{kpis.overdueLoans}</div>
          <div className="reports-kpi-sub">{kpis.overdueLoansSub}</div>
        </div>
      </div>

      {/* Filter Bar (Placed directly beneath KPI cards for consistency with all modules) */}
      <ReportFiltersBar />

      {/* 2 Charts in 50/50 Row */}
      <div className="reports-charts-row">
        {/* Left: Attendance by week */}
        <div className="reports-card">
          <div className="reports-card-header">
            <h3 className="reports-card-title">Attendance by week</h3>
            <p className="reports-card-subtitle">Weekly school-wide student presence percentages</p>
          </div>
          <div className="reports-barchart">
            {attendanceByWeek.map((pt) => {
              const heightPercent = Math.round((pt.rate / maxAttendanceRate) * 100);
              return (
                <div key={pt.week} className="reports-bar-col">
                  <span className="reports-bar-val">{pt.rate}%</span>
                  <div
                    className="reports-bar reports-bar--blue"
                    style={{ height: `${heightPercent}%` }}
                    title={`${pt.week}: ${pt.rate}% attendance`}
                  />
                  <span className="reports-bar-label">{pt.week}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Library activity */}
        <div className="reports-card">
          <div className="reports-card-header">
            <h3 className="reports-card-title">Library activity</h3>
            <p className="reports-card-subtitle">Monthly circulation volume and checkout requests</p>
          </div>
          <div className="reports-barchart">
            {libraryActivity.map((pt) => {
              const heightPercent = Math.round((pt.count / maxLibrary) * 100);
              return (
                <div key={pt.month} className="reports-bar-col">
                  <span className="reports-bar-val">{pt.count}</span>
                  <div
                    className="reports-bar reports-bar--green"
                    style={{ height: `${heightPercent}%` }}
                    title={`${pt.month}: ${pt.count} books`}
                  />
                  <span className="reports-bar-label">{pt.month}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Table: Attendance and library details */}
      <div className="reports-card" style={{ marginBottom: '24px' }}>
        <div className="reports-card-header">
          <h3 className="reports-card-title">Attendance and library details</h3>
          <p className="reports-card-subtitle">Consolidated operational telemetry across academic units</p>
        </div>
        <div className="reports-table-wrap">
          <table className="reports-table">
            <thead>
              <tr>
                <th>CATEGORY</th>
                <th>GROUP</th>
                <th>TOTAL</th>
                <th>RATE / STATUS</th>
                <th>PERIOD</th>
                <th>DETAILS</th>
              </tr>
            </thead>
            <tbody>
              {details.map((row) => (
                <tr key={row.id}>
                  <td style={{ fontWeight: 600, color: 'var(--edusync-text-navy, #14213D)' }}>
                    {row.category}
                  </td>
                  <td style={{ color: 'var(--edusync-text-secondary, #667085)' }}>{row.group}</td>
                  <td style={{ fontWeight: 500, color: 'var(--edusync-text-primary, #172033)' }}>
                    {row.total}
                  </td>
                  <td>
                    {row.category === 'Attendance' ? (
                      <span style={{ fontWeight: 600, color: '#15803D' }}>{row.rateStatus}</span>
                    ) : (
                      <Badge
                        variant={row.rateStatus === 'Active' ? 'success' : 'warning'}
                      >
                        {row.rateStatus}
                      </Badge>
                    )}
                  </td>
                  <td style={{ color: 'var(--edusync-text-secondary, #667085)' }}>{row.period}</td>
                  <td>
                    <button
                      type="button"
                      className="reports-table-action-link"
                      onClick={() => openExportModal(`${row.category} - ${row.group}`)}
                    >
                      {row.category === 'Attendance'
                        ? 'View report'
                        : row.rateStatus === 'Active'
                        ? 'View history'
                        : 'View details'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
