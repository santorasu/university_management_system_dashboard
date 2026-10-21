export type AssignmentStatus = 'Published' | 'Draft' | 'Late' | 'Closed';

export type SubmissionStatus = 'Submitted' | 'Late' | 'Graded' | 'Pending';

export type SubmissionType = 'File upload' | 'Online text' | 'Physical paper';

export type LatePolicy = 'Allow with late label' | 'Reject late submissions' | 'Penalty per day';

export type MaterialType = 'PDF' | 'Link' | 'DOCX' | 'PPTX' | 'Video';

export interface AssignmentAttachment {
  id: string;
  name: string;
  size: string;
  type: string;
  url?: string;
}

export interface Assignment {
  id: string;
  title: string;
  academicYear: string;
  classId: string;
  className: string; // e.g. "Class 8-A"
  section: string;   // e.g. "Section A"
  subject: string;   // e.g. "Mathematics"
  teacherName: string;
  dueDate: string;   // e.g. "22 Oct 2026"
  dueTime: string;   // e.g. "11:59 PM"
  publishDate: string; // e.g. "15 Oct 2026"
  status: AssignmentStatus;
  totalStudents: number;
  submittedCount: number;
  instructions: string;
  maxMarks: number;
  submissionType: SubmissionType;
  latePolicy: LatePolicy;
  attachments: AssignmentAttachment[];
  visibleToClass: boolean;
  notifyStudents: boolean;
  allowResubmission: boolean;
}

export interface StudentSubmission {
  id: string;
  assignmentId: string;
  assignmentTitle: string;
  studentId: string;
  studentName: string;
  rollNo?: string;
  submittedAt: string; // e.g. "21 Oct · 10:14 AM" or "Not submitted"
  fileName: string;    // e.g. "algebra_worksheet.pdf" or "—"
  fileSize?: string;
  status: SubmissionStatus;
  marks?: number | null; // e.g. 18 / 20
  feedback?: string;
}

export interface ClassMaterial {
  id: string;
  title: string;
  type: MaterialType;
  updatedAt: string; // e.g. "14 Oct"
  size?: string;
  className: string;
  subject: string;
  url?: string;
}

export interface AssignmentKpiStats {
  totalAssignments: number;
  publishedCount: number;
  pendingSubmissions: number;
  needsGrading: number;
  submissionStatus: {
    submitted: number;
    pending: number;
    late: number;
    graded: number;
  };
  gradingOverview: {
    awaitingReview: number;
    graded: number;
    returnedForRevision: number;
    averageScore: string;
  };
}

export interface AssignmentListFilter {
  searchQuery: string;
  className: string;
  subject: string;
  status: string;
  dueDate: string;
}

export interface SubmissionFilter {
  assignmentId: string;
  className: string;
  status: string;
  studentSearch: string;
}

export type AssignmentsScreenId =
  | 'OVERVIEW'
  | 'LIST_DETAILS'
  | 'CREATE_EDIT'
  | 'SUBMISSIONS_MATERIALS';

export type SubmissionsInnerTab = 'SUBMISSIONS' | 'GRADING' | 'MATERIALS';
