import type { ITimetableRepository } from '../../core/repositories/timetable.repository.interface';
import type {
  TimetableKPIs,
  TimetableSlot,
  DailyPeriodRow,
  TeacherWorkload,
  RoomAvailability,
  AcademicEvent,
  UpcomingScheduleItem,
  TimeSlotConfig,
  ScheduleFormData,
} from '../../core/entities/timetable.types';

export class MockTimetableRepository implements ITimetableRepository {
  private kpis: TimetableKPIs = {
    classesScheduled: 42,
    daysSpanText: 'Across 6 days',
    teachersAssigned: 28,
    pendingPeriodsText: '2 periods to assign',
    roomsInUse: 16,
    availableRoomsText: '4 rooms available',
    conflictsCount: 2,
    conflictsStatusText: 'Needs review',
  };

  private weeklySlots: TimetableSlot[] = [
    // MON 12
    { id: 'slot-m1', day: 'MON', dayNumber: 12, time: '08:00', subject: 'Mathematics', teacher: 'Nusrat Jahan', room: 'Room 204', className: 'Class 8', section: 'Section A', type: 'class', status: 'Assigned' },
    { id: 'slot-m2', day: 'MON', dayNumber: 12, time: '09:00', subject: 'English', teacher: 'Farhan Ahmed', room: 'Room 105', className: 'Class 8', section: 'Section A', type: 'class', status: 'Assigned' },
    { id: 'slot-m3', day: 'MON', dayNumber: 12, time: '10:00', subject: 'Science', teacher: 'Maliha Noor', room: 'Lab 02', className: 'Class 8', section: 'Section A', type: 'lab', status: 'Assigned' },
    { id: 'slot-m4', day: 'MON', dayNumber: 12, time: '11:00', subject: 'Bangla', teacher: 'Tania Akter', room: 'Room 201', className: 'Class 8', section: 'Section A', type: 'class', status: 'Assigned' },
    { id: 'slot-m5', day: 'MON', dayNumber: 12, time: '12:00', subject: 'ICT', teacher: 'Rafiq Hasan', room: 'Lab 01', className: 'Class 8', section: 'Section A', type: 'lab', status: 'Assigned' },
    { id: 'slot-m6', day: 'MON', dayNumber: 12, time: '13:00', subject: 'History', teacher: 'Sadia Islam', room: 'Room 108', className: 'Class 8', section: 'Section A', type: 'class', status: 'Assigned' },

    // TUE 13
    { id: 'slot-tu1', day: 'TUE', dayNumber: 13, time: '08:00', subject: 'English', teacher: 'Farhan Ahmed', room: 'Room 105', className: 'Class 8', section: 'Section A', type: 'class', status: 'Assigned' },
    { id: 'slot-tu2', day: 'TUE', dayNumber: 13, time: '09:00', subject: 'Mathematics', teacher: 'Nusrat Jahan', room: 'Room 204', className: 'Class 8', section: 'Section A', type: 'class', status: 'Assigned' },
    { id: 'slot-tu3', day: 'TUE', dayNumber: 13, time: '10:00', subject: 'History', teacher: 'Sadia Islam', room: 'Room 108', className: 'Class 8', section: 'Section A', type: 'class', status: 'Assigned' },
    { id: 'slot-tu4', day: 'TUE', dayNumber: 13, time: '11:00', subject: 'Science', teacher: 'Maliha Noor', room: 'Lab 02', className: 'Class 8', section: 'Section A', type: 'lab', status: 'Assigned' },
    { id: 'slot-tu5', day: 'TUE', dayNumber: 13, time: '12:00', subject: 'Bangla', teacher: 'Tania Akter', room: 'Room 201', className: 'Class 8', section: 'Section A', type: 'class', status: 'Assigned' },

    // WED 14
    { id: 'slot-w1', day: 'WED', dayNumber: 14, time: '08:00', subject: 'Science', teacher: 'Maliha Noor', room: 'Lab 02', className: 'Class 8', section: 'Section A', type: 'lab', status: 'Assigned' },
    { id: 'slot-w2', day: 'WED', dayNumber: 14, time: '09:00', subject: 'ICT', teacher: 'Rafiq Hasan', room: 'Lab 01', className: 'Class 8', section: 'Section A', type: 'lab', status: 'Assigned' },
    { id: 'slot-w3', day: 'WED', dayNumber: 14, time: '10:00', subject: 'Mathematics', teacher: 'Nusrat Jahan', room: 'Room 204', className: 'Class 8', section: 'Section A', type: 'class', status: 'Assigned' },
    { id: 'slot-w4', day: 'WED', dayNumber: 14, time: '11:00', subject: 'English', teacher: 'Farhan Ahmed', room: 'Room 105', className: 'Class 8', section: 'Section A', type: 'class', status: 'Assigned' },
    { id: 'slot-w5', day: 'WED', dayNumber: 14, time: '12:00', subject: 'History', teacher: 'Sadia Islam', room: 'Room 108', className: 'Class 8', section: 'Section A', type: 'class', status: 'Assigned' },

    // THU 15
    { id: 'slot-th1', day: 'THU', dayNumber: 15, time: '08:00', subject: 'Mid-term Exam', teacher: 'Invigilator', room: 'Main hall', className: 'Class 8', section: 'Section A', type: 'exam', status: 'Assigned' },
    { id: 'slot-th2', day: 'THU', dayNumber: 15, time: '09:00', subject: 'Mid-term Exam', teacher: 'Invigilator', room: 'Main hall', className: 'Class 8', section: 'Section A', type: 'exam', status: 'Assigned' },
    { id: 'slot-th3', day: 'THU', dayNumber: 15, time: '10:00', subject: 'Mathematics', teacher: 'Nusrat Jahan', room: 'Room 204', className: 'Class 8', section: 'Section A', type: 'class', status: 'Assigned' },
    { id: 'slot-th4', day: 'THU', dayNumber: 15, time: '11:00', subject: 'Bangla', teacher: 'Tania Akter', room: 'Room 201', className: 'Class 8', section: 'Section A', type: 'class', status: 'Assigned' },

    // FRI 16
    { id: 'slot-f1', day: 'FRI', dayNumber: 16, time: '08:00', subject: 'Bangla', teacher: 'Tania Akter', room: 'Room 201', className: 'Class 8', section: 'Section A', type: 'class', status: 'Assigned' },
    { id: 'slot-f2', day: 'FRI', dayNumber: 16, time: '09:00', subject: 'Science', teacher: 'Maliha Noor', room: 'Lab 02', className: 'Class 8', section: 'Section A', type: 'lab', status: 'Assigned' },
    { id: 'slot-f3', day: 'FRI', dayNumber: 16, time: '10:00', subject: 'English', teacher: 'Farhan Ahmed', room: 'Room 105', className: 'Class 8', section: 'Section A', type: 'class', status: 'Assigned' },
    { id: 'slot-f4', day: 'FRI', dayNumber: 16, time: '11:00', subject: 'Mathematics', teacher: 'Nusrat Jahan', room: 'Room 204', className: 'Class 8', section: 'Section A', type: 'class', status: 'Assigned' },

    // SAT 17
    { id: 'slot-s1', day: 'SAT', dayNumber: 17, time: '08:00', subject: 'ICT', teacher: 'Rafiq Hasan', room: 'Lab 01', className: 'Class 8', section: 'Section A', type: 'lab', status: 'Assigned' },
    { id: 'slot-s2', day: 'SAT', dayNumber: 17, time: '09:00', subject: 'History', teacher: 'Sadia Islam', room: 'Room 108', className: 'Class 8', section: 'Section A', type: 'class', status: 'Assigned' },
    { id: 'slot-s3', day: 'SAT', dayNumber: 17, time: '10:00', subject: 'Extra Activity', teacher: 'Faculty', room: 'Campus grounds', className: 'Class 8', section: 'Section A', type: 'event', status: 'Assigned' },
  ];

