import type { IStudentRepository } from '../../core/repositories/student.repository.interface';
import type {
  Student,
  StudentStats,
  StudentFilterOptions,
} from '../../core/entities/student.types';

export class MockStudentRepository implements IStudentRepository {
  private students: Student[] = [
    {
      id: 'stu-1',
      studentId: 'STU-2026-001',
      fullName: 'Ava Thompson',
      avatarColor: '#EEF2FF',
      initials: 'AT',
      grade: 'Grade 8',
      section: 'A',
      rollNumber: '01',
      attendanceRate: 96.4,
      status: 'Active',
      dateOfBirth: '14 Mar 2012',
      gender: 'Female',
      enrollmentDate: '03 Sep 2023',
      academicYear: '2026–27',
      email: 'ava.thompson@example.edu',
      phone: '+1 (555) 014-2016',
      emergencyContact: 'Olivia Thompson',
      guardianName: 'Olivia Thompson',
      guardianRelationship: 'Mother',
      guardianPhone: '+1 (555) 014-2016',
      guardianEmail: 'olivia.thompson@example.edu',
      averageResult: 88.6,
      assignmentsCompleted: 12,
      assignmentsTotal: 14,
      feeStatus: 'Partially paid',
      outstandingBalance: 120.0,
      recentFeeActivity: 'Term 1 tuition paid · 02 Oct 2026',
      recentAcademicActivity: 'Assignment: Algebra worksheet submitted',
    },
    {
      id: 'stu-2',
      studentId: 'STU-2026-002',
      fullName: 'Noah Williams',
      avatarColor: '#ECFDF5',
      initials: 'NW',
      grade: 'Grade 7',
      section: 'B',
      rollNumber: '02',
      attendanceRate: 92.1,
      status: 'Active',
      dateOfBirth: '22 Aug 2013',
      gender: 'Male',
      enrollmentDate: '05 Sep 2023',
      academicYear: '2026–27',
      email: 'noah.williams@example.edu',
      phone: '+1 (555) 014-2017',
      emergencyContact: 'James Williams',
      guardianName: 'James Williams',
      guardianRelationship: 'Father',
      guardianPhone: '+1 (555) 014-2017',
      guardianEmail: 'james.williams@example.edu',
      averageResult: 85.0,
      assignmentsCompleted: 11,
      assignmentsTotal: 14,
      feeStatus: 'Pending',
      outstandingBalance: 240.0,
      recentFeeActivity: 'Invoice issued · 01 Oct 2026',
      recentAcademicActivity: 'Quiz: General Science graded (88%)',
    },
    {
      id: 'stu-3',
      studentId: 'STU-2026-003',
      fullName: 'Sophia Chen',
      avatarColor: '#FFFBEB',
      initials: 'SC',
      grade: 'Grade 9',
      section: 'A',
      rollNumber: '03',
      attendanceRate: 98.2,
      status: 'Active',
      dateOfBirth: '11 Nov 2011',
      gender: 'Female',
      enrollmentDate: '01 Sep 2022',
      academicYear: '2026–27',
      email: 'sophia.chen@example.edu',
      phone: '+1 (555) 014-2018',
      emergencyContact: 'Mei Chen',
      guardianName: 'Mei Chen',
      guardianRelationship: 'Mother',
      guardianPhone: '+1 (555) 014-2018',
      guardianEmail: 'mei.chen@example.edu',
      averageResult: 94.2,
      assignmentsCompleted: 14,
      assignmentsTotal: 14,
      feeStatus: 'Paid',
      outstandingBalance: 0.0,
      recentFeeActivity: 'Term 1 full tuition paid · 15 Sep 2026',
      recentAcademicActivity: 'Essay: English Literature submitted (A+)',
    },
    {
      id: 'stu-4',
      studentId: 'STU-2026-004',
      fullName: 'Liam Patel',
      avatarColor: '#EEF2FF',
      initials: 'LP',
      grade: 'Grade 6',
      section: 'C',
      rollNumber: '04',
      attendanceRate: 88.7,
      status: 'Active',
      dateOfBirth: '19 Jun 2014',
      gender: 'Male',
      enrollmentDate: '04 Sep 2024',
      academicYear: '2026–27',
      email: 'liam.patel@example.edu',
      phone: '+1 (555) 014-2019',
      emergencyContact: 'Priya Patel',
      guardianName: 'Priya Patel',
      guardianRelationship: 'Mother',
      guardianPhone: '+1 (555) 014-2019',
      guardianEmail: 'priya.patel@example.edu',
      averageResult: 81.4,
      assignmentsCompleted: 10,
      assignmentsTotal: 14,
      feeStatus: 'Overdue',
      outstandingBalance: 480.0,
      recentFeeActivity: 'Overdue fee notice sent · 10 Oct 2026',
      recentAcademicActivity: 'Homework: Math Fractions submitted',
    },
    {
      id: 'stu-5',
      studentId: 'STU-2026-005',
      fullName: 'Isabella Brown',
      avatarColor: '#ECFDF5',
      initials: 'IB',
      grade: 'Grade 8',
      section: 'B',
      rollNumber: '05',
      attendanceRate: 94.6,
      status: 'Active',
      dateOfBirth: '05 Feb 2012',
      gender: 'Female',
      enrollmentDate: '03 Sep 2023',
      academicYear: '2026–27',
      email: 'isabella.brown@example.edu',
      phone: '+1 (555) 014-2020',
      emergencyContact: 'Daniel Brown',
      guardianName: 'Daniel Brown',
      guardianRelationship: 'Father',
      guardianPhone: '+1 (555) 014-2020',
      guardianEmail: 'daniel.brown@example.edu',
      averageResult: 89.0,
      assignmentsCompleted: 13,
      assignmentsTotal: 14,
      feeStatus: 'Paid',
      outstandingBalance: 0.0,
      recentFeeActivity: 'Payment processed · 28 Sep 2026',
      recentAcademicActivity: 'Project: History timeline presented',
    },
    {
      id: 'stu-6',
      studentId: 'STU-2026-006',
      fullName: 'Ethan Wilson',
      avatarColor: '#FEF3C7',
      initials: 'EW',
      grade: 'Grade 5',
      section: 'A',
      rollNumber: '06',
      attendanceRate: 0,
      status: 'Inactive',
      dateOfBirth: '30 Apr 2015',
      gender: 'Male',
      enrollmentDate: '10 Jan 2025',
      academicYear: '2026–27',
      email: 'ethan.wilson@example.edu',
      phone: '+1 (555) 014-2021',
      emergencyContact: 'Grace Wilson',
      guardianName: 'Grace Wilson',
      guardianRelationship: 'Mother',
      guardianPhone: '+1 (555) 014-2021',
      guardianEmail: 'grace.wilson@example.edu',
      averageResult: 0,
      assignmentsCompleted: 0,
      assignmentsTotal: 14,
      feeStatus: 'Pending',
      outstandingBalance: 350.0,
      recentFeeActivity: 'Enrollment hold applied · 12 Oct 2026',
      recentAcademicActivity: 'Medical leave on record',
    },
    {
      id: 'stu-7',
      studentId: 'STU-2026-007',
      fullName: 'Mia Garcia',
      avatarColor: '#F3E8FF',
      initials: 'MG',
      grade: 'Grade 7',
      section: 'A',
      rollNumber: '07',
      attendanceRate: 97.3,
      status: 'Active',
      dateOfBirth: '18 Dec 2013',
      gender: 'Female',
      enrollmentDate: '02 Sep 2023',
      academicYear: '2026–27',
      email: 'mia.garcia@example.edu',
      phone: '+1 (555) 014-2022',
      emergencyContact: 'Elena Garcia',
      guardianName: 'Elena Garcia',
      guardianRelationship: 'Mother',
      guardianPhone: '+1 (555) 014-2022',
      guardianEmail: 'elena.garcia@example.edu',
      averageResult: 91.5,
      assignmentsCompleted: 13,
      assignmentsTotal: 14,
      feeStatus: 'Paid',
      outstandingBalance: 0.0,
      recentFeeActivity: 'Term 1 fee confirmed · 20 Sep 2026',
      recentAcademicActivity: 'Lab Report: Biology cell structure',
    },
  ];

