import type {
  SchoolProfile,
  AcademicConfiguration,
  ClassDefaults,
  AttendanceSettings,
  NotificationPreferences,
  SecuritySettings,
} from '../../core/entities/settings.types';
import type { ISettingsRepository } from '../../core/repositories/settings.repository.interface';

export class MockSettingsRepository implements ISettingsRepository {
  private schoolProfile: SchoolProfile = {
    name: 'Maple Grove School',
    email: 'info@maplegrove.edu',
    phone: '+880 2 5550 0000',
    address: 'Plot 14, Road 7, Dhanmondi, Dhaka 1209, Bangladesh',
  };

  private academicConfig: AcademicConfiguration = {
    currentYear: '2026–27',
    startDate: '01 Jan 2026',
    endDate: '31 Dec 2026',
    termStructure: '3 terms',
    gradingScale: 'A+ to F · 0–100',
    passingThreshold: '33%',
    maximumMarks: 100,
  };

  private classDefaults: ClassDefaults = {
    classStructure: 'Classes 1–10',
    sectionLabels: 'A, B, C',
    gradingMethod: 'Marks and grade points',
    gradePointScheme: '4.00 scale',
  };

  private attendanceSettings: AttendanceSettings = {
    startTime: '08:00 AM',
    lateCutoff: '08:30 AM',
    markingWindow: 'Daily',
    absenceThreshold: '1 consecutive day',
    requireReason: true,
    notifyParents: true,
    allowCorrection: false,
  };

  private notificationPreferences: NotificationPreferences = {
    publishedNotices: true,
    directMessages: true,
    feeReminders: true,
    examResults: true,
    libraryOverdue: false,
  };

  private securitySettings: SecuritySettings = {
    minPasswordLength: '12 characters',
    passwordExpiry: '90 days',
    sessionTimeout: '30 minutes inactive',
    maxFailedAttempts: '5 attempts',
    requireStrongPasswords: true,
    require2FAAdmin: true,
    revokeSessionsOnReset: true,
  };

  async getSchoolProfile(): Promise<SchoolProfile> {
    return { ...this.schoolProfile };
  }

  async updateSchoolProfile(profile: Partial<SchoolProfile>): Promise<SchoolProfile> {
    this.schoolProfile = { ...this.schoolProfile, ...profile };
    return { ...this.schoolProfile };
  }

  async getAcademicConfig(): Promise<AcademicConfiguration> {
    return { ...this.academicConfig };
  }

  async updateAcademicConfig(config: Partial<AcademicConfiguration>): Promise<AcademicConfiguration> {
    this.academicConfig = { ...this.academicConfig, ...config };
    return { ...this.academicConfig };
  }

  async getClassDefaults(): Promise<ClassDefaults> {
    return { ...this.classDefaults };
  }

  async updateClassDefaults(defaults: Partial<ClassDefaults>): Promise<ClassDefaults> {
    this.classDefaults = { ...this.classDefaults, ...defaults };
    return { ...this.classDefaults };
  }

  async getAttendanceSettings(): Promise<AttendanceSettings> {
    return { ...this.attendanceSettings };
  }

  async updateAttendanceSettings(settings: Partial<AttendanceSettings>): Promise<AttendanceSettings> {
    this.attendanceSettings = { ...this.attendanceSettings, ...settings };
    return { ...this.attendanceSettings };
  }

  async getNotificationPreferences(): Promise<NotificationPreferences> {
    return { ...this.notificationPreferences };
  }

  async updateNotificationPreferences(prefs: Partial<NotificationPreferences>): Promise<NotificationPreferences> {
    this.notificationPreferences = { ...this.notificationPreferences, ...prefs };
    return { ...this.notificationPreferences };
  }

  async getSecuritySettings(): Promise<SecuritySettings> {
    return { ...this.securitySettings };
  }

  async updateSecuritySettings(settings: Partial<SecuritySettings>): Promise<SecuritySettings> {
    this.securitySettings = { ...this.securitySettings, ...settings };
    return { ...this.securitySettings };
  }
}

export const mockSettingsRepository = new MockSettingsRepository();
