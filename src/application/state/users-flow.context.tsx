import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type {
  UserAccount,
  UsersKpiStats,
  UsersFilterOptions,
  UsersSubScreen,
  SensitiveConfirmationDialog,
} from '../../core/entities/users.types';
import { mockUsersRepository } from '../../infrastructure/repositories/mock-users.repository';

interface UsersFlowContextValue {
  currentSubScreen: UsersSubScreen;
  kpis: UsersKpiStats | null;
  users: UserAccount[];
  filters: UsersFilterOptions;
  selectedUser: UserAccount | null;
  dialog: SensitiveConfirmationDialog;
  isLoading: boolean;
  toastMessage: string | null;

  setFilter: (field: keyof UsersFilterOptions, val: string) => void;
  applyFilters: () => void;
  resetFilters: () => void;

  goToCreateAccount: () => void;
  goToEditAccount: (user: UserAccount) => void;
  goToDirectory: () => void;

  saveAccount: (payload: Partial<UserAccount>) => Promise<void>;
  openConfirmationDialog: (type: 'RESET_PASSWORD' | 'DEACTIVATE' | 'REACTIVATE', account: UserAccount) => void;
  closeConfirmationDialog: () => void;
  confirmSensitiveAction: () => Promise<void>;
}

const defaultFilters: UsersFilterOptions = {
  search: '',
  role: 'All supported roles',
  status: 'All statuses',
};

const UsersFlowContext = createContext<UsersFlowContextValue | undefined>(undefined);

export const UsersFlowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSubScreen, setCurrentSubScreen] = useState<UsersSubScreen>('DIRECTORY');
  const [kpis, setKpis] = useState<UsersKpiStats | null>(null);
  const [users, setUsers] = useState<UserAccount[]>([]);
  const [filters, setFilters] = useState<UsersFilterOptions>(defaultFilters);
  const [appliedFilters, setAppliedFilters] = useState<UsersFilterOptions>(defaultFilters);
  const [selectedUser, setSelectedUser] = useState<UserAccount | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [dialog, setDialog] = useState<SensitiveConfirmationDialog>({
    isOpen: false,
    type: null,
    account: null,
  });

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  }, []);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [k, u] = await Promise.all([
        mockUsersRepository.getKpiStats(),
        mockUsersRepository.getUsers(appliedFilters),
      ]);
      setKpis(k);
      setUsers(u);
    } catch {
      showToast('Failed to load user accounts.');
    } finally {
      setIsLoading(false);
    }
  }, [appliedFilters, showToast]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const setFilter = (field: keyof UsersFilterOptions, val: string) => {
    setFilters((prev) => ({ ...prev, [field]: val }));
  };

  const applyFilters = () => {
    setAppliedFilters({ ...filters });
    showToast(`Filters updated (${filters.role}, ${filters.status})`);
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
    setAppliedFilters(defaultFilters);
    showToast('Filters reset to default');
  };

  const goToCreateAccount = () => {
    setSelectedUser(null);
    setCurrentSubScreen('CREATE_EDIT');
  };

  const goToEditAccount = (user: UserAccount) => {
    setSelectedUser(user);
    setCurrentSubScreen('CREATE_EDIT');
  };

  const goToDirectory = () => {
    setSelectedUser(null);
    setCurrentSubScreen('DIRECTORY');
  };

  const saveAccount = async (payload: Partial<UserAccount>) => {
    await mockUsersRepository.saveUser(payload);
    showToast(`Account for ${payload.fullName || 'User'} saved successfully!`);
    await loadData();
    setCurrentSubScreen('DIRECTORY');
  };

  const openConfirmationDialog = (type: 'RESET_PASSWORD' | 'DEACTIVATE' | 'REACTIVATE', account: UserAccount) => {
    setDialog({ isOpen: true, type, account });
  };

  const closeConfirmationDialog = () => {
    setDialog({ isOpen: false, type: null, account: null });
  };

  const confirmSensitiveAction = async () => {
    if (!dialog.account || !dialog.type) return;
    const { id, fullName } = dialog.account;

    if (dialog.type === 'RESET_PASSWORD') {
      await mockUsersRepository.sendPasswordReset(id);
      showToast(`Password reset link sent to ${dialog.account.email}`);
    } else if (dialog.type === 'DEACTIVATE') {
      await mockUsersRepository.updateUserStatus(id, 'Inactive');
      showToast(`Account for ${fullName} has been deactivated.`);
    } else if (dialog.type === 'REACTIVATE') {
      await mockUsersRepository.updateUserStatus(id, 'Active');
      showToast(`Account for ${fullName} has been reactivated.`);
    }

    closeConfirmationDialog();
    await loadData();
  };

  return (
    <UsersFlowContext.Provider
      value={{
        currentSubScreen,
        kpis,
        users,
        filters,
        selectedUser,
        dialog,
        isLoading,
        toastMessage,
        setFilter,
        applyFilters,
        resetFilters,
        goToCreateAccount,
        goToEditAccount,
        goToDirectory,
        saveAccount,
        openConfirmationDialog,
        closeConfirmationDialog,
        confirmSensitiveAction,
      }}
    >
      {children}
    </UsersFlowContext.Provider>
  );
};

export const useUsersFlow = (): UsersFlowContextValue => {
  const context = useContext(UsersFlowContext);
  if (!context) {
    throw new Error('useUsersFlow must be used within a UsersFlowProvider');
  }
  return context;
};
