import React, { useState } from 'react';
import { useFinance } from '../../../application/state/finance-flow.context';
import type { Invoice, PaymentReceipt } from '../../../core/entities/finance.types';
import { FinanceNavTabs } from './components/FinanceNavTabs';
import { FinanceQuickActions } from './components/FinanceQuickActions';

interface FinanceInvoicesPaymentsScreenProps {
  onNavigateToDashboard?: () => void;
}

export const FinanceInvoicesPaymentsScreen: React.FC<FinanceInvoicesPaymentsScreenProps> = ({
  onNavigateToDashboard,
}) => {
  const {
    invoices,
    selectedInvoice,
    setSelectedInvoice,
    setCurrentScreen,
    openRecordPaymentModal,
    openReceiptModal,
    receipts,
    showToast,
  } = useFinance();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredInvoices = invoices.filter((inv: Invoice) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        inv.id.toLowerCase().includes(q) ||
        inv.studentName.toLowerCase().includes(q) ||
        inv.studentId.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (statusFilter !== 'all') {
      if (inv.status.toLowerCase() !== statusFilter.toLowerCase()) return false;
    }
    return true;
  });

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

  const handleSelectInvoice = (inv: (typeof invoices)[0]) => {
    setSelectedInvoice(inv);
  };

  const handleViewReceipt = () => {
    if (!selectedInvoice) return;
    const foundReceipt = receipts.find((r: PaymentReceipt) => r.invoiceId === selectedInvoice.id);
    if (foundReceipt) {
      openReceiptModal(foundReceipt);
    } else {
      // create simulated receipt
      openReceiptModal({
        id: `RCP-2026-${selectedInvoice.id.slice(-4)}`,
        invoiceId: selectedInvoice.id,
        studentName: selectedInvoice.studentName,
        studentId: selectedInvoice.studentId,
        className: selectedInvoice.className,
        purpose: selectedInvoice.feeHead,
        method: `${selectedInvoice.paymentMethod || 'Cash'} · ${selectedInvoice.paymentDate || 'Recent'}`,
        date: selectedInvoice.paymentDate || '21 Oct 2026',
        amountPaid: selectedInvoice.paidAmount > 0 ? selectedInvoice.paidAmount : selectedInvoice.amount,
      });
    }
  };

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
            <span className="finance-hero__crumb--current">Invoices & Payments</span>
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
              <h1 className="finance-hero__title">Invoices & Payment Records</h1>
              <p className="finance-hero__subtitle">
                Search student invoices, review transaction details, and record manual or online payments.
              </p>
            </div>
          </div>
        </div>

        <div className="finance-hero__actions">
          <button
            type="button"
            className="edusync-btn edusync-btn--secondary"
            style={{ borderRadius: 8, padding: '9px 16px', fontSize: 13, fontWeight: 600 }}
            onClick={() => showToast('New invoice draft created!')}
          >
            + New Invoice
          </button>
          <button
            type="button"
            className="edusync-btn edusync-btn--primary"
            style={{ borderRadius: 8, padding: '9px 18px', fontSize: 13, fontWeight: 600 }}
            onClick={() => openRecordPaymentModal(selectedInvoice || undefined)}
          >
            Record Payment
          </button>
        </div>
      </div>

      {/* 2. SUB-NAVIGATION TABS */}
      <FinanceNavTabs />

      {/* 3. SEARCH & FILTER TOOLBAR */}
      <div className="finance-card" style={{ padding: '16px 20px' }}>
        <div className="finance-filter-grid">
          <div className="finance-filter-field" style={{ flex: 2 }}>
            <label className="finance-form-label">Search Invoices</label>
            <input
              type="text"
              className="finance-input"
              placeholder="Search by student name, ID or invoice number (e.g. INV-26-1042)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="finance-filter-field">
            <label className="finance-form-label">Status</label>
            <select
              className="finance-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="Paid">Paid</option>
              <option value="Partially Paid">Partially Paid</option>
              <option value="Pending">Pending</option>
              <option value="Overdue">Overdue</option>
              <option value="Payment failed">Payment Failed</option>
            </select>
          </div>

          <div className="finance-filter-field">
            <label className="finance-form-label">Billing Period</label>
            <select className="finance-select">
              <option value="all">October 2026 (Current)</option>
              <option value="sep">September 2026</option>
              <option value="all-year">All Terms (2026–27)</option>
            </select>
          </div>
        </div>
      </div>

      {/* 4. PAYMENT FAILURE BANNER (Figma element #53:2000) */}
      <div className="finance-alert-banner">
        <span style={{ fontSize: 16 }}>⚠️</span>
        <div style={{ flex: 1 }}>
          <strong>Payment Alert:</strong> Invoice <span className="finance-code-pill" style={{ background: '#FECDCA', color: '#B42318' }}>INV-26-1007</span> (Sadia Akter · Class 7-B) failed at payment gateway. No deduction made.
        </div>
        <button
          type="button"
          className="finance-hero__crumb--link"
          style={{ color: '#B42318', fontWeight: 700, textDecoration: 'underline' }}
          onClick={() => {
            const failedInv = invoices.find((i: Invoice) => i.id === 'INV-26-1007');
            if (failedInv) setSelectedInvoice(failedInv);
          }}
        >
          Inspect Invoice →
        </button>
      </div>

      {/* 5. SPLIT VIEW: INVOICES TABLE (65%) + INSPECTOR CARD (35%) */}
      <div className="finance-split-row--inspector">
        {/* Invoices List Table */}
        <div className="finance-card">
          <div className="finance-card__header-row">
            <div className="finance-card__header-group">
              <h3 className="finance-card__title">Invoice Directory</h3>
              <p className="finance-card__subtitle">
                Showing {filteredInvoices.length} student invoices · Click row to inspect breakdown
              </p>
            </div>
          </div>

          <div className="finance-table-container">
            <table className="finance-table">
              <thead>
                <tr>
                  <th>Invoice ID</th>
                  <th>Student</th>
                  <th>Fee Head</th>
                  <th>Amount</th>
                  <th>Balance Due</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.map((inv: Invoice) => {
                  const isSelected = selectedInvoice?.id === inv.id;
                  return (
                    <tr
                      key={inv.id}
                      className={isSelected ? 'finance-table tbody tr--selected' : ''}
                      style={{ cursor: 'pointer', backgroundColor: isSelected ? '#EFF6FF' : undefined }}
                      onClick={() => handleSelectInvoice(inv)}
                    >
                      <td>
                        <span className="finance-code-pill">{inv.id}</span>
                      </td>
                      <td>
                        <div style={{ fontWeight: 600, color: '#14213D' }}>{inv.studentName}</div>
                        <div style={{ fontSize: 11, color: '#667085' }}>{inv.studentId} · {inv.className}</div>
                      </td>
                      <td>
                        <div style={{ fontSize: 13 }}>{inv.feeHead}</div>
                        <div style={{ fontSize: 11, color: '#98A2B3' }}>Due: {inv.dueDate}</div>
                      </td>
                      <td style={{ fontWeight: 600 }}>৳ {inv.amount.toLocaleString()}</td>
                      <td style={{ fontWeight: 700, color: inv.balance > 0 ? '#B42318' : '#027A48' }}>
                        ৳ {inv.balance.toLocaleString()}
                      </td>
                      <td>{getStatusBadge(inv.status)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Invoice Inspector Card */}
        {selectedInvoice ? (
          <div className="finance-card finance-inspector">
            <div className="finance-card__header-row">
              <div className="finance-card__header-group">
                <span className="finance-code-pill" style={{ alignSelf: 'flex-start' }}>
                  {selectedInvoice.id}
                </span>
                <h3 className="finance-card__title" style={{ marginTop: 4 }}>
                  {selectedInvoice.studentName}
                </h3>
                <p className="finance-card__subtitle">
                  {selectedInvoice.studentId} · {selectedInvoice.className}
                </p>
              </div>
              <div>{getStatusBadge(selectedInvoice.status)}</div>
            </div>

            <div style={{ height: 1, backgroundColor: '#E4E7EC' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13 }}>
              <div><strong>Billing Head:</strong> {selectedInvoice.feeHead}</div>
              <div><strong>Issue Date:</strong> {selectedInvoice.issueDate}</div>
              <div><strong>Due Date:</strong> {selectedInvoice.dueDate}</div>
              {selectedInvoice.paymentDate && (
                <div><strong>Last Payment:</strong> {selectedInvoice.paymentDate} ({selectedInvoice.paymentMethod})</div>
              )}
              {selectedInvoice.daysLate && (
                <div style={{ color: '#B42318' }}><strong>Overdue Period:</strong> {selectedInvoice.daysLate}</div>
              )}
            </div>

            <div className="finance-inspector-summary">
              <div className="finance-inspector-row">
                <span>Fee Amount:</span>
                <span>৳ {selectedInvoice.amount.toLocaleString()}</span>
              </div>
              {selectedInvoice.discount > 0 && (
                <div className="finance-inspector-row" style={{ color: '#6B4AB8' }}>
                  <span>Scholarship / Discount:</span>
                  <span>- ৳ {selectedInvoice.discount.toLocaleString()}</span>
                </div>
              )}
              <div className="finance-inspector-row">
                <span>Amount Paid:</span>
                <span style={{ color: '#027A48', fontWeight: 600 }}>
                  ৳ {selectedInvoice.paidAmount.toLocaleString()}
                </span>
              </div>
              <div className="finance-inspector-row finance-inspector-row--total">
                <span>Remaining Balance Due:</span>
                <span style={{ color: selectedInvoice.balance > 0 ? '#B42318' : '#027A48' }}>
                  ৳ {selectedInvoice.balance.toLocaleString()}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 4 }}>
              {selectedInvoice.balance > 0 && (
                <button
                  type="button"
                  className="edusync-btn edusync-btn--primary"
                  style={{ width: '100%', padding: '10px 0', borderRadius: 8, fontWeight: 600 }}
                  onClick={() => openRecordPaymentModal(selectedInvoice)}
                >
                  Record Payment (৳ {selectedInvoice.balance.toLocaleString()})
                </button>
              )}

              {selectedInvoice.paidAmount > 0 && (
                <button
                  type="button"
                  className="edusync-btn edusync-btn--secondary"
                  style={{ width: '100%', padding: '9px 0', borderRadius: 8, fontWeight: 600 }}
                  onClick={handleViewReceipt}
                >
                  View Payment Slip
                </button>
              )}

              <button
                type="button"
                className="finance-hero__crumb--link"
                style={{ textAlign: 'center', padding: '6px 0', fontSize: 13, color: '#667085' }}
                onClick={() => showToast(`Invoice ${selectedInvoice.id} exported as PDF`)}
              >
                Download PDF Invoice ↓
              </button>
            </div>
          </div>
        ) : (
          <div className="finance-card" style={{ justifyContent: 'center', alignItems: 'center', minHeight: 300 }}>
            <span style={{ color: '#98A2B3' }}>Select an invoice from the table to view details.</span>
          </div>
        )}
      </div>

      {/* 6. BOTTOM QUICK ACTIONS */}
      <FinanceQuickActions />
    </div>
  );
};
