import React, { createContext, useContext, useState, useEffect } from 'react';
import type {
  AcademicSubScreen,
  ClassSummary,
  ClassSection,
  Subject,
  TeacherAssignment,
  AcademicYear,
  EnrolledStudent,
  AcademicStructureStats,
  AcademicStructureFormData,
} from '../../core/entities/academic-structure.types';
import { mockAcademicStructureRepository } from '../../infrastructure/repositories/mock-academic-structure.repository';

interface AcademicStructureContextType {
  subScreen: AcademicSubScreen;
  selectedClassId: string;
  selectedClass: ClassSummary | null;
  classes: ClassSummary[];
  sections: ClassSection[];
  subjects: Subject[];
  assignments: TeacherAssignment[];
  academicYears: AcademicYear[];
  enrolledStudents: EnrolledStudent[];
  stats: AcademicStructureStats | null;
  isLoading: boolean;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedYearFilter: string;
  setSelectedYearFilter: (yr: string) => void;
  selectedStatusFilter: string;
  setSelectedStatusFilter: (st: string) => void;
  
  // Navigation
  goToOverview: () => void;
  goToClassDetails: (classId: string) => void;
  goToSectionsSubjects: () => void;
  goToAcademicYears: () => void;
  
  // Modals & Feedback
  isAddClassModalOpen: boolean;
  openAddClassModal: () => void;
  closeAddClassModal: () => void;
  isArchiveModalOpen: boolean;
  yearToArchive: AcademicYear | null;
  openArchiveModal: (year: AcademicYear) => void;
  closeArchiveModal: () => void;
  confirmArchiveYear: () => Promise<void>;
  isEnrollModalOpen: boolean;
  openEnrollModal: () => void;
  closeEnrollModal: () => void;
  toastNotification: { type: 'success' | 'error'; message: string } | null;
  showToast: (type: 'success' | 'error', message: string) => void;
  clearToast: () => void;
  saveStructure: (data: Partial<AcademicStructureFormData>) => Promise<boolean>;
}

const AcademicStructureContext = createContext<AcademicStructureContextType | undefined>(undefined);

export const AcademicStructureFlowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [subScreen, setSubScreen] = useState<AcademicSubScreen>('ACADEMIC_OVERVIEW');
  const [selectedClassId, setSelectedClassId] = useState<string>('class-8');
  const [classes, setClasses] = useState<ClassSummary[]>([]);
  const [sections, setSections] = useState<ClassSection[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [assignments, setAssignments] = useState<TeacherAssignment[]>([]);
  const [academicYears, setAcademicYears] = useState<AcademicYear[]>([]);
  const [enrolledStudents, setEnrolledStudents] = useState<EnrolledStudent[]>([]);
  const [stats, setStats] = useState<AcademicStructureStats | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Filters
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedYearFilter, setSelectedYearFilter] = useState<string>('2026–27');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('All statuses');

  // Modals
  const [isAddClassModalOpen, setIsAddClassModalOpen] = useState<boolean>(false);
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState<boolean>(false);
  const [yearToArchive, setYearToArchive] = useState<AcademicYear | null>(null);
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState<boolean>(false);
  const [toastNotification, setToastNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [s, cls, sec, sub, asg, yrs, stu] = await Promise.all([
        mockAcademicStructureRepository.getStats(),
        mockAcademicStructureRepository.getClasses(),
        mockAcademicStructureRepository.getAllSections(),
        mockAcademicStructureRepository.getSubjects(),
        mockAcademicStructureRepository.getAssignments(),
        mockAcademicStructureRepository.getAcademicYears(),
        mockAcademicStructureRepository.getEnrolledStudents(selectedClassId),
      ]);
      setStats(s);
      setClasses(cls);
      setSections(sec);
      setSubjects(sub);
      setAssignments(asg);
      setAcademicYears(yrs);
      setEnrolledStudents(stu);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [selectedClassId]);

  const selectedClass = classes.find((c) => c.id === selectedClassId) || classes[2] || null;

  const goToOverview = () => {
    setSubScreen('ACADEMIC_OVERVIEW');
  };

  const goToClassDetails = (classId: string) => {
    setSelectedClassId(classId);
    setSubScreen('CLASS_DETAILS');
  };

  const goToSectionsSubjects = () => {
    setSubScreen('SECTIONS_SUBJECTS');
  };

  const goToAcademicYears = () => {
    setSubScreen('ACADEMIC_YEARS');
  };

  const openAddClassModal = () => setIsAddClassModalOpen(true);
  const closeAddClassModal = () => setIsAddClassModalOpen(false);

  const openArchiveModal = (year: AcademicYear) => {
    setYearToArchive(year);
    setIsArchiveModalOpen(true);
  };
  const closeArchiveModal = () => {
    setIsArchiveModalOpen(false);
    setYearToArchive(null);
  };

  const openEnrollModal = () => setIsEnrollModalOpen(true);
  const closeEnrollModal = () => setIsEnrollModalOpen(false);

  const showToast = (type: 'success' | 'error', message: string) => {
    setToastNotification({ type, message });
    setTimeout(() => {
      setToastNotification(null);
    }, 4000);
  };

  const clearToast = () => setToastNotification(null);

  const confirmArchiveYear = async () => {
    if (!yearToArchive) return;
    try {
      await mockAcademicStructureRepository.archiveAcademicYear(yearToArchive.id);
      showToast('success', `Academic year ${yearToArchive.year} archived successfully`);
      const updatedYears = await mockAcademicStructureRepository.getAcademicYears();
      setAcademicYears(updatedYears);
    } catch {
      showToast('error', 'Unable to archive academic year. Try again.');
    } finally {
      closeArchiveModal();
    }
  };

  const saveStructure = async (data: Partial<AcademicStructureFormData>): Promise<boolean> => {
    try {
      if (!data.className || !data.sectionName) {
        showToast('error', 'Unable to save changes. Try again.');
        return false;
      }
      await mockAcademicStructureRepository.saveAcademicStructure(data);
      showToast('success', 'Academic structure saved successfully');
      const updatedSections = await mockAcademicStructureRepository.getAllSections();
      setSections(updatedSections);
      closeAddClassModal();
      return true;
    } catch {
      showToast('error', 'Unable to save changes. Try again.');
      return false;
    }
  };

  return (
    <AcademicStructureContext.Provider
      value={{
        subScreen,
        selectedClassId,
        selectedClass,
        classes,
        sections,
        subjects,
        assignments,
        academicYears,
        enrolledStudents,
        stats,
        isLoading,
        searchQuery,
        setSearchQuery,
        selectedYearFilter,
        setSelectedYearFilter,
        selectedStatusFilter,
        setSelectedStatusFilter,
        goToOverview,
        goToClassDetails,
        goToSectionsSubjects,
        goToAcademicYears,
        isAddClassModalOpen,
        openAddClassModal,
        closeAddClassModal,
        isArchiveModalOpen,
        yearToArchive,
        openArchiveModal,
        closeArchiveModal,
        confirmArchiveYear,
        isEnrollModalOpen,
        openEnrollModal,
        closeEnrollModal,
        toastNotification,
        showToast,
        clearToast,
        saveStructure,
      }}
    >
      {children}
    </AcademicStructureContext.Provider>
  );
};

export const useAcademicStructureFlow = (): AcademicStructureContextType => {
  const context = useContext(AcademicStructureContext);
  if (!context) {
    throw new Error('useAcademicStructureFlow must be used within an AcademicStructureFlowProvider');
  }
  return context;
};
