import React from 'react';
import { useExamFlow } from '../../../../application/state/exam-flow.context';

export const ExamsNavTabs: React.FC = () => {
  const {
    currentScreen,
    editingExam,
    goToOverview,
    goToCreateSchedule,
    goToMarksReview,
    goToResultsReports,
  } = useExamFlow();

  return (
    <nav className="exams-nav-tabs" aria-label="Exams navigation tabs">
      <button
        type="button"
        className={`exams-nav-tab ${
          currentScreen === 'OVERVIEW' ? 'exams-nav-tab--active' : ''
        }`}
        onClick={goToOverview}
      >
        Overview
      </button>

      <button
        type="button"
        className={`exams-nav-tab ${
          currentScreen === 'CREATE_SCHEDULE' ? 'exams-nav-tab--active' : ''
        }`}
        onClick={() => goToCreateSchedule()}
      >
        {editingExam ? 'Edit Schedule' : 'Create & Schedule'}
      </button>

      <button
        type="button"
        className={`exams-nav-tab ${
          currentScreen === 'MARKS_REVIEW' ? 'exams-nav-tab--active' : ''
        }`}
        onClick={() => goToMarksReview()}
      >
        Marks Entry &amp; Review
      </button>

      <button
        type="button"
        className={`exams-nav-tab ${
          currentScreen === 'RESULTS_REPORTS' ? 'exams-nav-tab--active' : ''
        }`}
        onClick={() => goToResultsReports()}
      >
        Results &amp; Report Cards
      </button>
    </nav>
  );
};
