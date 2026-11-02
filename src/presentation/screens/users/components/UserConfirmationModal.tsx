import React from 'react';
import { useUsersFlow } from '../../../../application/state/users-flow.context';

export const UserConfirmationModal: React.FC = () => {
  const { dialog, closeConfirmationDialog, confirmSensitiveAction } = useUsersFlow();

  if (!dialog.isOpen || !dialog.account || !dialog.type) return null;

  const isReset = dialog.type === 'RESET_PASSWORD';
  const isDeactivate = dialog.type === 'DEACTIVATE';

  return (
    <div className="users-modal-overlay" onClick={closeConfirmationDialog}>
      <div className="users-modal-card" onClick={(e) => e.stopPropagation()}>
        <span
          className={`users-modal-badge ${
            isReset ? 'users-modal-badge--security' : 'users-modal-badge--access'
          }`}
        >
          {isReset ? 'Security' : 'Access change'}
        </span>

        <h3 className="users-modal-title">
          {isReset
            ? 'Reset password'
            : isDeactivate
            ? 'Deactivate account'
            : 'Reactivate account'}
        </h3>

        <p className="users-modal-desc">
          {isReset
            ? `Send a password reset link to ${dialog.account.email}?`
            : isDeactivate
            ? 'This user will lose access until the account is reactivated.'
            : `Restore sign-in access for ${dialog.account.fullName}?`}
        </p>

        <div className="users-modal-actions">
          <button
            type="button"
            className="users-btn-secondary"
            onClick={closeConfirmationDialog}
          >
            Cancel
          </button>
          <button
            type="button"
            className="users-primary-btn"
            style={
              isDeactivate
                ? { background: '#DC2626', borderColor: '#DC2626' }
                : {}
            }
            onClick={confirmSensitiveAction}
          >
            {isReset
              ? 'Send link'
              : isDeactivate
              ? 'Deactivate'
              : 'Reactivate'}
          </button>
        </div>
      </div>
    </div>
  );
};
