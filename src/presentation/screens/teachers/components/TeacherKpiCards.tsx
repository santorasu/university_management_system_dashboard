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
    <div className="edusync-teacher-kpis">
      <div className="edusync-teacher-kpi-card">
        <div className="edusync-teacher-kpi-card__top">
          <span className="edusync-teacher-kpi-card__label">Total teachers</span>
        </div>
        <div className="edusync-teacher-kpi-card__value-wrap">
          <span className="edusync-teacher-kpi-card__value">{currentStats.totalTeachers}</span>
          <span className="edusync-teacher-kpi-card__pill edusync-teacher-kpi-card__pill--primary">
            {currentStats.totalTeachersChange}
          </span>
        </div>
      </div>

      <div className="edusync-teacher-kpi-card">
        <div className="edusync-teacher-kpi-card__top">
          <span className="edusync-teacher-kpi-card__label">Active</span>
        </div>
        <div className="edusync-teacher-kpi-card__value-wrap">
          <span className="edusync-teacher-kpi-card__value">{currentStats.activeTeachers}</span>
          <span className="edusync-teacher-kpi-card__pill edusync-teacher-kpi-card__pill--success">
            {currentStats.activeTeachersPct}
          </span>
        </div>
      </div>

      <div className="edusync-teacher-kpi-card">
        <div className="edusync-teacher-kpi-card__top">
          <span className="edusync-teacher-kpi-card__label">On leave</span>
        </div>
        <div className="edusync-teacher-kpi-card__value-wrap">
          <span className="edusync-teacher-kpi-card__value">{currentStats.onLeaveTeachers}</span>
          <span className="edusync-teacher-kpi-card__pill edusync-teacher-kpi-card__pill--warning">
            {currentStats.onLeaveLabel}
          </span>
        </div>
      </div>

      <div className="edusync-teacher-kpi-card">
        <div className="edusync-teacher-kpi-card__top">
          <span className="edusync-teacher-kpi-card__label">Subjects covered</span>
        </div>
        <div className="edusync-teacher-kpi-card__value-wrap">
          <span className="edusync-teacher-kpi-card__value">{currentStats.subjectsCovered}</span>
          <span className="edusync-teacher-kpi-card__pill edusync-teacher-kpi-card__pill--neutral">
            {currentStats.subjectsCoveredLabel}
          </span>
        </div>
      </div>
    </div>
  );
};
