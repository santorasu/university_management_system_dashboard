import React from 'react';
import { useEventsFlow } from '../../../../application/state/events-flow.context';

export const EventsKpiCards: React.FC = () => {
  const { kpis } = useEventsFlow();

  return (
    <div className="events-kpis-grid">
      {/* Total events */}
      <div className="events-kpi-card events-kpi-card--blue">
        <span className="events-kpi-card__label">Total events</span>
        <div className="events-kpi-card__value">
          {kpis?.totalEvents ?? 24}
        </div>
        <span className="events-kpi-card__subtext">
          {kpis?.totalEventsSubtext || 'Academic year 2026–27'}
        </span>
      </div>

      {/* Upcoming */}
      <div className="events-kpi-card events-kpi-card--green">
        <span className="events-kpi-card__label">Upcoming</span>
        <div className="events-kpi-card__value">
          {kpis?.upcomingEvents ?? 8}
        </div>
        <span className="events-kpi-card__subtext">
          {kpis?.upcomingEventsSubtext || 'Next 30 days'}
        </span>
      </div>

      {/* This month */}
      <div className="events-kpi-card events-kpi-card--amber">
        <span className="events-kpi-card__label">This month</span>
        <div className="events-kpi-card__value">
          {kpis?.thisMonthEvents ?? 6}
        </div>
        <span className="events-kpi-card__subtext">
          {kpis?.thisMonthEventsSubtext || 'October 2026'}
        </span>
      </div>

      {/* Completed */}
      <div className="events-kpi-card events-kpi-card--neutral">
        <span className="events-kpi-card__label">Completed</span>
        <div className="events-kpi-card__value">
          {kpis?.completedEvents ?? 16}
        </div>
        <span className="events-kpi-card__subtext">
          {kpis?.completedEventsSubtext || 'Past activities'}
        </span>
      </div>
    </div>
  );
};
