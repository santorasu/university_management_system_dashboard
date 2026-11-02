import React from 'react';
import { useReportsFlow } from '../../../../application/state/reports-flow.context';
import { ReportFiltersBar } from '../components/ReportFiltersBar';

export const ReportsFeesPaymentsScreen: React.FC = () => {
  const { feesData, isLoading, openExportModal } = useReportsFlow();

  if (isLoading || !feesData) {
    return <div style={{ padding: '40px', textAlign: 'center', color: '#667085' }}>Loading fee reports...</div>;
  }

  const { kpis, monthlyFeeLakhs, paymentStatusBreakdown, outstandingDues } = feesData;
  const maxFeeLakh = 5.5;

  return (
    <div>
      {/* 4 KPI Cards */}
      <div className="reports-kpis-grid">
        <div className="reports-kpi-card reports-kpi-card--blue">
          <div className="reports-kpi-label">Fees assigned</div>
          <div className="reports-kpi-value">{kpis.feesAssigned}</div>
          <div className="reports-kpi-sub">{kpis.feesAssignedSub}</div>
        </div>

        <div className="reports-kpi-card reports-kpi-card--emerald">
          <div className="reports-kpi-label">Collected</div>
          <div className="reports-kpi-value">{kpis.collected}</div>
          <div className="reports-kpi-sub">{kpis.collectedSub}</div>
        </div>

        <div className="reports-kpi-card reports-kpi-card--purple">
          <div className="reports-kpi-label">Outstanding dues</div>
          <div className="reports-kpi-value">{kpis.outstandingDues}</div>
          <div className="reports-kpi-sub">{kpis.outstandingDuesSub}</div>
        </div>

        <div className="reports-kpi-card reports-kpi-card--red">
          <div className="reports-kpi-label">Overdue balance</div>
          <div className="reports-kpi-value">{kpis.overdueBalance}</div>
          <div className="reports-kpi-sub">{kpis.overdueBalanceSub}</div>
        </div>
      </div>

      {/* Filter Bar (Placed directly beneath KPI cards for consistency with all modules) */}
      <ReportFiltersBar />

      {/* 2 Charts in 50/50 Row */}
      <div className="reports-charts-row">
        {/* Left: Monthly fee collection (৳ lakh) */}
        <div className="reports-card">
          <div className="reports-card-header">
            <h3 className="reports-card-title">Monthly fee collection (৳ lakh)</h3>
            <p className="reports-card-subtitle">Fee realization trend in lakh BDT per academic month</p>
          </div>
          <div className="reports-barchart">
            {monthlyFeeLakhs.map((pt) => {
              const heightPercent = Math.round((pt.amount / maxFeeLakh) * 100);
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

        {/* Right: Payment status breakdown */}
        <div className="reports-card">
          <div className="reports-card-header">
            <h3 className="reports-card-title">Payment status breakdown</h3>
            <p className="reports-card-subtitle">Share by status</p>
          </div>
          <div className="reports-shares-list">
            {paymentStatusBreakdown.map((item) => (
              <div key={item.status} className="reports-share-row">
                <div className="reports-share-left">
                  <div className="reports-share-dot" style={{ background: item.color }} />
                  <span className="reports-share-label">{item.status}</span>
                </div>
                <span className="reports-share-val">{item.share}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Table: Outstanding dues by class */}
      <div className="reports-card" style={{ marginBottom: '24px' }}>
        <div className="reports-card-header">
          <h3 className="reports-card-title">Outstanding dues by class</h3>
          <p className="reports-card-subtitle">Invoices, pending receivables, and recovery efficiency</p>
        </div>
        <div className="reports-table-wrap">
          <table className="reports-table">
            <thead>
              <tr>
                <th>CLASS</th>
                <th>INVOICES</th>
                <th>OUTSTANDING</th>
                <th>OVERDUE</th>
                <th>COLLECTION RATE</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {outstandingDues.map((row) => (
                <tr key={row.classGrade}>
                  <td style={{ fontWeight: 600, color: 'var(--edusync-text-navy, #14213D)' }}>
                    {row.classGrade}
                  </td>
                  <td style={{ color: 'var(--edusync-text-secondary, #667085)' }}>{row.invoices}</td>
                  <td style={{ fontWeight: 600, color: 'var(--edusync-text-navy, #14213D)' }}>
                    {row.outstanding}
                  </td>
                  <td style={{ fontWeight: 600, color: '#DC2626' }}>{row.overdue}</td>
                  <td style={{ fontWeight: 600, color: '#15803D' }}>{row.collectionRate}</td>
                  <td>
                    <button
                      type="button"
                      className="reports-table-action-link"
                      onClick={() => openExportModal(`Outstanding Dues - ${row.classGrade}`)}
                    >
                      View details
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
