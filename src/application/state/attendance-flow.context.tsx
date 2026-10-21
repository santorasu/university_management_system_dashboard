import React, { createContext, useContext, useState, useEffect } from 'react';
import type {
  AttendanceSubScreen,
  AttendanceStatus,
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
import { mockAttendanceRepository } from '../../infrastructure/repositories/mock-attendance.repository';

interface AttendanceContextType {
  subScreen: AttendanceSubScreen;
  kpis: AttendanceKPIs | null;
  trendPoints: AttendanceTrendPoint[];
  statusDistribution: AttendanceStatusDistribution | null;
  classSummaries: ClassAttendanceSummary[];
  followUps: AbsenceFollowUp[];
  dailyRecords: StudentDailyAttendance[];
  calendarDays: MonthlyCalendarDay[];
  studentHistory: StudentAttendanceHistory | null;
  gradeSummaries: GradeAttendanceSummary[];
  notifications: AbsenceNotification[];
  isLoading: boolean;

  // Daily Filters
  selectedDate: string;
  setSelectedDate: (d: string) => void;
  selectedYear: string;
  setSelectedYear: (y: string) => void;
  selectedClass: string;
  setSelectedClass: (c: string) => void;
  selectedSection: string;
  setSelectedSection: (s: string) => void;
  selectedStatus: string;
  setSelectedStatus: (st: string) => void;
  searchStudentQuery: string;
  setSearchStudentQuery: (q: string) => void;

  // Navigation
  goToOverview: () => void;
  goToDailyRecords: (className?: string, section?: string) => void;
  goToCalendarHistory: () => void;
  goToNotificationsStates: () => void;

  // Marking Actions
  updateStudentStatus: (studentId: string, status: AttendanceStatus) => void;
  updateStudentRemarks: (studentId: string, remarks: string) => void;
  saveAttendance: () => Promise<void>;
  cancelDailyChanges: () => void;
  retryNotificationItem: (id: string) => Promise<void>;
  selectStudentForHistory: (studentId: string) => Promise<void>;

  // Modals & Feedback
  isConfirmDialogOpen: boolean;
  openConfirmDialog: () => void;
  closeConfirmDialog: () => void;
  toastNotification: { type: 'success' | 'error'; message: string } | null;
  showToast: (type: 'success' | 'error', message: string) => void;
  clearToast: () => void;
}

const AttendanceContext = createContext<AttendanceContextType | undefined>(undefined);

export const AttendanceFlowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [subScreen, setSubScreen] = useState<AttendanceSubScreen>('ATTENDANCE_OVERVIEW');
  const [kpis, setKpis] = useState<AttendanceKPIs | null>(null);
  const [trendPoints, setTrendPoints] = useState<AttendanceTrendPoint[]>([]);
  const [statusDistribution, setStatusDistribution] = useState<AttendanceStatusDistribution | null>(null);
  const [classSummaries, setClassSummaries] = useState<ClassAttendanceSummary[]>([]);
  const [followUps, setFollowUps] = useState<AbsenceFollowUp[]>([]);
  const [dailyRecords, setDailyRecords] = useState<StudentDailyAttendance[]>([]);
  const [initialDailyRecords, setInitialDailyRecords] = useState<StudentDailyAttendance[]>([]);
  const [calendarDays, setCalendarDays] = useState<MonthlyCalendarDay[]>([]);
  const [studentHistory, setStudentHistory] = useState<StudentAttendanceHistory | null>(null);
  const [gradeSummaries, setGradeSummaries] = useState<GradeAttendanceSummary[]>([]);
  const [notifications, setNotifications] = useState<AbsenceNotification[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Filters
  const [selectedDate, setSelectedDate] = useState('18 October 2026');
  const [selectedYear, setSelectedYear] = useState('2026–27');
  const [selectedClass, setSelectedClass] = useState('Grade 8');
  const [selectedSection, setSelectedSection] = useState('A');
  const [selectedStatus, setSelectedStatus] = useState('All statuses');
  const [searchStudentQuery, setSearchStudentQuery] = useState('');

  // Modals & Feedback
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [toastNotification, setToastNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [k, tr, dist, cls, fu, daily, cal, hist, gr, notifs] = await Promise.all([
        mockAttendanceRepository.getKPIs(),
        mockAttendanceRepository.getAttendanceTrend(),
        mockAttendanceRepository.getStatusDistribution(),
        mockAttendanceRepository.getClassSummaries(),
        mockAttendanceRepository.getFollowUps(),
        mockAttendanceRepository.getDailyAttendance(selectedClass, selectedSection, selectedDate),
        mockAttendanceRepository.getMonthlyCalendarDays(),
        mockAttendanceRepository.getStudentHistory('STU-2026-001'),
        mockAttendanceRepository.getGradeSummaries(),
        mockAttendanceRepository.getNotifications(),
      ]);
      setKpis(k);
      setTrendPoints(tr);
      setStatusDistribution(dist);
      setClassSummaries(cls);
      setFollowUps(fu);
      setDailyRecords(daily);
      setInitialDailyRecords(daily.map((d) => ({ ...d })));
      setCalendarDays(cal);
      setStudentHistory(hist);
      setGradeSummaries(gr);
      setNotifications(notifs);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const goToOverview = () => setSubScreen('ATTENDANCE_OVERVIEW');

  const goToDailyRecords = (className?: string, section?: string) => {
    if (className) setSelectedClass(className);
    if (section) setSelectedSection(section);
    setSubScreen('DAILY_RECORDS');
  };

  const goToCalendarHistory = () => setSubScreen('CALENDAR_HISTORY');
  const goToNotificationsStates = () => setSubScreen('NOTIFICATIONS_STATES');

  const updateStudentStatus = (studentId: string, status: AttendanceStatus) => {
    setDailyRecords((prev) =>
      prev.map((stu) =>
        stu.studentId === studentId
          ? {
              ...stu,
              status,
              arrivalTime: status === 'Late' && stu.arrivalTime === '—' ? '08:45 AM' : status === 'Present' && stu.arrivalTime === '—' ? '08:15 AM' : status === 'Absent' || status === 'Excused' ? '—' : stu.arrivalTime,
              isModified: true,
            }
          : stu
      )
    );
  };

  const updateStudentRemarks = (studentId: string, remarks: string) => {
    setDailyRecords((prev) =>
      prev.map((stu) =>
        stu.studentId === studentId
          ? { ...stu, remarks, isModified: true }
          : stu
      )
    );
  };

  const saveAttendance = async () => {
    try {
      await mockAttendanceRepository.saveDailyAttendance(dailyRecords);
      setInitialDailyRecords(dailyRecords.map((d) => ({ ...d, isModified: false })));
      setDailyRecords((prev) => prev.map((d) => ({ ...d, isModified: false })));
      showToast('success', `Attendance for ${selectedClass} · Section ${selectedSection} saved successfully.`);
      setIsConfirmDialogOpen(false);
    } catch {
      showToast('error', 'Unable to save attendance. Please try again.');
    }
  };

  const cancelDailyChanges = () => {
    setDailyRecords(initialDailyRecords.map((d) => ({ ...d })));
    showToast('success', 'Changes discarded.');
  };

  const retryNotificationItem = async (id: string) => {
    await mockAttendanceRepository.retryNotification(id);
    const updated = await mockAttendanceRepository.getNotifications();
    setNotifications(updated);
    showToast('success', 'Notification resent successfully.');
  };

  const selectStudentForHistory = async (studentId: string) => {
    const hist = await mockAttendanceRepository.getStudentHistory(studentId);
    setStudentHistory(hist);
  };

  const openConfirmDialog = () => setIsConfirmDialogOpen(true);
  const closeConfirmDialog = () => setIsConfirmDialogOpen(false);

  const showToast = (type: 'success' | 'error', message: string) => {
    setToastNotification({ type, message });
    setTimeout(() => {
      setToastNotification(null);
    }, 4000);
  };

  const clearToast = () => setToastNotification(null);

  return (
    <AttendanceContext.Provider
      value={{
        subScreen,
        kpis,
        trendPoints,
        statusDistribution,
        classSummaries,
        followUps,
        dailyRecords,
        calendarDays,
        studentHistory,
        gradeSummaries,
        notifications,
        isLoading,
        selectedDate,
        setSelectedDate,
        selectedYear,
        setSelectedYear,
        selectedClass,
        setSelectedClass,
        selectedSection,
        setSelectedSection,
        selectedStatus,
        setSelectedStatus,
        searchStudentQuery,
        setSearchStudentQuery,
        goToOverview,
        goToDailyRecords,
        goToCalendarHistory,
        goToNotificationsStates,
        updateStudentStatus,
        updateStudentRemarks,
        saveAttendance,
        cancelDailyChanges,
        retryNotificationItem,
        selectStudentForHistory,
        isConfirmDialogOpen,
        openConfirmDialog,
        closeConfirmDialog,
        toastNotification,
        showToast,
        clearToast,
      }}
    >
      {children}
    </AttendanceContext.Provider>
  );
};

export const useAttendanceFlow = (): AttendanceContextType => {
  const context = useContext(AttendanceContext);
  if (!context) {
    throw new Error('useAttendanceFlow must be used within an AttendanceFlowProvider');
  }
  return context;
};
