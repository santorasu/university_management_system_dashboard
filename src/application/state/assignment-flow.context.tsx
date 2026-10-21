import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type {
  Assignment,
  AssignmentKpiStats,
  AssignmentListFilter,
  AssignmentsScreenId,
  ClassMaterial,
  StudentSubmission,
  SubmissionFilter,
  SubmissionsInnerTab,
} from '../../core/entities/assignment.types';
import { MockAssignmentRepository } from '../../infrastructure/repositories/mock-assignment.repository';

interface ToastNotice {
  message: string;
  type: 'success' | 'error' | 'info';
}

interface AssignmentFlowContextType {
  currentScreen: AssignmentsScreenId;
  activeInnerTab: SubmissionsInnerTab;
  kpiStats: AssignmentKpiStats | null;
  recentAssignments: Assignment[];
  allAssignments: Assignment[];
  selectedAssignment: Assignment | null;
  submissions: StudentSubmission[];
  materials: ClassMaterial[];
  listFilter: AssignmentListFilter;
  submissionFilter: SubmissionFilter;
  editingAssignment: Assignment | null;
  isCreateMode: boolean;
  isSubmitting: boolean;
  feedbackToast: ToastNotice | null;
  reviewingSubmission: StudentSubmission | null;
  isAddMaterialModalOpen: boolean;

  // Semantic Flow Navigation
  navigateToScreen: (screen: AssignmentsScreenId) => void;
  goToOverview: () => void;
  goToListDetails: (assignment?: Assignment) => void;
  goToCreateAssignment: () => void;
  goToEditAssignment: (assignment: Assignment) => void;
  goToSubmissionsMaterials: (
    tab?: SubmissionsInnerTab,
    assignmentId?: string,
    statusFilter?: string
  ) => void;

  // Actions
  setActiveInnerTab: (tab: SubmissionsInnerTab) => void;
  selectAssignment: (assignment: Assignment) => void;
  saveDraft: (assignmentData: Partial<Assignment>) => Promise<void>;
  publishAssignment: (assignmentData: Partial<Assignment>) => Promise<void>;
  updateListFilter: (updates: Partial<AssignmentListFilter>) => void;
  resetListFilter: () => void;
  updateSubmissionFilter: (updates: Partial<SubmissionFilter>) => void;
  gradeSubmission: (submissionId: string, marks: number, feedback?: string) => Promise<void>;
  sendReminder: (submissionId: string) => Promise<void>;
  addMaterial: (material: Omit<ClassMaterial, 'id' | 'updatedAt'>) => Promise<void>;
  setReviewingSubmission: (sub: StudentSubmission | null) => void;
  setAddMaterialModalOpen: (open: boolean) => void;
  clearFeedbackToast: () => void;
}

const defaultListFilter: AssignmentListFilter = {
  searchQuery: '',
  className: 'All classes',
  subject: 'All subjects',
  status: 'All statuses',
  dueDate: 'Any date',
};

const defaultSubmissionFilter: SubmissionFilter = {
  assignmentId: 'asn-01',
  className: 'Class 8-A',
  status: 'All statuses',
  studentSearch: '',
};

const AssignmentFlowContext = createContext<AssignmentFlowContextType | undefined>(
  undefined
);

const repo = new MockAssignmentRepository();

