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
} from '../entities/library.types';

export interface ILibraryRepository {
  getBooks(filters?: BookFilterOptions): Promise<BookItem[]>;
  getBookById(id: string): Promise<BookItem | null>;
  saveBook(book: Partial<BookItem>): Promise<BookItem>;
  getLibraryKpis(): Promise<LibraryKpiStats>;
  getOverdueBorrowers(): Promise<OverdueBorrowerItem[]>;

  getBorrowingRecords(filters?: BorrowingFilterOptions): Promise<BorrowingRecord[]>;
  issueBook(record: Partial<BorrowingRecord>): Promise<BorrowingRecord>;
  returnBook(loanIdOrBorrower: string): Promise<boolean>;

  getDocuments(filters?: DocumentFilterOptions): Promise<DocumentRecord[]>;
  getDocumentKpis(): Promise<DocumentKpiStats>;
  uploadDocument(doc: Partial<DocumentRecord>): Promise<DocumentRecord>;

  getSchoolEvents(): Promise<SchoolEventItem[]>;
  saveSchoolEvent(event: Partial<SchoolEventItem>): Promise<SchoolEventItem>;
}
