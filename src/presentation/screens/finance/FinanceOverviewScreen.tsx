import React from 'react';
import { useFinance } from '../../../application/state/finance-flow.context';
import type { MonthlyCollectionItem, Invoice } from '../../../core/entities/finance.types';
import { FinanceNavTabs } from './components/FinanceNavTabs';
import { FinanceKpiCards } from './components/FinanceKpiCards';
import { FinanceQuickActions } from './components/FinanceQuickActions';

interface FinanceOverviewScreenProps {
  onNavigateToDashboard?: () => void;
}

export const FinanceOverviewScreen: React.FC<FinanceOverviewScreenProps> = ({
  onNavigateToDashboard,
}) => {
  const {
    kpis,
    invoices,
    setCurrentScreen,
    openRecordPaymentModal,
    openAssignFeeModal,
  } = useFinance();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Paid':
        return <span className="finance-badge finance-badge--paid">Paid</span>;
      case 'Partially Paid':
        return <span className="finance-badge finance-badge--partially-paid">Partially Paid</span>;
      case 'Pending':
        return <span className="finance-badge finance-badge--pending">Pending</span>;
      case 'Overdue':
        return <span className="finance-badge finance-badge--overdue">Overdue</span>;
      default:
        return <span className="finance-badge finance-badge--failed">{status}</span>;
    }
  };

  const recentInvoices = invoices.slice(0, 4);

  return (
    <div className="finance-container">
      {/* 1. HERO HEADER */}
      <div className="finance-hero">
        <div>
          <nav className="finance-hero__crumbs" aria-label="Breadcrumb">
            <button
              type="button"
              className="finance-hero__crumb--link"
              onClick={onNavigateToDashboard}
            >
              Dashboard
            </button>
            <span className="finance-hero__crumb-sep">/</span>
            <button
              type="button"
              className="finance-hero__crumb--link"
              onClick={() => setCurrentScreen('OVERVIEW')}
            >
              Fees & Finance
            </button>
            <span className="finance-hero__crumb-sep">/</span>
            <span className="finance-hero__crumb--current">Overview</span>
          </nav>

          <div className="finance-hero__title-row">
            <button
              type="button"
              className="finance-hero__back-btn"
              onClick={onNavigateToDashboard}
              title="Return to Dashboard"
            >
              ←
            </button>
            <div>
              <h1 className="finance-hero__title">Fees & Finance — Overview</h1>
              <p className="finance-hero__subtitle">
                Track fee collections, overdue payments and student invoices for academic year 2026–27.
              </p>
            </div>
          </div>
        </div>

        <div className="finance-hero__actions">
          <button
            type="button"
            className="edusync-btn edusync-btn--secondary"
            style={{ borderRadius: 8, padding: '9px 16px', fontSize: 13, fontWeight: 600 }}
            onClick={openAssignFeeModal}
          >
            + Assign Fees
          </button>
          <button
            type="button"
            className="edusync-btn edusync-btn--primary"
            style={{ borderRadius: 8, padding: '9px 18px', fontSize: 13, fontWeight: 600 }}
            onClick={() => openRecordPaymentModal()}
          >
            Record Payment
          </button>
        </div>
      </div>

      {/* 2. SUB-NAVIGATION TABS */}
      <FinanceNavTabs />

      {/* 3. 4 KPI METRIC CARDS */}
      <FinanceKpiCards stats={kpis} variant="overview" />

      {/* 4. MAIN SPLIT: MONTHLY COLLECTION CHART + PAYMENT STATUS BREAKDOWN */}
      <div className="finance-split-row">
        {/* Monthly Collection Bar Chart */}
        <div className="finance-card">
          <div className="finance-card__header-row">
            <div className="finance-card__header-group">
              <h3 className="finance-card__title">Monthly Fee Collection</h3>
              <p className="finance-card__subtitle">Academic Year 2026–27 · Collections in BDT (৳)</p>
            </div>
            <button
              type="button"
              className="finance-card__action-link"
              onClick={() => setCurrentScreen('DUES_REPORTS')}
            >
              View Report →
            </button>
          </div>

          <div className="finance-chart-container">
            {kpis?.monthlyCollections.map((item: MonthlyCollectionItem) => (
              <div key={item.month} className="finance-chart-col">
                <div className="finance-chart-bar-wrap">
                  <div
                    className="finance-chart-bar-fill"
                    style={{ height: `${item.heightPercent}%` }}
                  />
                  <div className="finance-chart-bar-tooltip">
                    ৳ {item.amount.toLocaleString()}
                  </div>
                </div>
                <span className="finance-chart-month">{item.month}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#667085', paddingTop: 6 }}>
            <span>Target: ৳ 50,00,000 / month</span>
            <span>Average Collection: ৳ 4,59,000 / month</span>
          </div>
        </div>

        {/* Payment Status Breakdown */}
        <div className="finance-card">
          <div className="finance-card__header-group">
            <h3 className="finance-card__title">Payment Status Breakdown</h3>
            <p className="finance-card__subtitle">Current academic term distribution</p>
          </div>

          <div className="finance-breakdown-list">
            {/* Paid */}
            <div className="finance-breakdown-item">
              <div className="finance-breakdown-top">
                <div className="finance-breakdown-left">
                  <div className="finance-breakdown-dot" style={{ backgroundColor: '#148C57' }} />
                  <span className="finance-breakdown-label">Paid</span>
                </div>
                <span className="finance-breakdown-val">
                  ৳ {kpis?.paymentStatusBreakdown.paid.toLocaleString()}
                </span>
              </div>
              <div className="finance-progress-track">
                <div
                  className="finance-progress-fill"
                  style={{ width: '75.7%', backgroundColor: '#148C57' }}
                />
              </div>
            </div>

            {/* Pending */}
            <div className="finance-breakdown-item">
              <div className="finance-breakdown-top">
                <div className="finance-breakdown-left">
                  <div className="finance-breakdown-dot" style={{ backgroundColor: '#B86E0F' }} />
                  <span className="finance-breakdown-label">Pending</span>
                </div>
                <span className="finance-breakdown-val">
                  ৳ {kpis?.paymentStatusBreakdown.pending.toLocaleString()}
                </span>
              </div>
              <div className="finance-progress-track">
                <div
                  className="finance-progress-fill"
                  style={{ width: '10.7%', backgroundColor: '#B86E0F' }}
                />
              </div>
            </div>

            {/* Overdue */}
            <div className="finance-breakdown-item">
              <div className="finance-breakdown-top">
                <div className="finance-breakdown-left">
                  <div className="finance-breakdown-dot" style={{ backgroundColor: '#C23838' }} />
                  <span className="finance-breakdown-label">Overdue</span>
                </div>
                <span className="finance-breakdown-val">
                  ৳ {kpis?.paymentStatusBreakdown.overdue.toLocaleString()}
                </span>
              </div>
              <div className="finance-progress-track">
                <div
                  className="finance-progress-fill"
                  style={{ width: '6.7%', backgroundColor: '#C23838' }}
                />
              </div>
            </div>

            {/* Partially Paid */}
            <div className="finance-breakdown-item">
              <div className="finance-breakdown-top">
                <div className="finance-breakdown-left">
                  <div className="finance-breakdown-dot" style={{ backgroundColor: '#3659D9' }} />
                  <span className="finance-breakdown-label">Partially Paid</span>
                </div>
                <span className="finance-breakdown-val">
                  ৳ {kpis?.paymentStatusBreakdown.partiallyPaid.toLocaleString()}
                </span>
              </div>
              <div className="finance-progress-track">
                <div
                  className="finance-progress-fill"
                  style={{ width: '2.8%', backgroundColor: '#3659D9' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. RECENT PAYMENTS TABLE */}
      <div className="finance-card">
        <div className="finance-card__header-row">
          <div className="finance-card__header-group">
            <h3 className="finance-card__title">Recent Payments</h3>
            <p className="finance-card__subtitle">
              Latest transactions recorded via bKash, bank transfer and cash counter
            </p>
          </div>
          <button
            type="button"
            className="finance-card__action-link"
            onClick={() => setCurrentScreen('INVOICES_PAYMENTS')}
          >
            View all →
          </button>
        </div>

        <div className="finance-table-container">
          <table className="finance-table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Invoice ID</th>
                <th>Date</th>
                <th>Payment Method</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentInvoices.map((inv: Invoice) => (
                <tr key={inv.id}>
                  <td>
                    <div style={{ fontWeight: 600, color: '#14213D' }}>{inv.studentName}</div>
                    <div style={{ fontSize: 11, color: '#667085' }}>{inv.studentId} · {inv.className}</div>
                  </td>
                  <td>
                    <span className="finance-code-pill">{inv.id}</span>
                  </td>
                  <td>{inv.paymentDate || '—'}</td>
                  <td>{inv.paymentMethod || '—'}</td>
                  <td style={{ fontWeight: 700, color: '#14213D' }}>
                    ৳ {inv.amount.toLocaleString()}
                  </td>
                  <td>{getStatusBadge(inv.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 6. BOTTOM QUICK ACTION CARDS */}
      <FinanceQuickActions />
    </div>
  );
};
