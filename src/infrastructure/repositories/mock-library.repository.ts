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
} from '../../core/entities/library.types';
import type { ILibraryRepository } from '../../core/repositories/library.repository.interface';

export class MockLibraryRepository implements ILibraryRepository {
  private books: BookItem[] = [
    {
      id: 'book-1',
      title: 'Introduction to Algorithms',
      author: 'Thomas H. Cormen',
      isbn: '978-0262046305',
      category: 'Computer Science',
      availableCopies: 8,
      totalCopies: 10,
      status: 'Available',
      shelfLocation: 'Shelf A-03',
      edition: '4th edition',
      description: 'Comprehensive textbook on modern algorithm design and complexity analysis.',
    },
    {
      id: 'book-2',
      title: 'Clean Code',
      author: 'Robert C. Martin',
      isbn: '978-0132350884',
      category: 'Programming',
      availableCopies: 3,
      totalCopies: 5,
      status: 'Available',
      shelfLocation: 'Shelf A-01',
      edition: '1st edition',
      description: 'A handbook of agile software craftsmanship and maintainable engineering.',
    },
    {
      id: 'book-3',
      title: 'Discrete Mathematics',
      author: 'Kenneth H. Rosen',
      isbn: '978-0132350800',
      category: 'Mathematics',
      availableCopies: 0,
      totalCopies: 6,
      status: 'Out of stock',
      shelfLocation: 'Shelf B-02',
      edition: '8th edition',
      description: 'Discrete mathematics and its applications for mathematical computing.',
    },
    {
      id: 'book-4',
      title: 'Physics for Scientists',
      author: 'Raymond A. Serway',
      isbn: '978-1337553278',
      category: 'Science',
      availableCopies: 2,
      totalCopies: 8,
      status: 'Available',
      shelfLocation: 'Shelf C-01',
      edition: '10th edition',
      description: 'Foundational physics textbook covering mechanics, waves, and thermodynamics.',
    },
    {
      id: 'book-5',
      title: 'English Grammar in Use',
      author: 'Raymond Murphy',
      isbn: '978-1108457651',
      category: 'Language',
      availableCopies: 1,
      totalCopies: 4,
      status: 'Low stock',
      shelfLocation: 'Shelf D-04',
      edition: '5th edition',
      description: 'Self-study reference and practice book for intermediate learners of English.',
    },
    {
      id: 'book-6',
      title: 'Database System Concepts',
      author: 'Abraham Silberschatz',
      isbn: '978-0078022159',
      category: 'Computer Science',
      availableCopies: 0,
      totalCopies: 5,
      status: 'Out of stock',
      shelfLocation: 'Shelf A-04',
      edition: '7th edition',
      description: 'Fundamental concepts of relational database systems, indexing, and SQL.',
    },
  ];

  private overdueBorrowers: OverdueBorrowerItem[] = [
    {
      id: 'overdue-1',
      borrowerName: 'Rafi Ahmed',
      borrowerRole: 'Student · Class 9-A',
      bookTitle: 'Clean Code',
      overdueDays: 12,
    },
    {
      id: 'overdue-2',
      borrowerName: 'Ayesha Rahman',
      borrowerRole: 'Student · Class 8-A',
      bookTitle: 'Physics for Scientists',
      overdueDays: 7,
    },
    {
      id: 'overdue-3',
      borrowerName: 'Nusrat Jahan',
      borrowerRole: 'Student · Class 7-B',
      bookTitle: 'English Grammar in Use',
      overdueDays: 4,
    },
  ];

