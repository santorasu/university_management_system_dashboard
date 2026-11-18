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
    <div className="academic-kpis-grid">
      <div className="academic-kpi-card">
        <span className="academic-kpi-card__label">Total students</span>
        <span className="academic-kpi-card__value">
          {currentStats.totalStudents.toLocaleString()}
        </span>
        <span className="academic-kpi-card__subtext" style={{ color: 'var(--edusync-brand-primary, #3659D9)' }}>
          {currentStats.totalStudentsChange}
        </span>
      </div>

      <div className="academic-kpi-card">
        <span className="academic-kpi-card__label">Active</span>
        <span className="academic-kpi-card__value">
          {currentStats.activeStudents.toLocaleString()}
        </span>
        <span className="academic-kpi-card__subtext" style={{ color: '#15803D' }}>
          <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: '#15803D', marginRight: 4 }}></span>
          {currentStats.activeEnrollmentPct}
        </span>
      </div>

      <div className="academic-kpi-card">
        <span className="academic-kpi-card__label">Inactive</span>
        <span className="academic-kpi-card__value">{currentStats.inactiveStudents}</span>
        <span className="academic-kpi-card__subtext academic-kpi-card__subtext--review" style={{ color: '#B45309' }}>
          {currentStats.inactiveLabel}
        </span>
      </div>

      <div className="academic-kpi-card">
        <span className="academic-kpi-card__label">New this month</span>
        <span className="academic-kpi-card__value">{currentStats.newThisMonth}</span>
        <span className="academic-kpi-card__subtext academic-kpi-card__subtext--neutral" style={{ color: 'var(--edusync-text-secondary, #667085)' }}>
          {currentStats.newThisMonthLabel}
        </span>
      </div>
    </div>
  );
};
