import type {
  ReportFilterOptions,
  ReportExportConfig,
} from '../../core/entities/reports.types';
import type {
  IReportsRepository,
  OverviewReportData,
  AcademicPerformanceReportData,
  FeesPaymentsReportData,
  AttendanceLibraryReportData,
} from '../../core/repositories/reports.repository.interface';

export class MockReportsRepository implements IReportsRepository {
  async getOverviewData(_filters: ReportFilterOptions): Promise<OverviewReportData> {
    return {
      kpis: {
        studentsEnrolled: 2846,
        studentsEnrolledSub: '+6.2% vs last term',
        attendanceRate: '94.2%',
        attendanceRateSub: 'Within target',
        examPassRate: '87.6%',
        examPassRateSub: 'Across published results',
        feesCollected: '৳36.7L',
        feesCollectedSub: '75.7% of assigned fees',
      },
      enrollmentTrend: [
        { month: 'May', count: 210 },
        { month: 'Jun', count: 238 },
        { month: 'Jul', count: 260 },
        { month: 'Aug', count: 272 },
        { month: 'Sep', count: 281 },
        { month: 'Oct', count: 296 },
      ],
      monthlyFeeCollection: [
        { month: 'May', amount: 28 },
        { month: 'Jun', amount: 34 },
        { month: 'Jul', amount: 30 },
        { month: 'Aug', amount: 42 },
        { month: 'Sep', amount: 38 },
        { month: 'Oct', amount: 47 },
      ],
      recentActivity: [
        { id: '1', report: 'Student enrollment', period: 'Oct 2026', updated: '18 Oct 2026', status: 'Ready' },
        { id: '2', report: 'Attendance summary', period: 'Oct 2026', updated: '18 Oct 2026', status: 'Ready' },
        { id: '3', report: 'Fee collection', period: 'Term 1', updated: '17 Oct 2026', status: 'Ready' },
        { id: '4', report: 'Exam results', period: 'Term 1', updated: '16 Oct 2026', status: 'Ready' },
      ],
      categoryShares: [
        { category: 'Academic', share: 42, color: '#3659D9' },
        { category: 'Attendance', share: 25, color: '#10B981' },
        { category: 'Finance', share: 23, color: '#D97706' },
        { category: 'Library', share: 10, color: '#8B5CF6' },
      ],
    };
  }

  async getAcademicPerformanceData(_filters: ReportFilterOptions): Promise<AcademicPerformanceReportData> {
    return {
      kpis: {
        totalStudents: 2846,
        totalStudentsSub: 'Across active classes',
        teachers: 146,
        teachersSub: 'Active teaching staff',
        classesSections: '42 / 68',
        classesSectionsSub: 'Current academic year',
        examPassRate: '87.6%',
        examPassRateSub: 'Published results',
      },
      enrollmentTrend: [
        { month: 'May', count: 210 },
        { month: 'Jun', count: 238 },
        { month: 'Jul', count: 260 },
        { month: 'Aug', count: 272 },
        { month: 'Sep', count: 281 },
        { month: 'Oct', count: 296 },
      ],
      classPerformance: [
        { classGrade: 'Class 6', rate: 82 },
        { classGrade: 'Class 7', rate: 85 },
        { classGrade: 'Class 8', rate: 89 },
        { classGrade: 'Class 9', rate: 86 },
        { classGrade: 'Class 10', rate: 91 },
      ],
      examResults: [
        { classGrade: 'Class 6', students: 312, average: '78.4%', passRate: '84.6%', topSubject: 'Mathematics', published: 'Yes' },
        { classGrade: 'Class 7', students: 298, average: '81.2%', passRate: '86.1%', topSubject: 'English', published: 'Yes' },
        { classGrade: 'Class 8', students: 286, average: '84.8%', passRate: '89.3%', topSubject: 'Science', published: 'Yes' },
        { classGrade: 'Class 9', students: 264, average: '79.6%', passRate: '85.2%', topSubject: 'Mathematics', published: 'Yes' },
        { classGrade: 'Class 10', students: 251, average: '86.1%', passRate: '92.0%', topSubject: 'ICT', published: 'Yes' },
      ],
    };
  }

