import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type {
  BookItem,
  BookFilterOptions,
  LibraryKpiStats,
  OverdueBorrowerItem,
  BorrowingRecord,
  BorrowingFilterOptions,
  DocumentRecord,
  DocumentFilterOptions,
  DocumentKpiStats,
  SchoolEventItem,
  LibrarySubScreen,
} from '../../core/entities/library.types';
import { MockLibraryRepository } from '../../infrastructure/repositories/mock-library.repository';

interface LibraryFlowContextValue {
  subScreen: LibrarySubScreen;
  books: BookItem[];
  selectedBook: BookItem | null;
  libraryKpis: LibraryKpiStats | null;
  overdueBorrowers: OverdueBorrowerItem[];

  borrowingRecords: BorrowingRecord[];
  documents: DocumentRecord[];
  documentKpis: DocumentKpiStats | null;
  events: SchoolEventItem[];

  isLoading: boolean;
  toast: { type: 'success' | 'error' | 'info'; message: string } | null;

  // Book Filters
  bookFilters: BookFilterOptions;
  setBookSearchQuery: (q: string) => void;
  setBookCategory: (c: string) => void;
  setBookAvailability: (a: string) => void;
  resetBookFilters: () => void;

  // Borrowing Filters
  borrowingFilters: BorrowingFilterOptions;
  setBorrowingSearchQuery: (q: string) => void;
  setBorrowingStatus: (st: string) => void;

  // Document Filters
  documentFilters: DocumentFilterOptions;
  setDocumentSearchQuery: (q: string) => void;
  setDocumentRecordType: (rt: string) => void;
  setDocumentCategory: (c: string) => void;
  setDocumentStatus: (st: string) => void;
  resetDocumentFilters: () => void;

  // Navigation
  goToLibraryInventory: () => void;
  goToBookDetails: (book?: BookItem) => void;
  goToDocumentManagement: () => void;
  selectBook: (book: BookItem) => void;

  // Modals
  uploadProgressModalOpen: boolean;
  openUploadProgressModal: () => void;
  closeUploadProgressModal: () => void;

  uploadSuccessModalOpen: boolean;
  openUploadSuccessModal: () => void;
  closeUploadSuccessModal: () => void;

  uploadFailedModalOpen: boolean;
  openUploadFailedModal: () => void;
  closeUploadFailedModal: () => void;

  // Actions
  saveBook: (book: Partial<BookItem>) => Promise<boolean>;
  issueBook: (record: Partial<BorrowingRecord>) => Promise<boolean>;
  returnBook: (loanIdOrBorrower: string) => Promise<boolean>;
  uploadDocument: (doc: Partial<DocumentRecord>) => Promise<boolean>;
  showToast: (type: 'success' | 'error' | 'info', message: string) => void;
  clearToast: () => void;
}

const LibraryFlowContext = createContext<LibraryFlowContextValue | undefined>(undefined);

const repository = new MockLibraryRepository();

