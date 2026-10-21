import React from 'react';
import { useAttendanceFlow } from '../../../../application/state/attendance-flow.context';

export const AttendanceKpis: React.FC = () => {
  const { kpis } = useAttendanceFlow();

  const presentToday = kpis?.presentToday ?? 1142;
  const presentPct = kpis?.presentPercentage ?? 91.4;
  const absentCount = kpis?.absentCount ?? 76;
  const absentPct = kpis?.absentPercentage ?? 6.1;
  const lateCount = kpis?.lateCount ?? 31;
  const latePct = kpis?.latePercentage ?? 2.5;
  const classesRec = kpis?.classesRecorded ?? 38;
  const totalCls = kpis?.totalClasses ?? 42;
  const pendingCls = kpis?.pendingClasses ?? 4;

  return (
    <div className="attendance-kpis-grid">
      <div className="attendance-kpi-card">
        <span className="attendance-kpi-card__label">Present today</span>
        <span className="attendance-kpi-card__value">{presentToday.toLocaleString()}</span>
        <span className="attendance-kpi-card__subtext attendance-kpi-card__subtext--green">
          <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: '#15803D' }}></span>
          {presentPct}% of students
        </span>
      </div>

      <div className="attendance-kpi-card">
        <span className="attendance-kpi-card__label">Absent</span>
        <span className="attendance-kpi-card__value">{absentCount}</span>
        <span className="attendance-kpi-card__subtext attendance-kpi-card__subtext--red">
          <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: '#DC2626' }}></span>
          {absentPct}% of students
        </span>
      </div>

      <div className="attendance-kpi-card">
        <span className="attendance-kpi-card__label">Late</span>
        <span className="attendance-kpi-card__value">{lateCount}</span>
        <span className="attendance-kpi-card__subtext attendance-kpi-card__subtext--amber">
          <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: '#B45309' }}></span>
          {latePct}% of students
        </span>
      </div>

      <div className="attendance-kpi-card">
        <span className="attendance-kpi-card__label">Classes recorded</span>
        <span className="attendance-kpi-card__value">{classesRec} / {totalCls}</span>
        <span className="attendance-kpi-card__subtext attendance-kpi-card__subtext--neutral">
          {pendingCls} pending
        </span>
      </div>
    </div>
  );
};
