import type { ITeacherRepository } from '../../core/repositories/teacher.repository.interface';
import type {
  Teacher,
  TeacherStats,
  TeacherFilterOptions,
  TeacherFeedback,
  TeacherFeedbackStats,
  FeedbackFilterOptions,
} from '../../core/entities/teacher.types';

export class MockTeacherRepository implements ITeacherRepository {
  private teachers: Teacher[] = [
    {
      id: 'tch-1',
      teacherId: 'TCH-2026-014',
      fullName: 'Sarah Johnson',
      avatarColor: '#EEF2FF',
      initials: 'SJ',
      department: 'Mathematics & Science',
      subjects: ['Mathematics', 'Physics', 'Algebra'],
      assignedClasses: [
        { gradeAndSection: 'Grade 8 · A', periodsPerWeek: 4 },
        { gradeAndSection: 'Grade 9 · A', periodsPerWeek: 6 },
        { gradeAndSection: 'Grade 10 · B', periodsPerWeek: 5 },
      ],
      classesSummary: '8A, 9A, 10B',
      employmentType: 'Full-time',
      status: 'Active',
      availability: 'Available',
      availableHours: 'Mon–Thu · 08:00–15:00',
      weeklyTeachingLoad: '18 periods / week',
      email: 'sarah.johnson@edusync.edu',
      phone: '+1 (555) 014-2026',
      address: '24 Lakeview Road',
      emergencyContact: 'James Johnson',
      preferredContact: 'Email',
      joiningDate: '12 Aug 2021',
      qualification: 'M.Sc. Mathematics',
      experienceYears: 6,
      rating: 4.8,
      reviewCount: 126,
    },
    {
      id: 'tch-2',
      teacherId: 'TCH-2026-021',
      fullName: 'Daniel Kim',
      avatarColor: '#ECFDF5',
      initials: 'DK',
      department: 'Languages',
      subjects: ['English Language'],
      assignedClasses: [
        { gradeAndSection: 'Grade 6 · A', periodsPerWeek: 5 },
        { gradeAndSection: 'Grade 7 · B', periodsPerWeek: 5 },
        { gradeAndSection: 'Grade 8 · B', periodsPerWeek: 6 },
      ],
      classesSummary: '6A, 7B, 8B',
      employmentType: 'Full-time',
      status: 'Active',
      availability: 'Available',
      availableHours: 'Mon–Fri · 08:00–14:00',
      weeklyTeachingLoad: '16 periods / week',
      email: 'daniel.kim@edusync.edu',
      phone: '+1 (555) 014-2027',
      joiningDate: '15 Jan 2022',
      qualification: 'M.A. English Literature',
      experienceYears: 5,
      rating: 4.7,
      reviewCount: 98,
    },
    {
      id: 'tch-3',
      teacherId: 'TCH-2026-008',
      fullName: 'Ayesha Rahman',
      avatarColor: '#FFFBEB',
      initials: 'AR',
      department: 'Mathematics & Science',
      subjects: ['Biology', 'Science'],
      assignedClasses: [
        { gradeAndSection: 'Grade 9 · A', periodsPerWeek: 7 },
        { gradeAndSection: 'Grade 10 · A', periodsPerWeek: 7 },
      ],
      classesSummary: '9A, 10A',
      employmentType: 'Full-time',
      status: 'On leave',
      availability: 'On leave',
      availableHours: 'Medical leave on record',
      weeklyTeachingLoad: '14 periods / week',
      email: 'ayesha.rahman@edusync.edu',
      phone: '+1 (555) 014-2028',
      joiningDate: '01 Sep 2020',
      qualification: 'M.Sc. Biology',
      experienceYears: 8,
      rating: 4.9,
      reviewCount: 112,
    },
    {
      id: 'tch-4',
      teacherId: 'TCH-2026-032',
      fullName: 'Michael Chen',
      avatarColor: '#EEF2FF',
      initials: 'MC',
      department: 'Technology',
      subjects: ['Computer Science'],
      assignedClasses: [
        { gradeAndSection: 'Grade 8 · B', periodsPerWeek: 4 },
        { gradeAndSection: 'Grade 9 · B', periodsPerWeek: 4 },
        { gradeAndSection: 'Grade 10 · A', periodsPerWeek: 4 },
      ],
      classesSummary: '8B, 9B, 10A',
      employmentType: 'Part-time',
      status: 'Active',
      availability: 'Available',
      availableHours: 'Tue–Fri · 09:00–15:00',
      weeklyTeachingLoad: '12 periods / week',
      email: 'michael.chen@edusync.edu',
      phone: '+1 (555) 014-2029',
      joiningDate: '10 Feb 2023',
      qualification: 'B.S. Computer Engineering',
      experienceYears: 4,
      rating: 4.5,
      reviewCount: 64,
    },
    {
      id: 'tch-5',
      teacherId: 'TCH-2026-019',
      fullName: 'Priya Patel',
      avatarColor: '#ECFDF5',
      initials: 'PP',
      department: 'Languages',
      subjects: ['Bangla', 'Literature'],
      assignedClasses: [
        { gradeAndSection: 'Grade 6 · A', periodsPerWeek: 5 },
        { gradeAndSection: 'Grade 7 · A', periodsPerWeek: 5 },
        { gradeAndSection: 'Grade 8 · A', periodsPerWeek: 5 },
      ],
      classesSummary: '6A, 7A, 8A',
      employmentType: 'Full-time',
      status: 'Active',
      availability: 'Limited',
      availableHours: 'Mon–Wed · 08:00–13:00',
      weeklyTeachingLoad: '15 periods / week',
      email: 'priya.patel@edusync.edu',
      phone: '+1 (555) 014-2030',
      joiningDate: '05 Aug 2022',
      qualification: 'M.A. Bengali & Linguistics',
      experienceYears: 7,
      rating: 4.6,
      reviewCount: 82,
    },
    {
      id: 'tch-6',
      teacherId: 'TCH-2026-041',
      fullName: 'Omar Hassan',
      avatarColor: '#FEF3C7',
      initials: 'OH',
      department: 'Mathematics & Science',
      subjects: ['Chemistry'],
      assignedClasses: [
        { gradeAndSection: 'Grade 9 · B', periodsPerWeek: 5 },
        { gradeAndSection: 'Grade 10 · B', periodsPerWeek: 5 },
      ],
      classesSummary: '9B, 10B',
      employmentType: 'Contract',
      status: 'Inactive',
      availability: 'Unavailable',
      availableHours: 'Contract renewal pending',
      weeklyTeachingLoad: '10 periods / week',
      email: 'omar.hassan@edusync.edu',
      phone: '+1 (555) 014-2031',
      joiningDate: '15 Nov 2024',
      qualification: 'M.Sc. Chemistry',
      experienceYears: 3,
      rating: 4.2,
      reviewCount: 45,
    },
    {
      id: 'tch-7',
      teacherId: 'TCH-2026-027',
      fullName: 'Emily Davis',
      avatarColor: '#F3E8FF',
      initials: 'ED',
      department: 'Humanities',
      subjects: ['History', 'Social Studies'],
      assignedClasses: [
        { gradeAndSection: 'Grade 7 · A', periodsPerWeek: 5 },
        { gradeAndSection: 'Grade 8 · B', periodsPerWeek: 5 },
      ],
      classesSummary: '7A, 8B',
      employmentType: 'Full-time',
      status: 'Active',
      availability: 'Available',
      availableHours: 'Mon–Fri · 08:00–15:00',
      weeklyTeachingLoad: '16 periods / week',
      email: 'emily.davis@edusync.edu',
      phone: '+1 (555) 014-2032',
      joiningDate: '20 Jul 2021',
      qualification: 'B.Ed. & M.A. World History',
      experienceYears: 9,
      rating: 4.8,
      reviewCount: 90,
    },
  ];

