import type { IExamRepository } from '../../core/repositories/exam.repository.interface';
import type {
  Exam,
  ExamKpiStats,
  ExamHistoryItem,
  TeacherMarksSubmission,
  StudentExamMark,
  GradingBand,
  CalculatedStudentResult,
} from '../../core/entities/exam.types';

export class MockExamRepository implements IExamRepository {
  private exams: Exam[] = [
    {
      id: 'ex-01',
      name: 'Mid-Term Examination',
      type: 'Mid-Term',
      academicYear: '2026–2027',
      term: 'Term 1',
      startDate: '24 Oct 2026',
      endDate: '31 Oct 2026',
      classes: ['Class 8-A', 'Class 8-B', 'Class 7-A', 'Class 7-B', 'Class 9-A', 'Class 9-B', 'Class 10-A', 'Class 10-B'],
      subjects: ['Mathematics', 'English', 'Science', 'History', 'Geography'],
      instructions:
        'Review subject schedules and confirm invigilator assignments before publishing the timetable.',
      status: 'Scheduled',
      totalClasses: 8,
      schedule: [
        {
          id: 'sch-01',
          subject: 'Mathematics',
          date: '24 Oct 2026',
          time: '09:00 – 11:00',
          duration: '2 hrs',
          room: 'Room 204',
          invigilator: 'Nusrat Jahan',
          maxMarks: 100,
        },
        {
          id: 'sch-02',
          subject: 'English',
          date: '25 Oct 2026',
          time: '09:00 – 11:00',
          duration: '2 hrs',
          room: 'Room 205',
          invigilator: 'Rafiq Hasan',
          maxMarks: 100,
        },
        {
          id: 'sch-03',
          subject: 'Science',
          date: '27 Oct 2026',
          time: '11:00 – 13:00',
          duration: '2 hrs',
          room: 'Lab 1',
          invigilator: 'Maliha Noor',
          maxMarks: 100,
        },
        {
          id: 'sch-04',
          subject: 'History',
          date: '29 Oct 2026',
          time: '09:00 – 11:00',
          duration: '2 hrs',
          room: 'Room 206',
          invigilator: 'Tariq Anis',
          maxMarks: 100,
        },
        {
          id: 'sch-05',
          subject: 'Geography',
          date: '31 Oct 2026',
          time: '10:00 – 12:00',
          duration: '2 hrs',
          room: 'Room 208',
          invigilator: 'Selina Banu',
          maxMarks: 100,
        },
      ],
    },
    {
      id: 'ex-02',
      name: 'Class Test — Science',
      type: 'Class Test',
      academicYear: '2026–2027',
      term: 'Term 1',
      startDate: '20 Oct 2026',
      endDate: '22 Oct 2026',
      classes: ['Class 8-A', 'Class 8-B', 'Class 9-A', 'Class 9-B', 'Class 7-A', 'Class 7-B'],
      subjects: ['Science', 'Physics', 'Biology'],
      instructions: 'Formative assessment on cell structure and organic reactions.',
      status: 'In Progress',
      totalClasses: 6,
      schedule: [
        {
          id: 'sch-06',
          subject: 'Science',
          date: '20 Oct 2026',
          time: '10:00 – 11:30',
          duration: '1.5 hrs',
          room: 'Lab 2',
          invigilator: 'Maliha Noor',
          maxMarks: 50,
        },
      ],
    },
    {
      id: 'ex-03',
      name: 'Final Assessment',
      type: 'Final Exam',
      academicYear: '2026–2027',
      term: 'Term 2',
      startDate: '05 Dec 2026',
      endDate: '18 Dec 2026',
      classes: [
        'Class 7-A', 'Class 7-B', 'Class 8-A', 'Class 8-B',
        'Class 9-A', 'Class 9-B', 'Class 10-A', 'Class 10-B', 'Class 6-A', 'Class 6-B',
      ],
      subjects: ['Mathematics', 'English', 'Science', 'Social Studies', 'ICT'],
      instructions: 'Term 2 comprehensive summative evaluation.',
      status: 'Draft',
      totalClasses: 10,
      schedule: [],
    },
    {
      id: 'ex-04',
      name: 'Term 1 Final',
      type: 'Final Exam',
      academicYear: '2026–2027',
      term: 'Term 1',
      startDate: '12 Oct 2026',
      endDate: '18 Oct 2026',
      classes: ['Class 8-A', 'Class 8-B', 'Class 7-A', 'Class 7-B', 'Class 9-A', 'Class 9-B', 'Class 10-A', 'Class 10-B'],
      subjects: ['Mathematics', 'English', 'Science'],
      instructions: 'Completed examination under post-evaluation mark processing.',
      status: 'Under Review',
      totalClasses: 8,
      schedule: [],
    },
  ];

