import React, { createContext, useContext, useState, useEffect } from 'react';
import type {
  TimetableSubScreen,
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
import { mockTimetableRepository } from '../../infrastructure/repositories/mock-timetable.repository';

interface TimetableContextType {
  subScreen: TimetableSubScreen;
  kpis: TimetableKPIs | null;
  weeklySlots: TimetableSlot[];
  dailyPeriods: DailyPeriodRow[];
  teacherWorkloads: TeacherWorkload[];
  roomAvailabilities: RoomAvailability[];
  academicEvents: AcademicEvent[];
  upcomingSchedule: UpcomingScheduleItem[];
  timeSlotConfigs: TimeSlotConfig[];
  isLoading: boolean;

  // Selected State
  selectedSlot: TimetableSlot | null;
  setSelectedSlot: (slot: TimetableSlot | null) => void;
  selectedClass: string;
  setSelectedClass: (c: string) => void;
  selectedSection: string;
  setSelectedSection: (s: string) => void;
  selectedDay: string;
  setSelectedDay: (d: string) => void;
  selectedTeacher: string;
  setSelectedTeacher: (t: string) => void;
  selectedDate: string;
  setSelectedDate: (dt: string) => void;
  viewMode: 'class' | 'teacher';
  setViewMode: (vm: 'class' | 'teacher') => void;

  // Conflict state
  isConflictDismissed: boolean;
  dismissConflict: () => void;

  // Navigation
  goToWeeklyOverview: () => void;
  goToDailyView: () => void;
  goToClassTeacherViews: () => void;
  goToScheduleBuilder: () => void;

  // Actions
  saveNewSchedule: (data: ScheduleFormData) => Promise<boolean>;
  deleteSelectedSlot: (id: string) => Promise<void>;

  // Modals & Feedback
  isAddEventModalOpen: boolean;
  openAddEventModal: () => void;
  closeAddEventModal: () => void;
  toastNotification: { type: 'success' | 'error'; message: string } | null;
  showToast: (type: 'success' | 'error', message: string) => void;
  clearToast: () => void;
}

const TimetableContext = createContext<TimetableContextType | undefined>(undefined);

export const TimetableFlowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [subScreen, setSubScreen] = useState<TimetableSubScreen>('WEEKLY_OVERVIEW');
  const [kpis, setKpis] = useState<TimetableKPIs | null>(null);
  const [weeklySlots, setWeeklySlots] = useState<TimetableSlot[]>([]);
  const [dailyPeriods, setDailyPeriods] = useState<DailyPeriodRow[]>([]);
  const [teacherWorkloads, setTeacherWorkloads] = useState<TeacherWorkload[]>([]);
  const [roomAvailabilities, setRoomAvailabilities] = useState<RoomAvailability[]>([]);
  const [academicEvents, setAcademicEvents] = useState<AcademicEvent[]>([]);
  const [upcomingSchedule, setUpcomingSchedule] = useState<UpcomingScheduleItem[]>([]);
  const [timeSlotConfigs, setTimeSlotConfigs] = useState<TimeSlotConfig[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Filters & Selected State
  const [selectedSlot, setSelectedSlot] = useState<TimetableSlot | null>(null);
  const [selectedClass, setSelectedClass] = useState('Class 8');
  const [selectedSection, setSelectedSection] = useState('Section A');
  const [selectedDay, setSelectedDay] = useState('All days');
  const [selectedTeacher, setSelectedTeacher] = useState('All teachers');
  const [selectedDate, setSelectedDate] = useState('Monday, 12 October 2026');
  const [viewMode, setViewMode] = useState<'class' | 'teacher'>('class');
  const [isConflictDismissed, setIsConflictDismissed] = useState(false);

  // Modals
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
  const [toastNotification, setToastNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [k, slots, dp, tw, ra, ae, us, ts] = await Promise.all([
        mockTimetableRepository.getKPIs(),
        mockTimetableRepository.getWeeklySlots(),
        mockTimetableRepository.getDailyPeriods(),
        mockTimetableRepository.getTeacherWorkloads(),
        mockTimetableRepository.getRoomAvailabilities(),
        mockTimetableRepository.getAcademicEvents(),
        mockTimetableRepository.getUpcomingSchedule(),
        mockTimetableRepository.getTimeSlotConfigs(),
      ]);
      setKpis(k);
      setWeeklySlots(slots);
      setDailyPeriods(dp);
      setTeacherWorkloads(tw);
      setRoomAvailabilities(ra);
      setAcademicEvents(ae);
      setUpcomingSchedule(us);
      setTimeSlotConfigs(ts);
      setSelectedSlot(slots[0] || null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const goToWeeklyOverview = () => setSubScreen('WEEKLY_OVERVIEW');
  const goToDailyView = () => setSubScreen('DAILY_VIEW');
  const goToClassTeacherViews = () => setSubScreen('CLASS_TEACHER_VIEWS');
  const goToScheduleBuilder = () => setSubScreen('SCHEDULE_BUILDER');

  const openAddEventModal = () => setIsAddEventModalOpen(true);
  const closeAddEventModal = () => setIsAddEventModalOpen(false);

  const dismissConflict = () => {
    setIsConflictDismissed(true);
    showToast('success', 'Conflict review noted.');
  };

  const showToast = (type: 'success' | 'error', message: string) => {
    setToastNotification({ type, message });
    setTimeout(() => {
      setToastNotification(null);
    }, 4000);
  };

  const clearToast = () => setToastNotification(null);

  const saveNewSchedule = async (data: ScheduleFormData): Promise<boolean> => {
    try {
      if (!data.subject || !data.teacher) {
        showToast('error', 'Please fill in required fields.');
        return false;
      }
      await mockTimetableRepository.saveSchedule(data);
      const updated = await mockTimetableRepository.getWeeklySlots();
      setWeeklySlots(updated);
      showToast('success', 'Schedule period saved successfully.');
      return true;
    } catch {
      showToast('error', 'Unable to save schedule. Try again.');
      return false;
    }
  };

  const deleteSelectedSlot = async (id: string) => {
    await mockTimetableRepository.deleteSchedule(id);
    const updated = await mockTimetableRepository.getWeeklySlots();
    setWeeklySlots(updated);
    if (selectedSlot?.id === id) {
      setSelectedSlot(updated[0] || null);
    }
    showToast('success', 'Assignment removed from timetable.');
  };

  return (
    <TimetableContext.Provider
      value={{
        subScreen,
        kpis,
        weeklySlots,
        dailyPeriods,
        teacherWorkloads,
        roomAvailabilities,
        academicEvents,
        upcomingSchedule,
        timeSlotConfigs,
        isLoading,
        selectedSlot,
        setSelectedSlot,
        selectedClass,
        setSelectedClass,
        selectedSection,
        setSelectedSection,
        selectedDay,
        setSelectedDay,
        selectedTeacher,
        setSelectedTeacher,
        selectedDate,
        setSelectedDate,
        viewMode,
        setViewMode,
        isConflictDismissed,
        dismissConflict,
        goToWeeklyOverview,
        goToDailyView,
        goToClassTeacherViews,
        goToScheduleBuilder,
        saveNewSchedule,
        deleteSelectedSlot,
        isAddEventModalOpen,
        openAddEventModal,
        closeAddEventModal,
        toastNotification,
        showToast,
        clearToast,
      }}
    >
      {children}
    </TimetableContext.Provider>
  );
};

export const useTimetableFlow = (): TimetableContextType => {
  const context = useContext(TimetableContext);
  if (!context) {
    throw new Error('useTimetableFlow must be used within a TimetableFlowProvider');
  }
  return context;
};
