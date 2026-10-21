import type {
  Assignment,
  AssignmentKpiStats,
  AssignmentListFilter,
  ClassMaterial,
  StudentSubmission,
  SubmissionFilter,
} from '../../core/entities/assignment.types';
import type { IAssignmentRepository } from '../../core/repositories/assignment.repository.interface';

export class MockAssignmentRepository implements IAssignmentRepository {
  private assignments: Assignment[] = [
    {
      id: 'asn-01',
      title: 'Algebra — Worksheet 04',
      academicYear: '2026–2027',
      classId: 'cls-8a',
      className: 'Class 8-A',
      section: 'Section A',
      subject: 'Mathematics',
      teacherName: 'Nusrat Jahan',
      dueDate: '22 Oct',
      dueTime: '11:59 PM',
      publishDate: '15 Oct 2026',
      status: 'Published',
      totalStudents: 32,
      submittedCount: 24,
      instructions:
        'Solve questions 1–12 from Unit 4 and show all working. Upload one PDF or clear photos of your written solutions.',
      maxMarks: 20,
      submissionType: 'File upload',
      latePolicy: 'Allow with late label',
      attachments: [
        {
          id: 'att-1',
          name: 'Worksheet_04.pdf',
          size: '2.4 MB',
          type: 'PDF',
        },
      ],
      visibleToClass: true,
      notifyStudents: true,
      allowResubmission: true,
    },
    {
      id: 'asn-02',
      title: 'Chapter 3 Reading',
      academicYear: '2026–2027',
      classId: 'cls-7b',
      className: 'Class 7-B',
      section: 'Section B',
      subject: 'English',
      teacherName: 'Farhan Ahmed',
      dueDate: '23 Oct',
      dueTime: '11:59 PM',
      publishDate: '16 Oct 2026',
      status: 'Draft',
      totalStudents: 30,
      submittedCount: 0,
      instructions:
        'Read chapter 3 of To Kill a Mockingbird and prepare brief notes on character motivations and historical setting.',
      maxMarks: 15,
      submissionType: 'Online text',
      latePolicy: 'Allow with late label',
      attachments: [],
      visibleToClass: false,
      notifyStudents: false,
      allowResubmission: true,
    },
    {
      id: 'asn-03',
      title: 'Science Lab Report',
      academicYear: '2026–2027',
      classId: 'cls-9a',
      className: 'Class 9-A',
      section: 'Section A',
      subject: 'Science',
      teacherName: 'Maliha Noor',
      dueDate: '20 Oct',
      dueTime: '11:59 PM',
      publishDate: '13 Oct 2026',
      status: 'Published',
      totalStudents: 30,
      submittedCount: 27,
      instructions:
        'Document observation of chemical reactions in Lab 02. Include balanced chemical equations and safety precautions.',
      maxMarks: 25,
      submissionType: 'File upload',
      latePolicy: 'Allow with late label',
      attachments: [
        {
          id: 'att-2',
          name: 'Lab_Protocol_02.pdf',
          size: '1.2 MB',
          type: 'PDF',
        },
      ],
      visibleToClass: true,
      notifyStudents: true,
      allowResubmission: false,
    },
    {
      id: 'asn-04',
      title: 'English Essay',
      academicYear: '2026–2027',
      classId: 'cls-8b',
      className: 'Class 8-B',
      section: 'Section B',
      subject: 'English',
      teacherName: 'Rafiq Hasan',
      dueDate: '18 Oct',
      dueTime: '11:59 PM',
      publishDate: '10 Oct 2026',
      status: 'Published',
      totalStudents: 28,
      submittedCount: 19,
      instructions:
        'Write a 500-word argumentative essay on environmental sustainability and local community recycling programs.',
      maxMarks: 20,
      submissionType: 'File upload',
      latePolicy: 'Allow with late label',
      attachments: [],
      visibleToClass: true,
      notifyStudents: true,
      allowResubmission: true,
    },
    {
      id: 'asn-05',
      title: 'Geometry Quiz',
      academicYear: '2026–2027',
      classId: 'cls-8a',
      className: 'Class 8-A',
      section: 'Section A',
      subject: 'Mathematics',
      teacherName: 'Nusrat Jahan',
      dueDate: '16 Oct',
      dueTime: '11:59 PM',
      publishDate: '09 Oct 2026',
      status: 'Late',
      totalStudents: 32,
      submittedCount: 28,
      instructions:
        'Diagnostic assessment covering geometric congruence, angle postulates, and Cartesian coordinate proofs.',
      maxMarks: 20,
      submissionType: 'File upload',
      latePolicy: 'Allow with late label',
      attachments: [],
      visibleToClass: true,
      notifyStudents: true,
      allowResubmission: false,
    },
    {
      id: 'asn-06',
      title: 'Algebra — Worksheet 05',
      academicYear: '2026–2027',
      classId: 'cls-8a',
      className: 'Class 8-A',
      section: 'Section A',
      subject: 'Mathematics',
      teacherName: 'Nusrat Jahan',
      dueDate: '28 Oct 2026',
      dueTime: '11:59 PM',
      publishDate: '20 Oct 2026',
      status: 'Draft',
      totalStudents: 32,
      submittedCount: 0,
      instructions:
        'Complete questions 1–15. Show your working and submit as a PDF.',
      maxMarks: 20,
      submissionType: 'File upload',
      latePolicy: 'Allow with late label',
      attachments: [
        {
          id: 'att-3',
          name: 'Unit 4 — Algebra notes.pdf',
          size: '1.8 MB',
          type: 'PDF',
        },
      ],
      visibleToClass: true,
      notifyStudents: true,
      allowResubmission: true,
    },
  ];

