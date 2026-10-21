export type FeeFrequency = 'Monthly' | 'Per term' | 'One-time' | 'Annual';

export type InvoiceStatus =
  | 'Paid'
  | 'Partially Paid'
  | 'Pending'
  | 'Overdue'
  | 'Payment failed';

export type PaymentMethod =
  | 'bKash'
  | 'Nagad'
  | 'Bank transfer'
  | 'Cash'
  | 'Credit Card';

export interface FeeCategory {
  id: string;
  name: string;
  frequency: FeeFrequency;
  defaultAmount: number;
  description?: string;
}

export interface Invoice {
  id: string;               // e.g. "INV-26-1048"
  studentId: string;         // e.g. "STU-2026-0184"
  studentName: string;       // e.g. "Ayesha Rahman"
  className: string;         // e.g. "Class 8-A"
  feeHead: string;           // e.g. "Tuition fee · October 2026"
  issueDate: string;         // e.g. "01 Oct 2026"
  dueDate: string;           // e.g. "31 Oct 2026"
  amount: number;            // e.g. 2500
  discount: number;          // e.g. 200
  paidAmount: number;        // e.g. 1000
  balance: number;           // e.g. 1300
  status: InvoiceStatus;
  paymentDate?: string;      // e.g. "18 Oct 2026"
  paymentMethod?: PaymentMethod;
  daysLate?: string;         // e.g. "18 days"
}

export interface StudentFeeAssignment {
  id: string;
  studentId: string;
  studentName: string;
  className: string;
  feeHead: string;
  amount: number;
  dueDate: string;
  status: InvoiceStatus;
}

export interface PaymentReceipt {
  id: string;                // e.g. "RCP-2026-1248"
  invoiceId: string;
  studentName: string;
  studentId?: string;
  className: string;
  purpose: string;           // e.g. "Tuition fee · October 2026"
  method: string;            // e.g. "bKash · 18 Oct 2026"
  date: string;              // e.g. "18 Oct 2026"
  amountPaid: number;        // e.g. 2500
}

export interface MonthlyCollectionItem {
  month: string;             // e.g. "Jan", "Feb", etc.
  amount: number;            // e.g. 480000
  heightPercent: number;     // e.g. 80
}

export interface FinanceKpiStats {
  totalAssigned: number;     // 4850000
  collectedSoFar: number;    // 3672500
  collectionRate: number;    // 75.7
  outstandingDues: number;   // 1177500
  studentsWithDues: number;  // 184
  overdueBalance: number;    // 326000
  overdueCount: number;      // 62
  monthlyCollections: MonthlyCollectionItem[];
  paymentStatusBreakdown: {
    paid: number;            // 3672500
    pending: number;         // 518000
    overdue: number;         // 326000
    partiallyPaid: number;   // 133500
  };
  duesKpis: {
    outstandingInvoices: number; // 184
    overdueInvoices: number;     // 62
    discountsApplied: number;    // 84500
    receiptsIssued: number;      // 1248
  };
}

export type FeesScreenId =
  | 'OVERVIEW'
  | 'CATEGORIES_ASSIGNMENT'
  | 'INVOICES_PAYMENTS'
  | 'DUES_REPORTS';

export interface InvoiceFilterState {
  searchQuery: string;
  status: string;
  category: string;
  dateRange: string;
}
