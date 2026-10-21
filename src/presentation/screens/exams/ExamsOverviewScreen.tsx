import React from 'react';
import { useExamFlow } from '../../../application/state/exam-flow.context';
import { ExamsNavTabs } from './components/ExamsNavTabs';
import { ExamKpiCards } from './components/ExamKpiCards';
import type { Exam } from '../../../core/entities/exam.types';

interface ExamsOverviewScreenProps {
  onNavigateToDashboard: () => void;
}

export const ExamsOverviewScreen: React.FC<ExamsOverviewScreenProps> = ({
  onNavigateToDashboard,
}) => {
  const {
    upcomingExams,
    recentHistory,
    goToCreateSchedule,
    goToMarksReview,
    goToResultsReports,
  } = useExamFlow();

  const handleRowClick = (exam: Exam) => {
    if (exam.status === 'Under Review') {
      goToMarksReview(exam.id);
    } else if (exam.status === 'Scheduled') {
      goToMarksReview(exam.id);
    } else {
      goToCreateSchedule(exam);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Scheduled':
        return (
          <span className="edusync-badge-custom edusync-badge-custom--scheduled">
            Scheduled
          </span>
        );
      case 'In Progress':
        return (
          <span className="edusync-badge-custom edusync-badge-custom--progress">
            In Progress
          </span>
        );
      case 'Under Review':
        return (
          <span className="edusync-badge-custom edusync-badge-custom--under-review">
            Under Review
          </span>
        );
      case 'Draft':
        return (
          <span className="edusync-badge-custom edusync-badge-custom--draft">
            Draft
          </span>
        );
      case 'Published':
        return (
          <span className="edusync-badge-custom edusync-badge-custom--published">
            Published
          </span>
        );
      case 'Completed':
        return (
          <span className="edusync-badge-custom edusync-badge-custom--published">
            Completed
          </span>
        );
      default:
        return (
          <span className="edusync-badge-custom edusync-badge-custom--draft">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="exams-container">
      {/* 1. HERO HEADER & BREADCRUMBS */}
      <div className="exams-hero">
        <div>
          <div className="exams-hero__crumbs">
            <button
              type="button"
              className="exams-hero__crumb--link"
              onClick={onNavigateToDashboard}
            >
              Dashboard
            </button>
            <span className="exams-hero__crumb-sep">/</span>
            <span style={{ fontWeight: 500 }}>Exams &amp; Results</span>
            <span className="exams-hero__crumb-sep">/</span>
            <span style={{ color: 'var(--edusync-text-navy, #14213D)', fontWeight: 600 }}>
              Overview
            </span>
          </div>

          <div className="exams-hero__title-row">
            <button
              type="button"
              className="edusync-btn-back-circle"
              onClick={onNavigateToDashboard}
              title="Return to Dashboard Overview"
              aria-label="Back to Dashboard"
            >
              ←
            </button>
            <div>
              <h1 className="exams-hero__title">Exams &amp; Results</h1>
              <p className="exams-hero__subtitle">
                Manage exam schedules, marks review, grading, and result publication.
              </p>
            </div>
          </div>
        </div>

        <div className="exams-hero__actions">
          <button
            type="button"
            className="edusync-btn edusync-btn--secondary"
            onClick={onNavigateToDashboard}
          >
            ← Dashboard
          </button>
          <button
            type="button"
            className="edusync-btn edusync-btn--primary"
            onClick={() => goToCreateSchedule()}
          >
            + Create exam
          </button>
        </div>
      </div>

      {/* 2. SUB-NAVIGATION TABS (Placed directly below Hero for consistency) */}
      <ExamsNavTabs />

      {/* 3. 4 KPI STAT CARDS (Placed directly under tabs with unified colors) */}
      <ExamKpiCards />

      {/* 4. MAIN 65% / 35% SPLIT ROW */}
      <div className="exams-split-row">
        {/* LEFT: Upcoming Exams Panel */}
        <div className="exams-card">
          <div className="exams-card__header-row">
            <div className="exams-card__header-group">
              <h2 className="exams-card__title">Upcoming exams</h2>
              <p className="exams-card__subtitle">
                Schedules and current progress
              </p>
            </div>
            <button
              type="button"
              className="edusync-btn-text-action"
              onClick={() => goToCreateSchedule()}
            >
              View all →
            </button>
          </div>

          <div className="edusync-table-container">
            <table className="edusync-table">
              <thead>
                <tr>
                  <th>EXAM</th>
                  <th>TERM</th>
                  <th>DATE</th>
                  <th>STATUS</th>
                  <th>CLASSES</th>
                </tr>
              </thead>
              <tbody>
                {upcomingExams.map((exam) => (
                  <tr
                    key={exam.id}
                    className="edusync-table__row--clickable"
                    onClick={() => handleRowClick(exam)}
                    title="Click to view details"
                  >
                    <td>
                      <span className="exams-table-title">
                        {exam.name}
                      </span>
                    </td>
                    <td>{exam.term}</td>
                    <td>{exam.startDate.split(' ')[0]} {exam.startDate.split(' ')[1]}</td>
                    <td>{getStatusBadge(exam.status)}</td>
                    <td>{exam.totalClasses}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT: Exam Status & Result Progress Panel */}
        <div className="exams-card">
          <div className="exams-card__header-group">
            <h2 className="exams-card__title">Exam status</h2>
            <p className="exams-card__subtitle">
              Across currently active examinations
            </p>
          </div>

          <div className="exams-status-list">
            <div
              className="exams-status-item"
              onClick={() => goToResultsReports()}
              role="button"
              tabIndex={0}
              title="View published results"
            >
              <div className="exams-status-item__left">
                <span className="edusync-dot edusync-dot--submitted" />
                <span className="exams-status-item__label">Published</span>
              </div>
              <span className="exams-status-item__value">12</span>
            </div>
            <div className="exams-status-divider" />

            <div
              className="exams-status-item"
              onClick={() => goToCreateSchedule()}
              role="button"
              tabIndex={0}
              title="View scheduled assessments"
            >
              <div className="exams-status-item__left">
                <span className="edusync-dot" style={{ backgroundColor: 'var(--edusync-brand-primary, #3659D9)' }} />
                <span className="exams-status-item__label">Scheduled</span>
              </div>
              <span className="exams-status-item__value">6</span>
            </div>
            <div className="exams-status-divider" />

            <div
              className="exams-status-item"
              onClick={() => goToMarksReview()}
              role="button"
              tabIndex={0}
              title="Review teacher marks pending evaluation"
            >
              <div className="exams-status-item__left">
                <span className="edusync-dot edusync-dot--graded" />
                <span className="exams-status-item__label">Under Review</span>
              </div>
              <span className="exams-status-item__value">4</span>
            </div>
            <div className="exams-status-divider" />

            <div
              className="exams-status-item"
              onClick={() => goToCreateSchedule()}
              role="button"
              tabIndex={0}
              title="View in progress / draft"
            >
              <div className="exams-status-item__left">
                <span className="edusync-dot edusync-dot--pending" />
                <span className="exams-status-item__label">In Progress</span>
              </div>
              <span className="exams-status-item__value">2</span>
            </div>
          </div>

          {/* Compact Result Processing indicator */}
          <div style={{ marginTop: '8px', paddingTop: '12px', borderTop: '1px solid #F0F2F5' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--edusync-text-navy, #14213D)' }}>
                Mid-Term Processing
              </span>
              <span style={{ fontSize: '11px', color: 'var(--edusync-text-secondary, #667085)' }}>
                Term 1
              </span>
            </div>
            <div className="exams-progress-stack" style={{ gap: '8px' }}>
              <div className="exams-progress-item">
                <div className="exams-progress-item__head" style={{ fontSize: '12px' }}>
                  <span className="exams-progress-item__label">Schedules confirmed</span>
                  <span className="exams-progress-item__val">8 / 8</span>
                </div>
                <div className="exams-progress-track" style={{ height: '6px' }}>
                  <div className="exams-progress-fill exams-progress-fill--green" style={{ width: '100%' }} />
                </div>
              </div>
              <div className="exams-progress-item">
                <div className="exams-progress-item__head" style={{ fontSize: '12px' }}>
                  <span className="exams-progress-item__label">Marks submitted</span>
                  <span className="exams-progress-item__val">6 / 8</span>
                </div>
                <div className="exams-progress-track" style={{ height: '6px' }}>
                  <div className="exams-progress-fill exams-progress-fill--blue" style={{ width: '75%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. MANAGE EXAMS QUICK ACTION CARDS (Exact match to Assignments Manage coursework) */}
      <div className="exams-card">
        <div className="exams-card__header-group">
          <h2 className="exams-card__title">Manage exams &amp; results</h2>
          <p className="exams-card__subtitle">
            Jump into examination scheduling, marks evaluation, or report card publication.
          </p>
        </div>

        <div className="exams-action-cards-grid">
          {/* Card 1: Exam schedule */}
          <div
            className="exams-action-card"
            onClick={() => goToCreateSchedule()}
            role="button"
            tabIndex={0}
          >
            <div>
              <div className="exams-action-card__title">Exam schedule</div>
              <div className="exams-action-card__desc">
                Configure dates, time slots, and room assignments
              </div>
            </div>
            <div className="exams-action-card__link">Open →</div>
          </div>

          {/* Card 2: Create exam */}
          <div
            className="exams-action-card"
            onClick={() => goToCreateSchedule()}
            role="button"
            tabIndex={0}
          >
            <div>
              <div className="exams-action-card__title">Create exam</div>
              <div className="exams-action-card__desc">
                Set term, classes, subjects, and instructions
              </div>
            </div>
            <div className="exams-action-card__link">Open →</div>
          </div>

          {/* Card 3: Marks entry & review */}
          <div
            className="exams-action-card"
            onClick={() => goToMarksReview()}
            role="button"
            tabIndex={0}
          >
            <div>
              <div className="exams-action-card__title">Marks review</div>
              <div className="exams-action-card__desc">
                Validate and approve teacher-submitted marks
              </div>
            </div>
            <div className="exams-action-card__link">Open →</div>
          </div>

          {/* Card 4: Results & report cards */}
          <div
            className="exams-action-card"
            onClick={() => goToResultsReports()}
            role="button"
            tabIndex={0}
          >
            <div>
              <div className="exams-action-card__title">Results &amp; reports</div>
              <div className="exams-action-card__desc">
                Calculate GPA, review rankings, and publish report cards
              </div>
            </div>
            <div className="exams-action-card__link">Open →</div>
          </div>
        </div>
      </div>

      {/* 6. BOTTOM CARD: RECENT EXAM HISTORY */}
      <div className="exams-card">
        <div className="exams-card__header-row">
          <div className="exams-card__header-group">
            <h2 className="exams-card__title">Recent exam history</h2>
            <p className="exams-card__subtitle">
              Completed examinations across academic terms
            </p>
          </div>
          <button
            type="button"
            className="edusync-btn-text-action"
            onClick={() => goToResultsReports()}
          >
            View history archive →
          </button>
        </div>

        <div className="edusync-table-container">
          <table className="edusync-table">
            <thead>
              <tr>
                <th>EXAM</th>
                <th>TERM</th>
                <th>CLASSES</th>
                <th>COMPLETED</th>
                <th>RESULT STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {recentHistory.map((item) => (
                <tr key={item.id}>
                  <td>
                    <span className="exams-table-title">
                      {item.examTitle}
                    </span>
                  </td>
                  <td>{item.term}</td>
                  <td>{item.classes}</td>
                  <td>{item.completedDate}</td>
                  <td>{getStatusBadge(item.resultStatus)}</td>
                  <td>
                    <button
                      type="button"
                      className="edusync-btn-text-action"
                      onClick={() => goToResultsReports()}
                    >
                      {item.resultStatus === 'Published' ? 'View results' : 'View history'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
