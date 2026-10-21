export type TimetableSubScreen =
  | 'WEEKLY_OVERVIEW'
  | 'DAILY_VIEW'
  | 'CLASS_TEACHER_VIEWS'
  | 'SCHEDULE_BUILDER';

export interface TimetableKPIs {
  classesScheduled: number;
  daysSpanText: string;
  teachersAssigned: number;
  pendingPeriodsText: string;
  roomsInUse: number;
  availableRoomsText: string;
  conflictsCount: number;
  conflictsStatusText: string;
}

export interface TimetableSlot {
  id: string;
  day: 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT';
  dayNumber: number; // e.g. 12, 13, 14, 15, 16, 17
  time: string; // '08:00', '09:00', '10:00', '11:00', '12:00', '13:00'
  subject: string;
  teacher: string;
  room: string;
  className: string;
  section: string;
  type: 'class' | 'lab' | 'exam' | 'event';
  status: 'Assigned' | 'Conflict' | 'Unassigned';
}

export interface DailyPeriodRow {
  id: string;
  timeSlot: string; // '08:00–08:45'
  className: string;
  section: string;
  subject: string;
  teacher: string;
  room: string;
  status: 'Assigned' | 'Conflict' | 'Unassigned';
  conflictReason?: string;
}

export interface TeacherWorkload {
  id: string;
  teacherName: string;
  periodsPerWeek: number;
}

export interface RoomAvailability {
  id: string;
  roomName: string;
  statusText: string;
  isBusy: boolean;
}

export interface AcademicEvent {
  id: string;
  date: string;
  title: string;
  type: 'Academic event' | 'Holiday' | 'Meeting';
}

export interface UpcomingScheduleItem {
  id: string;
  timeText: string;
  title: string;
  location: string;
}

export interface TimeSlotConfig {
  id: string;
  label: string;
  timeRange: string;
  isBreak?: boolean;
}

export interface ScheduleFormData {
  subject: string;
  teacher: string;
  classroom: string;
  day: string;
  startTime: string;
  endTime: string;
  periodLabel: string;
  repeatDays: string[];
}
