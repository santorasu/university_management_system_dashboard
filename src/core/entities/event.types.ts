export type EventCategory =
  | 'Academic'
  | 'Holiday'
  | 'Sports'
  | 'Cultural'
  | 'School event'
  | 'Meeting'
  | 'Admission';

export type EventStatus = 'Published' | 'Draft' | 'Scheduled' | 'Completed';

export interface SchoolEvent {
  id: string;
  title: string;
  category: EventCategory | string;
  date: string; // e.g. "20 Oct 2026", "22 Oct 2026", "26–30 Oct 2026"
  rawDate?: string; // e.g. "2026-10-20"
  startTime: string; // e.g. "09:00 AM"
  endTime: string; // e.g. "11:00 AM"
  timeRange: string; // e.g. "09:00–11:00", "All day"
  audience: string; // e.g. "Parents · Class 6–8", "All school community", "Students · Class 6–10"
  organizer: string; // e.g. "Academic Office", "Exam Committee", "Sports Dept."
  location: string; // e.g. "Main auditorium", "Campus Grounds", "Sports Complex"
  status: EventStatus;
  description?: string;
  attendeeCount?: number;
}

export interface EventKpiStats {
  totalEvents: number;
  totalEventsSubtext: string;
  upcomingEvents: number;
  upcomingEventsSubtext: string;
  thisMonthEvents: number;
  thisMonthEventsSubtext: string;
  completedEvents: number;
  completedEventsSubtext: string;
}

export interface EventFilterOptions {
  searchQuery: string;
  category: string;
  status: string;
}

export type EventsSubScreen =
  | 'EVENTS_CALENDAR'
  | 'EVENTS_DIRECTORY';