  private dailyPeriods: DailyPeriodRow[] = [
    {
      id: 'dp-1',
      timeSlot: '08:00–08:45',
      className: 'Class 8',
      section: 'A',
      subject: 'Mathematics',
      teacher: 'Nusrat Jahan',
      room: 'Room 204',
      status: 'Assigned',
    },
    {
      id: 'dp-2',
      timeSlot: '08:50–09:35',
      className: 'Class 8',
      section: 'A',
      subject: 'English',
      teacher: 'Farhan Ahmed',
      room: 'Room 105',
      status: 'Assigned',
    },
    {
      id: 'dp-3',
      timeSlot: '09:40–10:25',
      className: 'Class 7',
      section: 'B',
      subject: 'Science',
      teacher: 'Maliha Noor',
      room: 'Lab 02',
      status: 'Conflict',
      conflictReason: 'Science · Class 7B overlaps with another assignment for Maliha Noor at 09:40 AM.',
    },
    {
      id: 'dp-4',
      timeSlot: '10:30–11:15',
      className: 'Class 9',
      section: 'A',
      subject: 'Bangla',
      teacher: 'Tania Akter',
      room: 'Room 201',
      status: 'Assigned',
    },
    {
      id: 'dp-5',
      timeSlot: '11:20–12:05',
      className: 'Class 8',
      section: 'B',
      subject: 'ICT',
      teacher: 'Rafiq Hasan',
      room: 'Lab 01',
      status: 'Assigned',
    },
    {
      id: 'dp-6',
      timeSlot: '12:10–12:55',
      className: 'Class 7',
      section: 'A',
      subject: 'History',
      teacher: 'Sadia Islam',
      room: 'Room 108',
      status: 'Unassigned',
    },
    {
      id: 'dp-7',
      timeSlot: '13:30–14:15',
      className: 'Class 9',
      section: 'B',
      subject: 'Physics',
      teacher: 'Mahmud Karim',
      room: 'Lab 03',
      status: 'Assigned',
    },
  ];

