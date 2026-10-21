import React, { useState } from 'react';
import { useFinance } from '../../../application/state/finance-flow.context';
import type { PaymentMethod, FeeFrequency, FeeCategory } from '../../../core/entities/finance.types';

export const FinanceModals: React.FC = () => {
  const {
    isRecordPaymentOpen,
    closeRecordPaymentModal,
    selectedInvoice,
    recordPayment,
    isAddCategoryOpen,
    closeAddCategoryModal,
    createCategory,
    isAssignFeeOpen,
    closeAssignFeeModal,
    assignFeeBatch,
    isReceiptModalOpen,
    closeReceiptModal,
    selectedReceipt,
    categories,
    showToast,
  } = useFinance();

  // Record Payment Form State
  const [payAmount, setPayAmount] = useState<number>(selectedInvoice?.balance || 2500);
  const [payMethod, setPayMethod] = useState<PaymentMethod>('bKash');
  const [payDate, setPayDate] = useState<string>('21 Oct 2026');
  const [payRemarks, setPayRemarks] = useState<string>('');

  // Add Category Form State
  const [catName, setCatName] = useState<string>('');
  const [catFreq, setCatFreq] = useState<FeeFrequency>('Monthly');
  const [catAmount, setCatAmount] = useState<number>(2500);
  const [catDesc, setCatDesc] = useState<string>('');

  // Assign Fee Form State
  const [assignYear, setAssignYear] = useState<string>('2026–27');
  const [assignClass, setAssignClass] = useState<string>('Class 8 · Section A');
  const [assignCategory, setAssignCategory] = useState<string>('Tuition fee');
  const [assignPeriod, setAssignPeriod] = useState<string>('November 2026');
  const [assignDueDate, setAssignDueDate] = useState<string>('30 Nov 2026');
  const [assignDiscount, setAssignDiscount] = useState<number>(0);

  // Synchronize payment amount when selectedInvoice changes
  React.useEffect(() => {
    if (selectedInvoice) {
      setPayAmount(selectedInvoice.balance > 0 ? selectedInvoice.balance : selectedInvoice.amount);
    }
  }, [selectedInvoice]);

  const handleRecordPaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInvoice) return;
    await recordPayment(selectedInvoice.id, payAmount, payMethod, payDate, payRemarks);
    closeRecordPaymentModal();
  };

  const handleAddCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!catName.trim()) return;
    await createCategory(catName.trim(), catFreq, catAmount, catDesc.trim());
    setCatName('');
    setCatDesc('');
    closeAddCategoryModal();
  };

  const handleAssignFeeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await assignFeeBatch({
      academicYear: assignYear,
      className: assignClass,
      category: assignCategory,
      period: assignPeriod,
      dueDate: assignDueDate,
      discount: assignDiscount,
    });
    closeAssignFeeModal();
  };

  return (
    <>
      {/* 1. RECORD PAYMENT MODAL */}
      {isRecordPaymentOpen && selectedInvoice && (
        <div className="finance-modal-overlay" onClick={closeRecordPaymentModal}>
          <div className="finance-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="finance-modal-header">
              <h3 className="finance-modal-title">Record Payment</h3>
              <button type="button" className="finance-modal-close" onClick={closeRecordPaymentModal}>
                ✕
              </button>
            </div>
            <form onSubmit={handleRecordPaymentSubmit}>
              <div className="finance-modal-body">
                <div style={{ background: '#F8FAFC', padding: 12, borderRadius: 8, fontSize: 13 }}>
                  <div style={{ fontWeight: 600, color: '#14213D' }}>{selectedInvoice.studentName}</div>
                  <div style={{ color: '#667085' }}>
                    {selectedInvoice.id} · {selectedInvoice.className} · {selectedInvoice.feeHead}
                  </div>
                  <div style={{ marginTop: 6, display: 'flex', gap: 16 }}>
                    <span>Total: <strong>৳ {selectedInvoice.amount.toLocaleString()}</strong></span>
                    <span>Paid: <strong style={{ color: '#027A48' }}>৳ {selectedInvoice.paidAmount.toLocaleString()}</strong></span>
                    <span>Balance Due: <strong style={{ color: '#B42318' }}>৳ {selectedInvoice.balance.toLocaleString()}</strong></span>
                  </div>
                </div>

                <div className="finance-form-group">
                  <label className="finance-form-label">Amount to Collect (৳)</label>
                  <input
                    type="number"
                    className="finance-input"
                    value={payAmount}
                    onChange={(e) => setPayAmount(Number(e.target.value))}
                    max={selectedInvoice.balance > 0 ? selectedInvoice.balance : undefined}
                    required
                  />
                </div>

                <div className="finance-form-group">
                  <label className="finance-form-label">Payment Method</label>
                  <select
                    className="finance-select"
                    value={payMethod}
                    onChange={(e) => setPayMethod(e.target.value as PaymentMethod)}
                  >
                    <option value="bKash">bKash (Mobile Banking)</option>
                    <option value="Nagad">Nagad</option>
                    <option value="Bank transfer">Bank Transfer</option>
                    <option value="Cash">Cash at Counter</option>
                    <option value="Credit Card">Credit / Debit Card</option>
                  </select>
                </div>

                <div className="finance-form-group">
                  <label className="finance-form-label">Payment Date</label>
                  <input
                    type="text"
                    className="finance-input"
                    value={payDate}
                    onChange={(e) => setPayDate(e.target.value)}
                    placeholder="e.g. 21 Oct 2026"
                    required
                  />
                </div>

                <div className="finance-form-group">
                  <label className="finance-form-label">Remarks / Transaction TrxID</label>
                  <input
                    type="text"
                    className="finance-input"
                    value={payRemarks}
                    onChange={(e) => setPayRemarks(e.target.value)}
                    placeholder="e.g. bKash TrxID: 9J37KX92L"
                  />
                </div>
              </div>
              <div className="finance-modal-footer">
                <button
                  type="button"
                  className="finance-hero__crumb--link"
                  style={{ padding: '8px 16px' }}
                  onClick={closeRecordPaymentModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="edusync-btn edusync-btn--primary"
                  style={{ padding: '8px 20px', borderRadius: 8 }}
                >
                  Confirm & Generate Receipt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. ADD FEE CATEGORY MODAL */}
      {isAddCategoryOpen && (
        <div className="finance-modal-overlay" onClick={closeAddCategoryModal}>
          <div className="finance-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="finance-modal-header">
              <h3 className="finance-modal-title">Add Fee Category</h3>
              <button type="button" className="finance-modal-close" onClick={closeAddCategoryModal}>
                ✕
              </button>
            </div>
            <form onSubmit={handleAddCategorySubmit}>
              <div className="finance-modal-body">
                <div className="finance-form-group">
                  <label className="finance-form-label">Category Name</label>
                  <input
                    type="text"
                    className="finance-input"
                    value={catName}
                    onChange={(e) => setCatName(e.target.value)}
                    placeholder="e.g. Science Lab & Robotics Fee"
                    required
                  />
                </div>

                <div className="finance-form-group">
                  <label className="finance-form-label">Billing Frequency</label>
                  <select
                    className="finance-select"
                    value={catFreq}
                    onChange={(e) => setCatFreq(e.target.value as FeeFrequency)}
                  >
                    <option value="Monthly">Monthly</option>
                    <option value="Per term">Per term</option>
                    <option value="One-time">One-time</option>
                    <option value="Annual">Annual</option>
                  </select>
                </div>

                <div className="finance-form-group">
                  <label className="finance-form-label">Default Amount (৳)</label>
                  <input
                    type="number"
                    className="finance-input"
                    value={catAmount}
                    onChange={(e) => setCatAmount(Number(e.target.value))}
                    required
                  />
                </div>

                <div className="finance-form-group">
                  <label className="finance-form-label">Description (Optional)</label>
                  <input
                    type="text"
                    className="finance-input"
                    value={catDesc}
                    onChange={(e) => setCatDesc(e.target.value)}
                    placeholder="e.g. Special lab fee for STEM experiments"
                  />
                </div>
              </div>
              <div className="finance-modal-footer">
                <button
                  type="button"
                  className="finance-hero__crumb--link"
                  style={{ padding: '8px 16px' }}
                  onClick={closeAddCategoryModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="edusync-btn edusync-btn--primary"
                  style={{ padding: '8px 20px', borderRadius: 8 }}
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. ASSIGN FEE MODAL */}
      {isAssignFeeOpen && (
        <div className="finance-modal-overlay" onClick={closeAssignFeeModal}>
          <div className="finance-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="finance-modal-header">
              <h3 className="finance-modal-title">Assign Fee to Class</h3>
              <button type="button" className="finance-modal-close" onClick={closeAssignFeeModal}>
                ✕
              </button>
            </div>
            <form onSubmit={handleAssignFeeSubmit}>
              <div className="finance-modal-body">
                <div className="finance-form-group">
                  <label className="finance-form-label">Academic Year</label>
                  <select
                    className="finance-select"
                    value={assignYear}
                    onChange={(e) => setAssignYear(e.target.value)}
                  >
                    <option value="2026–27">2026–27</option>
                    <option value="2025–26">2025–26</option>
                  </select>
                </div>

                <div className="finance-form-group">
                  <label className="finance-form-label">Target Class & Section</label>
                  <select
                    className="finance-select"
                    value={assignClass}
                    onChange={(e) => setAssignClass(e.target.value)}
                  >
                    <option value="Class 8 · Section A">Class 8 · Section A (42 students)</option>
                    <option value="Class 8 · Section B">Class 8 · Section B (40 students)</option>
                    <option value="Class 7 · Section A">Class 7 · Section A (45 students)</option>
                    <option value="Class 7 · Section B">Class 7 · Section B (44 students)</option>
                    <option value="Class 6 · Section A">Class 6 · Section A (38 students)</option>
                  </select>
                </div>

                <div className="finance-form-group">
                  <label className="finance-form-label">Fee Category</label>
                  <select
                    className="finance-select"
                    value={assignCategory}
                    onChange={(e) => setAssignCategory(e.target.value)}
                  >
                    {categories.map((c: FeeCategory) => (
                      <option key={c.id} value={c.name}>
                        {c.name} (৳ {c.defaultAmount.toLocaleString()} · {c.frequency})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="finance-form-group">
                  <label className="finance-form-label">Billing Period</label>
                  <input
                    type="text"
                    className="finance-input"
                    value={assignPeriod}
                    onChange={(e) => setAssignPeriod(e.target.value)}
                    placeholder="e.g. November 2026"
                    required
                  />
                </div>

                <div className="finance-form-group">
                  <label className="finance-form-label">Due Date</label>
                  <input
                    type="text"
                    className="finance-input"
                    value={assignDueDate}
                    onChange={(e) => setAssignDueDate(e.target.value)}
                    placeholder="e.g. 30 Nov 2026"
                    required
                  />
                </div>

                <div className="finance-form-group">
                  <label className="finance-form-label">Discount / Waiver (৳)</label>
                  <input
                    type="number"
                    className="finance-input"
                    value={assignDiscount}
                    onChange={(e) => setAssignDiscount(Number(e.target.value))}
                    min={0}
                  />
                </div>
              </div>
              <div className="finance-modal-footer">
                <button
                  type="button"
                  className="finance-hero__crumb--link"
                  style={{ padding: '8px 16px' }}
                  onClick={closeAssignFeeModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="edusync-btn edusync-btn--primary"
                  style={{ padding: '8px 20px', borderRadius: 8 }}
                >
                  Assign Fee to Class
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. RECEIPT PREVIEW MODAL */}
      {isReceiptModalOpen && selectedReceipt && (
        <div className="finance-modal-overlay" onClick={closeReceiptModal}>
          <div className="finance-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="finance-modal-header">
              <h3 className="finance-modal-title">Payment Receipt</h3>
              <button type="button" className="finance-modal-close" onClick={closeReceiptModal}>
                ✕
              </button>
            </div>
            <div className="finance-modal-body">
              <div className="finance-receipt-sheet">
                <div className="finance-receipt-stamp">PAID</div>
                <div className="finance-receipt-header">
                  <div className="finance-receipt-title">Maple Grove School</div>
                  <div className="finance-receipt-meta">Official Money Receipt · {selectedReceipt.id}</div>
                  <div className="finance-receipt-meta">Issued Date: {selectedReceipt.date}</div>
                </div>

                <div style={{ height: 1, backgroundColor: '#E4E7EC', margin: '4px 0' }} />

                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13 }}>
                  <div><strong>Student Name:</strong> {selectedReceipt.studentName}</div>
                  {selectedReceipt.studentId && <div><strong>Student ID:</strong> {selectedReceipt.studentId}</div>}
                  <div><strong>Class:</strong> {selectedReceipt.className}</div>
                  <div><strong>Purpose:</strong> {selectedReceipt.purpose}</div>
                  <div><strong>Payment Mode:</strong> {selectedReceipt.method}</div>
                </div>

                <div className="finance-inspector-summary" style={{ marginTop: 8 }}>
                  <div className="finance-inspector-row finance-inspector-row--total">
                    <span>Total Amount Paid:</span>
                    <span style={{ color: '#027A48' }}>৳ {selectedReceipt.amountPaid.toLocaleString()}</span>
                  </div>
                </div>

                <div style={{ fontSize: 11, color: '#98A2B3', textAlign: 'center', marginTop: 12 }}>
                  This is a computer generated official fee slip. Signature not required.
                </div>
              </div>
            </div>
            <div className="finance-modal-footer">
              <button
                type="button"
                className="edusync-btn edusync-btn--secondary"
                style={{ padding: '8px 16px', borderRadius: 8 }}
                onClick={() => {
                  showToast(`PDF Receipt ${selectedReceipt.id} downloaded!`);
                  closeReceiptModal();
                }}
              >
                Export PDF
              </button>
              <button
                type="button"
                className="edusync-btn edusync-btn--primary"
                style={{ padding: '8px 20px', borderRadius: 8 }}
                onClick={() => {
                  window.print();
                }}
              >
                Print Slip
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
