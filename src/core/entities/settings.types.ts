export type SettingsTab = 'PROFILE_ACADEMICS' | 'ATTENDANCE_SECURITY';

export interface SchoolProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  logoUrl?: string;
}

export interface AcademicConfiguration {
  currentYear: string;
  startDate: string;
  endDate: string;
  termStructure: string;
  gradingScale: string;
  passingThreshold: string;
  maximumMarks: number;
}

export interface ClassDefaults {
  classStructure: string;
  sectionLabels: string;
  gradingMethod: string;
  gradePointScheme: string;
}

export interface AttendanceSettings {
  startTime: string;
  lateCutoff: string;
  markingWindow: string;
  absenceThreshold: string;
  requireReason: boolean;
  notifyParents: boolean;
  allowCorrection: boolean;
}

export interface NotificationPreferences {
  publishedNotices: boolean;
  directMessages: boolean;
  feeReminders: boolean;
  examResults: boolean;
  libraryOverdue: boolean;
}

export interface SecuritySettings {
  minPasswordLength: string;
  passwordExpiry: string;
  sessionTimeout: string;
  maxFailedAttempts: string;
  requireStrongPasswords: boolean;
  require2FAAdmin: boolean;
  revokeSessionsOnReset: boolean;
}
