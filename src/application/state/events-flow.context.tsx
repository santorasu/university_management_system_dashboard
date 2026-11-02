import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type {
  SchoolEvent,
  EventFilterOptions,
  EventKpiStats,
  EventsSubScreen,
} from '../../core/entities/event.types';
import { MockEventRepository } from '../../infrastructure/repositories/mock-event.repository';

interface EventsFlowContextValue {
  subScreen: EventsSubScreen;
  events: SchoolEvent[];
  selectedEvent: SchoolEvent | null;
  kpis: EventKpiStats | null;
  isLoading: boolean;
  toast: { type: 'success' | 'error' | 'info'; message: string } | null;

  // Filters
  eventFilters: EventFilterOptions;
  setSearchQuery: (q: string) => void;
  setCategory: (c: string) => void;
  setStatus: (s: string) => void;
  resetFilters: () => void;

  // Navigation
  goToCalendar: () => void;
  goToDirectory: () => void;
  selectEvent: (event: SchoolEvent) => void;

  // Modals
  eventSavedModalOpen: boolean;
  openEventSavedModal: () => void;
  closeEventSavedModal: () => void;

  // Actions
  saveEvent: (event: Partial<SchoolEvent>) => Promise<boolean>;
  deleteEvent: (id: string) => Promise<boolean>;
  showToast: (type: 'success' | 'error' | 'info', message: string) => void;
  clearToast: () => void;
}

const EventsFlowContext = createContext<EventsFlowContextValue | undefined>(undefined);

const repository = new MockEventRepository();

export const EventsFlowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [subScreen, setSubScreen] = useState<EventsSubScreen>('EVENTS_CALENDAR');
  const [events, setEvents] = useState<SchoolEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<SchoolEvent | null>(null);
  const [kpis, setKpis] = useState<EventKpiStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);

  const [eventSavedModalOpen, setEventSavedModalOpen] = useState(false);

  const [eventFilters, setEventFilters] = useState<EventFilterOptions>({
    searchQuery: '',
    category: 'All categories',
    status: 'All statuses',
  });

  const showToast = useCallback((type: 'success' | 'error' | 'info', message: string) => {
    setToast({ type, message });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  }, []);

  const clearToast = useCallback(() => setToast(null), []);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [fetchedEvents, fetchedKpis] = await Promise.all([
        repository.getEvents(eventFilters),
        repository.getEventKpiStats(),
      ]);
      setEvents(fetchedEvents);
      setKpis(fetchedKpis);
      if (!selectedEvent && fetchedEvents.length > 0) {
        setSelectedEvent(fetchedEvents[0]);
      }
    } finally {
      setIsLoading(false);
    }
  }, [eventFilters, selectedEvent]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Filter Setters
  const setSearchQuery = (q: string) => setEventFilters((prev) => ({ ...prev, searchQuery: q }));
  const setCategory = (c: string) => setEventFilters((prev) => ({ ...prev, category: c }));
  const setStatus = (s: string) => setEventFilters((prev) => ({ ...prev, status: s }));
  const resetFilters = () =>
    setEventFilters({
      searchQuery: '',
      category: 'All categories',
      status: 'All statuses',
    });

  // Navigation Handlers
  const goToCalendar = () => setSubScreen('EVENTS_CALENDAR');
  const goToDirectory = () => setSubScreen('EVENTS_DIRECTORY');
  const selectEvent = (event: SchoolEvent) => {
    setSelectedEvent(event);
    setSubScreen('EVENTS_CALENDAR');
  };

  // Modals
  const openEventSavedModal = () => setEventSavedModalOpen(true);
  const closeEventSavedModal = () => setEventSavedModalOpen(false);

  // Operations
  const saveEvent = async (event: Partial<SchoolEvent>): Promise<boolean> => {
    try {
      const saved = await repository.saveEvent(event);
      showToast('success', `Event "${saved.title}" saved successfully`);
      await loadData();
      openEventSavedModal();
      return true;
    } catch {
      showToast('error', 'Failed to save event.');
      return false;
    }
  };

  const deleteEvent = async (id: string): Promise<boolean> => {
    try {
      const ok = await repository.deleteEvent(id);
      if (ok) {
        showToast('info', 'Event deleted from calendar');
        await loadData();
        return true;
      }
      return false;
    } catch {
      showToast('error', 'Failed to delete event');
      return false;
    }
  };

  return (
    <EventsFlowContext.Provider
      value={{
        subScreen,
        events,
        selectedEvent,
        kpis,
        isLoading,
        toast,
        eventFilters,
        setSearchQuery,
        setCategory,
        setStatus,
        resetFilters,
        goToCalendar,
        goToDirectory,
        selectEvent,
        eventSavedModalOpen,
        openEventSavedModal,
        closeEventSavedModal,
        saveEvent,
        deleteEvent,
        showToast,
        clearToast,
      }}
    >
      {children}
    </EventsFlowContext.Provider>
  );
};

export const useEventsFlow = (): EventsFlowContextValue => {
  const context = useContext(EventsFlowContext);
  if (!context) {
    throw new Error('useEventsFlow must be used within an EventsFlowProvider');
  }
  return context;
};
