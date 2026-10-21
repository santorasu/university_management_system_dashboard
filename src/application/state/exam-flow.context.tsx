import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type {
  Exam,
  ExamKpiStats,
  ExamHistoryItem,
  TeacherMarksSubmission,
  StudentExamMark,
  GradingBand,
  CalculatedStudentResult,
  ExamsScreenId,
  ResultsInnerTab,
} from '../../core/entities/exam.types';
import { MockExamRepository } from '../../infrastructure/repositories/mock-exam.repository';

interface ToastNotice {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

interface ExamFlowContextType {
  currentScreen: ExamsScreenId;
  activeResultsTab: ResultsInnerTab;
  kpiStats: ExamKpiStats | null;
  upcomingExams: Exam[];
  recentHistory: ExamHistoryItem[];
  allExams: Exam[];
  selectedExam: Exam | null;
  teacherSubmissions: TeacherMarksSubmission[];
  studentMarks: StudentExamMark[];
  gradingBands: GradingBand[];
  calculatedResults: CalculatedStudentResult[];
  editingExam: Exam | null;
  isCreateMode: boolean;
  selectedResultForModal: CalculatedStudentResult | null;
  isPublishModalOpen: boolean;
  isGradingConfigModalOpen: boolean;
  editingMark: StudentExamMark | null;
  feedbackToast: ToastNotice | null;

  // Filter states
  filterClass: string;
  filterSubject: string;
  filterTeacherStatus: string;
  resultsFilterExam: string;
  resultsFilterClass: string;
  resultsFilterStatus: string;
  resultsSearch: string;

  // Navigation
  navigateToScreen: (screen: ExamsScreenId) => void;
  goToOverview: () => void;
  goToCreateSchedule: (exam?: Exam) => void;
  goToMarksReview: (examId?: string, className?: string, subject?: string) => void;
  goToResultsReports: (examId?: string, className?: string) => void;
  setActiveResultsTab: (tab: ResultsInnerTab) => void;

  // Actions
  setFilterClass: (cls: string) => void;
  setFilterSubject: (sub: string) => void;
  setFilterTeacherStatus: (status: string) => void;
  setResultsFilterExam: (exam: string) => void;
  setResultsFilterClass: (cls: string) => void;
  setResultsFilterStatus: (status: string) => void;
  setResultsSearch: (query: string) => void;
  scheduleExam: (examData: Partial<Exam>) => Promise<void>;
  saveDraft: (examData: Partial<Exam>) => Promise<void>;
  updateStudentMark: (markId: string, markValue: number) => Promise<void>;
  approveTeacherMarks: (submissionId: string) => Promise<void>;
  sendTeacherReminder: (submissionId: string) => Promise<void>;
  publishResults: (examId: string, className: string) => Promise<void>;
  updateGradingBands: (bands: GradingBand[]) => Promise<void>;
  setSelectedResultForModal: (result: CalculatedStudentResult | null) => void;
  setIsPublishModalOpen: (open: boolean) => void;
  setIsGradingConfigModalOpen: (open: boolean) => void;
  setEditingMark: (mark: StudentExamMark | null) => void;
  clearFeedbackToast: () => void;
}

const ExamFlowContext = createContext<ExamFlowContextType | undefined>(undefined);

const repo = new MockExamRepository();

export const ExamFlowProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<ExamsScreenId>('OVERVIEW');
  const [activeResultsTab, setActiveResultsTab] = useState<ResultsInnerTab>('RESULTS_REVIEW');
  const [kpiStats, setKpiStats] = useState<ExamKpiStats | null>(null);
  const [upcomingExams, setUpcomingExams] = useState<Exam[]>([]);
  const [recentHistory, setRecentHistory] = useState<ExamHistoryItem[]>([]);
  const [allExams, setAllExams] = useState<Exam[]>([]);
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [teacherSubmissions, setTeacherSubmissions] = useState<TeacherMarksSubmission[]>([]);
  const [studentMarks, setStudentMarks] = useState<StudentExamMark[]>([]);
  const [gradingBands, setGradingBands] = useState<GradingBand[]>([]);
  const [calculatedResults, setCalculatedResults] = useState<CalculatedStudentResult[]>([]);
  const [editingExam, setEditingExam] = useState<Exam | null>(null);
  const [isCreateMode, setIsCreateMode] = useState<boolean>(true);
  const [selectedResultForModal, setSelectedResultForModal] =
    useState<CalculatedStudentResult | null>(null);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState<boolean>(false);
  const [isGradingConfigModalOpen, setIsGradingConfigModalOpen] = useState<boolean>(false);
  const [editingMark, setEditingMark] = useState<StudentExamMark | null>(null);
  const [feedbackToast, setFeedbackToast] = useState<ToastNotice | null>(null);

