import React from 'react';
import type { Teacher } from '../../../../core/entities/teacher.types';
import { useTeacherFlow } from '../../../../application/state/teacher-flow.context';

interface TeacherQuickProfileProps {
  teacher: Teacher | null;
}

export const TeacherQuickProfile: React.FC<TeacherQuickProfileProps> = ({ teacher }) => {
  const { goToEditTeacher, goToProfile, goToFeedback } = useTeacherFlow();

  if (!teacher) {
    return (
      <div className="edusync-teacher-quick-profile edusync-teacher-quick-profile--empty">
        <p>Select a teacher to view details.</p>
      </div>
    );
  }

  return (
    <div className="edusync-teacher-quick-profile">
      <div className="edusync-teacher-quick-profile__header">
        <h3 className="edusync-teacher-quick-profile__title">Teacher profile</h3>
      </div>

      <div className="edusync-teacher-quick-profile__content">
        {/* Top Identity Block */}
        <div className="edusync-teacher-quick-profile__identity">
          <div
            className="edusync-teacher-quick-profile__avatar"
            style={{ backgroundColor: teacher.avatarColor }}
          >
            {teacher.initials}
          </div>
          <div className="edusync-teacher-quick-profile__identity-info">
            <h4
              className="edusync-teacher-quick-profile__name"
              onClick={() => goToProfile(teacher)}
              title="Click to view full profile"
            >
              {teacher.fullName}
            </h4>
            <span className="edusync-teacher-quick-profile__meta">
              {teacher.teacherId} · {teacher.department.split('&')[0].trim()}
            </span>
            <div className="edusync-teacher-quick-profile__badge-row">
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

        {/* Contact Information Section */}
        <div className="edusync-teacher-quick-profile__section">
          <h5 className="edusync-teacher-quick-profile__section-title">Contact information</h5>
          <div className="edusync-teacher-quick-profile__rows">
            <div className="edusync-teacher-quick-profile__row">
              <span className="edusync-teacher-quick-profile__row-label">Email</span>
              <span className="edusync-teacher-quick-profile__row-value">{teacher.email}</span>
            </div>
            <div className="edusync-teacher-quick-profile__row">
              <span className="edusync-teacher-quick-profile__row-label">Phone</span>
              <span className="edusync-teacher-quick-profile__row-value">{teacher.phone}</span>
            </div>
            <div className="edusync-teacher-quick-profile__row">
              <span className="edusync-teacher-quick-profile__row-label">Department</span>
              <span className="edusync-teacher-quick-profile__row-value">{teacher.department}</span>
            </div>
            <div className="edusync-teacher-quick-profile__row">
              <span className="edusync-teacher-quick-profile__row-label">Employment</span>
              <span className="edusync-teacher-quick-profile__row-value">{teacher.employmentType}</span>
            </div>
            <div className="edusync-teacher-quick-profile__row">
              <span className="edusync-teacher-quick-profile__row-label">Joining date</span>
              <span className="edusync-teacher-quick-profile__row-value">{teacher.joiningDate}</span>
            </div>
            <div className="edusync-teacher-quick-profile__row">
              <span className="edusync-teacher-quick-profile__row-label">Qualification</span>
              <span className="edusync-teacher-quick-profile__row-value">{teacher.qualification}</span>
            </div>
          </div>
        </div>

        {/* Assigned Classes & Subjects */}
        <div className="edusync-teacher-quick-profile__section">
          <h5 className="edusync-teacher-quick-profile__section-title">
            Assigned classes &amp; subjects
          </h5>
          <div className="edusync-teacher-quick-profile__subject-pills">
            {teacher.subjects.map((subj) => (
              <span key={subj} className="edusync-subject-tag">
                {subj}
              </span>
            ))}
          </div>
          <div className="edusync-teacher-quick-profile__period-rows">
            {teacher.assignedClasses.map((ac) => (
              <div key={ac.gradeAndSection} className="edusync-teacher-quick-profile__period-row">
                <span className="edusync-teacher-quick-profile__period-class">
                  {ac.gradeAndSection}
                </span>
                <span className="edusync-teacher-quick-profile__period-count">
                  {ac.periodsPerWeek} periods/week
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Availability */}
        <div className="edusync-teacher-quick-profile__section">
          <h5 className="edusync-teacher-quick-profile__section-title">Availability</h5>
          <div className="edusync-teacher-quick-profile__avail-line">
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
            <span className="edusync-teacher-quick-profile__avail-hours">
              {teacher.availableHours}
            </span>
          </div>
          <span className="edusync-teacher-quick-profile__avail-note">
            Leave and unavailable periods can be reviewed here.
          </span>
        </div>

        {/* Teacher Rating Sub-Card */}
        <div className="edusync-teacher-rating-box">
          <div className="edusync-teacher-rating-box__left">
            <div className="edusync-teacher-rating-box__label">Teacher Rating</div>
            <div className="edusync-teacher-rating-box__score-line">
              <span className="edusync-teacher-rating-box__score">{teacher.rating.toFixed(1)}</span>
              <span className="edusync-teacher-rating-box__stars">★★★★★</span>
              <span className="edusync-teacher-rating-box__reviews">
                {teacher.reviewCount} reviews
              </span>
            </div>
            <div className="edusync-teacher-rating-box__note">
              Based on student-submitted ratings and reviews.
            </div>
          </div>
          <button
            type="button"
            className="edusync-btn edusync-btn--secondary edusync-btn--sm"
            onClick={goToFeedback}
          >
            View feedback
          </button>
        </div>

        {/* Bottom Actions */}
        <div className="edusync-teacher-quick-profile__actions">
          <button
            type="button"
            className="edusync-btn edusync-btn--secondary edusync-btn--sm"
            onClick={() => goToProfile(teacher)}
          >
            View timetable
          </button>
          <button
            type="button"
            className="edusync-btn edusync-btn--primary edusync-btn--sm"
            onClick={() => goToEditTeacher(teacher)}
          >
            Edit teacher
          </button>
        </div>
      </div>
    </div>
  );
};
