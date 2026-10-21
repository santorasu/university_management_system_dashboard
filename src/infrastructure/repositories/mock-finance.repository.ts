import type {
  FeeCategory,
  Invoice,
  StudentFeeAssignment,
  PaymentReceipt,
  FinanceKpiStats,
  InvoiceFilterState,
} from '../../core/entities/finance.types';
import type {
  IFinanceRepository,
  RecordPaymentPayload,
  AssignFeesPayload,
} from '../../core/repositories/finance.repository.interface';

export class MockFinanceRepository implements IFinanceRepository {
  private categories: FeeCategory[] = [
    { id: 'cat-1', name: 'Tuition fee', frequency: 'Monthly', defaultAmount: 2500, description: 'Core academic monthly tuition fee per student' },
    { id: 'cat-2', name: 'Admission fee', frequency: 'One-time', defaultAmount: 8000, description: 'New student admission registration charge' },
    { id: 'cat-3', name: 'Exam fee', frequency: 'Per term', defaultAmount: 1200, description: 'Term exam paper, hall & question preparation' },
    { id: 'cat-4', name: 'Transport fee', frequency: 'Monthly', defaultAmount: 1500, description: 'School bus transit route service charges' },
    { id: 'cat-5', name: 'Lab & activity', frequency: 'Per term', defaultAmount: 2000, description: 'Science lab consumables and extracurricular sports' },
  ];

  private studentAssignments: StudentFeeAssignment[] = [
    { id: 'asn-1', studentId: 'STU-2026-0184', studentName: 'Ayesha Rahman', className: 'Class 8-A', feeHead: 'Tuition fee · October 2026', amount: 2500, dueDate: '31 Oct 2026', status: 'Paid' },
    { id: 'asn-2', studentId: 'STU-2026-0185', studentName: 'Tanvir Hasan', className: 'Class 8-A', feeHead: 'Tuition fee · October 2026', amount: 2500, dueDate: '31 Oct 2026', status: 'Partially Paid' },
    { id: 'asn-3', studentId: 'STU-2026-0186', studentName: 'Nusrat Jahan', className: 'Class 8-A', feeHead: 'Tuition fee · October 2026', amount: 2500, dueDate: '31 Oct 2026', status: 'Overdue' },
    { id: 'asn-4', studentId: 'STU-2026-0187', studentName: 'Rafi Ahmed', className: 'Class 8-A', feeHead: 'Tuition fee · October 2026', amount: 2500, dueDate: '31 Oct 2026', status: 'Pending' },
    { id: 'asn-5', studentId: 'STU-2026-0188', studentName: 'Mehedi Hasan', className: 'Class 8-A', feeHead: 'Tuition fee · October 2026', amount: 2500, dueDate: '31 Oct 2026', status: 'Paid' },
    { id: 'asn-6', studentId: 'STU-2026-0190', studentName: 'Samira Khan', className: 'Class 8-A', feeHead: 'Tuition fee · October 2026', amount: 2500, dueDate: '31 Oct 2026', status: 'Paid' },
  ];

