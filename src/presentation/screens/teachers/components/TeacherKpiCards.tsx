import React from 'react';
import type { TeacherStats } from '../../../../core/entities/teacher.types';

interface TeacherKpiCardsProps {
  stats: TeacherStats | null;
}

export const TeacherKpiCards: React.FC<TeacherKpiCardsProps> = ({ stats }) => {
  const defaultStats: TeacherStats = {
    totalTeachers: 86,
    totalTeachersChange: '+4 this academic year',
    activeTeachers: 79,
    activeTeachersPct: '91.9% of faculty',
    onLeaveTeachers: 4,
    onLeaveLabel: 'Current leave records',
    subjectsCovered: 24,
    subjectsCoveredLabel: 'Across 12 grades',
  };

  const currentStats = stats || defaultStats;

  return (
    <div className="academic-kpis-grid">
      <div className="academic-kpi-card">
        <span className="academic-kpi-card__label">Total teachers</span>
        <span className="academic-kpi-card__value">{currentStats.totalTeachers}</span>
        <span className="academic-kpi-card__subtext" style={{ color: 'var(--edusync-brand-primary, #3659D9)' }}>
          {currentStats.totalTeachersChange}
        </span>
      </div>

      <div className="academic-kpi-card">
        <span className="academic-kpi-card__label">Active</span>
        <span className="academic-kpi-card__value">{currentStats.activeTeachers}</span>
        <span className="academic-kpi-card__subtext" style={{ color: '#15803D' }}>
          <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: '#15803D', marginRight: 4 }}></span>
          {currentStats.activeTeachersPct}
        </span>
      </div>

      <div className="academic-kpi-card">
        <span className="academic-kpi-card__label">On leave</span>
        <span className="academic-kpi-card__value">{currentStats.onLeaveTeachers}</span>
        <span className="academic-kpi-card__subtext academic-kpi-card__subtext--review" style={{ color: '#B45309' }}>
          {currentStats.onLeaveLabel}
        </span>
      </div>

      <div className="academic-kpi-card">
        <span className="academic-kpi-card__label">Subjects covered</span>
        <span className="academic-kpi-card__value">{currentStats.subjectsCovered}</span>
        <span className="academic-kpi-card__subtext academic-kpi-card__subtext--neutral" style={{ color: 'var(--edusync-text-secondary, #667085)' }}>
          {currentStats.subjectsCoveredLabel}
        </span>
      </div>
    </div>
  );
};
