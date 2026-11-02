import type {
  SchoolEvent,
  EventFilterOptions,
  EventKpiStats,
} from '../../core/entities/event.types';
import type { IEventRepository } from '../../core/repositories/event.repository.interface';

export class MockEventRepository implements IEventRepository {
  private events: SchoolEvent[] = [
    {
      id: 'EVT-001',
      title: 'Parent–Teacher Meeting',
      category: 'Meeting',
      date: '20 Oct 2026',
      rawDate: '2026-10-20',
      startTime: '09:00 AM',
      endTime: '11:00 AM',
      timeRange: '09:00–11:00',
      audience: 'Parents · Class 6–8',
      organizer: 'Academic Office',
      location: 'Main auditorium',
      status: 'Published',
      description: 'Term 1 progress review and parent-teacher collaboration session.',
      attendeeCount: 180,
    },
    {
      id: 'EVT-002',
      title: 'Term 1 Examination',
      category: 'Academic',
      date: '22 Oct 2026',
      rawDate: '2026-10-22',
      startTime: '10:00 AM',
      endTime: '01:00 PM',
      timeRange: '10:00–13:00',
      audience: 'Students · Class 6–10',
      organizer: 'Exam Committee',
      location: 'Examination Halls A & B',
      status: 'Published',
      description: 'Midterm written assessments across enrolled classes.',
      attendeeCount: 420,
    },
    {
      id: 'EVT-003',
      title: 'Cultural Day',
      category: 'Cultural',
      date: '28 Oct 2026',
      rawDate: '2026-10-28',
      startTime: '08:30 AM',
      endTime: '03:00 PM',
      timeRange: '08:30–15:00',
      audience: 'All school community',
      organizer: 'Cultural Club',
      location: 'Campus Open Arena',
      status: 'Published',
      description: 'Annual cultural festival with drama, music, and art exhibits.',
      attendeeCount: 650,
    },
    {
      id: 'EVT-004',
      title: 'School Holiday',
      category: 'Holiday',
      date: '01 Nov 2026',
      rawDate: '2026-11-01',
      startTime: '08:00 AM',
      endTime: '05:00 PM',
      timeRange: 'All day',
      audience: 'All audiences',
      organizer: 'Administration',
      location: 'Campus Wide',
      status: 'Published',
      description: 'Scheduled school holiday for students and faculty.',
    },
    {
      id: 'EVT-005',
      title: 'Science Exhibition',
      category: 'School event',
      date: '04 Nov 2026',
      rawDate: '2026-11-04',
      startTime: '10:00 AM',
      endTime: '03:30 PM',
      timeRange: '10:00–15:30',
      audience: 'Students & Parents',
      organizer: 'Science Dept.',
      location: 'Science Labs & Atrium',
      status: 'Draft',
      description: 'Interactive STEM science model demonstrations and competition.',
      attendeeCount: 220,
    },
    {
      id: 'EVT-006',
      title: 'Annual Sports Meet',
      category: 'Sports',
      date: '19 Oct 2026',
      rawDate: '2026-10-19',
      startTime: '09:00 AM',
      endTime: '04:00 PM',
      timeRange: '09:00–16:00',
      audience: 'Students & Parents',
      organizer: 'Sports Committee',
      location: 'Athletic Field',
      status: 'Published',
      description: 'Annual inter-house athletic competition and track events.',
      attendeeCount: 500,
    },
    {
      id: 'EVT-007',
      title: 'Weekly Morning Assembly',
      category: 'School event',
      date: '06 Oct 2026',
      rawDate: '2026-10-06',
      startTime: '08:00 AM',
      endTime: '09:00 AM',
      timeRange: '08:00–09:00',
      audience: 'All school community',
      organizer: 'Principal Office',
      location: 'School Courtyard',
      status: 'Completed',
      description: 'Weekly assembly and merit awards recognition.',
    },
    {
      id: 'EVT-008',
      title: 'Library Reading Week',
      category: 'Academic',
      date: '16–20 Nov 2026',
      rawDate: '2026-11-16',
      startTime: '09:00 AM',
      endTime: '02:00 PM',
      timeRange: '09:00–14:00',
      audience: 'Enrolled Students',
      organizer: 'Library Team',
      location: 'Central Library',
      status: 'Published',
      description: 'Book fairs, author visits, and reading marathons.',
    },
    {
      id: 'EVT-009',
      title: 'Winter Cultural Program',
      category: 'Cultural',
      date: '28 Nov 2026',
      rawDate: '2026-11-28',
      startTime: '05:00 PM',
      endTime: '08:30 PM',
      timeRange: '17:00–20:30',
      audience: 'All school community',
      organizer: 'Cultural Club',
      location: 'Main Auditorium',
      status: 'Draft',
      description: 'Musical performances and annual winter theatrical play.',
    },
    {
      id: 'EVT-010',
      title: 'Admission Orientation',
      category: 'Admission',
      date: '03 Dec 2026',
      rawDate: '2026-12-03',
      startTime: '10:00 AM',
      endTime: '12:30 PM',
      timeRange: '10:00–12:30',
      audience: 'Prospective Parents',
      organizer: 'Admission Office',
      location: 'Conference Hall',
      status: 'Scheduled',
      description: 'Information session on 2027 enrollment requirements and campus tours.',
    },
    {
      id: 'EVT-011',
      title: 'Final Examination Briefing',
      category: 'Academic',
      date: '06 Dec 2026',
      rawDate: '2026-12-06',
      startTime: '11:00 AM',
      endTime: '01:00 PM',
      timeRange: '11:00–13:00',
      audience: 'Faculty & Staff',
      organizer: 'Exam Committee',
      location: 'Staff Lounge',
      status: 'Scheduled',
      description: 'Operational guidelines and proctor scheduling for final exams.',
    },
  ];

