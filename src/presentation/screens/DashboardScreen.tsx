import React from 'react';
import { useAuthFlow } from '../../application/state/auth-flow.context';
import { BrandLogo } from '../widgets/BrandLogo/BrandLogo';
import { Badge } from '../widgets/Badge/Badge';
import { Button } from '../widgets/Button/Button';
import './DashboardScreen.css';

export const DashboardScreen: React.FC = () => {
  const { session, handleSignOut, setCurrentScreen } = useAuthFlow();

  const handleSimulateExpiry = () => {
    setCurrentScreen('06_SESSION_EXPIRED');
  };

  return (
    <div className="edusync-dashboard">
      {/* SIDEBAR */}
      <aside className="edusync-dashboard__sidebar">
        <div className="edusync-dashboard__brand">
          <BrandLogo variant="on-dark" size="sm" />
        </div>

        <nav className="edusync-dashboard__nav">
          <div className="edusync-dashboard__nav-item edusync-dashboard__nav-item--active">
            <img src="/icons/layout-dashboard.svg" alt="Dashboard" width={20} height={20} />
            <span>Dashboard</span>
          </div>
          <div className="edusync-dashboard__nav-item">
            <img src="/icons/users.svg" alt="Students" width={20} height={20} />
            <span>Students</span>
          </div>
          <div className="edusync-dashboard__nav-item">
            <img src="/icons/graduation-cap.svg" alt="Faculty" width={20} height={20} />
            <span>Faculty & Staff</span>
          </div>
          <div className="edusync-dashboard__nav-item">
            <img src="/icons/book-open.svg" alt="Courses" width={20} height={20} />
            <span>Academic Courses</span>
          </div>
          <div className="edusync-dashboard__nav-item">
            <img src="/icons/settings.svg" alt="Settings" width={20} height={20} />
            <span>System Settings</span>
          </div>
        </nav>

        <div className="edusync-dashboard__sidebar-footer">
          <div className="edusync-dashboard__school-badge">
            <img src="/icons/school.svg" alt="School" width={16} height={16} />
            <span>Maple Grove School</span>
          </div>
          <button
            type="button"
            className="edusync-dashboard__signout-btn"
            onClick={handleSignOut}
          >
            Sign out
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="edusync-dashboard__main">
        {/* TOP BAR */}
        <header className="edusync-dashboard__header">
          <div className="edusync-dashboard__search-box">
            <img src="/icons/search.svg" alt="Search" width={18} height={18} />
            <input
              type="text"
              placeholder="Search students, faculty, courses..."
              className="edusync-dashboard__search-input"
            />
          </div>

          <div className="edusync-dashboard__user-panel">
            <Badge variant="success" icon={<img src="/icons/circle-check.svg" alt="Active" width={12} height={12} />}>
              Active Session
            </Badge>

            <button
              type="button"
              className="edusync-dashboard__test-expiry-btn"
              onClick={handleSimulateExpiry}
              title="Test the session expiration flow"
            >
              Test Inactivity Timeout
            </button>

            <div className="edusync-dashboard__user-info">
              <div className="edusync-dashboard__avatar">SJ</div>
              <div>
                <div className="edusync-dashboard__user-name">
                  {session?.user.name || 'Sarah Jenkins'}
                </div>
                <div className="edusync-dashboard__user-role">
                  {session?.user.role || 'ADMIN'} · Maple Grove
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* WORKSPACE CONTENT */}
        <div className="edusync-dashboard__body">
          <div className="edusync-dashboard__welcome-banner">
            <div>
              <h1 className="edusync-dashboard__title">Welcome, Sarah</h1>
              <p className="edusync-dashboard__subtitle">
                Administrator access confirmed for Maple Grove School portal.
              </p>
            </div>
            <Badge variant="info">Authenticated with 2FA</Badge>
          </div>

          {/* STATS CARDS */}
          <div className="edusync-dashboard__stats-grid">
            <div className="edusync-stat-card">
              <div className="edusync-stat-card__label">Total Enrolled Students</div>
              <div className="edusync-stat-card__value">1,248</div>
              <div className="edusync-stat-card__change edusync-stat-card__change--positive">
                ↑ +4.2% from last term
              </div>
            </div>
            <div className="edusync-stat-card">
              <div className="edusync-stat-card__label">Faculty Members</div>
              <div className="edusync-stat-card__value">84</div>
              <div className="edusync-stat-card__change">Active & assigned</div>
            </div>
            <div className="edusync-stat-card">
              <div className="edusync-stat-card__label">Average Daily Attendance</div>
              <div className="edusync-stat-card__value">96.4%</div>
              <div className="edusync-stat-card__change edusync-stat-card__change--positive">
                ↑ +1.1% this month
              </div>
            </div>
            <div className="edusync-stat-card">
              <div className="edusync-stat-card__label">Active Academic Programs</div>
              <div className="edusync-stat-card__value">42</div>
              <div className="edusync-stat-card__change">Current Fall semester</div>
            </div>
          </div>

          {/* RECENT ACTIVITY & SYSTEM STATUS */}
          <div className="edusync-dashboard__sections-grid">
            <div className="edusync-dashboard__card">
              <h3 className="edusync-dashboard__card-title">Recent Administrative Actions</h3>
              <ul className="edusync-activity-list">
                <li className="edusync-activity-item">
                  <span className="edusync-activity-item__dot" />
                  <div>
                    <strong>Admin login verified:</strong> Sarah Jenkins via secure office gateway.
                    <span className="edusync-activity-item__time">Just now</span>
                  </div>
                </li>
                <li className="edusync-activity-item">
                  <span className="edusync-activity-item__dot" />
                  <div>
                    <strong>Grade submission review:</strong> Computer Science Department Fall 2026.
                    <span className="edusync-activity-item__time">2 hours ago</span>
                  </div>
                </li>
                <li className="edusync-activity-item">
                  <span className="edusync-activity-item__dot" />
                  <div>
                    <strong>New faculty account created:</strong> Dr. Aris Thorne (Mathematics).
                    <span className="edusync-activity-item__time">Yesterday at 4:15 PM</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="edusync-dashboard__card">
              <h3 className="edusync-dashboard__card-title">Security & Session Health</h3>
              <p style={{ margin: '0 0 16px 0', fontSize: '14px', color: '#667085', lineHeight: '20px' }}>
                Your session is secured with 256-bit encryption. An inactivity timeout will sign you out if the tab is left idle.
              </p>
              <div style={{ display: 'flex', gap: '12px' }}>
                <Button variant="secondary" size="md" onClick={handleSimulateExpiry} fullWidth={false}>
                  Simulate Session Expiry
                </Button>
                <Button variant="ghost" size="md" onClick={handleSignOut} fullWidth={false}>
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
