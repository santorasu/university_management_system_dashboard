import type { IAttendanceRepository } from '../../core/repositories/attendance.repository.interface';
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
} from '../../core/entities/attendance.types';

export class MockAttendanceRepository implements IAttendanceRepository {
  private kpis: AttendanceKPIs = {
    presentToday: 1142,
    presentPercentage: 91.4,
    absentCount: 76,
    absentPercentage: 6.1,
    lateCount: 31,
    latePercentage: 2.5,
    classesRecorded: 38,
    totalClasses: 42,
    pendingClasses: 4,
  };

  private trendPoints: AttendanceTrendPoint[] = [
    { day: 1, rate: 92 },
    { day: 2, rate: 86 },
    { day: 3, rate: 95 },
    { day: 4, rate: 90 },
    { day: 5, rate: 97 },
    { day: 6, rate: 89 },
    { day: 7, rate: 94 },
    { day: 8, rate: 82 },
    { day: 9, rate: 91 },
    { day: 10, rate: 96 },
    { day: 11, rate: 88 },
    { day: 12, rate: 93 },
  ];

  private statusDistribution: AttendanceStatusDistribution = {
    present: 1142,
    absent: 76,
    late: 31,
    excused: 26,
    total: 1275,
  };

  private classSummaries: ClassAttendanceSummary[] = [
    {
      id: 'cls-att-1',
      className: 'Grade 8',
      section: 'A',
      presentCount: 32,
      totalStudents: 35,
      absentCount: 2,
      rate: '91.4%',
      status: 'Recorded',
    },
    {
      id: 'cls-att-2',
      className: 'Grade 7',
      section: 'B',
      presentCount: 28,
      totalStudents: 34,
      absentCount: 4,
      rate: '82.4%',
      status: 'Recorded',
    },
    {
      id: 'cls-att-3',
      className: 'Grade 9',
      section: 'A',
      presentCount: 31,
      totalStudents: 35,
      absentCount: 3,
      rate: '88.6%',
      status: 'Recorded',
    },
    {
      id: 'cls-att-4',
      className: 'Grade 6',
      section: 'C',
      presentCount: 30,
      totalStudents: 32,
      absentCount: 1,
      rate: '93.8%',
      status: 'Recorded',
    },
    {
      id: 'cls-att-5',
      className: 'Grade 10',
      section: 'B',
      presentCount: 27,
      totalStudents: 30,
      absentCount: 2,
      rate: '90.0%',
      status: 'Pending',
    },
  ];

  private followUps: AbsenceFollowUp[] = [
    {
      id: 'fu-1',
      studentName: 'Ava Thompson',
      trigger: '2 consecutive absences',
      timestamp: 'Today · 09:30',
    },
    {
      id: 'fu-2',
      studentName: 'Liam Patel',
      trigger: 'Unexcused absence',
      timestamp: 'Today · 09:12',
    },
    {
      id: 'fu-3',
      studentName: 'Mia Garcia',
      trigger: '3 absences this month',
      timestamp: 'Yesterday',
    },
  ];

  private dailyStudents: StudentDailyAttendance[] = [
    {
      id: 'stu-d-1',
      name: 'Ava Thompson',
      studentId: 'STU-2026-001',
      roll: '01',
      status: 'Present',
      arrivalTime: '08:12 AM',
      remarks: '—',
    },
    {
      id: 'stu-d-2',
      name: 'Noah Williams',
      studentId: 'STU-2026-002',
      roll: '02',
      status: 'Present',
      arrivalTime: '08:15 AM',
      remarks: '—',
    },
    {
      id: 'stu-d-3',
      name: 'Sophia Chen',
      studentId: 'STU-2026-003',
      roll: '03',
      status: 'Late',
      arrivalTime: '08:42 AM',
      remarks: 'Bus delay',
    },
    {
      id: 'stu-d-4',
      name: 'Liam Patel',
      studentId: 'STU-2026-004',
      roll: '04',
      status: 'Absent',
      arrivalTime: '—',
      remarks: 'No reason',
    },
    {
      id: 'stu-d-5',
      name: 'Isabella Brown',
      studentId: 'STU-2026-005',
      roll: '05',
      status: 'Present',
      arrivalTime: '08:10 AM',
      remarks: '—',
    },
    {
      id: 'stu-d-6',
      name: 'Ethan Wilson',
      studentId: 'STU-2026-006',
      roll: '06',
      status: 'Excused',
      arrivalTime: '—',
      remarks: 'Medical note',
    },
    {
      id: 'stu-d-7',
      name: 'Mia Garcia',
      studentId: 'STU-2026-007',
      roll: '07',
      status: 'Present',
      arrivalTime: '08:09 AM',
      remarks: '—',
    },
  ];

