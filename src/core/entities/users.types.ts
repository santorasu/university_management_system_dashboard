export type ProductRole = 'Admin' | 'Teacher' | 'Student' | 'Parent';
export type AccountStatus = 'Active' | 'Inactive';
export type AccessType = 'Web only' | 'Mobile app' | 'Access disabled';

export interface UserAccount {
  id: string;
  fullName: string;
  email: string;
  role: ProductRole;
  status: AccountStatus;
  lastActivity: string;
  access: AccessType;
  contactNumber?: string;
  linkedProfile?: string;
}

export interface UsersKpiStats {
  totalAccounts: number;
  totalAccountsSub: string;
  activeAccounts: number;
  activeAccountsSub: string;
  inactiveAccounts: number;
  inactiveAccountsSub: string;
  recentActivity: number;
  recentActivitySub: string;
}

export interface UsersFilterOptions {
  search: string;
  role: string;
  status: string;
}

export type UsersSubScreen = 'DIRECTORY' | 'CREATE_EDIT';

export interface SensitiveConfirmationDialog {
  isOpen: boolean;
  type: 'RESET_PASSWORD' | 'DEACTIVATE' | 'REACTIVATE' | null;
  account: UserAccount | null;
}
