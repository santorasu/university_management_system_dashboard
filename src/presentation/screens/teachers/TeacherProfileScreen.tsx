import React from 'react';
import { useTeacherFlow } from '../../../application/state/teacher-flow.context';

interface TeacherProfileScreenProps {
  onNavigateToDashboard: () => void;
}

export const TeacherProfileScreen: React.FC<TeacherProfileScreenProps> = ({
  onNavigateToDashboard,
}) => {
  const {
    selectedTeacher,
    goToConsolidatedOverview,
    goToDirectory,
    goToEditTeacher,
  } = useTeacherFlow();

  const teacher = selectedTeacher;

  if (!teacher) {
    return (
      <div className="edusync-teachers-view">
        <p>
          No teacher selected.{' '}
          <button onClick={goToConsolidatedOverview}>Back to teachers</button>
        </p>
      </div>
    );
  }

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
              onClick={goToConsolidatedOverview}
              role="button"
              tabIndex={0}
            >
              Teachers
            </span>
            <span className="edusync-dashboard-hero__crumb-sep">/</span>
            <span className="edusync-dashboard-hero__crumb edusync-dashboard-hero__crumb--current">
              Profile
            </span>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '6px' }}>
            <button
              type="button"
              className="edusync-btn-back-circle"
              onClick={goToConsolidatedOverview}
              title="Back to teachers overview"
              aria-label="Back to teachers overview"
            >
              ←
            </button>
            <h1 className="edusync-dashboard-hero__title" style={{ margin: 0 }}>Teacher profile</h1>
          </div>
          <p className="edusync-dashboard-hero__subtitle" style={{ marginTop: '4px' }}>
            View contact information, employment details, assigned classes, and availability.
          </p>
        </div>

        <div className="edusync-teachers-view__header-actions" style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="edusync-btn edusync-btn--secondary"
            onClick={goToConsolidatedOverview}
          >
            ← Back to teachers
          </button>
          <button
            type="button"
            className="edusync-btn edusync-btn--secondary"
            onClick={goToDirectory}
          >
            Directory list
          </button>
          <button
            type="button"
            className="edusync-btn edusync-btn--primary"
            onClick={() => goToEditTeacher(teacher)}
          >
            Edit teacher
          </button>
        </div>
      </div>

      {/* Hero Overview Card */}
      <div className="edusync-teacher-profile-hero-card">
        <div className="edusync-teacher-profile-hero-card__left">
          <div
            className="edusync-teacher-profile-hero-card__avatar"
            style={{ backgroundColor: teacher.avatarColor }}
          >
            {teacher.initials}
          </div>
          <div className="edusync-teacher-profile-hero-card__info">
            <h2 className="edusync-teacher-profile-hero-card__name">{teacher.fullName}</h2>
            <span className="edusync-teacher-profile-hero-card__id">
              Teacher ID: {teacher.teacherId}
            </span>
            <div className="edusync-teacher-profile-hero-card__meta-row">
              <span className="edusync-teacher-profile-hero-card__dept">
                {teacher.department.replace('&', '·')}
              </span>
              <span
                className={`edusync-badge-pill ${
                  teacher.status === 'Active'
                    ? 'edusync-badge-pill--success'
                    : teacher.status === 'On leave'
                    ? 'edusync-badge-pill--warning'
                    : 'edusync-badge-pill--neutral'
                }`}
              >
                {teacher.status}
              </span>
            </div>
          </div>
        </div>

        <div className="edusync-teacher-profile-hero-card__right">
          <span className="edusync-teacher-profile-hero-card__email">{teacher.email}</span>
          <span className="edusync-teacher-profile-hero-card__phone">{teacher.phone}</span>
        </div>
      </div>

      {/* Two-Column Grid */}
      <div className="edusync-teacher-profile-grid">
        {/* Left Card: Contact Information */}
        <div className="edusync-teacher-profile-card">
          <h3 className="edusync-teacher-profile-card__title">Contact information</h3>
          <div className="edusync-teacher-profile-card__rows">
            <div className="edusync-teacher-profile-card__row">
              <span className="edusync-teacher-profile-card__label">Email</span>
              <span className="edusync-teacher-profile-card__value">{teacher.email}</span>
            </div>
            <div className="edusync-teacher-profile-card__row">
              <span className="edusync-teacher-profile-card__label">Phone</span>
              <span className="edusync-teacher-profile-card__value">{teacher.phone}</span>
            </div>
            <div className="edusync-teacher-profile-card__row">
              <span className="edusync-teacher-profile-card__label">Address</span>
              <span className="edusync-teacher-profile-card__value">
                {teacher.address || '24 Lakeview Road'}
              </span>
            </div>
            <div className="edusync-teacher-profile-card__row">
              <span className="edusync-teacher-profile-card__label">Emergency contact</span>
              <span className="edusync-teacher-profile-card__value">
                {teacher.emergencyContact || 'James Johnson'}
              </span>
            </div>
            <div className="edusync-teacher-profile-card__row">
              <span className="edusync-teacher-profile-card__label">Preferred contact</span>
              <span className="edusync-teacher-profile-card__value">
                {teacher.preferredContact || 'Email'}
              </span>
            </div>
          </div>
        </div>

        {/* Right Card: Assigned classes & subjects */}
        <div className="edusync-teacher-profile-card">
          <h3 className="edusync-teacher-profile-card__title">
            Assigned classes &amp; subjects
          </h3>
          <div className="edusync-teacher-profile-card__subject-pills">
            {teacher.subjects.map((s) => (
              <span key={s} className="edusync-subject-tag">
                {s}
              </span>
            ))}
          </div>
          <div className="edusync-teacher-profile-card__period-rows">
            {teacher.assignedClasses.map((ac) => (
              <div key={ac.gradeAndSection} className="edusync-teacher-profile-card__period-row">
                <span className="edusync-teacher-profile-card__period-class">
                  {ac.gradeAndSection}
                </span>
                <span className="edusync-teacher-profile-card__period-count">
                  {ac.periodsPerWeek} periods/week
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Full-Width Card: Employment & availability */}
      <div className="edusync-teacher-profile-card edusync-teacher-profile-card--full">
        <h3 className="edusync-teacher-profile-card__title">Employment &amp; availability</h3>
        <div className="edusync-teacher-profile-avail-grid">
          <div className="edusync-teacher-profile-avail-grid__left">
            <h4 className="edusync-teacher-profile-avail-grid__emp-line">
              {teacher.employmentType} · Joined {teacher.joiningDate}
            </h4>
            <div className="edusync-teacher-profile-avail-grid__qual-line">
              {teacher.qualification} · {teacher.experienceYears || 6} years experience
            </div>
          </div>

          <div className="edusync-teacher-profile-avail-grid__right">
            <div className="edusync-teacher-profile-avail-grid__hours-line">
              <span>{teacher.availableHours}</span>
            </div>
            <div className="edusync-teacher-profile-avail-grid__status-line">
              <span
                className={`edusync-badge-pill ${
                  teacher.availability === 'Available'
                    ? 'edusync-badge-pill--success'
                    : teacher.availability === 'On leave'
                    ? 'edusync-badge-pill--warning'
                    : teacher.availability === 'Limited'
                    ? 'edusync-badge-pill--warning'
                    : 'edusync-badge-pill--error'
                }`}
              >
                {teacher.availability}
              </span>
            </div>
            <div className="edusync-teacher-profile-avail-grid__note">
              Leave and unavailable periods can be reviewed here.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
