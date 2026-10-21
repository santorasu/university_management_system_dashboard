import React from 'react';
import { useFinance } from '../../../application/state/finance-flow.context';
import type { Invoice, PaymentReceipt } from '../../../core/entities/finance.types';
import { FinanceNavTabs } from './components/FinanceNavTabs';
import { FinanceKpiCards } from './components/FinanceKpiCards';
import { FinanceQuickActions } from './components/FinanceQuickActions';

interface FinanceDuesReportsScreenProps {
  onNavigateToDashboard?: () => void;
}

export const FinanceDuesReportsScreen: React.FC<FinanceDuesReportsScreenProps> = ({
  onNavigateToDashboard,
}) => {
  const {
    kpis,
    invoices,
    receipts,
    selectedReceipt,
    setSelectedReceipt,
    openReceiptModal,
    setCurrentScreen,
    sendReminders,
    showToast,
  } = useFinance();

  const duesInvoices = invoices.filter(
    (inv: Invoice) => inv.status === 'Overdue' || inv.status === 'Pending' || inv.status === 'Partially Paid'
  );

  const activeReceipt = selectedReceipt || receipts[0];

  const handleSendSingleReminder = (studentName: string) => {
    showToast(`Payment reminder SMS & Portal notification sent to ${studentName}!`);
  };

  const reports = [
    {
      title: 'Collection Summary Report',
      desc: 'Comprehensive monthly & category-wise fee collections for academic year 2026–27.',
      format: 'Download CSV ↗',
      onDownload: () => showToast('Collection_Summary_2026_27.csv downloaded!'),
    },
    {
      title: 'Outstanding Dues Statement',
      desc: 'Student-wise list of pending fees, parent phone contacts, and days overdue.',
      format: 'Download PDF ↗',
      onDownload: () => showToast('Outstanding_Dues_Statement.pdf downloaded!'),
    },
    {
      title: 'Discounts & Scholarship Audit',
      desc: 'Waiver audit log covering merit scholarships, sibling concessions and fee exemptions.',
      format: 'Download Excel ↗',
      onDownload: () => showToast('Discounts_Scholarship_Audit.xlsx downloaded!'),
    },
    {
      title: 'Gateway Reconciliation',
      desc: 'bKash, Nagad, credit card and bank deposit transaction settlement log.',
      format: 'Download CSV ↗',
      onDownload: () => showToast('Gateway_Reconciliation_Oct2026.csv downloaded!'),
    },
  ];

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
            <span className="finance-hero__crumb--current">Dues & Reports</span>
          </nav>

          <div className="finance-hero__title-row">
            <button
              type="button"
              className="finance-hero__back-btn"
              onClick={() => setCurrentScreen('OVERVIEW')}
              title="Return to Finance Overview"
            >
              ←
            </button>
            <div>
              <h1 className="finance-hero__title">Dues, Receipts & Financial Reports</h1>
              <p className="finance-hero__subtitle">
                Manage outstanding dues, generate official payment slips, and export fee collection reports.
              </p>
            </div>
          </div>
        </div>

        <div className="finance-hero__actions">
          <button
            type="button"
            className="edusync-btn edusync-btn--secondary"
            style={{ borderRadius: 8, padding: '9px 16px', fontSize: 13, fontWeight: 600 }}
            onClick={() => sendReminders()}
          >
            Send Dues Reminders
          </button>
          <button
            type="button"
            className="edusync-btn edusync-btn--primary"
            style={{ borderRadius: 8, padding: '9px 18px', fontSize: 13, fontWeight: 600 }}
            onClick={() => showToast('Financial Audit Report (Oct 2026) exported as PDF!')}
          >
            Export Audit Report
          </button>
        </div>
      </div>

      {/* 2. SUB-NAVIGATION TABS */}
      <FinanceNavTabs />

      {/* 3. 4 KPI STAT CARDS (Dues Variant: Amber -> Red -> Purple -> Green) */}
      <FinanceKpiCards stats={kpis} variant="dues" />

      {/* 4. SPLIT ROW: OUTSTANDING INVOICES + RECEIPT PREVIEW */}
      <div className="finance-split-row--55-45">
        {/* Outstanding Dues Invoices */}
        <div className="finance-card">
          <div className="finance-card__header-row">
            <div className="finance-card__header-group">
              <h3 className="finance-card__title">Outstanding & Overdue Invoices</h3>
              <p className="finance-card__subtitle">
                {duesInvoices.length} active invoices requiring payment collection
              </p>
            </div>
            <button
              type="button"
              className="finance-hero__crumb--link"
              style={{ color: '#3659D9', fontWeight: 600 }}
              onClick={() => sendReminders()}
            >
              Remind All →
            </button>
          </div>

          <div className="finance-table-container">
            <table className="finance-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Fee Head</th>
                  <th>Due Date</th>
                  <th>Balance</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {duesInvoices.map((inv: Invoice) => (
                  <tr key={inv.id}>
                    <td>
                      <div style={{ fontWeight: 600, color: '#14213D' }}>{inv.studentName}</div>
                      <div style={{ fontSize: 11, color: '#667085' }}>{inv.studentId} · {inv.className}</div>
                    </td>
                    <td>{inv.feeHead}</td>
                    <td>
                      <div style={{ fontSize: 12 }}>{inv.dueDate}</div>
                      {inv.daysLate && (
                        <div style={{ fontSize: 11, color: '#B42318', fontWeight: 600 }}>
                          {inv.daysLate} late
                        </div>
                      )}
                    </td>
                    <td style={{ fontWeight: 700, color: '#B42318' }}>
                      ৳ {inv.balance.toLocaleString()}
                    </td>
                    <td>
                      <button
                        type="button"
                        className="edusync-btn edusync-btn--secondary"
                        style={{ padding: '4px 10px', fontSize: 11, borderRadius: 6 }}
                        onClick={() => handleSendSingleReminder(inv.studentName)}
                      >
                        Send SMS
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Receipt Preview Card (Figma Node #53:2338) */}
        <div className="finance-card">
          <div className="finance-card__header-row">
            <div className="finance-card__header-group">
              <h3 className="finance-card__title">Official Payment Receipt</h3>
              <p className="finance-card__subtitle">Preview of authenticated money slip</p>
            </div>
            {receipts.length > 1 && (
              <select
                className="finance-select"
                style={{ width: 140, height: 32, fontSize: 11 }}
                value={activeReceipt?.id}
                onChange={(e) => {
                  const r = receipts.find((x: PaymentReceipt) => x.id === e.target.value);
                  if (r) setSelectedReceipt(r);
                }}
              >
                {receipts.map((r: PaymentReceipt) => (
                  <option key={r.id} value={r.id}>
                    {r.id} ({r.studentName})
                  </option>
                ))}
              </select>
            )}
          </div>

          {activeReceipt ? (
            <div className="finance-receipt-sheet">
              <div className="finance-receipt-stamp">PAID</div>
              <div className="finance-receipt-header">
                <div className="finance-receipt-title">Maple Grove School</div>
                <div className="finance-receipt-meta">Official Money Receipt · {activeReceipt.id}</div>
                <div className="finance-receipt-meta">Issued Date: {activeReceipt.date}</div>
              </div>

              <div style={{ height: 1, backgroundColor: '#E4E7EC', margin: '4px 0' }} />

              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13 }}>
                <div><strong>Student Name:</strong> {activeReceipt.studentName}</div>
                {activeReceipt.studentId && <div><strong>Student ID:</strong> {activeReceipt.studentId}</div>}
                <div><strong>Class:</strong> {activeReceipt.className}</div>
                <div><strong>Purpose:</strong> {activeReceipt.purpose}</div>
                <div><strong>Payment Mode:</strong> {activeReceipt.method}</div>
              </div>

              <div className="finance-inspector-summary" style={{ marginTop: 8 }}>
                <div className="finance-inspector-row finance-inspector-row--total">
                  <span>Total Amount Paid:</span>
                  <span style={{ color: '#027A48' }}>৳ {activeReceipt.amountPaid.toLocaleString()}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                <button
                  type="button"
                  className="edusync-btn edusync-btn--secondary"
                  style={{ flex: 1, padding: '8px 0', borderRadius: 8, fontSize: 12, fontWeight: 600 }}
                  onClick={() => showToast(`Receipt ${activeReceipt.id} PDF saved!`)}
                >
                  Export PDF
                </button>
                <button
                  type="button"
                  className="edusync-btn edusync-btn--primary"
                  style={{ flex: 1, padding: '8px 0', borderRadius: 8, fontSize: 12, fontWeight: 600 }}
                  onClick={() => openReceiptModal(activeReceipt)}
                >
                  Print Slip
                </button>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: 30, color: '#98A2B3' }}>
              No recent receipt selected.
            </div>
          )}
        </div>
      </div>

      {/* 5. FINANCIAL REPORTS & EXPORTS TILES */}
      <div className="finance-card">
        <div className="finance-card__header-group">
          <h3 className="finance-card__title">Financial Reports & Statements</h3>
          <p className="finance-card__subtitle">
            Download verified fee collection, bank reconciliation and dues audit reports
          </p>
        </div>

        <div className="finance-quick-actions-grid">
          {reports.map((rpt) => (
            <div
              key={rpt.title}
              className="finance-action-card"
              onClick={rpt.onDownload}
            >
              <div>
                <div className="finance-action-card__title">{rpt.title}</div>
                <div className="finance-action-card__desc">{rpt.desc}</div>
              </div>
              <span className="finance-action-card__link">{rpt.format}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 6. BOTTOM QUICK ACTIONS */}
      <FinanceQuickActions />
    </div>
  );
};