  private teacherSubmissions: TeacherMarksSubmission[] = [
    {
      id: 'ts-01',
      examId: 'ex-01',
      examName: 'Mid-Term Examination',
      classId: 'cls-8a',
      className: 'Class 8-A',
      subject: 'Mathematics',
      teacherName: 'Nusrat Jahan',
      submittedAt: '22 Oct · 10:40',
      submittedCount: 32,
      totalStudents: 32,
      validation: 'Valid',
      status: 'Submitted',
    },
    {
      id: 'ts-02',
      examId: 'ex-01',
      examName: 'Mid-Term Examination',
      classId: 'cls-8b',
      className: 'Class 8-B',
      subject: 'English',
      teacherName: 'Rafiq Hasan',
      submittedAt: '22 Oct · 11:10',
      submittedCount: 26,
      totalStudents: 28,
      validation: '2 missing',
      status: 'Under Review',
    },
    {
      id: 'ts-03',
      examId: 'ex-01',
      examName: 'Mid-Term Examination',
      classId: 'cls-9a',
      className: 'Class 9-A',
      subject: 'Science',
      teacherName: 'Maliha Noor',
      submittedAt: 'Pending',
      submittedCount: 0,
      totalStudents: 30,
      validation: 'Not submitted',
      status: 'Pending',
    },
    {
      id: 'ts-04',
      examId: 'ex-01',
      examName: 'Mid-Term Examination',
      classId: 'cls-8a',
      className: 'Class 8-A',
      subject: 'English',
      teacherName: 'Rafiq Hasan',
      submittedAt: '21 Oct · 16:30',
      submittedCount: 32,
      totalStudents: 32,
      validation: 'Valid',
      status: 'Approved',
    },
  ];

  private studentMarks: StudentExamMark[] = [
    {
      id: 'sm-01',
      submissionId: 'ts-01',
      studentId: 'stu-08',
      studentName: 'Ayesha Rahman',
      rollNo: '08',
      marks: 86,
      maxMarks: 100,
      validation: 'Valid',
    },
    {
      id: 'sm-02',
      submissionId: 'ts-01',
      studentId: 'stu-12',
      studentName: 'Tanvir Hossain',
      rollNo: '12',
      marks: 104,
      maxMarks: 100,
      validation: 'Out of range',
    },
    {
      id: 'sm-03',
      submissionId: 'ts-01',
      studentId: 'stu-19',
      studentName: 'Nabila Islam',
      rollNo: '19',
      marks: null,
      maxMarks: 100,
      validation: 'Missing',
    },
    {
      id: 'sm-04',
      submissionId: 'ts-01',
      studentId: 'stu-04',
      studentName: 'Samiul Karim',
      rollNo: '04',
      marks: 78,
      maxMarks: 100,
      validation: 'Valid',
    },
    {
      id: 'sm-05',
      submissionId: 'ts-01',
      studentId: 'stu-06',
      studentName: 'Maya Ahmed',
      rollNo: '06',
      marks: 92,
      maxMarks: 100,
      validation: 'Valid',
    },
    {
      id: 'sm-06',
      submissionId: 'ts-01',
      studentId: 'stu-09',
      studentName: 'Zayan Khan',
      rollNo: '09',
      marks: 84,
      maxMarks: 100,
      validation: 'Valid',
    },
  ];

  private gradingBands: GradingBand[] = [
    { grade: 'A+', range: '80–100', minMarks: 80, maxMarks: 100, gradePoint: '5.00', description: 'Outstanding' },
    { grade: 'A', range: '70–79', minMarks: 70, maxMarks: 79, gradePoint: '4.00', description: 'Excellent' },
    { grade: 'B', range: '60–69', minMarks: 60, maxMarks: 69, gradePoint: '3.00', description: 'Good' },
    { grade: 'C', range: '50–59', minMarks: 50, maxMarks: 59, gradePoint: '2.00', description: 'Average' },
    { grade: 'D', range: '40–49', minMarks: 40, maxMarks: 49, gradePoint: '1.00', description: 'Pass' },
    { grade: 'F', range: '0–39', minMarks: 0, maxMarks: 39, gradePoint: '0.00', description: 'Needs Support' },
  ];

