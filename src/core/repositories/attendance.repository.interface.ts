import type {
  AttendanceKPIs,
  AttendanceTrendPoint,
  AttendanceStatusDistribution,
  ClassAttendanceSummary,
  AbsenceFollowUp,
  StudentDailyAttendance,
  AbsenceNotification,
  MonthlyCalendarDay,
  StudentAttendanceHistory,
  GradeAttendanceSummary,
} from '../entities/attendance.types';

export interface IAttendanceRepository {
  getKPIs(): Promise<AttendanceKPIs>;
  getAttendanceTrend(): Promise<AttendanceTrendPoint[]>;
  getStatusDistribution(): Promise<AttendanceStatusDistribution>;
  getClassSummaries(): Promise<ClassAttendanceSummary[]>;
  getFollowUps(): Promise<AbsenceFollowUp[]>;
  getDailyAttendance(className: string, section: string, date: string): Promise<StudentDailyAttendance[]>;
  saveDailyAttendance(records: StudentDailyAttendance[]): Promise<void>;
  getMonthlyCalendarDays(): Promise<MonthlyCalendarDay[]>;
  getStudentHistory(studentId: string): Promise<StudentAttendanceHistory | null>;
  getGradeSummaries(): Promise<GradeAttendanceSummary[]>;
  getNotifications(): Promise<AbsenceNotification[]>;
  retryNotification(notificationId: string): Promise<void>;
}
