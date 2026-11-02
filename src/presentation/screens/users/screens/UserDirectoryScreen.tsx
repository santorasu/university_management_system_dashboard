import React from 'react';
import { useUsersFlow } from '../../../../application/state/users-flow.context';
import { Badge } from '../../../widgets/Badge/Badge';

export const UserDirectoryScreen: React.FC = () => {
  const {
    kpis,
    users,
    filters,
    setFilter,
    applyFilters,
    resetFilters,
    goToEditAccount,
    openConfirmationDialog,
    isLoading,
  } = useUsersFlow();

  if (isLoading || !kpis) {
    return <div style={{ padding: '40px', textAlign: 'center', color: '#667085' }}>Loading user directory...</div>;
  }

  return (
    <div>
      {/* 4 KPI Cards */}
      <div className="users-kpis-grid">
        <div className="users-kpi-card users-kpi-card--blue">
          <div className="users-kpi-label">Total accounts</div>
          <div className="users-kpi-value">{kpis.totalAccounts.toLocaleString()}</div>
          <div className="users-kpi-sub">{kpis.totalAccountsSub}</div>
        </div>

        <div className="users-kpi-card users-kpi-card--emerald">
          <div className="users-kpi-label">Active accounts</div>
          <div className="users-kpi-value">{kpis.activeAccounts.toLocaleString()}</div>
          <div className="users-kpi-sub">{kpis.activeAccountsSub}</div>
        </div>

        <div className="users-kpi-card users-kpi-card--amber">
          <div className="users-kpi-label">Inactive accounts</div>
          <div className="users-kpi-value">{kpis.inactiveAccounts}</div>
          <div className="users-kpi-sub">{kpis.inactiveAccountsSub}</div>
        </div>

        <div className="users-kpi-card users-kpi-card--purple">
          <div className="users-kpi-label">Recent activity</div>
          <div className="users-kpi-value">{kpis.recentActivity}</div>
          <div className="users-kpi-sub">{kpis.recentActivitySub}</div>
        </div>
      </div>

      {/* User Account Directory Table Card */}
      <div className="users-card">
        <div className="users-card-header">
          <h3 className="users-card-title">User accounts</h3>
          <p className="users-card-subtitle">Search users, assign roles, and review access status</p>
        </div>

        {/* Filter Row */}
        <div className="users-filter-row">
          <div className="users-search-box">
            <input
              type="text"
              className="users-input"
              value={filters.search}
              onChange={(e) => setFilter('search', e.target.value)}
              placeholder="Search by name, email, or user ID..."
            />
          </div>

          <div className="users-select-box">
            <select
              className="users-select"
              value={filters.role}
              onChange={(e) => setFilter('role', e.target.value)}
            >
              <option value="All supported roles">All supported roles</option>
              <option value="Admin">Admin</option>
              <option value="Teacher">Teacher</option>
              <option value="Student">Student</option>
              <option value="Parent">Parent</option>
            </select>
          </div>

          <div className="users-select-box">
            <select
              className="users-select"
              value={filters.status}
              onChange={(e) => setFilter('status', e.target.value)}
            >
              <option value="All statuses">All statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <button type="button" className="users-primary-btn" onClick={applyFilters}>
            Apply
          </button>
          <button type="button" className="users-btn-secondary" onClick={resetFilters}>
            Reset
          </button>
        </div>

        {/* Table */}
        <div className="users-table-wrap">
          <table className="users-table">
            <thead>
              <tr>
                <th>USER / ID</th>
                <th>ROLE</th>
                <th>STATUS</th>
                <th>LAST ACTIVITY</th>
                <th>ACCESS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--edusync-text-navy, #14213D)' }}>
                      {u.fullName}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--edusync-text-secondary, #667085)' }}>
                      {u.id} • {u.email}
                    </div>
                  </td>
                  <td>
                    <span
                      className={`users-role-badge users-role-badge--${u.role.toLowerCase()}`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td>
                    <Badge variant={u.status === 'Active' ? 'success' : 'neutral'}>
                      {u.status}
                    </Badge>
                  </td>
                  <td style={{ color: 'var(--edusync-text-secondary, #667085)' }}>
                    {u.lastActivity}
                  </td>
                  <td style={{ color: 'var(--edusync-text-secondary, #667085)' }}>
                    {u.access}
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        type="button"
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--edusync-brand-primary, #3659D9)',
                          cursor: 'pointer',
                          fontWeight: 500,
                          fontSize: '13px',
                        }}
                        onClick={() => goToEditAccount(u)}
                      >
                        Edit
                      </button>
                      {u.status === 'Active' ? (
                        <button
                          type="button"
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#DC2626',
                            cursor: 'pointer',
                            fontSize: '13px',
                          }}
                          onClick={() => openConfirmationDialog('DEACTIVATE', u)}
                        >
                          Deactivate
                        </button>
                      ) : (
                        <button
                          type="button"
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#15803D',
                            cursor: 'pointer',
                            fontSize: '13px',
                          }}
                          onClick={() => openConfirmationDialog('REACTIVATE', u)}
                        >
                          Activate
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role Permissions Summary Card */}
      <div className="users-card">
        <div className="users-card-header">
          <h3 className="users-card-title">Supported roles & permission boundaries</h3>
          <p className="users-card-subtitle">
            Admin uses the Web Application; Teacher, Student, and Parent use the Mobile Application
          </p>
        </div>
        <div className="users-roles-summary-grid">
          <div className="users-role-card">
            <div className="users-role-card__title">Admin</div>
            <div className="users-role-card__sub">Web Application only</div>
          </div>
          <div className="users-role-card">
            <div className="users-role-card__title">Teacher</div>
            <div className="users-role-card__sub">Mobile Application</div>
          </div>
          <div className="users-role-card">
            <div className="users-role-card__title">Student</div>
            <div className="users-role-card__sub">Mobile Application</div>
          </div>
          <div className="users-role-card">
            <div className="users-role-card__title">Parent</div>
            <div className="users-role-card__sub">Mobile Application</div>
          </div>
        </div>
      </div>
    </div>
  );
};
