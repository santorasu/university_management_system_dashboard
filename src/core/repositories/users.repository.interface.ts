import type {
  UserAccount,
  UsersKpiStats,
  UsersFilterOptions,
} from '../entities/users.types';

export interface IUsersRepository {
  getKpiStats(): Promise<UsersKpiStats>;
  getUsers(filters: UsersFilterOptions): Promise<UserAccount[]>;
  saveUser(user: Partial<UserAccount>): Promise<UserAccount>;
  sendPasswordReset(userId: string): Promise<boolean>;
  updateUserStatus(userId: string, status: 'Active' | 'Inactive'): Promise<boolean>;
}