  private submissions: StudentSubmission[] = [
    {
      id: 'sub-01',
      assignmentId: 'asn-01',
      assignmentTitle: 'Algebra — Worksheet 04',
      studentId: 'stu-101',
      studentName: 'Ayesha Rahman',
      rollNo: '01',
      submittedAt: '21 Oct · 10:14 AM',
      fileName: 'algebra_worksheet.pdf',
      fileSize: '1.9 MB',
      status: 'Submitted',
      marks: null,
    },
    {
      id: 'sub-02',
      assignmentId: 'asn-01',
      assignmentTitle: 'Algebra — Worksheet 04',
      studentId: 'stu-102',
      studentName: 'Tanvir Hossain',
      rollNo: '02',
      submittedAt: '22 Oct · 12:22 AM',
      fileName: 'worksheet_tanvir.pdf',
      fileSize: '2.1 MB',
      status: 'Late',
      marks: null,
    },
    {
      id: 'sub-03',
      assignmentId: 'asn-01',
      assignmentTitle: 'Algebra — Worksheet 04',
      studentId: 'stu-103',
      studentName: 'Nabila Islam',
      rollNo: '03',
      submittedAt: '20 Oct · 03:08 PM',
      fileName: 'nabila_work.pdf',
      fileSize: '2.4 MB',
      status: 'Graded',
      marks: 18,
      feedback: 'Excellent work and neat presentation of algebraic steps.',
    },
    {
      id: 'sub-04',
      assignmentId: 'asn-01',
      assignmentTitle: 'Algebra — Worksheet 04',
      studentId: 'stu-104',
      studentName: 'Samiul Karim',
      rollNo: '04',
      submittedAt: 'Not submitted',
      fileName: '—',
      status: 'Pending',
      marks: null,
    },
    {
      id: 'sub-05',
      assignmentId: 'asn-01',
      assignmentTitle: 'Algebra — Worksheet 04',
      studentId: 'stu-105',
      studentName: 'Zayan Khan',
      rollNo: '05',
      submittedAt: '21 Oct · 04:30 PM',
      fileName: 'zayan_math_hw4.pdf',
      fileSize: '1.7 MB',
      status: 'Submitted',
      marks: null,
    },
    {
      id: 'sub-06',
      assignmentId: 'asn-01',
      assignmentTitle: 'Algebra — Worksheet 04',
      studentId: 'stu-106',
      studentName: 'Maya Ahmed',
      rollNo: '06',
      submittedAt: '19 Oct · 02:15 PM',
      fileName: 'maya_solutions.pdf',
      fileSize: '2.0 MB',
      status: 'Graded',
      marks: 19,
      feedback: 'Very thorough solutions. Minor arithmetic error on Q10.',
    },
  ];

  private materials: ClassMaterial[] = [
    {
      id: 'mat-01',
      title: 'Unit 4 — Algebra notes',
      type: 'PDF',
      updatedAt: '14 Oct',
      size: '1.8 MB',
      className: 'Class 8-A',
      subject: 'Mathematics',
    },
    {
      id: 'mat-02',
      title: 'Practice worksheet',
      type: 'PDF',
      updatedAt: '12 Oct',
      size: '950 KB',
      className: 'Class 8-A',
      subject: 'Mathematics',
    },
    {
      id: 'mat-03',
      title: 'Lesson recording',
      type: 'Link',
      updatedAt: '10 Oct',
      className: 'Class 8-A',
      subject: 'Mathematics',
      url: 'https://video.edusync.internal/lesson-algebra-4',
    },
    {
      id: 'mat-04',
      title: 'Geometry Formula Sheet',
      type: 'PDF',
      updatedAt: '08 Oct',
      size: '1.1 MB',
      className: 'Class 8-A',
      subject: 'Mathematics',
    },
  ];

