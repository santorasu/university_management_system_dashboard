import React from 'react';
import { useReportsFlow } from '../../../../application/state/reports-flow.context';
import { Badge } from '../../../widgets/Badge/Badge';
import { ReportFiltersBar } from '../components/ReportFiltersBar';

export const ReportsAcademicPerformanceScreen: React.FC = () => {
  const { academicData, isLoading } = useReportsFlow();

  if (isLoading || !academicData) {
    return <div style={{ padding: '40px', textAlign: 'center', color: '#667085' }}>Loading academic data...</div>;
  }

  const { kpis, enrollmentTrend, classPerformance, examResults } = academicData;
  const maxEnrollment = 320;

  return (
    <div>
      {/* 4 KPI Cards */}
      <div className="reports-kpis-grid">
        <div className="reports-kpi-card reports-kpi-card--blue">
          <div className="reports-kpi-label">Total students</div>
          <div className="reports-kpi-value">{kpis.totalStudents.toLocaleString()}</div>
          <div className="reports-kpi-sub">{kpis.totalStudentsSub}</div>
        </div>

        <div className="reports-kpi-card reports-kpi-card--emerald">
          <div className="reports-kpi-label">Teachers</div>
          <div className="reports-kpi-value">{kpis.teachers}</div>
          <div className="reports-kpi-sub">{kpis.teachersSub}</div>
        </div>

        <div className="reports-kpi-card reports-kpi-card--purple">
          <div className="reports-kpi-label">Classes / sections</div>
          <div className="reports-kpi-value">{kpis.classesSections}</div>
          <div className="reports-kpi-sub">{kpis.classesSectionsSub}</div>
        </div>

        <div className="reports-kpi-card reports-kpi-card--amber">
          <div className="reports-kpi-label">Exam pass rate</div>
          <div className="reports-kpi-value">{kpis.examPassRate}</div>
          <div className="reports-kpi-sub">{kpis.examPassRateSub}</div>
        </div>
      </div>

      {/* Filter Bar (Placed directly beneath KPI cards for consistency with all modules) */}
      <ReportFiltersBar />

      {/* 2 Charts in 50/50 Row */}
      <div className="reports-charts-row">
        {/* Left: Enrollment by month */}
        <div className="reports-card">
          <div className="reports-card-header">
            <h3 className="reports-card-title">Enrollment by month</h3>
            <p className="reports-card-subtitle">Student enrollment trajectory across academic terms</p>
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
                    title={`${pt.month}: ${pt.count}`}
                  />
                  <span className="reports-bar-label">{pt.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Class performance (Horizontal progress bars) */}
        <div className="reports-card">
          <div className="reports-card-header">
            <h3 className="reports-card-title">Class performance</h3>
            <p className="reports-card-subtitle">Average benchmark completion by grade level</p>
          </div>
          <div className="reports-hbar-list" style={{ marginTop: '16px' }}>
            {classPerformance.map((cp) => (
              <div key={cp.classGrade} className="reports-hbar-item">
                <span className="reports-hbar-label">{cp.classGrade}</span>
                <div className="reports-hbar-track">
                  <div className="reports-hbar-fill" style={{ width: `${cp.rate}%` }} />
                </div>
                <span className="reports-hbar-val">{cp.rate}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Table: Examination results by class */}
      <div className="reports-card" style={{ marginBottom: '24px' }}>
        <div className="reports-card-header">
          <h3 className="reports-card-title">Examination results by class</h3>
          <p className="reports-card-subtitle">Comprehensive breakdown of student averages, pass rates, and published state</p>
        </div>
        <div className="reports-table-wrap">
          <table className="reports-table">
            <thead>
              <tr>
                <th>CLASS</th>
                <th>STUDENTS</th>
                <th>AVERAGE</th>
                <th>PASS RATE</th>
                <th>TOP SUBJECT</th>
                <th>PUBLISHED</th>
              </tr>
            </thead>
            <tbody>
              {examResults.map((row) => (
                <tr key={row.classGrade}>
                  <td style={{ fontWeight: 600, color: 'var(--edusync-text-navy, #14213D)' }}>
                    {row.classGrade}
                  </td>
                  <td style={{ color: 'var(--edusync-text-secondary, #667085)' }}>{row.students}</td>
                  <td style={{ fontWeight: 500, color: 'var(--edusync-text-primary, #172033)' }}>
                    {row.average}
                  </td>
                  <td style={{ fontWeight: 600, color: '#15803D' }}>{row.passRate}</td>
                  <td>
                    <span
                      style={{
                        padding: '4px 10px',
                        background: 'var(--edusync-surface-subtle, #F2F4F7)',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: 500,
                        color: 'var(--edusync-text-navy, #14213D)',
                      }}
                    >
                      {row.topSubject}
                    </span>
                  </td>
                  <td>
                    <Badge variant={row.published === 'Yes' ? 'success' : 'neutral'}>
                      {row.published}
                    </Badge>
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
