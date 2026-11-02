import React from 'react';
import { useLibraryFlow } from '../../../../application/state/library-flow.context';

export const LibraryKpiCards: React.FC = () => {
  const { subScreen, libraryKpis, documentKpis } = useLibraryFlow();

  if (subScreen === 'DOCUMENT_MANAGEMENT') {
    return (
      <div className="library-kpis-grid">
        {/* Student documents */}
        <div className="library-kpi-card library-kpi-card--blue">
          <span className="library-kpi-card__label">Student documents</span>
          <div className="library-kpi-card__value">
            {documentKpis?.studentDocuments ? documentKpis.studentDocuments.toLocaleString() : '1,842'}
          </div>
          <span className="library-kpi-card__subtext">
            {documentKpis?.studentDocumentsSubtext || 'Across enrolled students'}
          </span>
        </div>

        {/* Teacher documents */}
        <div className="library-kpi-card library-kpi-card--amber">
          <span className="library-kpi-card__label">Teacher documents</span>
          <div className="library-kpi-card__value">
            {documentKpis?.teacherDocuments ? documentKpis.teacherDocuments.toLocaleString() : '326'}
          </div>
          <span className="library-kpi-card__subtext">
            {documentKpis?.teacherDocumentsSubtext || 'Staff records'}
          </span>
        </div>

        {/* Pending review */}
        <div className="library-kpi-card library-kpi-card--red">
          <span className="library-kpi-card__label">Pending review</span>
          <div className="library-kpi-card__value">
            {documentKpis?.pendingReview ?? 17}
          </div>
          <span className="library-kpi-card__subtext">
            {documentKpis?.pendingReviewSubtext || 'Needs verification'}
          </span>
        </div>

        {/* Missing documents */}
        <div className="library-kpi-card library-kpi-card--red">
          <span className="library-kpi-card__label">Missing documents</span>
          <div className="library-kpi-card__value">
            {documentKpis?.missingDocuments ?? 28}
          </div>
          <span className="library-kpi-card__subtext">
            {documentKpis?.missingDocumentsSubtext || 'Follow-up required'}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="library-kpis-grid">
      {/* Total titles */}
      <div className="library-kpi-card library-kpi-card--blue">
        <span className="library-kpi-card__label">Total titles</span>
        <div className="library-kpi-card__value">
          {libraryKpis?.totalTitles ? libraryKpis.totalTitles.toLocaleString() : '1,284'}
        </div>
        <span className="library-kpi-card__subtext">
          {libraryKpis?.totalTitlesSubtext || 'Across all categories'}
        </span>
      </div>

      {/* Available copies */}
      <div className="library-kpi-card library-kpi-card--green">
        <span className="library-kpi-card__label">Available copies</span>
        <div className="library-kpi-card__value">
          {libraryKpis?.availableCopies ? libraryKpis.availableCopies.toLocaleString() : '936'}
        </div>
        <span className="library-kpi-card__subtext">
          {libraryKpis?.availableCopiesSubtext || 'Ready to issue'}
        </span>
      </div>

      {/* Currently issued */}
      <div className="library-kpi-card library-kpi-card--amber">
        <span className="library-kpi-card__label">Currently issued</span>
        <div className="library-kpi-card__value">
          {libraryKpis?.currentlyIssued ?? 278}
        </div>
        <span className="library-kpi-card__subtext">
          {libraryKpis?.currentlyIssuedSubtext || 'Active loans'}
        </span>
      </div>

      {/* Overdue books */}
      <div className="library-kpi-card library-kpi-card--red">
        <span className="library-kpi-card__label">Overdue books</span>
        <div className="library-kpi-card__value">
          {libraryKpis?.overdueBooks ?? 24}
        </div>
        <span className="library-kpi-card__subtext">
          {libraryKpis?.overdueBooksSubtext || 'Needs follow-up'}
        </span>
      </div>
    </div>
  );
};
