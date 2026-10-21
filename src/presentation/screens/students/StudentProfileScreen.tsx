import React from 'react';
import { useStudentFlow } from '../../../application/state/student-flow.context';

interface StudentProfileScreenProps {
  onNavigateToDashboard: () => void;
}

export const StudentProfileScreen: React.FC<StudentProfileScreenProps> = ({
  onNavigateToDashboard,
}) => {
  const {
    selectedStudent,
    goToConsolidatedOverview,
    goToDirectory,
    goToEditStudent,
  } = useStudentFlow();

  const student = selectedStudent;

  if (!student) {
    return (
      <div className="edusync-students-view">
        <p>
          No student selected.{' '}
          <button
            type="button"
            className="edusync-btn edusync-btn--secondary"
            onClick={goToConsolidatedOverview}
          >
            ← Back to students
          </button>
        </p>
      </div>
    );
  }

  return (
    <div className="edusync-students-view">
      {/* Top Header & Breadcrumbs */}
      <div className="edusync-students-view__top-bar">
        <div className="edusync-students-view__header-left">
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
              Students
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
              title="Back to students overview"
              aria-label="Back to students overview"
            >
              ←
            </button>
            <h1 className="edusync-dashboard-hero__title" style={{ margin: 0 }}>Student profile</h1>
          </div>
          <p className="edusync-dashboard-hero__subtitle" style={{ marginTop: '4px' }}>
            View student information, academic progress, attendance, and payments.
          </p>
        </div>

        <div className="edusync-students-view__header-actions" style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="edusync-btn edusync-btn--secondary"
            onClick={goToConsolidatedOverview}
          >
            ← Back to students
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
            onClick={() => goToEditStudent(student)}
          >
            Edit student
          </button>
        </div>
      </div>

      {/* Hero Overview Card */}
      <div className="edusync-student-profile-hero-card">
        <div className="edusync-student-profile-hero-card__left">
          <div
            className="edusync-student-profile-hero-card__avatar"
            style={{ backgroundColor: student.avatarColor }}
          >
            {student.initials}
          </div>
          <div className="edusync-student-profile-hero-card__info">
            <h2 className="edusync-student-profile-hero-card__name">{student.fullName}</h2>
            <span className="edusync-student-profile-hero-card__id">
              Student ID: {student.studentId}
            </span>
            <div className="edusync-student-profile-hero-card__meta-row">
              <span className="edusync-student-profile-hero-card__class">
                {student.grade} · Section {student.section} · Roll {student.rollNumber}
              </span>
              <span
                className={`edusync-badge-pill ${
                  student.status === 'Active'
                    ? 'edusync-badge-pill--success'
                    : 'edusync-badge-pill--warning'
                }`}
              >
                {student.status}
              </span>
            </div>
          </div>
        </div>

        <div className="edusync-student-profile-hero-card__right">
          <span className="edusync-student-profile-hero-card__guardian-label">
            Guardian: {student.guardianName}
          </span>
          <span className="edusync-student-profile-hero-card__email">{student.email}</span>
        </div>
      </div>

      {/* Two-Column Details Grid */}
      <div className="edusync-student-profile-grid">
        {/* Left Card: Profile information */}
        <div className="edusync-student-profile-card">
          <h3 className="edusync-student-profile-card__title">Profile information</h3>
          <div className="edusync-student-profile-card__rows">
            <div className="edusync-student-profile-card__row">
              <span className="edusync-student-profile-card__label">Date of birth</span>
              <span className="edusync-student-profile-card__value">{student.dateOfBirth}</span>
            </div>
            <div className="edusync-student-profile-card__row">
              <span className="edusync-student-profile-card__label">Gender</span>
              <span className="edusync-student-profile-card__value">{student.gender}</span>
            </div>
            <div className="edusync-student-profile-card__row">
              <span className="edusync-student-profile-card__label">Enrollment date</span>
              <span className="edusync-student-profile-card__value">{student.enrollmentDate}</span>
            </div>
            <div className="edusync-student-profile-card__row">
              <span className="edusync-student-profile-card__label">Academic year</span>
              <span className="edusync-student-profile-card__value">{student.academicYear}</span>
            </div>
            <div className="edusync-student-profile-card__row">
              <span className="edusync-student-profile-card__label">Emergency contact</span>
              <span className="edusync-student-profile-card__value">
                {student.emergencyContact || student.guardianName}
              </span>
            </div>
          </div>
        </div>

        {/* Right Card: Academic summary */}
        <div className="edusync-student-profile-card">
          <h3 className="edusync-student-profile-card__title">Academic summary</h3>
          <div className="edusync-student-profile-card__rows">
            <div className="edusync-student-profile-card__row">
              <span className="edusync-student-profile-card__label">Attendance</span>
              <span className="edusync-student-profile-card__value edusync-student-profile-card__value--green">
                {student.attendanceRate > 0 ? `${student.attendanceRate}%` : '—'}
              </span>
            </div>
            <div className="edusync-student-profile-card__row">
              <span className="edusync-student-profile-card__label">Average result</span>
              <span className="edusync-student-profile-card__value edusync-student-profile-card__value--blue">
                {student.averageResult > 0 ? `${student.averageResult}%` : '—'}
              </span>
            </div>
            <div className="edusync-student-profile-card__row">
              <span className="edusync-student-profile-card__label">Assignments</span>
              <span className="edusync-student-profile-card__value edusync-student-profile-card__value--blue">
                {student.assignmentsCompleted} / {student.assignmentsTotal}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Full-Width Card: Guardian & fee details */}
      <div className="edusync-student-profile-card edusync-student-profile-card--full">
        <h3 className="edusync-student-profile-card__title">Guardian &amp; fee details</h3>
        <div className="edusync-student-profile-fee-grid">
          <div className="edusync-student-profile-fee-grid__left">
            <h4 className="edusync-student-profile-fee-grid__guardian-name">
              {student.guardianName} · {student.guardianRelationship}
            </h4>
            <div className="edusync-student-profile-fee-grid__contact-row">
              <span>Phone {student.guardianPhone}</span>
            </div>
            <div className="edusync-student-profile-fee-grid__contact-row">
              <span>{student.guardianEmail || student.email}</span>
            </div>
          </div>

          <div className="edusync-student-profile-fee-grid__right">
            <div className="edusync-student-profile-fee-grid__balance-line">
              <span className="edusync-student-profile-fee-grid__balance-label">
                Outstanding balance: ${student.outstandingBalance.toFixed(2)}
              </span>
            </div>
            <div className="edusync-student-profile-fee-grid__status-line">
              <span
                className={`edusync-badge-pill ${
                  student.feeStatus === 'Paid'
                    ? 'edusync-badge-pill--success'
                    : student.feeStatus === 'Overdue'
                    ? 'edusync-badge-pill--error'
                    : 'edusync-badge-pill--warning'
                }`}
              >
                {student.feeStatus}
              </span>
            </div>
            <div className="edusync-student-profile-fee-grid__note">
              {student.recentFeeActivity || 'Term 1 tuition · $480.00 · Paid 02 Oct 2026'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
