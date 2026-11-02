import React, { useState } from 'react';
import type { ProductRole, AccountStatus, UserAccount } from '../../../../core/entities/users.types';
import { useUsersFlow } from '../../../../application/state/users-flow.context';

export const UserCreateEditScreen: React.FC = () => {
  const { selectedUser, saveAccount, goToDirectory, openConfirmationDialog } = useUsersFlow();

  const [fullName, setFullName] = useState(selectedUser?.fullName || '');
  const [email, setEmail] = useState(selectedUser?.email || '');
  const [role, setRole] = useState<ProductRole>(selectedUser?.role || 'Teacher');
  const [linkedProfile, setLinkedProfile] = useState(selectedUser?.linkedProfile || '');
  const [username, setUsername] = useState(selectedUser?.id || '');
  const [status, setStatus] = useState<AccountStatus>(selectedUser?.status || 'Active');
  const [contactNumber, setContactNumber] = useState(selectedUser?.contactNumber || '');
  const [tempPassword, setTempPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveAccount({
      id: selectedUser?.id || username,
      fullName,
      email,
      role,
      status,
      linkedProfile,
      contactNumber,
    });
  };

  const dummyUser: UserAccount = selectedUser || {
    id: username || 'ADM-099',
    fullName: fullName || 'New User',
    email: email || 'user@maplegrove.edu',
    role,
    status,
    lastActivity: 'Just now',
    access: role === 'Admin' ? 'Web only' : 'Mobile app',
  };

  return (
    <div className="users-edit-layout">
      {/* Left (65%): Account Details Form */}
      <div className="users-card">
        <div className="users-card-header">
          <h3 className="users-card-title">Account details</h3>
          <p className="users-card-subtitle">
            {selectedUser
              ? `Editing account: ${selectedUser.fullName} (${selectedUser.id})`
              : 'Create or edit an account with the correct product role'}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="users-form-grid">
            <div className="users-form-group">
              <label htmlFor="user-fullname">Full name</label>
              <input
                id="user-fullname"
                type="text"
                className="users-input"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter full name"
                required
              />
            </div>

            <div className="users-form-group">
              <label htmlFor="user-email">Email address</label>
              <input
                id="user-email"
                type="email"
                className="users-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter official email"
                required
              />
            </div>

            <div className="users-form-group">
              <label htmlFor="user-role">Role</label>
              <select
                id="user-role"
                className="users-select"
                value={role}
                onChange={(e) => setRole(e.target.value as ProductRole)}
              >
                <option value="Admin">Admin</option>
                <option value="Teacher">Teacher</option>
                <option value="Student">Student</option>
                <option value="Parent">Parent</option>
              </select>
            </div>

            <div className="users-form-group">
              <label htmlFor="user-linked">Linked profile</label>
              <input
                id="user-linked"
                type="text"
                className="users-input"
                value={linkedProfile}
                onChange={(e) => setLinkedProfile(e.target.value)}
                placeholder="Select student / teacher / parent profile"
              />
            </div>

            <div className="users-form-group">
              <label htmlFor="user-id">Username / ID</label>
              <input
                id="user-id"
                type="text"
                className="users-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Auto-generated or enter ID"
                disabled={!!selectedUser}
                style={selectedUser ? { background: '#F8FAFC' } : {}}
              />
            </div>

            <div className="users-form-group">
              <label htmlFor="user-status">Account status</label>
              <select
                id="user-status"
                className="users-select"
                value={status}
                onChange={(e) => setStatus(e.target.value as AccountStatus)}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="users-form-group">
              <label htmlFor="user-contact">Contact number</label>
              <input
                id="user-contact"
                type="text"
                className="users-input"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                placeholder="Enter contact number"
              />
            </div>

            <div className="users-form-group">
              <label htmlFor="user-temp-pw">Temporary password</label>
              <input
                id="user-temp-pw"
                type="password"
                className="users-input"
                value={tempPassword}
                onChange={(e) => setTempPassword(e.target.value)}
                placeholder="Set temporary password"
              />
            </div>
          </div>

          <div className="users-form-hint">
            Role controls available features. Admin accounts are Web-only; Teacher, Student, and Parent accounts are for the Mobile Application.
          </div>

          <div className="users-form-actions">
            <button
              type="button"
              className="users-btn-secondary"
              onClick={goToDirectory}
            >
              Cancel
            </button>
            <button type="submit" className="users-primary-btn">
              Save account
            </button>
          </div>
        </form>
      </div>

      {/* Right (35%): Account Security Panel */}
      <div className="users-card">
        <div className="users-card-header">
          <h3 className="users-card-title">Account security</h3>
          <p className="users-card-subtitle">Sensitive actions require explicit confirmation</p>
        </div>

        <div className="users-security-list">
          <div className="users-security-item">
            <h4 className="users-security-title">Reset password</h4>
            <p className="users-security-desc">Send a secure reset link to the account email</p>
            <button
              type="button"
              className="users-primary-btn"
              onClick={() => openConfirmationDialog('RESET_PASSWORD', dummyUser)}
            >
              Send reset link
            </button>
          </div>

          <div className="users-security-item">
            <h4 className="users-security-title">Deactivate account</h4>
            <p className="users-security-desc">Temporarily block sign-in for this account</p>
            <button
              type="button"
              className="users-btn-secondary"
              style={{ color: '#DC2626' }}
              onClick={() => openConfirmationDialog('DEACTIVATE', dummyUser)}
            >
              Deactivate
            </button>
          </div>

          <div className="users-security-item">
            <h4 className="users-security-title">Reactivate account</h4>
            <p className="users-security-desc">Restore sign-in access for a disabled account</p>
            <button
              type="button"
              className="users-primary-btn"
              onClick={() => openConfirmationDialog('REACTIVATE', dummyUser)}
            >
              Reactivate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