export const LibraryFlowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [subScreen, setSubScreen] = useState<LibrarySubScreen>('LIBRARY_INVENTORY');

  const [books, setBooks] = useState<BookItem[]>([]);
  const [selectedBook, setSelectedBook] = useState<BookItem | null>(null);
  const [libraryKpis, setLibraryKpis] = useState<LibraryKpiStats | null>(null);
  const [overdueBorrowers, setOverdueBorrowers] = useState<OverdueBorrowerItem[]>([]);

  const [borrowingRecords, setBorrowingRecords] = useState<BorrowingRecord[]>([]);
  const [documents, setDocuments] = useState<DocumentRecord[]>([]);
  const [documentKpis, setDocumentKpis] = useState<DocumentKpiStats | null>(null);
  const [events, setEvents] = useState<SchoolEventItem[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);

  // Modals
  const [uploadProgressModalOpen, setUploadProgressModalOpen] = useState(false);
  const [uploadSuccessModalOpen, setUploadSuccessModalOpen] = useState(false);
  const [uploadFailedModalOpen, setUploadFailedModalOpen] = useState(false);

  // Filters
  const [bookFilters, setBookFilters] = useState<BookFilterOptions>({
    searchQuery: '',
    category: 'All categories',
    availability: 'All statuses',
  });

  const [borrowingFilters, setBorrowingFilters] = useState<BorrowingFilterOptions>({
    searchQuery: '',
    status: 'All statuses',
  });

  const [documentFilters, setDocumentFilters] = useState<DocumentFilterOptions>({
    searchQuery: '',
    recordType: 'Students and teachers',
    category: 'All categories',
    status: 'All statuses',
  });

  const showToast = useCallback((type: 'success' | 'error' | 'info', message: string) => {
    setToast({ type, message });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  }, []);

  const clearToast = useCallback(() => setToast(null), []);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [
        fetchedBooks,
        fetchedKpis,
        fetchedOverdue,
        fetchedLoans,
        fetchedDocs,
        fetchedDocKpis,
        fetchedEvents,
      ] = await Promise.all([
        repository.getBooks(bookFilters),
        repository.getLibraryKpis(),
        repository.getOverdueBorrowers(),
        repository.getBorrowingRecords(borrowingFilters),
        repository.getDocuments(documentFilters),
        repository.getDocumentKpis(),
        repository.getSchoolEvents(),
      ]);

      setBooks(fetchedBooks);
      setLibraryKpis(fetchedKpis);
      setOverdueBorrowers(fetchedOverdue);
      setBorrowingRecords(fetchedLoans);
      setDocuments(fetchedDocs);
      setDocumentKpis(fetchedDocKpis);
      setEvents(fetchedEvents);

      if (!selectedBook && fetchedBooks.length > 1) {
        // Default to Clean Code (book-2) matching Figma screen 2
        setSelectedBook(fetchedBooks[1]);
      }
    } finally {
      setIsLoading(false);
    }
  }, [bookFilters, borrowingFilters, documentFilters, selectedBook]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Book Filter Setters
  const setBookSearchQuery = (q: string) => setBookFilters((prev) => ({ ...prev, searchQuery: q }));
  const setBookCategory = (c: string) => setBookFilters((prev) => ({ ...prev, category: c }));
  const setBookAvailability = (a: string) => setBookFilters((prev) => ({ ...prev, availability: a }));
  const resetBookFilters = () =>
    setBookFilters({
      searchQuery: '',
      category: 'All categories',
      availability: 'All statuses',
    });

  // Borrowing Filter Setters
  const setBorrowingSearchQuery = (q: string) =>
    setBorrowingFilters((prev) => ({ ...prev, searchQuery: q }));
  const setBorrowingStatus = (st: string) =>
    setBorrowingFilters((prev) => ({ ...prev, status: st }));

  // Document Filter Setters
  const setDocumentSearchQuery = (q: string) =>
    setDocumentFilters((prev) => ({ ...prev, searchQuery: q }));
  const setDocumentRecordType = (rt: string) =>
    setDocumentFilters((prev) => ({ ...prev, recordType: rt }));
  const setDocumentCategory = (c: string) =>
    setDocumentFilters((prev) => ({ ...prev, category: c }));
  const setDocumentStatus = (st: string) =>
    setDocumentFilters((prev) => ({ ...prev, status: st }));
  const resetDocumentFilters = () =>
    setDocumentFilters({
      searchQuery: '',
      recordType: 'Students and teachers',
      category: 'All categories',
      status: 'All statuses',
    });

  // Navigation Handlers
  const goToLibraryInventory = () => setSubScreen('LIBRARY_INVENTORY');
  const goToBookDetails = (book?: BookItem) => {
    if (book) setSelectedBook(book);
    setSubScreen('BOOK_DETAILS_LENDING');
  };
  const goToDocumentManagement = () => setSubScreen('DOCUMENT_MANAGEMENT');
  const selectBook = (book: BookItem) => {
    setSelectedBook(book);
    setSubScreen('BOOK_DETAILS_LENDING');
  };

  // Modals
  const openUploadProgressModal = () => setUploadProgressModalOpen(true);
  const closeUploadProgressModal = () => setUploadProgressModalOpen(false);

  const openUploadSuccessModal = () => {
    setUploadProgressModalOpen(false);
    setUploadSuccessModalOpen(true);
  };
  const closeUploadSuccessModal = () => setUploadSuccessModalOpen(false);

  const openUploadFailedModal = () => {
    setUploadProgressModalOpen(false);
    setUploadFailedModalOpen(true);
  };
  const closeUploadFailedModal = () => setUploadFailedModalOpen(false);

  // Operations
  const saveBook = async (book: Partial<BookItem>): Promise<boolean> => {
    try {
      const saved = await repository.saveBook(book);
      showToast('success', `Book "${saved.title}" saved successfully`);
      await loadData();
      return true;
    } catch {
      showToast('error', 'Failed to save book.');
      return false;
    }
  };

  const issueBook = async (record: Partial<BorrowingRecord>): Promise<boolean> => {
    try {
      await repository.issueBook(record);
      showToast('success', `Book issued successfully to ${record.borrowerName || 'borrower'}`);
      await loadData();
      return true;
    } catch {
      showToast('error', 'Failed to issue book.');
      return false;
    }
  };

  const returnBook = async (loanIdOrBorrower: string): Promise<boolean> => {
    try {
      const ok = await repository.returnBook(loanIdOrBorrower);
      if (ok) {
        showToast('success', 'Book marked as returned successfully');
        await loadData();
        return true;
      } else {
        showToast('error', 'Loan record not found.');
        return false;
      }
    } catch {
      showToast('error', 'Failed to record return.');
      return false;
    }
  };

  const uploadDocument = async (doc: Partial<DocumentRecord>): Promise<boolean> => {
    try {
      await repository.uploadDocument(doc);
      showToast('success', 'Document uploaded and attached successfully');
      await loadData();
      return true;
    } catch {
      showToast('error', 'Failed to upload document.');
      return false;
    }
  };

  return (
    <LibraryFlowContext.Provider
      value={{
        subScreen,
        books,
        selectedBook,
        libraryKpis,
        overdueBorrowers,
        borrowingRecords,
        documents,
        documentKpis,
        events,
        isLoading,
        toast,
        bookFilters,
        setBookSearchQuery,
        setBookCategory,
        setBookAvailability,
        resetBookFilters,
        borrowingFilters,
        setBorrowingSearchQuery,
        setBorrowingStatus,
        documentFilters,
        setDocumentSearchQuery,
        setDocumentRecordType,
        setDocumentCategory,
        setDocumentStatus,
        resetDocumentFilters,
        goToLibraryInventory,
        goToBookDetails,
        goToDocumentManagement,
        selectBook,
        uploadProgressModalOpen,
        openUploadProgressModal,
        closeUploadProgressModal,
        uploadSuccessModalOpen,
        openUploadSuccessModal,
        closeUploadSuccessModal,
        uploadFailedModalOpen,
        openUploadFailedModal,
        closeUploadFailedModal,
        saveBook,
        issueBook,
        returnBook,
        uploadDocument,
        showToast,
        clearToast,
      }}
    >
      {children}
    </LibraryFlowContext.Provider>
  );
};

export const useLibraryFlow = (): LibraryFlowContextValue => {
  const context = useContext(LibraryFlowContext);
  if (!context) {
    throw new Error('useLibraryFlow must be used within a LibraryFlowProvider');
  }
  return context;
};