  private invoices: Invoice[] = [
    {
      id: 'INV-26-1048',
      studentId: 'STU-2026-0184',
      studentName: 'Ayesha Rahman',
      className: 'Class 8-A',
      feeHead: 'Tuition fee · October 2026',
      issueDate: '01 Oct 2026',
      dueDate: '31 Oct 2026',
      amount: 4500,
      discount: 0,
      paidAmount: 4500,
      balance: 0,
      status: 'Paid',
      paymentDate: '18 Oct 2026',
      paymentMethod: 'bKash',
    },
    {
      id: 'INV-26-1042',
      studentId: 'STU-2026-0185',
      studentName: 'Tanvir Hasan',
      className: 'Class 8-A',
      feeHead: 'Tuition fee · October 2026',
      issueDate: '01 Oct 2026',
      dueDate: '31 Oct 2026',
      amount: 2500,
      discount: 200,
      paidAmount: 1000,
      balance: 1300,
      status: 'Partially Paid',
      paymentDate: '16 Oct 2026',
      paymentMethod: 'Bank transfer',
    },
    {
      id: 'INV-26-1037',
      studentId: 'STU-2026-0186',
      studentName: 'Nusrat Jahan',
      className: 'Class 8-A',
      feeHead: 'Tuition fee · October 2026',
      issueDate: '01 Oct 2026',
      dueDate: '15 Oct 2026',
      amount: 3500,
      discount: 0,
      paidAmount: 0,
      balance: 3500,
      status: 'Overdue',
      daysLate: '6 days',
    },
    {
      id: 'INV-26-1029',
      studentId: 'STU-2026-0187',
      studentName: 'Rafi Ahmed',
      className: 'Class 8-A',
      feeHead: 'Tuition fee · October 2026',
      issueDate: '01 Oct 2026',
      dueDate: '31 Oct 2026',
      amount: 2500,
      discount: 0,
      paidAmount: 0,
      balance: 2500,
      status: 'Pending',
    },
    {
      id: 'INV-26-1018',
      studentId: 'STU-2026-0188',
      studentName: 'Mehedi Hasan',
      className: 'Class 8-A',
      feeHead: 'Lab & activity · Term 2',
      issueDate: '15 Sep 2026',
      dueDate: '15 Oct 2026',
      amount: 2000,
      discount: 0,
      paidAmount: 2000,
      balance: 0,
      status: 'Paid',
      paymentDate: '10 Oct 2026',
      paymentMethod: 'Cash',
    },
    {
      id: 'INV-26-1007',
      studentId: 'STU-2026-0189',
      studentName: 'Sadia Akter',
      className: 'Class 7-B',
      feeHead: 'Tuition fee · October 2026',
      issueDate: '01 Oct 2026',
      dueDate: '31 Oct 2026',
      amount: 2500,
      discount: 0,
      paidAmount: 0,
      balance: 2500,
      status: 'Payment failed',
    },
  ];

  private receipts: PaymentReceipt[] = [
    {
      id: 'RCP-2026-1248',
      invoiceId: 'INV-26-1048',
      studentName: 'Ayesha Rahman',
      studentId: 'STU-2026-0184',
      className: 'Class 8-A',
      purpose: 'Tuition fee · October 2026',
      method: 'bKash · 18 Oct 2026',
      date: '18 Oct 2026',
      amountPaid: 2500,
    },
    {
      id: 'RCP-2026-1247',
      invoiceId: 'INV-26-1018',
      studentName: 'Mehedi Hasan',
      studentId: 'STU-2026-0188',
      className: 'Class 8-A',
      purpose: 'Lab & activity · Term 2',
      method: 'Cash · 10 Oct 2026',
      date: '10 Oct 2026',
      amountPaid: 2000,
    },
    {
      id: 'RCP-2026-1246',
      invoiceId: 'INV-26-1042',
      studentName: 'Tanvir Hasan',
      studentId: 'STU-2026-0185',
      className: 'Class 8-A',
      purpose: 'Tuition fee · Partial installment',
      method: 'Bank transfer · 16 Oct 2026',
      date: '16 Oct 2026',
      amountPaid: 1000,
    },
  ];

  private kpiStats: FinanceKpiStats = {
    totalAssigned: 4850000,
    collectedSoFar: 3672500,
    collectionRate: 75.7,
    outstandingDues: 1177500,
    studentsWithDues: 184,
    overdueBalance: 326000,
    overdueCount: 62,
    monthlyCollections: [
      { month: 'Jan', amount: 420000, heightPercent: 62 },
      { month: 'Feb', amount: 460000, heightPercent: 68 },
      { month: 'Mar', amount: 510000, heightPercent: 75 },
      { month: 'Apr', amount: 390000, heightPercent: 55 },
      { month: 'May', amount: 480000, heightPercent: 70 },
      { month: 'Jun', amount: 440000, heightPercent: 65 },
      { month: 'Jul', amount: 520000, heightPercent: 78 },
      { month: 'Aug', amount: 452500, heightPercent: 66 },
    ],
    paymentStatusBreakdown: {
      paid: 3672500,
      pending: 518000,
      overdue: 326000,
      partiallyPaid: 133500,
    },
    duesKpis: {
      outstandingInvoices: 184,
      overdueInvoices: 62,
      discountsApplied: 84500,
      receiptsIssued: 1248,
    },
  };

