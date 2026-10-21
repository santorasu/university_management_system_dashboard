import React, { useState } from 'react';
import { useFinance } from '../../../application/state/finance-flow.context';
import type { FeeCategory, StudentFeeAssignment } from '../../../core/entities/finance.types';
import { FinanceNavTabs } from './components/FinanceNavTabs';
import { FinanceQuickActions } from './components/FinanceQuickActions';

interface FinanceCategoriesAssignmentScreenProps {
  onNavigateToDashboard?: () => void;
}

export const FinanceCategoriesAssignmentScreen: React.FC<FinanceCategoriesAssignmentScreenProps> = ({
  onNavigateToDashboard,
}) => {
  const {
    categories,
    assignments,
    setCurrentScreen,
    openAddCategoryModal,
    openAssignFeeModal,
    assignFeeBatch,
  } = useFinance();

  // Quick Assignment Form Inline State
  const [formYear, setFormYear] = useState('2026–27');
  const [formClass, setFormClass] = useState('Class 8 · Section A');
  const [formCategory, setFormCategory] = useState(categories[0]?.name || 'Tuition fee');
  const [formPeriod, setFormPeriod] = useState('November 2026');
  const [formDueDate, setFormDueDate] = useState('30 Nov 2026');
  const [formDiscount, setFormDiscount] = useState<number>(0);
  const [classFilter, setClassFilter] = useState('all');

  const handleInlineAssign = async (e: React.FormEvent) => {
    e.preventDefault();
    await assignFeeBatch({
      academicYear: formYear,
      className: formClass,
      category: formCategory,
      period: formPeriod,
      dueDate: formDueDate,
      discount: formDiscount,
    });
  };

  const filteredAssignments = assignments.filter((a: StudentFeeAssignment) => {
    if (classFilter !== 'all' && !a.className.toLowerCase().includes(classFilter.toLowerCase())) {
      return false;
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
            <span className="finance-hero__crumb--current">Categories & Assignment</span>
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
              <h1 className="finance-hero__title">Fee Categories & Student Assignment</h1>
              <p className="finance-hero__subtitle">
                Configure fee heads and billing schedules, then assign fees to entire classes or individual students.
              </p>
            </div>
          </div>
        </div>

        <div className="finance-hero__actions">
          <button
            type="button"
            className="edusync-btn edusync-btn--secondary"
            style={{ borderRadius: 8, padding: '9px 16px', fontSize: 13, fontWeight: 600 }}
            onClick={openAddCategoryModal}
          >
            + Add Category
          </button>
          <button
            type="button"
            className="edusync-btn edusync-btn--primary"
            style={{ borderRadius: 8, padding: '9px 18px', fontSize: 13, fontWeight: 600 }}
            onClick={openAssignFeeModal}
          >
            Assign Fees to Class
          </button>
        </div>
      </div>

      {/* 2. SUB-NAVIGATION TABS */}
      <FinanceNavTabs />

      {/* 3. SPLIT ROW: CATEGORIES LIST + INLINE ASSIGN FORM */}
      <div className="finance-split-row--55-45">
        {/* Categories List Card */}
        <div className="finance-card">
          <div className="finance-card__header-row">
            <div className="finance-card__header-group">
              <h3 className="finance-card__title">Active Fee Categories</h3>
              <p className="finance-card__subtitle">Standard fee structures configured for Maple Grove School</p>
            </div>
            <button
              type="button"
              className="finance-card__action-link"
              onClick={openAddCategoryModal}
            >
              + New Category
            </button>
          </div>

          <div className="finance-table-container">
            <table className="finance-table">
              <thead>
                <tr>
                  <th>Category Name</th>
                  <th>Frequency</th>
                  <th>Default Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat: FeeCategory) => (
                  <tr key={cat.id}>
                    <td>
                      <div style={{ fontWeight: 600, color: '#14213D' }}>{cat.name}</div>
                      {cat.description && (
                        <div style={{ fontSize: 11, color: '#667085' }}>{cat.description}</div>
                      )}
                    </td>
                    <td>
                      <span className="finance-code-pill">{cat.frequency}</span>
                    </td>
                    <td style={{ fontWeight: 700, color: '#14213D' }}>
                      ৳ {cat.defaultAmount.toLocaleString()}
                    </td>
                    <td>
                      <button
                        type="button"
                        className="finance-hero__crumb--link"
                        style={{ color: '#3659D9', fontWeight: 600 }}
                        onClick={() => {
                          setFormCategory(cat.name);
                        }}
                      >
                        Use in Batch
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Batch Assign Form Card */}
        <div className="finance-card">
          <div className="finance-card__header-group">
            <h3 className="finance-card__title">Assign Fees to Class</h3>
            <p className="finance-card__subtitle">Quick batch assignment of fee heads to classes or sections</p>
          </div>

          <form onSubmit={handleInlineAssign} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="finance-form-group">
                <label className="finance-form-label">Academic Year</label>
                <select
                  className="finance-select"
                  value={formYear}
                  onChange={(e) => setFormYear(e.target.value)}
                >
                  <option value="2026–27">2026–27</option>
                  <option value="2025–26">2025–26</option>
                </select>
              </div>

              <div className="finance-form-group">
                <label className="finance-form-label">Class & Section</label>
                <select
                  className="finance-select"
                  value={formClass}
                  onChange={(e) => setFormClass(e.target.value)}
                >
                  <option value="Class 8 · Section A">Class 8 · Section A</option>
                  <option value="Class 8 · Section B">Class 8 · Section B</option>
                  <option value="Class 7 · Section A">Class 7 · Section A</option>
                  <option value="Class 7 · Section B">Class 7 · Section B</option>
                  <option value="Class 6 · Section A">Class 6 · Section A</option>
                </select>
              </div>
            </div>

            <div className="finance-form-group">
              <label className="finance-form-label">Fee Category</label>
              <select
                className="finance-select"
                value={formCategory}
                onChange={(e) => setFormCategory(e.target.value)}
              >
                {categories.map((c: FeeCategory) => (
                  <option key={c.id} value={c.name}>
                    {c.name} (৳ {c.defaultAmount.toLocaleString()} · {c.frequency})
                  </option>
                ))}
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="finance-form-group">
                <label className="finance-form-label">Billing Period</label>
                <input
                  type="text"
                  className="finance-input"
                  value={formPeriod}
                  onChange={(e) => setFormPeriod(e.target.value)}
                  placeholder="e.g. October 2026"
                  required
                />
              </div>

              <div className="finance-form-group">
                <label className="finance-form-label">Due Date</label>
                <input
                  type="text"
                  className="finance-input"
                  value={formDueDate}
                  onChange={(e) => setFormDueDate(e.target.value)}
                  placeholder="e.g. 31 Oct 2026"
                  required
                />
              </div>
            </div>

            <div className="finance-form-group">
              <label className="finance-form-label">Discount / Waiver (৳)</label>
              <input
                type="number"
                className="finance-input"
                value={formDiscount}
                onChange={(e) => setFormDiscount(Number(e.target.value))}
                min={0}
              />
            </div>

            <button
              type="submit"
              className="edusync-btn edusync-btn--primary"
              style={{ marginTop: 8, padding: '10px 18px', borderRadius: 8, fontWeight: 600 }}
            >
              Assign Fee to Class (42 Students)
            </button>
          </form>
        </div>
      </div>

      {/* 4. RECENT STUDENT FEE ASSIGNMENTS TABLE */}
      <div className="finance-card">
        <div className="finance-card__header-row">
          <div className="finance-card__header-group">
            <h3 className="finance-card__title">Recent Student Fee Assignments</h3>
            <p className="finance-card__subtitle">Latest fee heads assigned across enrolled students</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 12, color: '#667085' }}>Filter Class:</span>
            <select
              className="finance-select"
              style={{ width: 140, height: 34, fontSize: 12 }}
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
            >
              <option value="all">All Classes</option>
              <option value="Class 8">Class 8</option>
              <option value="Class 7">Class 7</option>
              <option value="Class 6">Class 6</option>
            </select>
          </div>
        </div>

        <div className="finance-table-container">
          <table className="finance-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Class</th>
                <th>Fee Head</th>
                <th>Amount</th>
                <th>Due Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssignments.map((asn: StudentFeeAssignment) => (
                <tr key={asn.id}>
                  <td>
                    <div style={{ fontWeight: 600, color: '#14213D' }}>{asn.studentName}</div>
                    <div style={{ fontSize: 11, color: '#667085' }}>{asn.studentId}</div>
                  </td>
                  <td>{asn.className}</td>
                  <td>{asn.feeHead}</td>
                  <td style={{ fontWeight: 700, color: '#14213D' }}>৳ {asn.amount.toLocaleString()}</td>
                  <td>{asn.dueDate}</td>
                  <td>{getStatusBadge(asn.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. BOTTOM QUICK ACTIONS */}
      <FinanceQuickActions />
    </div>
  );
};
