export type ExamStatus =
  | 'Scheduled'
  | 'In Progress'
  | 'Under Review'
  | 'Completed'
  | 'Published'
  | 'Draft';

export type ExamType =
  | 'Mid-Term'
  | 'Final Exam'
  | 'Class Test'
  | 'Diagnostic Quiz'
  | 'Annual Examination';

export type AcademicTerm = 'Term 1' | 'Term 2' | 'Term 3';

export interface SubjectScheduleItem {
  id: string;
  subject: string;
  date: string;       // e.g. "24 Oct" or "24 Oct 2026"
  time: string;       // e.g. "09:00" or "09:00 – 11:00"
  duration: string;   // e.g. "2 hrs"
  room: string;       // e.g. "Room 204"
  invigilator?: string; // e.g. "Nusrat Jahan"
  maxMarks?: number;  // e.g. 100
}

export interface Exam {
  id: string;
  name: string;
  type: ExamType;
  academicYear: string;
  term: AcademicTerm;
  startDate: string;
  endDate: string;
  classes: string[];
  subjects: string[];
  instructions: string;
  status: ExamStatus;
  schedule: SubjectScheduleItem[];
  totalClasses: number;
}

export interface TeacherMarksSubmission {
  id: string;
  examId: string;
  examName: string;
  classId: string;
  className: string;
  subject: string;
  teacherName: string;
  submittedAt: string; // e.g. "22 Oct · 10:40" or "Pending"
  submittedCount: number;
  totalStudents: number;
  validation: 'Valid' | '2 missing' | 'Out of range' | 'Not submitted';
  status: 'Submitted' | 'Under Review' | 'Pending' | 'Approved';
}

export interface StudentExamMark {
  id: string;
  submissionId: string;
  studentId: string;
  studentName: string;
  rollNo: string;
  marks: number | null; // e.g. 86, 104, null
  maxMarks: number;     // e.g. 100
  validation: 'Valid' | 'Out of range' | 'Missing';
}

export interface GradingBand {
  grade: string;        // e.g. "A+", "A", "B", "C", "D", "F"
  range: string;        // e.g. "80–100"
  minMarks: number;
  maxMarks: number;
  gradePoint: string;   // e.g. "5.00"
  description: string;  // e.g. "Outstanding"
}

export interface SubjectMarkSummary {
  subject: string;
  obtainedMarks: number;
  maxMarks: number;
  grade: string;
  gradePoint: string;
}

export interface CalculatedStudentResult {
  id: string;
  examId: string;
  examName: string;
  studentId: string;
  studentName: string;
  rollNo: string;
  className: string;
  term: string;
  totalMarks: number | null; // e.g. 432
  maxTotalMarks: number;     // e.g. 500
  grade: string;             // e.g. "A+"
  gpa: string;               // e.g. "4.85"
  classRank: number | null;  // e.g. 1
  validation: 'Valid' | 'Marks missing';
  resultStatus: 'Under Review' | 'Published' | 'Blocked';
  remarks?: string;
  subjectBreakdown: SubjectMarkSummary[];
}

export interface ExamHistoryItem {
  id: string;
  examTitle: string;
  term: string;
  classes: number;
  completedDate: string;
  resultStatus: 'Published' | 'Completed' | 'Under Review';
  publishedOn?: string;
  reportCardsCount?: string;
}

export interface ExamKpiStats {
  totalExams: number;
  scheduled: number;
  marksUnderReview: number;
  publishedResults: number;
  resultProgress: {
    confirmedSchedules: number;
    totalSchedules: number;
    marksSubmitted: number;
    totalSubmittedExpected: number;
    marksReviewed: number;
    totalReviewedExpected: number;
    resultsPublished: number;
    totalPublishedExpected: number;
  };
  classPerformance: {
    classAverage: number;
    passRate: number;
    marksVerified: number;
  };
}

export type ExamsScreenId =
  | 'OVERVIEW'
  | 'CREATE_SCHEDULE'
  | 'MARKS_REVIEW'
  | 'RESULTS_REPORTS';

export type ResultsInnerTab =
  | 'RESULTS_REVIEW'
  | 'REPORT_CARDS'
  | 'RESULT_HISTORY';
