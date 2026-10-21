import React, { useState } from 'react';
import { StatCard } from './components/StatCard';
import { AttendanceChart } from './components/AttendanceChart';
import { FeeDonutChart } from './components/FeeDonutChart';
import { Checkbox } from '../../widgets/Checkbox/Checkbox';
import { Button } from '../../widgets/Button/Button';
import { Icon } from '../../widgets/Icon/Icon';
import type { DashboardDestination } from '../../../core/entities/auth.types';

interface DashboardOverviewProps {
  onNavigate: (destination: DashboardDestination) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({ onNavigate }) => {
  const [task1, setTask1] = useState(false);
  const [task2, setTask2] = useState(false);
  const [task3, setTask3] = useState(false);

  return (
    <div className="edusync-dash-overview">
      {/* BREADCRUMB */}
      <nav className="edusync-dash-breadcrumb" aria-label="Breadcrumb">
        <span>Maple Grove School</span>
        <span className="edusync-dash-breadcrumb__separator">&gt;</span>
        <span className="edusync-dash-breadcrumb__current">Dashboard</span>
      </nav>

      {/* PAGE HEADER */}
      <div className="edusync-dash-page-header">
        <div>
          <h1 className="edusync-dash-page-title">Dashboard</h1>
          <p className="edusync-dash-page-subtitle">
            Good morning, Alex. Here’s your school at a glance.
          </p>
        </div>

        <div className="edusync-dash-page-actions">
          <button type="button" className="edusync-dash-date-btn">
            <Icon name="calendar-days" size={14} />
            <span>Fri, 16 Oct 2026</span>
          </button>
          <Button variant="primary" size="md" fullWidth={false} onClick={() => alert('Exporting school summary report...')}>
            Export report
          </Button>
        </div>
      </div>

      {/* ROW 1: 5 METRIC STAT CARDS */}
      <div className="edusync-dash-stats-row">
        <StatCard
          label="Students"
          value="1,248"
          subtext="Enrolled · 2026–27"
          onClick={() => onNavigate('STUDENTS')}
        />
        <StatCard
          label="Teachers"
          value="86"
          subtext="Active teachers · 2026–27"
          onClick={() => onNavigate('TEACHERS')}
        />
        <StatCard
          label="Classes & Subjects"
          value="42"
          subtext="Classes · 2026–27"
          onClick={() => onNavigate('CLASSES_SUBJECTS')}
        />
        <StatCard
          label="Attendance"
          value="96.0%"
          subtext="1,198 present · 16 Oct"
        />
        <StatCard
          label="Fees & Finance"
          value="$408,000"
          subtext="85% collected · Term 1"
        />
      </div>

      {/* ROW 2: ANALYTICS CARDS (ATTENDANCE & FINANCE) */}
      <div className="edusync-dash-analytics-row">
        {/* Attendance Widget */}
        <div className="edusync-dash-card">
          <div className="edusync-dash-card__header">
            <div>
              <h3 className="edusync-dash-card__title">Attendance</h3>
              <p className="edusync-dash-card__subtitle">Student attendance · 12–16 October 2026</p>
            </div>
            <button
              type="button"
              className="edusync-dash-link-action"
              onClick={() => onNavigate('ATTENDANCE_REPORT')}
            >
              View report
            </button>
          </div>
          <AttendanceChart />
        </div>

        {/* Fees & Finance Widget */}
        <div className="edusync-dash-card">
          <div className="edusync-dash-card__header">
            <div>
              <h3 className="edusync-dash-card__title">Fees & Finance</h3>
              <p className="edusync-dash-card__subtitle">Term 1 · Collections as of 16 October 2026 · USD</p>
            </div>
            <button
              type="button"
              className="edusync-dash-link-action"
              onClick={() => onNavigate('FEES_FINANCE_REPORT')}
            >
              View report
            </button>
          </div>
          <FeeDonutChart />
        </div>
      </div>

      {/* ROW 3: TRIPLE WIDGETS ROW */}
      <div className="edusync-dash-triple-row">
        {/* Recent Activities */}
        <div className="edusync-dash-card">
          <div className="edusync-dash-card__header">
            <h3 className="edusync-dash-card__title">Recent activities</h3>
            <button
              type="button"
              className="edusync-dash-link-action"
              onClick={() => onNavigate('RECENT_ACTIVITIES')}
            >
              View all
            </button>
          </div>
          <div className="edusync-activity-items">
            <div className="edusync-activity-row">
              <div className="edusync-activity-row__icon-box">
                <Icon name="wallet" size={16} />
              </div>
              <div className="edusync-activity-row__content">
                <div className="edusync-activity-row__title">$2,400 in fees recorded</div>
                <div className="edusync-activity-row__meta">Fees & Finance · 09:42</div>
              </div>
            </div>

            <div className="edusync-activity-row">
              <div className="edusync-activity-row__icon-box">
                <Icon name="user-check" size={16} />
              </div>
              <div className="edusync-activity-row__content">
                <div className="edusync-activity-row__title">42 class registers submitted</div>
                <div className="edusync-activity-row__meta">Attendance · 09:15</div>
              </div>
            </div>

            <div className="edusync-activity-row">
              <div className="edusync-activity-row__icon-box">
                <Icon name="clipboard-check" size={16} />
              </div>
              <div className="edusync-activity-row__content">
                <div className="edusync-activity-row__title">Grade 8 results published</div>
                <div className="edusync-activity-row__meta">Exams & Results · 08:50</div>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="edusync-dash-card">
          <div className="edusync-dash-card__header">
            <h3 className="edusync-dash-card__title">Upcoming events</h3>
            <button
              type="button"
              className="edusync-dash-link-action"
              onClick={() => onNavigate('UPCOMING_EVENTS')}
            >
              View all
            </button>
          </div>
          <div className="edusync-events-list">
            <div className="edusync-event-row">
              <div className="edusync-event-badge">
                <span className="edusync-event-badge__day">19</span>
                <span className="edusync-event-badge__month">OCT</span>
              </div>
              <div className="edusync-event-row__content">
                <div className="edusync-event-row__title">Parent–teacher meetings</div>
                <div className="edusync-event-row__meta">Oct · 14:00–17:00 · Classrooms</div>
              </div>
            </div>

            <div className="edusync-event-row">
              <div className="edusync-event-badge">
                <span className="edusync-event-badge__day">22</span>
                <span className="edusync-event-badge__month">OCT</span>
              </div>
              <div className="edusync-event-row__content">
                <div className="edusync-event-row__title">Science fair</div>
                <div className="edusync-event-row__meta">Oct · 10:00–14:00 · Main hall</div>
              </div>
            </div>

            <div className="edusync-event-row">
              <div className="edusync-event-badge">
                <span className="edusync-event-badge__day">26</span>
                <span className="edusync-event-badge__month">OCT</span>
              </div>
              <div className="edusync-event-row__content">
                <div className="edusync-event-row__title">Midterm exams</div>
                <div className="edusync-event-row__meta">Oct · 08:30 · All classes</div>
              </div>
            </div>
          </div>
        </div>

        {/* Pending Tasks */}
        <div className="edusync-dash-card">
          <div className="edusync-dash-card__header">
            <h3 className="edusync-dash-card__title">Pending tasks</h3>
            <span className="edusync-dash-task-count">3 open</span>
          </div>
          <div className="edusync-task-items">
            <div className="edusync-task-item">
              <Checkbox
                checked={task1}
                onChange={setTask1}
                label={
                  <div className="edusync-task-item__text-wrap">
                    <span className="edusync-task-item__title">Publish midterm timetable</span>
                    <span className="edusync-task-item__due">Due today · Exams & Results</span>
                  </div>
                }
              />
            </div>

            <div className="edusync-task-item">
              <Checkbox
                checked={task2}
                onChange={setTask2}
                label={
                  <div className="edusync-task-item__text-wrap">
                    <span className="edusync-task-item__title">Review 6 fee concessions</span>
                    <span className="edusync-task-item__due">Due today · Fees & Finance</span>
                  </div>
                }
              />
            </div>

            <div className="edusync-task-item">
              <Checkbox
                checked={task3}
                onChange={setTask3}
                label={
                  <div className="edusync-task-item__text-wrap">
                    <span className="edusync-task-item__title">Confirm meeting room plan</span>
                    <span className="edusync-task-item__due">Due 19 Oct · Events</span>
                  </div>
                }
              />
            </div>
          </div>
        </div>
      </div>

      {/* ROW 4: IMPORTANT ANNOUNCEMENTS */}
      <div className="edusync-announcements-section">
        <h3 className="edusync-announcements-title">Important announcements</h3>
        <div className="edusync-announcements-grid">
          {/* Blue Info Notice */}
          <div className="edusync-announcement-card edusync-announcement-card--info">
            <Icon name="info" size={18} className="edusync-announcement-card__icon" />
            <div className="edusync-announcement-card__body">
              <h4 className="edusync-announcement-card__heading">
                Parent–teacher meetings · preparation closes today
              </h4>
              <p className="edusync-announcement-card__text">
                Teachers: finalize meeting slots by 16:00 for Monday, 19 October.
              </p>
            </div>
          </div>

          {/* Amber Warning Notice */}
          <div className="edusync-announcement-card edusync-announcement-card--warning">
            <Icon name="triangle-alert" size={18} className="edusync-announcement-card__icon" />
            <div className="edusync-announcement-card__body">
              <h4 className="edusync-announcement-card__heading">
                Midterm exam papers due · 21 October
              </h4>
              <p className="edusync-announcement-card__text">
                Subject leads: submit approved papers before exams begin on 26 October.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
