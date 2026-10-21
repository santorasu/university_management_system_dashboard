export type BookCategory =
  | 'Computer Science'
  | 'Programming'
  | 'Mathematics'
  | 'Science'
  | 'Language'
  | 'General';

export type BookAvailabilityStatus = 'Available' | 'Low stock' | 'Out of stock';

export interface BookItem {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: BookCategory | string;
  availableCopies: number;
  totalCopies: number;
  status: BookAvailabilityStatus;
  shelfLocation: string;
  edition: string;
  coverColor?: string;
  description?: string;
}

export interface OverdueBorrowerItem {
  id: string;
  borrowerName: string;
  borrowerRole: string;
  bookTitle: string;
  overdueDays: number;
}

export type LoanStatus = 'Active' | 'Overdue' | 'Returned';

export interface BorrowingRecord {
  id: string;
  borrowerName: string;
  borrowerType: 'Student' | 'Teacher';
  borrowerId: string;
  bookId: string;
  bookTitle: string;
  issueDate: string;
  dueDate: string;
  returnDate?: string;
  status: LoanStatus;
}

export type DocumentStatus = 'Verified' | 'Pending review' | 'Missing';

export interface DocumentRecord {
  id: string;
  personName: string;
  personId: string;
  personType: 'Student' | 'Teacher';
  documentTitle: string;
  category: string;
  uploadDate: string;
  status: DocumentStatus;
  attachmentSize?: string;
  fileName?: string;
}

export type EventType = 'Academic' | 'Holiday' | 'Sports' | 'Cultural' | 'School event';

export interface SchoolEventItem {
  id: string;
  title: string;
  type: EventType;
  date: string; // e.g. "20 Oct 2026" or "2026-10-20"
  startTime: string; // e.g. "09:00 AM" or "09:00"
  endTime: string; // e.g. "11:00 AM" or "11:00"
  timeRange: string; // e.g. "09:00–11:00"
  audience: string; // e.g. "Parents · Class 6–8", "All school community"
  location: string;
  description?: string;
  isDraft?: boolean;
}

export interface LibraryKpiStats {
  totalTitles: number;
  totalTitlesSubtext: string;
  availableCopies: number;
  availableCopiesSubtext: string;
  currentlyIssued: number;
  currentlyIssuedSubtext: string;
  overdueBooks: number;
  overdueBooksSubtext: string;
}

export interface DocumentKpiStats {
  studentDocuments: number;
  studentDocumentsSubtext: string;
  teacherDocuments: number;
  teacherDocumentsSubtext: string;
  pendingReview: number;
  pendingReviewSubtext: string;
  missingDocuments: number;
  missingDocumentsSubtext: string;
}

export interface BookFilterOptions {
  searchQuery: string;
  category: string;
  availability: string;
}

export interface BorrowingFilterOptions {
  searchQuery: string;
  status: string;
}

export interface DocumentFilterOptions {
  searchQuery: string;
  recordType: string;
  category: string;
  status: string;
}

export type LibrarySubScreen =
  | 'LIBRARY_INVENTORY'
  | 'BOOK_DETAILS_LENDING'
  | 'DOCUMENT_MANAGEMENT';
