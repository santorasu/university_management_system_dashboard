import React, { useState, useRef, useEffect } from 'react';
import { Icon } from '../../../widgets/Icon/Icon';
import { useAuthFlow } from '../../../../application/state/auth-flow.context';

export const DashboardHeader: React.FC = () => {
  const { session, handleSignOut, setCurrentScreen } = useAuthFlow();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleTestSessionTimeout = () => {
    setIsDropdownOpen(false);
    setCurrentScreen('06_SESSION_EXPIRED');
  };

  return (
    <header className="edusync-dash-header">
      {/* SEARCH BAR */}
      <div className="edusync-dash-header__search-wrap">
        <Icon name="search" size={16} className="edusync-dash-header__search-icon" />
        <input
          type="text"
          className="edusync-dash-header__search-input"
          placeholder="Search students, teachers, and more..."
        />
      </div>

      {/* RIGHT METADATA & PROFILE */}
      <div className="edusync-dash-header__right">
        {/* Term Indicator */}
        <div className="edusync-dash-header__term-pill">
          <Icon name="calendar-days" size={14} />
          <span>2026–27 · Term 1</span>
        </div>

        {/* Notifications */}
        <button
          type="button"
          className="edusync-dash-header__bell-btn"
          aria-label="3 notifications"
        >
          <Icon name="bell" size={18} />
          <span className="edusync-dash-header__bell-badge">3</span>
        </button>

        {/* Profile Card & Dropdown */}
        <div className="edusync-dash-header__profile-container" ref={dropdownRef}>
          <button
            type="button"
            className="edusync-dash-header__profile-btn"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            aria-expanded={isDropdownOpen}
          >
            <div className="edusync-dash-header__avatar">AM</div>
            <div className="edusync-dash-header__user-text">
              <div className="edusync-dash-header__user-name">
                {session?.user?.name || 'Alex Morgan'}
              </div>
              <div className="edusync-dash-header__user-role">
                {session?.user?.role === 'SUPER_ADMIN' ? 'Super Administrator' : 'School Administrator'}
              </div>
            </div>
            <Icon name="chevron-down" size={14} className="edusync-dash-header__chevron" />
          </button>

          {isDropdownOpen && (
            <div className="edusync-dash-header__dropdown">
              <div className="edusync-dash-header__dropdown-user">
                <strong>{session?.user?.name || 'Alex Morgan'}</strong>
                <span>{session?.user?.email || 'alex.morgan@maplegrove.edu'}</span>
              </div>
              <div className="edusync-dash-header__dropdown-divider" />
              <button
                type="button"
                className="edusync-dash-header__dropdown-item"
                onClick={handleTestSessionTimeout}
              >
                <Icon name="clock-3" size={14} />
                <span>Simulate Inactivity Timeout (06)</span>
              </button>
              <button
                type="button"
                className="edusync-dash-header__dropdown-item edusync-dash-header__dropdown-item--danger"
                onClick={handleSignOut}
              >
                <Icon name="lock-keyhole" size={14} />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
