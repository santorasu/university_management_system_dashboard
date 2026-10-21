import React from 'react';
import {
  ExamFlowProvider,
  useExamFlow,
} from '../../../application/state/exam-flow.context';
import { ExamsOverviewScreen } from './ExamsOverviewScreen';
import { ExamCreateScheduleScreen } from './ExamCreateScheduleScreen';
import { ExamMarksReviewScreen } from './ExamMarksReviewScreen';
import { ExamResultsReportsScreen } from './ExamResultsReportsScreen';
import {
  StudentReportCardModal,
  PublishConfirmationModal,
  GradingConfigModal,
  EditMarkModal,
} from './ExamModals';
import './Exams.css';

interface ExamsScreenProps {
  onNavigateToDashboard: () => void;
}

const ExamsScreenContent: React.FC<ExamsScreenProps> = ({
  onNavigateToDashboard,
}) => {
  const { currentScreen, feedbackToast, clearFeedbackToast } = useExamFlow();

  const renderActiveScreen = () => {
    switch (currentScreen) {
      case 'OVERVIEW':
        return <ExamsOverviewScreen onNavigateToDashboard={onNavigateToDashboard} />;
      case 'CREATE_SCHEDULE':
        return (
          <ExamCreateScheduleScreen onNavigateToDashboard={onNavigateToDashboard} />
        );
      case 'MARKS_REVIEW':
        return (
          <ExamMarksReviewScreen onNavigateToDashboard={onNavigateToDashboard} />
        );
      case 'RESULTS_REPORTS':
        return (
          <ExamResultsReportsScreen onNavigateToDashboard={onNavigateToDashboard} />
        );
      default:
        return <ExamsOverviewScreen onNavigateToDashboard={onNavigateToDashboard} />;
    }
  };

  return (
    <>
      {/* Toast Feedback Notice */}
      {feedbackToast && (
        <div
          role="status"
          aria-live="polite"
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 1100,
            padding: '12px 18px',
            borderRadius: '8px',
            boxShadow: '0 8px 24px rgba(20, 33, 61, 0.16)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            backgroundColor:
              feedbackToast.type === 'success'
                ? '#F0FDF4'
                : feedbackToast.type === 'error'
                ? '#FEF2F2'
                : feedbackToast.type === 'warning'
                ? '#FFFBEB'
                : '#EFF8FF',
            border: `1px solid ${
              feedbackToast.type === 'success'
                ? '#BBF7D0'
                : feedbackToast.type === 'error'
                ? '#FECACA'
                : feedbackToast.type === 'warning'
                ? '#FDE68A'
                : '#B2CCFF'
            }`,
            color:
              feedbackToast.type === 'success'
                ? '#166534'
                : feedbackToast.type === 'error'
                ? '#991B1B'
                : feedbackToast.type === 'warning'
                ? '#92400E'
                : '#1E40AF',
            fontSize: '13px',
            fontWeight: 500,
          }}
        >
          <span>
            {feedbackToast.type === 'success' && '✓'}
            {feedbackToast.type === 'error' && '✕'}
            {feedbackToast.type === 'warning' && '⚠️'}
            {feedbackToast.type === 'info' && 'ℹ️'}
          </span>
          <span>{feedbackToast.message}</span>
          <button
            type="button"
            onClick={clearFeedbackToast}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              padding: '0 4px',
              color: 'inherit',
            }}
          >
            ✕
          </button>
        </div>
      )}

      {renderActiveScreen()}

      {/* Global Modals */}
      <StudentReportCardModal />
      <PublishConfirmationModal />
      <GradingConfigModal />
      <EditMarkModal />
    </>
  );
};

export const ExamsScreen: React.FC<ExamsScreenProps> = ({
  onNavigateToDashboard,
}) => {
  return (
    <ExamFlowProvider>
      <ExamsScreenContent onNavigateToDashboard={onNavigateToDashboard} />
    </ExamFlowProvider>
  );
};
