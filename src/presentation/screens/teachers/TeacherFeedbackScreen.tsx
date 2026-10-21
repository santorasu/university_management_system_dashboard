import React from 'react';
import { useTeacherFlow } from '../../../application/state/teacher-flow.context';
import { TeacherNavTabs } from './components/TeacherNavTabs';
import { Icon } from '../../widgets/Icon/Icon';

interface TeacherFeedbackScreenProps {
  onNavigateToDashboard: () => void;
}

export const TeacherFeedbackScreen: React.FC<TeacherFeedbackScreenProps> = ({
  onNavigateToDashboard,
}) => {
  const {
    feedbackList,
    feedbackStats,
    feedbackFilters,
    setFeedbackSearch,
    setFeedbackTeacher,
    setFeedbackRating,
    setFeedbackStatus,
    goToDirectory,
    goToAddTeacher,
  } = useTeacherFlow();

  const stats = feedbackStats || {
    totalFeedback: 248,
    totalFeedbackLabel: 'All student submissions',
    averageRating: '4.6 / 5',
    averageRatingLabel: 'Across all teachers',
    newThisMonth: 36,
    newThisMonthLabel: 'Recent submissions',
    needsReview: 12,
    needsReviewLabel: 'Awaiting moderation',
  };

  return (
    <div className="edusync-teachers-view">
      {/* Top Header & Breadcrumbs */}
      <div className="edusync-teachers-view__top-bar">
        <div className="edusync-teachers-view__header-left">
          <nav className="edusync-dashboard-hero__breadcrumb">
            <span
              className="edusync-dashboard-hero__crumb edusync-dashboard-hero__crumb--link"
              onClick={onNavigateToDashboard}
              role="button"
              tabIndex={0}
            >
              Dashboard
            </span>
            <span className="edusync-dashboard-hero__crumb-sep">/</span>
            <span
              className="edusync-dashboard-hero__crumb edusync-dashboard-hero__crumb--link"
              onClick={goToDirectory}
              role="button"
              tabIndex={0}
            >
              Teachers
            </span>
            <span className="edusync-dashboard-hero__crumb-sep">/</span>
            <span className="edusync-dashboard-hero__crumb edusync-dashboard-hero__crumb--current">
              Feedback
            </span>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '6px' }}>
            <button
              type="button"
              className="edusync-btn-back-circle"
              onClick={onNavigateToDashboard}
              title="Back to Dashboard"
              aria-label="Back to Dashboard"
            >
              ←
            </button>
            <h1 className="edusync-dashboard-hero__title" style={{ margin: 0 }}>Teacher Feedback</h1>
          </div>
          <p className="edusync-dashboard-hero__subtitle" style={{ marginTop: '4px' }}>
            Review ratings and feedback submitted by students through the mobile app.
          </p>
        </div>

        <div className="edusync-teachers-view__header-actions" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
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
            onClick={goToAddTeacher}
          >
            + Add teacher
          </button>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <TeacherNavTabs />

      {/* 4 Feedback KPI Cards (Placed below tabbar) */}
      <div className="edusync-teacher-kpis">
        <div className="edusync-teacher-kpi-card">
          <div className="edusync-teacher-kpi-card__top">
            <span className="edusync-teacher-kpi-card__label">Total feedback</span>
          </div>
          <div className="edusync-teacher-kpi-card__value-wrap">
            <span className="edusync-teacher-kpi-card__value">{stats.totalFeedback}</span>
            <span className="edusync-teacher-kpi-card__sub">{stats.totalFeedbackLabel}</span>
          </div>
        </div>

        <div className="edusync-teacher-kpi-card">
          <div className="edusync-teacher-kpi-card__top">
            <span className="edusync-teacher-kpi-card__label">Average rating</span>
          </div>
          <div className="edusync-teacher-kpi-card__value-wrap">
            <span className="edusync-teacher-kpi-card__value">{stats.averageRating}</span>
            <span className="edusync-teacher-kpi-card__sub">{stats.averageRatingLabel}</span>
          </div>
        </div>

        <div className="edusync-teacher-kpi-card">
          <div className="edusync-teacher-kpi-card__top">
            <span className="edusync-teacher-kpi-card__label">New this month</span>
          </div>
          <div className="edusync-teacher-kpi-card__value-wrap">
            <span className="edusync-teacher-kpi-card__value">{stats.newThisMonth}</span>
            <span className="edusync-teacher-kpi-card__sub">{stats.newThisMonthLabel}</span>
          </div>
        </div>

        <div className="edusync-teacher-kpi-card">
          <div className="edusync-teacher-kpi-card__top">
            <span className="edusync-teacher-kpi-card__label">Needs review</span>
          </div>
          <div className="edusync-teacher-kpi-card__value-wrap">
            <span className="edusync-teacher-kpi-card__value">{stats.needsReview}</span>
            <span className="edusync-teacher-kpi-card__sub edusync-teacher-kpi-card__sub--amber">
              {stats.needsReviewLabel}
            </span>
          </div>
        </div>
      </div>

      {/* Full-Width Student Feedback Table Card */}
      <div className="edusync-teacher-directory-card edusync-teacher-directory-card--full">
        <div className="edusync-teacher-directory-card__header">
          <div>
            <h3 className="edusync-teacher-directory-card__title">Student feedback</h3>
            <span className="edusync-teacher-directory-card__count">
              {stats.totalFeedback} submissions
            </span>
          </div>
        </div>

        {/* Filters Toolbar */}
        <div className="edusync-teacher-directory-card__filters edusync-teacher-directory-card__filters--full">
          <div className="edusync-teacher-directory-card__search-wrap edusync-teacher-directory-card__search-wrap--lg">
            <Icon name="search" size={16} className="edusync-input-search-icon" />
            <input
              type="text"
              placeholder="Search student, teacher, comment..."
              className="edusync-teacher-directory-card__search-input"
              value={feedbackFilters.searchQuery}
              onChange={(e) => setFeedbackSearch(e.target.value)}
            />
          </div>

          <select
            className="edusync-teacher-directory-card__select"
            value={feedbackFilters.selectedTeacher}
            onChange={(e) => setFeedbackTeacher(e.target.value)}
            aria-label="Filter by teacher"
          >
            <option value="All teachers">All teachers</option>
            <option value="Sarah Johnson">Sarah Johnson</option>
            <option value="Daniel Kim">Daniel Kim</option>
            <option value="Ayesha Rahman">Ayesha Rahman</option>
            <option value="Michael Chen">Michael Chen</option>
            <option value="Priya Patel">Priya Patel</option>
          </select>

          <select
            className="edusync-teacher-directory-card__select"
            value={feedbackFilters.selectedRating}
            onChange={(e) => setFeedbackRating(e.target.value)}
            aria-label="Filter by rating"
          >
            <option value="All ratings">All ratings</option>
            <option value="5">5 stars</option>
            <option value="4">4+ stars</option>
            <option value="3">3+ stars</option>
          </select>

          <select
            className="edusync-teacher-directory-card__select"
            value={feedbackFilters.selectedStatus}
            onChange={(e) => setFeedbackStatus(e.target.value)}
            aria-label="Filter by status"
          >
            <option value="All statuses">All statuses</option>
            <option value="Published">Published</option>
            <option value="New">New</option>
            <option value="Needs review">Needs review</option>
          </select>

          <div className="edusync-filter-actions">
            <button type="button" className="edusync-btn edusync-btn--primary">
              Apply filters
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="edusync-table-container">
          <table className="edusync-table">
            <thead>
              <tr>
                <th style={{ width: '18%' }}>Student</th>
                <th style={{ width: '18%' }}>Teacher</th>
                <th style={{ width: '12%' }}>Rating</th>
                <th style={{ width: '32%' }}>Feedback</th>
                <th style={{ width: '10%' }}>Date</th>
                <th style={{ width: '10%' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {feedbackList.map((fb) => (
                <tr key={fb.id}>
                  <td>
                    <span className="edusync-table-cell-bold">{fb.studentName}</span>
                  </td>
                  <td>
                    <span className="edusync-table-cell-text">{fb.teacherName}</span>
                  </td>
                  <td>
                    <span className="edusync-rating-cell">
                      <span className="edusync-rating-stars">★★★★★</span>
                      <span className="edusync-rating-number">{fb.rating.toFixed(1)}</span>
                    </span>
                  </td>
                  <td>
                    <span className="edusync-table-cell-text">{fb.feedbackText}</span>
                  </td>
                  <td>
                    <span className="edusync-table-cell-text">{fb.date}</span>
                  </td>
                  <td>
                    <span
                      className={`edusync-badge-pill ${
                        fb.status === 'Published'
                          ? 'edusync-badge-pill--success'
                          : fb.status === 'New'
                          ? 'edusync-badge-pill--info'
                          : 'edusync-badge-pill--warning'
                      }`}
                    >
                      {fb.status}
                    </span>
                  </td>
                </tr>
              ))}
              {feedbackList.length === 0 && (
                <tr>
                  <td colSpan={6} className="edusync-table-empty">
                    No feedback records match the filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="edusync-table-footer">
          <span className="edusync-table-footer__info">
            Showing 1–{feedbackList.length} of {stats.totalFeedback} feedback submissions
          </span>
          <div className="edusync-pagination">
            <button type="button" className="edusync-pagination__btn" disabled>
              Previous
            </button>
            <div className="edusync-pagination__pages">
              <button type="button" className="edusync-pagination__page-num edusync-pagination__page-num--active">
                1
              </button>
            </div>
            <button type="button" className="edusync-pagination__btn" disabled>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
