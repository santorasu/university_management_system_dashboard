import React from 'react';
import { useSettingsFlow } from '../../../../application/state/settings-flow.context';

export const AttendanceNotificationsSecurityScreen: React.FC = () => {
  const {
    attendanceSettings,
    notificationPreferences,
    securitySettings,
    toggleAttendanceSetting,
    updateAttendanceField,
    toggleNotificationPreference,
    toggleSecuritySetting,
    updateSecurityField,
    saveChanges,
    isLoading,
  } = useSettingsFlow();

  if (!attendanceSettings || !notificationPreferences || !securitySettings || isLoading) {
    return <div style={{ padding: '40px', textAlign: 'center', color: '#667085' }}>Loading settings...</div>;
  }

  return (
    <div>
      {/* Top Split Row (50% / 50%): Attendance & Notifications */}
      <div className="settings-split-row--50">
        {/* Left: Attendance Settings */}
        <div className="settings-card">
          <div className="settings-card-header">
            <h3 className="settings-card-title">Attendance settings</h3>
            <p className="settings-card-subtitle">Configure default attendance rules</p>
          </div>

          <div className="settings-grid-2">
            <div className="settings-field">
              <label htmlFor="att-start">School start time</label>
              <input
                id="att-start"
                type="text"
                className="settings-input"
                value={attendanceSettings.startTime}
                onChange={(e) => updateAttendanceField('startTime', e.target.value)}
              />
            </div>

            <div className="settings-field">
              <label htmlFor="att-cutoff">Late cutoff</label>
              <input
                id="att-cutoff"
                type="text"
                className="settings-input"
                value={attendanceSettings.lateCutoff}
                onChange={(e) => updateAttendanceField('lateCutoff', e.target.value)}
              />
            </div>
          </div>

          <div className="settings-grid-2">
            <div className="settings-field">
              <label htmlFor="att-marking">Marking window</label>
              <select
                id="att-marking"
                className="settings-select"
                value={attendanceSettings.markingWindow}
                onChange={(e) => updateAttendanceField('markingWindow', e.target.value)}
              >
                <option value="Daily">Daily</option>
                <option value="Period by period">Period by period</option>
              </select>
            </div>

            <div className="settings-field">
              <label htmlFor="att-absence">Absence alert threshold</label>
              <select
                id="att-absence"
                className="settings-select"
                value={attendanceSettings.absenceThreshold}
                onChange={(e) => updateAttendanceField('absenceThreshold', e.target.value)}
              >
                <option value="1 consecutive day">1 consecutive day</option>
                <option value="2 consecutive days">2 consecutive days</option>
                <option value="3 consecutive days">3 consecutive days</option>
              </select>
            </div>
          </div>

          {/* Attendance Toggles */}
          <div className="settings-toggle-list" style={{ marginTop: '16px' }}>
            <div className="settings-toggle-row">
              <div className="settings-toggle-info">
                <span className="settings-toggle-title">Require reason for absence</span>
                <span className="settings-toggle-desc">Ask for a reason when marking absent</span>
              </div>
              <label className="settings-switch">
                <input
                  type="checkbox"
                  checked={attendanceSettings.requireReason}
                  onChange={() => toggleAttendanceSetting('requireReason')}
                />
                <span className="settings-slider" />
              </label>
            </div>

            <div className="settings-toggle-row">
              <div className="settings-toggle-info">
                <span className="settings-toggle-title">Notify parents of absence</span>
                <span className="settings-toggle-desc">Send notification to parent accounts</span>
              </div>
              <label className="settings-switch">
                <input
                  type="checkbox"
                  checked={attendanceSettings.notifyParents}
                  onChange={() => toggleAttendanceSetting('notifyParents')}
                />
                <span className="settings-slider" />
              </label>
            </div>

            <div className="settings-toggle-row">
              <div className="settings-toggle-info">
                <span className="settings-toggle-title">Allow attendance correction</span>
                <span className="settings-toggle-desc">Allow authorized correction requests</span>
              </div>
              <label className="settings-switch">
                <input
                  type="checkbox"
                  checked={attendanceSettings.allowCorrection}
                  onChange={() => toggleAttendanceSetting('allowCorrection')}
                />
                <span className="settings-slider" />
              </label>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              type="button"
              className="settings-btn-primary"
              onClick={() => saveChanges('Attendance Settings')}
            >
              Save attendance settings
            </button>
          </div>
        </div>

        {/* Right: Notification Preferences */}
        <div className="settings-card">
          <div className="settings-card-header">
            <h3 className="settings-card-title">Notification preferences</h3>
            <p className="settings-card-subtitle">Choose which school events generate notifications</p>
          </div>

          <div className="settings-toggle-list">
            <div className="settings-toggle-row">
              <div className="settings-toggle-info">
                <span className="settings-toggle-title">Published notices</span>
                <span className="settings-toggle-desc">Notify targeted audiences</span>
              </div>
              <label className="settings-switch">
                <input
                  type="checkbox"
                  checked={notificationPreferences.publishedNotices}
                  onChange={() => toggleNotificationPreference('publishedNotices')}
                />
                <span className="settings-slider" />
              </label>
            </div>

            <div className="settings-toggle-row">
              <div className="settings-toggle-info">
                <span className="settings-toggle-title">Direct messages</span>
                <span className="settings-toggle-desc">Notify message recipients</span>
              </div>
              <label className="settings-switch">
                <input
                  type="checkbox"
                  checked={notificationPreferences.directMessages}
                  onChange={() => toggleNotificationPreference('directMessages')}
                />
                <span className="settings-slider" />
              </label>
            </div>

            <div className="settings-toggle-row">
              <div className="settings-toggle-info">
                <span className="settings-toggle-title">Fee reminders</span>
                <span className="settings-toggle-desc">Notify parents about due dates</span>
              </div>
              <label className="settings-switch">
                <input
                  type="checkbox"
                  checked={notificationPreferences.feeReminders}
                  onChange={() => toggleNotificationPreference('feeReminders')}
                />
                <span className="settings-slider" />
              </label>
            </div>

            <div className="settings-toggle-row">
              <div className="settings-toggle-info">
                <span className="settings-toggle-title">Exam results published</span>
                <span className="settings-toggle-desc">Notify students and parents</span>
              </div>
              <label className="settings-switch">
                <input
                  type="checkbox"
                  checked={notificationPreferences.examResults}
                  onChange={() => toggleNotificationPreference('examResults')}
                />
                <span className="settings-slider" />
              </label>
            </div>

            <div className="settings-toggle-row">
              <div className="settings-toggle-info">
                <span className="settings-toggle-title">Library overdue reminders</span>
                <span className="settings-toggle-desc">Notify borrowers about overdue books</span>
              </div>
              <label className="settings-switch">
                <input
                  type="checkbox"
                  checked={notificationPreferences.libraryOverdue}
                  onChange={() => toggleNotificationPreference('libraryOverdue')}
                />
                <span className="settings-slider" />
              </label>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
            <button
              type="button"
              className="settings-btn-primary"
              onClick={() => saveChanges('Notification Preferences')}
            >
              Save notification preferences
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Split Row: Security Settings (60%) & Permission Boundaries (40%) */}
      <div className="settings-split-row">
        {/* Left: Security Settings */}
        <div className="settings-card">
          <div className="settings-card-header">
            <h3 className="settings-card-title">Security & session policies</h3>
            <p className="settings-card-subtitle">Protect accounts with consistent password and session rules</p>
          </div>

          <div className="settings-grid-2">
            <div className="settings-field">
              <label htmlFor="sec-min-pw">Minimum password length</label>
              <select
                id="sec-min-pw"
                className="settings-select"
                value={securitySettings.minPasswordLength}
                onChange={(e) => updateSecurityField('minPasswordLength', e.target.value)}
              >
                <option value="8 characters">8 characters</option>
                <option value="10 characters">10 characters</option>
                <option value="12 characters">12 characters</option>
                <option value="14 characters">14 characters</option>
              </select>
            </div>

            <div className="settings-field">
              <label htmlFor="sec-expiry">Password expiry</label>
              <select
                id="sec-expiry"
                className="settings-select"
                value={securitySettings.passwordExpiry}
                onChange={(e) => updateSecurityField('passwordExpiry', e.target.value)}
              >
                <option value="30 days">30 days</option>
                <option value="60 days">60 days</option>
                <option value="90 days">90 days</option>
                <option value="Never">Never</option>
              </select>
            </div>
          </div>

          <div className="settings-grid-2">
            <div className="settings-field">
              <label htmlFor="sec-timeout">Session timeout</label>
              <select
                id="sec-timeout"
                className="settings-select"
                value={securitySettings.sessionTimeout}
                onChange={(e) => updateSecurityField('sessionTimeout', e.target.value)}
              >
                <option value="15 minutes inactive">15 minutes inactive</option>
                <option value="30 minutes inactive">30 minutes inactive</option>
                <option value="60 minutes inactive">60 minutes inactive</option>
              </select>
            </div>

            <div className="settings-field">
              <label htmlFor="sec-attempts">Maximum failed attempts</label>
              <select
                id="sec-attempts"
                className="settings-select"
                value={securitySettings.maxFailedAttempts}
                onChange={(e) => updateSecurityField('maxFailedAttempts', e.target.value)}
              >
                <option value="3 attempts">3 attempts</option>
                <option value="5 attempts">5 attempts</option>
                <option value="10 attempts">10 attempts</option>
              </select>
            </div>
          </div>

          {/* Security Toggles */}
          <div className="settings-toggle-list" style={{ marginTop: '14px' }}>
            <div className="settings-toggle-row">
              <div className="settings-toggle-info">
                <span className="settings-toggle-title">Require strong passwords</span>
                <span className="settings-toggle-desc">Uppercase, lowercase, number, and symbol</span>
              </div>
              <label className="settings-switch">
                <input
                  type="checkbox"
                  checked={securitySettings.requireStrongPasswords}
                  onChange={() => toggleSecuritySetting('requireStrongPasswords')}
                />
                <span className="settings-slider" />
              </label>
            </div>

            <div className="settings-toggle-row">
              <div className="settings-toggle-info">
                <span className="settings-toggle-title">Require two-factor authentication for Admin</span>
                <span className="settings-toggle-desc">Web Admin accounts only</span>
              </div>
              <label className="settings-switch">
                <input
                  type="checkbox"
                  checked={securitySettings.require2FAAdmin}
                  onChange={() => toggleSecuritySetting('require2FAAdmin')}
                />
                <span className="settings-slider" />
              </label>
            </div>

            <div className="settings-toggle-row">
              <div className="settings-toggle-info">
                <span className="settings-toggle-title">Revoke sessions after password reset</span>
                <span className="settings-toggle-desc">Sign out active sessions after reset</span>
              </div>
              <label className="settings-switch">
                <input
                  type="checkbox"
                  checked={securitySettings.revokeSessionsOnReset}
                  onChange={() => toggleSecuritySetting('revokeSessionsOnReset')}
                />
                <span className="settings-slider" />
              </label>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
            <button
              type="button"
              className="settings-btn-primary"
              onClick={() => saveChanges('Security Settings')}
            >
              Save security settings
            </button>
          </div>
        </div>

        {/* Right: Permission Boundaries */}
        <div className="settings-card">
          <div className="settings-card-header">
            <h3 className="settings-card-title">Permission boundaries</h3>
            <p className="settings-card-subtitle">Only authorized Admin users can change school-wide settings</p>
          </div>

          <div className="settings-roles-list">
            <div className="settings-role-item">
              <span className="settings-role-item__name">Admin</span>
              <span className="settings-role-item__sub">Web application only</span>
            </div>
            <div className="settings-role-item">
              <span className="settings-role-item__name">Teacher</span>
              <span className="settings-role-item__sub">Mobile application</span>
            </div>
            <div className="settings-role-item">
              <span className="settings-role-item__name">Student</span>
              <span className="settings-role-item__sub">Mobile application</span>
            </div>
            <div className="settings-role-item">
              <span className="settings-role-item__name">Parent</span>
              <span className="settings-role-item__sub">Mobile application</span>
            </div>
          </div>

          <div className="settings-notice" style={{ background: '#FFFBEB', border: '1px solid #FDE68A' }}>
            Confirm sensitive changes before saving. Never expose Admin mobile navigation or create a Staff role.
          </div>
        </div>
      </div>
    </div>
  );
};
