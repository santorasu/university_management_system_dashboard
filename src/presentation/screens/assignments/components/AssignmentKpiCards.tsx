import React from 'react';
import { useAssignmentFlow } from '../../../../application/state/assignment-flow.context';

export const AssignmentKpiCards: React.FC = () => {
  const { kpiStats, goToListDetails, goToSubmissionsMaterials } =
    useAssignmentFlow();

  const total = kpiStats?.totalAssignments ?? 248;
  const published = kpiStats?.publishedCount ?? 186;
  const pending = kpiStats?.pendingSubmissions ?? 74;
  const needsGrading = kpiStats?.needsGrading ?? 32;

  const kpis = [
    {
      id: 'total',
      label: 'Total assignments',
      value: total.toLocaleString(),
      subtitle: 'Across all active classes',
      accentColor: '#3659D9',
      onClick: () => goToListDetails(),
    },
    {
      id: 'published',
      label: 'Published',
      value: published.toLocaleString(),
      subtitle: 'Visible to students',
      accentColor: '#148C57',
      onClick: () => goToListDetails(),
    },
    {
      id: 'pending',
      label: 'Pending submissions',
      value: pending.toLocaleString(),
      subtitle: 'Awaiting student work',
      accentColor: '#B86E0F',
      onClick: () => goToSubmissionsMaterials('SUBMISSIONS', undefined, 'Pending'),
    },
    {
      id: 'grading',
      label: 'Needs grading',
      value: needsGrading.toLocaleString(),
      subtitle: 'Submissions to review',
      accentColor: '#6B4AB8',
      onClick: () => goToSubmissionsMaterials('GRADING'),
    },
  ];

  return (
    <div className="assignments-kpis-grid">
      {kpis.map((kpi) => (
        <div
          key={kpi.id}
          className="assignments-kpi-card"
          onClick={kpi.onClick}
          role="button"
          tabIndex={0}
          title={`Click to view ${kpi.label.toLowerCase()}`}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              kpi.onClick();
            }
          }}
        >
          <div
            className="assignments-kpi-card__accent"
            style={{ backgroundColor: kpi.accentColor }}
          />
          <div className="assignments-kpi-card__body">
            <div className="assignments-kpi-card__label">{kpi.label}</div>
            <div className="assignments-kpi-card__value">{kpi.value}</div>
            <div className="assignments-kpi-card__subtitle">{kpi.subtitle}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