  async getStudents(filters?: Partial<StudentFilterOptions>): Promise<Student[]> {
    await new Promise((resolve) => setTimeout(resolve, 60)); // mock network delay
    let results = [...this.students];

    if (filters?.searchQuery) {
      const q = filters.searchQuery.toLowerCase().trim();
      results = results.filter(
        (s) =>
          s.fullName.toLowerCase().includes(q) ||
          s.studentId.toLowerCase().includes(q) ||
          s.guardianName.toLowerCase().includes(q)
      );
    }

    if (filters?.selectedClass && filters.selectedClass !== 'All classes') {
      results = results.filter((s) => s.grade.toLowerCase() === filters.selectedClass?.toLowerCase());
    }

    if (filters?.selectedStatus && filters.selectedStatus !== 'All statuses') {
      results = results.filter((s) => s.status.toLowerCase() === filters.selectedStatus?.toLowerCase());
    }

    if (filters?.selectedSection && filters.selectedSection !== 'All sections') {
      results = results.filter((s) => s.section.toLowerCase() === filters.selectedSection?.toLowerCase());
    }

    return results;
  }

  async getStudentById(id: string): Promise<Student | null> {
    await new Promise((resolve) => setTimeout(resolve, 40));
    return this.students.find((s) => s.id === id || s.studentId === id) || null;
  }

  async getStudentStats(): Promise<StudentStats> {
    return {
      totalStudents: 1248,
      totalStudentsChange: '+8.2%',
      activeStudents: 1196,
      activeEnrollmentPct: '95.8% enrolled',
      inactiveStudents: 32,
      inactiveLabel: 'Needs review',
      newThisMonth: 24,
      newThisMonthLabel: 'Across 6 classes',
    };
  }

  async createStudent(studentData: Omit<Student, 'id'>): Promise<Student> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const newStudent: Student = {
      ...studentData,
      id: `stu-${Date.now()}`,
    };
    this.students.unshift(newStudent);
    return newStudent;
  }

  async updateStudent(id: string, updates: Partial<Student>): Promise<Student> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const index = this.students.findIndex((s) => s.id === id || s.studentId === id);
    if (index === -1) {
      throw new Error(`Student with id ${id} not found`);
    }
    this.students[index] = {
      ...this.students[index],
      ...updates,
    };
    return this.students[index];
  }

  async deleteStudent(id: string): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 80));
    const index = this.students.findIndex((s) => s.id === id || s.studentId === id);
    if (index === -1) return false;
    this.students.splice(index, 1);
    return true;
  }
}
