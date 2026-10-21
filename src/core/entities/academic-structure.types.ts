export type AcademicSubScreen =
  | 'ACADEMIC_OVERVIEW'
  | 'CLASS_DETAILS'
  | 'SECTIONS_SUBJECTS'
  | 'ACADEMIC_YEARS';

export interface ClassSummary {
  id: string;
  name: string;
  classTeacher: string;
  sectionsCount: number;
  studentsCount: number;
  capacity: number;
  status: 'Active' | 'Draft' | 'Archived';
  academicYear: string;
  level: string; // e.g. 'Middle school', 'High school'
}

export interface ClassSection {
  id: string;
  classId: string;
  className: string;
  sectionName: string; // e.g. 'A', 'B', '8A'
  classTeacher: string;
  studentsCount: number;
  capacity: number;
}

export interface Subject {
  id: string;
  name: string;
  code: string; // e.g. 'MTH-08'
  department: string;
  teacherName: string;
  periodsPerWeek?: number;
}

export interface TeacherAssignment {
  id: string;
  teacherName: string;
  subject: string;
  assignedClasses: string; // e.g. '8A, 9A, 10B'
  weeklyPeriods: number;
  status: 'Assigned' | 'Needs assignment';
}

export interface AcademicYear {
  id: string;
  year: string; // e.g. '2026–27'
  startDate: string;
  endDate: string;
  classesCount: number | string;
  enrollment: 'Open' | 'Closed' | 'Not open';
  status: 'Active' | 'Archived' | 'Draft';
}

export interface EnrolledStudent {
  id: string;
  name: string;
  studentId: string; // e.g. 'STU-2026-001'
  section: string;
  enrollmentDate: string;
  status: 'Active' | 'Pending';
}

export interface AcademicStructureStats {
  academicYearsCount: number;
  activeAcademicYearsCount: number;
  classesCount: number;
  classesGradeSpan: string;
  sectionsCount: number;
  sectionsAwaitingReview: number;
  subjectsCount: number;
  departmentsCount: number;
}

export interface AcademicStructureFormData {
  academicYear: string;
  className: string;
  sectionName: string;
  studentCapacity: number;
  classTeacher: string;
  subject: string;
  subjectCode: string;
  department: string;
}
