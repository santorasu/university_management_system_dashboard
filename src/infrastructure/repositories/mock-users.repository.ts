import type {
  UserAccount,
  UsersKpiStats,
  UsersFilterOptions,
} from '../../core/entities/users.types';
import type { IUsersRepository } from '../../core/repositories/users.repository.interface';

export class MockUsersRepository implements IUsersRepository {
  private users: UserAccount[] = [
    {
      id: 'ADM-001',
      fullName: 'Alex Morgan',
      email: 'alex.morgan@maplegrove.edu',
      role: 'Admin',
      status: 'Active',
      lastActivity: 'Today · 10:42 AM',
      access: 'Web only',
      contactNumber: '+880 1711 000111',
      linkedProfile: 'School Administrator',
    },
    {
      id: 'TCH-0031',
      fullName: 'Md. Taufiqur Rahman',
      email: 'taufiq.rahman@maplegrove.edu',
      role: 'Teacher',
      status: 'Active',
      lastActivity: 'Today · 09:18 AM',
      access: 'Mobile app',
      contactNumber: '+880 1812 345678',
      linkedProfile: 'Senior Mathematics Teacher',
    },
    {
      id: 'STU-0184',
      fullName: 'Ayesha Rahman',
      email: 'ayesha.rahman@maplegrove.edu',
      role: 'Student',
      status: 'Active',
      lastActivity: 'Yesterday · 04:36 PM',
      access: 'Mobile app',
      contactNumber: '+880 1913 223344',
      linkedProfile: 'Class 10 - Section A',
    },
    {
      id: 'PAR-0082',
      fullName: 'Samira Rahman',
      email: 'samira.rahman@gmail.com',
      role: 'Parent',
      status: 'Active',
      lastActivity: 'Yesterday · 02:10 PM',
      access: 'Mobile app',
      contactNumber: '+880 1714 556677',
      linkedProfile: 'Guardian of Ayesha Rahman (STU-0184)',
    },
    {
      id: 'TCH-0044',
      fullName: 'Rafi Ahmed',
      email: 'rafi.ahmed@maplegrove.edu',
      role: 'Teacher',
      status: 'Inactive',
      lastActivity: '12 Oct 2026',
      access: 'Access disabled',
      contactNumber: '+880 1615 889900',
      linkedProfile: 'Science Instructor (On Leave)',
    },
    {
      id: 'ADM-002',
      fullName: 'Sarah Jenkins',
      email: 'sarah.jenkins@maplegrove.edu',
      role: 'Admin',
      status: 'Active',
      lastActivity: 'Today · 11:05 AM',
      access: 'Web only',
      contactNumber: '+880 1711 998877',
      linkedProfile: 'Academic Registrar',
    },
    {
      id: 'STU-0195',
      fullName: 'Zubair Hossain',
      email: 'zubair.hossain@maplegrove.edu',
      role: 'Student',
      status: 'Active',
      lastActivity: '20 Oct 2026',
      access: 'Mobile app',
      contactNumber: '+880 1912 884433',
      linkedProfile: 'Class 8 - Section B',
    },
    {
      id: 'PAR-0096',
      fullName: 'Kabir Hossain',
      email: 'kabir.hossain@gmail.com',
      role: 'Parent',
      status: 'Active',
      lastActivity: '19 Oct 2026',
      access: 'Mobile app',
      contactNumber: '+880 1713 774411',
      linkedProfile: 'Guardian of Zubair Hossain (STU-0195)',
    },
  ];

  async getKpiStats(): Promise<UsersKpiStats> {
    return {
      totalAccounts: 3024,
      totalAccountsSub: 'Across supported roles',
      activeAccounts: 2946,
      activeAccountsSub: 'Access enabled',
      inactiveAccounts: 78,
      inactiveAccountsSub: 'Access disabled',
      recentActivity: 186,
      recentActivitySub: 'Last 7 days',
    };
  }

  async getUsers(filters: UsersFilterOptions): Promise<UserAccount[]> {
    return this.users.filter((u) => {
      if (filters.search) {
        const q = filters.search.toLowerCase();
        const match =
          u.fullName.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          u.id.toLowerCase().includes(q);
        if (!match) return false;
      }
      if (filters.role && filters.role !== 'All supported roles') {
        if (u.role !== filters.role) return false;
      }
      if (filters.status && filters.status !== 'All statuses') {
        if (u.status !== filters.status) return false;
      }
      return true;
    });
  }

  async saveUser(payload: Partial<UserAccount>): Promise<UserAccount> {
    if (payload.id) {
      const idx = this.users.findIndex((u) => u.id === payload.id);
      if (idx !== -1) {
        this.users[idx] = { ...this.users[idx], ...payload } as UserAccount;
        return this.users[idx];
      }
    }
    const newId = payload.role === 'Admin'
      ? `ADM-00${this.users.length + 1}`
      : payload.role === 'Teacher'
      ? `TCH-00${this.users.length + 1}`
      : payload.role === 'Student'
      ? `STU-0${this.users.length + 100}`
      : `PAR-00${this.users.length + 50}`;

    const access: 'Web only' | 'Mobile app' = payload.role === 'Admin' ? 'Web only' : 'Mobile app';

    const newUser: UserAccount = {
      id: payload.id || newId,
      fullName: payload.fullName || 'New User',
      email: payload.email || 'user@maplegrove.edu',
      role: payload.role || 'Teacher',
      status: payload.status || 'Active',
      lastActivity: 'Just now',
      access,
      contactNumber: payload.contactNumber,
      linkedProfile: payload.linkedProfile,
    };
    this.users.unshift(newUser);
    return newUser;
  }

  async sendPasswordReset(_userId: string): Promise<boolean> {
    await new Promise((r) => setTimeout(r, 400));
    return true;
  }

  async updateUserStatus(userId: string, status: 'Active' | 'Inactive'): Promise<boolean> {
    const idx = this.users.findIndex((u) => u.id === userId);
    if (idx !== -1) {
      this.users[idx].status = status;
      this.users[idx].access = status === 'Active'
        ? (this.users[idx].role === 'Admin' ? 'Web only' : 'Mobile app')
        : 'Access disabled';
      return true;
    }
    return false;
  }
}

export const mockUsersRepository = new MockUsersRepository();