  private borrowingRecords: BorrowingRecord[] = [
    {
      id: 'LOAN-1001',
      borrowerName: 'Ayesha Rahman',
      borrowerType: 'Student',
      borrowerId: 'STU-0184',
      bookId: 'book-2',
      bookTitle: 'Clean Code',
      issueDate: '02 Oct 2026',
      dueDate: '16 Oct 2026',
      status: 'Overdue',
    },
    {
      id: 'LOAN-1002',
      borrowerName: 'Md. Taufiqur Rahman',
      borrowerType: 'Teacher',
      borrowerId: 'TCH-0031',
      bookId: 'book-6',
      bookTitle: 'Database System Concepts',
      issueDate: '10 Oct 2026',
      dueDate: '24 Oct 2026',
      status: 'Active',
    },
    {
      id: 'LOAN-1003',
      borrowerName: 'Tanvir Hasan',
      borrowerType: 'Student',
      borrowerId: 'STU-0201',
      bookId: 'book-4',
      bookTitle: 'Physics for Scientists',
      issueDate: '01 Oct 2026',
      dueDate: '15 Oct 2026',
      returnDate: '17 Oct 2026',
      status: 'Returned',
    },
    {
      id: 'LOAN-1004',
      borrowerName: 'Nusrat Jahan',
      borrowerType: 'Student',
      borrowerId: 'STU-0142',
      bookId: 'book-5',
      bookTitle: 'English Grammar in Use',
      issueDate: '05 Oct 2026',
      dueDate: '19 Oct 2026',
      status: 'Overdue',
    },
    {
      id: 'LOAN-1005',
      borrowerName: 'Rafi Ahmed',
      borrowerType: 'Student',
      borrowerId: 'STU-0112',
      bookId: 'book-1',
      bookTitle: 'Introduction to Algorithms',
      issueDate: '18 Sep 2026',
      dueDate: '02 Oct 2026',
      status: 'Overdue',
    },
  ];

  private documents: DocumentRecord[] = [
    {
      id: 'doc-1',
      personName: 'Ayesha Rahman',
      personId: 'STU-0184',
      personType: 'Student',
      documentTitle: 'Birth certificate.pdf',
      category: 'Student identity',
      uploadDate: '12 Oct 2026',
      status: 'Verified',
      attachmentSize: 'PDF · 1.2 MB',
      fileName: 'birth-certificate-0184.pdf',
    },
    {
      id: 'doc-2',
      personName: 'Tanvir Hasan',
      personId: 'STU-0201',
      personType: 'Student',
      documentTitle: 'Previous transcript.pdf',
      category: 'Academic record',
      uploadDate: '11 Oct 2026',
      status: 'Verified',
      attachmentSize: 'PDF · 840 KB',
      fileName: 'transcript-tanvir-2026.pdf',
    },
    {
      id: 'doc-3',
      personName: 'Nusrat Jahan',
      personId: 'STU-0142',
      personType: 'Student',
      documentTitle: 'Guardian NID.pdf',
      category: 'Guardian details',
      uploadDate: '09 Oct 2026',
      status: 'Pending review',
      attachmentSize: 'PDF · 620 KB',
      fileName: 'guardian-nid-0142.pdf',
    },
    {
      id: 'doc-4',
      personName: 'Md. Taufiqur Rahman',
      personId: 'TCH-0031',
      personType: 'Teacher',
      documentTitle: 'Appointment letter.pdf',
      category: 'Employment',
      uploadDate: '05 Oct 2026',
      status: 'Verified',
      attachmentSize: 'PDF · 1.4 MB',
      fileName: 'appointment-tch-0031.pdf',
    },
    {
      id: 'doc-5',
      personName: 'Rafat Meraz',
      personId: 'TCH-0024',
      personType: 'Teacher',
      documentTitle: 'Qualification certificate.pdf',
      category: 'Qualification',
      uploadDate: '01 Oct 2026',
      status: 'Missing',
      attachmentSize: 'No attachment',
      fileName: '',
    },
  ];

  private events: SchoolEventItem[] = [
    {
      id: 'evt-1',
      title: 'Parent–Teacher Meeting',
      type: 'Academic',
      date: '20 Oct 2026',
      startTime: '09:00 AM',
      endTime: '11:00 AM',
      timeRange: '09:00–11:00',
      audience: 'Parents · Class 6–8',
      location: 'Main auditorium',
      description: 'Term 1 progress review and parent-teacher collaboration session.',
    },
    {
      id: 'evt-2',
      title: 'Term 1 Examination',
      type: 'Academic',
      date: '22 Oct 2026',
      startTime: '10:00 AM',
      endTime: '01:00 PM',
      timeRange: '10:00–13:00',
      audience: 'Students · Class 6–10',
      location: 'Examination Halls A & B',
      description: 'Midterm written assessments across enrolled classes.',
    },
    {
      id: 'evt-3',
      title: 'Cultural Day',
      type: 'Cultural',
      date: '28 Oct 2026',
      startTime: '08:30 AM',
      endTime: '03:00 PM',
      timeRange: '08:30–15:00',
      audience: 'All school community',
      location: 'Campus Open Arena',
      description: 'Annual cultural festival with drama, music, and art exhibits.',
    },
    {
      id: 'evt-4',
      title: 'School Holiday',
      type: 'Holiday',
      date: '01 Nov 2026',
      startTime: '08:00 AM',
      endTime: '05:00 PM',
      timeRange: 'All day',
      audience: 'All audiences',
      location: 'Campus Wide',
      description: 'Scheduled school holiday for students and faculty.',
    },
    {
      id: 'evt-5',
      title: 'Assembly',
      type: 'School event',
      date: '06 Oct 2026',
      startTime: '08:00 AM',
      endTime: '09:00 AM',
      timeRange: '08:00–09:00',
      audience: 'All school community',
      location: 'School Courtyard',
      description: 'Weekly assembly and merit awards recognition.',
    },
    {
      id: 'evt-6',
      title: 'Sports Day',
      type: 'Sports',
      date: '19 Oct 2026',
      startTime: '09:00 AM',
      endTime: '04:00 PM',
      timeRange: '09:00–16:00',
      audience: 'Students & Parents',
      location: 'Athletic Field',
      description: 'Annual inter-house athletic competition.',
    },
  ];

