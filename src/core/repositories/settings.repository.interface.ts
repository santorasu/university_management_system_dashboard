import type {
  SchoolProfile,
  AcademicConfiguration,
  ClassDefaults,
  AttendanceSettings,
  NotificationPreferences,
  SecuritySettings,
} from '../entities/settings.types';

export interface ISettingsRepository {
  getSchoolProfile(): Promise<SchoolProfile>;
  updateSchoolProfile(profile: Partial<SchoolProfile>): Promise<SchoolProfile>;

  getAcademicConfig(): Promise<AcademicConfiguration>;
  updateAcademicConfig(config: Partial<AcademicConfiguration>): Promise<AcademicConfiguration>;

  getClassDefaults(): Promise<ClassDefaults>;
  updateClassDefaults(defaults: Partial<ClassDefaults>): Promise<ClassDefaults>;

  getAttendanceSettings(): Promise<AttendanceSettings>;
  updateAttendanceSettings(settings: Partial<AttendanceSettings>): Promise<AttendanceSettings>;

  getNotificationPreferences(): Promise<NotificationPreferences>;
  updateNotificationPreferences(prefs: Partial<NotificationPreferences>): Promise<NotificationPreferences>;

  getSecuritySettings(): Promise<SecuritySettings>;
  updateSecuritySettings(settings: Partial<SecuritySettings>): Promise<SecuritySettings>;
}
