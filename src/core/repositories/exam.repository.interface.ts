import type {
  Exam,
  ExamKpiStats,
  ExamHistoryItem,
  TeacherMarksSubmission,
  StudentExamMark,
  GradingBand,
  CalculatedStudentResult,
} from '../entities/exam.types';

export interface IExamRepository {
  getKpiStats(): Promise<ExamKpiStats>;
  getUpcomingExams(): Promise<Exam[]>;
  getRecentExamHistory(): Promise<ExamHistoryItem[]>;
  getAllExams(): Promise<Exam[]>;
  getExamById(id: string): Promise<Exam | null>;
  createExam(examData: Partial<Exam>): Promise<Exam>;
  updateExam(id: string, examData: Partial<Exam>): Promise<Exam>;
  getTeacherMarksSubmissions(filter?: {
    examId?: string;
    className?: string;
    subject?: string;
    status?: string;
  }): Promise<TeacherMarksSubmission[]>;
  getStudentExamMarks(submissionId: string): Promise<StudentExamMark[]>;
  updateStudentMark(markId: string, marks: number): Promise<StudentExamMark>;
  getGradingBands(): Promise<GradingBand[]>;
  updateGradingBands(bands: GradingBand[]): Promise<GradingBand[]>;
  getCalculatedResults(filter?: {
    examId?: string;
    className?: string;
    status?: string;
    search?: string;
  }): Promise<CalculatedStudentResult[]>;
  publishResults(examId: string, className: string): Promise<void>;
  approveTeacherMarks(submissionId: string): Promise<void>;
}
