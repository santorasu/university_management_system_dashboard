import type {
  ReportFilterOptions,
  OverviewKpiStats,
  EnrollmentTrendPoint,
  MonthlyFeeCollectionPoint,
  RecentReportActivity,
  ReportCategoryShare,
  AcademicKpiStats,
  ClassPerformancePoint,
  ExamResultByClass,
  FeesKpiStats,
  MonthlyFeeLakhPoint,
  PaymentStatusShare,
  OutstandingDuesByClass,
  AttendanceLibraryKpiStats,
  AttendanceWeekPoint,
  LibraryActivityPoint,
  AttendanceLibraryDetail,
  ReportExportConfig,
} from '../entities/reports.types';

export interface OverviewReportData {
  kpis: OverviewKpiStats;
  enrollmentTrend: EnrollmentTrendPoint[];
  monthlyFeeCollection: MonthlyFeeCollectionPoint[];
  recentActivity: RecentReportActivity[];
  categoryShares: ReportCategoryShare[];
}

export interface AcademicPerformanceReportData {
  kpis: AcademicKpiStats;
  enrollmentTrend: EnrollmentTrendPoint[];
  classPerformance: ClassPerformancePoint[];
  examResults: ExamResultByClass[];
}

export interface FeesPaymentsReportData {
  kpis: FeesKpiStats;
  monthlyFeeLakhs: MonthlyFeeLakhPoint[];
  paymentStatusBreakdown: PaymentStatusShare[];
  outstandingDues: OutstandingDuesByClass[];
}

export interface AttendanceLibraryReportData {
  kpis: AttendanceLibraryKpiStats;
  attendanceByWeek: AttendanceWeekPoint[];
  libraryActivity: LibraryActivityPoint[];
  details: AttendanceLibraryDetail[];
}

export interface IReportsRepository {
  getOverviewData(filters: ReportFilterOptions): Promise<OverviewReportData>;
  getAcademicPerformanceData(filters: ReportFilterOptions): Promise<AcademicPerformanceReportData>;
  getFeesPaymentsData(filters: ReportFilterOptions): Promise<FeesPaymentsReportData>;
  getAttendanceLibraryData(filters: ReportFilterOptions): Promise<AttendanceLibraryReportData>;
  exportReport(config: ReportExportConfig): Promise<boolean>;
}
