export type ReportSubScreen =
  | 'OVERVIEW'
  | 'ACADEMIC_PERFORMANCE'
  | 'FEES_PAYMENTS'
  | 'ATTENDANCE_LIBRARY';

export interface ReportFilterOptions {
  dateRange: string;
  academicYear: string;
  classGrade: string;
  section: string;
}

// 1. Overview Screen Data
export interface OverviewKpiStats {
  studentsEnrolled: number;
  studentsEnrolledSub: string;
  attendanceRate: string;
  attendanceRateSub: string;
  examPassRate: string;
  examPassRateSub: string;
  feesCollected: string;
  feesCollectedSub: string;
}

export interface EnrollmentTrendPoint {
  month: string;
  count: number;
}

export interface MonthlyFeeCollectionPoint {
  month: string;
  amount: number;
}

export interface RecentReportActivity {
  id: string;
  report: string;
  period: string;
  updated: string;
  status: 'Ready' | 'Generating' | 'Failed';
}

export interface ReportCategoryShare {
  category: string;
  share: number;
  color: string;
}

// 2. Academic Performance Screen Data
export interface AcademicKpiStats {
  totalStudents: number;
  totalStudentsSub: string;
  teachers: number;
  teachersSub: string;
  classesSections: string;
  classesSectionsSub: string;
  examPassRate: string;
  examPassRateSub: string;
}

export interface ClassPerformancePoint {
  classGrade: string;
  rate: number;
}

export interface ExamResultByClass {
  classGrade: string;
  students: number;
  average: string;
  passRate: string;
  topSubject: string;
  published: 'Yes' | 'No';
}

// 3. Fees & Payments Screen Data
export interface FeesKpiStats {
  feesAssigned: string;
  feesAssignedSub: string;
  collected: string;
  collectedSub: string;
  outstandingDues: string;
  outstandingDuesSub: string;
  overdueBalance: string;
  overdueBalanceSub: string;
}

export interface MonthlyFeeLakhPoint {
  month: string;
  amount: number;
}

export interface PaymentStatusShare {
  status: string;
  share: number;
  color: string;
}

export interface OutstandingDuesByClass {
  classGrade: string;
  invoices: number;
  outstanding: string;
  overdue: string;
  collectionRate: string;
}

// 4. Attendance & Library Screen Data
export interface AttendanceLibraryKpiStats {
  avgAttendance: string;
  avgAttendanceSub: string;
  absentRecords: number;
  absentRecordsSub: string;
  booksIssued: number;
  booksIssuedSub: string;
  overdueLoans: number;
  overdueLoansSub: string;
}

export interface AttendanceWeekPoint {
  week: string;
  rate: number;
}

export interface LibraryActivityPoint {
  month: string;
  count: number;
}

export interface AttendanceLibraryDetail {
  id: string;
  category: string;
  group: string;
  total: string;
  rateStatus: string;
  period: string;
}

// Export modal
export interface ReportExportConfig {
  reportName: string;
  format: 'PDF' | 'EXCEL' | 'CSV';
  period: string;
  includeCharts: boolean;
}