  private calculatedResults: CalculatedStudentResult[] = [
    {
      id: 'res-01',
      examId: 'ex-01',
      examName: 'Mid-Term Examination',
      studentId: 'stu-08',
      studentName: 'Ayesha Rahman',
      rollNo: '08',
      className: 'Class 8-A',
      term: 'Term 1',
      totalMarks: 432,
      maxTotalMarks: 500,
      grade: 'A+',
      gpa: '4.85',
      classRank: 1,
      validation: 'Valid',
      resultStatus: 'Under Review',
      remarks: 'Exemplary academic commitment, distinguished problem solving.',
      subjectBreakdown: [
        { subject: 'Mathematics', obtainedMarks: 86, maxMarks: 100, grade: 'A+', gradePoint: '5.00' },
        { subject: 'English', obtainedMarks: 88, maxMarks: 100, grade: 'A+', gradePoint: '5.00' },
        { subject: 'Science', obtainedMarks: 91, maxMarks: 100, grade: 'A+', gradePoint: '5.00' },
        { subject: 'History', obtainedMarks: 82, maxMarks: 100, grade: 'A+', gradePoint: '5.00' },
        { subject: 'Geography', obtainedMarks: 85, maxMarks: 100, grade: 'A+', gradePoint: '5.00' },
      ],
    },
    {
      id: 'res-02',
      examId: 'ex-01',
      examName: 'Mid-Term Examination',
      studentId: 'stu-12',
      studentName: 'Tanvir Hossain',
      rollNo: '12',
      className: 'Class 8-A',
      term: 'Term 1',
      totalMarks: null,
      maxTotalMarks: 500,
      grade: '—',
      gpa: '—',
      classRank: null,
      validation: 'Marks missing',
      resultStatus: 'Blocked',
      remarks: 'Score entry error in Mathematics (104/100). Requires teacher correction.',
      subjectBreakdown: [
        { subject: 'Mathematics', obtainedMarks: 104, maxMarks: 100, grade: 'Err', gradePoint: '0.00' },
        { subject: 'English', obtainedMarks: 72, maxMarks: 100, grade: 'A', gradePoint: '4.00' },
        { subject: 'Science', obtainedMarks: 68, maxMarks: 100, grade: 'B', gradePoint: '3.00' },
      ],
    },
    {
      id: 'res-03',
      examId: 'ex-01',
      examName: 'Mid-Term Examination',
      studentId: 'stu-19',
      studentName: 'Nabila Islam',
      rollNo: '19',
      className: 'Class 8-A',
      term: 'Term 1',
      totalMarks: 386,
      maxTotalMarks: 500,
      grade: 'A',
      gpa: '4.15',
      classRank: 4,
      validation: 'Valid',
      resultStatus: 'Under Review',
      remarks: 'Consistent analytical grasp, high aptitude in science and language.',
      subjectBreakdown: [
        { subject: 'Mathematics', obtainedMarks: 76, maxMarks: 100, grade: 'A', gradePoint: '4.00' },
        { subject: 'English', obtainedMarks: 82, maxMarks: 100, grade: 'A+', gradePoint: '5.00' },
        { subject: 'Science', obtainedMarks: 79, maxMarks: 100, grade: 'A', gradePoint: '4.00' },
        { subject: 'History', obtainedMarks: 75, maxMarks: 100, grade: 'A', gradePoint: '4.00' },
        { subject: 'Geography', obtainedMarks: 74, maxMarks: 100, grade: 'A', gradePoint: '4.00' },
      ],
    },
    {
      id: 'res-04',
      examId: 'ex-01',
      examName: 'Mid-Term Examination',
      studentId: 'stu-04',
      studentName: 'Samiul Karim',
      rollNo: '04',
      className: 'Class 8-A',
      term: 'Term 1',
      totalMarks: 364,
      maxTotalMarks: 500,
      grade: 'B',
      gpa: '3.70',
      classRank: 9,
      validation: 'Valid',
      resultStatus: 'Under Review',
      remarks: 'Satisfactory performance, recommend review on quadratic proofs.',
      subjectBreakdown: [
        { subject: 'Mathematics', obtainedMarks: 78, maxMarks: 100, grade: 'A', gradePoint: '4.00' },
        { subject: 'English', obtainedMarks: 70, maxMarks: 100, grade: 'A', gradePoint: '4.00' },
        { subject: 'Science', obtainedMarks: 72, maxMarks: 100, grade: 'A', gradePoint: '4.00' },
        { subject: 'History', obtainedMarks: 71, maxMarks: 100, grade: 'A', gradePoint: '4.00' },
        { subject: 'Geography', obtainedMarks: 73, maxMarks: 100, grade: 'A', gradePoint: '4.00' },
      ],
    },
    {
      id: 'res-05',
      examId: 'ex-01',
      examName: 'Mid-Term Examination',
      studentId: 'stu-06',
      studentName: 'Maya Ahmed',
      rollNo: '06',
      className: 'Class 8-A',
      term: 'Term 1',
      totalMarks: 448,
      maxTotalMarks: 500,
      grade: 'A+',
      gpa: '4.95',
      classRank: 2,
      validation: 'Valid',
      resultStatus: 'Under Review',
      remarks: 'Outstanding dedication across all core and elective subjects.',
      subjectBreakdown: [
        { subject: 'Mathematics', obtainedMarks: 92, maxMarks: 100, grade: 'A+', gradePoint: '5.00' },
        { subject: 'English', obtainedMarks: 89, maxMarks: 100, grade: 'A+', gradePoint: '5.00' },
        { subject: 'Science', obtainedMarks: 94, maxMarks: 100, grade: 'A+', gradePoint: '5.00' },
        { subject: 'History', obtainedMarks: 86, maxMarks: 100, grade: 'A+', gradePoint: '5.00' },
        { subject: 'Geography', obtainedMarks: 87, maxMarks: 100, grade: 'A+', gradePoint: '5.00' },
      ],
    },
  ];