  async getBooks(filters?: BookFilterOptions): Promise<BookItem[]> {
    return this.books.filter((b) => {
      if (filters?.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        const matches =
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          b.isbn.toLowerCase().includes(q);
        if (!matches) return false;
      }
      if (filters?.category && filters.category !== 'All categories') {
        if (b.category !== filters.category) return false;
      }
      if (filters?.availability && filters.availability !== 'All statuses') {
        if (b.status !== filters.availability) return false;
      }
      return true;
    });
  }

  async getBookById(id: string): Promise<BookItem | null> {
    return this.books.find((b) => b.id === id) || null;
  }

  async saveBook(book: Partial<BookItem>): Promise<BookItem> {
    if (book.id) {
      const idx = this.books.findIndex((b) => b.id === book.id);
      if (idx !== -1) {
        this.books[idx] = { ...this.books[idx], ...book } as BookItem;
        return this.books[idx];
      }
    }
    const newBook: BookItem = {
      id: `book-${Date.now()}`,
      title: book.title || 'Untitled Book',
      author: book.author || 'Unknown Author',
      isbn: book.isbn || 'ISBN-978-0000000000',
      category: book.category || 'General',
      availableCopies: book.availableCopies ?? 1,
      totalCopies: book.totalCopies ?? 1,
      status: (book.availableCopies ?? 1) > 0 ? 'Available' : 'Out of stock',
      shelfLocation: book.shelfLocation || 'Shelf A-01',
      edition: book.edition || '1st edition',
      description: book.description,
    };
    this.books.unshift(newBook);
    return newBook;
  }

  async getLibraryKpis(): Promise<LibraryKpiStats> {
    return {
      totalTitles: 1284,
      totalTitlesSubtext: 'Across all categories',
      availableCopies: 936,
      availableCopiesSubtext: 'Ready to issue',
      currentlyIssued: 278,
      currentlyIssuedSubtext: 'Active loans',
      overdueBooks: 24,
      overdueBooksSubtext: 'Needs follow-up',
    };
  }

  async getOverdueBorrowers(): Promise<OverdueBorrowerItem[]> {
    return this.overdueBorrowers;
  }

  async getBorrowingRecords(filters?: BorrowingFilterOptions): Promise<BorrowingRecord[]> {
    return this.borrowingRecords.filter((rec) => {
      if (filters?.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        const matches =
          rec.borrowerName.toLowerCase().includes(q) ||
          rec.bookTitle.toLowerCase().includes(q) ||
          rec.id.toLowerCase().includes(q);
        if (!matches) return false;
      }
      if (filters?.status && filters.status !== 'All statuses') {
        if (rec.status !== filters.status) return false;
      }
      return true;
    });
  }

  async issueBook(record: Partial<BorrowingRecord>): Promise<BorrowingRecord> {
    const newRecord: BorrowingRecord = {
      id: `LOAN-${1000 + this.borrowingRecords.length + 1}`,
      borrowerName: record.borrowerName || 'Selected Borrower',
      borrowerType: record.borrowerType || 'Student',
      borrowerId: record.borrowerId || 'STU-0000',
      bookId: record.bookId || 'book-2',
      bookTitle: record.bookTitle || 'Clean Code',
      issueDate: record.issueDate || '18 Oct 2026',
      dueDate: record.dueDate || '01 Nov 2026',
      status: 'Active',
    };
    this.borrowingRecords.unshift(newRecord);

    // decrease available copies on corresponding book
    const b = this.books.find((bk) => bk.id === newRecord.bookId || bk.title === newRecord.bookTitle);
    if (b && b.availableCopies > 0) {
      b.availableCopies -= 1;
      b.status = b.availableCopies === 0 ? 'Out of stock' : b.availableCopies <= 2 ? 'Low stock' : 'Available';
    }
    return newRecord;
  }

