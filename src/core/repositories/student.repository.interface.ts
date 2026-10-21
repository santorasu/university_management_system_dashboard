import type {
  Student,
  StudentStats,
  StudentFilterOptions,
} from '../entities/student.types';

export interface IStudentRepository {
  getStudents(filters?: Partial<StudentFilterOptions>): Promise<Student[]>;
  getStudentById(id: string): Promise<Student | null>;
  getStudentStats(): Promise<StudentStats>;
  createStudent(student: Omit<Student, 'id'>): Promise<Student>;
  updateStudent(id: string, updates: Partial<Student>): Promise<Student>;
  deleteStudent(id: string): Promise<boolean>;
}
