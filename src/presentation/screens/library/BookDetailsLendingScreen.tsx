import React, { useState } from 'react';
import { useLibraryFlow } from '../../../application/state/library-flow.context';
import { LibraryNavTabs } from './components/LibraryNavTabs';
import { LibraryKpiCards } from './components/LibraryKpiCards';
import type { BorrowingRecord, LoanStatus } from '../../../core/entities/library.types';

interface BookDetailsLendingScreenProps {
  onNavigateToDashboard: () => void;
}

export const BookDetailsLendingScreen: React.FC<BookDetailsLendingScreenProps> = ({
  onNavigateToDashboard,
}) => {
  const {
    selectedBook,
    borrowingRecords,
    borrowingFilters,
    setBorrowingSearchQuery,
    setBorrowingStatus,
    issueBook,
    returnBook,
    goToLibraryInventory,
  } = useLibraryFlow();

  const [borrowerType, setBorrowerType] = useState<'Student' | 'Teacher'>('Student');
  const [borrowerName, setBorrowerName] = useState('Ayesha Rahman');
  const borrowerId = borrowerType === 'Student' ? 'STU-0184' : 'TCH-0031';
  const [issueDate, setIssueDate] = useState('18 Oct 2026');
  const [dueDate, setDueDate] = useState('01 Nov 2026');
  const [returnInputId, setReturnInputId] = useState('');

  const currentBook = selectedBook || {
    id: 'book-2',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    isbn: '978-0132350884',
    category: 'Programming',
    availableCopies: 3,
    totalCopies: 5,
    status: 'Available' as const,
    shelfLocation: 'Shelf A-01',
    edition: '1st edition',
    description: 'A handbook of agile software craftsmanship and maintainable engineering.',
  };

  const handleIssue = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!borrowerName.trim()) {
      alert('Please specify borrower name');
      return;
    }
    await issueBook({
      borrowerName,
      borrowerType,
      borrowerId: borrowerId || (borrowerType === 'Student' ? 'STU-0184' : 'TCH-0031'),
      bookId: currentBook.id,
      bookTitle: currentBook.title,
      issueDate,
      dueDate,
    });
  };

  const handleReturn = async (loanIdOrName: string) => {
    if (!loanIdOrName) return;
    await returnBook(loanIdOrName);
    setReturnInputId('');
  };

  const getLoanStatusBadge = (status: LoanStatus) => {
    switch (status) {
      case 'Active':
        return <span className="library-status-pill library-status-pill--active">Active</span>;
      case 'Returned':
        return <span className="library-status-pill library-status-pill--returned">Returned</span>;
      case 'Overdue':
        return <span className="library-status-pill library-status-pill--overdue">Overdue</span>;
      default:
        return <span className="library-status-pill">{status}</span>;
    }
  };

  return (
    <div className="library-container">
      {/* 1. HERO / HEADER & BREADCRUMBS */}
      <div className="library-hero">
        <div className="library-hero__left">
          <nav className="library-hero__crumbs" aria-label="Breadcrumb">
            <button
              type="button"
              className="library-hero__crumb--link"
              onClick={onNavigateToDashboard}
            >
              Dashboard
            </button>
            <span className="library-hero__crumb-sep">/</span>
            <button
              type="button"
              className="library-hero__crumb--link"
              onClick={goToLibraryInventory}
            >
              Library & Documents
            </button>
            <span className="library-hero__crumb-sep">/</span>
            <span className="library-hero__crumb--current">Book Details & Lending</span>
          </nav>

          <div className="library-hero__title-row">
            <button
              type="button"
              className="edusync-btn-back-circle"
              onClick={goToLibraryInventory}
              title="Return to Library Inventory"
              aria-label="Back to Library Inventory"
            >
              ←
            </button>
            <div>
              <h1 className="library-hero__title">Book Details & Lending</h1>
              <p className="library-hero__subtitle">
                Review a selected title, issue and return records, and borrowing history
              </p>
            </div>
          </div>
        </div>

        <div className="library-hero__actions">
          <button
            type="button"
            className="edusync-btn edusync-btn--secondary"
            onClick={goToLibraryInventory}
          >
            ← Catalogue
          </button>
        </div>
      </div>

      {/* 2. SUB-NAVIGATION TABS (DIRECTLY UNDER HERO) */}
      <LibraryNavTabs />

      {/* 3. 4 KPI STAT METRIC CARDS (DIRECTLY UNDER TABS) */}
      <LibraryKpiCards />

      {/* 4. TOP 2-COLUMN SPLIT: BOOK DETAILS + ISSUE/RETURN FORM */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'start' }}>
        {/* Selected Book Details Card */}
        <div className="library-card">
          <div className="library-card__header">
            <div>
              <h2 className="library-card__title">Selected book details</h2>
              <p className="library-card__subtitle">Catalogue specifications and copy availability</p>
            </div>
            <span className="library-status-pill library-status-pill--available">
              {currentBook.status}
            </span>
          </div>

          <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#14213D' }}>
                {currentBook.title}
              </h3>
              <p style={{ margin: '4px 0 0', fontSize: 13, color: '#667085' }}>
                {currentBook.author} · ISBN {currentBook.isbn}
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 12,
                background: '#F8FAFC',
                border: '1px solid #E4E7EC',
                borderRadius: 8,
                padding: '16px',
              }}
            >
              <div>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#667085', textTransform: 'uppercase' }}>
                  Category
                </span>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#14213D', marginTop: 2 }}>
                  {currentBook.category}
                </div>
              </div>

              <div>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#667085', textTransform: 'uppercase' }}>
                  Shelf location
                </span>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#14213D', marginTop: 2 }}>
                  {currentBook.shelfLocation}
                </div>
              </div>

              <div>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#667085', textTransform: 'uppercase' }}>
                  Edition
                </span>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#14213D', marginTop: 2 }}>
                  {currentBook.edition}
                </div>
              </div>

              <div>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#667085', textTransform: 'uppercase' }}>
                  Total copies
                </span>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#14213D', marginTop: 2 }}>
                  {currentBook.totalCopies}
                </div>
              </div>

              <div>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#667085', textTransform: 'uppercase' }}>
                  Available copies
                </span>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#148557', marginTop: 2 }}>
                  {currentBook.availableCopies}
                </div>
              </div>

              <div>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#667085', textTransform: 'uppercase' }}>
                  Circulating
                </span>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#3659D9', marginTop: 2 }}>
                  {currentBook.totalCopies - currentBook.availableCopies}
                </div>
              </div>
            </div>

            {currentBook.description && (
              <p style={{ margin: 0, fontSize: 13, color: '#475467', lineHeight: 1.5 }}>
                {currentBook.description}
              </p>
            )}
          </div>
        </div>

        {/* Issue / Return Book Form Card */}
        <div className="library-card">
          <div className="library-card__header">
            <div>
              <h2 className="library-card__title">Issue / return book</h2>
              <p className="library-card__subtitle">Choose a borrower and record the transaction</p>
            </div>
          </div>

          <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Issue Section */}
            <form onSubmit={handleIssue} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="library-form-group" style={{ margin: 0 }}>
                  <label className="library-form-label">Borrower type</label>
                  <select
                    className="library-form-select"
                    value={borrowerType}
                    onChange={(e) => setBorrowerType(e.target.value as any)}
                  >
                    <option value="Student">Student</option>
                    <option value="Teacher">Teacher</option>
                  </select>
                </div>

                <div className="library-form-group" style={{ margin: 0 }}>
                  <label className="library-form-label">Student / teacher</label>
                  <input
                    type="text"
                    className="library-form-input"
                    placeholder="Search name or ID"
                    value={borrowerName}
                    onChange={(e) => setBorrowerName(e.target.value)}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="library-form-group" style={{ margin: 0 }}>
                  <label className="library-form-label">Issue date</label>
                  <input
                    type="text"
                    className="library-form-input"
                    value={issueDate}
                    onChange={(e) => setIssueDate(e.target.value)}
                  />
                </div>

                <div className="library-form-group" style={{ margin: 0 }}>
                  <label className="library-form-label">Due date</label>
                  <input
                    type="text"
                    className="library-form-input"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 4 }}>
                <button
                  type="submit"
                  className="edusync-btn edusync-btn--primary"
                  style={{ width: '100%' }}
                  disabled={currentBook.availableCopies <= 0}
                >
                  {currentBook.availableCopies <= 0 ? 'No copies available to issue' : 'Confirm issue'}
                </button>
              </div>
            </form>

            {/* Return Section Divider */}
            <div
              style={{
                marginTop: 10,
                paddingTop: 16,
                borderTop: '1px solid #E4E7EC',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
              }}
            >
              <label className="library-form-label">Return / loan ID</label>
              <div style={{ display: 'flex', gap: 10 }}>
                <input
                  type="text"
                  className="library-form-input"
                  placeholder="Enter loan ID (e.g. LOAN-1001 or borrower name)"
                  value={returnInputId}
                  onChange={(e) => setReturnInputId(e.target.value)}
                />
                <button
                  type="button"
                  className="edusync-btn edusync-btn--secondary"
                  style={{ whiteSpace: 'nowrap' }}
                  onClick={() => handleReturn(returnInputId)}
                >
                  Record return
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. BOTTOM SECTION: BORROWING HISTORY TABLE */}
      <div className="library-card">
        <div className="library-card__header">
          <div>
            <h2 className="library-card__title">Borrowing history</h2>
            <p className="library-card__subtitle">
              Active and completed loans with overdue tracking
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="library-filter-bar">
          <input
            type="text"
            className="library-filter-input"
            placeholder="Search loans by borrower, book, or loan ID..."
            value={borrowingFilters.searchQuery}
            onChange={(e) => setBorrowingSearchQuery(e.target.value)}
          />

          <select
            className="library-filter-select"
            value={borrowingFilters.status}
            onChange={(e) => setBorrowingStatus(e.target.value)}
          >
            <option value="All statuses">All statuses</option>
            <option value="Active">Active</option>
            <option value="Overdue">Overdue</option>
            <option value="Returned">Returned</option>
          </select>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table className="library-table">
            <thead>
              <tr>
                <th>BORROWER</th>
                <th>BOOK TITLE</th>
                <th>ISSUED</th>
                <th>DUE DATE</th>
                <th>RETURNED</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {borrowingRecords.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '36px', color: '#667085' }}>
                    No loan records match criteria.
                  </td>
                </tr>
              ) : (
                borrowingRecords.map((loan: BorrowingRecord) => (
                  <tr key={loan.id}>
                    <td>
                      <div style={{ fontWeight: 600, color: '#14213D' }}>{loan.borrowerName}</div>
                      <div style={{ fontSize: 11, color: '#667085' }}>{loan.borrowerType} · {loan.id}</div>
                    </td>
                    <td style={{ fontWeight: 500, color: '#14213D' }}>{loan.bookTitle}</td>
                    <td style={{ color: '#475467', whiteSpace: 'nowrap' }}>{loan.issueDate}</td>
                    <td style={{ color: '#475467', whiteSpace: 'nowrap' }}>{loan.dueDate}</td>
                    <td style={{ color: '#667085', whiteSpace: 'nowrap' }}>{loan.returnDate || '—'}</td>
                    <td>{getLoanStatusBadge(loan.status)}</td>
                    <td>
                      {loan.status !== 'Returned' ? (
                        <button
                          type="button"
                          className="edusync-btn edusync-btn--secondary"
                          style={{ padding: '4px 10px', fontSize: 12 }}
                          onClick={() => handleReturn(loan.id)}
                        >
                          Return
                        </button>
                      ) : (
                        <span style={{ fontSize: 12, color: '#148557', fontWeight: 600 }}>✓ Settled</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
