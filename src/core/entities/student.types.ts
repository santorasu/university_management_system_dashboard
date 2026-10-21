export type StudentStatus = 'Active' | 'Inactive';
export type FeePaymentStatus = 'Paid' | 'Pending' | 'Overdue' | 'Partially paid';

export interface Student {
  id: string;
  studentId: string; // e.g. 'STU-2026-001' or 'STU-001'
  fullName: string;
  avatarColor: string;
  initials: string;
  grade: string; // e.g. 'Grade 8'
  section: string; // e.g. 'A'
  rollNumber: string; // e.g. '01'
  attendanceRate: number; // e.g. 96.4
  status: StudentStatus;
  
  // Profile Information
  dateOfBirth: string; // e.g. '14 Mar 2012'
  gender: 'Female' | 'Male' | 'Other';
  enrollmentDate: string; // e.g. '03 Sep 2023'
  academicYear: string; // e.g. '2026–27'
  email: string;
  phone?: string;
  emergencyContact?: string;

  // Guardian Information
  guardianName: string; // e.g. 'Olivia Thompson'
  guardianRelationship: string; // e.g. 'Mother' or 'Parent / Guardian'
  guardianPhone: string; // e.g. '+1 (555) 014-2016'
  guardianEmail?: string;

  // Academic Summary
  averageResult: number; // e.g. 88.6
  assignmentsCompleted: number; // e.g. 12
  assignmentsTotal: number; // e.g. 14

  // Fee & Payment Details
  feeStatus: FeePaymentStatus;
  outstandingBalance: number; // e.g. 120.00
  recentFeeActivity?: string; // e.g. 'Term 1 tuition · $480.00 · Paid 02 Oct 2026'
  recentAcademicActivity?: string; // e.g. 'Assignment: Algebra worksheet submitted'
}

export interface StudentStats {
  totalStudents: number; // 1,248
  totalStudentsChange: string; // '+8.2%'
  activeStudents: number; // 1,196
  activeEnrollmentPct: string; // '95.8% enrolled'
  inactiveStudents: number; // 32
  inactiveLabel: string; // 'Needs review'
  newThisMonth: number; // 24
  newThisMonthLabel: string; // '6 classes' or 'Across 6 classes'
}

export interface StudentFilterOptions {
  searchQuery: string;
  selectedClass: string;
  selectedStatus: string;
  selectedSection: string;
}

export type StudentSubScreen =
  | 'STUDENTS_CONSOLIDATED'
  | 'STUDENTS_DIRECTORY'
  | 'STUDENTS_ADD_EDIT'
  | 'STUDENTS_PROFILE';
