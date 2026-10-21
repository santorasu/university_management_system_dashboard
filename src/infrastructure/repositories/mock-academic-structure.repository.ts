import type { IAcademicStructureRepository } from '../../core/repositories/academic-structure.repository.interface';
import type {
  AcademicStructureStats,
  ClassSummary,
  ClassSection,
  Subject,
  TeacherAssignment,
  AcademicYear,
  EnrolledStudent,
  AcademicStructureFormData,
} from '../../core/entities/academic-structure.types';

export class MockAcademicStructureRepository implements IAcademicStructureRepository {
  private stats: AcademicStructureStats = {
    academicYearsCount: 2,
    activeAcademicYearsCount: 1,
    classesCount: 18,
    classesGradeSpan: 'Grades 1–12',
    sectionsCount: 42,
    sectionsAwaitingReview: 3,
    subjectsCount: 24,
    departmentsCount: 6,
  };

  private classes: ClassSummary[] = [
    {
      id: 'class-6',
      name: 'Grade 6',
      classTeacher: 'Daniel Kim',
      sectionsCount: 3,
      studentsCount: 96,
      capacity: 120,
      status: 'Active',
      academicYear: '2026–27',
      level: 'Middle school',
    },
    {
      id: 'class-7',
      name: 'Grade 7',
      classTeacher: 'Priya Patel',
      sectionsCount: 4,
      studentsCount: 118,
      capacity: 140,
      status: 'Active',
      academicYear: '2026–27',
      level: 'Middle school',
    },
    {
      id: 'class-8',
      name: 'Grade 8',
      classTeacher: 'Sarah Johnson',
      sectionsCount: 4,
      studentsCount: 126,
      capacity: 140,
      status: 'Active',
      academicYear: '2026–27',
      level: 'Middle school',
    },
    {
      id: 'class-9',
      name: 'Grade 9',
      classTeacher: 'Ayesha Rahman',
      sectionsCount: 3,
      studentsCount: 104,
      capacity: 120,
      status: 'Active',
      academicYear: '2026–27',
      level: 'High school',
    },
    {
      id: 'class-10',
      name: 'Grade 10',
      classTeacher: 'Michael Chen',
      sectionsCount: 3,
      studentsCount: 88,
      capacity: 100,
      status: 'Active',
      academicYear: '2026–27',
      level: 'High school',
    },
    {
      id: 'class-11',
      name: 'Grade 11',
      classTeacher: 'Omar Hassan',
      sectionsCount: 2,
      studentsCount: 64,
      capacity: 80,
      status: 'Active',
      academicYear: '2026–27',
      level: 'High school',
    },
    {
      id: 'class-12',
      name: 'Grade 12',
      classTeacher: 'Emily Davis',
      sectionsCount: 2,
      studentsCount: 52,
      capacity: 80,
      status: 'Active',
      academicYear: '2026–27',
      level: 'High school',
    },
  ];

  private sections: ClassSection[] = [
    {
      id: 'sec-8a',
      classId: 'class-8',
      className: 'Grade 8',
      sectionName: 'A',
      classTeacher: 'Sarah Johnson',
      studentsCount: 32,
      capacity: 35,
    },
    {
      id: 'sec-8b',
      classId: 'class-8',
      className: 'Grade 8',
      sectionName: 'B',
      classTeacher: 'Daniel Kim',
      studentsCount: 30,
      capacity: 35,
    },
    {
      id: 'sec-8c',
      classId: 'class-8',
      className: 'Grade 8',
      sectionName: 'C',
      classTeacher: 'Priya Patel',
      studentsCount: 34,
      capacity: 35,
    },
    {
      id: 'sec-8d',
      classId: 'class-8',
      className: 'Grade 8',
      sectionName: 'D',
      classTeacher: 'Unassigned',
      studentsCount: 30,
      capacity: 35,
    },
    {
      id: 'sec-9a',
      classId: 'class-9',
      className: 'Grade 9',
      sectionName: 'A',
      classTeacher: 'Ayesha Rahman',
      studentsCount: 35,
      capacity: 35,
    },
  ];

  private subjects: Subject[] = [
    {
      id: 'sub-mth-08',
      name: 'Mathematics',
      code: 'MTH-08',
      department: 'Science',
      teacherName: 'Sarah J.',
      periodsPerWeek: 5,
    },
    {
      id: 'sub-eng-08',
      name: 'English',
      code: 'ENG-08',
      department: 'Languages',
      teacherName: 'Daniel K.',
      periodsPerWeek: 4,
    },
    {
      id: 'sub-sci-08',
      name: 'General Science',
      code: 'SCI-08',
      department: 'Science',
      teacherName: 'Ayesha R.',
      periodsPerWeek: 4,
    },
    {
      id: 'sub-bng-08',
      name: 'Bangla',
      code: 'BNG-08',
      department: 'Languages',
      teacherName: 'Priya P.',
      periodsPerWeek: 4,
    },
    {
      id: 'sub-cse-08',
      name: 'Computer Science',
      code: 'CSE-08',
      department: 'Technology',
      teacherName: 'Michael C.',
      periodsPerWeek: 3,
    },
  ];