  async getKpiStats(): Promise<AssignmentKpiStats> {
    return {
      totalAssignments: 248,
      publishedCount: 186,
      pendingSubmissions: 74,
      needsGrading: 32,
      submissionStatus: {
        submitted: 412,
        pending: 74,
        late: 26,
        graded: 356,
      },
      gradingOverview: {
        awaitingReview: 12,
        graded: 12,
        returnedForRevision: 2,
        averageScore: '16.4 / 20',
      },
    };
  }

  async getRecentAssignments(): Promise<Assignment[]> {
    return this.assignments.slice(0, 4);
  }

  async getAssignments(filter?: Partial<AssignmentListFilter>): Promise<Assignment[]> {
    let result = [...this.assignments];
    if (filter?.searchQuery) {
      const q = filter.searchQuery.toLowerCase();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.subject.toLowerCase().includes(q) ||
          a.teacherName.toLowerCase().includes(q)
      );
    }
    if (filter?.className && filter.className !== 'All classes') {
      result = result.filter((a) =>
        a.className.toLowerCase().includes(filter.className!.toLowerCase())
      );
    }
    if (filter?.subject && filter.subject !== 'All subjects') {
      result = result.filter(
        (a) => a.subject.toLowerCase() === filter.subject!.toLowerCase()
      );
    }
    if (filter?.status && filter.status !== 'All statuses') {
      result = result.filter(
        (a) => a.status.toLowerCase() === filter.status!.toLowerCase()
      );
    }
    return result;
  }

  async getAssignmentById(id: string): Promise<Assignment | null> {
    const found = this.assignments.find((a) => a.id === id);
    return found ? { ...found } : null;
  }

  async createAssignment(
    assignment: Omit<Assignment, 'id' | 'submittedCount'>
  ): Promise<Assignment> {
    const newAssignment: Assignment = {
      ...assignment,
      id: `asn-${Date.now()}`,
      submittedCount: 0,
    };
    this.assignments.unshift(newAssignment);
    return newAssignment;
  }

  async updateAssignment(
    id: string,
    updates: Partial<Assignment>
  ): Promise<Assignment> {
    const idx = this.assignments.findIndex((a) => a.id === id);
    if (idx === -1) throw new Error(`Assignment with ID ${id} not found`);
    this.assignments[idx] = { ...this.assignments[idx], ...updates };
    return this.assignments[idx];
  }

  async getSubmissions(
    filter?: Partial<SubmissionFilter>
  ): Promise<StudentSubmission[]> {
    let result = [...this.submissions];
    if (filter?.assignmentId) {
      result = result.filter((s) => s.assignmentId === filter.assignmentId);
    }
    if (filter?.status && filter.status !== 'All statuses') {
      result = result.filter((s) => s.status.toLowerCase() === filter.status!.toLowerCase());
    }
    if (filter?.studentSearch) {
      const q = filter.studentSearch.toLowerCase();
      result = result.filter((s) => s.studentName.toLowerCase().includes(q));
    }
    return result;
  }

  async updateSubmissionGrade(
    submissionId: string,
    marks: number,
    feedback?: string
  ): Promise<StudentSubmission> {
    const idx = this.submissions.findIndex((s) => s.id === submissionId);
    if (idx === -1) throw new Error(`Submission ${submissionId} not found`);
    this.submissions[idx] = {
      ...this.submissions[idx],
      marks,
      feedback: feedback || this.submissions[idx].feedback,
      status: 'Graded',
    };
    return this.submissions[idx];
  }

  async sendStudentReminder(submissionId: string): Promise<boolean> {
    const found = this.submissions.find((s) => s.id === submissionId);
    if (!found) return false;
    return true;
  }

  async getClassMaterials(className?: string): Promise<ClassMaterial[]> {
    if (className && className !== 'All classes') {
      return this.materials.filter((m) =>
        m.className.toLowerCase().includes(className.toLowerCase())
      );
    }
    return [...this.materials];
  }

  async addClassMaterial(
    material: Omit<ClassMaterial, 'id' | 'updatedAt'>
  ): Promise<ClassMaterial> {
    const newMaterial: ClassMaterial = {
      ...material,
      id: `mat-${Date.now()}`,
      updatedAt: 'Today',
    };
    this.materials.unshift(newMaterial);
    return newMaterial;
  }
}