  private examHistory: ExamHistoryItem[] = [
    {
      id: 'eh-01',
      examTitle: 'Annual Examination 2026',
      term: 'Term 2',
      classes: 10,
      completedDate: '18 Sep 2026',
      resultStatus: 'Published',
      publishedOn: '18 Sep 2026',
      reportCardsCount: '32 / 32',
    },
    {
      id: 'eh-02',
      examTitle: 'Class 7 Assessment',
      term: 'Term 1',
      classes: 6,
      completedDate: '02 Sep 2026',
      resultStatus: 'Completed',
      publishedOn: '04 Sep 2026',
      reportCardsCount: '28 / 28',
    },
    {
      id: 'eh-03',
      examTitle: 'Mid-Term · Term 1',
      term: 'Term 1',
      classes: 8,
      completedDate: '18 Oct 2026',
      resultStatus: 'Under Review',
      publishedOn: 'Not published',
      reportCardsCount: '0 / 32',
    },
  ];

  async getKpiStats(): Promise<ExamKpiStats> {
    return {
      totalExams: 18,
      scheduled: 6,
      marksUnderReview: 4,
      publishedResults: 12,
      resultProgress: {
        confirmedSchedules: 8,
        totalSchedules: 8,
        marksSubmitted: 6,
        totalSubmittedExpected: 8,
        marksReviewed: 4,
        totalReviewedExpected: 8,
        resultsPublished: 0,
        totalPublishedExpected: 8,
      },
      classPerformance: {
        classAverage: 76.4,
        passRate: 92,
        marksVerified: 87,
      },
    };
  }

  async getUpcomingExams(): Promise<Exam[]> {
    return [...this.exams];
  }

  async getRecentExamHistory(): Promise<ExamHistoryItem[]> {
    return [...this.examHistory];
  }

  async getAllExams(): Promise<Exam[]> {
    return [...this.exams];
  }

  async getExamById(id: string): Promise<Exam | null> {
    return this.exams.find((e) => e.id === id) || null;
  }