  async returnBook(loanIdOrBorrower: string): Promise<boolean> {
    const loan = this.borrowingRecords.find(
      (l) => l.id.toLowerCase() === loanIdOrBorrower.toLowerCase() || l.borrowerName.toLowerCase().includes(loanIdOrBorrower.toLowerCase())
    );
    if (loan) {
      loan.status = 'Returned';
      loan.returnDate = '18 Oct 2026';
      const b = this.books.find((bk) => bk.id === loan.bookId || bk.title === loan.bookTitle);
      if (b) {
        b.availableCopies += 1;
        b.status = b.availableCopies > 2 ? 'Available' : 'Low stock';
      }
      return true;
    }
    return false;
  }

  async getDocuments(filters?: DocumentFilterOptions): Promise<DocumentRecord[]> {
    return this.documents.filter((doc) => {
      if (filters?.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        const matches =
          doc.personName.toLowerCase().includes(q) ||
          doc.personId.toLowerCase().includes(q) ||
          doc.documentTitle.toLowerCase().includes(q) ||
          doc.category.toLowerCase().includes(q);
        if (!matches) return false;
      }
      if (filters?.recordType && filters.recordType !== 'Students and teachers') {
        if (filters.recordType === 'Students only' && doc.personType !== 'Student') return false;
        if (filters.recordType === 'Teachers only' && doc.personType !== 'Teacher') return false;
      }
      if (filters?.category && filters.category !== 'All categories') {
        if (doc.category !== filters.category) return false;
      }
      if (filters?.status && filters.status !== 'All statuses') {
        if (doc.status !== filters.status) return false;
      }
      return true;
    });
  }

  async getDocumentKpis(): Promise<DocumentKpiStats> {
    return {
      studentDocuments: 1842,
      studentDocumentsSubtext: 'Across enrolled students',
      teacherDocuments: 326,
      teacherDocumentsSubtext: 'Staff records',
      pendingReview: 17,
      pendingReviewSubtext: 'Needs verification',
      missingDocuments: 28,
      missingDocumentsSubtext: 'Follow-up required',
    };
  }

  async uploadDocument(doc: Partial<DocumentRecord>): Promise<DocumentRecord> {
    const newDoc: DocumentRecord = {
      id: `doc-${Date.now()}`,
      personName: doc.personName || 'Ayesha Rahman',
      personId: doc.personId || 'STU-0184',
      personType: doc.personType || 'Student',
      documentTitle: doc.documentTitle || 'school-record.pdf',
      category: doc.category || 'Student identity',
      uploadDate: '18 Oct 2026',
      status: 'Verified',
      attachmentSize: 'PDF · 1.2 MB',
      fileName: doc.fileName || 'school-record.pdf',
    };
    this.documents.unshift(newDoc);
    return newDoc;
  }

  async getSchoolEvents(): Promise<SchoolEventItem[]> {
    return this.events;
  }

  async saveSchoolEvent(event: Partial<SchoolEventItem>): Promise<SchoolEventItem> {
    if (event.id) {
      const idx = this.events.findIndex((e) => e.id === event.id);
      if (idx !== -1) {
        this.events[idx] = { ...this.events[idx], ...event } as SchoolEventItem;
        return this.events[idx];
      }
    }
    const newEvt: SchoolEventItem = {
      id: `evt-${Date.now()}`,
      title: event.title || 'New School Event',
      type: event.type || 'Academic',
      date: event.date || '20 Oct 2026',
      startTime: event.startTime || '09:00 AM',
      endTime: event.endTime || '11:00 AM',
      timeRange: event.timeRange || `${event.startTime || '09:00'}–${event.endTime || '11:00'}`,
      audience: event.audience || 'All school community',
      location: event.location || 'Main auditorium',
      description: event.description,
      isDraft: event.isDraft ?? false,
    };
    this.events.unshift(newEvt);
    return newEvt;
  }
}