  async getKpiStats(): Promise<FinanceKpiStats> {
    return { ...this.kpiStats };
  }

  async getFeeCategories(): Promise<FeeCategory[]> {
    return [...this.categories];
  }

  async createFeeCategory(categoryData: Omit<FeeCategory, 'id'>): Promise<FeeCategory> {
    const newCategory: FeeCategory = {
      ...categoryData,
      id: `cat-${Date.now()}`,
    };
    this.categories.push(newCategory);
    return newCategory;
  }

  async getStudentFeeAssignments(filter?: {
    className?: string;
    category?: string;
    period?: string;
  }): Promise<StudentFeeAssignment[]> {
    let result = [...this.studentAssignments];
    if (filter?.className && filter.className !== 'all') {
      result = result.filter((a) => a.className.toLowerCase().includes(filter.className!.toLowerCase()));
    }
    return result;
  }

  async assignFees(payload: AssignFeesPayload): Promise<void> {
    // Generate simulated assignments for students
    const newAssignment: StudentFeeAssignment = {
      id: `asn-${Date.now()}`,
      studentId: 'STU-2026-999',
      studentName: 'Assigned Batch Students',
      className: payload.className,
      feeHead: `${payload.category} · ${payload.period}`,
      amount: 2500 - (payload.discount || 0),
      dueDate: payload.dueDate,
      status: 'Pending',
    };
    this.studentAssignments.unshift(newAssignment);
  }

  async getInvoices(filter?: Partial<InvoiceFilterState>): Promise<Invoice[]> {
    let result = [...this.invoices];
    if (filter?.searchQuery) {
      const q = filter.searchQuery.toLowerCase();
      result = result.filter(
        (inv) =>
          inv.id.toLowerCase().includes(q) ||
          inv.studentName.toLowerCase().includes(q) ||
          inv.studentId.toLowerCase().includes(q)
      );
    }
    if (filter?.status && filter.status !== 'all') {
      result = result.filter((inv) => inv.status.toLowerCase() === filter.status!.toLowerCase());
    }
    return result;
  }

  async getInvoiceById(id: string): Promise<Invoice | null> {
    return this.invoices.find((inv) => inv.id === id) || null;
  }

  async recordPayment(invoiceId: string, payload: RecordPaymentPayload): Promise<Invoice> {
    const idx = this.invoices.findIndex((inv) => inv.id === invoiceId);
    if (idx === -1) throw new Error(`Invoice ${invoiceId} not found`);

    const inv = this.invoices[idx];
    const newPaidAmount = inv.paidAmount + payload.amount;
    const newBalance = Math.max(0, inv.amount - inv.discount - newPaidAmount);
    const newStatus = newBalance === 0 ? 'Paid' : 'Partially Paid';

    const updated: Invoice = {
      ...inv,
      paidAmount: newPaidAmount,
      balance: newBalance,
      status: newStatus,
      paymentDate: payload.paymentDate,
      paymentMethod: payload.paymentMethod,
    };
    this.invoices[idx] = updated;

    // Also record receipt
    const newReceipt: PaymentReceipt = {
      id: `RCP-2026-${1248 + this.receipts.length + 1}`,
      invoiceId: inv.id,
      studentName: inv.studentName,
      studentId: inv.studentId,
      className: inv.className,
      purpose: inv.feeHead,
      method: `${payload.paymentMethod} · ${payload.paymentDate}`,
      date: payload.paymentDate,
      amountPaid: payload.amount,
    };
    this.receipts.unshift(newReceipt);

    // Update KPI stats
    this.kpiStats.collectedSoFar += payload.amount;
    this.kpiStats.outstandingDues = Math.max(0, this.kpiStats.outstandingDues - payload.amount);

    return updated;
  }

  async getPaymentReceipts(): Promise<PaymentReceipt[]> {
    return [...this.receipts];
  }

  async getReceiptById(receiptId: string): Promise<PaymentReceipt | null> {
    return this.receipts.find((r) => r.id === receiptId) || null;
  }

  async sendDuesReminders(_studentIds?: string[]): Promise<{ count: number }> {
    const count = this.invoices.filter((i) => i.status === 'Overdue' || i.status === 'Pending').length;
    return { count };
  }
}
