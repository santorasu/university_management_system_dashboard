import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type {
  Student,
  StudentStats,
  StudentFilterOptions,
  StudentSubScreen,
} from '../../core/entities/student.types';
import { MockStudentRepository } from '../../infrastructure/repositories/mock-student.repository';

interface StudentFlowContextValue {
  subScreen: StudentSubScreen;
  selectedStudent: Student | null;
  editingStudent: Student | null;
  students: Student[];
  stats: StudentStats | null;
  filters: StudentFilterOptions;
  isLoading: boolean;
  notification: { message: string; type: 'success' | 'error' | 'info' } | null;
  
  // Navigation actions
  goToConsolidatedOverview: () => void;
  goToDirectory: () => void;
  goToAddStudent: () => void;
  goToEditStudent: (student: Student) => void;
  goToProfile: (student: Student) => void;
  selectStudent: (student: Student) => void;
  
  // Filter actions
  setSearchQuery: (query: string) => void;
  setSelectedClass: (cls: string) => void;
  setSelectedStatus: (status: string) => void;
  setSelectedSection: (section: string) => void;
  resetFilters: () => void;
  
  // Persistence
  saveStudent: (studentData: Partial<Student>) => Promise<boolean>;
  clearNotification: () => void;
}

const StudentFlowContext = createContext<StudentFlowContextValue | undefined>(undefined);

const repository = new MockStudentRepository();

export const StudentFlowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [subScreen, setSubScreen] = useState<StudentSubScreen>('STUDENTS_CONSOLIDATED');
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [stats, setStats] = useState<StudentStats | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const [filters, setFilters] = useState<StudentFilterOptions>({
    searchQuery: '',
    selectedClass: 'All classes',
    selectedStatus: 'All statuses',
    selectedSection: 'All sections',
  });

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [fetchedStudents, fetchedStats] = await Promise.all([
        repository.getStudents(filters),
        repository.getStudentStats(),
      ]);
      setStudents(fetchedStudents);
      setStats(fetchedStats);
      if (!selectedStudent && fetchedStudents.length > 0) {
        setSelectedStudent(fetchedStudents[0]);
      } else if (selectedStudent) {
        // preserve or update selected student
        const current = fetchedStudents.find((s) => s.id === selectedStudent.id);
        if (current) setSelectedStudent(current);
      }
    } finally {
      setIsLoading(false);
    }
  }, [filters, selectedStudent]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const goToConsolidatedOverview = useCallback(() => {
    setSubScreen('STUDENTS_CONSOLIDATED');
  }, []);

  const goToDirectory = useCallback(() => {
    setSubScreen('STUDENTS_DIRECTORY');
  }, []);

  const goToAddStudent = useCallback(() => {
    setEditingStudent(null);
    setSubScreen('STUDENTS_ADD_EDIT');
  }, []);

  const goToEditStudent = useCallback((student: Student) => {
    setEditingStudent(student);
    setSubScreen('STUDENTS_ADD_EDIT');
  }, []);

  const goToProfile = useCallback((student: Student) => {
    setSelectedStudent(student);
    setSubScreen('STUDENTS_PROFILE');
  }, []);

  const selectStudent = useCallback((student: Student) => {
    setSelectedStudent(student);
  }, []);

  const setSearchQuery = useCallback((query: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: query }));
  }, []);

  const setSelectedClass = useCallback((cls: string) => {
    setFilters((prev) => ({ ...prev, selectedClass: cls }));
  }, []);

  const setSelectedStatus = useCallback((status: string) => {
    setFilters((prev) => ({ ...prev, selectedStatus: status }));
  }, []);

  const setSelectedSection = useCallback((section: string) => {
    setFilters((prev) => ({ ...prev, selectedSection: section }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      searchQuery: '',
      selectedClass: 'All classes',
      selectedStatus: 'All statuses',
      selectedSection: 'All sections',
    });
  }, []);

  const clearNotification = useCallback(() => {
    setNotification(null);
  }, []);

  const saveStudent = useCallback(
    async (data: Partial<Student>): Promise<boolean> => {
      setIsLoading(true);
      try {
        if (editingStudent) {
          const updated = await repository.updateStudent(editingStudent.id, data);
          setSelectedStudent(updated);
          setNotification({
            message: `Student "${updated.fullName}" updated successfully.`,
            type: 'success',
          });
        } else {
          const initials = (data.fullName || 'ST')
            .split(' ')
            .map((p) => p[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
          const created = await repository.createStudent({
            studentId: data.studentId || `STU-2026-00${students.length + 1}`,
            fullName: data.fullName || 'New Student',
            avatarColor: '#EEF2FF',
            initials: initials || 'ST',
            grade: data.grade || 'Grade 8',
            section: data.section || 'A',
            rollNumber: data.rollNumber || '08',
            attendanceRate: 100,
            status: data.status || 'Active',
            dateOfBirth: data.dateOfBirth || '01 Jan 2012',
            gender: data.gender || 'Female',
            enrollmentDate: data.enrollmentDate || '16 Oct 2026',
            academicYear: data.academicYear || '2026–27',
            email: data.email || 'student@example.edu',
            phone: data.phone || '+1 (555) 000-0000',
            emergencyContact: data.guardianName || 'Guardian',
            guardianName: data.guardianName || 'Parent / Guardian',
            guardianRelationship: data.guardianRelationship || 'Mother',
            guardianPhone: data.guardianPhone || '+1 (555) 000-0000',
            guardianEmail: data.guardianEmail || 'guardian@example.edu',
            averageResult: 85,
            assignmentsCompleted: 0,
            assignmentsTotal: 14,
            feeStatus: data.feeStatus || 'Paid',
            outstandingBalance: 0,
            recentFeeActivity: 'Enrollment completed · 16 Oct 2026',
            recentAcademicActivity: 'Orientation scheduled',
          });
          setSelectedStudent(created);
          setNotification({
            message: `Student "${created.fullName}" successfully enrolled.`,
            type: 'success',
          });
        }
        await loadData();
        setSubScreen('STUDENTS_CONSOLIDATED');
        return true;
      } catch (err: unknown) {
        const errorMsg = err instanceof Error ? err.message : 'Failed to save student';
        setNotification({
          message: errorMsg,
          type: 'error',
        });
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [editingStudent, loadData, students.length]
  );

  return (
    <StudentFlowContext.Provider
      value={{
        subScreen,
        selectedStudent,
        editingStudent,
        students,
        stats,
        filters,
        isLoading,
        notification,
        goToConsolidatedOverview,
        goToDirectory,
        goToAddStudent,
        goToEditStudent,
        goToProfile,
        selectStudent,
        setSearchQuery,
        setSelectedClass,
        setSelectedStatus,
        setSelectedSection,
        resetFilters,
        saveStudent,
        clearNotification,
      }}
    >
      {children}
    </StudentFlowContext.Provider>
  );
};

export const useStudentFlow = (): StudentFlowContextValue => {
  const context = useContext(StudentFlowContext);
  if (!context) {
    throw new Error('useStudentFlow must be used within a StudentFlowProvider');
  }
  return context;
};