  // Filters
  const [filterClass, setFilterClass] = useState<string>('Class 8-A');
  const [filterSubject, setFilterSubject] = useState<string>('Mathematics');
  const [filterTeacherStatus, setFilterTeacherStatus] = useState<string>('All statuses');
  const [resultsFilterExam, setResultsFilterExam] = useState<string>('Mid-Term Examination');
  const [resultsFilterClass, setResultsFilterClass] = useState<string>('Class 8-A');
  const [resultsFilterStatus, setResultsFilterStatus] = useState<string>('All statuses');
  const [resultsSearch, setResultsSearch] = useState<string>('');

  useEffect(() => {
    const loadInitialData = async () => {
      const stats = await repo.getKpiStats();
      const upcoming = await repo.getUpcomingExams();
      const history = await repo.getRecentExamHistory();
      const all = await repo.getAllExams();
      const tSubs = await repo.getTeacherMarksSubmissions();
      const sMarks = await repo.getStudentExamMarks('ts-01');
      const gBands = await repo.getGradingBands();
      const cResults = await repo.getCalculatedResults();

      setKpiStats(stats);
      setUpcomingExams(upcoming);
      setRecentHistory(history);
      setAllExams(all);
      setSelectedExam(upcoming[0] || null);
      setTeacherSubmissions(tSubs);
      setStudentMarks(sMarks);
      setGradingBands(gBands);
      setCalculatedResults(cResults);
    };

    loadInitialData();
  }, []);

  const navigateToScreen = (screen: ExamsScreenId) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToOverview = () => {
    navigateToScreen('OVERVIEW');
  };

  const goToCreateSchedule = (exam?: Exam) => {
    if (exam) {
      setIsCreateMode(false);
      setEditingExam(exam);
    } else {
      setIsCreateMode(true);
      setEditingExam(null);
    }
    navigateToScreen('CREATE_SCHEDULE');
  };

  const goToMarksReview = async (examId?: string, className?: string, subject?: string) => {
    if (className) setFilterClass(className);
    if (subject) setFilterSubject(subject);
    const subs = await repo.getTeacherMarksSubmissions({
      examId,
      className: className || filterClass,
      subject: subject || filterSubject,
    });
    setTeacherSubmissions(subs);
    if (subs.length > 0) {
      const marks = await repo.getStudentExamMarks(subs[0].id);
      setStudentMarks(marks);
    }
    navigateToScreen('MARKS_REVIEW');
  };

  const goToResultsReports = (examId?: string, className?: string) => {
    if (className) setResultsFilterClass(className);
    if (examId) {
      const found = allExams.find((e) => e.id === examId);
      if (found) setResultsFilterExam(found.name);
    }
    navigateToScreen('RESULTS_REPORTS');
  };