  async createExam(examData: Partial<Exam>): Promise<Exam> {
    const newExam: Exam = {
      id: `ex-${Date.now()}`,
      name: examData.name || 'New Examination',
      type: examData.type || 'Mid-Term',
      academicYear: examData.academicYear || '2026–2027',
      term: examData.term || 'Term 1',
      startDate: examData.startDate || '24 Oct 2026',
      endDate: examData.endDate || '31 Oct 2026',
      classes: examData.classes || ['Class 8-A', 'Class 8-B'],
      subjects: examData.subjects || ['Mathematics', 'English'],
      instructions: examData.instructions || 'Review schedules and invigilator duties.',
      status: examData.status || 'Draft',
      totalClasses: examData.classes?.length || 2,
      schedule: examData.schedule || [
        {
          id: `sch-${Date.now()}-1`,
          subject: 'Mathematics',
          date: '24 Oct 2026',
          time: '09:00 – 11:00',
          duration: '2 hrs',
          room: 'Room 204',
          maxMarks: 100,
        },
      ],
    };
    this.exams.unshift(newExam);
    return newExam;
  }

  async updateExam(id: string, examData: Partial<Exam>): Promise<Exam> {
    const idx = this.exams.findIndex((e) => e.id === id);
    if (idx === -1) throw new Error(`Exam ${id} not found`);
    const updated = { ...this.exams[idx], ...examData };
    this.exams[idx] = updated;
    return updated;
  }

  async getTeacherMarksSubmissions(filter?: {
    examId?: string;
    className?: string;
    subject?: string;
    status?: string;
  }): Promise<TeacherMarksSubmission[]> {
    let result = [...this.teacherSubmissions];
    if (filter?.examId) {
      result = result.filter((s) => s.examId === filter.examId);
    }
    if (filter?.className && filter.className !== 'All classes') {
      result = result.filter((s) => s.className === filter.className);
    }
    if (filter?.subject && filter.subject !== 'All subjects') {
      result = result.filter((s) => s.subject === filter.subject);
    }
    if (filter?.status && filter.status !== 'All statuses') {
      result = result.filter((s) => s.status === filter.status);
    }
    return result;
  }

  async getStudentExamMarks(submissionId: string): Promise<StudentExamMark[]> {
    return this.studentMarks.filter((m) => m.submissionId === submissionId);
  }

  async updateStudentMark(markId: string, marks: number): Promise<StudentExamMark> {
    const mark = this.studentMarks.find((m) => m.id === markId);
    if (!mark) throw new Error(`Mark record ${markId} not found`);
    mark.marks = marks;
    if (marks > 100) {
      mark.validation = 'Out of range';
    } else if (marks === null || marks === undefined) {
      mark.validation = 'Missing';
    } else {
      mark.validation = 'Valid';
    }
    return { ...mark };
  }

  async getGradingBands(): Promise<GradingBand[]> {
    return [...this.gradingBands];
  }

  async updateGradingBands(bands: GradingBand[]): Promise<GradingBand[]> {
    this.gradingBands = [...bands];
    return [...this.gradingBands];
  }

  async getCalculatedResults(filter?: {
    examId?: string;
    className?: string;
    status?: string;
    search?: string;
  }): Promise<CalculatedStudentResult[]> {
    let list = [...this.calculatedResults];
    if (filter?.className && filter.className !== 'All classes') {
      list = list.filter((r) => r.className === filter.className);
    }
    if (filter?.status && filter.status !== 'All statuses') {
      list = list.filter((r) => r.resultStatus === filter.status);
    }
    if (filter?.search) {
      const q = filter.search.toLowerCase();
      list = list.filter(
        (r) =>
          r.studentName.toLowerCase().includes(q) ||
          r.rollNo.includes(q)
      );
    }
    return list;
  }

  async publishResults(examId: string, className: string): Promise<void> {
    this.calculatedResults.forEach((r) => {
      if (r.className === className && r.validation === 'Valid') {
        r.resultStatus = 'Published';
      }
    });
    const exam = this.exams.find((e) => e.id === examId);
    if (exam) {
      exam.status = 'Published';
    }
  }

  async approveTeacherMarks(submissionId: string): Promise<void> {
    const sub = this.teacherSubmissions.find((s) => s.id === submissionId);
    if (sub) {
      sub.status = 'Approved';
      sub.validation = 'Valid';
    }
  }
}
