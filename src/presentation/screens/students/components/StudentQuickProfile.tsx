import React from 'react';
import type { Student } from '../../../../core/entities/student.types';
import { useStudentFlow } from '../../../../application/state/student-flow.context';

interface StudentQuickProfileProps {
  student: Student | null;
}

export const StudentQuickProfile: React.FC<StudentQuickProfileProps> = ({ student }) => {
  const { goToEditStudent, goToProfile } = useStudentFlow();

  if (!student) {
    return (
      <div className="edusync-student-quick-profile edusync-student-quick-profile--empty">
        <p>Select a student to view details.</p>
      </div>
    );
  }

  return (
    <div className="edusync-student-quick-profile">
      <div className="edusync-student-quick-profile__header">
        <h3 className="edusync-student-quick-profile__title">Student profile</h3>
      </div>

      <div className="edusync-student-quick-profile__content">
        {/* Top Identity Block */}
        <div className="edusync-student-quick-profile__identity">
          <div
            className="edusync-student-quick-profile__avatar"
            style={{ backgroundColor: student.avatarColor }}
          >
            {student.initials}
          </div>
          <div className="edusync-student-quick-profile__identity-info">
            <h4
              className="edusync-student-quick-profile__name"
              onClick={() => goToProfile(student)}
              title="Click to view full profile"
            >
              {student.fullName}
            </h4>
            <span className="edusync-student-quick-profile__meta">
              {student.studentId} · {student.grade} {student.section} · Roll {student.rollNumber}
            </span>
            <div className="edusync-student-quick-profile__badge-row">
              <span
                className={`edusync-badge-pill ${
                  student.status === 'Active' ? 'edusync-badge-pill--success' : 'edusync-badge-pill--warning'
                }`}
              >
                {student.status}
              </span>
            </div>
          </div>
        </div>

        {/* Profile Information Section */}
        <div className="edusync-student-quick-profile__section">
          <h5 className="edusync-student-quick-profile__section-title">Profile information</h5>
          <div className="edusync-student-quick-profile__rows">
            <div className="edusync-student-quick-profile__row">
              <span className="edusync-student-quick-profile__row-label">Date of birth</span>
              <span className="edusync-student-quick-profile__row-value">{student.dateOfBirth}</span>
            </div>
            <div className="edusync-student-quick-profile__row">
              <span className="edusync-student-quick-profile__row-label">Gender</span>
              <span className="edusync-student-quick-profile__row-value">{student.gender}</span>
            </div>
            <div className="edusync-student-quick-profile__row">
              <span className="edusync-student-quick-profile__row-label">Enrollment</span>
              <span className="edusync-student-quick-profile__row-value">{student.enrollmentDate}</span>
            </div>
            <div className="edusync-student-quick-profile__row">
              <span className="edusync-student-quick-profile__row-label">Academic year</span>
              <span className="edusync-student-quick-profile__row-value">{student.academicYear}</span>
            </div>
            <div className="edusync-student-quick-profile__row">
              <span className="edusync-student-quick-profile__row-label">Guardian</span>
              <span className="edusync-student-quick-profile__row-value">{student.guardianName}</span>
            </div>
            <div className="edusync-student-quick-profile__row">
              <span className="edusync-student-quick-profile__row-label">Guardian phone</span>
              <span className="edusync-student-quick-profile__row-value">{student.guardianPhone}</span>
            </div>
          </div>
        </div>

        {/* Academic Summary Section */}
        <div className="edusync-student-quick-profile__section">
          <h5 className="edusync-student-quick-profile__section-title">Academic summary</h5>
          <div className="edusync-student-quick-profile__rows">
            <div className="edusync-student-quick-profile__row">
              <span className="edusync-student-quick-profile__row-label">Attendance</span>
              <span className="edusync-student-quick-profile__row-value edusync-student-quick-profile__val--green">
                {student.attendanceRate > 0 ? `${student.attendanceRate}%` : '—'}
              </span>
            </div>
            <div className="edusync-student-quick-profile__row">
              <span className="edusync-student-quick-profile__row-label">Average result</span>
              <span className="edusync-student-quick-profile__row-value edusync-student-quick-profile__val--blue">
                {student.averageResult > 0 ? `${student.averageResult}%` : '—'}
              </span>
            </div>
            <div className="edusync-student-quick-profile__row">
              <span className="edusync-student-quick-profile__row-label">Assignments</span>
              <span className="edusync-student-quick-profile__row-value edusync-student-quick-profile__val--blue">
                {student.assignmentsCompleted} / {student.assignmentsTotal}
              </span>
            </div>
          </div>
        </div>

        {/* Fees & Payments Section */}
        <div className="edusync-student-quick-profile__section">
          <h5 className="edusync-student-quick-profile__section-title">Fees &amp; payments</h5>
          <div className="edusync-student-quick-profile__fee-row">
            <div>
              <span className="edusync-student-quick-profile__row-label">Outstanding balance: </span>
              <span className="edusync-student-quick-profile__fee-amount">
                ${student.outstandingBalance.toFixed(2)}
              </span>
            </div>
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
        </div>

        {/* Recent Activity Section */}
        <div className="edusync-student-quick-profile__section">
          <h5 className="edusync-student-quick-profile__section-title">Recent activity</h5>
          <div className="edusync-student-quick-profile__activity-list">
            {student.recentFeeActivity && (
              <div className="edusync-student-quick-profile__activity-item">
                {student.recentFeeActivity}
              </div>
            )}
            {student.recentAcademicActivity && (
              <div className="edusync-student-quick-profile__activity-item">
                {student.recentAcademicActivity}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="edusync-student-quick-profile__actions">
          <button
            type="button"
            className="edusync-btn edusync-btn--secondary edusync-btn--sm"
            onClick={() => goToProfile(student)}
          >
            View attendance
          </button>
          <button
            type="button"
            className="edusync-btn edusync-btn--secondary edusync-btn--sm"
            onClick={() => goToProfile(student)}
          >
            View results
          </button>
          <button
            type="button"
            className="edusync-btn edusync-btn--primary edusync-btn--sm"
            onClick={() => goToEditStudent(student)}
          >
            Edit student
          </button>
        </div>
      </div>
    </div>
  );
};