  private assignments: TeacherAssignment[] = [
    {
      id: 'asg-1',
      teacherName: 'Sarah Johnson',
      subject: 'Mathematics',
      assignedClasses: '8A, 9A, 10B',
      weeklyPeriods: 15,
      status: 'Assigned',
    },
    {
      id: 'asg-2',
      teacherName: 'Daniel Kim',
      subject: 'English',
      assignedClasses: '8A, 8B',
      weeklyPeriods: 12,
      status: 'Assigned',
    },
    {
      id: 'asg-3',
      teacherName: 'Ayesha Rahman',
      subject: 'Science',
      assignedClasses: '8C, 9A',
      weeklyPeriods: 10,
      status: 'Assigned',
    },
    {
      id: 'asg-4',
      teacherName: 'Priya Patel',
      subject: 'Bangla',
      assignedClasses: '8C, 8D',
      weeklyPeriods: 12,
      status: 'Assigned',
    },
    {
      id: 'asg-5',
      teacherName: 'Unassigned',
      subject: 'Computer Science',
      assignedClasses: '8D',
      weeklyPeriods: 4,
      status: 'Needs assignment',
    },
  ];

  private academicYears: AcademicYear[] = [
    {
      id: 'yr-2026-27',
      year: '2026–27',
      startDate: '01 Aug 2026',
      endDate: '31 Jul 2027',
      classesCount: 18,
      enrollment: 'Open',
      status: 'Active',
    },
    {
      id: 'yr-2025-26',
      year: '2025–26',
      startDate: '01 Aug 2025',
      endDate: '31 Jul 2026',
      classesCount: 18,
      enrollment: 'Closed',
      status: 'Archived',
    },
    {
      id: 'yr-2027-28',
      year: '2027–28',
      startDate: '01 Aug 2027',
      endDate: '31 Jul 2028',
      classesCount: '—',
      enrollment: 'Not open',
      status: 'Draft',
    },
  ];

  private students: EnrolledStudent[] = [
    {
      id: 'stu-1',
      name: 'Ava Thompson',
      studentId: 'STU-2026-001',
      section: 'A',
      enrollmentDate: '03 Sep 2023',
      status: 'Active',
    },
    {
      id: 'stu-2',
      name: 'Noah Williams',
      studentId: 'STU-2026-002',
      section: 'B',
      enrollmentDate: '04 Sep 2023',
      status: 'Active',
    },
    {
      id: 'stu-3',
      name: 'Sophia Chen',
      studentId: 'STU-2026-003',
      section: 'A',
      enrollmentDate: '03 Sep 2023',
      status: 'Active',
    },
    {
      id: 'stu-4',
      name: 'Liam Patel',
      studentId: 'STU-2026-004',
      section: 'C',
      enrollmentDate: '05 Sep 2023',
      status: 'Active',
    },
  ];

  async getStats(): Promise<AcademicStructureStats> {
    return { ...this.stats };
  }

  async getClasses(): Promise<ClassSummary[]> {
    return [...this.classes];
  }

  async getClassById(id: string): Promise<ClassSummary | null> {
    const item = this.classes.find((c) => c.id === id || c.name.toLowerCase() === id.toLowerCase());
    return item ? { ...item } : null;
  }

  async getSectionsByClass(classId: string): Promise<ClassSection[]> {
    return this.sections.filter((s) => s.classId === classId || classId.includes('8'));
  }

  async getAllSections(): Promise<ClassSection[]> {
    return [...this.sections];
  }

  async getSubjects(): Promise<Subject[]> {
    return [...this.subjects];
  }

  async getAssignments(): Promise<TeacherAssignment[]> {
    return [...this.assignments];
  }

  async getAcademicYears(): Promise<AcademicYear[]> {
    return [...this.academicYears];
  }

  async getEnrolledStudents(classId: string): Promise<EnrolledStudent[]> {
    void classId;
    return [...this.students];
  }

  async saveAcademicStructure(data: Partial<AcademicStructureFormData>): Promise<void> {
    if (data.className && data.sectionName) {
      this.sections.push({
        id: `sec-new-${Date.now()}`,
        classId: 'class-8',
        className: data.className,
        sectionName: data.sectionName,
        classTeacher: data.classTeacher || 'Unassigned',
        studentsCount: 0,
        capacity: data.studentCapacity || 35,
      });
    }
  }

  async archiveAcademicYear(yearId: string): Promise<void> {
    const yr = this.academicYears.find((y) => y.id === yearId || y.year === yearId);
    if (yr) {
      yr.status = 'Archived';
      yr.enrollment = 'Closed';
    }
  }
}

export const mockAcademicStructureRepository = new MockAcademicStructureRepository();
