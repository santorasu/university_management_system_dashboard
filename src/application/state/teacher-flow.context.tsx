import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type {
  Teacher,
  TeacherStats,
  TeacherFilterOptions,
  TeacherSubScreen,
  TeacherFeedback,
  TeacherFeedbackStats,
  FeedbackFilterOptions,
} from '../../core/entities/teacher.types';
import { MockTeacherRepository } from '../../infrastructure/repositories/mock-teacher.repository';

interface TeacherFlowContextValue {
  subScreen: TeacherSubScreen;
  selectedTeacher: Teacher | null;
  editingTeacher: Teacher | null;
  teachers: Teacher[];
  stats: TeacherStats | null;
  filters: TeacherFilterOptions;
  feedbackList: TeacherFeedback[];
  feedbackStats: TeacherFeedbackStats | null;
  feedbackFilters: FeedbackFilterOptions;
  isLoading: boolean;
  notification: { message: string; type: 'success' | 'error' | 'info' } | null;

  // Navigation actions
  goToConsolidatedOverview: () => void;
  goToDirectory: () => void;
  goToAddTeacher: () => void;
  goToEditTeacher: (teacher: Teacher) => void;
  goToProfile: (teacher: Teacher) => void;
  goToFeedback: () => void;
  selectTeacher: (teacher: Teacher) => void;

  // Filter actions
  setSearchQuery: (q: string) => void;
  setDepartment: (dept: string) => void;
  setStatus: (status: string) => void;
  setAvailability: (avail: string) => void;
  resetFilters: () => void;

  // Feedback filter actions
  setFeedbackSearch: (q: string) => void;
  setFeedbackTeacher: (t: string) => void;
  setFeedbackRating: (r: string) => void;
  setFeedbackStatus: (s: string) => void;

  // Persistence
  saveTeacher: (data: Partial<Teacher>) => Promise<boolean>;
  clearNotification: () => void;
}

const TeacherFlowContext = createContext<TeacherFlowContextValue | undefined>(undefined);

const repository = new MockTeacherRepository();

