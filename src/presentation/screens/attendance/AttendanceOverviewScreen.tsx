import React from 'react';
import { useAttendanceFlow } from '../../../application/state/attendance-flow.context';
import { AttendanceKpis } from './components/AttendanceKpis';
import { AttendanceNavTabs } from './components/AttendanceNavTabs';

interface AttendanceOverviewScreenProps {
  onNavigateToDashboard: () => void;
}

export const AttendanceOverviewScreen: React.FC<AttendanceOverviewScreenProps> = ({
  onNavigateToDashboard,
}) => {
  const {
    trendPoints,
    statusDistribution,
    classSummaries,
    followUps,
    goToDailyRecords,
    goToNotificationsStates,
    showToast,
  } = useAttendanceFlow();

  const totalDist = statusDistribution?.total || 1275;
  const presentPct = Math.round(((statusDistribution?.present || 1142) / totalDist) * 100);
  const absentPct = Math.round(((statusDistribution?.absent || 76) / totalDist) * 100);
  const latePct = Math.round(((statusDistribution?.late || 31) / totalDist) * 100);
  const excusedPct = Math.round(((statusDistribution?.excused || 26) / totalDist) * 100);

  return (
    <div className="attendance-container">
      {/* 1. HERO & BREADCRUMBS */}
      <div className="attendance-hero">
        <div>
          <div className="attendance-hero__crumbs">
            <button
              type="button"
              className="attendance-hero__crumb--link"
              onClick={onNavigateToDashboard}
            >
              Dashboard
            </button>
            <span className="attendance-hero__crumb-sep">/</span>
            <span style={{ fontWeight: 500 }}>Attendance</span>
            <span className="attendance-hero__crumb-sep">/</span>
            <span style={{ color: 'var(--edusync-text-navy, #14213D)', fontWeight: 600 }}>Overview</span>
          </div>

          <div className="attendance-hero__title-row">
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
              <h1 className="attendance-hero__title">Attendance overview</h1>
              <p className="attendance-hero__subtitle">
                Review daily attendance, trends, class performance, and absence follow-ups.
              </p>
            </div>
          </div>
        </div>

        <div className="attendance-hero__actions">
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
            onClick={() => goToDailyRecords()}
          >
            Take attendance
          </button>
        </div>
      </div>

      {/* 2. SUB-NAVIGATION TABS */}
      <AttendanceNavTabs />

      {/* 3. 4 KPI CARDS */}
      <AttendanceKpis />

      {/* 4. ROW 1: TREND CHART & STATUS DISTRIBUTION */}
      <div className="attendance-grid-60-40">
        {/* LEFT: ATTENDANCE TREND */}
        <div className="attendance-card">
          <div className="attendance-card__header">
            <div>
              <h3 className="attendance-card__title">Attendance trend</h3>
              <p className="attendance-card__subtitle">Daily attendance rate · October 2026</p>
            </div>
          </div>

          <div className="attendance-trend-chart-box">
            <div className="attendance-trend-bars">
              {trendPoints.map((pt) => {
                const heightPct = Math.max(10, (pt.rate - 70) * 3.3);
                return (
                  <div key={pt.day} className="attendance-trend-bar-col">
                    <span className="attendance-trend-bar-val">{pt.rate}%</span>
                    <div
                      className="attendance-trend-bar"
                      style={{
                        height: `${heightPct}%`,
                        background: pt.rate >= 93 ? '#3659D9' : pt.rate >= 88 ? '#60A5FA' : '#F59E0B',
                      }}
                      title={`Day ${pt.day}: ${pt.rate}%`}
                    ></div>
                    <span className="attendance-trend-bar-day">{pt.day}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT: STATUS DISTRIBUTION */}
        <div className="attendance-card">
          <div className="attendance-card__header">
            <div>
              <h3 className="attendance-card__title">Status distribution</h3>
              <p className="attendance-card__subtitle">Today's student attendance</p>
            </div>
          </div>

          <div className="attendance-dist-list">
            <div className="attendance-dist-row">
              <div className="attendance-dist-header">
                <span style={{ color: '#15803D' }}>Present</span>
                <span>{statusDistribution?.present?.toLocaleString() || '1,142'} ({presentPct}%)</span>
              </div>
              <div className="attendance-dist-bar-track">
                <div
                  className="attendance-dist-bar-fill"
                  style={{ width: `${presentPct}%`, background: '#15803D' }}
                ></div>
              </div>
            </div>

            <div className="attendance-dist-row">
              <div className="attendance-dist-header">
                <span style={{ color: '#DC2626' }}>Absent</span>
                <span>{statusDistribution?.absent || 76} ({absentPct}%)</span>
              </div>
              <div className="attendance-dist-bar-track">
                <div
                  className="attendance-dist-bar-fill"
                  style={{ width: `${Math.max(5, absentPct * 4)}%`, background: '#DC2626' }}
                ></div>
              </div>
            </div>

            <div className="attendance-dist-row">
              <div className="attendance-dist-header">
                <span style={{ color: '#D97706' }}>Late</span>
                <span>{statusDistribution?.late || 31} ({latePct}%)</span>
              </div>
              <div className="attendance-dist-bar-track">
                <div
                  className="attendance-dist-bar-fill"
                  style={{ width: `${Math.max(4, latePct * 5)}%`, background: '#D97706' }}
                ></div>
              </div>
            </div>

            <div className="attendance-dist-row">
              <div className="attendance-dist-header">
                <span style={{ color: '#3659D9' }}>Excused</span>
                <span>{statusDistribution?.excused || 26} ({excusedPct}%)</span>
              </div>
              <div className="attendance-dist-bar-track">
                <div
                  className="attendance-dist-bar-fill"
                  style={{ width: `${Math.max(3, excusedPct * 5)}%`, background: '#3659D9' }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. ROW 2: CLASS ATTENDANCE SUMMARY & ABSENCE FOLLOW-UPS */}
      <div className="attendance-grid-60-40">
        {/* LEFT: CLASS-WISE ATTENDANCE */}
        <div className="attendance-card">
          <div className="attendance-card__header">
            <div>
              <h3 className="attendance-card__title">Class-wise attendance</h3>
              <p className="attendance-card__subtitle">Classes with the lowest attendance first</p>
            </div>
          </div>

          <div style={{ width: '100%', overflowX: 'auto' }}>
            <table className="academic-table">
              <thead>
                <tr>
                  <th>Class</th>
                  <th>Present</th>
                  <th>Absent</th>
                  <th>Rate</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {classSummaries.map((cls) => (
                  <tr key={cls.id}>
                    <td style={{ fontWeight: 600 }}>
                      {cls.className} · {cls.section}
                    </td>
                    <td>{cls.presentCount} / {cls.totalStudents}</td>
                    <td style={{ color: '#DC2626', fontWeight: 600 }}>{cls.absentCount}</td>
                    <td style={{ fontWeight: 600 }}>{cls.rate}</td>
                    <td>
                      <span
                        className={`academic-pill ${
                          cls.status === 'Recorded' ? 'academic-pill--active' : 'academic-pill--warning'
                        }`}
                      >
                        {cls.status}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        type="button"
                        className="edusync-btn edusync-btn--secondary"
                        style={{ padding: '4px 10px', fontSize: 12 }}
                        onClick={() => goToDailyRecords(cls.className, cls.section)}
                      >
                        {cls.status === 'Pending' ? 'Record' : 'View'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT: ABSENCE FOLLOW-UPS */}
        <div className="attendance-card">
          <div className="attendance-card__header">
            <div>
              <h3 className="attendance-card__title">Absence follow-ups</h3>
              <p className="attendance-card__subtitle">
                Recent notifications for repeated or unexcused absences
              </p>
            </div>
          </div>

          <div className="attendance-followup-list">
            {followUps.map((fu) => (
              <div key={fu.id} className="attendance-followup-item">
                <div className="attendance-followup-item__info">
                  <span className="attendance-followup-item__name">{fu.studentName}</span>
                  <span className="attendance-followup-item__trigger">{fu.trigger}</span>
                  <span className="attendance-followup-item__time">{fu.timestamp}</span>
                </div>
                <button
                  type="button"
                  className="edusync-btn edusync-btn--secondary"
                  style={{ padding: '5px 12px', fontSize: 12 }}
                  onClick={() => showToast('success', `Reviewing absence record for ${fu.studentName}`)}
                >
                  Review
                </button>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 16, textAlign: 'center' }}>
            <button
              type="button"
              className="edusync-hero__crumb--link"
              style={{ fontSize: 13, fontWeight: 600, color: 'var(--edusync-brand-primary, #3659D9)' }}
              onClick={goToNotificationsStates}
            >
              View all notifications →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