  async getEvents(filters?: EventFilterOptions): Promise<SchoolEvent[]> {
    return this.events.filter((evt) => {
      if (filters?.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        const matches =
          evt.title.toLowerCase().includes(q) ||
          evt.category.toLowerCase().includes(q) ||
          evt.organizer.toLowerCase().includes(q) ||
          evt.location.toLowerCase().includes(q) ||
          evt.audience.toLowerCase().includes(q);
        if (!matches) return false;
      }
      if (filters?.category && filters.category !== 'All categories') {
        if (evt.category.toLowerCase() !== filters.category.toLowerCase()) return false;
      }
      if (filters?.status && filters.status !== 'All statuses') {
        if (evt.status.toLowerCase() !== filters.status.toLowerCase()) return false;
      }
      return true;
    });
  }

  async getEventById(id: string): Promise<SchoolEvent | null> {
    return this.events.find((e) => e.id === id) || null;
  }

  async saveEvent(event: Partial<SchoolEvent>): Promise<SchoolEvent> {
    if (event.id) {
      const idx = this.events.findIndex((e) => e.id === event.id);
      if (idx !== -1) {
        this.events[idx] = { ...this.events[idx], ...event } as SchoolEvent;
        return this.events[idx];
      }
    }
    const newEvt: SchoolEvent = {
      id: `EVT-0${this.events.length + 1}`,
      title: event.title || 'Untitled Event',
      category: event.category || 'Academic',
      date: event.date || '20 Oct 2026',
      startTime: event.startTime || '09:00 AM',
      endTime: event.endTime || '11:00 AM',
      timeRange: event.timeRange || `${event.startTime || '09:00'}–${event.endTime || '11:00'}`,
      audience: event.audience || 'All school community',
      organizer: event.organizer || 'Academic Office',
      location: event.location || 'Main auditorium',
      status: event.status || 'Published',
      description: event.description,
      attendeeCount: event.attendeeCount || 0,
    };
    this.events.unshift(newEvt);
    return newEvt;
  }

  async deleteEvent(id: string): Promise<boolean> {
    const idx = this.events.findIndex((e) => e.id === id);
    if (idx !== -1) {
      this.events.splice(idx, 1);
      return true;
    }
    return false;
  }

  async getEventKpiStats(): Promise<EventKpiStats> {
    return {
      totalEvents: 24,
      totalEventsSubtext: 'Academic year 2026–27',
      upcomingEvents: 8,
      upcomingEventsSubtext: 'Next 30 days',
      thisMonthEvents: 6,
      thisMonthEventsSubtext: 'October 2026',
      completedEvents: 16,
      completedEventsSubtext: 'Past activities',
    };
  }
}