  const scheduleExam = async (examData: Partial<Exam>) => {
    try {
      if (editingExam && !isCreateMode) {
        const updated = await repo.updateExam(editingExam.id, {
          ...examData,
          status: 'Scheduled',
        });
        setAllExams((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
        setUpcomingExams((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
        setFeedbackToast({
          message: `Success · Exam "${updated.name}" scheduled. Teacher notifications queued.`,
          type: 'success',
        });
      } else {
        const created = await repo.createExam({
          ...examData,
          status: 'Scheduled',
        });
        setAllExams((prev) => [created, ...prev]);
        setUpcomingExams((prev) => [created, ...prev]);
        setFeedbackToast({
          message: `Success · Exam "${created.name}" created and scheduled!`,
          type: 'success',
        });
      }
      navigateToScreen('OVERVIEW');
    } catch {
      setFeedbackToast({
        message: 'Error · Failed to schedule exam. Please check dates and subject overlap.',
        type: 'error',
      });
    }
  };

  const saveDraft = async (examData: Partial<Exam>) => {
    try {
      if (editingExam && !isCreateMode) {
        const updated = await repo.updateExam(editingExam.id, {
          ...examData,
          status: 'Draft',
        });
        setAllExams((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
      } else {
        const created = await repo.createExam({
          ...examData,
          status: 'Draft',
        });
        setAllExams((prev) => [created, ...prev]);
      }
      setFeedbackToast({
        message: 'Draft saved. You can complete scheduling at any time.',
        type: 'info',
      });
      navigateToScreen('OVERVIEW');
    } catch {
      setFeedbackToast({
        message: 'Error saving draft.',
        type: 'error',
      });
    }
  };

  const updateStudentMark = async (markId: string, markValue: number) => {
    try {
      const updated = await repo.updateStudentMark(markId, markValue);
      setStudentMarks((prev) =>
        prev.map((m) => (m.id === updated.id ? updated : m))
      );
      setEditingMark(null);
      setFeedbackToast({
        message: `Updated marks for ${updated.studentName}: ${updated.marks} (${updated.validation}).`,
        type: updated.validation === 'Valid' ? 'success' : 'warning',
      });
    } catch {
      setFeedbackToast({
        message: 'Error updating student marks.',
        type: 'error',
      });
    }
  };

  const approveTeacherMarks = async (submissionId: string) => {
    await repo.approveTeacherMarks(submissionId);
    setTeacherSubmissions((prev) =>
      prev.map((s) => (s.id === submissionId ? { ...s, status: 'Approved', validation: 'Valid' } : s))
    );
    setFeedbackToast({
      message: 'Teacher marks submission approved successfully.',
      type: 'success',
    });
  };

  const sendTeacherReminder = async (submissionId: string) => {
    const sub = teacherSubmissions.find((s) => s.id === submissionId);
    setFeedbackToast({
      message: `Reminder sent to ${sub?.teacherName || 'teacher'} for ${sub?.subject || 'exam'} marks entry.`,
      type: 'info',
    });
  };

  const publishResults = async (examId: string, className: string) => {
    await repo.publishResults(examId, className);
    setCalculatedResults((prev) =>
      prev.map((r) =>
        r.className === className && r.validation === 'Valid'
          ? { ...r, resultStatus: 'Published' }
          : r
      )
    );
    setIsPublishModalOpen(false);
    setFeedbackToast({
      message: `Results published for ${className}! Report cards are now accessible to students & guardians.`,
      type: 'success',
    });
  };

  const updateGradingBands = async (bands: GradingBand[]) => {
    const updated = await repo.updateGradingBands(bands);
    setGradingBands(updated);
    setIsGradingConfigModalOpen(false);
    setFeedbackToast({
      message: 'Grading scale configuration updated successfully.',
      type: 'success',
    });
  };

  const clearFeedbackToast = () => setFeedbackToast(null);

  return (
    <ExamFlowContext.Provider
      value={{
        currentScreen,
        activeResultsTab,
        kpiStats,
        upcomingExams,
        recentHistory,
        allExams,
        selectedExam,
        teacherSubmissions,
        studentMarks,
        gradingBands,
        calculatedResults,
        editingExam,
        isCreateMode,
        selectedResultForModal,
        isPublishModalOpen,
        isGradingConfigModalOpen,
        editingMark,
        feedbackToast,
        filterClass,
        filterSubject,
        filterTeacherStatus,
        resultsFilterExam,
        resultsFilterClass,
        resultsFilterStatus,
        resultsSearch,
        navigateToScreen,
        goToOverview,
        goToCreateSchedule,
        goToMarksReview,
        goToResultsReports,
        setActiveResultsTab,
        setFilterClass,
        setFilterSubject,
        setFilterTeacherStatus,
        setResultsFilterExam,
        setResultsFilterClass,
        setResultsFilterStatus,
        setResultsSearch,
        scheduleExam,
        saveDraft,
        updateStudentMark,
        approveTeacherMarks,
        sendTeacherReminder,
        publishResults,
        updateGradingBands,
        setSelectedResultForModal,
        setIsPublishModalOpen,
        setIsGradingConfigModalOpen,
        setEditingMark,
        clearFeedbackToast,
      }}
    >
      {children}
    </ExamFlowContext.Provider>
  );
};

export const useExamFlow = () => {
  const context = useContext(ExamFlowContext);
  if (!context) {
    throw new Error('useExamFlow must be used within an ExamFlowProvider');
  }
  return context;
};