  private teacherWorkloads: TeacherWorkload[] = [
    { id: 'tw-1', teacherName: 'Nusrat Jahan', periodsPerWeek: 18 },
    { id: 'tw-2', teacherName: 'Farhan Ahmed', periodsPerWeek: 16 },
    { id: 'tw-3', teacherName: 'Maliha Noor', periodsPerWeek: 22 },
  ];

  private roomAvailabilities: RoomAvailability[] = [
    { id: 'ra-1', roomName: 'Room 204', statusText: 'Occupied · 08:00–08:45', isBusy: true },
    { id: 'ra-2', roomName: 'Room 105', statusText: 'Available · 09:00 onward', isBusy: false },
    { id: 'ra-3', roomName: 'Lab 02', statusText: 'Occupied · 09:40–10:25', isBusy: true },
  ];

  private academicEvents: AcademicEvent[] = [
    { id: 'ae-1', date: '15 Oct', title: 'Mid-term examinations', type: 'Academic event' },
    { id: 'ae-2', date: '20 Oct', title: 'School holiday', type: 'Holiday' },
    { id: 'ae-3', date: '28 Oct', title: 'Parent–teacher meeting', type: 'Meeting' },
  ];

  private upcomingSchedule: UpcomingScheduleItem[] = [
    { id: 'us-1', timeText: 'Today · 10:30 AM', title: 'Science — Class 8A', location: 'Lab 02' },
    { id: 'us-2', timeText: 'Today · 12:00 PM', title: 'Teacher meeting', location: 'Conference room' },
    { id: 'us-3', timeText: 'Tomorrow · 9:00 AM', title: 'Mathematics — Class 7B', location: 'Room 204' },
    { id: 'us-4', timeText: '15 Oct · All day', title: 'Mid-term exam begins', location: 'Main campus' },
  ];

  private timeSlotConfigs: TimeSlotConfig[] = [
    { id: 'ts-1', label: 'Period 1', timeRange: '08:00–08:45' },
    { id: 'ts-2', label: 'Period 2', timeRange: '08:50–09:35' },
    { id: 'ts-3', label: 'Break', timeRange: '09:35–09:50', isBreak: true },
    { id: 'ts-4', label: 'Period 3', timeRange: '09:50–10:35' },
  ];

  async getKPIs(): Promise<TimetableKPIs> {
    return { ...this.kpis };
  }

  async getWeeklySlots(className?: string, section?: string): Promise<TimetableSlot[]> {
    void className;
    void section;
    return [...this.weeklySlots];
  }

  async getDailyPeriods(date?: string): Promise<DailyPeriodRow[]> {
    void date;
    return [...this.dailyPeriods];
  }

  async getTeacherWorkloads(): Promise<TeacherWorkload[]> {
    return [...this.teacherWorkloads];
  }

  async getRoomAvailabilities(): Promise<RoomAvailability[]> {
    return [...this.roomAvailabilities];
  }

  async getAcademicEvents(): Promise<AcademicEvent[]> {
    return [...this.academicEvents];
  }

  async getUpcomingSchedule(): Promise<UpcomingScheduleItem[]> {
    return [...this.upcomingSchedule];
  }

  async getTimeSlotConfigs(): Promise<TimeSlotConfig[]> {
    return [...this.timeSlotConfigs];
  }

  async saveSchedule(data: ScheduleFormData): Promise<void> {
    this.weeklySlots.push({
      id: `slot-${Date.now()}`,
      day: (data.day.slice(0, 3).toUpperCase() as 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT') || 'MON',
      dayNumber: 12,
      time: data.startTime.slice(0, 5),
      subject: data.subject,
      teacher: data.teacher,
      room: data.classroom,
      className: 'Class 8',
      section: 'Section A',
      type: 'class',
      status: 'Assigned',
    });
  }

  async deleteSchedule(slotId: string): Promise<void> {
    this.weeklySlots = this.weeklySlots.filter((s) => s.id !== slotId);
  }
}

export const mockTimetableRepository = new MockTimetableRepository();
