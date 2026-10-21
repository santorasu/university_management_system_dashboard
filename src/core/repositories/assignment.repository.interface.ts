import type {
  Assignment,
  AssignmentKpiStats,
  AssignmentListFilter,
  ClassMaterial,
  StudentSubmission,
  SubmissionFilter,
} from '../entities/assignment.types';

export interface IAssignmentRepository {
  getKpiStats(): Promise<AssignmentKpiStats>;
  getRecentAssignments(): Promise<Assignment[]>;
  getAssignments(filter?: Partial<AssignmentListFilter>): Promise<Assignment[]>;
  getAssignmentById(id: string): Promise<Assignment | null>;
  createAssignment(assignment: Omit<Assignment, 'id' | 'submittedCount'>): Promise<Assignment>;
  updateAssignment(id: string, updates: Partial<Assignment>): Promise<Assignment>;
  getSubmissions(filter?: Partial<SubmissionFilter>): Promise<StudentSubmission[]>;
  updateSubmissionGrade(submissionId: string, marks: number, feedback?: string): Promise<StudentSubmission>;
  sendStudentReminder(submissionId: string): Promise<boolean>;
  getClassMaterials(className?: string): Promise<ClassMaterial[]>;
  addClassMaterial(material: Omit<ClassMaterial, 'id' | 'updatedAt'>): Promise<ClassMaterial>;
}