  private feedbackList: TeacherFeedback[] = [
    {
      id: 'fb-1',
      studentName: 'Olivia Thompson',
      teacherName: 'Sarah Johnson',
      teacherId: 'TCH-2026-014',
      rating: 5.0,
      feedbackText: 'Explains concepts clearly and is very supportive.',
      date: '18 Oct 2026',
      status: 'Published',
    },
    {
      id: 'fb-2',
      studentName: 'James Williams',
      teacherName: 'Daniel Kim',
      teacherId: 'TCH-2026-021',
      rating: 4.0,
      feedbackText: 'Helpful lessons; more practice examples would help.',
      date: '17 Oct 2026',
      status: 'Published',
    },
    {
      id: 'fb-3',
      studentName: 'Mei Chen',
      teacherName: 'Ayesha Rahman',
      teacherId: 'TCH-2026-008',
      rating: 5.0,
      feedbackText: 'Makes difficult topics easy to understand.',
      date: '16 Oct 2026',
      status: 'New',
    },
    {
      id: 'fb-4',
      studentName: 'Priya Patel',
      teacherName: 'Michael Chen',
      teacherId: 'TCH-2026-032',
      rating: 3.0,
      feedbackText: 'Class pace felt a little fast this term.',
      date: '15 Oct 2026',
      status: 'Needs review',
    },
    {
      id: 'fb-5',
      studentName: 'Daniel Brown',
      teacherName: 'Sarah Johnson',
      teacherId: 'TCH-2026-014',
      rating: 5.0,
      feedbackText: 'Patient and gives useful feedback on assignments.',
      date: '14 Oct 2026',
      status: 'Published',
    },
    {
      id: 'fb-6',
      studentName: 'Grace Wilson',
      teacherName: 'Priya Patel',
      teacherId: 'TCH-2026-019',
      rating: 4.0,
      feedbackText: 'Good explanations and clear study materials.',
      date: '13 Oct 2026',
      status: 'New',
    },
    {
      id: 'fb-7',
      studentName: 'Elena Garcia',
      teacherName: 'Daniel Kim',
      teacherId: 'TCH-2026-021',
      rating: 5.0,
      feedbackText: 'Very engaging lessons.',
      date: '12 Oct 2026',
      status: 'Published',
    },
  ];

