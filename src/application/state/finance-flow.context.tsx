import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type {
  FeesScreenId,
  FinanceKpiStats,
  FeeCategory,
  Invoice,
  StudentFeeAssignment,
  PaymentReceipt,
  InvoiceFilterState,
  PaymentMethod,
  FeeFrequency,
} from '../../core/entities/finance.types';
import type { AssignFeesPayload } from '../../core/repositories/finance.repository.interface';
import { MockFinanceRepository } from '../../infrastructure/repositories/mock-finance.repository';

interface FinanceContextType {
  currentScreen: FeesScreenId;
  setCurrentScreen: (screen: FeesScreenId) => void;
  kpis: FinanceKpiStats | null;
  categories: FeeCategory[];
  assignments: StudentFeeAssignment[];
  invoices: Invoice[];
  selectedInvoice: Invoice | null;
  setSelectedInvoice: (inv: Invoice | null) => void;
  receipts: PaymentReceipt[];
  selectedReceipt: PaymentReceipt | null;
  setSelectedReceipt: (receipt: PaymentReceipt | null) => void;
  filterState: InvoiceFilterState;
  setFilterState: React.Dispatch<React.SetStateAction<InvoiceFilterState>>;
  isLoading: boolean;
  toastMessage: string | null;
  showToast: (msg: string) => void;

  // Modals
  isRecordPaymentOpen: boolean;
  openRecordPaymentModal: (invoice?: Invoice) => void;
  closeRecordPaymentModal: () => void;
  isAddCategoryOpen: boolean;
  openAddCategoryModal: () => void;
  closeAddCategoryModal: () => void;
  isAssignFeeOpen: boolean;
  openAssignFeeModal: () => void;
  closeAssignFeeModal: () => void;
  isReceiptModalOpen: boolean;
  openReceiptModal: (receipt: PaymentReceipt) => void;
  closeReceiptModal: () => void;

  // Actions
  recordPayment: (invoiceId: string, amount: number, method: PaymentMethod, date: string, remarks?: string) => Promise<void>;
  createCategory: (name: string, frequency: FeeFrequency, defaultAmount: number, description?: string) => Promise<void>;
  assignFeeBatch: (payload: AssignFeesPayload) => Promise<void>;
  sendReminders: () => Promise<number>;
  refreshData: () => Promise<void>;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

const repository = new MockFinanceRepository();

export const FinanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<FeesScreenId>('OVERVIEW');
  const [kpis, setKpis] = useState<FinanceKpiStats | null>(null);
  const [categories, setCategories] = useState<FeeCategory[]>([]);
  const [assignments, setAssignments] = useState<StudentFeeAssignment[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [receipts, setReceipts] = useState<PaymentReceipt[]>([]);
  const [selectedReceipt, setSelectedReceipt] = useState<PaymentReceipt | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [filterState, setFilterState] = useState<InvoiceFilterState>({
    searchQuery: '',
    status: 'all',
    category: 'all',
    dateRange: 'all',
  });

  // Modal States
  const [isRecordPaymentOpen, setIsRecordPaymentOpen] = useState(false);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [isAssignFeeOpen, setIsAssignFeeOpen] = useState(false);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  }, []);

  const refreshData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [kpiData, catData, assignData, invData, rcpData] = await Promise.all([
        repository.getKpiStats(),
        repository.getFeeCategories(),
        repository.getStudentFeeAssignments(),
        repository.getInvoices(filterState),
        repository.getPaymentReceipts(),
      ]);
      setKpis(kpiData);
      setCategories(catData);
      setAssignments(assignData);
      setInvoices(invData);
      setReceipts(rcpData);

      // default selected invoice if none or missing
      if (!selectedInvoice && invData.length > 1) {
        setSelectedInvoice(invData[1]); // Default to INV-26-1042 like in Figma inspector
      } else if (selectedInvoice) {
        const found = invData.find((i) => i.id === selectedInvoice.id);
        if (found) setSelectedInvoice(found);
      }

      if (!selectedReceipt && rcpData.length > 0) {
        setSelectedReceipt(rcpData[0]); // Default to RCP-2026-1248
      }
    } catch (err) {
      console.error('Failed to load finance data', err);
    } finally {
      setIsLoading(false);
    }
  }, [filterState, selectedInvoice, selectedReceipt]);

  useEffect(() => {
    refreshData();
  }, [filterState]);

  const openRecordPaymentModal = (invoice?: Invoice) => {
    if (invoice) {
      setSelectedInvoice(invoice);
    }
    setIsRecordPaymentOpen(true);
  };

  const closeRecordPaymentModal = () => setIsRecordPaymentOpen(false);

  const openAddCategoryModal = () => setIsAddCategoryOpen(true);
  const closeAddCategoryModal = () => setIsAddCategoryOpen(false);

  const openAssignFeeModal = () => setIsAssignFeeOpen(true);
  const closeAssignFeeModal = () => setIsAssignFeeOpen(false);

  const openReceiptModal = (receipt: PaymentReceipt) => {
    setSelectedReceipt(receipt);
    setIsReceiptModalOpen(true);
  };
  const closeReceiptModal = () => setIsReceiptModalOpen(false);

  const recordPayment = async (
    invoiceId: string,
    amount: number,
    method: PaymentMethod,
    date: string,
    remarks?: string
  ) => {
    const updated = await repository.recordPayment(invoiceId, {
      amount,
      paymentDate: date,
      paymentMethod: method,
      remarks,
    });
    showToast(`Payment of ৳ ${amount.toLocaleString()} recorded successfully for ${updated.studentName}!`);
    await refreshData();
    setSelectedInvoice(updated);
  };

  const createCategory = async (
    name: string,
    frequency: FeeFrequency,
    defaultAmount: number,
    description?: string
  ) => {
    const cat = await repository.createFeeCategory({ name, frequency, defaultAmount, description });
    showToast(`Fee category "${cat.name}" created!`);
    await refreshData();
  };

  const assignFeeBatch = async (payload: AssignFeesPayload) => {
    await repository.assignFees(payload);
    showToast(`Fees successfully assigned for ${payload.className}!`);
    await refreshData();
  };

  const sendReminders = async (): Promise<number> => {
    const res = await repository.sendDuesReminders();
    showToast(`Due reminders dispatched to ${res.count} students via SMS and Portal!`);
    return res.count;
  };

  return (
    <FinanceContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        kpis,
        categories,
        assignments,
        invoices,
        selectedInvoice,
        setSelectedInvoice,
        receipts,
        selectedReceipt,
        setSelectedReceipt,
        filterState,
        setFilterState,
        isLoading,
        toastMessage,
        showToast,
        isRecordPaymentOpen,
        openRecordPaymentModal,
        closeRecordPaymentModal,
        isAddCategoryOpen,
        openAddCategoryModal,
        closeAddCategoryModal,
        isAssignFeeOpen,
        openAssignFeeModal,
        closeAssignFeeModal,
        isReceiptModalOpen,
        openReceiptModal,
        closeReceiptModal,
        recordPayment,
        createCategory,
        assignFeeBatch,
        sendReminders,
        refreshData,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
};
