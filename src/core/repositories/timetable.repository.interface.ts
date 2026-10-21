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
} from '../entities/timetable.types';

export interface ITimetableRepository {
  getKPIs(): Promise<TimetableKPIs>;
  getWeeklySlots(className?: string, section?: string): Promise<TimetableSlot[]>;
  getDailyPeriods(date?: string): Promise<DailyPeriodRow[]>;
  getTeacherWorkloads(): Promise<TeacherWorkload[]>;
  getRoomAvailabilities(): Promise<RoomAvailability[]>;
  getAcademicEvents(): Promise<AcademicEvent[]>;
  getUpcomingSchedule(): Promise<UpcomingScheduleItem[]>;
  getTimeSlotConfigs(): Promise<TimeSlotConfig[]>;
  saveSchedule(data: ScheduleFormData): Promise<void>;
  deleteSchedule(slotId: string): Promise<void>;
}