  private monthlyCalendarDays: MonthlyCalendarDay[] = [
    { day: 1, rate: 96, statusLevel: 'high' },
    { day: 2, rate: 91, statusLevel: 'moderate' },
    { day: 3, rate: 89, statusLevel: 'review' },
    { day: 4, rate: 97, statusLevel: 'high' },
    { day: 5, rate: 93, statusLevel: 'moderate' },
    { day: 6, rate: 92, statusLevel: 'moderate' },
    { day: 7, rate: 88, statusLevel: 'review' },
    { day: 8, rate: 95, statusLevel: 'high' },
    { day: 9, rate: 91, statusLevel: 'moderate' },
    { day: 10, rate: 87, statusLevel: 'review' },
    { day: 11, rate: 94, statusLevel: 'high' },
    { day: 12, rate: 90, statusLevel: 'moderate' },
    { day: 13, rate: 96, statusLevel: 'high' },
    { day: 14, rate: 92, statusLevel: 'moderate' },
    { day: 15, rate: 89, statusLevel: 'review' },
    { day: 16, rate: 93, statusLevel: 'moderate' },
    { day: 17, rate: 91, statusLevel: 'moderate' },
    { day: 18, rate: 88, statusLevel: 'review' },
    { day: 19, rate: 94, statusLevel: 'high' },
    { day: 20, rate: 90, statusLevel: 'moderate' },
    { day: 21, rate: 95, statusLevel: 'high' },
    { day: 22, rate: 92, statusLevel: 'moderate' },
    { day: 23, rate: 97, statusLevel: 'high' },
    { day: 24, rate: 91, statusLevel: 'moderate' },
    { day: 25, rate: 89, statusLevel: 'review' },
    { day: 26, rate: 96, statusLevel: 'high' },
    { day: 27, rate: 94, statusLevel: 'high' },
    { day: 28, rate: 90, statusLevel: 'moderate' },
    { day: 29, rate: 93, statusLevel: 'moderate' },
    { day: 30, rate: 95, statusLevel: 'high' },
    { day: 31, rate: 92, statusLevel: 'moderate' },
  ];

  private studentHistories: Record<string, StudentAttendanceHistory> = {
    'STU-2026-001': {
      studentId: 'STU-2026-001',
      studentName: 'Ava Thompson',
      presentDays: 18,
      absentDays: 2,
      lateDays: 1,
      excusedDays: 1,
      recentRecords: [
        { date: '18 Oct', status: 'Present' },
        { date: '16 Oct', status: 'Absent' },
        { date: '15 Oct', status: 'Present' },
        { date: '14 Oct', status: 'Late' },
        { date: '13 Oct', status: 'Present' },
      ],
    },
    'STU-2026-002': {
      studentId: 'STU-2026-002',
      studentName: 'Noah Williams',
      presentDays: 20,
      absentDays: 1,
      lateDays: 1,
      excusedDays: 0,
      recentRecords: [
        { date: '18 Oct', status: 'Present' },
        { date: '17 Oct', status: 'Present' },
        { date: '16 Oct', status: 'Late' },
        { date: '15 Oct', status: 'Present' },
        { date: '14 Oct', status: 'Present' },
      ],
    },
  };

  private gradeSummaries: GradeAttendanceSummary[] = [
    { grade: 'Grade 6', rate: '94.2%', statusText: 'Strong' },
    { grade: 'Grade 7', rate: '88.6%', statusText: 'Review' },
    { grade: 'Grade 8', rate: '92.1%', statusText: 'Good' },
    { grade: 'Grade 9', rate: '90.4%', statusText: 'Good' },
    { grade: 'Grade 10', rate: '86.8%', statusText: 'Review' },
  ];

  private notifications: AbsenceNotification[] = [
    {
      id: 'notif-1',
      studentName: 'Ava Thompson',
      guardianName: 'Olivia Thompson',
      trigger: '2 consecutive absences',
      sentAt: '18 Oct · 09:30',
      channel: 'Email',
      deliveryStatus: 'Delivered',
    },
    {
      id: 'notif-2',
      studentName: 'Liam Patel',
      guardianName: 'Priya Patel',
      trigger: 'Unexcused absence',
      sentAt: '18 Oct · 09:12',
      channel: 'SMS',
      deliveryStatus: 'Delivered',
    },
    {
      id: 'notif-3',
      studentName: 'Mia Garcia',
      guardianName: 'Elena Garcia',
      trigger: '3 monthly absences',
      sentAt: '17 Oct · 15:40',
      channel: 'Email',
      deliveryStatus: 'Failed',
    },
    {
      id: 'notif-4',
      studentName: 'Noah Williams',
      guardianName: 'James Williams',
      trigger: 'Late arrival alert',
      sentAt: '16 Oct · 08:50',
      channel: 'Push',
      deliveryStatus: 'Queued',
    },
  ];

  async getKPIs(): Promise<AttendanceKPIs> {
    return { ...this.kpis };
  }

  async getAttendanceTrend(): Promise<AttendanceTrendPoint[]> {
    return [...this.trendPoints];
  }

  async getStatusDistribution(): Promise<AttendanceStatusDistribution> {
    return { ...this.statusDistribution };
  }

  async getClassSummaries(): Promise<ClassAttendanceSummary[]> {
    return [...this.classSummaries];
  }

  async getFollowUps(): Promise<AbsenceFollowUp[]> {
    return [...this.followUps];
  }

  async getDailyAttendance(className: string, section: string, date: string): Promise<StudentDailyAttendance[]> {
    void className;
    void section;
    void date;
    return this.dailyStudents.map((s) => ({ ...s }));
  }

  async saveDailyAttendance(records: StudentDailyAttendance[]): Promise<void> {
    this.dailyStudents = records.map((r) => ({ ...r, isModified: false }));
  }

  async getMonthlyCalendarDays(): Promise<MonthlyCalendarDay[]> {
    return [...this.monthlyCalendarDays];
  }

  async getStudentHistory(studentId: string): Promise<StudentAttendanceHistory | null> {
    const hist = this.studentHistories[studentId] || this.studentHistories['STU-2026-001'];
    return hist ? { ...hist } : null;
  }

  async getGradeSummaries(): Promise<GradeAttendanceSummary[]> {
    return [...this.gradeSummaries];
  }

  async getNotifications(): Promise<AbsenceNotification[]> {
    return [...this.notifications];
  }

  async retryNotification(notificationId: string): Promise<void> {
    const item = this.notifications.find((n) => n.id === notificationId);
    if (item) {
      item.deliveryStatus = 'Delivered';
    }
  }
}

export const mockAttendanceRepository = new MockAttendanceRepository();