  async getTeachers(filters?: Partial<TeacherFilterOptions>): Promise<Teacher[]> {
    await new Promise((resolve) => setTimeout(resolve, 60));
    let results = [...this.teachers];

    if (filters?.searchQuery) {
      const q = filters.searchQuery.toLowerCase().trim();
      results = results.filter(
        (t) =>
          t.fullName.toLowerCase().includes(q) ||
          t.teacherId.toLowerCase().includes(q) ||
          t.email.toLowerCase().includes(q) ||
          t.subjects.some((s) => s.toLowerCase().includes(q))
      );
    }

    if (filters?.department && filters.department !== 'All departments') {
      results = results.filter(
        (t) => t.department.toLowerCase() === filters.department?.toLowerCase()
      );
    }

    if (filters?.status && filters.status !== 'All statuses') {
      results = results.filter(
        (t) => t.status.toLowerCase() === filters.status?.toLowerCase()
      );
    }

    if (filters?.availability && filters.availability !== 'Any status') {
      results = results.filter(
        (t) => t.availability.toLowerCase() === filters.availability?.toLowerCase()
      );
    }

    return results;
  }

  async getTeacherById(id: string): Promise<Teacher | null> {
    await new Promise((resolve) => setTimeout(resolve, 40));
    return this.teachers.find((t) => t.id === id || t.teacherId === id) || null;
  }

  async getTeacherStats(): Promise<TeacherStats> {
    return {
      totalTeachers: 86,
      totalTeachersChange: '+4 this academic year',
      activeTeachers: 79,
      activeTeachersPct: '91.9% of faculty',
      onLeaveTeachers: 4,
      onLeaveLabel: 'Current leave records',
      subjectsCovered: 24,
      subjectsCoveredLabel: 'Across 12 grades',
    };
  }

  async createTeacher(teacherData: Omit<Teacher, 'id'>): Promise<Teacher> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const newTeacher: Teacher = {
      ...teacherData,
      id: `tch-${Date.now()}`,
    };
    this.teachers.unshift(newTeacher);
    return newTeacher;
  }

  async updateTeacher(id: string, updates: Partial<Teacher>): Promise<Teacher> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const index = this.teachers.findIndex((t) => t.id === id || t.teacherId === id);
    if (index === -1) throw new Error(`Teacher with id ${id} not found`);
    this.teachers[index] = { ...this.teachers[index], ...updates };
    return this.teachers[index];
  }

  async deleteTeacher(id: string): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 80));
    const index = this.teachers.findIndex((t) => t.id === id || t.teacherId === id);
    if (index === -1) return false;
    this.teachers.splice(index, 1);
    return true;
  }

  async getFeedback(filters?: Partial<FeedbackFilterOptions>): Promise<TeacherFeedback[]> {
    await new Promise((resolve) => setTimeout(resolve, 60));
    let results = [...this.feedbackList];

    if (filters?.searchQuery) {
      const q = filters.searchQuery.toLowerCase().trim();
      results = results.filter(
        (fb) =>
          fb.studentName.toLowerCase().includes(q) ||
          fb.teacherName.toLowerCase().includes(q) ||
          fb.feedbackText.toLowerCase().includes(q)
      );
    }

    if (filters?.selectedTeacher && filters.selectedTeacher !== 'All teachers') {
      results = results.filter((fb) => fb.teacherName === filters.selectedTeacher);
    }

    if (filters?.selectedRating && filters.selectedRating !== 'All ratings') {
      const star = parseFloat(filters.selectedRating);
      results = results.filter((fb) => fb.rating >= star);
    }

    if (filters?.selectedStatus && filters.selectedStatus !== 'All statuses') {
      results = results.filter((fb) => fb.status === filters.selectedStatus);
    }

    return results;
  }

  async getFeedbackStats(): Promise<TeacherFeedbackStats> {
    return {
      totalFeedback: 248,
      totalFeedbackLabel: 'All student submissions',
      averageRating: '4.6 / 5',
      averageRatingLabel: 'Across all teachers',
      newThisMonth: 36,
      newThisMonthLabel: 'Recent submissions',
      needsReview: 12,
      needsReviewLabel: 'Awaiting moderation',
    };
  }
}
