import React from 'react';
import { useTimetableFlow } from '../../../../application/state/timetable-flow.context';

export const TimetableKpis: React.FC = () => {
  const { kpis } = useTimetableFlow();

  const classesCount = kpis?.classesScheduled ?? 42;
  const daysSpan = kpis?.daysSpanText ?? 'Across 6 days';
  const teachersCount = kpis?.teachersAssigned ?? 28;
  const pendingPeriods = kpis?.pendingPeriodsText ?? '2 periods to assign';
  const roomsCount = kpis?.roomsInUse ?? 16;
  const roomsAvail = kpis?.availableRoomsText ?? '4 rooms available';
  const conflictsCount = kpis?.conflictsCount ?? 2;
  const conflictsStatus = kpis?.conflictsStatusText ?? 'Needs review';

  return (
    <div className="timetable-kpis-grid">
      <div className="timetable-kpi-card">
        <span className="timetable-kpi-card__label">Classes scheduled</span>
        <span className="timetable-kpi-card__value">{classesCount}</span>
        <span className="timetable-kpi-card__subtext">{daysSpan}</span>
      </div>

      <div className="timetable-kpi-card">
        <span className="timetable-kpi-card__label">Teachers assigned</span>
        <span className="timetable-kpi-card__value">{teachersCount}</span>
        <span className="timetable-kpi-card__subtext timetable-kpi-card__subtext--warning">
          {pendingPeriods}
        </span>
      </div>

      <div className="timetable-kpi-card">
        <span className="timetable-kpi-card__label">Rooms in use</span>
        <span className="timetable-kpi-card__value">{roomsCount}</span>
        <span className="timetable-kpi-card__subtext">{roomsAvail}</span>
      </div>

      <div className="timetable-kpi-card">
        <span className="timetable-kpi-card__label">Schedule conflicts</span>
        <span className="timetable-kpi-card__value" style={{ color: '#DC2626' }}>
          {conflictsCount}
        </span>
        <span className="timetable-kpi-card__subtext timetable-kpi-card__subtext--danger">
          {conflictsStatus}
        </span>
      </div>
    </div>
  );
};
