import React from 'react';
import type { StudentStats } from '../../../../core/entities/student.types';

interface StudentKpiCardsProps {
  stats: StudentStats | null;
  mode?: 'consolidated' | 'directory';
}

export const StudentKpiCards: React.FC<StudentKpiCardsProps> = ({ stats, mode = 'consolidated' }) => {
  const defaultStats: StudentStats = {
    totalStudents: 1248,
    totalStudentsChange: mode === 'directory' ? '+8.2% this term' : '+8.2%',
    activeStudents: 1196,
    activeEnrollmentPct: '95.8% enrolled',
    inactiveStudents: 32,
    inactiveLabel: 'Needs review',
    newThisMonth: 24,
    newThisMonthLabel: mode === 'directory' ? 'Across 6 classes' : '6 classes',
  };

  const currentStats = stats || defaultStats;

  return (
    <div className="edusync-student-kpis">
      <div className="edusync-student-kpi-card">
        <div className="edusync-student-kpi-card__top">
          <span className="edusync-student-kpi-card__label">Total students</span>
        </div>
        <div className="edusync-student-kpi-card__value-wrap">
          <span className="edusync-student-kpi-card__value">
            {currentStats.totalStudents.toLocaleString()}
          </span>
          <span className="edusync-student-kpi-card__pill edusync-student-kpi-card__pill--primary">
            {currentStats.totalStudentsChange}
          </span>
        </div>
      </div>

      <div className="edusync-student-kpi-card">
        <div className="edusync-student-kpi-card__top">
          <span className="edusync-student-kpi-card__label">Active</span>
        </div>
        <div className="edusync-student-kpi-card__value-wrap">
          <span className="edusync-student-kpi-card__value">
            {currentStats.activeStudents.toLocaleString()}
          </span>
          <span className="edusync-student-kpi-card__pill edusync-student-kpi-card__pill--success">
            {currentStats.activeEnrollmentPct}
          </span>
        </div>
      </div>

      <div className="edusync-student-kpi-card">
        <div className="edusync-student-kpi-card__top">
          <span className="edusync-student-kpi-card__label">Inactive</span>
        </div>
        <div className="edusync-student-kpi-card__value-wrap">
          <span className="edusync-student-kpi-card__value">{currentStats.inactiveStudents}</span>
          <span className="edusync-student-kpi-card__pill edusync-student-kpi-card__pill--warning">
            {currentStats.inactiveLabel}
          </span>
        </div>
      </div>

      <div className="edusync-student-kpi-card">
        <div className="edusync-student-kpi-card__top">
          <span className="edusync-student-kpi-card__label">New this month</span>
        </div>
        <div className="edusync-student-kpi-card__value-wrap">
          <span className="edusync-student-kpi-card__value">{currentStats.newThisMonth}</span>
          <span className="edusync-student-kpi-card__pill edusync-student-kpi-card__pill--neutral">
            {currentStats.newThisMonthLabel}
          </span>
        </div>
      </div>
    </div>
  );
};