export const AssignmentFlowProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentScreen, setCurrentScreen] = useState<AssignmentsScreenId>('OVERVIEW');
  const [activeInnerTab, setActiveInnerTab] = useState<SubmissionsInnerTab>('SUBMISSIONS');
  const [kpiStats, setKpiStats] = useState<AssignmentKpiStats | null>(null);
  const [recentAssignments, setRecentAssignments] = useState<Assignment[]>([]);
  const [allAssignments, setAllAssignments] = useState<Assignment[]>([]);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [submissions, setSubmissions] = useState<StudentSubmission[]>([]);
  const [materials, setMaterials] = useState<ClassMaterial[]>([]);
  const [listFilter, setListFilter] = useState<AssignmentListFilter>(defaultListFilter);
  const [submissionFilter, setSubmissionFilter] =
    useState<SubmissionFilter>(defaultSubmissionFilter);
  const [editingAssignment, setEditingAssignment] = useState<Assignment | null>(null);
  const [isCreateMode, setIsCreateMode] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [feedbackToast, setFeedbackToast] = useState<ToastNotice | null>(null);
  const [reviewingSubmission, setReviewingSubmission] =
    useState<StudentSubmission | null>(null);
  const [isAddMaterialModalOpen, setAddMaterialModalOpen] = useState<boolean>(false);

  // Initialize data
  useEffect(() => {
    const initData = async () => {
      try {
        const stats = await repo.getKpiStats();
        setKpiStats(stats);
        const recent = await repo.getRecentAssignments();
        setRecentAssignments(recent);
        const assignments = await repo.getAssignments();
        setAllAssignments(assignments);
        if (assignments.length > 0) {
          setSelectedAssignment(assignments[0]);
        }
        const subs = await repo.getSubmissions({ assignmentId: 'asn-01' });
        setSubmissions(subs);
        const mats = await repo.getClassMaterials();
        setMaterials(mats);
      } catch (err) {
        console.error('Failed to load assignments data:', err);
      }
    };
    initData();
  }, []);

  const navigateToScreen = (screen: AssignmentsScreenId) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToOverview = () => {
    navigateToScreen('OVERVIEW');
  };

  const goToListDetails = (assignment?: Assignment) => {
    if (assignment) {
      setSelectedAssignment(assignment);
      setSubmissionFilter((prev) => ({
        ...prev,
        assignmentId: assignment.id,
        className: assignment.className,
      }));
    }
    navigateToScreen('LIST_DETAILS');
  };

  const goToCreateAssignment = () => {
    setIsCreateMode(true);
    setEditingAssignment(null);
    navigateToScreen('CREATE_EDIT');
  };

  const goToEditAssignment = (assignment: Assignment) => {
    setIsCreateMode(false);
    setEditingAssignment(assignment);
    navigateToScreen('CREATE_EDIT');
  };

  const goToSubmissionsMaterials = async (
    tab: SubmissionsInnerTab = 'SUBMISSIONS',
    assignmentId?: string,
    statusFilter?: string
  ) => {
    setActiveInnerTab(tab);
    const targetAssignmentId = assignmentId || selectedAssignment?.id || 'asn-01';
    const targetClass =
      allAssignments.find((a) => a.id === targetAssignmentId)?.className ||
      'Class 8-A';

    const updates: Partial<SubmissionFilter> = {
      assignmentId: targetAssignmentId,
      className: targetClass,
    };
    if (statusFilter) {
      updates.status = statusFilter;
    }
    setSubmissionFilter((prev) => ({ ...prev, ...updates }));
    const subs = await repo.getSubmissions({ ...submissionFilter, ...updates });
    setSubmissions(subs);
    navigateToScreen('SUBMISSIONS_MATERIALS');
  };

  const selectAssignment = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setSubmissionFilter((prev) => ({
      ...prev,
      assignmentId: assignment.id,
      className: assignment.className,
    }));
  };

  const saveDraft = async (assignmentData: Partial<Assignment>) => {
    setIsSubmitting(true);
    try {
      if (!isCreateMode && editingAssignment) {
        const updated = await repo.updateAssignment(editingAssignment.id, {
          ...assignmentData,
          status: 'Draft',
        });
        setAllAssignments((prev) =>
          prev.map((a) => (a.id === updated.id ? updated : a))
        );
        setSelectedAssignment(updated);
        setFeedbackToast({
          message: `Draft "${updated.title}" updated successfully.`,
          type: 'info',
        });
      } else {
        const created = await repo.createAssignment({
          title: assignmentData.title || 'Untitled Assignment',
          academicYear: assignmentData.academicYear || '2026–2027',
          classId: assignmentData.classId || 'cls-8a',
          className: assignmentData.className || 'Class 8-A',
          section: assignmentData.section || 'Section A',
          subject: assignmentData.subject || 'Mathematics',
          teacherName: assignmentData.teacherName || 'Nusrat Jahan',
          dueDate: assignmentData.dueDate || '28 Oct 2026',
          dueTime: assignmentData.dueTime || '11:59 PM',
          publishDate: new Date().toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          }),
          status: 'Draft',
          totalStudents: 32,
          instructions:
            assignmentData.instructions ||
            'Complete the assigned questions and upload solutions.',
          maxMarks: assignmentData.maxMarks || 20,
          submissionType: assignmentData.submissionType || 'File upload',
          latePolicy: assignmentData.latePolicy || 'Allow with late label',
          attachments: assignmentData.attachments || [],
          visibleToClass: assignmentData.visibleToClass ?? false,
          notifyStudents: assignmentData.notifyStudents ?? false,
          allowResubmission: assignmentData.allowResubmission ?? true,
        });
        setAllAssignments((prev) => [created, ...prev]);
        setSelectedAssignment(created);
        setFeedbackToast({
          message: `Draft "${created.title}" saved successfully.`,
          type: 'info',
        });
      }
      goToListDetails();
    } catch (err) {
      console.error(err);
      setFeedbackToast({
        message: 'Failed to save draft. Please check required fields.',
        type: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const publishAssignment = async (assignmentData: Partial<Assignment>) => {
    setIsSubmitting(true);
    try {
      if (!isCreateMode && editingAssignment) {
        const updated = await repo.updateAssignment(editingAssignment.id, {
          ...assignmentData,
          status: 'Published',
        });
        setAllAssignments((prev) =>
          prev.map((a) => (a.id === updated.id ? updated : a))
        );
        setSelectedAssignment(updated);
        setFeedbackToast({
          message: `Assignment "${updated.title}" published to ${updated.className}!`,
          type: 'success',
        });
      } else {
        const created = await repo.createAssignment({
          title: assignmentData.title || 'New Assignment',
          academicYear: assignmentData.academicYear || '2026–2027',
          classId: assignmentData.classId || 'cls-8a',
          className: assignmentData.className || 'Class 8-A',
          section: assignmentData.section || 'Section A',
          subject: assignmentData.subject || 'Mathematics',
          teacherName: assignmentData.teacherName || 'Nusrat Jahan',
          dueDate: assignmentData.dueDate || '28 Oct 2026',
          dueTime: assignmentData.dueTime || '11:59 PM',
          publishDate: new Date().toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          }),
          status: 'Published',
          totalStudents: 32,
          instructions:
            assignmentData.instructions ||
            'Complete the assigned questions and upload solutions.',
          maxMarks: assignmentData.maxMarks || 20,
          submissionType: assignmentData.submissionType || 'File upload',
          latePolicy: assignmentData.latePolicy || 'Allow with late label',
          attachments: assignmentData.attachments || [],
          visibleToClass: assignmentData.visibleToClass ?? true,
          notifyStudents: assignmentData.notifyStudents ?? true,
          allowResubmission: assignmentData.allowResubmission ?? true,
        });
        setAllAssignments((prev) => [created, ...prev]);
        setSelectedAssignment(created);
        setFeedbackToast({
          message: `Assignment "${created.title}" successfully published!`,
          type: 'success',
        });
      }
      goToListDetails();
    } catch (err) {
      console.error(err);
      setFeedbackToast({
        message: 'Failed to publish assignment. Check all fields.',
        type: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateListFilter = async (updates: Partial<AssignmentListFilter>) => {
    const nextFilter = { ...listFilter, ...updates };
    setListFilter(nextFilter);
    const filtered = await repo.getAssignments(nextFilter);
    setAllAssignments(filtered);
  };

  const resetListFilter = async () => {
    setListFilter(defaultListFilter);
    const filtered = await repo.getAssignments(defaultListFilter);
    setAllAssignments(filtered);
  };

  const updateSubmissionFilter = async (updates: Partial<SubmissionFilter>) => {
    const next = { ...submissionFilter, ...updates };
    setSubmissionFilter(next);
    const subs = await repo.getSubmissions(next);
    setSubmissions(subs);
  };

  const gradeSubmission = async (
    submissionId: string,
    marks: number,
    feedback?: string
  ) => {
    try {
      const updated = await repo.updateSubmissionGrade(
        submissionId,
        marks,
        feedback
      );
      setSubmissions((prev) =>
        prev.map((s) => (s.id === updated.id ? updated : s))
      );
      setFeedbackToast({
        message: `Grade (${marks} marks) saved for ${updated.studentName}.`,
        type: 'success',
      });
      setReviewingSubmission(null);
    } catch (err) {
      console.error(err);
      setFeedbackToast({
        message: 'Failed to save grade.',
        type: 'error',
      });
    }
  };

  const sendReminder = async (submissionId: string) => {
    const target = submissions.find((s) => s.id === submissionId);
    if (!target) return;
    await repo.sendStudentReminder(submissionId);
    setFeedbackToast({
      message: `Reminder notification sent to ${target.studentName}.`,
      type: 'info',
    });
  };

  const addMaterial = async (
    material: Omit<ClassMaterial, 'id' | 'updatedAt'>
  ) => {
    try {
      const created = await repo.addClassMaterial(material);
      setMaterials((prev) => [created, ...prev]);
      setFeedbackToast({
        message: `Resource "${created.title}" uploaded to class library.`,
        type: 'success',
      });
      setAddMaterialModalOpen(false);
    } catch (err) {
      console.error(err);
      setFeedbackToast({
        message: 'Failed to upload material.',
        type: 'error',
      });
    }
  };

  const clearFeedbackToast = () => setFeedbackToast(null);

  return (
    <AssignmentFlowContext.Provider
      value={{
        currentScreen,
        activeInnerTab,
        kpiStats,
        recentAssignments,
        allAssignments,
        selectedAssignment,
        submissions,
        materials,
        listFilter,
        submissionFilter,
        editingAssignment,
        isCreateMode,
        isSubmitting,
        feedbackToast,
        reviewingSubmission,
        isAddMaterialModalOpen,
        navigateToScreen,
        goToOverview,
        goToListDetails,
        goToCreateAssignment,
        goToEditAssignment,
        goToSubmissionsMaterials,
        setActiveInnerTab,
        selectAssignment,
        saveDraft,
        publishAssignment,
        updateListFilter,
        resetListFilter,
        updateSubmissionFilter,
        gradeSubmission,
        sendReminder,
        addMaterial,
        setReviewingSubmission,
        setAddMaterialModalOpen,
        clearFeedbackToast,
      }}
    >
      {children}
    </AssignmentFlowContext.Provider>
  );
};

export const useAssignmentFlow = (): AssignmentFlowContextType => {
  const context = useContext(AssignmentFlowContext);
  if (!context) {
    throw new Error(
      'useAssignmentFlow must be used within an AssignmentFlowProvider'
    );
  }
  return context;
};
