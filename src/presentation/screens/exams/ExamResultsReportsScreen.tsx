import React from 'react';
import { useExamFlow } from '../../../application/state/exam-flow.context';
import { ExamsNavTabs } from './components/ExamsNavTabs';
import type {
  CalculatedStudentResult,
  ResultsInnerTab,
} from '../../../core/entities/exam.types';

interface ExamResultsReportsScreenProps {
  onNavigateToDashboard: () => void;
}

export const ExamResultsReportsScreen: React.FC<ExamResultsReportsScreenProps> = ({
  onNavigateToDashboard,
}) => {
  const {
    allExams,
    calculatedResults,
    recentHistory,
    activeResultsTab,
    setActiveResultsTab,
    resultsFilterExam,
    resultsFilterClass,
    resultsFilterStatus,
    resultsSearch,
    setResultsFilterExam,
    setResultsFilterClass,
    setResultsFilterStatus,
    setResultsSearch,
    setSelectedResultForModal,
    setIsPublishModalOpen,
    setEditingMark,
    goToOverview,
    goToMarksReview,
  } = useExamFlow();

  const getValidationBadge = (val: string) => {
    switch (val) {
      case 'Valid':
        return (
          <span className="edusync-badge-custom edusync-badge-custom--valid">
            Valid
          </span>
        );
      case 'Marks missing':
        return (
          <span className="edusync-badge-custom edusync-badge-custom--missing">
            Marks missing
          </span>
        );
      default:
        return (
          <span className="edusync-badge-custom edusync-badge-custom--draft">
            {val}
          </span>
        );
    }
  };

  const getResultStatusBadge = (status: string) => {
    switch (status) {
      case 'Published':
        return (
          <span className="edusync-badge-custom edusync-badge-custom--valid">
            Published
          </span>
        );
      case 'Under Review':
        return (
          <span className="edusync-badge-custom edusync-badge-custom--under-review">
            Under Review
          </span>
        );
      case 'Blocked':
        return (
          <span className="edusync-badge-custom edusync-badge-custom--blocked">
            Blocked
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

  const innerTabs: { id: ResultsInnerTab; label: string }[] = [
    { id: 'RESULTS_REVIEW', label: 'Results review' },
    { id: 'REPORT_CARDS', label: 'Report cards' },
    { id: 'RESULT_HISTORY', label: 'Result history' },
  ];

  const handleResolveIssue = (student: CalculatedStudentResult) => {
    setEditingMark({
      id: `sm-fix-${student.studentId}`,
      submissionId: 'ts-01',
      studentId: student.studentId,
      studentName: student.studentName,
      rollNo: student.rollNo,
      marks: 85,
      maxMarks: 100,
      validation: 'Valid',
    });
  };

  const filteredResults = calculatedResults.filter((r) => {
    const matchClass =
      resultsFilterClass === 'All classes' || r.className === resultsFilterClass;
    const matchStatus =
      resultsFilterStatus === 'All statuses' || r.resultStatus === resultsFilterStatus;
    const matchSearch =
      resultsSearch === '' ||
      r.studentName.toLowerCase().includes(resultsSearch.toLowerCase()) ||
      r.rollNo.includes(resultsSearch);
    return matchClass && matchStatus && matchSearch;
  });

  return (
    <div className="exams-container">
      {/* 1. HERO HEADER */}
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
            <button
              type="button"
              className="exams-hero__crumb--link"
              onClick={goToOverview}
            >
              Exams &amp; Results
            </button>
            <span className="exams-hero__crumb-sep">/</span>
            <span style={{ color: 'var(--edusync-text-navy, #14213D)', fontWeight: 600 }}>
              Results &amp; Report Cards
            </span>
          </div>

          <div className="exams-hero__title-row">
            <button
              type="button"
              className="edusync-btn-back-circle"
              onClick={goToOverview}
              title="Return to Overview"
              aria-label="Back to Overview"
            >
              ←
            </button>
            <div>
              <h1 className="exams-hero__title">Results &amp; Report Cards</h1>
              <p className="exams-hero__subtitle">
                Calculate results, review class performance, publish report cards, and access history.
              </p>
            </div>
          </div>
        </div>

        <div className="exams-hero__actions">
          <button
            type="button"
            className="edusync-btn edusync-btn--secondary"
            onClick={goToOverview}
          >
            ← Back to overview
          </button>
          <button
            type="button"
            className="edusync-btn edusync-btn--primary"
            onClick={() => alert('Recalculating exam results with updated weighted scores...')}
          >
            Calculate results
          </button>
        </div>
      </div>

      {/* 2. SUB-NAVIGATION TABS */}
      <ExamsNavTabs />

      {/* 3. INNER SECTION TABS */}
      <div className="exams-inner-tabs" role="tablist">
        {innerTabs.map((tab) => {
          const isActive = activeResultsTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`exams-inner-tab ${
                isActive ? 'exams-inner-tab--active' : ''
              }`}
              onClick={() => setActiveResultsTab(tab.id)}
            >
              <span>{tab.label}</span>
              {isActive && <div className="exams-inner-tab__bar" />}
            </button>
          );
        })}
      </div>

      {/* 4. RESULTS FILTERS CARD */}
      <div className="exams-card exams-filter-card">
        <div className="exams-filter-grid">
          <div className="exams-filter-field" style={{ flex: 1.5 }}>
            <label className="exams-filter-label">Exam</label>
            <select
              className="exams-select"
              value={resultsFilterExam}
              onChange={(e) => setResultsFilterExam(e.target.value)}
            >
              {allExams.map((e) => (
                <option key={e.id} value={e.name}>
                  {e.name}
                </option>
              ))}
            </select>
          </div>

          <div className="exams-filter-field">
            <label className="exams-filter-label">Class</label>
            <select
              className="exams-select"
              value={resultsFilterClass}
              onChange={(e) => setResultsFilterClass(e.target.value)}
            >
              <option value="Class 8-A">Class 8-A</option>
              <option value="Class 8-B">Class 8-B</option>
              <option value="Class 9-A">Class 9-A</option>
            </select>
          </div>

          <div className="exams-filter-field">
            <label className="exams-filter-label">Result status</label>
            <select
              className="exams-select"
              value={resultsFilterStatus}
              onChange={(e) => setResultsFilterStatus(e.target.value)}
            >
              <option value="All statuses">All statuses</option>
              <option value="Under Review">Under Review</option>
              <option value="Published">Published</option>
              <option value="Blocked">Blocked</option>
            </select>
          </div>

          <div className="exams-filter-field" style={{ flex: 1.2 }}>
            <label className="exams-filter-label">Search student</label>
            <input
              type="text"
              className="exams-input"
              placeholder="Name or roll number"
              value={resultsSearch}
              onChange={(e) => setResultsSearch(e.target.value)}
            />
          </div>

          <div className="exams-filter-actions">
            <button
              type="button"
              className="edusync-btn edusync-btn--secondary edusync-btn--sm"
              onClick={() => {
                setResultsFilterClass('Class 8-A');
                setResultsFilterStatus('All statuses');
                setResultsSearch('');
              }}
            >
              Reset
            </button>
            <button
              type="button"
              className="edusync-btn edusync-btn--primary edusync-btn--sm"
              onClick={() => alert('Filters applied.')}
            >
              Apply
            </button>
          </div>
        </div>
      </div>

      {/* 5. CALCULATED RESULTS TABLE */}
      {(activeResultsTab === 'RESULTS_REVIEW' || activeResultsTab === 'REPORT_CARDS') && (
        <div className="exams-card">
          <div className="exams-card__header-group">
            <h2 className="exams-card__title">Calculated results</h2>
            <p className="exams-card__subtitle">
              Review calculated totals and validation warnings before publication.
            </p>
          </div>

          <div className="edusync-table-container">
            <table className="edusync-table">
              <thead>
                <tr>
                  <th>STUDENT</th>
                  <th>ROLL</th>
                  <th>TOTAL</th>
                  <th>GRADE</th>
                  <th>CLASS RANK</th>
                  <th>VALIDATION</th>
                  <th>RESULT STATUS</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {filteredResults.map((r) => (
                  <tr key={r.id}>
                    <td>
                      <span style={{ fontWeight: 600, color: 'var(--edusync-text-navy, #14213D)' }}>
                        {r.studentName}
                      </span>
                    </td>
                    <td>{r.rollNo}</td>
                    <td>{r.totalMarks !== null ? `${r.totalMarks} / ${r.maxTotalMarks}` : '—'}</td>
                    <td>
                      {r.grade !== '—' ? (
                        <span className="edusync-badge-custom edusync-badge-custom--valid">
                          {r.grade}
                        </span>
                      ) : (
                        '—'
                      )}
                    </td>
                    <td>{r.classRank || '—'}</td>
                    <td>{getValidationBadge(r.validation)}</td>
                    <td>{getResultStatusBadge(r.resultStatus)}</td>
                    <td>
                      {r.resultStatus === 'Blocked' ? (
                        <button
                          type="button"
                          className="edusync-btn-text-action"
                          style={{ color: '#DC2626' }}
                          onClick={() => handleResolveIssue(r)}
                        >
                          Resolve issue
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="edusync-btn-text-action"
                          onClick={() => setSelectedResultForModal(r)}
                        >
                          View report card
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 6. SPLIT ROW: CLASS PERFORMANCE & RESULT PUBLICATION */}
      <div className="exams-split-row--50-50">
        {/* Left: Class-wise performance */}
        <div className="exams-card">
          <div className="exams-card__header-group">
            <h2 className="exams-card__title">Class-wise performance</h2>
            <p className="exams-card__subtitle">
              Aggregate statistics for {resultsFilterClass}
            </p>
          </div>

          <div className="exams-progress-stack">
            <div className="exams-progress-item">
              <div className="exams-progress-item__head">
                <span className="exams-progress-item__label">Class average</span>
                <span className="exams-progress-item__val">76.4%</span>
              </div>
              <div className="exams-progress-track">
                <div className="exams-progress-fill exams-progress-fill--green" style={{ width: '76.4%' }} />
              </div>
            </div>

            <div className="exams-progress-item">
              <div className="exams-progress-item__head">
                <span className="exams-progress-item__label">Pass rate</span>
                <span className="exams-progress-item__val">92%</span>
              </div>
              <div className="exams-progress-track">
                <div className="exams-progress-fill exams-progress-fill--blue" style={{ width: '92%' }} />
              </div>
            </div>

            <div className="exams-progress-item">
              <div className="exams-progress-item__head">
                <span className="exams-progress-item__label">Marks verified</span>
                <span className="exams-progress-item__val">87%</span>
              </div>
              <div className="exams-progress-track">
                <div className="exams-progress-fill exams-progress-fill--purple" style={{ width: '87%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Result publication controls */}
        <div className="exams-card">
          <div className="exams-card__header-row">
            <div className="exams-card__header-group">
              <h2 className="exams-card__title">Result publication</h2>
              <p className="exams-card__subtitle">
                Publishing controls for {resultsFilterClass}
              </p>
            </div>
            <span className="edusync-badge-custom edusync-badge-custom--under-review">
              Under Review
            </span>
          </div>

          <div
            style={{
              padding: '12px 14px',
              backgroundColor: '#FEF3F2',
              borderRadius: '8px',
              border: '1px solid #FECDCA',
              fontSize: '12px',
              color: '#B42318',
            }}
          >
            ⚠️ 2 records require correction before publishing.
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: 'auto', paddingTop: '8px' }}>
            <button
              type="button"
              className="edusync-btn edusync-btn--secondary"
              style={{ flex: 1 }}
              onClick={() => {
                if (filteredResults.length > 0) {
                  setSelectedResultForModal(filteredResults[0]);
                }
              }}
            >
              Preview report cards
            </button>
            <button
              type="button"
              className="edusync-btn edusync-btn--primary"
              style={{ flex: 1 }}
              onClick={() => setIsPublishModalOpen(true)}
            >
              Publish results
            </button>
          </div>
        </div>
      </div>

      {/* 7. REPORT CARDS & RESULT HISTORY TABLE */}
      {(activeResultsTab === 'RESULTS_REVIEW' || activeResultsTab === 'RESULT_HISTORY') && (
        <div className="exams-card">
          <div className="exams-card__header-group">
            <h2 className="exams-card__title">Report cards &amp; result history</h2>
            <p className="exams-card__subtitle">
              Published terms and archived result documentation
            </p>
          </div>

          <div className="edusync-table-container">
            <table className="edusync-table">
              <thead>
                <tr>
                  <th>EXAM / TERM</th>
                  <th>CLASS</th>
                  <th>PUBLISHED ON</th>
                  <th>REPORT CARDS</th>
                  <th>STATUS</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {recentHistory.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <span style={{ fontWeight: 600, color: 'var(--edusync-text-navy, #14213D)' }}>
                        {item.examTitle}
                      </span>
                    </td>
                    <td>Class 8-A</td>
                    <td>{item.publishedOn || item.completedDate}</td>
                    <td>{item.reportCardsCount || '32 / 32'}</td>
                    <td>
                      <span
                        className={`edusync-badge-custom ${
                          item.resultStatus === 'Published'
                            ? 'edusync-badge-custom--valid'
                            : 'edusync-badge-custom--under-review'
                        }`}
                      >
                        {item.resultStatus}
                      </span>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="edusync-btn-text-action"
                        onClick={() => {
                          if (item.resultStatus === 'Published') {
                            if (filteredResults.length > 0) {
                              setSelectedResultForModal(filteredResults[0]);
                            }
                          } else {
                            goToMarksReview();
                          }
                        }}
                      >
                        {item.resultStatus === 'Published' ? 'View history' : 'Review results'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
