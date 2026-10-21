import type {
  FeeCategory,
  Invoice,
  StudentFeeAssignment,
  PaymentReceipt,
  FinanceKpiStats,
  InvoiceFilterState,
  PaymentMethod,
} from '../entities/finance.types';

export interface RecordPaymentPayload {
  amount: number;
  paymentDate: string;
  paymentMethod: PaymentMethod;
  remarks?: string;
}

export interface AssignFeesPayload {
  academicYear: string;
  className: string;
  category: string;
  period: string;
  dueDate: string;
  discount?: number;
}

export interface IFinanceRepository {
  getKpiStats(): Promise<FinanceKpiStats>;
  getFeeCategories(): Promise<FeeCategory[]>;
  createFeeCategory(category: Omit<FeeCategory, 'id'>): Promise<FeeCategory>;
  getStudentFeeAssignments(filter?: {
    className?: string;
    category?: string;
    period?: string;
  }): Promise<StudentFeeAssignment[]>;
  assignFees(payload: AssignFeesPayload): Promise<void>;
  getInvoices(filter?: Partial<InvoiceFilterState>): Promise<Invoice[]>;
  getInvoiceById(id: string): Promise<Invoice | null>;
  recordPayment(invoiceId: string, payload: RecordPaymentPayload): Promise<Invoice>;
  getPaymentReceipts(): Promise<PaymentReceipt[]>;
  getReceiptById(receiptId: string): Promise<PaymentReceipt | null>;
  sendDuesReminders(studentIds?: string[]): Promise<{ count: number }>;
}