  async getFeesPaymentsData(_filters: ReportFilterOptions): Promise<FeesPaymentsReportData> {
    return {
      kpis: {
        feesAssigned: '৳48.5L',
        feesAssignedSub: 'Current academic year',
        collected: '৳36.7L',
        collectedSub: '75.7% collection rate',
        outstandingDues: '৳11.8L',
        outstandingDuesSub: 'Across 8 classes',
        overdueBalance: '৳3.26L',
        overdueBalanceSub: 'Needs follow-up',
      },
      monthlyFeeLakhs: [
        { month: 'May', amount: 2.8 },
        { month: 'Jun', amount: 3.4 },
        { month: 'Jul', amount: 3.0 },
        { month: 'Aug', amount: 4.2 },
        { month: 'Sep', amount: 3.8 },
        { month: 'Oct', amount: 4.7 },
      ],
      paymentStatusBreakdown: [
        { status: 'Paid', share: 66, color: '#10B981' },
        { status: 'Partially paid', share: 17, color: '#3659D9' },
        { status: 'Pending', share: 12, color: '#F59E0B' },
        { status: 'Overdue', share: 6, color: '#EF4444' },
      ],
      outstandingDues: [
        { classGrade: 'Class 6', invoices: 42, outstanding: '৳1,24,000', overdue: '৳32,000', collectionRate: '82.4%' },
        { classGrade: 'Class 7', invoices: 38, outstanding: '৳1,48,500', overdue: '৳41,000', collectionRate: '79.1%' },
        { classGrade: 'Class 8', invoices: 51, outstanding: '৳2,16,000', overdue: '৳78,000', collectionRate: '73.8%' },
        { classGrade: 'Class 9', invoices: 46, outstanding: '৳2,02,000', overdue: '৳65,000', collectionRate: '76.2%' },
        { classGrade: 'Class 10', invoices: 39, outstanding: '৳1,86,000', overdue: '৳52,000', collectionRate: '80.4%' },
      ],
    };
  }

  async getAttendanceLibraryData(_filters: ReportFilterOptions): Promise<AttendanceLibraryReportData> {
    return {
      kpis: {
        avgAttendance: '94.2%',
        avgAttendanceSub: 'Selected date range',
        absentRecords: 168,
        absentRecordsSub: 'Across all classes',
        booksIssued: 278,
        booksIssuedSub: 'Selected period',
        overdueLoans: 24,
        overdueLoansSub: 'Pending returns',
      },
      attendanceByWeek: [
        { week: 'W1', rate: 92 },
        { week: 'W2', rate: 95 },
        { week: 'W3', rate: 93 },
        { week: 'W4', rate: 96 },
        { week: 'W5', rate: 94 },
      ],
      libraryActivity: [
        { month: 'Jun', count: 180 },
        { month: 'Jul', count: 206 },
        { month: 'Aug', count: 224 },
        { month: 'Sep', count: 218 },
        { month: 'Oct', count: 249 },
        { month: 'Nov', count: 278 },
      ],
      details: [
        { id: '1', category: 'Attendance', group: 'Class 6', total: '312 records', rateStatus: '95.2%', period: 'Oct 2026' },
        { id: '2', category: 'Attendance', group: 'Class 8', total: '286 records', rateStatus: '92.8%', period: 'Oct 2026' },
        { id: '3', category: 'Attendance', group: 'Class 10', total: '251 records', rateStatus: '94.1%', period: 'Oct 2026' },
        { id: '4', category: 'Library issues', group: 'All classes', total: '278 loans', rateStatus: 'Active', period: 'Oct 2026' },
        { id: '5', category: 'Overdue books', group: 'All classes', total: '24 loans', rateStatus: 'Follow-up', period: 'Oct 2026' },
      ],
    };
  }

  async exportReport(_config: ReportExportConfig): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return true;
  }
}

export const mockReportsRepository = new MockReportsRepository();