export const TeacherFlowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [subScreen, setSubScreen] = useState<TeacherSubScreen>('TEACHERS_CONSOLIDATED');
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [stats, setStats] = useState<TeacherStats | null>(null);

  const [feedbackList, setFeedbackList] = useState<TeacherFeedback[]>([]);
  const [feedbackStats, setFeedbackStats] = useState<TeacherFeedbackStats | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const [filters, setFilters] = useState<TeacherFilterOptions>({
    searchQuery: '',
    department: 'All departments',
    status: 'All statuses',
    availability: 'Any status',
  });

  const [feedbackFilters, setFeedbackFilters] = useState<FeedbackFilterOptions>({
    searchQuery: '',
    selectedTeacher: 'All teachers',
    selectedRating: 'All ratings',
    selectedStatus: 'All statuses',
  });

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [fetchedTeachers, fetchedStats, fetchedFeedback, fetchedFeedbackStats] =
        await Promise.all([
          repository.getTeachers(filters),
          repository.getTeacherStats(),
          repository.getFeedback(feedbackFilters),
          repository.getFeedbackStats(),
        ]);
      setTeachers(fetchedTeachers);
      setStats(fetchedStats);
      setFeedbackList(fetchedFeedback);
      setFeedbackStats(fetchedFeedbackStats);

      if (!selectedTeacher && fetchedTeachers.length > 0) {
        setSelectedTeacher(fetchedTeachers[0]);
      } else if (selectedTeacher) {
        const found = fetchedTeachers.find((t) => t.id === selectedTeacher.id);
        if (found) setSelectedTeacher(found);
      }
    } finally {
      setIsLoading(false);
    }
  }, [filters, feedbackFilters, selectedTeacher]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const goToConsolidatedOverview = useCallback(() => setSubScreen('TEACHERS_CONSOLIDATED'), []);
  const goToDirectory = useCallback(() => setSubScreen('TEACHERS_DIRECTORY'), []);
  const goToAddTeacher = useCallback(() => {
    setEditingTeacher(null);
    setSubScreen('TEACHERS_ADD_EDIT');
  }, []);
  const goToEditTeacher = useCallback((teacher: Teacher) => {
    setEditingTeacher(teacher);
    setSubScreen('TEACHERS_ADD_EDIT');
  }, []);
  const goToProfile = useCallback((teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setSubScreen('TEACHERS_PROFILE');
  }, []);
  const goToFeedback = useCallback(() => setSubScreen('TEACHERS_FEEDBACK'), []);
  const selectTeacher = useCallback((teacher: Teacher) => setSelectedTeacher(teacher), []);

  const setSearchQuery = useCallback((q: string) => setFilters((p) => ({ ...p, searchQuery: q })), []);
  const setDepartment = useCallback((d: string) => setFilters((p) => ({ ...p, department: d })), []);
  const setStatus = useCallback((s: string) => setFilters((p) => ({ ...p, status: s })), []);
  const setAvailability = useCallback((a: string) => setFilters((p) => ({ ...p, availability: a })), []);
  const resetFilters = useCallback(() => {
    setFilters({
      searchQuery: '',
      department: 'All departments',
      status: 'All statuses',
      availability: 'Any status',
    });
  }, []);

  const setFeedbackSearch = useCallback((q: string) => setFeedbackFilters((p) => ({ ...p, searchQuery: q })), []);
  const setFeedbackTeacher = useCallback((t: string) => setFeedbackFilters((p) => ({ ...p, selectedTeacher: t })), []);
  const setFeedbackRating = useCallback((r: string) => setFeedbackFilters((p) => ({ ...p, selectedRating: r })), []);
  const setFeedbackStatus = useCallback((s: string) => setFeedbackFilters((p) => ({ ...p, selectedStatus: s })), []);

  const clearNotification = useCallback(() => setNotification(null), []);

  const saveTeacher = useCallback(
    async (data: Partial<Teacher>): Promise<boolean> => {
      setIsLoading(true);
      try {
        if (editingTeacher) {
          const updated = await repository.updateTeacher(editingTeacher.id, data);
          setSelectedTeacher(updated);
          setNotification({
            message: `Teacher "${updated.fullName}" updated successfully.`,
            type: 'success',
          });
        } else {
          const initials = (data.fullName || 'TC')
            .split(' ')
            .map((p) => p[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
          const created = await repository.createTeacher({
            teacherId: data.teacherId || `TCH-2026-0${teachers.length + 10}`,
            fullName: data.fullName || 'New Teacher',
            avatarColor: '#EEF2FF',
            initials: initials || 'TC',
            department: data.department || 'Mathematics & Science',
            subjects: data.subjects || ['Mathematics'],
            assignedClasses: data.assignedClasses || [{ gradeAndSection: 'Grade 8 · A', periodsPerWeek: 4 }],
            classesSummary: data.classesSummary || '8A',
            employmentType: data.employmentType || 'Full-time',
            status: data.status || 'Active',
            availability: data.availability || 'Available',
            availableHours: data.availableHours || 'Mon–Thu · 08:00–15:00',
            weeklyTeachingLoad: data.weeklyTeachingLoad || '18 periods / week',
            email: data.email || `${(data.fullName || 'teacher').toLowerCase().replace(/\s+/g, '.')}@edusync.edu`,
            phone: data.phone || '+1 (555) 000-0000',
            address: data.address || 'Campus Staff Quarters',
            emergencyContact: data.emergencyContact || 'Emergency Contact',
            preferredContact: 'Email',
            joiningDate: data.joiningDate || '16 Oct 2026',
            qualification: data.qualification || 'M.Sc. Education',
            experienceYears: 5,
            rating: 5.0,
            reviewCount: 0,
          });
          setSelectedTeacher(created);
          setNotification({
            message: `Teacher "${created.fullName}" successfully added.`,
            type: 'success',
          });
        }
        await loadData();
        setSubScreen('TEACHERS_CONSOLIDATED');
        return true;
      } catch (err: unknown) {
        const errorMsg = err instanceof Error ? err.message : 'Failed to save teacher';
        setNotification({ message: errorMsg, type: 'error' });
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [editingTeacher, loadData, teachers.length]
  );

  return (
    <TeacherFlowContext.Provider
      value={{
        subScreen,
        selectedTeacher,
        editingTeacher,
        teachers,
        stats,
        filters,
        feedbackList,
        feedbackStats,
        feedbackFilters,
        isLoading,
        notification,
        goToConsolidatedOverview,
        goToDirectory,
        goToAddTeacher,
        goToEditTeacher,
        goToProfile,
        goToFeedback,
        selectTeacher,
        setSearchQuery,
        setDepartment,
        setStatus,
        setAvailability,
        resetFilters,
        setFeedbackSearch,
        setFeedbackTeacher,
        setFeedbackRating,
        setFeedbackStatus,
        saveTeacher,
        clearNotification,
      }}
    >
      {children}
    </TeacherFlowContext.Provider>
  );
};

export const useTeacherFlow = (): TeacherFlowContextValue => {
  const context = useContext(TeacherFlowContext);
  if (!context) {
    throw new Error('useTeacherFlow must be used within a TeacherFlowProvider');
  }
  return context;
};
