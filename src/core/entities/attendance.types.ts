export type AttendanceSubScreen =
  | 'ATTENDANCE_OVERVIEW'
  | 'DAILY_RECORDS'
  | 'CALENDAR_HISTORY'
  | 'NOTIFICATIONS_STATES';

export type AttendanceStatus = 'Present' | 'Absent' | 'Late' | 'Excused';

export interface AttendanceKPIs {
  presentToday: number; // 1,142
  presentPercentage: number; // 91.4
  absentCount: number; // 76
  absentPercentage: number; // 6.1
  lateCount: number; // 31
  latePercentage: number; // 2.5
  classesRecorded: number; // 38
  totalClasses: number; // 42
  pendingClasses: number; // 4
}

export interface AttendanceTrendPoint {
  day: number;
  rate: number;
}

export interface AttendanceStatusDistribution {
  present: number;
  absent: number;
  late: number;
  excused: number;
  total: number;
}

export interface ClassAttendanceSummary {
  id: string;
  className: string;
  section: string;
  presentCount: number;
  totalStudents: number;
  absentCount: number;
  rate: string;
  status: 'Recorded' | 'Pending';
}

export interface AbsenceFollowUp {
  id: string;
  studentName: string;
  trigger: string;
  timestamp: string;
}

export interface StudentDailyAttendance {
  id: string;
  name: string;
  studentId: string;
  roll: string;
  status: AttendanceStatus;
  arrivalTime: string;
  remarks: string;
  isModified?: boolean;
}

export interface AbsenceNotification {
  id: string;
  studentName: string;
  guardianName: string;
  trigger: string;
  sentAt: string;
  channel: 'Email' | 'SMS' | 'Push';
  deliveryStatus: 'Delivered' | 'Failed' | 'Queued';
}

export interface MonthlyCalendarDay {
  day: number;
  rate: number;
  statusLevel: 'high' | 'moderate' | 'review';
}

export interface StudentAttendanceHistory {
  studentId: string;
  studentName: string;
  presentDays: number;
  absentDays: number;
  lateDays: number;
  excusedDays: number;
  recentRecords: Array<{
    date: string;
    status: AttendanceStatus;
  }>;
}

export interface GradeAttendanceSummary {
  grade: string;
  rate: string;
  statusText: 'Strong' | 'Good' | 'Review';
}
