export type TeacherStatus = 'Active' | 'On leave' | 'Inactive';
export type TeacherAvailability = 'Available' | 'On leave' | 'Limited' | 'Unavailable';
export type EmploymentType = 'Full-time' | 'Part-time' | 'Contract';
export type FeedbackStatus = 'Published' | 'New' | 'Needs review';

export interface AssignedClass {
  gradeAndSection: string; // e.g. 'Grade 8 · A' or '8A'
  periodsPerWeek: number; // e.g. 4
}

export interface Teacher {
  id: string;
  teacherId: string; // e.g. 'TCH-2026-014' or 'TCH-014'
  fullName: string;
  avatarColor: string;
  initials: string;
  department: string; // e.g. 'Mathematics & Science'
  subjects: string[]; // e.g. ['Mathematics', 'Physics', 'Algebra']
  assignedClasses: AssignedClass[]; // e.g. [{ gradeAndSection: 'Grade 8 · A', periodsPerWeek: 4 }]
  classesSummary: string; // e.g. '8A, 9A, 10B'
  employmentType: EmploymentType;
  status: TeacherStatus;
  availability: TeacherAvailability;
  availableHours: string; // e.g. 'Mon–Thu · 08:00–15:00'
  weeklyTeachingLoad: string; // e.g. '18 periods / week'
  
  // Contact & Personal
  email: string;
  phone: string;
  address?: string;
  emergencyContact?: string;
  preferredContact?: string;
  joiningDate: string; // e.g. '12 Aug 2021'
  qualification: string; // e.g. 'M.Sc. Mathematics'
  experienceYears?: number; // e.g. 6

  // Rating & Feedback
  rating: number; // e.g. 4.8
  reviewCount: number; // e.g. 126
}

export interface TeacherStats {
  totalTeachers: number; // 86
  totalTeachersChange: string; // '+4 this academic year'
  activeTeachers: number; // 79
  activeTeachersPct: string; // '91.9% of faculty'
  onLeaveTeachers: number; // 4
  onLeaveLabel: string; // 'Current leave records'
  subjectsCovered: number; // 24
  subjectsCoveredLabel: string; // 'Across 12 grades'
}

export interface TeacherFeedback {
  id: string;
  studentName: string;
  teacherName: string;
  teacherId: string;
  rating: number; // 1 to 5
  feedbackText: string;
  date: string; // e.g. '18 Oct 2026'
  status: FeedbackStatus;
}

export interface TeacherFeedbackStats {
  totalFeedback: number; // 248
  totalFeedbackLabel: string; // 'All student submissions'
  averageRating: string; // '4.6 / 5'
  averageRatingLabel: string; // 'Across all teachers'
  newThisMonth: number; // 36
  newThisMonthLabel: string; // 'Recent submissions'
  needsReview: number; // 12
  needsReviewLabel: string; // 'Awaiting moderation'
}

export interface TeacherFilterOptions {
  searchQuery: string;
  department: string;
  status: string;
  availability: string;
}

export interface FeedbackFilterOptions {
  searchQuery: string;
  selectedTeacher: string;
  selectedRating: string;
  selectedStatus: string;
}

export type TeacherSubScreen =
  | 'TEACHERS_CONSOLIDATED'
  | 'TEACHERS_DIRECTORY'
  | 'TEACHERS_ADD_EDIT'
  | 'TEACHERS_PROFILE'
  | 'TEACHERS_FEEDBACK';
