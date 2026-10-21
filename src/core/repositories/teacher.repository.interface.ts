import type {
  Teacher,
  TeacherStats,
  TeacherFilterOptions,
  TeacherFeedback,
  TeacherFeedbackStats,
  FeedbackFilterOptions,
} from '../entities/teacher.types';

export interface ITeacherRepository {
  getTeachers(filters?: Partial<TeacherFilterOptions>): Promise<Teacher[]>;
  getTeacherById(id: string): Promise<Teacher | null>;
  getTeacherStats(): Promise<TeacherStats>;
  createTeacher(teacher: Omit<Teacher, 'id'>): Promise<Teacher>;
  updateTeacher(id: string, updates: Partial<Teacher>): Promise<Teacher>;
  deleteTeacher(id: string): Promise<boolean>;

  // Feedback operations
  getFeedback(filters?: Partial<FeedbackFilterOptions>): Promise<TeacherFeedback[]>;
  getFeedbackStats(): Promise<TeacherFeedbackStats>;
}
