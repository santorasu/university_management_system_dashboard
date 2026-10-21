import type {
  AcademicStructureStats,
  ClassSummary,
  ClassSection,
  Subject,
  TeacherAssignment,
  AcademicYear,
  EnrolledStudent,
  AcademicStructureFormData,
} from '../entities/academic-structure.types';

export interface IAcademicStructureRepository {
  getStats(): Promise<AcademicStructureStats>;
  getClasses(): Promise<ClassSummary[]>;
  getClassById(id: string): Promise<ClassSummary | null>;
  getSectionsByClass(classId: string): Promise<ClassSection[]>;
  getAllSections(): Promise<ClassSection[]>;
  getSubjects(): Promise<Subject[]>;
  getAssignments(): Promise<TeacherAssignment[]>;
  getAcademicYears(): Promise<AcademicYear[]>;
  getEnrolledStudents(classId: string): Promise<EnrolledStudent[]>;
  saveAcademicStructure(data: Partial<AcademicStructureFormData>): Promise<void>;
  archiveAcademicYear(yearId: string): Promise<void>;
}
