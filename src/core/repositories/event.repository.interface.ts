import type {
  SchoolEvent,
  EventFilterOptions,
  EventKpiStats,
} from '../entities/event.types';

export interface IEventRepository {
  getEvents(filters?: EventFilterOptions): Promise<SchoolEvent[]>;
  getEventById(id: string): Promise<SchoolEvent | null>;
  saveEvent(event: Partial<SchoolEvent>): Promise<SchoolEvent>;
  deleteEvent(id: string): Promise<boolean>;
  getEventKpiStats(): Promise<EventKpiStats>;
}
