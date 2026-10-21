import React from 'react';
import { useExamFlow } from '../../../../application/state/exam-flow.context';

export const ExamKpiCards: React.FC = () => {
  const {
    kpiStats,
    goToOverview,
    goToResultsReports,
    goToCreateSchedule,
    goToMarksReview,
  } = useExamFlow();

  const totalExams = kpiStats?.totalExams ?? 18;
  const publishedResults = kpiStats?.publishedResults ?? 12;
  const scheduled = kpiStats?.scheduled ?? 6;
  const marksUnderReview = kpiStats?.marksUnderReview ?? 4;

  const kpis = [
    {
      id: 'total',
      label: 'Total exams',
      value: totalExams.toString(),
      subtitle: 'Across all academic terms',
      accentColor: '#3659D9',
      onClick: goToOverview,
    },
    {
      id: 'published',
      label: 'Published results',
      value: publishedResults.toString(),
      subtitle: 'Completed exam cycles',
      accentColor: '#148C57',
      onClick: () => goToResultsReports(),
    },
    {
      id: 'scheduled',
      label: 'Scheduled',
      value: scheduled < 10 ? `0${scheduled}` : scheduled.toString(),
      subtitle: 'Upcoming assessments',
      accentColor: '#B86E0F',
      onClick: () => goToCreateSchedule(),
    },
    {
      id: 'under-review',
      label: 'Marks under review',
      value: marksUnderReview < 10 ? `0${marksUnderReview}` : marksUnderReview.toString(),
      subtitle: 'Teacher submissions pending',
      accentColor: '#6B4AB8',
      onClick: () => goToMarksReview(),
    },
  ];

  return (
    <div className="exams-kpis-grid" role="region" aria-label="Exam KPI statistics">
      {kpis.map((kpi) => (
        <div
          key={kpi.id}
          className="exams-kpi-card"
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
            className="exams-kpi-card__bar"
            style={{ backgroundColor: kpi.accentColor }}
          />
          <div className="exams-kpi-card__content">
            <span className="exams-kpi-card__label">{kpi.label}</span>
            <span className="exams-kpi-card__val">{kpi.value}</span>
            <span className="exams-kpi-card__hint">{kpi.subtitle}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
