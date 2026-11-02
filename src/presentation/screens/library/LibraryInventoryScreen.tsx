import React, { useState } from 'react';
import { useLibraryFlow } from '../../../application/state/library-flow.context';
import { LibraryNavTabs } from './components/LibraryNavTabs';
import { LibraryKpiCards } from './components/LibraryKpiCards';
import type { BookItem, BookAvailabilityStatus } from '../../../core/entities/library.types';

interface LibraryInventoryScreenProps {
  onNavigateToDashboard: () => void;
}

export const LibraryInventoryScreen: React.FC<LibraryInventoryScreenProps> = ({
  onNavigateToDashboard,
}) => {
  const {
    books,
    overdueBorrowers,
    bookFilters,
    setBookSearchQuery,
    setBookCategory,
    setBookAvailability,
    resetBookFilters,
    goToBookDetails,
    saveBook,
    showToast,
  } = useLibraryFlow();

  const [addBookModalOpen, setAddBookModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newIsbn, setNewIsbn] = useState('');
  const [newCategory, setNewCategory] = useState('Computer Science');
  const [newCopies, setNewCopies] = useState(5);
  const [newShelf, setNewShelf] = useState('Shelf A-05');

  const getStatusBadge = (status: BookAvailabilityStatus) => {
    switch (status) {
      case 'Available':
        return <span className="library-status-pill library-status-pill--available">Available</span>;
      case 'Low stock':
        return <span className="library-status-pill library-status-pill--low">Low stock</span>;
      case 'Out of stock':
        return <span className="library-status-pill library-status-pill--out">Out of stock</span>;
      default:
        return <span className="library-status-pill">{status}</span>;
    }
  };

  const handleCreateBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      alert('Please enter a book title');
      return;
    }
    const ok = await saveBook({
      title: newTitle,
      author: newAuthor,
      isbn: newIsbn || `978-${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      category: newCategory,
      totalCopies: Number(newCopies),
      availableCopies: Number(newCopies),
      shelfLocation: newShelf,
      status: 'Available',
      edition: '1st edition',
    });
    if (ok) {
      setAddBookModalOpen(false);
      setNewTitle('');
      setNewAuthor('');
      setNewIsbn('');
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
            <span style={{ fontWeight: 500 }}>Library & Documents</span>
            <span className="library-hero__crumb-sep">/</span>
            <span className="library-hero__crumb--current">Library Inventory</span>
          </nav>

          <div className="library-hero__title-row">
            <button
              type="button"
              className="edusync-btn-back-circle"
              onClick={onNavigateToDashboard}
              title="Return to Dashboard"
              aria-label="Back to Dashboard"
            >
              ←
            </button>
            <div>
              <h1 className="library-hero__title">Library Inventory</h1>
              <p className="library-hero__subtitle">
                Manage books, availability, borrowing, returns, and overdue items
              </p>
            </div>
          </div>
        </div>

        <div className="library-hero__actions">
          <button
            type="button"
            className="edusync-btn edusync-btn--secondary"
            onClick={onNavigateToDashboard}
          >
            ← Dashboard
          </button>
          <button
            type="button"
            className="edusync-btn edusync-btn--primary"
            onClick={() => setAddBookModalOpen(true)}
          >
            + Add book
          </button>
        </div>
      </div>

      {/* 2. SUB-NAVIGATION TABS (DIRECTLY UNDER HERO) */}
      <LibraryNavTabs />

      {/* 3. 4 KPI STAT METRIC CARDS (DIRECTLY UNDER TABS) */}
      <LibraryKpiCards />

      {/* 4. MAIN 65% / 35% SPLIT: INVENTORY TABLE + OVERDUE TRACKING */}
      <div className="library-split-grid">
        {/* LEFT COLUMN: BOOK INVENTORY TABLE */}
        <div className="library-card">
          <div className="library-card__header">
            <div>
              <h2 className="library-card__title">Book inventory</h2>
              <p className="library-card__subtitle">
                Search catalogue, verify available copies, and inspect shelf assignments
              </p>
            </div>
            <button
              type="button"
              className="edusync-btn edusync-btn--secondary"
              style={{ fontSize: 13, padding: '6px 14px' }}
              onClick={() => showToast('info', 'Catalogue report exported to CSV')}
            >
              📥 Export CSV
            </button>
          </div>

          {/* Filter Bar */}
          <div className="library-filter-bar">
            <input
              type="text"
              className="library-filter-input"
              placeholder="Search by title, author, or ISBN..."
              value={bookFilters.searchQuery}
              onChange={(e) => setBookSearchQuery(e.target.value)}
            />

            <select
              className="library-filter-select"
              value={bookFilters.category}
              onChange={(e) => setBookCategory(e.target.value)}
            >
              <option value="All categories">All categories</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Programming">Programming</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Science">Science</option>
              <option value="Language">Language</option>
            </select>

            <select
              className="library-filter-select"
              value={bookFilters.availability}
              onChange={(e) => setBookAvailability(e.target.value)}
            >
              <option value="All statuses">All statuses</option>
              <option value="Available">Available</option>
              <option value="Low stock">Low stock</option>
              <option value="Out of stock">Out of stock</option>
            </select>

            <button
              type="button"
              className="edusync-btn edusync-btn--secondary"
              style={{ padding: '7px 12px', fontSize: 13 }}
              onClick={resetBookFilters}
            >
              Reset
            </button>
          </div>

          {/* Table */}
          <div style={{ overflowX: 'auto' }}>
            <table className="library-table">
              <thead>
                <tr>
                  <th>BOOK / ISBN</th>
                  <th>CATEGORY</th>
                  <th>COPIES</th>
                  <th>AVAILABILITY</th>
                  <th>LOCATION</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {books.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', padding: '36px', color: '#667085' }}>
                      No books match the selected filters.
                    </td>
                  </tr>
                ) : (
                  books.map((book: BookItem) => (
                    <tr key={book.id}>
                      <td>
                        <div style={{ fontWeight: 600, color: '#14213D' }}>{book.title}</div>
                        <div style={{ fontSize: 11, color: '#667085' }}>{book.isbn} · {book.author}</div>
                      </td>
                      <td>
                        <span
                          style={{
                            fontSize: 12,
                            padding: '3px 8px',
                            background: '#F2F4F7',
                            borderRadius: 4,
                            color: '#344054',
                            fontWeight: 500,
                          }}
                        >
                          {book.category}
                        </span>
                      </td>
                      <td style={{ fontWeight: 600, color: '#14213D' }}>
                        {book.availableCopies} / {book.totalCopies}
                      </td>
                      <td>{getStatusBadge(book.status)}</td>
                      <td style={{ color: '#475467', whiteSpace: 'nowrap' }}>
                        {book.shelfLocation}
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: 6 }}>
                          <button
                            type="button"
                            className="edusync-btn edusync-btn--secondary"
                            style={{ padding: '4px 10px', fontSize: 12 }}
                            onClick={() => goToBookDetails(book)}
                          >
                            View
                          </button>
                          <button
                            type="button"
                            className="edusync-btn edusync-btn--secondary"
                            style={{ padding: '4px 8px', fontSize: 12 }}
                            onClick={() => goToBookDetails(book)}
                          >
                            Lend
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT COLUMN: OVERDUE TRACKING & POLICY */}
        <div className="library-side-col">
          <div className="library-card">
            <div className="library-card__header">
              <div>
                <h2 className="library-card__title">Overdue book tracking</h2>
                <p className="library-card__subtitle">Follow up with borrowers and record return status</p>
              </div>
            </div>

            <div className="library-overdue-list">
              {overdueBorrowers.map((item) => (
                <div key={item.id} className="library-overdue-item">
                  <div className="library-overdue-item__info">
                    <span className="library-overdue-item__borrower">{item.borrowerName}</span>
                    <span className="library-overdue-item__book">
                      {item.bookTitle} · <span style={{ color: '#98A2B3' }}>{item.borrowerRole}</span>
                    </span>
                  </div>
                  <span className="library-overdue-item__badge">
                    {item.overdueDays} days overdue
                  </span>
                </div>
              ))}
            </div>

            <div style={{ padding: '0 20px 20px' }}>
              <button
                type="button"
                className="edusync-btn edusync-btn--primary"
                style={{ width: '100%', fontSize: 13 }}
                onClick={() => showToast('success', 'Automated overdue SMS / Email reminders sent to 3 borrowers')}
              >
                Send overdue notices
              </button>
            </div>
          </div>

          {/* Library Policy Guidance Card */}
          <div
            style={{
              padding: 16,
              background: '#F8FAFC',
              border: '1px solid #E4E7EC',
              borderRadius: 10,
              fontSize: 12,
              color: '#667085',
              lineHeight: 1.5,
            }}
          >
            <div style={{ fontWeight: 700, color: '#14213D', marginBottom: 4 }}>
              📚 Lending Policies
            </div>
            Students are permitted up to 2 active loans for a 14-day duration. Faculty may borrow up to 5 titles per academic term. Late returns accumulate fine holds if not renewed before due date.
          </div>
        </div>
      </div>

      {/* Add Book Quick Modal */}
      {addBookModalOpen && (
        <div className="library-modal-overlay" onClick={() => setAddBookModalOpen(false)}>
          <div className="library-modal-card" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#3659D9', letterSpacing: '0.08em', marginBottom: 4 }}>
                  CATALOGUE ENTRY
                </div>
                <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#14213D' }}>
                  Add new book to library
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setAddBookModalOpen(false)}
                style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#98A2B3' }}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleCreateBook} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="library-form-group" style={{ margin: 0 }}>
                <label className="library-form-label">Book title *</label>
                <input
                  type="text"
                  className="library-form-input"
                  placeholder="e.g. Modern Operating Systems"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="library-form-group" style={{ margin: 0 }}>
                  <label className="library-form-label">Author *</label>
                  <input
                    type="text"
                    className="library-form-input"
                    placeholder="e.g. Andrew S. Tanenbaum"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    required
                  />
                </div>
                <div className="library-form-group" style={{ margin: 0 }}>
                  <label className="library-form-label">ISBN</label>
                  <input
                    type="text"
                    className="library-form-input"
                    placeholder="978-0133591620"
                    value={newIsbn}
                    onChange={(e) => setNewIsbn(e.target.value)}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                <div className="library-form-group" style={{ margin: 0 }}>
                  <label className="library-form-label">Category</label>
                  <select
                    className="library-form-select"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                  >
                    <option value="Computer Science">Computer Science</option>
                    <option value="Programming">Programming</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Science">Science</option>
                    <option value="Language">Language</option>
                  </select>
                </div>
                <div className="library-form-group" style={{ margin: 0 }}>
                  <label className="library-form-label">Copies</label>
                  <input
                    type="number"
                    min="1"
                    className="library-form-input"
                    value={newCopies}
                    onChange={(e) => setNewCopies(Number(e.target.value))}
                  />
                </div>
                <div className="library-form-group" style={{ margin: 0 }}>
                  <label className="library-form-label">Shelf</label>
                  <input
                    type="text"
                    className="library-form-input"
                    value={newShelf}
                    onChange={(e) => setNewShelf(e.target.value)}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 8 }}>
                <button
                  type="button"
                  className="edusync-btn edusync-btn--secondary"
                  onClick={() => setAddBookModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="edusync-btn edusync-btn--primary">
                  Save to catalogue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
